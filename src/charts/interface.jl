using SPM
using Parameters

abstract type AbstractChart{STAT, LIM, NOM, PH1} end

#################################################################
#               Generic control chart interface                 #
#################################################################
@with_kw mutable struct ControlChart{STAT, LIM, NOM, PH1} <: AbstractChart{STAT, LIM, NOM, PH1}
    stat::STAT
    limit::LIM
    nominal::NOM
    phase1::PH1
    t::Int = 0
    @assert t >= 0
end
export ControlChart

ControlChart(stat::S, limit::L, nominal::N, phase1::P) where {S <: AbstractStatistic, L <: AbstractLimit, N <: NominalProperties, P <: AbstractPhase1} = ControlChart(stat, limit, nominal, phase1, 0)

shallow_copy_sim(CH::C) where C<:AbstractChart = C(deepcopy(get_statistic(CH)), deepcopy(get_limit(CH)), get_nominal(CH), get_phase1(CH), get_t(CH))
export shallow_copy_sim


"""
    get_limit(CH::AbstractChart)

Get the control limit of a control chart.
"""
get_limit(CH::AbstractChart) = CH.limit
export get_limit


"""
    get_limit_value(CH::AbstractChart)

Get the control limit value of a control chart.
"""
get_limit_value(CH::AbstractChart) = get_value(get_limit(CH))
get_limit_value(CH::AbstractChart{STAT,LIM,NOM,PH1}) where {STAT, LIM <: OneSidedCurvedLimit, NOM, PH1} = get_value(get_limit(CH), get_t(CH), get_statistic(CH))
get_limit_value(CH::AbstractChart{STAT,LIM,NOM,PH1}) where {STAT, LIM <: TwoSidedCurvedLimit, NOM, PH1} = get_value(get_limit(CH), get_t(CH), get_statistic(CH))
export get_limit_value


"""
    get_statistic(CH::AbstractChart)

Get the statistic of a control chart.
"""
get_statistic(CH::AbstractChart) = CH.stat
export get_statistic


"""
    get_value(CH::AbstractChart)
    
Get the current value of the control chart statistic.
"""
get_value(CH::AbstractChart) = get_value(get_statistic(CH))
export get_value


"""
    get_nominal(CH::AbstractChart)
    get_nominal_value(CH::AbstractChart)

Get the nominal properties of a control chart.
"""
get_nominal(CH::AbstractChart) = CH.nominal
export get_nominal
get_nominal_value(CH::AbstractChart) = get_value(get_nominal(CH))
export get_nominal_value


"""
    get_phase1(CH::AbstractChart)

Get the Phase 1 information of a control chart.
"""
get_phase1(CH::AbstractChart) = CH.phase1
export get_phase1

"""
    get_t(CH::AbstractChart)

Get the current time point from a control chart.
"""
get_t(CH::AbstractChart) = CH.t
export get_t



"""
    get_param(CH::AbstractChart)
    set_param!(CH::AbstractChart, par)
    
Get and set the parameters of the control chart statistic.
"""
get_param(CH::AbstractChart) = get_param(get_statistic(CH))
set_param!(CH::AbstractChart, par) = set_param!(get_statistic(CH), par)
export get_param
export set_param!


"""
    get_maxrl(CH::AbstractChart)
    
Get the maximum run length of the control chart.
"""
get_maxrl(CH::AbstractChart) = get_maxrl(get_statistic(CH))
export get_maxrl


"""
    update_chart!(CH::AbstractChart, x)
    
Update the control chart using a new observation `x`.
"""
function update_chart!(CH::AbstractChart, x)
    CH.t += 1
    update_statistic!(get_statistic(CH), x)
end

export update_chart!


"""
    is_IC(CH::AbstractChart)
    is_OC(CH::AbstractChart)
    
Check whether the control chart is in control or out of control.
"""
is_IC(CH::AbstractChart) = is_IC(get_limit(CH), get_statistic(CH))
is_IC(CH::AbstractChart{STAT,LIM,NOM,PH1}) where {STAT, LIM <: OneSidedCurvedLimit, NOM, PH1} = is_IC(get_limit(CH), get_t(CH), get_statistic(CH))
is_IC(CH::AbstractChart{STAT,LIM,NOM,PH1}) where {STAT, LIM <: TwoSidedCurvedLimit, NOM, PH1} = is_IC(get_limit(CH), get_t(CH), get_statistic(CH))
is_OC(CH::AbstractChart) = !is_IC(CH)
export is_IC
export is_OC


"""
    function set_statistic!(CH::AbstractChart, statistic::AbstractStatistic)

Set the statistic of a control chart.
"""
function set_statistic!(CH::C, statistic::STAT) where C <: AbstractChart where STAT <: AbstractStatistic
    CH.stat = statistic
    return statistic
end
export set_statistic!


"""
    function set_limit!(CH::AbstractChart, limit::AbstractLimit)

Set the control limit of a control chart.
"""
function set_limit!(CH::C, limit::LIM) where C <: AbstractChart where LIM <: AbstractLimit
    CH.limit = limit
    return limit
end

function set_limit!(CH::C, limit::Vector{Float64}) where C <: AbstractChart 
    set_value!(get_limit(CH), limit)
    return get_limit(CH)
end

function set_limit!(CH::C, limit::Float64) where C <: AbstractChart 
    set_value!(get_limit(CH), [limit])
    return get_limit(CH)
end
export set_limit! 


"""
    function set_parameter!(CH::C, par)

Set the parameters of the control chart statistic.
"""
function set_parameter!(CH::C, par) where C <: AbstractChart
    set_parameter!(get_statistic(CH), par)
    return par
end
export set_parameter!


"""
    set_phase1!(CH::AbstractChart, phase1::AbstractPhase1)

Set the Phase 1 information of a control chart.
"""
function set_phase1!(CH::C, phase1::PH1) where C <: AbstractChart where PH1 <: AbstractPhase1
    CH.phase1 = phase1
    return phase1
end
export set_phase1!

"""
    new_data(CH::AbstractChart)

Simulate a new observation for the control chart.
"""
new_data(CH::AbstractChart) = new_data(get_phase1(CH))
export new_data
    

"""
    set_nominal!(CH::AbstractChart, nominal::NominalProperties)

Set the nominal properties of a control chart.
"""
function set_nominal!(CH::C, nominal::N) where C <: AbstractChart where N <: NominalProperties
    CH.nominal = nominal
    return nominal
end
export set_nominal!

include("simulate.jl")