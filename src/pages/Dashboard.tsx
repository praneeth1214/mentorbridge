import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()

  const hour = new Date().getHours()

  const greeting =
    hour < 12
      ? 'Good morning'
      : hour < 18
        ? 'Good afternoon'
        : 'Good evening'

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-full bg-[#EDE8D0] text-[#25251F]">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-8">

          <div className="flex items-center gap-2 text-xs text-[#858272] mb-3">
            <Clock size={13} />
            <span>{date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#25251F]">
            {greeting}, Praneeth.
          </h1>

          <p className="mt-2 text-sm text-[#666457]">
            What challenge are you solving today?
          </p>

        </div>


        {/* =====================================================
            PRIMARY ACTION
        ===================================================== */}
        <section className="bg-[#F8F5E9] border border-[#C8CDBB] rounded-lg overflow-hidden mb-8">

          <div className="grid lg:grid-cols-[1fr_340px]">

            {/* Main content */}
            <div className="p-7 sm:p-9">

              <div className="flex items-center gap-2 mb-5">

                <div className="w-8 h-8 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                  <Sparkles
                    size={16}
                    className="text-[#5F6754]"
                  />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5F6754]">
                  AI Experience Matching
                </span>

              </div>


              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight text-[#25251F] max-w-xl">
                Find the experience
                <br className="hidden sm:block" />
                behind your solution.
              </h2>


              <p className="mt-4 text-sm sm:text-base text-[#666457] leading-relaxed max-w-xl">
                Describe the startup or business problem you're facing.
                MENTORBRIDGE will analyze the challenge and identify
                professionals whose experience is relevant to it.
              </p>


              <button
                onClick={() => navigate('/dashboard/find-mentor')}
                className="mt-7 inline-flex items-center gap-2 bg-[#5F6754] hover:bg-[#4D5544] text-white font-semibold px-5 py-3 rounded-md transition-colors shadow-sm"
              >
                Describe Your Challenge
                <ArrowRight size={16} />
              </button>

            </div>


            {/* Right information panel */}
            <div className="border-t lg:border-t-0 lg:border-l border-[#DCD6BD] bg-[#EDE8D0]/60 p-7">

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#858272] mb-5">
                Matching Process
              </p>


              <div className="space-y-5">

                {/* Step */}
                <div className="flex gap-3">

                  <div className="w-7 h-7 rounded-md bg-[#E3E6D9] flex items-center justify-center shrink-0">
                    <Search
                      size={14}
                      className="text-[#5F6754]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#25251F]">
                      Analyze your problem
                    </p>

                    <p className="text-xs text-[#858272] mt-1 leading-relaxed">
                      Extract the domain, skills and experience requirements.
                    </p>
                  </div>

                </div>


                {/* Step */}
                <div className="flex gap-3">

                  <div className="w-7 h-7 rounded-md bg-[#E3E6D9] flex items-center justify-center shrink-0">
                    <Users
                      size={14}
                      className="text-[#5F6754]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#25251F]">
                      Compare experience
                    </p>

                    <p className="text-xs text-[#858272] mt-1 leading-relaxed">
                      Find professionals with relevant experience.
                    </p>
                  </div>

                </div>


                {/* Step */}
                <div className="flex gap-3">

                  <div className="w-7 h-7 rounded-md bg-[#E3E6D9] flex items-center justify-center shrink-0">
                    <Check
                      size={14}
                      className="text-[#5F6754]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#25251F]">
                      Explain the match
                    </p>

                    <p className="text-xs text-[#858272] mt-1 leading-relaxed">
                      See why each professional is relevant to your challenge.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK ACCESS
        ===================================================== */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          {/* Find Mentor */}
          <button
            onClick={() => navigate('/dashboard/find-mentor')}
            className="text-left bg-[#F8F5E9] border border-[#DCD6BD] hover:border-[#BFC6B0] rounded-lg p-5 transition-colors group"
          >

            <div className="flex items-start justify-between">

              <div className="w-9 h-9 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                <Search
                  size={17}
                  className="text-[#5F6754]"
                />
              </div>

              <ArrowRight
                size={16}
                className="text-[#A7A38E] group-hover:text-[#5F6754] transition-colors"
              />

            </div>

            <h3 className="mt-5 text-sm font-semibold text-[#25251F]">
              Find a Mentor
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-[#858272]">
              Start a new problem analysis and discover relevant experience.
            </p>

          </button>


          {/* My Matches */}
          <button
            onClick={() => navigate('/dashboard/my-matches')}
            className="text-left bg-[#F8F5E9] border border-[#DCD6BD] hover:border-[#BFC6B0] rounded-lg p-5 transition-colors group"
          >

            <div className="flex items-start justify-between">

              <div className="w-9 h-9 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                <Users
                  size={17}
                  className="text-[#5F6754]"
                />
              </div>

              <ArrowRight
                size={16}
                className="text-[#A7A38E] group-hover:text-[#5F6754] transition-colors"
              />

            </div>

            <h3 className="mt-5 text-sm font-semibold text-[#25251F]">
              My Matches
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-[#858272]">
              Review your previous mentor matches and explanations.
            </p>

          </button>


          {/* Trust Ledger */}
          <button
            onClick={() => navigate('/dashboard/trust-ledger')}
            className="text-left bg-[#F8F5E9] border border-[#DCD6BD] hover:border-[#BFC6B0] rounded-lg p-5 transition-colors group"
          >

            <div className="flex items-start justify-between">

              <div className="w-9 h-9 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                <ShieldCheck
                  size={17}
                  className="text-[#5F6754]"
                />
              </div>

              <ArrowRight
                size={16}
                className="text-[#A7A38E] group-hover:text-[#5F6754] transition-colors"
              />

            </div>

            <h3 className="mt-5 text-sm font-semibold text-[#25251F]">
              Trust Ledger
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-[#858272]">
              Verify the cryptographic record of system activity.
            </p>

          </button>

        </div>


        {/* =====================================================
            RECENT ACTIVITY
        ===================================================== */}
        <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden">

          <div className="px-6 py-5 border-b border-[#DCD6BD] flex items-center justify-between">

            <div>
              <h3 className="text-sm font-semibold text-[#25251F]">
                Your MENTORBRIDGE activity
              </h3>

              <p className="text-xs text-[#858272] mt-1">
                Actions from your current session will appear here.
              </p>
            </div>

            <button
              onClick={() => navigate('/dashboard/trust-ledger')}
              className="hidden sm:flex items-center gap-1 text-xs font-medium text-[#5F6754] hover:text-[#4D5544]"
            >
              Trust Ledger
              <ChevronRight size={13} />
            </button>

          </div>


          {/* Empty state */}
          <div className="px-6 py-12 text-center">

            <div className="mx-auto w-11 h-11 rounded-md bg-[#E3E6D9] flex items-center justify-center">

              <Clock
                size={19}
                className="text-[#5F6754]"
              />

            </div>

            <h4 className="mt-4 text-sm font-semibold text-[#25251F]">
              No activity yet
            </h4>

            <p className="mt-2 text-xs text-[#858272] max-w-sm mx-auto leading-relaxed">
              Start by describing a challenge. Once the system analyzes
              your problem, your matching and trust records will appear here.
            </p>

            <button
              onClick={() => navigate('/dashboard/find-mentor')}
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#5F6754] hover:text-[#4D5544]"
            >
              Start your first analysis
              <ArrowRight size={14} />
            </button>

          </div>

        </section>


        {/* =====================================================
            TRUST NOTICE
        ===================================================== */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#858272]">

          <Lock size={13} />

          <span>
            Important AI actions are recorded in the cryptographic trust ledger.
          </span>

        </div>

      </div>

    </div>
  )
}

export default Dashboard