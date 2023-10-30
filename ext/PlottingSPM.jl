module PlottingSPM # Should be same name as the file (just like a normal package)

using SPM, Plots

function SPM.plot_series(PCTL::ProcessControl; kw_ind::Dict = Dict(), kw_main::Dict = Dict())
    vals = hcat(PCTL.stat...)
    lims = hcat(collect.(PCTL.lim)...)
    plt_i = []
    val_row = eachrow(vals)
    lim_row = eachrow(lims)
    for i in 1:length(val_row)
        push!(plt_i, plot(val_row[i]; title="Chart " * string(i), label=""))
        limits = hcat(get_value.(lim_row[i])...)
        for h in axes(limits, 1)
            plot!(plt_i[i], limits[h,:], label = "", linestyle=:dash)
        end
    end
    plt = plot(plt_i...; kw_main...)
    plt
end

end # module
