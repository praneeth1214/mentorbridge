import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CircleAlert,
  FileSearch,
  Lock,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'

type AnalysisStep = {
  label: string
  description: string
}

function AIAnalysis() {
  const location = useLocation()
  const navigate = useNavigate()

  const problem = location.state?.problem || ''
  const selectedDomain = location.state?.domain || ''

  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const steps: AnalysisStep[] = [
    {
      label: 'Reading your challenge',
      description: 'Understanding the context and specific obstacle.',
    },
    {
      label: 'Identifying experience requirements',
      description: 'Extracting the skills and experience relevant to the problem.',
    },
    {
      label: 'Preparing the match',
      description: 'Structuring the challenge for experience comparison.',
    },
  ]

  useEffect(() => {
    if (!problem) {
      navigate('/dashboard/find-mentor', { replace: true })
      return
    }

    const timers = [
      window.setTimeout(() => setCurrentStep(1), 900),
      window.setTimeout(() => setCurrentStep(2), 1800),
      window.setTimeout(() => setCompleted(true), 2700),
    ]

    return () => timers.forEach(clearTimeout)
  }, [problem, navigate])

  if (!problem) {
    return null
  }

  const handleContinue = () => {
    navigate('/dashboard/matches', {
      state: {
        problem,
        domain: selectedDomain,
      },
    })
  }

  return (
    <div className="min-h-full bg-[#EDE8D0] text-[#25251F]">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-10">

        {/* BACK */}
        <button
          onClick={() => navigate('/dashboard/find-mentor')}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#858272] hover:text-[#5F6754] transition-colors"
        >
          <ArrowLeft size={14} />
          Edit challenge
        </button>

        {/* HEADER */}
        <div className="mt-8 max-w-2xl">
          <div className="flex items-center gap-2 text-[#5F6754]">
            <Sparkles size={16} />
            <span className="text-xs font-semibold uppercase tracking-[0.15em]">
              AI Analysis
            </span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            Understanding your challenge
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#666457] leading-relaxed">
            MENTORBRIDGE is preparing your challenge for experience matching.
          </p>
        </div>

        {/* PROBLEM SUMMARY */}
        <section className="mt-8 bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#DCD6BD] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSearch size={16} className="text-[#5F6754]" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666457]">
                Your challenge
              </span>
            </div>

            {selectedDomain && (
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#E3E6D9] text-[#5F6754]">
                {selectedDomain}
              </span>
            )}
          </div>

          <div className="p-6">
            <p className="text-sm text-[#25251F] leading-7 whitespace-pre-wrap">
              {problem}
            </p>
          </div>
        </section>

        {/* ANALYSIS */}
        <section className="mt-5 bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg">
          <div className="p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                <Sparkles size={17} className="text-[#5F6754]" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Analysis progress
                </h2>
                <p className="text-xs text-[#858272] mt-1">
                  Extracting the information needed for matching.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {steps.map((step, index) => {
                const isComplete = completed || index < currentStep
                const isCurrent = !completed && index === currentStep

                return (
                  <div key={step.label} className="flex gap-4">

                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                          isComplete
                            ? 'bg-[#E3E6D9] border-[#C8CDBB] text-[#5F6754]'
                            : isCurrent
                              ? 'bg-[#5F6754] border-[#5F6754] text-white'
                              : 'bg-[#EDE8D0] border-[#DCD6BD] text-[#A7A38E]'
                        }`}
                      >
                        {isComplete ? (
                          <Check size={14} />
                        ) : (
                          <span className="text-[11px] font-semibold">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {index < steps.length - 1 && (
                        <div className="w-px h-8 bg-[#DCD6BD] mt-1" />
                      )}
                    </div>

                    <div className="pt-1">
                      <p className="text-sm font-medium text-[#25251F]">
                        {step.label}
                      </p>

                      <p className="mt-1 text-xs text-[#858272] leading-relaxed">
                        {step.description}
                      </p>

                      {isCurrent && (
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-[#5F6754]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5F6754] animate-pulse" />
                          Processing
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* RESULT / NEXT */}
        {completed && (
          <section className="mt-5 bg-[#E3E6D9] border border-[#C8CDBB] rounded-lg p-6 sm:p-8">

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-md bg-[#F8F5E9] flex items-center justify-center shrink-0">
                <Check size={17} className="text-[#5F6754]" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Challenge analysis prepared
                </h2>

                <p className="mt-1.5 text-xs text-[#666457] leading-relaxed max-w-2xl">
                  Your challenge is ready to be compared with professional
                  experience. The next step will identify relevant mentors and
                  explain why their experience matches your problem.
                </p>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">

              <div className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-md p-4">
                <Search size={16} className="text-[#5F6754]" />
                <p className="mt-3 text-xs font-semibold">
                  Problem signals
                </p>
                <p className="mt-1 text-[11px] text-[#858272]">
                  Context and obstacles extracted.
                </p>
              </div>

              <div className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-md p-4">
                <Users size={16} className="text-[#5F6754]" />
                <p className="mt-3 text-xs font-semibold">
                  Experience search
                </p>
                <p className="mt-1 text-[11px] text-[#858272]">
                  Relevant professional experience will be compared.
                </p>
              </div>

              <div className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-md p-4">
                <CircleAlert size={16} className="text-[#5F6754]" />
                <p className="mt-3 text-xs font-semibold">
                  Explainable match
                </p>
                <p className="mt-1 text-[11px] text-[#858272]">
                  Each result will include a reason for its relevance.
                </p>
              </div>

            </div>

            <div className="mt-7 pt-6 border-t border-[#C8CDBB] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-center gap-2 text-[11px] text-[#666457]">
                <Lock size={13} />
                <span>
                  This analysis will be recorded in the trust ledger.
                </span>
              </div>

              <button
                onClick={handleContinue}
                className="inline-flex items-center justify-center gap-2 bg-[#5F6754] hover:bg-[#4D5544] text-white text-sm font-semibold px-5 py-3 rounded-md transition-colors"
              >
                Find Matching Mentors
                <ArrowRight size={16} />
              </button>

            </div>
          </section>
        )}

        {/* FOOTNOTE */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#858272]">
          <ChevronRight size={13} />
          <span>
            Matching is based on experience relevance, not popularity.
          </span>
        </div>

      </div>
    </div>
  )
}

export default AIAnalysis