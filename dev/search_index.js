var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = SPM","category":"page"},{"location":"#SPM","page":"Home","title":"SPM","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for SPM, a package for Statistical Process Monitoring.","category":"page"},{"location":"#Package-features","page":"Home","title":"Package features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Standard control charts\nUnivariate Shewhart, EWMA, AEWMA, and CUSUM control charts;\nMEWMA and MAEWMA control charts;\nControl limits\nClassical one-sided and two-sided control limits;\nSupport for multi-chart combinations;\nDynamic control limits based on bootstrap and permutation methods;\nOptimization methods\nState-of-the-art methods for estimating control limits;\nOptimization of control chart parameters against user-defined out-of-control scenarios;\nExtensibility to user-made control statistics\nUsers only need to define the behaviour of the control statistic (struct and sequential update function), everything else is taken care of by the package.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [SPM]\nOrder   = [:function, :type]","category":"page"},{"location":"#SPM.apply_chart!-Tuple{SPM.AbstractChart, AbstractVector}","page":"Home","title":"SPM.apply_chart!","text":"apply_chart(CH::AbstractChart, x::AbstractVecOrMat)\napply_chart!(CH::AbstractChart, x::AbstractVector)\napply_chart!(CH::AbstractChart, x::AbstractMatrix)\n\nApply a control chart to a data vector or data matrix x.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.bisectionCL!-Tuple{ControlChart}","page":"Home","title":"SPM.bisectionCL!","text":"bisectionCL!(CH::ControlChart[; rlsim::Function, settings::OptSettings])\n\nComputes the control limit to satisfy the nominal properties of a control chart, using the bisection algorithm (see for instance Qiu, 2013)\n\nInputs\n\nCH - A control chart.\nrlsim - A function that generates a run length for the control chart with signature rlsim(CH; maxiter). If left unspecified, defaults to run_sim. See the help for run_sim for more information about the signature of the function.\nsettings - An OptSettings objects which contains variables that control the behaviour of the algorithm. See the Accepted settings section below for information about the settings that control the behaviour of the algorithm. For more information about the specifics of each keyword argument, see for instance Qiu (2013).\n\nAccepted settings:\n\nhmin_bi - The minimum value of the control limit, defaults to sqrt(eps()).\nhmax_bi - The maximum value for the control limit.\nmaxiter_bi - The maximum number of bisection iterations.\nnsims_bi - The number of run lengths used to estimate the target nominal property.\ntrunc_bi - The maximum run length after which it is trunc_biated, to avoid excessive computations.\nx_tol_bi - Absolute tolerance for the algorithm, which is ended if   h^(k+1) - h^(k)  x_texttol\nf_tol_bi - Absolute tolerance for the algorithm, which is ended if   texttarget(h^(k+1)) - texttarget(h^(k))  f_texttol\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nQiu, P. (2013). Introduction to Statistical Process Control. CRC Press.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.bisectionCL-Tuple{ControlChart}","page":"Home","title":"SPM.bisectionCL","text":"bisectionCL(CH::ControlChart; kw...)\n\nApplies the bisection algorithm to find the control limit of a control chart without modifying the control chart object CH. See the documentation of bisectionCL! for more information about the algorithm and keyword arguments.\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nQiu, P. (2013). Introduction to Statistical Process Control. CRC Press.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.calculate_limit_gradient-Tuple{SPM.AbstractChart, Any}","page":"Home","title":"SPM.calculate_limit_gradient","text":"calculate_limit_gradient(CH::AbstractChart, rl::Real)\ncalculate_limit_gradient(nominal::ARL, rl)\ncalculate_limit_gradient(nominal::QRL, rl)\n\nCalculate the gradient for the optimization of the control limit.\n\nIf the control chart nominal attribute is of type ARL, then the gradient is calculated according to Equation (9) of Capizzi and Masarotto (2016).\n\nIf the control chart nominal attribute is of type QRL, then the gradient is calculated using the recursion on page 280 of Capizzi and Masarotto (2009)\n\nReferences\n\nCapizzi, G., & Masarotto, G. (2016). \"Efficient Control Chart Calibration by Simulated Stochastic Approximation\". IIE Transactions 48 (1). https://doi.org/10.1080/0740817X.2015.1055392.\n\nCapizzi, G. & Masarotto, G. (2009) Bootstrap-based design of residual control charts, IIE Transactions, 41:4, 275-286, DOI: https://doi.org/10.1080/07408170802120059 \n\n\n\n\n\n","category":"method"},{"location":"#SPM.combinedCL!-Tuple{ControlChart}","page":"Home","title":"SPM.combinedCL!","text":"combinedCL!(CH::ControlChart[; rlsim::Function, settings::OptSettings])\n\nComputes the control limit to satisfy the nominal properties of a control chart, using the bisection algorithm (see for instance Qiu, 2013). The control limit upper bound hmax_bi for the bisection algorithm is found using the stochastic approximation algorithm of Capizzi and Masarotto (2016)\n\nInputs\n\nCH - A control chart.\nrlsim - A function that generates a run length for the control chart with signature rlsim(CH; maxiter). If left unspecified, defaults to run_sim. See the help for run_sim for more information about the signature of the function.\nsettings - An OptSettings objects which contains variables that control the behaviour of the algorithm. See the Accepted settings section below for information about the settings that control the behaviour of the algorithm. For more information about the specifics of each keyword argument, see for instance Qiu (2013).\n\nAccepted settings\n\nBisection algorithm\n\nrlsim - A function that generates new data with signature rlsim(CH; maxiter_bi). If left unspecified, defaults to run_sim.\nhmin_bi - The minimum value of the control limit, defaults to sqrt(eps()).\nhmax_bi - The maximum value for the control limit.\nmaxiter_bi - The maximum number of bisection iterations.\nnsims_bi - The number of run lengths used to estimate the target nominal property.\ntrunc_bi - The maximum run length after which it is trunc_biated, to avoid excessive computations.\nx_tol_bi - Absolute tolerance for the algorithm, which is ended if   h^(k+1) - h^(k)  x_texttol\nf_tol_bi - Absolute tolerance for the algorithm, which is ended if   texttarget(h^(k+1)) - texttarget(h^(k))  f_texttol\n\nSA algorithm\n\nNfixed_sa - The number of iterations for the gain estimation stage.\nAfixed_sa - The fixed gain during the gain estimation stage.\nAmin_sa - The minimum allowed value of gain.\nAmax_sa - The maximum allowed value of gain.\ndeltaSA_sa - The shift in control limit used during the gain estimation stage.\nq_sa - The power that controls the denominator in the Robbins-Monro algorithm.\ngamma_sa - The precision parameter for the stopping criterion of the algorithm.\nNmin_sa - The minimum number of iterations required for the algorithm to end.\nz_sa - The quantile of the Normal(0,1) that controls the probability of the stopping criterion being satisfied.\nCmrl_sa - The inflation factor for the maximum number of iterations the run length may run for.\nmaxiter_sa - Maximum number of iterations before the algorithm is forcibly ended.\nverbose_sa - Whether to print information to the user about the state of the optimization.\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nQiu, P. (2013). Introduction to Statistical Process Control. CRC Press.\nCapizzi, G., & Masarotto, G. (2016). Efficient control chart calibration by simulated stochastic approximation. IIE Transactions, 48(1), 57-65. https://doi.org/10.1080/0740817X.2015.1055392\n\n\n\n\n\n","category":"method"},{"location":"#SPM.combinedCL-Tuple{ControlChart}","page":"Home","title":"SPM.combinedCL","text":"combinedCL(CH::ControlChart; kw...)\n\nApplies the bisection algorithm to find the control limit of a control chart without modifying the control chart object CH. The control limit upper bound hmax_bi for the bisection algorithm is found using the stochastic approximation algorithm of Capizzi and Masarotto (2016). See the documentation of combinedCL! for more information about the algorithm and keyword arguments.\n\nKeyword arguments:\n\nSee the documentation of combinedCL! for a list of keyword arguments.\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nQiu, P. (2013). Introduction to Statistical Process Control. CRC Press.\nCapizzi, G., & Masarotto, G. (2016). Efficient control chart calibration by simulated stochastic approximation. IIE Transactions, 48(1), 57-65. https://doi.org/10.1080/0740817X.2015.1055392\n\n\n\n\n\n","category":"method"},{"location":"#SPM.doubleBootstrap!-Tuple{ControlChart}","page":"Home","title":"SPM.doubleBootstrap!","text":"doubleBootstrap!(CH::ControlChart[; rlsim::Function, settings::OptSettings])\n\nComputes the control limit to satisfy the nominal properties of a control chart, using the bisection algorithm on bootstrapped paths (see for instance Qiu, 2013).\n\nInputs\n\nCH - A control chart.\nrlsim - A function that generates a path of the control chart statistic with signature rlsim(CH; maxiter). If left unspecified, defaults to run_path_sim. See the help for run_path_sim for more information about the signature of the function.\nsettings - An OptSettings objects which contains variables that control the behaviour of the algorithm. See the Accepted settings section below for information about the settings that control the behaviour of the algorithm. For more information about the specifics of each keyword argument, see for instance Qiu (2013).\n\nAccepted settings:\n\nmaxiter_bi - The maximum number of bisection iterations.\nnsims_bi - The number of run lengths used to estimate the target nominal property.\ntrunc_bi - The maximum run length after which the run length is truncated, to avoid excessive computations.\nx_tol_bi - Absolute tolerance for the algorithm, which is ended if   h^(k+1) - h^(k)  x_texttol\nf_tol_bi - Absolute tolerance for the algorithm, which is ended if   texttarget(h^(k+1)) - texttarget(h^(k))  f_texttol\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nQiu, P. (2013). Introduction to Statistical Process Control. CRC Press.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.doubleBootstrap-Tuple{ControlChart}","page":"Home","title":"SPM.doubleBootstrap","text":"doubleBootstrap(CH::ControlChart; kw...)\n\nApplies the bisection algorithm on simulated run length paths to find the control limit of a control chart without modifying the control chart object CH. See the documentation of doubleBootstrap! for more information about the algorithm and keyword arguments.\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nQiu, P. (2013). Introduction to Statistical Process Control. CRC Press.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_design-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_design","text":"get_design(CH::AbstractChart)\n\nGet the designs of the control chart statistic.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_limit-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_limit","text":"get_limit(CH::AbstractChart)\n\nGet the control limit of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_limit_value-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_limit_value","text":"get_limit_value(CH::AbstractChart)\n\nGet the control limit value of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_maxrl-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_maxrl","text":"get_maxrl(CH::AbstractChart)\n\nGet the maximum run length of the control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_nominal-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_nominal","text":"get_nominal(CH::AbstractChart)\n\nGet the nominal properties of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_nominal_value-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_nominal_value","text":"get_nominal(CH::AbstractChart)\n\nGet the nominal value of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_phase1-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_phase1","text":"get_phase1(CH::AbstractChart)\n\nGet the Phase 1 information of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_statistic-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_statistic","text":"get_statistic(CH::AbstractChart)\n\nGet the statistic of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_t-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_t","text":"get_t(CH::AbstractChart)\n\nGet the current time point of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_value-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_value","text":"get_value(CH::AbstractChart)\n\nGet the current value of the control chart statistic.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_value-Tuple{SPM.AbstractStatistic}","page":"Home","title":"SPM.get_value","text":"get_value(stat::AbstractStatistic)\n\nGet the current value of a statistic.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.is_IC-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.is_IC","text":"is_IC(CH::AbstractChart)\nis_OC(CH::AbstractChart)\n\nCheck whether the control chart is in control or out of control.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.is_IC_vec-Tuple{MultipleControlChart}","page":"Home","title":"SPM.is_IC_vec","text":"is_IC_vec(CH::MultipleControlChart)\nis_OC_vec(CH::MultipleControlChart)\n\nCheck whether each individual control chart that makes up a multiple control chart is in control or out of control.\n\nReturns\n\nA vector of Bool, whose length is the number of individual statstics.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.new_data!-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.new_data!","text":"new_data(CH::AbstractChart)\n\nSimulate a new observation for the control chart from the Phase 1 data, eventually modifying the underlying phase 1 object.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.new_data-Tuple{Phase2}","page":"Home","title":"SPM.new_data","text":"new_data(PH2::Phase2{S,T})\nnew_data(PH2::Phase2{S,AbstractVector})\nnew_data(PH2::Phase2{S,AbstractMatrix})\n\nGenerates a new observation based on the observed Phase I (in-control) data. If it is not overloaded, then it defaults to generating data using a nonparametric bootstrap.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.new_data-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.new_data","text":"new_data(CH::AbstractChart)\n\nSimulate a new observation for the control chart from the Phase 1 data.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.optimize_design!-Tuple{Any, Any}","page":"Home","title":"SPM.optimize_design!","text":"optimize_design!(CH, rlsim_oc[; settings = OptSettings()])\n\nOptimizes the parameter of a simulation CH with respect to a given objective function rlsim_oc. \n\nArguments\n\nCH : The simulation to optimize.\nrlsim_oc : The objective function.\nsettings (optional, default=OptSettings()) : Optimization settings.\n\nReturns\n\nget_design(CH) : The optimized parameter.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.optimize_design-Tuple{Any, Any}","page":"Home","title":"SPM.optimize_design","text":"optimize_design(CH, rlsim_oc[; settings = OptSettings()])\n\nOptimize a parameter using the specified CH and rlsim_oc.\n\nArgs\n\n`CH`: the CH parameter.\n`rlsim_oc`: the rlsim_oc parameter.\n`settings`: the optimization settings.\n\nReturns\n\nThe optimized parameter values.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.optimize_grid-Tuple{ControlChart, Function, OptSettings}","page":"Home","title":"SPM.optimize_grid","text":"optimize_grid(CH::ControlChart, rlconstr::Function, settings::OptSettings)\n\nOptimizes a control chart by finding the best set of parameters using a grid search.\n\nArgs\n\nCH: the control chart to optimize.\nrlconstr: the function that evaluates the OC performance of the control chart.\nsettings: the optimization settings.\n\nReturns\n\npar_current (Vector{Float64}): the optimal set of parameters found by the optimization algorithm.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.optimize_limit!-Tuple{ControlChart}","page":"Home","title":"SPM.optimize_limit!","text":"optimize_limit!(CH::ControlChart[; settings = OptSettings()])\n\nOptimizes the control limit of a ControlChart object.\n\nArgs\n\nCH (ControlChart): The ControlChart object to optimize.\nsettings (OptSettings, optional): Optimization settings. Defaults to OptSettings().\n\nReturns\n\nThe optimized control limit value.\n\nRaises\n\nValueError: If the optimization method specified in settings is unknown.\n\nExample\n\noptimize_limit!(my_chart, settings=OptSettings(ic_solver=:SA))\n\n\n\n\n\n","category":"method"},{"location":"#SPM.optimize_limit-Tuple{ControlChart}","page":"Home","title":"SPM.optimize_limit","text":"optimize_limit(CH::ControlChart[; settings = OptSettings()])\n\nOptimizes the control limit of a ControlChart object, without modifying the original ControlChart object.\n\nArgs\n\nCH (ControlChart): The ControlChart object to optimize.\nsettings (OptSettings, optional): Optimization settings. Defaults to OptSettings().\n\nReturns\n\nThe optimized control limit value.\n\nRaises\n\nValueError: If the optimization method specified in settings is unknown.\n\nExample\n\noptimize_limit(my_chart, settings=OptSettings(ic_solver=:SA))\n\n\n\n\n\n","category":"method"},{"location":"#SPM.optimize_nlopt-Tuple{ControlChart, Function, OptSettings}","page":"Home","title":"SPM.optimize_nlopt","text":"optimize_nlopt(CH::ControlChart, rlconstr::Function, settings::OptSettings)\n\nOptimizes the Control Chart design parameter using the NLOpt library.\n\nArgs\n\nCH: The ControlChart object to be optimized.\nrlconstr: The objective function to be minimized.\nsettings: The settings for the optimization process. Includes:\nminpar_opt: The lower bounds for the parameters.\nmaxpar_opt: The upper bounds for the parameters.\nx_tol_opt: The relative tolerance for convergence.\nmaxiter_opt: The maximum number of iterations.\nmethod_opt: The optimization method to be used.\n\nReturns\n\nminx::Vector{Float64}: The set of optimal parameters for the Control Chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.run_path_sim-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.run_path_sim","text":"run_path_sim(CH::AbstractChart)\n\nSimulates a run length path for the control chart CH by sampling new data from its Phase II object.\n\nInputs\n\nCH::AbstractChart - A control chart.\nmaxiter::Real - The maximum value of the run length. Defaults to min(maxrl(CH), 10*get_nominal_value(CH))\n\nReturns\n\nA vector containing values of the control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.run_sim-Tuple{SPM.AbstractChart, SPM.AbstractPhase2}","page":"Home","title":"SPM.run_sim","text":"run_sim(CH::AbstractChart, DGP::AbstractPhase2)\n\nSimulates a run length for the control chart CH by sampling new data from the provided data-generating process DGP.\n\nInputs\n\nCH - A control chart.\nDGP - An AbstractPhase2 object.\n\nReturns\n\nAn Int.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.run_sim-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.run_sim","text":"run_sim(CH::AbstractChart)\n\nSimulates a run length for the control chart CH by sampling new data from its Phase II object.\n\nInputs\n\nCH - A control chart.\n\nReturns\n\nAn Int.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.run_sim_oc-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.run_sim_oc","text":"run_sim_oc(CH::AbstractChart; shift = 0.0)\n\nSimulates a run length under location shift for the control chart CH by sampling new data from its Phase II object.\n\nInputs\n\nCH - A control chart.\nshift - A location shift.\n\nReturns\n\nAn Int.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.run_sim_sa-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.run_sim_sa","text":"run_sim_sa(CH::AbstractChart, maxiter::Real, delta::Real)\n\nSimulates a run length for the control chart CH by sampling new data from the Phase II object, to be used by the stochastic approximation algorithm implemented in the saCL! function.\n\nInputs\n\nCH - A control chart.\nmaxiter - The maximum value of the run length.\ndelta - A value controlling how much the control limit must be shifted for the gain estimation during the first stage.\n\nReturns\n\nA NamedTuple containing the simulated run length, rl, the simulated run length with control limit shifted by delta, rlPlus, and the simulated run length with control limit shifted by -delta, rlMinus.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.saCL!-Tuple{ControlChart}","page":"Home","title":"SPM.saCL!","text":"saCL!(CH::ControlChart[; rlsim::Function, settings::OptSettings])\n\nComputes the control limit to satisfy the nominal properties of a control chart, using the stochastic approximation algorithm described in Capizzi and Masarotto (2016).\n\nInputs\n\nCH - A control chart.\nrlsim - A function that generates new data with signature rlsim(CH; maxiter, delta). If left unspecified, defaults to run_sim_sa. See the help for run_sim_sa for more information about the signature of the function.\nsettings - An OptSettings objects which contains variables that control the behaviour of the algorithm. See the Accepted settings section below for information about the settings that control the behaviour of the algorithm. For more information about the specifics of each keyword argument, see Capizzi and Masarotto (2016).\n\nSettings\n\nThe following settings control the behaviour of the algorithm: \n\nNfixed_sa - The number of iterations for the gain estimation stage.\nAfixed_sa - The fixed gain during the gain estimation stage.\nAmin_sa - The minimum allowed value of gain.\nAmax_sa - The maximum allowed value of gain.\ndelta_sa - The shift in control limit used during the gain estimation stage.\nq_sa - The power that controls the denominator in the Robbins-Monro algorithm.\ngamma_sa - The precision parameter for the stopping criterion of the algorithm.\nNmin_sa - The minimum number of iterations to avoid early terminations.\nz_sa - The quantile of the Normal(0,1) that controls the probability of the stopping criterion being satisfied.\nCmrl_sa - The inflation factor for the maximum number of iterations the run length may run for.\nmaxiter_sa - Maximum number of iterations before the algorithm is forcibly ended.\nverbose_sa - Whether to print information to the user about the state of the optimization.\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nCapizzi, G., & Masarotto, G. (2016). \"Efficient Control Chart Calibration by Simulated Stochastic Approximation\". IIE Transactions 48 (1). https://doi.org/10.1080/0740817X.2015.1055392.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.saCL-Tuple{ControlChart}","page":"Home","title":"SPM.saCL","text":"saCL(CH::ControlChart[; rlsim::Function, settings::OptSettings])\n\nApplies the stochastic approximation algorithm of Capizzi and Masarotto (2016) without modifying the control chart object CH. See the documentation of saCL! for more information about the algorithm and the keyword arguments.\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nCapizzi, G., & Masarotto, G. (2016). \"Efficient Control Chart Calibration by Simulated Stochastic Approximation\". IIE Transactions 48 (1). https://doi.org/10.1080/0740817X.2015.1055392.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_design!-Tuple{SPM.AbstractChart, Any}","page":"Home","title":"SPM.set_design!","text":"get_design(CH::AbstractChart)\n\nSet the designs of the control chart statistic.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_limit!-Tuple{SPM.AbstractChart, SPM.AbstractLimit}","page":"Home","title":"SPM.set_limit!","text":"function set_limit!(CH::AbstractChart, limit::AbstractLimit)\n\nSet the control limit of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_nominal!-Union{Tuple{C}, Tuple{N}, Tuple{C, N}} where {N<:SPM.NominalProperties, C<:SPM.AbstractChart}","page":"Home","title":"SPM.set_nominal!","text":"set_nominal!(CH::AbstractChart, nominal::NominalProperties)\n\nSet the nominal properties of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_phase1!-Union{Tuple{C}, Tuple{PH1}, Tuple{C, PH1}} where {PH1<:SPM.AbstractPhase2, C<:SPM.AbstractChart}","page":"Home","title":"SPM.set_phase1!","text":"set_phase1!(CH::AbstractChart, phase1::AbstractPhase2)\n\nSet the Phase 1 information of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_statistic!-Union{Tuple{C}, Tuple{STAT}, Tuple{C, STAT}} where {STAT<:SPM.AbstractStatistic, C<:SPM.AbstractChart}","page":"Home","title":"SPM.set_statistic!","text":"function set_statistic!(CH::AbstractChart, statistic::AbstractStatistic)\n\nSet the statistic of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_value!-Tuple{SPM.AbstractStatistic, Any}","page":"Home","title":"SPM.set_value!","text":"function set_value!(stat::AbstractStatistic, value)\n\nSet the value of a statistic.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_value!-Union{Tuple{C}, Tuple{C, Any}} where C<:SPM.AbstractChart","page":"Home","title":"SPM.set_value!","text":"function set_value!(CH::AbstractChart, value)\n\nSet the value of the statistic of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.shallow_copy_sim-Tuple{ControlChart}","page":"Home","title":"SPM.shallow_copy_sim","text":"shallow_copy_sim(CH::AbstractChart)\n\nCreate a shallow copy of a control chart, so that only the statistic and the control limit are copied. This is done to prevent copying the Phase 1 data multiple times and thus reduce computational effort.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.update_chart!-Tuple{SPM.AbstractChart, Any}","page":"Home","title":"SPM.update_chart!","text":"update_chart!(CH::AbstractChart, x)\n\nUpdate the control chart inplace using a new observation x.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.update_chart-Tuple{SPM.AbstractChart, Any}","page":"Home","title":"SPM.update_chart","text":"update_chart(CH::AbstractChart, x)\n\nUpdate the control chart without modifying it using a new observation x.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.update_limit!-Union{Tuple{SPM.AbstractChart{S, L, N, P1}}, Tuple{P1}, Tuple{N}, Tuple{L}, Tuple{S}} where {S, L<:SPM.BootstrapLimit, N, P1}","page":"Home","title":"SPM.update_limit!","text":"update_limit!(CH::AbstractChart, x)\n\nUpdate the dynamic control limit of a control chart inplace.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.update_statistic-Tuple{SPM.AbstractStatistic, Any}","page":"Home","title":"SPM.update_statistic","text":"update_statistic!(stat::AbstractStatistic, x)\n\nUpdate a statistic with a new observation x\n\n\n\n\n\n","category":"method"},{"location":"#SPM.update_value!-Tuple{SPM.BootstrapLimit, ARL}","page":"Home","title":"SPM.update_value!","text":"get_value(L::BootstrapLimit, NM::ARL)\nget_value(L::BootstrapLimit, NM::QRL)\n\n\n\n\n\n","category":"method"},{"location":"#SPM.AEWMA","page":"Home","title":"SPM.AEWMA","text":"AEWMA(λ, k, value)\n\nAdaptive exponentially weighted moving average with design parameters λ, k, and initial value value.\n\nThe update mechanism based on a new observation x is given by\n\nvalue = (1-phi(e))*value + phi(e) * x,\n\nwhere phi(e) is a forecast error function based on the Huber function.\n\nReferences\n\nCapizzi, G. & Masarotto, G. (2003). An Adaptive Exponentially Weighted Moving Average Control Chart. Technometrics, 45(3), 199-207.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.ARL","page":"Home","title":"SPM.ARL","text":"ARL(value)\n\nValue of the in-control average run length of the control chart, i.e. if RL = inft  0 textChart detects OC is the run length, then the average run length ARL is\n\nARL = mathbbERLtau = +infty,\n\nwhere tau = +infty represents the process being in-control.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.BlockBootstrap","page":"Home","title":"SPM.BlockBootstrap","text":"BlockBootstrap{T} <: AbstractSampling\n\nRepresents a (circular) block bootstrap sampling method.\n\nFields\n\nblock::T: The current block of data being sampled from.\nblocksize::Int: The size of each block.\nt::Int: The current index within the block.\n\nConstructors\n\nBlockBootstrap(blocksize::Int, data::Vector{T}) where T: Constructs a BlockBootstrap object for a vector of data.\nBlockBootstrap(blocksize::Int, data::Matrix{T}) where T: Constructs a BlockBootstrap object for a matrix of data.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.CUSUM","page":"Home","title":"SPM.CUSUM","text":"CUSUM(k, value, upw::Bool)\n\nCUSUM statistic with design parameter k and initial value value.\n\nThe update mechanism based on a new observation x is given by:\n\nif upw == true, then value = max0 value + x - k;\nif upw == false, then value = min0 value + x + k.\n\nReferences\n\nPage, E. S. (1954). Continuous Inspection Schemes. Biometrika, 41(1/2), 100. https://doi.org/10.2307/2333009\n\n\n\n\n\n","category":"type"},{"location":"#SPM.EWMA","page":"Home","title":"SPM.EWMA","text":"EWMA(λ, value)\n\nExponentially weighted moving average with design parameter λ and initial value value.\n\nThe update mechanism based on a new observation x is given by\n\nvalue = (1-λ)*value + λ * x.\n\nReferences\n\nRoberts, S. W. (1959). Control Chart Tests Based on Geometric Moving Averages. Technometrics, 1(3), 239-250. https://doi.org/10.1080/00401706.1959.10489860\n\n\n\n\n\n","category":"type"},{"location":"#SPM.LocationScaleStatistic","page":"Home","title":"SPM.LocationScaleStatistic","text":"LocationScaleStatistic{S, M, P}\n\nA mutable struct representing a statistic applied to a location-scale family.\n\nFields\n\nstat::S: The statistic.\nμ::M: The location parameter.\nΩ::P: The precision parameter (inverse of the variance).\n\nExamples\n\nSTAT = EWMA(λ = 0.2)\nRSTAT = LocationScaleStatistic(STAT, 1.0, 2.5)\n\n\n\n\n\n","category":"type"},{"location":"#SPM.OneSidedCurvedLimit","page":"Home","title":"SPM.OneSidedCurvedLimit","text":"OneSidedCurvedLimit(h::Float64, upw::Bool)\nOneSidedCurvedLimit(h::Vector{T}, upw::Vector{Bool})\n\nCurved one-sided limit, such that the run length RL of a control chart is the first time t in which the statistic C_t crosses the limit.\n\nif upw == true, RL = inft  C_t  hcdot f(t)\nif upw == false, RL = inft  C_t  -hcdot f(t)\n\nNote that h > 0 by the way it is defined.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.OneSidedFixedLimit","page":"Home","title":"SPM.OneSidedFixedLimit","text":"OneSidedFixedLimit(h::Float64, upw::Bool)\n\nClassical fixed one-sided limit, such that the run length RL of a control chart is the first time t in which the statistic C_t crosses the limit.\n\nif upw == true, RL = inft  C_t  h\nif upw == false, RL = inft  C_t  h\n\nNote that h > 0 by the way it is defined.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.Phase2","page":"Home","title":"SPM.Phase2","text":"Phase2 is a struct that holds the reference sample data and a sampling method to generate new observations from the reference data. \n\nArguments\n\nsamp = Bootstrap(): The sampling method to be used to generate new observations. Defaults to Bootstrap().\ndata: The data obtained after phase 1.\n\nExamples\n\nx = randn(500) PH2 = Phase2(data = x)\n\n\n\n\n\n","category":"type"},{"location":"#SPM.Phase2Distribution","page":"Home","title":"SPM.Phase2Distribution","text":"Phase2Distribution{T} <: AbstractPhase2\n\nA struct representing Phase II observations, it is used to generate and monitor new data from the true data-generating process. It contains a field dist of type T, which represents the underlying data-generating process.\n\nNotes\n\nA method rand(::T) is required to generate new data from dist.\n\nExample\n\nDGP = Phase2Distribution(Normal(0,1))\nnew_data(DGP)\n\n\n\n\n\n","category":"type"},{"location":"#SPM.QRL","page":"Home","title":"SPM.QRL","text":"QRL(value, qtl)\n\nValue of the in-control quantile of the run length of the control chart, i.e. if RL = inft  0  textChart detects OC is the run length, then value is the value of the qtl-level quantile of the distribution of RL if the process is in-control.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.StationaryBootstrap","page":"Home","title":"SPM.StationaryBootstrap","text":"StationaryBootstrap{T} <: AbstractSampling\n\nRepresents a stationary block bootstrap sampling method, where the block length is sampled from a Geometric random variable.\n\nFields\n\nblock::T: The current block of data being sampled from.\nblocksize::Int: The average size of each block.\nt::Int: The current index within the block.\n\nConstructors\n\nStationaryBootstrap(blocksize::Int, data::Vector{T}) where T: Constructs a StationaryBootstrap object for a vector of data.\nStationaryBootstrap(blocksize::Int, data::Matrix{T}) where T: Constructs a StationaryBootstrap object for a matrix of data.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.TwoSidedCurvedLimit","page":"Home","title":"SPM.TwoSidedCurvedLimit","text":"TwoSidedCurvedLimit(h::Float64)\nTwoSidedCurvedLimit(h::Vector{T})\n\nCurved one-sided limit, such that the run length RL of a control chart is the first time t in which the statistic C_t crosses the limit.\n\nRL = inft  0  C_t  hcdot f(t).\n\nNote that h > 0 by the way it is defined.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.TwoSidedFixedLimit","page":"Home","title":"SPM.TwoSidedFixedLimit","text":"TwoSidedFixedLimit(h::Float64)\n\nClassical fixed two-sided limit, such that the run length RL of a control chart is the first time t in which the statistic C_t crosses the limit:\n\nRL = inft  0  C_t  h.\n\nNote that h > 0 by the way it is defined.\n\n\n\n\n\n","category":"type"}]
}
