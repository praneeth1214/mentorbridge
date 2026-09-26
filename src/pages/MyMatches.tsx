import { useEffect, useState } from 'react'
import { ArrowRight, Search, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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

type StoredMatchData = {
  matches: Mentor[]
  problem: string
  domain: string
  analysis: unknown
}

export default function MyMatches() {
  const navigate = useNavigate()

  const [matchData, setMatchData] = useState<StoredMatchData | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        'mentorbridge_latest_matches'
      )

      if (stored) {
        setMatchData(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Unable to load saved matches:', error)
    }
  }, [])

  const matches = matchData?.matches ?? []

  return (
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-medium text-[var(--accent)]">
            Mentor discovery
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text)]">
            My Matches
          </h1>

          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Your latest experience-based mentor recommendations.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/find-mentor')}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)]"
        >
          <Search size={16} />
          Find a Mentor
        </button>

      </div>


      {/* Challenge context */}
      {matchData?.problem && (
        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
              <Users
                size={19}
                className="text-[var(--accent)]"
              />
            </div>

            <div className="min-w-0">

              <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Latest challenge
              </p>

              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {matchData.problem}
              </p>

              {matchData.domain && (
                <span className="mt-3 inline-flex rounded-md bg-[var(--surface-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
                  {matchData.domain}
                </span>
              )}

            </div>

          </div>

        </div>
      )}


      {/* Results */}
      {matches.length > 0 ? (

        <>

          <div className="mb-4 flex items-end justify-between">

            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Recommended mentors
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Based on experience similarity to your latest challenge.
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
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent-border)]"
              >

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex min-w-0 gap-5">

                    {/* Rank */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-sm font-semibold text-[var(--text)]">
                      {String(index + 1).padStart(2, '0')}
                    </div>


                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-lg font-semibold text-[var(--text)]">
                          {mentor.name}
                        </h3>

                        <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
                          {mentor.match_percentage}% experience similarity
                        </span>

                      </div>


                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {mentor.role} · {mentor.company}
                      </p>


                      <div className="mt-3 flex flex-wrap gap-2">

                        {mentor.expertise
                          .slice(0, 5)
                          .map((item) => (
                            <span
                              key={item}
                              className="rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
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
                          problem: matchData?.problem || '',
                          analysis: matchData?.analysis,
                        },
                      })
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent-border)] hover:bg-[var(--surface-subtle)]"
                  >
                    View mentor
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </>

      ) : (

        /* Empty state */
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)]">
            <Users
              size={21}
              className="text-[var(--accent)]"
            />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-[var(--text)]">
            No mentor matches yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
            Describe a real business or startup challenge and MENTORBRIDGE
            will compare it with relevant professional experience.
          </p>

          <button
            onClick={() => navigate('/dashboard/find-mentor')}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)]"
          >
            Find a Mentor
            <ArrowRight size={16} />
          </button>

        </div>

      )}

    </div>
  )
}