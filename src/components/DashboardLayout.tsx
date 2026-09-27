import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  Brain,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  User,
  X,
} from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('mentorbridge_theme')

  if (
    saved === 'light' ||
    saved === 'dark' ||
    saved === 'system'
  ) {
    return saved
  }

  return 'light'
}

const applyTheme = (theme: Theme) => {
  const root = document.documentElement

  let isDark = false

  if (theme === 'dark') {
    isDark = true
  }

  if (theme === 'system') {
    isDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
  }

  root.classList.toggle('dark', isDark)
  root.style.colorScheme = isDark ? 'dark' : 'light'
}

const navSections = [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: Home,
      },
    ],
  },
  {
    title: 'Match',
    items: [
      {
        label: 'Find a Mentor',
        path: '/dashboard/find-mentor',
        icon: Search,
      },
      {
        label: 'AI Analysis',
        path: '/dashboard/ai-analysis',
        icon: Brain,
      },
      {
        label: 'My Matches',
        path: '/dashboard/my-matches',
        icon: BarChart3,
      },
    ],
  },
  {
    title: 'Knowledge',
    items: [
      {
        label: 'Knowledge Copilot',
        path: '/dashboard/knowledge',
        icon: Brain,
      },
    ],
  },
  {
    title: 'Trust',
    items: [
      {
        label: 'Trust Ledger',
        path: '/dashboard/trust-ledger',
        icon: ShieldCheck,
      },
    ],
  },
]

function DashboardLayout() {
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const [theme, setTheme] = useState<Theme>(
    getInitialTheme,
  )

  /* =========================================================
     THEME
  ========================================================= */

  useEffect(() => {
    applyTheme(theme)

    localStorage.setItem(
      'mentorbridge_theme',
      theme,
    )
  }, [theme])

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent =
        event as CustomEvent<Theme>

      if (
        customEvent.detail === 'light' ||
        customEvent.detail === 'dark' ||
        customEvent.detail === 'system'
      ) {
        setTheme(customEvent.detail)
      }
    }

    window.addEventListener(
      'mentorbridge-theme-change',
      handleThemeChange,
    )

    return () => {
      window.removeEventListener(
        'mentorbridge-theme-change',
        handleThemeChange,
      )
    }
  }, [])

  useEffect(() => {
    if (theme !== 'system') return

    const media = window.matchMedia(
      '(prefers-color-scheme: dark)',
    )

    const handleSystemTheme = () => {
      applyTheme('system')
    }

    media.addEventListener(
      'change',
      handleSystemTheme,
    )

    return () => {
      media.removeEventListener(
        'change',
        handleSystemTheme,
      )
    }
  }, [theme])

  /* =========================================================
     MOBILE
  ========================================================= */

  const closeMobile = () => {
    setMobileOpen(false)
  }

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      'mentorbridge_current_challenge',
    )

    localStorage.removeItem(
      'mentorbridge_latest_matches',
    )

    localStorage.removeItem(
      'mentorbridge_copilot_messages',
    )

    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#EDE8D0] text-[#25251F] transition-colors duration-200">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-40
          hidden
          h-screen
          border-r
          border-[#DCD6BD]
          bg-[#F8F5E9]
          lg:flex
          lg:flex-col
          transition-[width]
          duration-200
          ${
            collapsed
              ? 'w-[76px]'
              : 'w-[252px]'
          }
        `}
      >

        {/* Brand */}

        <div
          className={`
            flex
            h-[72px]
            shrink-0
            items-center
            border-b
            border-[#DCD6BD]
            ${
              collapsed
                ? 'justify-center px-3'
                : 'px-5'
            }
          `}
        >

          <button
            onClick={() =>
              navigate('/dashboard')
            }
            className="flex items-center gap-3"
            aria-label="Go to dashboard"
          >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#5F6754] text-white">
              <span className="text-xs font-bold">
                MB
              </span>
            </div>

            {!collapsed && (
              <span className="text-sm font-semibold tracking-tight text-[#25251F]">
                MENTORBRIDGE
              </span>
            )}

          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">

          {navSections.map((section) => (
            <div
              key={section.title}
              className="mb-6"
            >

              {!collapsed && (
                <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A7A38E]">
                  {section.title}
                </div>
              )}

              <div className="space-y-1">

                {section.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={
                        item.path ===
                        '/dashboard'
                      }
                      onClick={closeMobile}
                      title={
                        collapsed
                          ? item.label
                          : undefined
                      }
                      className={({
                        isActive,
                      }) =>
                        `
                          group
                          flex
                          items-center
                          gap-3
                          rounded-md
                          px-3
                          py-2.5
                          text-xs
                          font-medium
                          transition-colors
                          ${
                            isActive
                              ? 'bg-[#E3E6D9] text-[#4D5544]'
                              : 'text-[#666457] hover:bg-[#E5E0C8] hover:text-[#25251F]'
                          }
                          ${
                            collapsed
                              ? 'justify-center'
                              : ''
                          }
                        `
                      }
                    >

                      <Icon
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0"
                      />

                      {!collapsed && (
                        <span>
                          {item.label}
                        </span>
                      )}

                    </NavLink>
                  )
                })}

              </div>

            </div>
          ))}

        </nav>

        {/* Bottom Navigation */}

        <div className="border-t border-[#DCD6BD] p-3">

          {/* Profile */}

          <NavLink
            to="/dashboard/profile"
            title={
              collapsed
                ? 'Profile'
                : undefined
            }
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-3
                rounded-md
                px-3
                py-2.5
                text-xs
                font-medium
                transition-colors
                ${
                  isActive
                    ? 'bg-[#E3E6D9] text-[#4D5544]'
                    : 'text-[#666457] hover:bg-[#E5E0C8] hover:text-[#25251F]'
                }
                ${
                  collapsed
                    ? 'justify-center'
                    : ''
                }
              `
            }
          >

            <User
              size={17}
              strokeWidth={1.8}
              className="shrink-0"
            />

            {!collapsed && (
              <span>
                Profile
              </span>
            )}

          </NavLink>

          {/* Settings */}

          <NavLink
            to="/dashboard/settings"
            title={
              collapsed
                ? 'Settings'
                : undefined
            }
            className={({ isActive }) =>
              `
                mt-1
                flex
                items-center
                gap-3
                rounded-md
                px-3
                py-2.5
                text-xs
                font-medium
                transition-colors
                ${
                  isActive
                    ? 'bg-[#E3E6D9] text-[#4D5544]'
                    : 'text-[#666457] hover:bg-[#E5E0C8] hover:text-[#25251F]'
                }
                ${
                  collapsed
                    ? 'justify-center'
                    : ''
                }
              `
            }
          >

            <Settings
              size={17}
              strokeWidth={1.8}
              className="shrink-0"
            />

            {!collapsed && (
              <span>
                Settings
              </span>
            )}

          </NavLink>

          {/* User */}

          <div
            className={`
              mt-3
              border-t
              border-[#DCD6BD]
              pt-3
              ${
                collapsed
                  ? 'flex justify-center'
                  : ''
              }
            `}
          >

            {!collapsed ? (
              <div className="flex items-center gap-3 px-2">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DCD6BD] text-[11px] font-semibold text-[#4D5544]">
                  GK
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-xs font-semibold text-[#25251F]">
                    Praneeth Kumar
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-[#858272]">
                    Student
                  </p>

                </div>

                <button
                  onClick={handleLogout}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#858272] hover:bg-[#E5E0C8] hover:text-[#25251F]"
                  title="Sign out"
                >
                  <LogOut size={15} />
                </button>

              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-md text-[#858272] hover:bg-[#E5E0C8] hover:text-[#25251F]"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            )}

          </div>

        </div>

        {/* Collapse Button */}

        <button
          onClick={() =>
            setCollapsed(
              (value) => !value,
            )
          }
          className="
            absolute
            -right-3
            top-[84px]
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border
            border-[#DCD6BD]
            bg-[#F8F5E9]
            text-[#666457]
            shadow-sm
            hover:bg-[#E5E0C8]
            hover:text-[#25251F]
          "
          aria-label={
            collapsed
              ? 'Expand navigation'
              : 'Collapse navigation'
          }
        >

          {collapsed ? (
            <ChevronRight size={13} />
          ) : (
            <ChevronLeft size={13} />
          )}

        </button>

      </aside>

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}

      <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b border-[#DCD6BD] bg-[#F8F5E9] px-4 lg:hidden">

        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#666457] hover:bg-[#E5E0C8]"
          aria-label="Open navigation"
        >
          <Menu size={19} />
        </button>

        <button
          onClick={() =>
            navigate('/dashboard')
          }
          className="ml-3 flex items-center gap-2"
        >

          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5F6754] text-white">
            <span className="text-[10px] font-bold">
              MB
            </span>
          </div>

          <span className="text-sm font-semibold tracking-tight text-[#25251F]">
            MENTORBRIDGE
          </span>

        </button>

      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <button
            onClick={closeMobile}
            className="absolute inset-0 bg-black/30"
            aria-label="Close navigation"
          />

          <aside className="relative flex h-full w-[280px] flex-col border-r border-[#DCD6BD] bg-[#F8F5E9] shadow-xl">

            {/* Mobile Brand */}

            <div className="flex h-14 items-center justify-between border-b border-[#DCD6BD] px-4">

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5F6754] text-white">
                  <span className="text-[10px] font-bold">
                    MB
                  </span>
                </div>

                <span className="text-sm font-semibold tracking-tight text-[#25251F]">
                  MENTORBRIDGE
                </span>

              </div>

              <button
                onClick={closeMobile}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#666457] hover:bg-[#E5E0C8]"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>

            </div>

            {/* Mobile Navigation */}

            <nav className="flex-1 overflow-y-auto px-3 py-5">

              {navSections.map((section) => (
                <div
                  key={section.title}
                  className="mb-6"
                >

                  <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A7A38E]">
                    {section.title}
                  </div>

                  <div className="space-y-1">

                    {section.items.map((item) => {
                      const Icon = item.icon

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={
                            item.path ===
                            '/dashboard'
                          }
                          onClick={closeMobile}
                          className={({
                            isActive,
                          }) =>
                            `
                              flex
                              items-center
                              gap-3
                              rounded-md
                              px-3
                              py-2.5
                              text-xs
                              font-medium
                              ${
                                isActive
                                  ? 'bg-[#E3E6D9] text-[#4D5544]'
                                  : 'text-[#666457] hover:bg-[#E5E0C8] hover:text-[#25251F]'
                              }
                            `
                          }
                        >

                          <Icon
                            size={17}
                            strokeWidth={1.8}
                          />

                          <span>
                            {item.label}
                          </span>

                        </NavLink>
                      )
                    })}

                  </div>

                </div>
              ))}

            </nav>

            {/* Mobile Bottom Navigation */}

            <div className="border-t border-[#DCD6BD] p-3">

              <NavLink
                to="/dashboard/profile"
                onClick={closeMobile}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-3
                    rounded-md
                    px-3
                    py-2.5
                    text-xs
                    font-medium
                    ${
                      isActive
                        ? 'bg-[#E3E6D9] text-[#4D5544]'
                        : 'text-[#666457] hover:bg-[#E5E0C8] hover:text-[#25251F]'
                    }
                  `
                }
              >

                <User size={17} />

                Profile

              </NavLink>

              <NavLink
                to="/dashboard/settings"
                onClick={closeMobile}
                className={({ isActive }) =>
                  `
                    mt-1
                    flex
                    items-center
                    gap-3
                    rounded-md
                    px-3
                    py-2.5
                    text-xs
                    font-medium
                    ${
                      isActive
                        ? 'bg-[#E3E6D9] text-[#4D5544]'
                        : 'text-[#666457] hover:bg-[#E5E0C8] hover:text-[#25251F]'
                    }
                  `
                }
              >

                <Settings size={17} />

                Settings

              </NavLink>

              <button
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium text-[#666457] hover:bg-[#E5E0C8] hover:text-[#25251F]"
              >

                <LogOut size={17} />

                Sign out

              </button>

            </div>

          </aside>

        </div>
      )}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        className={`
          min-h-screen
          pt-14
          lg:pt-0
          transition-[padding]
          duration-200
          ${
            collapsed
              ? 'lg:pl-[76px]'
              : 'lg:pl-[252px]'
          }
        `}
      >

        <Outlet />

      </main>

    </div>
  )
}

export default DashboardLayout