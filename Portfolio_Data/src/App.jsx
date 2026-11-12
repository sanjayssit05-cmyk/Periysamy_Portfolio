import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiArrowDown,
  FiArrowUp,
  FiArrowUpRight,
  FiAward,
  FiBriefcase,
  FiCheck,
  FiDownload,
  FiLinkedin,
  FiMessageCircle,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContactForm from './components/ContactForm.jsx'
import PortfolioAssistant from './components/PortfolioAssistant.jsx'
import ProjectCard from './components/ProjectCard.jsx'
import SectionHeading from './components/SectionHeading.jsx'
import {
  certifications,
  education,
  navigation,
  projects,
  skills,
  socialLinks,
  whatsappUrl,
} from './data/portfolio.js'
import { createResumePdf, iconForProject, iconForSkill } from './utils/helpers.js'
import './Portfolio.css'

const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard.jsx'))
const filters = ['All projects', 'Business intelligence', 'Data analytics', 'Finance', 'Visualization']
const typingPhrases = ['insightful dashboards.', 'cleaner data workflows.', 'clearer business answers.']

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    let animationFrame
    let startedAt
    let hasAnimated = false
    const duration = 1400

    function animate(timestamp) {
      if (startedAt === undefined) startedAt = timestamp
      const progress = Math.min((timestamp - startedAt) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setCount(Math.round(value * easedProgress))
      if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated) return
      hasAnimated = true
      animationFrame = window.requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: 0.4 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [value])

  return <span ref={elementRef}>{count}</span>
}

function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="A. Periyasamy home">
          <span className="brand-mark">A<span>.</span></span>
          <span className="brand-copy">PERIYASAMY<small>DATA ANALYST</small></span>
        </a>
        <button
          type="button"
          className="icon-button menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={`main-nav${menuOpen ? ' main-nav-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Contact <FiArrowUpRight /></a>
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="icon-button theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'violet' ? 'blue' : 'dark violet'} theme`}
          >
            {theme === 'violet' ? <FiSun /> : <FiMoon />}
          </button>
          <a className="header-cta" href="#contact">Let&apos;s talk <FiArrowUpRight /></a>
        </div>
      </div>
    </header>
  )
}

function Hero({ onDownloadResume, typingText }) {
  const [typedName, setTypedName] = useState('')
  const fullName = 'A. Periyasamy'

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedName(fullName)
      return undefined
    }

    let characterIndex = 0
    const startTimer = window.setTimeout(() => {
      const typingTimer = window.setInterval(() => {
        characterIndex += 1
        setTypedName(fullName.slice(0, characterIndex))
        if (characterIndex >= fullName.length) window.clearInterval(typingTimer)
      }, 38)
    }, 70)

    return () => window.clearTimeout(startTimer)
  }, [])

  return (
    <section className="hero-section section-shell" id="home">
      <div className="hero-copy">
        <span className="hero-status"><i /> FRESHER · OPEN TO FIRST OPPORTUNITY</span>
        <p className="hero-kicker">Hello, I&apos;m</p>
        <h1 aria-label={fullName}><span className="hero-name-gradient">{typedName}</span>{typedName.length < fullName.length && <i className="hero-name-cursor" aria-hidden="true" />}</h1>
        <h2>Data Analyst <span className="hero-divider">/</span> <span className="typing-text">{typingText}<i className="typing-cursor" /></span></h2>
        <a className="hero-location" href="https://maps.google.com/?q=Dindigul%2C+Tamil+Nadu" target="_blank" rel="noreferrer"><FiMapPin /> Dindigul, Tamil Nadu <FiArrowUpRight /></a>
        <p className="hero-description">
          I turn complex data into clear, confident decisions. Exploring the story behind the numbers with thoughtful analysis and purposeful visualisation.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">Explore my work <FiArrowUpRight /></a>
          <button className="button button-secondary" type="button" onClick={onDownloadResume}><FiDownload /> Download resume</button>
        </div>
        <div className="hero-socials">
          <span>CONNECT</span>
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><FiLinkedin /></a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram profile"><FaInstagram /></a>
          <span className="social-note">LinkedIn · Instagram</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <div className="visual-glow" />
        <div className="profile-card">
          <div className="profile-card-header"><span>ANALYST PROFILE</span><span className="profile-live"><i /> AVAILABLE</span></div>
          <div className="profile-main">
            <div className="profile-avatar" role="img" aria-label="Initials AP - replace with a professional portrait">
              <span>AP</span><i><FiCheck /></i>
            </div>
            <div><h3>A. Periyasamy</h3><p>Data Analyst</p></div>
          </div>
          <div className="profile-divider" />
          <div className="profile-chart-heading"><span>DATA, MADE USEFUL</span><FiArrowUpRight /></div>
          <div className="hero-mini-chart" aria-hidden="true">
            <svg viewBox="0 0 340 96" role="presentation">
              <path className="mini-chart-grid" d="M0 20H340M0 48H340M0 76H340" />
              <path className="mini-chart-area" d="M0 78 C28 75 29 62 57 65 S93 57 113 62 S150 35 174 45 S208 49 226 30 S266 38 282 22 S315 27 340 7 V96 H0Z" />
              <path className="mini-chart-line" d="M0 78 C28 75 29 62 57 65 S93 57 113 62 S150 35 174 45 S208 49 226 30 S266 38 282 22 S315 27 340 7" />
              <circle cx="340" cy="7" r="4" />
            </svg>
          </div>
          <div className="profile-card-footer"><span><i /> SQL</span><span><i /> POWER BI</span><span><i /> PYTHON</span></div>
        </div>
        <div className="floating-stat floating-stat-top"><span className="floating-stat-icon"><FiArrowUpRight /></span><span><strong>DATA-DRIVEN</strong><small>Curiosity to clarity</small></span></div>
        <div className="floating-stat floating-stat-bottom"><span className="floating-stat-icon"><FiBriefcase /></span><span><strong>6 PROJECTS</strong><small>Ready to explore</small></span></div>
      </div>
      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><FiArrowDown /></a>
    </section>
  )
}

function AboutSection() {
  const highlights = [
    { number: 6, suffix: '', label: 'Sample portfolio projects' },
    { number: 5, suffix: '+', label: 'Analytics tools explored' },
    { number: 100, suffix: '%', label: 'Curious about the why' },
  ]

  return (
    <section className="about-section section-shell section-space" id="about">
      <div className="about-copy">
        <SectionHeading eyebrow="A little about me" title="Curious by nature.<br />Analytical by design." />
        <p className="about-lead">I&apos;m a fresher and aspiring data analyst who enjoys finding the signal in the noise.</p>
        <p className="about-body">From preparing data to presenting the story behind it, I&apos;m interested in every step that makes analysis more useful. My toolkit spans Excel, SQL, Power BI, Python, and Tableau, with a focus on asking better questions and communicating insights clearly.</p>
        <p className="about-body">I&apos;m interested in applying thoughtful, evidence-led analysis to help teams understand what&apos;s happening and decide what to do next. This portfolio is a growing collection of sample work; project metrics and profile placeholders are clearly labelled for easy replacement.</p>
        <a className="text-link" href="#journey">More about my journey <FiArrowUpRight /></a>
      </div>
      <div className="about-side">
        <div className="about-principle">
          <span className="principle-number">01</span>
          <div><h3>Start with the question</h3><p>Good analysis begins with understanding what decision the data should support.</p></div>
        </div>
        <div className="about-principle">
          <span className="principle-number">02</span>
          <div><h3>Make data trustworthy</h3><p>Clean, explore, and validate before turning data into conclusions.</p></div>
        </div>
        <div className="about-principle">
          <span className="principle-number">03</span>
          <div><h3>Tell a clear story</h3><p>Present findings with context so people can act with confidence.</p></div>
        </div>
        <div className="about-stats">
          {highlights.map((item) => (
            <div key={item.label}><strong><AnimatedNumber value={item.number} />{item.suffix}</strong><span>{item.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section className="skills-section section-space" id="skills">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Tools of the trade"
          title="A practical toolkit for<br />better decisions."
          description="The tools I use to explore data, build useful dashboards, and communicate what matters."
        />
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.article
              className="skill-card"
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className={`skill-icon skill-icon-${skill.icon}`}>{iconForSkill(skill.icon)}</div>
              <div className="skill-card-top"><span>{skill.category}</span><FiArrowUpRight /></div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection({ onDetails }) {
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const [query, setQuery] = useState('')
  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesFilter = activeFilter === filters[0] || project.category === activeFilter
    const text = `${project.title} ${project.description} ${project.tools.join(' ')}`.toLowerCase()
    return matchesFilter && text.includes(query.trim().toLowerCase())
  }), [activeFilter, query])

  return (
    <section className="projects-section section-shell section-space" id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Ideas, translated<br />into insight."
        description="A selection of data project concepts across analytics, reporting, and business intelligence."
      />
      <div className="projects-toolbar">
        <div className="project-filters" aria-label="Filter projects by category">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? 'filter-chip filter-chip-active' : 'filter-chip'}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              {filter === filters[0] && <span>{projects.length}</span>}
            </button>
          ))}
        </div>
        <label className="project-search">
          <span className="sr-only">Search projects</span>
          <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" />
        </label>
      </div>
      {visibleProjects.length > 0 ? (
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div key={project.title} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}>
                <ProjectCard project={project} index={projects.indexOf(project)} onDetails={onDetails} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="empty-projects"><p>No projects match that search.</p><button className="text-link" type="button" onClick={() => { setQuery(''); setActiveFilter(filters[0]) }}>Clear filters <FiArrowUpRight /></button></div>
      )}
      <p className="sample-note"><FiAward /> These are editable project examples. Replace descriptions and add verified repository or live-demo URLs before sharing.</p>
    </section>
  )
}

function TimelineCard({ item, icon }) {
  const Icon = icon
  return (
    <article className={`timeline-card${item.placeholder ? ' timeline-placeholder' : ''}`}>
      <span className="timeline-icon"><Icon /></span>
      <div className="timeline-card-content">
        <div className="timeline-card-meta"><span>{item.date}</span>{item.placeholder && <span className="placeholder-badge">PLACEHOLDER</span>}</div>
        <h3>{item.title}</h3>
        <p className="timeline-organization">{item.organization}</p>
        <p>{item.description}</p>
      </div>
    </article>
  )
}

function JourneySection() {
  return (
    <section className="journey-section section-space" id="journey">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Starting with curiosity"
          title="A fresher. A growing<br />data story."
          description="Building a foundation through focused learning and hands-on sample projects. Ready to grow with a team and take on my first data analyst opportunity."
        />
        <div className="fresher-grid">
          <article className="fresher-profile-card">
            <div className="fresher-card-top">
              <span className="fresher-mark"><FiArrowUpRight /></span>
              <span className="fresher-badge"><i /> ENTRY-LEVEL · FRESHER</span>
            </div>
            <h3>Ready to turn<br />learning into impact.</h3>
            <p>Looking for a first opportunity to learn from real business questions, contribute with data, and keep growing as an analyst.</p>
            <div className="fresher-strengths">
              <span><FiCheck /> Curious problem solver</span>
              <span><FiCheck /> Hands-on project practice</span>
              <span><FiCheck /> Open to feedback &amp; learning</span>
            </div>
            <a className="fresher-contact-link" href="#contact">Let&apos;s start a conversation <FiArrowUpRight /></a>
          </article>
          <div className="fresher-education">
            <div className="journey-block-heading">
              <span className="journey-index">01</span>
              <div><span className="eyebrow">Academic background</span><h3>Education</h3></div>
            </div>
            <div className="timeline-list">{education.map((item) => <TimelineCard key={item.title} item={item} icon={FiAward} />)}</div>
            <div className="journey-block-heading roadmap-heading">
              <span className="journey-index">02</span>
              <div><span className="eyebrow">The way forward</span><h3>My growth roadmap</h3></div>
            </div>
            <div className="growth-roadmap">
              <article><span className="roadmap-dot" /><div><strong>Learn the fundamentals</strong><p>Build a strong base in analysis, SQL, spreadsheets, and visualization.</p></div></article>
              <article><span className="roadmap-dot" /><div><strong>Practice with projects</strong><p>Turn sample datasets into clear, well-explained portfolio work.</p></div></article>
              <article><span className="roadmap-dot roadmap-dot-current" /><div><strong>Grow in my first role</strong><p>Bring curiosity, care, and a learner&apos;s mindset to a real team.</p></div></article>
            </div>
          </div>
        </div>
        <div className="certifications">
          <div className="certifications-heading"><div><span className="eyebrow">Keep learning</span><h3>Certification goals</h3></div><span className="certification-edit-note">Learning interests · not completed certificates</span></div>
          <div className="certification-list">
            {certifications.map((certification) => (
              <article className="certification-card" key={certification.name}>
                <span className="certification-icon"><FiAward /></span>
                <span><strong>{certification.name}</strong><small>{certification.issuer}</small></span>
                <span className="certification-status">{certification.status}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main section-shell">
        <div className="footer-brand">
          <a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span className="brand-copy">PERIYASAMY<small>DATA ANALYST</small></span></a>
          <p>Making data easier to understand,<br />one question at a time.</p>
        </div>
        <div className="footer-nav"><span>EXPLORE</span>{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}<a href="#contact">Contact</a></div>
        <div className="footer-connect"><span>LET&apos;S CONNECT</span><a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn <FiArrowUpRight /></a><a href={socialLinks.instagram} target="_blank" rel="noreferrer"><FaInstagram /> Instagram <FiArrowUpRight /></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><FiMessageCircle /> WhatsApp <FiArrowUpRight /></a></div>
      </div>
      <div className="footer-bottom section-shell"><span>© {new Date().getFullYear()} A. Periyasamy. All rights reserved.</span><span>Built with curiosity and React.</span><a href="#home">Back to top <FiArrowUp /></a></div>
    </footer>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined
    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" role="presentation" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()} initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }}>
            <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close project details"><FiX /></button>
            <span className="eyebrow">{project.category}</span>
            <h2 id="modal-title">{project.title}</h2>
            <p>{project.detail}</p>
            <div className="tag-list">{project.tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
            <a className="button button-primary" href="#dashboard" onClick={onClose}>Explore the sample dashboard <FiArrowUpRight /></a>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NotFound() {
  return (
    <main className="not-found">
      <span className="not-found-code">404</span>
      <h1>This page is off the charts.</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the data.</p>
      <Link className="button button-primary" to="/">Back to portfolio <FiArrowUpRight /></Link>
    </main>
  )
}

function PortfolioHome() {
  const [theme, setTheme] = useState('violet')
  const [typingText, setTypingText] = useState('')
  const [activeProject, setActiveProject] = useState(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    let phraseIndex = 0
    let characterIndex = 0
    let deleting = false
    let timer

    function typeNext() {
      const phrase = typingPhrases[phraseIndex]
      characterIndex += deleting ? -1 : 1
      setTypingText(phrase.slice(0, characterIndex))

      let delay = deleting ? 38 : 82
      if (!deleting && characterIndex === phrase.length) {
        deleting = true
        delay = 1450
      } else if (deleting && characterIndex === 0) {
        deleting = false
        phraseIndex = (phraseIndex + 1) % typingPhrases.length
        delay = 320
      }
      timer = window.setTimeout(typeNext, delay)
    }

    timer = window.setTimeout(typeNext, 350)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    function updateScrollButton() {
      setShowBackToTop(window.scrollY > 560)
    }
    window.addEventListener('scroll', updateScrollButton, { passive: true })
    updateScrollButton()
    return () => window.removeEventListener('scroll', updateScrollButton)
  }, [])

  function downloadResume() {
    const resumeUrl = URL.createObjectURL(createResumePdf())
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'A-Periyasamy-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(resumeUrl), 1000)
  }

  return (
    <div className="portfolio-app">
      <Header theme={theme} onToggleTheme={() => setTheme((current) => current === 'violet' ? 'blue' : 'violet')} />
      <main>
        <Hero onDownloadResume={downloadResume} typingText={typingText} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onDetails={setActiveProject} />
        <Suspense fallback={<div className="dashboard-loading section-shell">Loading interactive dashboard...</div>}>
          <AnalyticsDashboard />
        </Suspense>
        <JourneySection />
        <section className="contact-section section-shell section-space" id="contact">
          <ContactForm />
        </section>
      </main>
      <Footer />
      <PortfolioAssistant />
      {showBackToTop && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><FiArrowUp /></button>}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <ToastContainer position="bottom-right" autoClose={4500} theme="dark" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
