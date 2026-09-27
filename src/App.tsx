import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import DashboardLayout from './components/DashboardLayout'

import Landing from './pages/Landing'
import Login from './pages/Login'
import StudentLogin from './pages/StudentLogin'
import MentorLogin from './pages/MentorLogin'
import SignUp from './pages/SignUp'

import Dashboard from './pages/Dashboard'
import FindMentor from './pages/FindMentor'
import AIAnalysis from './pages/AIAnalysis'
import MatchResults from './pages/MatchResults'
import MentorProfile from './pages/MentorProfile'
import MyMatches from './pages/MyMatches'
import KnowledgeCopilot from './pages/KnowledgeCopilot'
import TrustLedger from './pages/TrustLedger'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import DesignSystem from './pages/DesignSystem'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PUBLIC
        ===================================================== */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        <Route
          path="/mentor-login"
          element={<MentorLogin />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        <Route
  path="/dashboard/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route
                  index
                  element={<Dashboard />}
                />

                <Route
                  path="find-mentor"
                  element={<FindMentor />}
                />

                <Route
                  path="ai-analysis"
                  element={<AIAnalysis />}
                />

                <Route
                  path="matches"
                  element={<MatchResults />}
                />

                <Route
                  path="mentor/:id"
                  element={<MentorProfile />}
                />

                <Route
                  path="my-matches"
                  element={<MyMatches />}
                />

                <Route
                  path="knowledge"
                  element={<KnowledgeCopilot />}
                />

                <Route
                  path="trust-ledger"
                  element={<TrustLedger />}
                />

                <Route
                  path="profile"
                  element={<Profile />}
                />

                <Route
                  path="settings"
                  element={<Settings />}
                />

                <Route
                  path="design-system"
                  element={<DesignSystem />}
                />

                <Route
                  path="*"
                  element={
                    <Navigate
                      to="/dashboard"
                      replace
                    />
                  }
                />
              </Routes>
            </DashboardLayout>
          }
        />

        {/* =====================================================
            FALLBACK
        ===================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}