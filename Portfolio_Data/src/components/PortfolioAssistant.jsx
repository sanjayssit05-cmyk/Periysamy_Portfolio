import { useEffect, useRef, useState } from 'react'
import { FiCpu, FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import { projects, skills } from '../data/portfolio.js'

const suggestions = ['What skills does he have?', 'Show me projects', 'How can I contact him?']

function answerQuestion(question) {
  const text = question.toLowerCase()

  if (/skill|tool|excel|sql|python|power.?bi|tableau|திறமை/.test(text)) {
    return `Periyasamy's toolkit includes ${skills.map((skill) => skill.name).join(', ')}, along with data cleaning, analysis, and visualization.`
  }
  if (/project|work|portfolio|dashboard|செயல்/.test(text)) {
    return `There are ${projects.length} sample projects: ${projects.map((project) => project.title).join('; ')}. The dashboard uses clearly labelled illustrative data and includes interactive revenue, orders, and customer charts.`
  }
  if (/contact|whatsapp|phone|reach|message|தொடர்பு/.test(text)) {
    return 'Periyasamy is based in Dindigul, Tamil Nadu. You can message him on WhatsApp at +91 90258 72798, use the contact form, or visit his LinkedIn and Instagram profiles.'
  }
  if (/fresher|experience|job|opportunit|career|வேலை/.test(text)) {
    return 'Periyasamy is a fresher looking for his first data analyst opportunity. The portfolio highlights project practice and a learning roadmap, without claiming unverified work experience.'
  }
  if (/education|degree|college|certif|படிப்பு/.test(text)) {
    return 'Education details are kept as an editable placeholder until verified information is added. Excel, SQL, Power BI, Python, and Tableau are listed as learning goals, not completed certifications.'
  }
  if (/location|city|where|dindigul|ஊர்/.test(text)) {
    return 'Periyasamy is based in Dindigul, Tamil Nadu, India.'
  }
  if (/resume|cv|download/.test(text)) {
    return 'Use the Download resume button near the top of the page. It generates an editable starter PDF; replace its placeholder details with verified information.'
  }

  return 'I can help with Periyasamy’s skills, sample projects, fresher profile, education placeholders, resume, or contact details. Try one of the suggested questions below.'
}

function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      from: 'assistant',
      text: 'Hi! I’m Periyasamy’s portfolio assistant. Ask me about his skills, projects, fresher profile, or how to get in touch.',
    },
  ])
  const transcriptRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' })
    inputRef.current?.focus()
  }, [isOpen, messages])

  useEffect(() => {
    if (!isOpen) return undefined
    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  async function sendMessage(value = question) {
    const userQuestion = value.trim()
    if (!userQuestion || isSending) return

    const messageId = `${Date.now()}-${messages.length}`
    setMessages((currentMessages) => [...currentMessages, { id: `${messageId}-user`, from: 'user', text: userQuestion }])
    setQuestion('')
    setIsSending(true)

    try {
      const history = messages
        .filter((message) => message.id !== 'welcome' && !message.fallback)
        .slice(-8)
        .map((message) => ({
          role: message.from === 'assistant' ? 'model' : 'user',
          text: message.text,
        }))
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion, messages: history }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'The AI service is unavailable.')

      setMessages((currentMessages) => [
        ...currentMessages,
        { id: `${messageId}-assistant`, from: 'assistant', text: result.answer },
      ])
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `${messageId}-assistant`,
          from: 'assistant',
          text: answerQuestion(userQuestion),
          fallback: true,
          fallbackMessage: error instanceof Error ? error.message : 'Live AI is unavailable.',
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <aside className={`assistant-widget${isOpen ? ' assistant-widget-open' : ''}`}>
      {isOpen && (
        <section className="assistant-panel" role="dialog" aria-modal="false" aria-labelledby="assistant-title">
          <header className="assistant-header">
            <span className="assistant-avatar"><FiCpu /></span>
            <span className="assistant-heading-copy">
              <strong id="assistant-title">Portfolio assistant</strong>
              <small><i /> Gemini AI · portfolio assistant</small>
            </span>
            <button className="assistant-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant">
              <FiX />
            </button>
          </header>
          <div className="assistant-transcript" ref={transcriptRef} aria-live="polite">
            <p className="assistant-notice">Questions go to Google Gemini when configured. Vite-only development uses portfolio facts as a local fallback.</p>
            {messages.map((message) => (
              <div className={`assistant-message assistant-message-${message.from}`} key={message.id}>
                {message.text}
                {message.fallback && <small className="assistant-fallback-note">Local portfolio answer · {message.fallbackMessage}</small>}
              </div>
            ))}
            {isSending && <div className="assistant-message assistant-message-assistant assistant-typing" role="status">Thinking<span>...</span></div>}
            {messages.length === 1 && (
              <div className="assistant-suggestions">
                {suggestions.map((suggestion) => (
                  <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)} disabled={isSending}>{suggestion}</button>
                ))}
              </div>
            )}
          </div>
          <form
            className="assistant-composer"
            onSubmit={(event) => {
              event.preventDefault()
              sendMessage()
            }}
          >
            <label className="sr-only" htmlFor="assistant-question">Ask about this portfolio</label>
            <input
              id="assistant-question"
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about this portfolio..."
              maxLength={240}
            />
            <button type="submit" disabled={!question.trim() || isSending} aria-label="Send question"><FiSend /></button>
          </form>
        </section>
      )}
      <button
        className="assistant-launcher"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio AI assistant'}
        title={isOpen ? 'Close portfolio assistant' : 'Open portfolio AI assistant'}
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </button>
    </aside>
  )
}

export default PortfolioAssistant