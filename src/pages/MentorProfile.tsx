import API_BASE_URL from '../lib/api'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BriefcaseBusiness,
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

export default function MentorProfile() {
  const location = useLocation()
  const navigate = useNavigate()

  const mentor = location.state?.mentor as Mentor | undefined
  const problem = location.state?.problem || ''
  const analysis = location.state?.analysis as Analysis | undefined

  const [explanation, setExplanation] = useState('')
  const [loadingExplanation, setLoadingExplanation] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!mentor || !problem || !analysis) {
      setLoadingExplanation(false)
      return
    }

    const generateExplanation = async () => {
      try {
        setLoadingExplanation(true)
        setError('')

        const response = await fetch(
          `${API_BASE_URL}/api/explain`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              problem,
              analysis,
              mentor,
            }),
          }
        )

        if (!response.ok) {
          const errorText = await response.text()

          throw new Error(
            `Explanation service returned ${response.status}: ${
              errorText || 'Unknown error'
            }`
          )
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(
            'Could not generate mentor explanation.'
          )
        }

        setExplanation(data.explanation)
      } catch (err) {
        console.error('EXPLANATION ERROR:', err)

        setError(
          err instanceof Error
            ? err.message
            : 'Unable to generate explanation.'
        )
      } finally {
        setLoadingExplanation(false)
      }
    }

    generateExplanation()
  }, [mentor, problem, analysis])

  if (!mentor) {
    return (
      <div className="max-w-3xl mx-auto py-16">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h1 className="text-xl font-semibold text-[var(--text)]">
            Mentor profile unavailable
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Return to your mentor matches and select a mentor again.
          </p>

          <button
            onClick={() => navigate('/dashboard/matches')}
            className="mt-6 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
          >
            Back to matches
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)]"
      >
        <ArrowLeft size={16} />
        Back to matches
      </button>

      {/* Mentor Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

          <div className="flex gap-5">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-xl font-semibold text-[var(--accent)]">
              {mentor.name
                .split(' ')
                .map((part) => part[0])
                .slice(0, 2)
                .join('')}
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-semibold text-[var(--text)]">
                  {mentor.name}
                </h1>

                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                  {mentor.match_percentage}% experience similarity
                </span>

              </div>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {mentor.role} · {mentor.company}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <BriefcaseBusiness size={16} />
                {mentor.years_experience} years of experience
              </div>

            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[var(--success-soft)] px-3 py-1.5 text-xs font-medium text-[var(--success)]">
            <CheckCircle2 size={14} />
            Experience match found
          </div>

        </div>
      </div>


      {/* Why This Mentor */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">

        <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
          <Sparkles size={17} />
          Why this mentor?
        </div>

        {loadingExplanation ? (

          <div className="mt-5 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
            <Loader2
              size={17}
              className="animate-spin text-[var(--accent)]"
            />

            Generating an explanation from the challenge and mentor experience...
          </div>

        ) : error ? (

          <div className="mt-5">

            <p className="text-sm text-[var(--text-secondary)]">
              We couldn't generate the explanation right now.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--surface-subtle)]"
            >
              Try again
            </button>

          </div>

        ) : (

          <div className="mt-4 rounded-xl bg-[var(--surface-subtle)] p-5">

            <p className="text-sm leading-7 text-[var(--text-secondary)]">
              {explanation}
            </p>

          </div>

        )}

        <div className="mt-5 flex items-start gap-3 border-t border-[var(--border)] pt-5">

          <ShieldCheck
            size={17}
            className="mt-0.5 shrink-0 text-[var(--accent)]"
          />

          <p className="text-xs leading-5 text-[var(--text-secondary)]">
            This explanation is generated from the submitted challenge,
            structured requirements, and the mentor's documented experience.
          </p>

        </div>

      </div>


      {/* Expertise + Industries */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

          <h2 className="text-base font-semibold text-[var(--text)]">
            Core expertise
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">

            {mentor.expertise.map((item) => (
              <span
                key={item}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
              >
                {item}
              </span>
            ))}

          </div>

        </div>


        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

          <h2 className="text-base font-semibold text-[var(--text)]">
            Industries
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">

            {mentor.industries.map((item) => (
              <span
                key={item}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

      </div>


      {/* Experience */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

        <h2 className="text-base font-semibold text-[var(--text)]">
          Experience
        </h2>

        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          {mentor.experience_summary}
        </p>

      </div>


      {/* Skills */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

        <h2 className="text-base font-semibold text-[var(--text)]">
          Relevant skills
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">

          {mentor.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

    </div>
  )
}