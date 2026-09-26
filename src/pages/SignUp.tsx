import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  GraduationCap,
  BriefcaseBusiness,
  Loader2,
  User,
  X,
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

type Role = 'student' | 'mentor'

type StudentData = {
  fullName: string
  college: string
  degree: string
  year: string
  interests: string[]
  skills: string
  currentProject: string
  helpWith: string[]
  goals: string
  linkedin: string
}

type MentorData = {
  fullName: string
  role: string
  company: string
  experience: string
  expertise: string[]
  industries: string[]
  experienceSummary: string
  problems: string
  studentTypes: string[]
  mentoringTopics: string[]
  availability: string
  linkedin: string
}

const studentInterestOptions = [
  'AI / ML',
  'Data Science',
  'Software Development',
  'Product',
  'Business',
  'Marketing',
  'Finance',
  'Healthcare',
]

const studentHelpOptions = [
  'Technical guidance',
  'Product decisions',
  'Business strategy',
  'Startup validation',
  'Career guidance',
  'Fundraising',
  'Marketing / Growth',
]

const mentorExpertiseOptions = [
  'Technology',
  'Data / AI',
  'Product',
  'Business Strategy',
  'Finance',
  'Marketing',
  'Operations',
  'HR / Leadership',
  'Cybersecurity',
  'Healthcare',
]

const mentorIndustryOptions = [
  'SaaS',
  'FinTech',
  'Healthcare',
  'E-commerce',
  'EdTech',
  'Manufacturing',
  'Enterprise',
  'Consumer',
]

const mentorStudentOptions = [
  'Early-stage founders',
  'Student projects',
  'Technical teams',
  'Product teams',
  'Business ideas',
  'Career-focused students',
]

const mentorTopicOptions = [
  'Problem validation',
  'Product strategy',
  'Technical architecture',
  'Business strategy',
  'Go-to-market',
  'Fundraising',
  'Career development',
  'Leadership',
]

const initialStudentData: StudentData = {
  fullName: '',
  college: '',
  degree: '',
  year: '',
  interests: [],
  skills: '',
  currentProject: '',
  helpWith: [],
  goals: '',
  linkedin: '',
}

const initialMentorData: MentorData = {
  fullName: '',
  role: '',
  company: '',
  experience: '',
  expertise: [],
  industries: [],
  experienceSummary: '',
  problems: '',
  studentTypes: [],
  mentoringTopics: [],
  availability: '',
  linkedin: '',
}

export default function SignUp() {
  const navigate = useNavigate()

  const [role, setRole] = useState<Role | null>(null)
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [studentData, setStudentData] =
    useState<StudentData>(initialStudentData)

  const [mentorData, setMentorData] =
    useState<MentorData>(initialMentorData)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /* =========================================================
     HELPERS
  ========================================================= */

  const updateStudent = (
    field: keyof StudentData,
    value: string | string[],
  ) => {
    setStudentData((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const updateMentor = (
    field: keyof MentorData,
    value: string | string[],
  ) => {
    setMentorData((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const toggleArrayValue = (
    current: string[],
    value: string,
  ) => {
    return current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]
  }

  const selectRole = (selectedRole: Role) => {
    setRole(selectedRole)
    setStep(1)
    setError('')
  }

  const totalSteps = 4

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateStep = () => {
    setError('')

    if (!role) {
      setError('Please choose how you will use MENTORBRIDGE.')
      return false
    }

    /* ---------------- STUDENT ---------------- */

    if (role === 'student') {
      if (step === 1) {
        if (!studentData.fullName.trim()) {
          setError('Please enter your full name.')
          return false
        }

        if (!studentData.college.trim()) {
          setError('Please enter your college or university.')
          return false
        }

        if (!studentData.degree.trim()) {
          setError('Please enter your degree or program.')
          return false
        }

        if (!studentData.year) {
          setError('Please select your current year.')
          return false
        }
      }

      if (step === 2) {
        if (studentData.interests.length === 0) {
          setError(
            'Please select at least one area of interest.',
          )
          return false
        }

        if (!studentData.skills.trim()) {
          setError('Please tell us about your current skills.')
          return false
        }

        if (!studentData.currentProject.trim()) {
          setError(
            'Please describe what you are currently working on.',
          )
          return false
        }
      }

      if (step === 3) {
        if (studentData.helpWith.length === 0) {
          setError(
            'Please select what you would like help with.',
          )
          return false
        }

        if (!studentData.goals.trim()) {
          setError(
            'Please tell us what you want to achieve.',
          )
          return false
        }
      }

      if (step === 4) {
        if (!email.trim()) {
          setError('Please enter your email address.')
          return false
        }

        if (!password) {
          setError('Please create a password.')
          return false
        }

        if (password.length < 6) {
          setError(
            'Password must be at least 6 characters.',
          )
          return false
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match.')
          return false
        }
      }
    }

    /* ---------------- MENTOR ---------------- */

    if (role === 'mentor') {
      if (step === 1) {
        if (!mentorData.fullName.trim()) {
          setError('Please enter your full name.')
          return false
        }

        if (!mentorData.role.trim()) {
          setError(
            'Please enter your current or most recent role.',
          )
          return false
        }

        if (!mentorData.company.trim()) {
          setError(
            'Please enter your company or organization.',
          )
          return false
        }

        if (!mentorData.experience) {
          setError(
            'Please select your years of experience.',
          )
          return false
        }
      }

      if (step === 2) {
        if (mentorData.expertise.length === 0) {
          setError(
            'Please select at least one expertise area.',
          )
          return false
        }

        if (mentorData.industries.length === 0) {
          setError(
            'Please select at least one industry.',
          )
          return false
        }

        if (!mentorData.experienceSummary.trim()) {
          setError(
            'Please describe your professional experience.',
          )
          return false
        }

        if (!mentorData.problems.trim()) {
          setError(
            'Please describe the problems you can help solve.',
          )
          return false
        }
      }

      if (step === 3) {
        if (mentorData.studentTypes.length === 0) {
          setError(
            'Please select who you would like to mentor.',
          )
          return false
        }

        if (mentorData.mentoringTopics.length === 0) {
          setError(
            'Please select at least one mentoring topic.',
          )
          return false
        }

        if (!mentorData.availability) {
          setError(
            'Please select your mentoring availability.',
          )
          return false
        }
      }

      if (step === 4) {
        if (!email.trim()) {
          setError('Please enter your email address.')
          return false
        }

        if (!password) {
          setError('Please create a password.')
          return false
        }

        if (password.length < 6) {
          setError(
            'Password must be at least 6 characters.',
          )
          return false
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match.')
          return false
        }
      }
    }

    return true
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleNext = () => {
    if (!validateStep()) return

    if (step < totalSteps) {
      setStep((previous) => previous + 1)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const handleBack = () => {
    setError('')

    if (step > 1) {
      setStep((previous) => previous - 1)
      return
    }

    setRole(null)
  }

  /* =========================================================
     SIGN UP
  ========================================================= */

  const handleCreateAccount = async () => {
    if (!validateStep()) return

    setLoading(true)
    setError('')

    try {
      const onboardingData =
        role === 'student'
          ? {
              role: 'student',
              profile: studentData,
            }
          : {
              role: 'mentor',
              profile: mentorData,
            }

      const { data, error: signupError } =
        await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              role,
              full_name:
                role === 'student'
                  ? studentData.fullName
                  : mentorData.fullName,
              onboarding: onboardingData,
            },
          },
        })

      if (signupError) {
        throw signupError
      }

      if (!data.user) {
        throw new Error(
          'Account could not be created. Please try again.',
        )
      }

      /* Save a local copy for the current application */

      localStorage.setItem(
        'mentorbridge_user_role',
        role as string,
      )

      localStorage.setItem(
        'mentorbridge_onboarding',
        JSON.stringify(onboardingData),
      )

      /*
       * Supabase may require email confirmation.
       * If a session exists, continue directly.
       * Otherwise send the user to login.
       */

      if (data.session) {
        navigate('/dashboard')
      } else {
        navigate('/login', {
          state: {
            signupSuccess: true,
            email: email.trim().toLowerCase(),
          },
        })
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while creating your account.'

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  /* =========================================================
     ROLE SELECTION
  ========================================================= */

  if (!role) {
    return (
      <div className="min-h-screen bg-[#EDE8D0] text-[#25251F]">

        <header className="flex items-center justify-between border-b border-[#DCD6BD] bg-[#F8F5E9] px-5 py-4 sm:px-8">

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#5F6754] text-white">
              <span className="text-xs font-bold">
                MB
              </span>
            </div>

            <span className="text-sm font-semibold tracking-tight">
              MENTORBRIDGE
            </span>

          </button>

          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-xs font-medium text-[#666457] hover:text-[#25251F]"
          >
            <ChevronLeft size={15} />
            Back to login
          </button>

        </header>


        <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-4xl items-center px-5 py-12 sm:px-8">

          <div className="w-full">

            <div className="mx-auto mb-10 max-w-2xl text-center">

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#858272]">
                Get started
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#25251F] sm:text-4xl">
                How will you use MENTORBRIDGE?
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#666457]">
                Your role determines the questions we ask and how
                MENTORBRIDGE builds your experience profile.
              </p>

            </div>


            <div className="grid gap-4 md:grid-cols-2">

              {/* Student */}

              <button
                onClick={() => selectRole('student')}
                className="group rounded-lg border border-[#DCD6BD] bg-[#F8F5E9] p-6 text-left transition-colors hover:border-[#5F6754] hover:bg-[#E3E6D9] sm:p-7"
              >

                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-md bg-[#E3E6D9] text-[#5F6754] group-hover:bg-[#F8F5E9]">
                  <GraduationCap size={21} />
                </div>

                <h2 className="text-base font-semibold text-[#25251F]">
                  I'm a Student
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-[#666457]">
                  I have a problem, project, startup idea or
                  career question and want guidance from someone
                  with relevant experience.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#5F6754]">
                  Build my student profile
                  <ArrowRight size={14} />
                </div>

              </button>


              {/* Mentor */}

              <button
                onClick={() => selectRole('mentor')}
                className="group rounded-lg border border-[#DCD6BD] bg-[#F8F5E9] p-6 text-left transition-colors hover:border-[#5F6754] hover:bg-[#E3E6D9] sm:p-7"
              >

                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-md bg-[#E3E6D9] text-[#5F6754] group-hover:bg-[#F8F5E9]">
                  <BriefcaseBusiness size={21} />
                </div>

                <h2 className="text-base font-semibold text-[#25251F]">
                  I'm a Mentor
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-[#666457]">
                  I have professional experience and want to
                  help students solve real problems through
                  practical guidance.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#5F6754]">
                  Build my mentor profile
                  <ArrowRight size={14} />
                </div>

              </button>

            </div>

          </div>

        </main>

      </div>
    )
  }

  /* =========================================================
     ONBOARDING
  ========================================================= */

  const currentTitle =
    role === 'student'
      ? [
          'About you',
          'Your direction',
          'Your mentorship goals',
          'Create your account',
        ][step - 1]
      : [
          'Professional background',
          'Your experience',
          'How you mentor',
          'Create your account',
        ][step - 1]

  const currentDescription =
    role === 'student'
      ? [
          'Tell us a little about your academic background.',
          'This helps us understand where you are and what you are building.',
          'Tell us what you want to learn, solve or achieve.',
          'Set your login credentials to finish your profile.',
        ][step - 1]
      : [
          'Tell us about your professional background.',
          'Your experience helps us identify relevant student problems.',
          'Tell us who and what you would like to mentor.',
          'Set your login credentials to finish your profile.',
        ][step - 1]

  return (
    <div className="min-h-screen bg-[#EDE8D0] text-[#25251F]">

      {/* Header */}

      <header className="border-b border-[#DCD6BD] bg-[#F8F5E9]">

        <div className="mx-auto flex h-[68px] max-w-4xl items-center justify-between px-5 sm:px-8">

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#5F6754] text-white">
              <span className="text-xs font-bold">
                MB
              </span>
            </div>

            <span className="text-sm font-semibold tracking-tight">
              MENTORBRIDGE
            </span>

          </button>

          <div className="flex items-center gap-3">

            <span className="hidden text-[11px] text-[#858272] sm:block">
              {role === 'student'
                ? 'Student onboarding'
                : 'Mentor onboarding'}
            </span>

            <button
              onClick={() => setRole(null)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#666457] hover:bg-[#E5E0C8]"
              title="Change role"
            >
              <X size={16} />
            </button>

          </div>

        </div>

      </header>


      {/* Progress */}

      <div className="border-b border-[#DCD6BD] bg-[#F8F5E9]">

        <div className="mx-auto max-w-4xl px-5 py-4 sm:px-8">

          <div className="flex items-center gap-2">

            {Array.from({
              length: totalSteps,
            }).map((_, index) => {

              const number = index + 1

              return (
                <div
                  key={number}
                  className="flex flex-1 items-center gap-2"
                >

                  <div
                    className={`
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-[10px]
                      font-semibold
                      ${
                        number < step
                          ? 'bg-[#5F6754] text-white'
                          : number === step
                            ? 'border border-[#5F6754] bg-[#E3E6D9] text-[#4D5544]'
                            : 'border border-[#DCD6BD] bg-[#F8F5E9] text-[#A7A38E]'
                      }
                    `}
                  >
                    {number < step ? (
                      <Check size={13} />
                    ) : (
                      number
                    )}
                  </div>

                  {number < totalSteps && (
                    <div
                      className={`
                        h-px
                        flex-1
                        ${
                          number < step
                            ? 'bg-[#5F6754]'
                            : 'bg-[#DCD6BD]'
                        }
                      `}
                    />
                  )}

                </div>
              )
            })}

          </div>

        </div>

      </div>


      {/* Main */}

      <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 sm:py-10">

        <div className="mb-8">

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#858272]">
            Step {step} of {totalSteps}
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-[#25251F]">
            {currentTitle}
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#666457]">
            {currentDescription}
          </p>

        </div>


        {/* =====================================================
            STUDENT STEP 1
        ===================================================== */}

        {role === 'student' && step === 1 && (
          <div className="space-y-5">

            <InputField
              label="Full name"
              placeholder="Your full name"
              value={studentData.fullName}
              onChange={(value) =>
                updateStudent(
                  'fullName',
                  value,
                )
              }
              required
            />

            <InputField
              label="College / University"
              placeholder="e.g. AVN Institute of Engineering & Technology"
              value={studentData.college}
              onChange={(value) =>
                updateStudent(
                  'college',
                  value,
                )
              }
              required
            />

            <InputField
              label="Degree / Program"
              placeholder="e.g. B.Tech Computer Science & Data Science"
              value={studentData.degree}
              onChange={(value) =>
                updateStudent(
                  'degree',
                  value,
                )
              }
              required
            />

            <SelectField
              label="Current year"
              value={studentData.year}
              onChange={(value) =>
                updateStudent(
                  'year',
                  value,
                )
              }
              options={[
                '1st Year',
                '2nd Year',
                '3rd Year',
                '4th Year',
                'Other',
              ]}
              placeholder="Select your current year"
            />

          </div>
        )}


        {/* =====================================================
            STUDENT STEP 2
        ===================================================== */}

        {role === 'student' && step === 2 && (
          <div className="space-y-6">

            <OptionGroup
              label="Areas you're interested in"
              options={studentInterestOptions}
              selected={studentData.interests}
              onToggle={(value) =>
                updateStudent(
                  'interests',
                  toggleArrayValue(
                    studentData.interests,
                    value,
                  ),
                )
              }
            />

            <TextAreaField
              label="Current skills"
              placeholder="e.g. Python, SQL, React, machine learning..."
              value={studentData.skills}
              onChange={(value) =>
                updateStudent(
                  'skills',
                  value,
                )
              }
              rows={4}
            />

            <TextAreaField
              label="What are you currently working on?"
              placeholder="Tell us about your project, startup idea, research or problem."
              value={studentData.currentProject}
              onChange={(value) =>
                updateStudent(
                  'currentProject',
                  value,
                )
              }
              rows={5}
            />

          </div>
        )}


        {/* =====================================================
            STUDENT STEP 3
        ===================================================== */}

        {role === 'student' && step === 3 && (
          <div className="space-y-6">

            <OptionGroup
              label="What would you like help with?"
              options={studentHelpOptions}
              selected={studentData.helpWith}
              onToggle={(value) =>
                updateStudent(
                  'helpWith',
                  toggleArrayValue(
                    studentData.helpWith,
                    value,
                  ),
                )
              }
            />

            <TextAreaField
              label="What do you want to achieve?"
              placeholder="What would make mentorship valuable for you?"
              value={studentData.goals}
              onChange={(value) =>
                updateStudent(
                  'goals',
                  value,
                )
              }
              rows={5}
            />

            <InputField
              label="LinkedIn / Portfolio"
              placeholder="https://..."
              value={studentData.linkedin}
              onChange={(value) =>
                updateStudent(
                  'linkedin',
                  value,
                )
              }
              required={false}
            />

          </div>
        )}


        {/* =====================================================
            MENTOR STEP 1
        ===================================================== */}

        {role === 'mentor' && step === 1 && (
          <div className="space-y-5">

            <InputField
              label="Full name"
              placeholder="Your full name"
              value={mentorData.fullName}
              onChange={(value) =>
                updateMentor(
                  'fullName',
                  value,
                )
              }
              required
            />

            <InputField
              label="Current / most recent role"
              placeholder="e.g. Former CTO, Product Director"
              value={mentorData.role}
              onChange={(value) =>
                updateMentor(
                  'role',
                  value,
                )
              }
              required
            />

            <InputField
              label="Company / Organization"
              placeholder="Company or organization name"
              value={mentorData.company}
              onChange={(value) =>
                updateMentor(
                  'company',
                  value,
                )
              }
              required
            />

            <SelectField
              label="Professional experience"
              value={mentorData.experience}
              onChange={(value) =>
                updateMentor(
                  'experience',
                  value,
                )
              }
              options={[
                '5–10 years',
                '10–15 years',
                '15–20 years',
                '20+ years',
              ]}
              placeholder="Select experience"
            />

          </div>
        )}


        {/* =====================================================
            MENTOR STEP 2
        ===================================================== */}

        {role === 'mentor' && step === 2 && (
          <div className="space-y-6">

            <OptionGroup
              label="Primary areas of expertise"
              options={mentorExpertiseOptions}
              selected={mentorData.expertise}
              onToggle={(value) =>
                updateMentor(
                  'expertise',
                  toggleArrayValue(
                    mentorData.expertise,
                    value,
                  ),
                )
              }
            />

            <OptionGroup
              label="Industries you've worked in"
              options={mentorIndustryOptions}
              selected={mentorData.industries}
              onToggle={(value) =>
                updateMentor(
                  'industries',
                  toggleArrayValue(
                    mentorData.industries,
                    value,
                  ),
                )
              }
            />

            <TextAreaField
              label="Professional experience"
              placeholder="Briefly describe the experience that students could learn from."
              value={mentorData.experienceSummary}
              onChange={(value) =>
                updateMentor(
                  'experienceSummary',
                  value,
                )
              }
              rows={5}
            />

            <TextAreaField
              label="What problems can you help solve?"
              placeholder="e.g. product-market fit, technical architecture, fundraising..."
              value={mentorData.problems}
              onChange={(value) =>
                updateMentor(
                  'problems',
                  value,
                )
              }
              rows={5}
            />

          </div>
        )}


        {/* =====================================================
            MENTOR STEP 3
        ===================================================== */}

        {role === 'mentor' && step === 3 && (
          <div className="space-y-6">

            <OptionGroup
              label="Who would you like to mentor?"
              options={mentorStudentOptions}
              selected={mentorData.studentTypes}
              onToggle={(value) =>
                updateMentor(
                  'studentTypes',
                  toggleArrayValue(
                    mentorData.studentTypes,
                    value,
                  ),
                )
              }
            />

            <OptionGroup
              label="Mentoring topics"
              options={mentorTopicOptions}
              selected={mentorData.mentoringTopics}
              onToggle={(value) =>
                updateMentor(
                  'mentoringTopics',
                  toggleArrayValue(
                    mentorData.mentoringTopics,
                    value,
                  ),
                )
              }
            />

            <SelectField
              label="How often can you mentor?"
              value={mentorData.availability}
              onChange={(value) =>
                updateMentor(
                  'availability',
                  value,
                )
              }
              options={[
                '1–2 sessions per month',
                '1 session per week',
                '2+ sessions per week',
              ]}
              placeholder="Select availability"
            />

            <InputField
              label="LinkedIn / Professional profile"
              placeholder="https://..."
              value={mentorData.linkedin}
              onChange={(value) =>
                updateMentor(
                  'linkedin',
                  value,
                )
              }
              required={false}
            />

          </div>
        )}


        {/* =====================================================
            ACCOUNT STEP
        ===================================================== */}

        {step === 4 && (
          <div className="space-y-5">

            <div className="rounded-lg border border-[#C8CDBB] bg-[#E3E6D9] p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#5F6754] text-white">
                  <User size={17} />
                </div>

                <div>

                  <p className="text-xs font-semibold text-[#25251F]">
                    {role === 'student'
                      ? studentData.fullName
                      : mentorData.fullName}
                  </p>

                  <p className="mt-1 text-[11px] text-[#666457]">
                    {role === 'student'
                      ? 'Student profile'
                      : 'Mentor profile'}
                  </p>

                </div>

              </div>

            </div>


            <InputField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              required
            />

            <InputField
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={setPassword}
              required
            />

            <InputField
              label="Confirm password"
              type="password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />

          </div>
        )}


        {/* Error */}

        {error && (
          <div className="mt-5 rounded-md border border-[#E0C5C0] bg-[#F3E6E3] px-4 py-3 text-xs font-medium text-[#8A554E]">
            {error}
          </div>
        )}


        {/* Actions */}

        <div className="mt-8 flex items-center justify-between border-t border-[#DCD6BD] pt-6">

          <button
            onClick={handleBack}
            disabled={loading}
            className="flex items-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold text-[#666457] hover:bg-[#E5E0C8] disabled:opacity-50"
          >
            <ChevronLeft size={15} />
            Back
          </button>


          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-md bg-[#5F6754] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#4D5544]"
            >
              Continue
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleCreateAccount}
              disabled={loading}
              className="flex items-center gap-2 rounded-md bg-[#5F6754] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#4D5544] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={15} />
                </>
              )}

            </button>
          )}

        </div>

      </main>

    </div>
  )
}


/* ============================================================
   INPUT
============================================================ */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = true,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-semibold text-[#25251F]">
        {label}
        {required && (
          <span className="ml-1 text-[#9A625B]">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-md border border-[#DCD6BD] bg-[#F8F5E9] px-3.5 py-3 text-sm text-[#25251F] outline-none transition-colors placeholder:text-[#A7A38E] focus:border-[#5F6754]"
      />

    </div>
  )
}


/* ============================================================
   TEXTAREA
============================================================ */

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  rows?: number
}) {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-semibold text-[#25251F]">
        {label}
        <span className="ml-1 text-[#9A625B]">
          *
        </span>
      </label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-md border border-[#DCD6BD] bg-[#F8F5E9] px-3.5 py-3 text-sm leading-relaxed text-[#25251F] outline-none transition-colors placeholder:text-[#A7A38E] focus:border-[#5F6754]"
      />

    </div>
  )
}


/* ============================================================
   SELECT
============================================================ */

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-semibold text-[#25251F]">
        {label}
        <span className="ml-1 text-[#9A625B]">
          *
        </span>
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-md border border-[#DCD6BD] bg-[#F8F5E9] px-3.5 py-3 text-sm text-[#25251F] outline-none focus:border-[#5F6754]"
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  )
}


/* ============================================================
   OPTION GROUP
============================================================ */

function OptionGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div>

      <label className="mb-3 block text-xs font-semibold text-[#25251F]">
        {label}
        <span className="ml-1 text-[#9A625B]">
          *
        </span>
      </label>

      <div className="grid gap-2 sm:grid-cols-2">

        {options.map((option) => {
          const isSelected =
            selected.includes(option)

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`
                flex
                items-center
                justify-between
                rounded-md
                border
                px-3.5
                py-3
                text-left
                text-xs
                font-medium
                transition-colors
                ${
                  isSelected
                    ? 'border-[#5F6754] bg-[#E3E6D9] text-[#4D5544]'
                    : 'border-[#DCD6BD] bg-[#F8F5E9] text-[#666457] hover:bg-[#E5E0C8]'
                }
              `}
            >

              <span>
                {option}
              </span>

              {isSelected && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5F6754] text-white">
                  <Check size={11} />
                </span>
              )}

            </button>
          )
        })}

      </div>

    </div>
  )
}