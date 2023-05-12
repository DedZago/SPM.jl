using FunctionWrappers
import FunctionWrappers.FunctionWrapper

abstract type OneSidedLimit <: AbstractLimit end
abstract type TwoSidedLimit <: AbstractLimit end

get_value(L::OneSidedLimit) = (-1.0)^(!L.upw) * get_h(L)
get_value(L::TwoSidedLimit) = [-get_h(L), get_h(L)]
#FIXME: rewrite interface to have h and value attributes, get_h and get_value as getter functions.

function compare_values(lim_val, stat_val, L::LIM) where LIM <: TwoSidedLimit
    if (stat_val < lim_val[1]) || (stat_val > lim_val[2])
        return false
    end
    return true
end

function compare_values(lim_val, stat_val, L::LIM) where LIM <: OneSidedLimit
    for i in 1:length(lim_val)
        if L.upw[i]
            stat_val[i] <= lim_val[i] || return false
        else
            stat_val[i] >= lim_val[i] || return false
        end
    end
    return true
end

"""
    OneSidedFixedLimit(h::Float64, upw::Bool)

Classical fixed one-sided limit, such that the run length ``RL`` of a control chart is the first time ``t`` in which the statistic ``C_t`` crosses the limit.

* if `upw == true`, ``RL = \\inf\\{t : C_t > h\\}``
* if `upw == false`, ``RL = \\inf\\{t : C_t < h\\}``

Note that `h > 0` by the way it is defined.
"""
@with_kw mutable struct OneSidedFixedLimit{T} <: OneSidedLimit
    h::T
    upw::Bool = true
    @assert h > 0.0
end
export OneSidedFixedLimit



"""
    TwoSidedFixedLimit(h::Float64)

Classical fixed two-sided limit, such that the run length ``RL`` of a control chart is the first time ``t`` in which the statistic ``C_t`` crosses the limit:

``RL = \\inf\\{t > 0 : |C_t| > h\\}``.

Note that `h > 0` by the way it is defined.
"""
@with_kw mutable struct TwoSidedFixedLimit{T} <: TwoSidedLimit
    h::T
    @assert h > 0.0
end
export TwoSidedFixedLimit



"""
    OneSidedCurvedLimit(h::Float64, upw::Bool)
    OneSidedCurvedLimit(h::Vector{T}, upw::Vector{Bool})

Curved one-sided limit, such that the run length ``RL`` of a control chart is the first time ``t`` in which the statistic ``C_t`` crosses the limit.

* if `upw == true`, ``RL = \\inf\\{t : C_t > h\\cdot f(t)\\}``
* if `upw == false`, ``RL = \\inf\\{t : C_t < -h\\cdot f(t)\\}``

Note that `h > 0` by the way it is defined.
"""
@with_kw mutable struct OneSidedCurvedLimit{T, S} <: OneSidedLimit
    h::T
    upw::Bool = true
    fun::FunctionWrapper{Float64, Tuple{Float64, AbstractStatistic}}

    function OneSidedCurvedLimit(h, upw::Bool, f::Function, stat::AbstractStatistic)
        @assert h > 0.0
        new{typeof(first(h)), typeof(stat)}(h, upw, FunctionWrapper{typeof(first(h)), Tuple{typeof(first(h)), typeof(stat)}}(f))
    end
end
export OneSidedCurvedLimit

get_value(L::OneSidedCurvedLimit, t, stat) = get_value(L) * L.fun(t, stat)


"""
    TwoSidedCurvedLimit(h::Float64)
    TwoSidedCurvedLimit(h::Vector{T})

Curved one-sided limit, such that the run length ``RL`` of a control chart is the first time ``t`` in which the statistic ``C_t`` crosses the limit.

``RL = \\inf\\{t > 0 : |C_t| > h\\cdot f(t)\\}``.

Note that `h > 0` by the way it is defined.
"""
@with_kw mutable struct TwoSidedCurvedLimit{T, S} <: TwoSidedLimit
    h::T
    fun::FunctionWrapper{Float64, Tuple{Float64, AbstractStatistic}}

    function TwoSidedCurvedLimit(h, f::Function, stat::AbstractStatistic)
        @assert h > 0.0
        new{typeof(first(h)), typeof(stat)}(h, FunctionWrapper{typeof(first(h)), Tuple{typeof(first(h)), typeof(stat)}}(f))
    end
end
export TwoSidedCurvedLimit

get_value(L::TwoSidedCurvedLimit, t, stat) = get_value(L) * L.fun(t, stat)


function is_IC(L::AbstractLimit, t, stat::AbstractStatistic)
    val = get_value(stat)
    lim = get_value(L, t, stat)
    return compare_values(lim, val, L)
end
