import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#EDE8D0] text-[#25251F] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-4xl">

        {/* HEADER */}
        <div className="text-center mb-10">

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-9 h-9 rounded-md bg-[#5F6754] flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                MB
              </span>
            </div>

            <span className="text-sm font-semibold tracking-tight">
              MENTORBRIDGE
            </span>
          </button>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#5F6754] mb-3">
              Sign in
            </p>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              How are you joining MENTORBRIDGE?
            </h1>

            <p className="mt-3 text-sm text-[#666457]">
              Choose the workspace that belongs to your account.
            </p>
          </div>

        </div>

        {/* ROLE OPTIONS */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* STUDENT */}
          <button
            onClick={() => navigate('/student-login')}
            className="
              group
              text-left
              bg-[#F8F5E9]
              border
              border-[#DCD6BD]
              hover:border-[#9EA58E]
              rounded-xl
              p-7
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_12px_35px_rgba(37,37,31,0.08)]
            "
          >

            <div className="flex items-start justify-between">

              <div className="w-11 h-11 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                <GraduationCap
                  size={21}
                  className="text-[#5F6754]"
                />
              </div>

              <ArrowRight
                size={18}
                className="
                  text-[#9A9788]
                  group-hover:text-[#5F6754]
                  group-hover:translate-x-1
                  transition-all
                "
              />

            </div>

            <h2 className="mt-7 text-xl font-semibold">
              I'm a Student
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#666457]">
              Find experienced professionals who can help
              you solve your startup, project, or business
              challenges.
            </p>

            <div className="mt-6 text-xs font-semibold text-[#5F6754]">
              Continue as Student
            </div>

          </button>

          {/* MENTOR */}
          <button
            onClick={() => navigate('/mentor-login')}
            className="
              group
              text-left
              bg-[#F8F5E9]
              border
              border-[#DCD6BD]
              hover:border-[#9EA58E]
              rounded-xl
              p-7
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_12px_35px_rgba(37,37,31,0.08)]
            "
          >

            <div className="flex items-start justify-between">

              <div className="w-11 h-11 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                <BriefcaseBusiness
                  size={21}
                  className="text-[#5F6754]"
                />
              </div>

              <ArrowRight
                size={18}
                className="
                  text-[#9A9788]
                  group-hover:text-[#5F6754]
                  group-hover:translate-x-1
                  transition-all
                "
              />

            </div>

            <h2 className="mt-7 text-xl font-semibold">
              I'm a Mentor
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#666457]">
              Share your professional experience and help
              students navigate real-world problems and
              decisions.
            </p>

            <div className="mt-6 text-xs font-semibold text-[#5F6754]">
              Continue as Mentor
            </div>

          </button>

        </div>

        {/* SECURITY */}
        <div className="mt-8 flex justify-center">

          <div className="flex items-center gap-2 text-xs text-[#858272]">
            <ShieldCheck size={14} />
            <span>
              Role-based authentication • Secure login
            </span>
          </div>

        </div>

        {/* SIGNUP */}
        <p className="mt-6 text-center text-sm text-[#858272]">
          Don't have an account?{' '}

          <button
            onClick={() => navigate('/signup')}
            className="font-semibold text-[#5F6754] hover:text-[#4D5544]"
          >
            Create an account
          </button>
        </p>

      </div>
    </div>
  )
}