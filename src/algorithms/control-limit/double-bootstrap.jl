using Statistics
# FIXME: test double bootstrap functions
# FIXME: understand why double bootstrap does not work with curved limits 

"""
    approximateBisectionCL!(CH::ControlChart[; rlsim::Function, settings::OptSettings])

Computes the control limit to satisfy the nominal properties of a control chart, using the bisection algorithm on bootstrapped paths (see for instance Qiu, 2013).

### Inputs
* `CH` - A control chart.
* `rlsim` - A function that generates a path of the control chart statistic with signature `rlsim(CH; maxiter)`. If left unspecified, defaults to `run_path_sim`. See the help for `run_path_sim` for more information about the signature of the function.
* `settings` - An `OptSettings` objects which contains variables that control the behaviour of the algorithm. See the `Accepted settings` section below for information about the settings that control the behaviour of the algorithm. For more information about the specifics of each keyword argument, see for instance Qiu (2013).

### Accepted settings:
* `maxiter` - The maximum number of bisection iterations.
* `nsims` - The number of run lengths used to estimate the target nominal property.
* `maxrl` - The maximum run length after which the run length is truncated, to avoid excessive computations.
* `x_tol` - Absolute tolerance for the algorithm, which is ended if
    ``h^{(k+1)} - h^{(k)} < x_{\\text{tol}}``
* `f_tol` - Absolute tolerance for the algorithm, which is ended if
    ``\\text{target}(h^{(k+1)}) - \\text{target}(h^{(k)}) < f_{\\text{tol}}``

### Returns
* A `NamedTuple` containing the estimated control limit `h`, the total number of iterations `iter`, and information `status` about the convergence of the algorithm.

### References
* Qiu, P. (2013). Introduction to Statistical Process Control. CRC Press.

"""
function approximateBisectionCL!(CH::ControlChart; rlsim::Function = run_path_sim, maxiter::Int = 30, nsims::Int = 1000, maxrl::Real = Int(min(get_maxrl(CH), 10*get_nominal_value(CH))), x_tol::Float64 = 1e-06, f_tol::Float64 = 1.0, B::Int = nsims, verbose::Bool = false, parallel::Bool = false)

    @assert maxiter > 0 "maxiter must be positive"
    @assert nsims > 0 "nsims must be positive"
    @assert maxrl > 0 "maxrl must be positive"
    @assert x_tol > 0 "x_tol must be positive"
    @assert f_tol > 0 "f_tol must be positive"
    @assert B > 0 "B must be positive"

    tmp_rlpath = rlsim(CH, maxiter=2)
    @assert isa(tmp_rlpath, Vector) "rlsim must be a vector"
    @assert length(tmp_rlpath) == 2 "rlsim must be of length maxiter"

    if verbose println("Generating $(nsims) run length paths ...") end
    maxrl_i = Int(trunc(maxrl))
    nsims_i = Int(nsims)                              # Number of simulated run lengts
    rl_paths = Matrix{Float64}(undef, nsims_i, maxrl_i)    # Generated run length paths
    if parallel
        Threads.@threads for i in 1:nsims_i
            rl_paths[i, :] = rlsim(CH, maxiter = maxrl)
        end
    else
        for i in 1:nsims_i
            rl_paths[i, :] = rlsim(CH, maxiter = maxrl)
        end
    end

    i = 0
    conv = "Maximum number of iterations reached"
    target = get_nominal_value(CH)                  # Target nominal ARL/QRL/...

    #! Important
    #TODO: think about potential bootstrap-corrected control limit estimate
    h = _bisection_paths(deepcopy(CH), rl_paths, target, maxrl_i, nsims_i, x_tol, f_tol, maxiter, B, verbose)
    # for b in 1:B
    #     h_boot[b] = bisection_paths(CH, rl_paths[sample(1:nsims_i, nsims_i), :], target, maxrl, nsims_i, x_tol, f_tol, maxiter, false)
    # end
    # h = 2*h - mean(h_boot)
    # while abs(last_E_RL_estimate - target) > f_tol
    set_h!(get_limit(CH), h)
    return (h=h, iter=i, status = conv)
end
export approximateBisectionCL!

"""
    approximateBisectionCL(CH::ControlChart; kw...)

Applies the bisection algorithm on simulated run length paths to find the control limit of a control chart without modifying the control chart object `CH`.
See the documentation of `approximateBisectionCL!` for more information about the algorithm and keyword arguments.

### Returns
* A `NamedTuple` containing the estimated control limit `h`, the total number of iterations `iter`, and information `status` about the convergence of the algorithm.

### References
* Qiu, P. (2013). Introduction to Statistical Process Control. CRC Press.

"""
function approximateBisectionCL(CH::ControlChart; kw...)
    CH_ = shallow_copy_sim(CH)
    return approximateBisectionCL!(CH_; kw...)
end
export approximateBisectionCL


function _bisection_paths(CH::ControlChart, rl_paths, target, maxrl, nsims_i, x_tol, f_tol, maxiter, B, verbose)
    #TODO: multiply the maximum value by the asymptotic inflating factor for curved control limits
    hmax = maximum(rl_paths)
    hmin = 0.0
    if verbose println("Running bisection on simulated paths with endpoints [$(hmin), $(hmax)] ...") end
    hold = hmax + x_tol + 1.0                 # Starting value to assess convergence
    RLs = Vector{Float64}(undef, B)        # Vector of simulated run lenghts
    E_RL = 0.0                                      # Estimated ARL/QRL/...
    h = 0.0                                         # Initialize control limit value
    idx = Vector{Int}(undef, B)
    rows = 1:nsims_i
    i = 0
    while i < maxiter
        i = i+1
        h = (hmin + hmax) / 2
        if verbose print("i: $(i)/$(maxiter),\th: $(h)\t") end

        idx .= sample(rows, B)
        # Calculate run length on simulated paths
        set_h!(get_limit(CH), h)
        for j in 1:B
            set_t!(CH, 0)
            for k in 1:maxrl
                set_value!(CH, rl_paths[idx[j], k])
                set_t!(CH, get_t(CH) + 1)
                # @show get_value(CH), get_limit_value(CH), is_OC(CH)
                if is_OC(CH)
                    RLs[j] = k
                    break
                end 
                if k == maxrl
                    RLs[j] = maxrl
                end
            end
        end
        # Calculate nominal measure (ARL/QRL/...) 
        E_RL = measure(RLs, CH, verbose=verbose)
        # Apply bisection algorithm
        if E_RL > target
            hmax = h
        else
            hmin = h
        end
        # Assess convergence in the run length value
        if abs(E_RL - target) < f_tol
            break
        end
        if abs(h - hold) < x_tol
            break
        end
        hold = h
    end
    return h    
end
export _bisection_paths