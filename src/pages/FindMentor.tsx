import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react'

export default function FindMentor() {
  const navigate = useNavigate()

  const [problem, setProblem] = useState('')
  const [domain, setDomain] = useState('')
  const [error, setError] = useState('')

  const handleContinue = () => {
    const trimmedProblem = problem.trim()

    if (trimmedProblem.length < 30) {
      setError(
        'Please describe your challenge in at least 30 characters.',
      )
      return
    }

    setError('')

    const challenge = {
      problem: trimmedProblem,
      domain,
    }

    // Save the current challenge for Knowledge Copilot
    localStorage.setItem(
      'mentorbridge_current_challenge',
      JSON.stringify(challenge),
    )

    // Continue to AI analysis
    navigate('/dashboard/ai-analysis', {
      state: challenge,
    })
  }

  return (
    <div className="min-h-full bg-[#EDE8D0] text-[#25251F]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className="mb-8">

          <div className="flex items-center gap-2 text-xs text-[#858272] mb-3">
            <Lightbulb size={13} />
            <span>Experience Matching</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Describe your challenge
          </h1>

          <p className="mt-2 text-sm text-[#666457] max-w-2xl leading-relaxed">
            Tell MENTORBRIDGE what you are trying to solve. We will
            analyze the problem and identify professionals with relevant
            experience.
          </p>

        </header>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">

          {/* ===================================================
              PROBLEM FORM
          =================================================== */}
          <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden">

            <div className="px-6 py-5 border-b border-[#DCD6BD]">
              <h2 className="text-sm font-semibold">
                Your challenge
              </h2>

              <p className="text-xs text-[#858272] mt-1">
                Be specific about the problem, context, and what you
                need help with.
              </p>
            </div>

            <div className="p-6">

              {/* Problem */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="problem"
                    className="text-xs font-semibold text-[#25251F]"
                  >
                    Problem description
                  </label>

                  <span className="text-[10px] text-[#A7A38E]">
                    {problem.length} characters
                  </span>
                </div>

                <textarea
                  id="problem"
                  value={problem}
                  onChange={(event) => {
                    setProblem(event.target.value)
                    setError('')
                  }}
                  placeholder="Example: We are building a platform for small retailers to predict inventory demand, but our current forecasting approach performs poorly when demand changes suddenly..."
                  rows={10}
                  className="
                    w-full
                    resize-none
                    bg-[#EDE8D0]/50
                    border border-[#DCD6BD]
                    rounded-md
                    px-4 py-3
                    text-sm
                    leading-relaxed
                    text-[#25251F]
                    placeholder:text-[#A7A38E]
                    outline-none
                    focus:border-[#9AA18B]
                    focus:bg-[#F8F5E9]
                    transition-colors
                  "
                />

                {error && (
                  <p className="mt-2 text-xs text-[#9A625B]">
                    {error}
                  </p>
                )}
              </div>

              {/* Domain */}
              <div className="mt-6">
                <label
                  htmlFor="domain"
                  className="block text-xs font-semibold text-[#25251F] mb-2"
                >
                  Domain
                  <span className="ml-1 text-[#A7A38E] font-normal">
                    optional
                  </span>
                </label>

                <select
                  id="domain"
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  className="
                    w-full
                    bg-[#EDE8D0]/50
                    border border-[#DCD6BD]
                    rounded-md
                    px-4
                    py-3
                    text-sm
                    text-[#25251F]
                    outline-none
                    focus:border-[#9AA18B]
                    transition-colors
                  "
                >
                  <option value="">
                    Select a domain
                  </option>

                  <option value="Data & AI">
                    Data & AI
                  </option>

                  <option value="Technology">
                    Technology
                  </option>

                  <option value="Product">
                    Product
                  </option>

                  <option value="Business">
                    Business
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                  <option value="Operations">
                    Operations
                  </option>

                  <option value="Healthcare">
                    Healthcare
                  </option>

                  <option value="Cybersecurity">
                    Cybersecurity
                  </option>
                </select>
              </div>

              {/* Submit */}
              <div className="mt-7 flex justify-end">

                <button
                  onClick={handleContinue}
                  disabled={problem.trim().length < 30}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    bg-[#5F6754]
                    hover:bg-[#4D5544]
                    disabled:bg-[#DCD6BD]
                    disabled:text-[#A7A38E]
                    text-white
                    font-semibold
                    px-5
                    py-3
                    rounded-md
                    transition-colors
                  "
                >
                  Analyze My Challenge
                  <ArrowRight size={16} />
                </button>

              </div>

            </div>
          </section>

          {/* ===================================================
              GUIDANCE PANEL
          =================================================== */}
          <aside className="space-y-6">

            {/* What to include */}
            <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg p-5">

              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A7A38E]">
                What to include
              </p>

              <div className="mt-4 space-y-4">

                <div className="flex gap-3">
                  <CheckCircle2
                    size={15}
                    className="text-[#5F6754] shrink-0 mt-0.5"
                  />

                  <div>
                    <p className="text-xs font-medium">
                      Current situation
                    </p>

                    <p className="text-[11px] text-[#858272] mt-1 leading-relaxed">
                      What are you currently trying to build or solve?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2
                    size={15}
                    className="text-[#5F6754] shrink-0 mt-0.5"
                  />

                  <div>
                    <p className="text-xs font-medium">
                      Main difficulty
                    </p>

                    <p className="text-[11px] text-[#858272] mt-1 leading-relaxed">
                      What is preventing you from moving forward?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2
                    size={15}
                    className="text-[#5F6754] shrink-0 mt-0.5"
                  />

                  <div>
                    <p className="text-xs font-medium">
                      What you need
                    </p>

                    <p className="text-[11px] text-[#858272] mt-1 leading-relaxed">
                      What kind of experience or guidance would help?
                    </p>
                  </div>
                </div>

              </div>

            </section>

            {/* Process */}
            <section className="bg-[#5F6754] rounded-lg p-5 text-white">

              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                What happens next
              </p>

              <div className="mt-5 space-y-4">

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-semibold shrink-0">
                    01
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    AI analyzes the problem and identifies relevant
                    experience requirements.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-semibold shrink-0">
                    02
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    Experience similarity is calculated across the
                    available professionals.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-semibold shrink-0">
                    03
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed">
                    You receive explainable mentor recommendations.
                  </p>
                </div>

              </div>

            </section>

          </aside>
        </div>

        {/* =====================================================
            TRUST NOTICE
        ===================================================== */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#858272]">
          <ShieldCheck size={12} />

          <span>
            Your challenge is processed through the MENTORBRIDGE
            matching workflow.
          </span>
        </div>

      </div>
    </div>
  )
}