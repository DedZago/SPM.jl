var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = SPM","category":"page"},{"location":"#SPM","page":"Home","title":"SPM","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for SPM, a package for Statistical Process Monitoring.","category":"page"},{"location":"#Package-features","page":"Home","title":"Package features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Standard control charts\nUnivariate Shewhart, EWMA, AEWMA, and CUSUM control charts;\nMEWMA and MAEWMA control charts;\nControl limits\nClassical one-sided and two-sided control limits;\nSupport for multi-chart combinations;\nDynamic control limits based on bootstrap and permutation methods;\nOptimization methods\nState-of-the-art methods for estimating control limits;\nOptimization of control chart parameters against user-defined out-of-control scenarios;\nExtensibility to user-made control statistics\nUsers only need to define the behaviour of the control statistic (struct and sequential update function), everything else is taken care of by the package.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [SPM]\nOrder   = [:function, :type]","category":"page"},{"location":"#SPM.apply_chart!-Tuple{SPM.AbstractChart, AbstractVector}","page":"Home","title":"SPM.apply_chart!","text":"apply_chart(CH::AbstractChart, x::AbstractVecOrMat)\napply_chart!(CH::AbstractChart, x::AbstractVector)\napply_chart!(CH::AbstractChart, x::AbstractMatrix)\n\nApply a control chart to a data vector or data matrix x.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.calculate_limit_gradient-Tuple{SPM.AbstractChart, Any}","page":"Home","title":"SPM.calculate_limit_gradient","text":"calculate_limit_gradient(CH::AbstractChart, rl::Real)\ncalculate_limit_gradient(nominal::ARL, rl)\ncalculate_limit_gradient(nominal::QRL, rl)\n\nCalculate the gradient for the optimization of the control limit.\n\nIf the control chart nominal attribute is of type ARL, then the gradient is calculated according to Equation (9) of Capizzi and Masarotto (2016).\n\nIf the control chart nominal attribute is of type QRL, then the gradient is calculated using the recursion on page 280 of Capizzi and Masarotto (2009)\n\nReferences\n\nCapizzi, G., & Masarotto, G. (2016). \"Efficient Control Chart Calibration by Simulated Stochastic Approximation\". IIE Transactions 48 (1). https://doi.org/10.1080/0740817X.2015.1055392.\n\nCapizzi, G. & Masarotto, G. (2009) Bootstrap-based design of residual control charts, IIE Transactions, 41:4, 275-286, DOI: https://doi.org/10.1080/07408170802120059 \n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_limit-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_limit","text":"get_limit(CH::AbstractChart)\n\nGet the control limit of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_limit_value-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_limit_value","text":"get_limit_value(CH::AbstractChart)\n\nGet the control limit value of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_maxrl-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_maxrl","text":"get_maxrl(CH::AbstractChart)\n\nGet the maximum run length of the control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_nominal-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_nominal","text":"get_nominal(CH::AbstractChart)\n\nGet the nominal properties of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_nominal_value-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_nominal_value","text":"get_nominal(CH::AbstractChart)\n\nGet the nominal value of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_parameter-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_parameter","text":"get_parameter(CH::AbstractChart)\n\nGet the parameters of the control chart statistic.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_phase1-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_phase1","text":"get_phase1(CH::AbstractChart)\n\nGet the Phase 1 information of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_statistic-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_statistic","text":"get_statistic(CH::AbstractChart)\n\nGet the statistic of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_t-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_t","text":"get_t(CH::AbstractChart)\n\nGet the current time point of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.get_value-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.get_value","text":"get_value(CH::AbstractChart)\n\nGet the current value of the control chart statistic.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.is_IC-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.is_IC","text":"is_IC(CH::AbstractChart)\nis_OC(CH::AbstractChart)\n\nCheck whether the control chart is in control or out of control.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.is_IC_vec-Tuple{MultipleControlChart}","page":"Home","title":"SPM.is_IC_vec","text":"is_IC_vec(CH::MultipleControlChart)\nis_OC_vec(CH::MultipleControlChart)\n\nCheck whether each individual control chart that makes up a multiple control chart is in control or out of control.\n\nReturns\n\nA vector of Bool, whose length is the number of individual statstics.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.new_data-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.new_data","text":"new_data(CH::AbstractChart)\n\nSimulate a new observation for the control chart from the Phase 1 data.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.new_data-Union{Tuple{SPM.AbstractPhase1{T}}, Tuple{T}} where T<:(AbstractVector)","page":"Home","title":"SPM.new_data","text":"new_data(P1::AbstractPhase1{T})\nnew_data(P1::AbstractPhase1{AbstractVector})\nnew_data(P1::AbstractPhase1{AbstractMatrix})\n\nGenerates a new observation based on the observed Phase I (in-control) data. If it is not overloaded, then it defaults to generating data using a nonparametric bootstrap.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.run_sim-Tuple{SPM.AbstractChart}","page":"Home","title":"SPM.run_sim","text":"run_sim(CH::AbstractChart)\n\nSimulates a run length for the control chart CH by sampling new data from the Phase I object.\n\nInputs\n\nCH - A control chart.\n\nReturns\n\nAn Int.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.run_sim_sa-Tuple{SPM.AbstractChart, Real, Real}","page":"Home","title":"SPM.run_sim_sa","text":"run_sim_sa(CH::AbstractChart, maxiter::Real, deltaSA::Real)\n\nSimulates a run length for the control chart CH by sampling new data from the Phase I object, to be used by the stochastic approximation algorithm implemented in the saCL! function.\n\nInputs\n\nCH - A control chart.\nmaxiter - The maximum value of the run length.\ndeltaSA - A value controlling how much the control limit must be shifted for the gain estimation during the first stage.\n\nReturns\n\nA NamedTuple containing the simulated run length, rl, the simulated run length with control limit shifted by deltaSA, rlPlus, and the simulated run length with control limit shifted by -deltaSA, rlMinus.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.saCL!-Tuple{ControlChart}","page":"Home","title":"SPM.saCL!","text":"saCL!(CH::ControlChart; kw...)\n\nComputes the control limit to satisfy the nominal properties of a control chart, using the stochastic approximation algorithm described in Capizzi and Masarotto (2016).\n\nInputs\n\nCH - A control chart.\nkw... - Keyword arguments that control the behaviour of the algorithm. For more information about the specifics of each keyword argument, see Capizzi and Masarotto (2016).\n\nKeyword arguments:\n\nrlsim - A function that generates new data with signature rlsim(CH, maxiter, deltaSA). If left unspecified, defaults to new_data_sa. See the help for new_data_sa for more information.\nNfixed - The number of iterations for the gain estimation stage.\nAfixed - The fixed gain during the gain estimation stage.\nAmin - The minimum allowed value of gain.\nAmax - The maximum allowed value of gain.\ndeltaSA - The shift in control limit used during the gain estimation stage.\nq - The power that controls the denominator in the Robbins-Monro algorithm.\ngamma - The precision parameter for the stopping criterion of the algorithm.\nNmin - The minimum number of iterations required for the algorithm to end.\nz - The quantile of the Normal(0,1) that controls the probability of the stopping criterion being satisfied.\nCmrl - The inflation factor for the maximum number of iterations the run length may run for.\nmaxiter - Maximum number of iterations before the algorithm is forcibly ended.\nverbose - Whether to print information to the user about the state of the optimization.\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nCapizzi, G., & Masarotto, G. (2016). \"Efficient Control Chart Calibration by Simulated Stochastic Approximation\". IIE Transactions 48 (1). https://doi.org/10.1080/0740817X.2015.1055392.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.saCL-Tuple{ControlChart}","page":"Home","title":"SPM.saCL","text":"saCL(CH::ControlChart; kw...)\n\nApplies the stochastic approximation algorithm of Capizzi and Masarotto (2016) without modifying the control chart object CH. See the documentation of saCL! for more information about the algorithm and keyword arguments.\n\nReturns\n\nA NamedTuple containing the estimated control limit h, the total number of iterations iter, and information status about the convergence of the algorithm.\n\nReferences\n\nCapizzi, G., & Masarotto, G. (2016). \"Efficient Control Chart Calibration by Simulated Stochastic Approximation\". IIE Transactions 48 (1). https://doi.org/10.1080/0740817X.2015.1055392.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_limit!-Tuple{SPM.AbstractChart, SPM.AbstractLimit}","page":"Home","title":"SPM.set_limit!","text":"function set_limit!(CH::AbstractChart, limit::AbstractLimit)\n\nSet the control limit of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_nominal!-Union{Tuple{C}, Tuple{N}, Tuple{C, N}} where {N<:SPM.NominalProperties, C<:SPM.AbstractChart}","page":"Home","title":"SPM.set_nominal!","text":"set_nominal!(CH::AbstractChart, nominal::NominalProperties)\n\nSet the nominal properties of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_parameter!-Tuple{SPM.AbstractChart, Any}","page":"Home","title":"SPM.set_parameter!","text":"get_parameter(CH::AbstractChart)\n\nSet the parameters of the control chart statistic.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_phase1!-Union{Tuple{C}, Tuple{PH1}, Tuple{C, PH1}} where {PH1<:SPM.AbstractPhase1, C<:SPM.AbstractChart}","page":"Home","title":"SPM.set_phase1!","text":"set_phase1!(CH::AbstractChart, phase1::AbstractPhase1)\n\nSet the Phase 1 information of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.set_statistic!-Union{Tuple{C}, Tuple{STAT}, Tuple{C, STAT}} where {STAT<:SPM.AbstractStatistic, C<:SPM.AbstractChart}","page":"Home","title":"SPM.set_statistic!","text":"function set_statistic!(CH::AbstractChart, statistic::AbstractStatistic)\n\nSet the statistic of a control chart.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.shallow_copy_sim-Tuple{ControlChart}","page":"Home","title":"SPM.shallow_copy_sim","text":"shallow_copy_sim(CH::AbstractChart)\n\nCreate a shallow copy of a control chart, so that only the statistic and the control limit are copied. This is done to prevent copying the Phase 1 data multiple times and thus reduce computational effort.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.update_chart!-Tuple{SPM.AbstractChart, Any}","page":"Home","title":"SPM.update_chart!","text":"update_chart!(CH::AbstractChart, x)\n\nUpdate the control chart inplace using a new observation x.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.update_chart-Tuple{SPM.AbstractChart, Any}","page":"Home","title":"SPM.update_chart","text":"update_chart(CH::AbstractChart, x)\n\nUpdate the control chart without modifying it using a new observation x.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.update_limit!-Union{Tuple{SPM.AbstractChart{S, L, N, P1}}, Tuple{P1}, Tuple{N}, Tuple{L}, Tuple{S}} where {S, L<:SPM.BootstrapLimit, N, P1}","page":"Home","title":"SPM.update_limit!","text":"update_limit!(CH::AbstractChart, x)\n\nUpdate the dynamic control limit of a control chart inplace.\n\n\n\n\n\n","category":"method"},{"location":"#SPM.ARL","page":"Home","title":"SPM.ARL","text":"ARL(value)\n\nValue of the in-control average run length of the control chart, i.e. if RL = inft  0 textChart detects OC is the run length, then the average run length ARL is\n\nARL = mathbbERLtau = +infty,\n\nwhere tau = +infty represents the process being in-control.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.CUSUM","page":"Home","title":"SPM.CUSUM","text":"CUSUM(k, value, upw::Bool)\n\nCUSUM statistic with parameter k and initial value value.\n\nThe update mechanism based on a new observation x is given by:\n\nif upw == true, then value = max0 value + x - k;\nif upw == false, then value = min0 value + x + k.\n\nReferences\n\nPage, E. S. (1954). Continuous Inspection Schemes. Biometrika, 41(1/2), 100. https://doi.org/10.2307/2333009\n\n\n\n\n\n","category":"type"},{"location":"#SPM.EWMA","page":"Home","title":"SPM.EWMA","text":"EWMA(λ, value)\n\nExponentially weighted moving average with parameter λ and initial value value.\n\nThe update mechanism based on a new observation x is given by\n\nvalue = (1-λ)*value + λ * x.\n\nReferences\n\nRoberts, S. W. (1959). Control Chart Tests Based on Geometric Moving Averages. Technometrics, 1(3), 239-250. https://doi.org/10.1080/00401706.1959.10489860\n\n\n\n\n\n","category":"type"},{"location":"#SPM.OneSidedCurvedLimit","page":"Home","title":"SPM.OneSidedCurvedLimit","text":"OneSidedCurvedLimit(value::Float64, upw::Bool)\nOneSidedCurvedLimit(value::Vector{T}, upw::Vector{Bool})\n\nCurved one-sided limit, such that the run length RL of a control chart is the first time t in which the statistic C_t crosses the limit.\n\nif upw == true, RL = inft  C_t  valuecdot f(t)\nif upw == false, RL = inft  C_t  -valuecdot f(t)\n\nNote that value > 0 by the way it is defined.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.OneSidedFixedLimit","page":"Home","title":"SPM.OneSidedFixedLimit","text":"OneSidedFixedLimit(value::Float64, upw::Bool)\n\nClassical fixed one-sided limit, such that the run length RL of a control chart is the first time t in which the statistic C_t crosses the limit.\n\nif upw == true, RL = inft  C_t  value\nif upw == false, RL = inft  C_t  value\n\nNote that value > 0 by the way it is defined.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.QRL","page":"Home","title":"SPM.QRL","text":"QRL(value, qtl)\n\nValue of the in-control quantile of the run length of the control chart, i.e. if RL = inft  0  textChart detects OC is the run length, then value is the value of the qtl-level quantile of the distribution of RL if the process is in-control.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.TwoSidedCurvedLimit","page":"Home","title":"SPM.TwoSidedCurvedLimit","text":"TwoSidedCurvedLimit(value::Float64)\nTwoSidedCurvedLimit(value::Vector{T})\n\nCurved one-sided limit, such that the run length RL of a control chart is the first time t in which the statistic C_t crosses the limit.\n\nRL = inft  0  C_t  valuecdot f(t).\n\nNote that value > 0 by the way it is defined.\n\n\n\n\n\n","category":"type"},{"location":"#SPM.TwoSidedFixedLimit","page":"Home","title":"SPM.TwoSidedFixedLimit","text":"TwoSidedFixedLimit(value::Float64)\n\nClassical fixed two-sided limit, such that the run length RL of a control chart is the first time t in which the statistic C_t crosses the limit:\n\nRL = inft  0  C_t  value.\n\nNote that value > 0 by the way it is defined.\n\n\n\n\n\n","category":"type"}]
}
