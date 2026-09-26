import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { supabase } from '../lib/supabaseClient'

export default function StudentLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        })

      if (error) {
        setError(error.message)
        return
      }

      const role = data.user?.user_metadata?.role

      /*
       * IMPORTANT:
       * Only accounts registered as "student"
       * are allowed through Student Login.
       */
      if (role !== 'student') {
        await supabase.auth.signOut()

        setError(
          'This account is registered as a Mentor. Please use Mentor Login.',
        )

        return
      }

      localStorage.setItem(
        'mentorbridge_user_role',
        'student',
      )

      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.error('Student login error:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to sign in. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#EDE8D0] text-[#25251F] flex">

      {/* LEFT — IMAGE */}
      <div className="hidden lg:block lg:w-[52%] relative overflow-hidden">
        <img
          src="/assets/mentorbridge-student.jpg"
          alt="Student using MENTORBRIDGE"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute left-10 bottom-10 max-w-md text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-2">
            <UserRound size={15} />
            <span className="text-xs font-medium">
              Student Workspace
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight leading-tight">
            Find the experience
            <br />
            your idea needs.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/80 max-w-sm">
            Turn your challenges into better decisions with
            AI-powered experience matching.
          </p>
        </div>
      </div>

      {/* RIGHT — LOGIN */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* LOGO */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 mb-10"
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

          {/* HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#5F6754]">
                Student Login
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-[#666457]">
              Continue your journey with MENTORBRIDGE.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-md border border-[#D8B8B2] bg-[#F5E9E6] px-4 py-3">
              <p className="text-sm text-[#8B4F47]">
                {error}
              </p>
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label
                htmlFor="student-email"
                className="block text-xs font-medium text-[#4D4C43] mb-2"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9788]"
                />

                <input
                  id="student-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="
                    w-full
                    h-11
                    pl-10
                    pr-4
                    rounded-md
                    border
                    border-[#DCD6BD]
                    bg-[#F8F5E9]
                    text-sm
                    text-[#25251F]
                    outline-none
                    focus:border-[#5F6754]
                    focus:ring-2
                    focus:ring-[#5F6754]/10
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="student-password"
                className="block text-xs font-medium text-[#4D4C43] mb-2"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9788]"
                />

                <input
                  id="student-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    h-11
                    pl-10
                    pr-11
                    rounded-md
                    border
                    border-[#DCD6BD]
                    bg-[#F8F5E9]
                    text-sm
                    text-[#25251F]
                    outline-none
                    focus:border-[#5F6754]
                    focus:ring-2
                    focus:ring-[#5F6754]/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#858272]
                    hover:text-[#25251F]
                  "
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-11
                flex
                items-center
                justify-center
                gap-2
                rounded-md
                bg-[#5F6754]
                hover:bg-[#4D5544]
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                text-sm
                font-semibold
                transition-colors
              "
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  Sign in as Student
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* TRUST */}
          <div className="mt-7 flex items-center gap-2 text-xs text-[#858272]">
            <ShieldCheck size={14} />
            <span>
              Secure authentication powered by Supabase
            </span>
          </div>

          {/* ROLE SWITCH */}
          <div className="mt-8 border-t border-[#DCD6BD] pt-6 text-center">
            <p className="text-sm text-[#666457]">
              Are you a mentor?
            </p>

            <Link
              to="/mentor-login"
              className="
                mt-2
                inline-flex
                text-sm
                font-semibold
                text-[#5F6754]
                hover:text-[#4D5544]
              "
            >
              Login as Mentor
            </Link>
          </div>

          {/* SIGNUP */}
          <p className="mt-6 text-center text-sm text-[#858272]">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-[#5F6754] hover:text-[#4D5544]"
            >
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}