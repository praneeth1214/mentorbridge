import { useState } from 'react'
import {
  Bell,
  Check,
  ChevronRight,
  Lock,
  LogOut,
  Moon,
  Monitor,
  Palette,
  Shield,
  Sun,
  User,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Theme = 'light' | 'dark' | 'system'

function Settings() {
  const navigate = useNavigate()

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('mentorbridge_theme')

    if (
      saved === 'light' ||
      saved === 'dark' ||
      saved === 'system'
    ) {
      return saved
    }

    return 'light'
  })

  const [emailNotifications, setEmailNotifications] =
    useState(true)

  const [matchNotifications, setMatchNotifications] =
    useState(true)

  const [copilotEnabled, setCopilotEnabled] =
    useState(true)

  /* =========================================================
     THEME
  ========================================================= */

  const changeTheme = (nextTheme: Theme) => {
    setTheme(nextTheme)

    localStorage.setItem(
      'mentorbridge_theme',
      nextTheme,
    )

    const root = document.documentElement

    let isDark = false

    if (nextTheme === 'dark') {
      isDark = true
    }

    if (nextTheme === 'system') {
      isDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
    }

    root.classList.toggle('dark', isDark)
    root.style.colorScheme = isDark ? 'dark' : 'light'

    window.dispatchEvent(
      new CustomEvent(
        'mentorbridge-theme-change',
        {
          detail: nextTheme,
        },
      ),
    )
  }

  /* =========================================================
     SIGN OUT
  ========================================================= */

  const handleSignOut = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-full bg-[#EDE8D0] text-[#25251F]">

      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8">

          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[#858272]">
            Account
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-[#25251F] sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#666457]">
            Manage your MENTORBRIDGE preferences,
            notifications and account settings.
          </p>

        </div>


        {/* =====================================================
            APPEARANCE
        ===================================================== */}

        <section className="mb-5 overflow-hidden rounded-lg border border-[#DCD6BD] bg-[#F8F5E9]">

          <div className="border-b border-[#DCD6BD] px-5 py-5 sm:px-6">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E3E6D9] text-[#5F6754]">
                <Palette size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#25251F]">
                  Appearance
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-[#858272]">
                  Choose how MENTORBRIDGE looks on this device.
                </p>
              </div>

            </div>

          </div>


          <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">

            {/* Light */}

            <button
              onClick={() => changeTheme('light')}
              className={`
                relative
                flex
                items-center
                gap-3
                rounded-md
                border
                p-4
                text-left
                transition-colors
                ${
                  theme === 'light'
                    ? 'border-[#5F6754] bg-[#E3E6D9]'
                    : 'border-[#DCD6BD] bg-[#F8F5E9] hover:bg-[#E5E0C8]'
                }
              `}
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E5E0C8] text-[#5F6754]">
                <Sun size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#25251F]">
                  Light
                </p>
                <p className="mt-0.5 text-[11px] text-[#858272]">
                  Cream interface
                </p>
              </div>

              {theme === 'light' && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#5F6754] text-white">
                  <Check size={12} />
                </div>
              )}

            </button>


            {/* Dark */}

            <button
              onClick={() => changeTheme('dark')}
              className={`
                relative
                flex
                items-center
                gap-3
                rounded-md
                border
                p-4
                text-left
                transition-colors
                ${
                  theme === 'dark'
                    ? 'border-[#5F6754] bg-[#E3E6D9]'
                    : 'border-[#DCD6BD] bg-[#F8F5E9] hover:bg-[#E5E0C8]'
                }
              `}
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E5E0C8] text-[#5F6754]">
                <Moon size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#25251F]">
                  Dark
                </p>
                <p className="mt-0.5 text-[11px] text-[#858272]">
                  Dark interface
                </p>
              </div>

              {theme === 'dark' && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#5F6754] text-white">
                  <Check size={12} />
                </div>
              )}

            </button>


            {/* System */}

            <button
              onClick={() => changeTheme('system')}
              className={`
                relative
                flex
                items-center
                gap-3
                rounded-md
                border
                p-4
                text-left
                transition-colors
                ${
                  theme === 'system'
                    ? 'border-[#5F6754] bg-[#E3E6D9]'
                    : 'border-[#DCD6BD] bg-[#F8F5E9] hover:bg-[#E5E0C8]'
                }
              `}
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E5E0C8] text-[#5F6754]">
                <Monitor size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#25251F]">
                  System
                </p>
                <p className="mt-0.5 text-[11px] text-[#858272]">
                  Follow device
                </p>
              </div>

              {theme === 'system' && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#5F6754] text-white">
                  <Check size={12} />
                </div>
              )}

            </button>

          </div>

        </section>


        {/* =====================================================
            NOTIFICATIONS
        ===================================================== */}

        <section className="mb-5 overflow-hidden rounded-lg border border-[#DCD6BD] bg-[#F8F5E9]">

          <div className="border-b border-[#DCD6BD] px-5 py-5 sm:px-6">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E3E6D9] text-[#5F6754]">
                <Bell size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#25251F]">
                  Notifications
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-[#858272]">
                  Control which updates you receive.
                </p>
              </div>

            </div>

          </div>


          <div className="divide-y divide-[#DCD6BD]">

            <ToggleRow
              title="Email notifications"
              description="Receive important account and platform updates."
              enabled={emailNotifications}
              onChange={() =>
                setEmailNotifications(
                  (value) => !value,
                )
              }
            />

            <ToggleRow
              title="Mentor match updates"
              description="Get notified when new mentor matches are available."
              enabled={matchNotifications}
              onChange={() =>
                setMatchNotifications(
                  (value) => !value,
                )
              }
            />

          </div>

        </section>


        {/* =====================================================
            AI PREFERENCES
        ===================================================== */}

        <section className="mb-5 overflow-hidden rounded-lg border border-[#DCD6BD] bg-[#F8F5E9]">

          <div className="border-b border-[#DCD6BD] px-5 py-5 sm:px-6">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E3E6D9] text-[#5F6754]">
                <Shield size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#25251F]">
                  AI preferences
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-[#858272]">
                  Configure how AI features use your current context.
                </p>
              </div>

            </div>

          </div>


          <div className="divide-y divide-[#DCD6BD]">

            <ToggleRow
              title="Context-aware Knowledge Copilot"
              description="Allow Copilot to use your current challenge when answering questions."
              enabled={copilotEnabled}
              onChange={() =>
                setCopilotEnabled(
                  (value) => !value,
                )
              }
            />

          </div>

        </section>


        {/* =====================================================
            ACCOUNT
        ===================================================== */}

        <section className="mb-5 overflow-hidden rounded-lg border border-[#DCD6BD] bg-[#F8F5E9]">

          <div className="border-b border-[#DCD6BD] px-5 py-5 sm:px-6">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E3E6D9] text-[#5F6754]">
                <User size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#25251F]">
                  Account
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-[#858272]">
                  Manage your profile and security settings.
                </p>
              </div>

            </div>

          </div>


          <div className="divide-y divide-[#DCD6BD]">

            <button
              onClick={() =>
                navigate('/dashboard/profile')
              }
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-[#E5E0C8] sm:px-6"
            >

              <div>
                <p className="text-xs font-semibold text-[#25251F]">
                  Profile
                </p>

                <p className="mt-1 text-[11px] text-[#858272]">
                  Update your personal and academic information.
                </p>
              </div>

              <ChevronRight
                size={16}
                className="text-[#A7A38E]"
              />

            </button>


            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-[#E5E0C8] sm:px-6"
            >

              <div className="flex items-center gap-3">

                <div>
                  <p className="text-xs font-semibold text-[#25251F]">
                    Privacy & security
                  </p>

                  <p className="mt-1 text-[11px] text-[#858272]">
                    Review how your account data is protected.
                  </p>
                </div>

              </div>

              <ChevronRight
                size={16}
                className="text-[#A7A38E]"
              />

            </button>

          </div>

        </section>


        {/* =====================================================
            SECURITY NOTICE
        ===================================================== */}

        <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#DCD6BD] bg-[#F8F5E9] px-5 py-4">

          <Lock
            size={16}
            className="mt-0.5 shrink-0 text-[#5F6754]"
          />

          <div>

            <p className="text-xs font-semibold text-[#25251F]">
              Your preferences are stored locally
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-[#858272]">
              Theme preferences are saved on this device.
              Account authentication is handled separately by Supabase.
            </p>

          </div>

        </div>


        {/* =====================================================
            SIGN OUT
        ===================================================== */}

        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-md border border-[#DCD6BD] bg-[#F8F5E9] px-4 py-2.5 text-xs font-semibold text-[#666457] transition-colors hover:bg-[#E5E0C8] hover:text-[#25251F]"
        >
          <LogOut size={15} />
          Sign out
        </button>


        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#858272]">
          <Lock size={12} />
          <span>
            MENTORBRIDGE keeps important AI actions traceable through the cryptographic trust ledger.
          </span>
        </div>

      </div>

    </div>
  )
}


/* ============================================================
   TOGGLE
============================================================ */

function ToggleRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string
  description: string
  enabled: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-4 sm:px-6">

      <div className="min-w-0">

        <p className="text-xs font-semibold text-[#25251F]">
          {title}
        </p>

        <p className="mt-1 max-w-2xl text-[11px] leading-relaxed text-[#858272]">
          {description}
        </p>

      </div>


      <button
        onClick={onChange}
        aria-label={`${title}: ${enabled ? 'on' : 'off'}`}
        aria-pressed={enabled}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition-colors
          ${
            enabled
              ? 'bg-[#5F6754]'
              : 'bg-[#DCD6BD]'
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            ${
              enabled
                ? 'translate-x-6'
                : 'translate-x-1'
            }
          `}
        />

      </button>

    </div>
  )
}

export default Settings