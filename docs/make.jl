push!(LOAD_PATH, "../src/")
using SPM
using Documenter

DocMeta.setdocmeta!(SPM, :DocTestSetup, :(using SPM); recursive=true)

makedocs(;
   modules=[SPM],
   authors="Daniele Zago <daniele.zago.1@phd.unipd.it>",
   repo="https://github.com/DedZago/SPM.jl/blob/{commit}{path}#{line}",
   sitename="SPM.jl",
   format=Documenter.HTML(;
                          prettyurls=get(ENV, "CI", "false") == "true",
                          canonical="https://DedZago.github.io/SPM.jl",
                          edit_link="main",
                          assets=String[],
                         ),
   pages=[
          "Introduction" => "index.md",
          # "Basic usage" => ["using_control_charts.md"],
          "Tutorials" => ["monitoring_mean_covariance.md", "monitoring_autoregressive.md", "monitoring_risk_adjusted.md", "monitoring_nonparametric_profiles.md"],
          "Reference" => ["statistics.md", "control_limits.md", "nominal_properties.md", "phase_2.md", "control_charts.md","optimization.md"]
         ],
  )

deploydocs(;
     repo="github.com/DedZago/SPM.jl",
     devbranch="main",
    )
