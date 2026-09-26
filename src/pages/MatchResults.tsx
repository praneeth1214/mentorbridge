import API_BASE_URL from '../lib/api'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

type Mentor = {
  id: string
  name: string
  role: string
  company: string
  years_experience: number
  expertise: string[]
  industries: string[]
  experience_summary: string
  skills: string[]
  match_percentage: number
  similarity: number
}

type Analysis = {
  domain: string
  problem_summary: string
  problem_areas: string[]
  required_skills: string[]
  keywords: string[]
  experience_requirements: string[]
}

export default function MatchResults() {
  const location = useLocation()
  const navigate = useNavigate()

  const problem = location.state?.problem || ''
  const domain = location.state?.domain || ''

  const [matches, setMatches] = useState<Mentor[]>([])
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const requestStarted = useRef(false)

 useEffect(() => {
    if (!problem) {
      navigate('/dashboard/find-mentor', { replace: true })
      return
    }

    if (requestStarted.current) {
      return
    }

    requestStarted.current = true

  const fetchMatches = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_BASE_URL}/api/match`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem,
          domain,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()

        console.error(
          'Backend error:',
          response.status,
          errorText
        )

        throw new Error(
          `Backend returned ${response.status}: ${
            errorText || 'Unknown error'
          }`
        )
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error('Matching failed.')
      }

      setAnalysis(data.analysis)
setMatches(data.matches)

localStorage.setItem(
  'mentorbridge_latest_matches',
  JSON.stringify({
    matches: data.matches,
    problem,
    domain,
    analysis: data.analysis,
  })
)
    } catch (err) {
      console.error('MATCHING ERROR:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the matching service.'
      )
    } finally {
      setLoading(false)
    }
  }

  fetchMatches()
}, [problem, domain, navigate])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)]">
            <Loader2
              size={22}
              className="animate-spin text-[var(--accent)]"
            />
          </div>

          <h1 className="text-xl font-semibold text-[var(--text)]">
            Finding relevant experience
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Analyzing your challenge and comparing it with mentor experience.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-16">
        <button
          onClick={() => navigate('/dashboard/find-mentor')}
          className="mb-8 flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)]"
        >
          <ArrowLeft size={16} />
          Back to challenge
        </button>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h1 className="text-xl font-semibold text-[var(--text)]">
            Matching unavailable
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard/find-mentor')}
          className="mb-6 flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)]"
        >
          <ArrowLeft size={16} />
          New challenge
        </button>

        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
              <Sparkles size={16} />
              AI Experience Matching
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
              Your mentor matches
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              We compared your challenge with the experience, expertise and
              skills of available mentors.
            </p>
          </div>
        </div>
      </div>

      {/* Problem summary */}
      <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
              Challenge analyzed
            </p>

            <h2 className="mt-1 text-base font-semibold text-[var(--text)]">
              {analysis?.domain || domain || 'General'}
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[var(--success-soft)] px-3 py-1.5 text-xs font-medium text-[var(--success)]">
            <CheckCircle2 size={14} />
            Analysis complete
          </div>
        </div>

        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          {analysis?.problem_summary}
        </p>

        {(analysis?.required_skills?.length ?? 0) > 0 && (
  <div className="mt-5 flex flex-wrap gap-2">
    {analysis?.required_skills?.slice(0, 6).map((skill) => (
      <span
        key={skill}
        className="rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
      >
        {skill}
      </span>
    ))}
  </div>
)}
      </div>

      {/* Matches */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Recommended mentors
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Ranked by experience similarity to your challenge.
          </p>
        </div>

        <span className="text-xs text-[var(--text-muted)]">
          {matches.length} matches
        </span>
      </div>

      <div className="space-y-4">
        {matches.map((mentor, index) => (
          <div
            key={mentor.id}
            className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent-border)]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 gap-5">
                {/* Rank */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-sm font-semibold text-[var(--text)]">
                  0{index + 1}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      {mentor.name}
                    </h3>

                    <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
                      {mentor.match_percentage}% match
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {mentor.role} · {mentor.company}
                  </p>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
                    {mentor.experience_summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {mentor.expertise.slice(0, 5).map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/dashboard/mentor/${mentor.id}`, {
                    state: {
                      mentor,
                      problem,
                      analysis,
                    },
                  })
                }
                className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)]"
              >
                View mentor
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust notice */}
      <div className="mt-8 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4">
        <ShieldCheck
          size={18}
          className="mt-0.5 shrink-0 text-[var(--accent)]"
        />

        <div>
          <p className="text-sm font-medium text-[var(--text)]">
            Matching decisions are traceable
          </p>

          <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
            MENTORBRIDGE records important matching actions in its
            cryptographic trust ledger for integrity verification.
          </p>
        </div>
      </div>
    </div>
  )
}