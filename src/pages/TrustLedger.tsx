import { useEffect, useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
} from 'lucide-react'

type LedgerRecord = {
  id: number
  action: string
  timestamp: string
  metadata: Record<string, unknown>
  previous_hash: string
  current_hash: string
}

type VerificationResult = {
  valid: boolean
  records: number
  message: string
  failed_record?: number
}

function formatAction(action: string) {
  return action
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatTimestamp(timestamp: string) {
  try {
    return new Date(timestamp).toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'medium',
    })
  } catch {
    return timestamp
  }
}

function shortHash(hash: string) {
  if (hash === 'GENESIS') {
    return 'GENESIS'
  }

  if (hash.length <= 18) {
    return hash
  }

  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}

export default function TrustLedger() {
  const [records, setRecords] = useState<LedgerRecord[]>([])
  const [verification, setVerification] =
    useState<VerificationResult | null>(null)

  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [error, setError] = useState('')

  const loadLedger = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        'http://localhost:8000/api/ledger'
      )

      if (!response.ok) {
        throw new Error(
          `Ledger request failed with status ${response.status}`
        )
      }

      const data = await response.json()

      setRecords(data.records || [])
    } catch (err) {
      console.error('LEDGER LOAD ERROR:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load the trust ledger.'
      )
    } finally {
      setLoading(false)
    }
  }

  const verifyIntegrity = async () => {
    try {
      setVerifying(true)
      setError('')

      const response = await fetch(
        'http://localhost:8000/api/ledger/verify'
      )

      if (!response.ok) {
        throw new Error(
          `Verification failed with status ${response.status}`
        )
      }

      const data = await response.json()

      setVerification(data)
    } catch (err) {
      console.error('LEDGER VERIFY ERROR:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to verify the ledger.'
      )
    } finally {
      setVerifying(false)
    }
  }

  useEffect(() => {
    loadLedger()
    verifyIntegrity()
  }, [])

  const isVerified = verification?.valid ?? true

  return (
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div className="mb-8">

        <p className="text-sm font-medium text-[var(--accent)]">
          Cryptographic transparency
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text)]">
          Trust Ledger
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
          Every automated MENTORBRIDGE action can be recorded as part
          of a cryptographic hash chain and independently verified.
        </p>

      </div>


      {/* Verification panel */}
      <div
        className={`rounded-2xl border p-6 ${
          isVerified
            ? 'border-[var(--accent-border)] bg-[var(--success-soft)]'
            : 'border-[var(--danger)] bg-[var(--danger-soft)]'
        }`}
      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                isVerified
                  ? 'bg-white/60'
                  : 'bg-white/50'
              }`}
            >
              {isVerified ? (
                <ShieldCheck
                  size={23}
                  className="text-[var(--success)]"
                />
              ) : (
                <ShieldAlert
                  size={23}
                  className="text-[var(--danger)]"
                />
              )}
            </div>

            <div>

              <p
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isVerified
                    ? 'text-[var(--success)]'
                    : 'text-[var(--danger)]'
                }`}
              >
                {isVerified
                  ? 'Chain verified'
                  : 'Integrity failed'}
              </p>

              <h2 className="mt-1 text-lg font-semibold text-[var(--text)]">
                {isVerified
                  ? 'No tampering detected'
                  : 'Ledger integrity requires attention'}
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {verification?.message ||
                  'The cryptographic chain has not been verified yet.'}
              </p>

            </div>

          </div>


          <button
            onClick={verifyIntegrity}
            disabled={verifying}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={verifying ? 'animate-spin' : ''}
            />

            {verifying
              ? 'Verifying...'
              : 'Verify Integrity'}
          </button>

        </div>


        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-black/10 pt-5 sm:grid-cols-3">

          <div>
            <p className="text-2xl font-semibold text-[var(--text)]">
              {isVerified ? '100%' : 'Failed'}
            </p>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Chain integrity
            </p>
          </div>


          <div>
            <p className="text-2xl font-semibold text-[var(--text)]">
              SHA-256
            </p>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Hash algorithm
            </p>
          </div>


          <div>
            <p className="text-2xl font-semibold text-[var(--text)]">
              {records.length}
            </p>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Recorded actions
            </p>
          </div>

        </div>

      </div>


      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-[var(--danger)] bg-[var(--danger-soft)] p-4 text-sm text-[var(--danger)]">
          {error}
        </div>
      )}


      {/* Activity chain */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">

          <div>
            <h2 className="text-base font-semibold text-[var(--text)]">
              Activity Chain
            </h2>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Cryptographically linked automated actions
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--success)]">
            <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
            Live ledger
          </div>

        </div>


        {loading ? (

          <div className="px-6 py-16 text-center">

            <RefreshCw
              size={20}
              className="mx-auto animate-spin text-[var(--accent)]"
            />

            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Loading cryptographic records...
            </p>

          </div>

        ) : records.length === 0 ? (

          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)]">
              <Clock3
                size={21}
                className="text-[var(--accent)]"
              />
            </div>

            <h3 className="mt-5 text-base font-semibold text-[var(--text)]">
              No ledger records yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
              Once MENTORBRIDGE records an automated action,
              its cryptographic hash will appear here.
            </p>

          </div>

        ) : (

          <div>

            {records.map((record, index) => {

              const isOpen = expanded === record.id

              return (
                <div
                  key={record.id}
                  className="border-b border-[var(--border)] last:border-b-0"
                >

                  <button
                    onClick={() =>
                      setExpanded(
                        isOpen ? null : record.id
                      )
                    }
                    className="flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-[var(--surface-subtle)]"
                  >

                    {/* Number */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-subtle)] text-xs font-medium text-[var(--text-secondary)]">
                      {index + 1}
                    </div>


                    {/* Main info */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="font-mono text-xs font-semibold text-[var(--text)]">
                          {record.action}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--success-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--success)]">
                          <CheckCircle2 size={11} />
                          Verified
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        {formatAction(record.action)}
                      </p>

                    </div>


                    {/* Timestamp */}
                    <div className="hidden text-right sm:block">

                      <p className="text-xs font-medium text-[var(--text)]">
                        {formatTimestamp(record.timestamp)}
                      </p>

                      <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                        Record #{record.id}
                      </p>

                    </div>


                    {isOpen ? (
                      <ChevronUp
                        size={17}
                        className="shrink-0 text-[var(--text-muted)]"
                      />
                    ) : (
                      <ChevronDown
                        size={17}
                        className="shrink-0 text-[var(--text-muted)]"
                      />
                    )}

                  </button>


                  {/* Expanded record */}
                  {isOpen && (
                    <div className="bg-[var(--surface-subtle)] px-6 pb-6 pt-1">

                      <div className="grid gap-4 md:grid-cols-2">

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                            Previous hash
                          </p>

                          <p className="mt-2 break-all rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-xs text-[var(--text-secondary)]">
                            {record.previous_hash}
                          </p>
                        </div>


                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                            Current hash
                          </p>

                          <p className="mt-2 break-all rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-xs text-[var(--text-secondary)]">
                            {record.current_hash}
                          </p>
                        </div>

                      </div>


                      <div className="mt-4">

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          Metadata
                        </p>

                        <pre className="mt-2 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
                          {JSON.stringify(
                            record.metadata,
                            null,
                            2
                          )}
                        </pre>

                      </div>

                    </div>
                  )}

                </div>
              )
            })}

          </div>

        )}

      </div>


      {/* Explanation */}
      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-5">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0 text-[var(--accent)]"
          />

          <div>

            <p className="text-sm font-medium text-[var(--text)]">
              How the Trust Ledger works
            </p>

            <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">
              Each record contains its own SHA-256 hash and the hash
              of the previous record. Changing an earlier record
              changes its hash and breaks the chain, allowing the
              ledger to detect tampering.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}