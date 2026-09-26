import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Lightbulb,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react'

interface Challenge {
  problem: string
  domain: string
}

interface Message {
  id: number
  role: 'user' | 'copilot'
  text: string
}

const CHALLENGE_KEY =
  'mentorbridge_current_challenge'

const MESSAGES_KEY =
  'mentorbridge_copilot_messages'

const suggestedQuestions = [
  'How should I approach this problem?',
  'What should I validate first?',
  'What data or information might I be missing?',
  'What should I ask an experienced mentor?',
]

const exploreTopics = [
  'Problem framing',
  'Data sources',
  'Validation',
  'Product strategy',
]

export default function KnowledgeCopilot() {
  const navigate = useNavigate()

  const [challenge, setChallenge] =
    useState<Challenge | null>(null)

  const [message, setMessage] =
    useState('')

  const [messages, setMessages] =
    useState<Message[]>([])

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  // ==========================================================
  // LOAD CHALLENGE + CONVERSATION
  // ==========================================================

  useEffect(() => {
    console.log('KnowledgeCopilot MOUNTED')

    // Load current challenge
    const storedChallenge =
      localStorage.getItem(CHALLENGE_KEY)

    if (storedChallenge) {
      try {
        const parsedChallenge =
          JSON.parse(storedChallenge) as Challenge

        setChallenge(parsedChallenge)
      } catch {
        localStorage.removeItem(CHALLENGE_KEY)
      }
    }

    // Load previous conversation
    const storedMessages =
      localStorage.getItem(MESSAGES_KEY)

    if (storedMessages) {
      try {
        const parsedMessages =
          JSON.parse(storedMessages) as Message[]

        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages)
        }
      } catch {
        localStorage.removeItem(MESSAGES_KEY)
      }
    }

    return () => {
      console.log('KnowledgeCopilot UNMOUNTED')
    }
  }, [])

  // ==========================================================
  // SHORT PROBLEM
  // ==========================================================

  const shortProblem =
    challenge?.problem &&
    challenge.problem.length > 300
      ? `${challenge.problem.slice(0, 300)}...`
      : challenge?.problem

  // ==========================================================
  // ASK COPILOT
  // ==========================================================

  const askCopilot = async () => {
    const question = message.trim()

    if (
      !question ||
      !challenge ||
      loading
    ) {
      return
    }

    setError('')
    setLoading(true)

    // --------------------------------------------------------
    // USER MESSAGE
    // --------------------------------------------------------

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: question,
    }

    const messagesAfterUser = [
      ...messages,
      userMessage,
    ]

    // Save immediately
    localStorage.setItem(
      MESSAGES_KEY,
      JSON.stringify(messagesAfterUser),
    )

    // Update UI
    setMessages(messagesAfterUser)

    // Clear input
    setMessage('')

    try {
      // ------------------------------------------------------
      // API REQUEST
      // ------------------------------------------------------

      const response = await fetch(
        'http://localhost:8000/api/copilot',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            problem: challenge.problem,
            domain: challenge.domain,
            question,
          }),
        },
      )

      const data = await response.json()

      // ------------------------------------------------------
      // ERROR RESPONSE
      // ------------------------------------------------------

      if (!response.ok) {
        throw new Error(
          data.detail ||
            'Unable to get a Copilot response.',
        )
      }

      if (
        !data.answer ||
        typeof data.answer !== 'string'
      ) {
        throw new Error(
          'Copilot returned an empty response.',
        )
      }

      // ------------------------------------------------------
      // COPILOT MESSAGE
      // ------------------------------------------------------

      const copilotMessage: Message = {
        id: Date.now() + 1,
        role: 'copilot',
        text: data.answer,
      }

      const completeConversation = [
        ...messagesAfterUser,
        copilotMessage,
      ]

      // ------------------------------------------------------
      // SAVE BEFORE STATE UPDATE
      // ------------------------------------------------------

      localStorage.setItem(
        MESSAGES_KEY,
        JSON.stringify(
          completeConversation,
        ),
      )

      console.log(
        'COPILOT RESPONSE SAVED',
        completeConversation,
      )

      // ------------------------------------------------------
      // UPDATE UI
      // ------------------------------------------------------

      setMessages(
        completeConversation,
      )

    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Something went wrong.'

      setError(errorMessage)

      console.error(
        'Knowledge Copilot error:',
        err,
      )
    } finally {
      setLoading(false)
    }
  }

  // ==========================================================
  // SUGGESTED QUESTION
  // ==========================================================

  const selectSuggestedQuestion = (
    question: string,
  ) => {
    setMessage(question)
    setError('')
  }

  // ==========================================================
  // EXPLORE TOPIC
  // ==========================================================

  const exploreTopic = (
    topic: string,
  ) => {
    if (!challenge || loading) {
      return
    }

    const topicQuestions: Record<
      string,
      string
    > = {
      'Problem framing':
        'How should I frame and break down this problem clearly?',

      'Data sources':
        'What data sources should I consider for this problem?',

      Validation:
        'How can I validate this problem before building a solution?',

      'Product strategy':
        'What product strategy considerations should I think about for this problem?',
    }

    const question =
      topicQuestions[topic] ||
      `Help me understand ${topic} in relation to my problem.`

    setMessage(question)
    setError('')
  }

  // ==========================================================
  // CLEAR CONVERSATION
  // ==========================================================

  const clearConversation = () => {
    setMessages([])

    localStorage.removeItem(
      MESSAGES_KEY,
    )

    setError('')
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-full bg-[#EDE8D0] text-[#25251F]">

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-8">

          <div className="flex items-center gap-2 text-xs text-[#858272] mb-3">
            <BookOpen size={13} />
            <span>Knowledge</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

            <div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Knowledge Copilot
              </h1>

              <p className="mt-2 text-sm text-[#666457] max-w-2xl leading-relaxed">
                Understand your problem, explore relevant knowledge,
                and prepare better questions for experienced
                professionals.
              </p>

            </div>

            <div className="inline-flex items-center gap-2 self-start lg:self-auto px-3 py-2 rounded-md bg-[#E3E6D9] text-[#5F6754] text-xs font-medium">
              <Sparkles size={14} />
              Context-aware learning
            </div>

          </div>

        </header>


        {/* =====================================================
            CURRENT CHALLENGE
        ===================================================== */}

        <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden mb-6">

          <div className="px-6 py-5 border-b border-[#DCD6BD]">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-md bg-[#E3E6D9] flex items-center justify-center">

                <Target
                  size={16}
                  className="text-[#5F6754]"
                />

              </div>

              <div>

                <p className="text-xs font-semibold">
                  Your current challenge
                </p>

                <p className="text-[11px] text-[#858272] mt-0.5">
                  Knowledge Copilot will use this context when answering.
                </p>

              </div>

            </div>

          </div>


          {challenge ? (

            <div className="p-6">

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                <div className="max-w-3xl">

                  {challenge.domain && (
                    <span className="inline-flex px-2.5 py-1 rounded-md bg-[#E3E6D9] text-[#5F6754] text-[10px] font-semibold">
                      {challenge.domain}
                    </span>
                  )}

                  <p className="mt-3 text-sm text-[#666457] leading-relaxed">
                    {shortProblem}
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      '/dashboard/find-mentor',
                    )
                  }
                  className="inline-flex items-center gap-2 shrink-0 text-xs font-semibold text-[#5F6754] hover:text-[#4D5544]"
                >
                  Change challenge
                  <ArrowRight size={13} />
                </button>

              </div>

            </div>

          ) : (

            <div className="p-6">

              <p className="text-sm text-[#666457]">
                No challenge selected yet.
              </p>

              <button
                onClick={() =>
                  navigate(
                    '/dashboard/find-mentor',
                  )
                }
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#5F6754]"
              >
                Start a problem analysis
                <ArrowRight size={14} />
              </button>

            </div>

          )}

        </section>


        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid lg:grid-cols-[1fr_310px] gap-6">

          {/* ===================================================
              COPILOT
          =================================================== */}

          <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden">

            {/* HEADER */}

            <div className="px-6 py-5 border-b border-[#DCD6BD]">

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-md bg-[#5F6754] flex items-center justify-center">

                    <MessageSquare
                      size={17}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <h2 className="text-sm font-semibold">
                      Ask Knowledge Copilot
                    </h2>

                    <p className="text-xs text-[#858272] mt-0.5">
                      Ask questions related to your challenge.
                    </p>

                  </div>

                </div>

                {messages.length > 0 && (
                  <button
                    onClick={
                      clearConversation
                    }
                    className="text-[11px] font-medium text-[#858272] hover:text-[#9A625B]"
                  >
                    Clear
                  </button>
                )}

              </div>

            </div>


            {/* =================================================
                CONVERSATION
            ================================================= */}

            <div className="min-h-[330px] max-h-[520px] overflow-y-auto px-6 py-6">

              {messages.length === 0 ? (

                <div className="max-w-md mx-auto text-center">

                  <div className="mx-auto w-12 h-12 rounded-full bg-[#E3E6D9] flex items-center justify-center">

                    <Lightbulb
                      size={20}
                      className="text-[#5F6754]"
                    />

                  </div>

                  <h3 className="mt-5 text-sm font-semibold">
                    Start with a question
                  </h3>

                  <p className="mt-2 text-xs text-[#858272] leading-relaxed">
                    Ask about your current challenge, explore
                    relevant concepts, or prepare questions for
                    your mentor.
                  </p>

                </div>

              ) : (

                <div className="space-y-5">

                  {messages.map(
                    (item) => (

                      <div
                        key={item.id}
                        className={
                          item.role === 'user'
                            ? 'flex justify-end'
                            : 'flex justify-start'
                        }
                      >

                        <div
                          className={`
                            max-w-[85%]
                            rounded-lg
                            px-4
                            py-3
                            text-sm
                            leading-relaxed
                            whitespace-pre-wrap
                            ${
                              item.role === 'user'
                                ? 'bg-[#5F6754] text-white'
                                : 'bg-[#EDE8D0] text-[#25251F]'
                            }
                          `}
                        >

                          <div className="text-[9px] uppercase tracking-[0.12em] opacity-60 mb-1.5">
                            {item.role === 'user'
                              ? 'You'
                              : 'Knowledge Copilot'}
                          </div>

                          {item.text}

                        </div>

                      </div>

                    ),
                  )}


                  {loading && (

                    <div className="flex justify-start">

                      <div className="bg-[#EDE8D0] rounded-lg px-4 py-3">

                        <div className="text-[9px] uppercase tracking-[0.12em] text-[#858272] mb-2">
                          Knowledge Copilot
                        </div>

                        <div className="flex gap-1">

                          <span className="w-1.5 h-1.5 rounded-full bg-[#858272] animate-pulse" />

                          <span className="w-1.5 h-1.5 rounded-full bg-[#858272] animate-pulse [animation-delay:150ms]" />

                          <span className="w-1.5 h-1.5 rounded-full bg-[#858272] animate-pulse [animation-delay:300ms]" />

                        </div>

                      </div>

                    </div>

                  )}

                </div>

              )}


              {/* SUGGESTED QUESTIONS */}

              {messages.length === 0 && (

                <div className="mt-8">

                  <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#A7A38E] mb-3">
                    Suggested questions
                  </p>

                  <div className="grid sm:grid-cols-2 gap-2">

                    {suggestedQuestions.map(
                      (question) => (

                        <button
                          key={question}
                          onClick={() =>
                            selectSuggestedQuestion(
                              question,
                            )
                          }
                          disabled={!challenge}
                          className="
                            text-left
                            px-4
                            py-3
                            rounded-md
                            border
                            border-[#DCD6BD]
                            bg-[#EDE8D0]/50
                            hover:bg-[#E3E6D9]
                            text-xs
                            text-[#666457]
                            hover:text-[#25251F]
                            disabled:opacity-50
                            transition-colors
                          "
                        >
                          {question}
                        </button>

                      ),
                    )}

                  </div>

                </div>

              )}

            </div>


            {/* ERROR */}

            {error && (

              <div className="mx-4 mb-3 px-4 py-3 rounded-md bg-[#F3E6E3] border border-[#E2C8C3] text-xs text-[#9A625B]">
                {error}
              </div>

            )}


            {/* INPUT */}

            <div className="p-4 border-t border-[#DCD6BD] bg-[#EDE8D0]/40">

              <div className="flex items-end gap-2">

                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value,
                    )
                  }
                  onKeyDown={(event) => {

                    if (
                      event.key === 'Enter' &&
                      !event.shiftKey
                    ) {
                      event.preventDefault()
                      askCopilot()
                    }

                  }}
                  placeholder={
                    challenge
                      ? 'Ask something about your challenge...'
                      : 'Start a challenge analysis first...'
                  }
                  disabled={
                    !challenge ||
                    loading
                  }
                  rows={2}
                  className="
                    flex-1
                    resize-none
                    bg-[#F8F5E9]
                    border
                    border-[#DCD6BD]
                    rounded-md
                    px-4
                    py-3
                    text-sm
                    text-[#25251F]
                    placeholder:text-[#A7A38E]
                    outline-none
                    focus:border-[#9AA18B]
                    disabled:opacity-60
                  "
                />

                <button
                  onClick={askCopilot}
                  disabled={
                    !challenge ||
                    !message.trim() ||
                    loading
                  }
                  className="
                    w-10
                    h-10
                    rounded-md
                    flex
                    items-center
                    justify-center
                    bg-[#5F6754]
                    hover:bg-[#4D5544]
                    disabled:bg-[#DCD6BD]
                    disabled:text-[#A7A38E]
                    text-white
                    transition-colors
                    shrink-0
                  "
                  aria-label="Send question"
                >
                  <Send size={15} />
                </button>

              </div>

              <p className="mt-2 text-[10px] text-[#A7A38E]">
                Press Enter to ask. Shift + Enter for a new line.
              </p>

            </div>

          </section>


          {/* ===================================================
              RIGHT PANEL
          =================================================== */}

          <div className="space-y-6">

            {/* EXPLORE */}

            <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg overflow-hidden">

              <div className="px-5 py-4 border-b border-[#DCD6BD]">

                <div className="flex items-center gap-2">

                  <Compass
                    size={15}
                    className="text-[#5F6754]"
                  />

                  <h2 className="text-sm font-semibold">
                    Explore
                  </h2>

                </div>

                <p className="mt-1 text-[11px] text-[#858272]">
                  Topics related to your problem.
                </p>

              </div>

              <div className="p-4 space-y-2">

                {exploreTopics.map(
                  (topic) => (

                    <button
                      key={topic}
                      onClick={() =>
                        exploreTopic(topic)
                      }
                      disabled={
                        !challenge ||
                        loading
                      }
                      className="
                        w-full
                        flex
                        items-center
                        justify-between
                        px-3
                        py-3
                        rounded-md
                        text-left
                        text-xs
                        text-[#666457]
                        hover:text-[#25251F]
                        hover:bg-[#E3E6D9]
                        disabled:opacity-50
                        transition-colors
                      "
                    >

                      <span>
                        {topic}
                      </span>

                      <ArrowRight
                        size={13}
                      />

                    </button>

                  ),
                )}

              </div>

            </section>


            {/* PREPARE FOR MENTOR */}

            <section className="bg-[#5F6754] rounded-lg overflow-hidden text-white">

              <div className="p-5">

                <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center">

                  <UserRound size={17} />

                </div>

                <h2 className="mt-5 text-sm font-semibold">
                  Prepare for your mentor
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  Turn what you've learned into focused questions
                  and discussion points for your mentor conversation.
                </p>

                <button
                  disabled={!challenge}
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-md
                    bg-[#F8F5E9]
                    text-[#4D5544]
                    text-xs
                    font-semibold
                    hover:bg-white
                    disabled:opacity-50
                    transition-colors
                  "
                >
                  Prepare for Mentor
                  <ArrowRight
                    size={14}
                  />
                </button>

              </div>

            </section>


            {/* WHAT YOU CAN DO */}

            <section className="bg-[#F8F5E9] border border-[#DCD6BD] rounded-lg p-5">

              <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#A7A38E]">
                What you can do
              </p>

              <div className="mt-4 space-y-3">

                <div className="flex gap-3">

                  <CheckCircle2
                    size={15}
                    className="text-[#5F6754] shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-[#666457]">
                    Understand the key areas of your problem.
                  </p>

                </div>

                <div className="flex gap-3">

                  <CheckCircle2
                    size={15}
                    className="text-[#5F6754] shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-[#666457]">
                    Explore concepts before talking to a mentor.
                  </p>

                </div>

                <div className="flex gap-3">

                  <CheckCircle2
                    size={15}
                    className="text-[#5F6754] shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-[#666457]">
                    Prepare focused questions for your conversation.
                  </p>

                </div>

              </div>

            </section>

          </div>

        </div>


        {/* =====================================================
            TRUST NOTICE
        ===================================================== */}

        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#858272]">

          <ShieldCheck size={12} />

          <span>
            AI guidance is contextual and does not replace
            professional decision-making.
          </span>

        </div>

      </div>

    </div>
  )
}