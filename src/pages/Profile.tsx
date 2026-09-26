import { useState } from 'react'
import {
  UserRound,
  Mail,
  GraduationCap,
  Code2,
  MapPin,
  Pencil,
  Check,
  X,
  ShieldCheck,
} from 'lucide-react'

export default function Profile() {
  const [editing, setEditing] = useState(false)

  const [name, setName] = useState('Godasi Praneeth Kumar')
  const [email, setEmail] = useState('praneethgodasi@gmail.com')
  const [role, setRole] = useState('Data Science Student')
  const [college, setCollege] = useState(
    'AVN Institute of Engineering & Technology',
  )
  const [location, setLocation] = useState('Hyderabad, India')

  const [skills, setSkills] = useState([
    'Python',
    'SQL',
    'Data Science',
    'Machine Learning',
    'React',
    'FastAPI',
  ])

  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    const skill = newSkill.trim()

    if (!skill || skills.includes(skill)) {
      return
    }

    setSkills((current) => [...current, skill])
    setNewSkill('')
  }

  const removeSkill = (skill: string) => {
    setSkills((current) =>
      current.filter((item) => item !== skill),
    )
  }

  return (
    <div className="min-h-full bg-[#EDE8D0] text-[#25251F]">

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-10">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">

          <div>
            <p className="text-xs text-[#858272] mb-2">
              Account
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Profile
            </h1>

            <p className="mt-2 text-sm text-[#666457]">
              Manage your personal and professional information.
            </p>
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-md
                bg-[#5F6754]
                hover:bg-[#4D5544]
                text-white
                text-xs
                font-semibold
                transition-colors
              "
            >
              <Pencil size={14} />
              Edit profile
            </button>
          ) : (
            <div className="flex gap-2">

              <button
                onClick={() => setEditing(false)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-md
                  border
                  border-[#DCD6BD]
                  bg-[#F8F5E9]
                  text-[#666457]
                  text-xs
                  font-semibold
                  hover:bg-[#E5E0C8]
                "
              >
                <X size={14} />
                Cancel
              </button>

              <button
                onClick={() => setEditing(false)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-md
                  bg-[#5F6754]
                  hover:bg-[#4D5544]
                  text-white
                  text-xs
                  font-semibold
                "
              >
                <Check size={14} />
                Save changes
              </button>

            </div>
          )}

        </div>


        {/* PROFILE HEADER CARD */}

        <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden mb-6">

          <div className="p-6 sm:p-7">

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              <div className="
                w-20
                h-20
                rounded-full
                bg-[#5F6754]
                flex
                items-center
                justify-center
                text-white
                text-2xl
                font-semibold
                shrink-0
              ">
                GK
              </div>

              <div className="flex-1">

                <h2 className="text-xl font-semibold">
                  {name}
                </h2>

                <p className="mt-1 text-sm text-[#666457]">
                  {role}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">

                  <div className="flex items-center gap-1.5 text-xs text-[#858272]">
                    <MapPin size={13} />
                    {location}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#858272]">
                    <Mail size={13} />
                    {email}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* PERSONAL INFORMATION */}

        <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden mb-6">

          <div className="px-6 py-5 border-b border-[#DCD6BD]">

            <h2 className="text-sm font-semibold">
              Personal information
            </h2>

            <p className="mt-1 text-[11px] text-[#858272]">
              Basic information used across your MENTORBRIDGE profile.
            </p>

          </div>

          <div className="p-6 grid sm:grid-cols-2 gap-5">

            <Field
              label="Full name"
              value={name}
              editing={editing}
              onChange={setName}
              icon={<UserRound size={15} />}
            />

            <Field
              label="Email address"
              value={email}
              editing={editing}
              onChange={setEmail}
              icon={<Mail size={15} />}
              type="email"
            />

            <Field
              label="Role"
              value={role}
              editing={editing}
              onChange={setRole}
              icon={<UserRound size={15} />}
            />

            <Field
              label="Location"
              value={location}
              editing={editing}
              onChange={setLocation}
              icon={<MapPin size={15} />}
            />

          </div>

        </section>


        {/* EDUCATION */}

        <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden mb-6">

          <div className="px-6 py-5 border-b border-[#DCD6BD]">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                <GraduationCap
                  size={16}
                  className="text-[#5F6754]"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Education
                </h2>

                <p className="mt-1 text-[11px] text-[#858272]">
                  Your academic background.
                </p>
              </div>

            </div>

          </div>

          <div className="p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <p className="text-sm font-semibold">
                  B.Tech — Computer Science & Data Science
                </p>

                <p className="mt-1 text-xs text-[#666457]">
                  {college}
                </p>

                <p className="mt-1 text-[11px] text-[#858272]">
                  Expected graduation: May 2028
                </p>

              </div>

              <div className="px-3 py-2 rounded-md bg-[#E3E6D9] text-[#5F6754] text-xs font-semibold">
                Data Science
              </div>

            </div>

          </div>

        </section>


        {/* SKILLS */}

        <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden mb-6">

          <div className="px-6 py-5 border-b border-[#DCD6BD]">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-md bg-[#E3E6D9] flex items-center justify-center">
                <Code2
                  size={16}
                  className="text-[#5F6754]"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Skills & expertise
                </h2>

                <p className="mt-1 text-[11px] text-[#858272]">
                  Skills used for experience matching.
                </p>
              </div>

            </div>

          </div>

          <div className="p-6">

            <div className="flex flex-wrap gap-2">

              {skills.map((skill) => (

                <div
                  key={skill}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-md
                    bg-[#E3E6D9]
                    text-[#5F6754]
                    text-xs
                    font-medium
                  "
                >
                  {skill}

                  {editing && (
                    <button
                      onClick={() =>
                        removeSkill(skill)
                      }
                      className="hover:text-[#9A625B]"
                      aria-label={`Remove ${skill}`}
                    >
                      <X size={12} />
                    </button>
                  )}

                </div>

              ))}

            </div>

            {editing && (

              <div className="mt-5 flex gap-2 max-w-md">

                <input
                  value={newSkill}
                  onChange={(event) =>
                    setNewSkill(
                      event.target.value,
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      addSkill()
                    }
                  }}
                  placeholder="Add a skill"
                  className="
                    flex-1
                    bg-[#EDE8D0]
                    border
                    border-[#DCD6BD]
                    rounded-md
                    px-3
                    py-2.5
                    text-xs
                    outline-none
                    focus:border-[#9AA18B]
                  "
                />

                <button
                  onClick={addSkill}
                  className="
                    px-4
                    rounded-md
                    bg-[#5F6754]
                    text-white
                    text-xs
                    font-semibold
                  "
                >
                  Add
                </button>

              </div>

            )}

          </div>

        </section>


        {/* TRUST */}

        <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg p-5">

          <div className="flex gap-3">

            <ShieldCheck
              size={17}
              className="text-[#5F6754] shrink-0 mt-0.5"
            />

            <div>

              <p className="text-xs font-semibold">
                Profile privacy
              </p>

              <p className="mt-1 text-[11px] text-[#858272] leading-relaxed">
                Your profile information is used to personalize
                your MENTORBRIDGE experience and improve mentor
                matching. You control what information you provide.
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  )
}


/* ============================================================
   FIELD COMPONENT
============================================================ */

interface FieldProps {
  label: string
  value: string
  editing: boolean
  onChange: (value: string) => void
  icon: React.ReactNode
  type?: string
}

function Field({
  label,
  value,
  editing,
  onChange,
  icon,
  type = 'text',
}: FieldProps) {
  return (
    <div>

      <label className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#A7A38E]">
        {label}
      </label>

      {editing ? (

        <div className="relative mt-2">

          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858272]">
            {icon}
          </div>

          <input
            type={type}
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            className="
              w-full
              bg-[#EDE8D0]
              border
              border-[#DCD6BD]
              rounded-md
              pl-10
              pr-3
              py-3
              text-sm
              text-[#25251F]
              outline-none
              focus:border-[#9AA18B]
            "
          />

        </div>

      ) : (

        <div className="mt-2 flex items-center gap-2 px-3 py-3 rounded-md bg-[#EDE8D0]/60">

          <span className="text-[#858272]">
            {icon}
          </span>

          <span className="text-sm text-[#25251F]">
            {value}
          </span>

        </div>

      )}

    </div>
  )
}