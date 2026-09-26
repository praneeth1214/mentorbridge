import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  Lock,
  Search,
  Users,
} from 'lucide-react'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#EDE8D0] text-[#25251F]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#EDE8D0]/95 backdrop-blur-md border-b border-[#DCD6BD]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-md bg-[#5F6754] flex items-center justify-center">
              <Sparkles size={17} className="text-white" />
            </div>

            <div className="text-left">
              <div className="text-[15px] font-bold tracking-[0.12em] text-[#25251F]">
                MENTORBRIDGE
              </div>

              <div className="text-[9px] uppercase tracking-[0.18em] text-[#858272]">
                Bridging Experience with Ambition
              </div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#666457]">
            <a
              href="#how-it-works"
              className="hover:text-[#25251F] transition-colors"
            >
              How It Works
            </a>

            <a
              href="#matching"
              className="hover:text-[#25251F] transition-colors"
            >
              Experience Matching
            </a>

            <a
              href="#trust"
              className="hover:text-[#25251F] transition-colors"
            >
              Trust Ledger
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate('/login')}
              className="hidden sm:block text-sm font-medium text-[#4F5148] hover:text-[#25251F] px-3 py-2"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-2 bg-[#5F6754] hover:bg-[#4D5544] text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors shadow-sm"
            >
              Get Started
              <ArrowRight size={15} />
            </button>

          </div>
        </div>
      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}
      <main>

        {/* =====================================================
            HERO
        ===================================================== */}
        <section
          className="relative min-h-[720px] flex items-center px-6 pt-24 pb-16 overflow-hidden"
          style={{
            backgroundImage: "url('/assets/mentorbridge-login.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >

          {/* Background overlays */}
          <div className="absolute inset-0 bg-[#EDE8D0]/70" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE8D0]/45 via-[#EDE8D0]/65 to-[#EDE8D0]/95" />

          {/* Hero content */}
          <div className="relative z-10 max-w-7xl mx-auto w-full">

            <div className="max-w-3xl">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 border border-[#C8CDBB] bg-[#F8F5E9]/80 backdrop-blur-sm px-3 py-1.5 rounded-full mb-7">

                <span className="w-1.5 h-1.5 rounded-full bg-[#5F6754]" />

                <span className="text-xs font-medium tracking-wide text-[#5F6754]">
                  EXPERIENCE-DRIVEN MENTORSHIP
                </span>

              </div>


              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-semibold tracking-[-0.045em] leading-[0.98] text-[#25251F]">

                The right experience.

                <br />

                <span className="text-[#5F6754]">
                  At the right moment.
                </span>

              </h1>


              {/* Description */}
              <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-[#666457]">
                MENTORBRIDGE connects student entrepreneurs with experienced
                professionals based on the actual problem they are trying to solve.
              </p>


              {/* CTA */}
              <div className="mt-9 flex flex-col sm:flex-row gap-3">

                <button
                  onClick={() => navigate('/signup')}
                  className="inline-flex items-center justify-center gap-2 bg-[#5F6754] hover:bg-[#4D5544] text-white font-semibold px-6 py-3.5 rounded-md transition-colors shadow-sm"
                >
                  Find My Mentor
                  <ArrowRight size={17} />
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center justify-center gap-2 bg-[#F8F5E9]/90 hover:bg-[#FFFDF7] border border-[#C8CDBB] text-[#4F5148] font-medium px-6 py-3.5 rounded-md transition-colors"
                >
                  Sign In
                </button>

              </div>


              {/* Trust points */}
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#666457]">

                <div className="flex items-center gap-2">
                  <Check size={15} className="text-[#5F6754]" />
                  Experience-based matching
                </div>

                <div className="flex items-center gap-2">
                  <Check size={15} className="text-[#5F6754]" />
                  Verified professionals
                </div>

                <div className="flex items-center gap-2">
                  <Check size={15} className="text-[#5F6754]" />
                  Cryptographic audit trail
                </div>

              </div>

            </div>
          </div>
        </section>


        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}
        <section
          id="how-it-works"
          className="py-24 px-6 bg-[#F8F5E9] border-t border-[#DCD6BD]"
        >
          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="max-w-2xl mb-16">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6754] mb-4">
                How It Works
              </p>

              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#25251F]">
                From problem to
                <br />
                relevant experience.
              </h2>

              <p className="mt-5 text-[#666457] leading-relaxed max-w-xl">
                MENTORBRIDGE turns a real business challenge into a structured
                experience-matching problem.
              </p>

            </div>


            {/* Steps */}
            <div className="grid md:grid-cols-3 border-t border-[#C8CDBB]">

              {/* 01 */}
              <div className="pt-8 md:pr-10 md:border-r border-[#C8CDBB]">

                <div className="text-4xl font-semibold text-[#5F6754] mb-8">
                  01
                </div>

                <h3 className="text-xl font-semibold text-[#25251F] mb-3">
                  Describe the challenge
                </h3>

                <p className="text-sm leading-relaxed text-[#666457]">
                  Explain the startup or business problem you're facing in
                  natural language. No complicated forms or predefined categories.
                </p>

              </div>


              {/* 02 */}
              <div className="pt-8 md:px-10 md:border-r border-[#C8CDBB]">

                <div className="text-4xl font-semibold text-[#5F6754] mb-8">
                  02
                </div>

                <h3 className="text-xl font-semibold text-[#25251F] mb-3">
                  Match relevant experience
                </h3>

                <p className="text-sm leading-relaxed text-[#666457]">
                  AI extracts the important requirements and compares them
                  against the expertise of experienced professionals.
                </p>

              </div>


              {/* 03 */}
              <div className="pt-8 md:pl-10">

                <div className="text-4xl font-semibold text-[#5F6754] mb-8">
                  03
                </div>

                <h3 className="text-xl font-semibold text-[#25251F] mb-3">
                  Understand the match
                </h3>

                <p className="text-sm leading-relaxed text-[#666457]">
                  See your strongest matches, their relevant expertise, and
                  exactly why their experience relates to your problem.
                </p>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            EXPERIENCE MATCHING
        ===================================================== */}
        <section
          id="matching"
          className="py-24 px-6 bg-[#EDE8D0] border-t border-[#DCD6BD]"
        >
          <div className="max-w-7xl mx-auto">

            {/* Section heading */}
            <div className="max-w-4xl">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6754] mb-4">
                Experience Matching
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.05] text-[#25251F]">

                Don't search for a mentor.

                <br />

                <span className="text-[#5F6754]">
                  Search for experience.
                </span>

              </h2>

              <p className="mt-6 text-[16px] md:text-[18px] text-[#666457] leading-relaxed max-w-2xl">
                Traditional mentorship platforms make you browse profiles.
                MENTORBRIDGE starts with the problem instead.
              </p>

            </div>


            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-5 mt-14">

              {/* Problem-first matching */}
              <div className="bg-[#F8F5E9] border border-[#C8CDBB] rounded-lg p-7">

                <div className="w-10 h-10 rounded-md bg-[#E3E6D9] flex items-center justify-center mb-6">

                  <Search
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#5F6754]"
                  />

                </div>

                <h3 className="font-semibold text-lg text-[#25251F]">
                  Problem-first matching
                </h3>

                <p className="mt-3 text-sm text-[#666457] leading-relaxed">
                  Your challenge is converted into structured requirements
                  before matching begins.
                </p>

              </div>


              {/* Experience similarity */}
              <div className="bg-[#F8F5E9] border border-[#C8CDBB] rounded-lg p-7">

                <div className="w-10 h-10 rounded-md bg-[#E3E6D9] flex items-center justify-center mb-6">

                  <Users
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#5F6754]"
                  />

                </div>

                <h3 className="font-semibold text-lg text-[#25251F]">
                  Experience similarity
                </h3>

                <p className="mt-3 text-sm text-[#666457] leading-relaxed">
                  Relevant professional experience is compared using
                  semantic similarity rather than simple keyword search.
                </p>

              </div>


              {/* Explainable results */}
              <div className="bg-[#F8F5E9] border border-[#C8CDBB] rounded-lg p-7">

                <div className="w-10 h-10 rounded-md bg-[#E3E6D9] flex items-center justify-center mb-6">

                  <Sparkles
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#5F6754]"
                  />

                </div>

                <h3 className="font-semibold text-lg text-[#25251F]">
                  Explainable results
                </h3>

                <p className="mt-3 text-sm text-[#666457] leading-relaxed">
                  Every match includes a clear explanation of why the
                  professional's experience is relevant.
                </p>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            TRUST LEDGER
        ===================================================== */}
        <section
          id="trust"
          className="py-24 px-6 bg-[#25251F] text-[#F8F5E9]"
        >
          <div className="max-w-7xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Text */}
              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#AEB5A2] mb-4">
                  Cryptographic Trust Ledger
                </p>

                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                  Every automated action
                  <br />
                  leaves a trace.
                </h2>

                <p className="mt-6 text-[#B9B8AC] leading-relaxed max-w-xl">
                  MENTORBRIDGE records important AI actions in a chained
                  SHA-256 ledger so the system's history can be verified.
                </p>


                {/* Trust points */}
                <div className="mt-8 space-y-4">

                  <div className="flex gap-4">

                    <ShieldCheck
                      size={19}
                      className="text-[#AEB5A2] shrink-0 mt-0.5"
                    />

                    <div>

                      <p className="font-medium text-[#F8F5E9]">
                        Tamper-evident records
                      </p>

                      <p className="text-sm text-[#A9A79A] mt-1">
                        Each record references the hash of the previous record.
                      </p>

                    </div>

                  </div>


                  <div className="flex gap-4">

                    <Lock
                      size={19}
                      className="text-[#AEB5A2] shrink-0 mt-0.5"
                    />

                    <div>

                      <p className="font-medium text-[#F8F5E9]">
                        Verifiable AI activity
                      </p>

                      <p className="text-sm text-[#A9A79A] mt-1">
                        Problem analysis, matching, and explanations can be
                        independently checked.
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* Ledger */}
              <div className="border border-[#48483F] bg-[#1D1D19] rounded-lg overflow-hidden">

                {/* Header */}
                <div className="px-5 py-4 border-b border-[#48483F] flex items-center justify-between">

                  <div>

                    <p className="text-xs font-semibold text-[#F8F5E9]">
                      TRUST LEDGER
                    </p>

                    <p className="text-[10px] text-[#8F8E84] mt-1 uppercase tracking-wider">
                      SHA-256 HASH CHAIN
                    </p>

                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-[#AEB5A2] uppercase tracking-wider">

                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FA08A]" />

                    Chain Verified

                  </div>

                </div>


                {/* Ledger records */}
                <div className="divide-y divide-[#363630]">

                  {/* Record 1 */}
                  <div className="p-5">

                    <div className="flex items-center justify-between mb-3">

                      <span className="text-xs font-medium text-[#F8F5E9]">
                        PROBLEM_ANALYZED
                      </span>

                      <span className="text-[10px] text-[#85847A]">
                        10:42:17
                      </span>

                    </div>

                    <p className="font-mono text-[10px] text-[#85847A] break-all">
                      7c8d91a4e1b7...f23d9a61
                    </p>

                  </div>


                  {/* Record 2 */}
                  <div className="p-5">

                    <div className="flex items-center justify-between mb-3">

                      <span className="text-xs font-medium text-[#F8F5E9]">
                        MENTOR_MATCHED
                      </span>

                      <span className="text-[10px] text-[#85847A]">
                        10:42:19
                      </span>

                    </div>

                    <p className="font-mono text-[10px] text-[#85847A] break-all">
                      2a9e7c1d44f0...91ab63e2
                    </p>

                  </div>


                  {/* Record 3 */}
                  <div className="p-5">

                    <div className="flex items-center justify-between mb-3">

                      <span className="text-xs font-medium text-[#F8F5E9]">
                        MATCH_EXPLANATION_GENERATED
                      </span>

                      <span className="text-[10px] text-[#85847A]">
                        10:42:20
                      </span>

                    </div>

                    <p className="font-mono text-[10px] text-[#85847A] break-all">
                      9bd3a6f82c44...c72e18fa
                    </p>

                  </div>

                </div>


                {/* Verification */}
                <div className="px-5 py-4 bg-[#22221D] border-t border-[#48483F] flex items-center gap-2">

                  <Check
                    size={15}
                    className="text-[#AEB5A2]"
                  />

                  <span className="text-xs text-[#B7B6AA]">
                    CHAIN VERIFIED — No tampering detected
                  </span>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            FINAL CTA
        ===================================================== */}
        <section className="py-24 px-6 bg-[#EDE8D0] border-t border-[#DCD6BD]">

          <div className="max-w-4xl mx-auto text-center">

            <p className="text-xs font-semibold text-[#5F6754] uppercase tracking-[0.18em] mb-4">
              Start with experience
            </p>

            <h2 className="text-3xl md:text-5xl font-semibold text-[#25251F] tracking-tight leading-tight">
              Your next breakthrough
              <br />
              may already have been solved.
            </h2>

            <p className="mt-5 text-[#666457] leading-relaxed max-w-xl mx-auto">
              Describe the problem you're facing and discover professionals
              whose experience is relevant to the challenge.
            </p>


            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center justify-center gap-2 bg-[#5F6754] hover:bg-[#4D5544] text-white font-semibold px-6 py-3.5 rounded-md transition-colors shadow-sm"
              >
                Find My Mentor
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center bg-[#F8F5E9] border border-[#C8CDBB] hover:bg-[#FFFDF7] text-[#4F5148] font-medium px-6 py-3.5 rounded-md transition-colors"
              >
                Sign In
              </button>

            </div>

          </div>
        </section>


        {/* =====================================================
            FOOTER
        ===================================================== */}
        <footer className="bg-[#F8F5E9] border-t border-[#DCD6BD]">

          <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              {/* Brand */}
              <div>

                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-md bg-[#5F6754] flex items-center justify-center">

                    <Sparkles
                      size={15}
                      className="text-white"
                    />

                  </div>

                  <span className="text-sm font-bold tracking-[0.12em] text-[#25251F]">
                    MENTORBRIDGE
                  </span>

                </div>

                <p className="mt-3 text-xs text-[#858272]">
                  Bridging Experience with Ambition.
                </p>

              </div>


              {/* Footer links */}
              <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#666457]">

                <a
                  href="#how-it-works"
                  className="hover:text-[#25251F] transition-colors"
                >
                  How It Works
                </a>

                <a
                  href="#matching"
                  className="hover:text-[#25251F] transition-colors"
                >
                  Experience Matching
                </a>

                <a
                  href="#trust"
                  className="hover:text-[#25251F] transition-colors"
                >
                  Trust Ledger
                </a>

                <button
                  onClick={() => navigate('/login')}
                  className="hover:text-[#25251F] transition-colors"
                >
                  Sign In
                </button>

              </div>

            </div>


            {/* Copyright */}
            <div className="mt-10 pt-6 border-t border-[#DCD6BD] flex flex-col sm:flex-row justify-between gap-3 text-[11px] text-[#858272]">

              <span>
                © 2026 MENTORBRIDGE. All rights reserved.
              </span>

              <span>
                Built for meaningful connections through experience.
              </span>

            </div>

          </div>
        </footer>

      </main>
    </div>
  )
}

export default Landing