import './App.css'
import Crawl from './Crawl'
import Projects from './Projects'
import Hobbies from './Hobbies'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type Page = 'home' | 'projects' | 'hobbies'
type TransitionPhase = 'idle' | 'closing' | 'opening'
type TransitionType = 'iris' | 'slide'

type Streak = {
  id: number
  angle: number
  delay: number
  duration: number
  width: number
  opacity: number
}

const fract = (value: number) => value - Math.floor(value)

const randomFromIndex = (index: number, shift: number) => {
  return fract(Math.sin(index * 127.1 + shift * 311.7) * 43758.5453123)
}

const streaks: Streak[] = Array.from({ length: 92 }, (_, index) => {
  const angle = randomFromIndex(index, 1) * 360
  const delay = randomFromIndex(index, 2) * 1.05
  const duration = 1.15 + randomFromIndex(index, 3) * 0.9
  const width = 24 + randomFromIndex(index, 4) * 58
  const opacity = 0.35 + randomFromIndex(index, 5) * 0.65

  return { id: index, angle, delay, duration, width, opacity }
})

function App() {
  const [isMobile] = useState(() => window.innerWidth <= 768)

  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle')
  const [transitionType, setTransitionType] = useState<TransitionType>('iris')
  const [pendingPage, setPendingPage] = useState<Page | null>(null)
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' })

  const [showCrawl, setShowCrawl] = useState(false)
  const [crawlWidth, setCrawlWidth] = useState<string | undefined>(undefined)
  const [crawlDuration, setCrawlDuration] = useState<number>(32)
  const [isMuted, setIsMuted] = useState(true)

  const [navHidden, setNavHidden] = useState(false)
  const [showAudioHint, setShowAudioHint] = useState(true)
  const [isSoundMuted, setIsSoundMuted] = useState(false)
  const [waitPromptVisible, setWaitPromptVisible] = useState(false)
  const lastScrollY = useRef(0)

  const auYeungRef = useRef<HTMLSpanElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const musicRef = useRef<HTMLAudioElement>(null)
  const transitionAudioRef = useRef<HTMLAudioElement>(null)
  const crawlStartTimeRef = useRef<number>(0)
  const crawlDurationRef = useRef<number>(32)
  const musicFadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const musicFadeRafRef = useRef<number | null>(null)
  const hyperspaceExitAudioRef = useRef<HTMLAudioElement>(null)
  const projectsBtnRef = useRef<HTMLButtonElement>(null)
  const hobbiesBtnRef = useRef<HTMLButtonElement>(null)

  const cancelMusicFade = () => {
    if (musicFadeTimerRef.current !== null) { clearTimeout(musicFadeTimerRef.current); musicFadeTimerRef.current = null }
    if (musicFadeRafRef.current !== null) { cancelAnimationFrame(musicFadeRafRef.current); musicFadeRafRef.current = null }
  }

  const startMusicFade = () => {
    const music = musicRef.current
    if (!music || music.paused) return
    const startVolume = music.volume
    const fadeDuration = 10000
    const start = Date.now()
    const tick = () => {
      const progress = Math.min((Date.now() - start) / fadeDuration, 1)
      music.volume = startVolume * (1 - progress)
      if (progress < 1) musicFadeRafRef.current = requestAnimationFrame(tick)
      else music.pause()
    }
    musicFadeRafRef.current = requestAnimationFrame(tick)
  }

  const handlePageScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const y = e.currentTarget.scrollTop
    setNavHidden(y > lastScrollY.current && y > 40)
    lastScrollY.current = y
  }

  useEffect(() => {
    if (isMobile) {
      const startMusic = () => {
        const music = musicRef.current
        if (music && music.paused) {
          music.volume = 0.35
          music.play().catch(() => {})
        }
        document.removeEventListener('click', startMusic)
        document.removeEventListener('touchstart', startMusic)
      }
      document.addEventListener('click', startMusic)
      document.addEventListener('touchstart', startMusic)
      return () => {
        document.removeEventListener('click', startMusic)
        document.removeEventListener('touchstart', startMusic)
      }
    }

    const exitSfxTimeout = setTimeout(() => {
      const sfx = hyperspaceExitAudioRef.current
      if (sfx) { sfx.currentTime = 0; sfx.play().catch(() => {}) }
    }, 650)
    const timeout = setTimeout(() => {
      if (auYeungRef.current) {
        setCrawlWidth(auYeungRef.current.offsetWidth + 'px')
        setShowCrawl(true)
      }
    }, 0)
    const hintTimeout = setTimeout(() => setShowAudioHint(false), 10000)
    const waitPromptTimeout = setTimeout(() => setWaitPromptVisible(true), 3000)
    return () => {
      clearTimeout(exitSfxTimeout)
      clearTimeout(timeout)
      clearTimeout(hintTimeout)
      clearTimeout(waitPromptTimeout)
    }
  }, [])

  useEffect(() => { crawlDurationRef.current = crawlDuration }, [crawlDuration])

  // Mute audio and stop music when leaving home
  useEffect(() => {
    if (currentPage !== 'home') {
      if (audioRef.current) { audioRef.current.muted = true; setIsMuted(true) }
      cancelMusicFade()
      if (musicRef.current) musicRef.current.pause()
    }
  }, [currentPage])

  const handleFirstWordVisible = () => {
    crawlStartTimeRef.current = Date.now()
    audioRef.current?.play().catch(() => {})
    const music = musicRef.current
    if (music) {
      music.volume = 0.35
      music.play().catch(() => {})
    }
    const fadeDelay = Math.max(0, (crawlDurationRef.current - 10) * 1000)
    musicFadeTimerRef.current = setTimeout(startMusicFade, fadeDelay)
  }

  const handleSoundMuteClick = () => {
    const next = !isSoundMuted
    setIsSoundMuted(next)
    if (musicRef.current) musicRef.current.muted = next
    if (transitionAudioRef.current) transitionAudioRef.current.muted = next
    if (hyperspaceExitAudioRef.current) hyperspaceExitAudioRef.current.muted = next
  }

  const handleNarrateClick = () => {
    const audio = audioRef.current
    if (!audio) return
    setShowAudioHint(false)
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    audio.muted = nextMuted
    if (!nextMuted && audio.paused && crawlStartTimeRef.current) {
      const elapsed = (Date.now() - crawlStartTimeRef.current) / 1000
      audio.currentTime = Math.min(elapsed, audio.duration || 0)
      audio.play().catch(() => {})
    }
  }

  const startTransition = (next: Page, type: TransitionType, btn?: HTMLButtonElement | null) => {
    if (transitionPhase !== 'idle') return
    const sfx = transitionAudioRef.current
    if (sfx) { sfx.currentTime = 0; sfx.play().catch(() => {}) }
    if (type === 'iris' && btn) {
      const r = btn.getBoundingClientRect()
      setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` })
    }
    setTransitionType(type)
    setPendingPage(next)
    setTransitionPhase('closing')
  }

  const handleProjectsClick = () =>
    startTransition('projects', 'iris', projectsBtnRef.current)

  const handleHobbiesClick = () =>
    startTransition('hobbies', 'slide')

  const handleShellAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return
    if (transitionPhase === 'closing') {
      if (pendingPage) setCurrentPage(pendingPage)
      setPendingPage(null)
      setTransitionPhase('opening')
    } else if (transitionPhase === 'opening') {
      setTransitionPhase('idle')
    }
  }

  const shellClass = [
    'site-shell',
    transitionPhase === 'closing' && transitionType === 'iris'  ? 'iris-closing'   : '',
    transitionPhase === 'opening' && transitionType === 'iris'  ? 'iris-opening'   : '',
    transitionPhase === 'closing' && transitionType === 'slide' ? 'slide-closing'  : '',
    transitionPhase === 'opening' && transitionType === 'slide' ? 'slide-opening'  : '',
  ].filter(Boolean).join(' ')

  const shellStyle: CSSProperties = transitionPhase !== 'idle'
    ? {
        transform: 'translateZ(0)',
        ...(transitionType === 'iris' ? { '--cx': origin.x, '--cy': origin.y } : {}),
      } as CSSProperties
    : {}

  return (
    <main
      className={shellClass}
      style={shellStyle}
      onAnimationEnd={transitionPhase !== 'idle' ? handleShellAnimationEnd : undefined}
    >
      <audio
        ref={audioRef}
        src="/in-a-time-of-global-struggle-and-economic-distress-jadon-is-a-20-year-old-student-trying-to-make-his-way-in-the-world-bu.mp3"
        onLoadedMetadata={() => {
          if (audioRef.current) setCrawlDuration(audioRef.current.duration + 15)
        }}
      />
      <audio ref={musicRef} src="/8d82b5_Star_Wars_Main_Theme_Song.mp3" />
      <audio ref={transitionAudioRef} src="/trading_nation-transition-futuristic-ufo-121421.mp3" />
      <audio ref={hyperspaceExitAudioRef} src="/bh-exit-hyperspace.mp3" />

      <div className="deep-space" aria-hidden="true" />

      {currentPage === 'home' && <img className="death-star" src="/deathstar_PNG.png" alt="" aria-hidden="true" />}

      <div className="still-stars" aria-hidden="true" />
      <div className="hyperspace" aria-hidden="true">
        {streaks.map((streak) => (
          <div
            key={streak.id}
            className="streak-shell"
            style={{ transform: `translate(-50%, -50%) rotate(${streak.angle}deg)` }}
          >
            <span
              className="streak"
              style={{
                animationDelay: `${streak.delay}s`,
                animationDuration: `${streak.duration}s`,
                width: `${streak.width}vmax`,
                opacity: streak.opacity,
              }}
            />
          </div>
        ))}
      </div>

      <nav className={`nav-buttons${navHidden ? ' nav-buttons--hidden' : ''}`}>
        <button
          ref={projectsBtnRef}
          className={`nav-btn${currentPage === 'projects' ? ' nav-btn--active' : ''}`}
          onClick={handleProjectsClick}
        >
          Projects
        </button>
        <button
          ref={hobbiesBtnRef}
          className={`nav-btn${currentPage === 'hobbies' ? ' nav-btn--active' : ''}`}
          onClick={handleHobbiesClick}
        >
          About
        </button>
        <a
          href="/Resume (2).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn"
        >
          Resume
        </a>
        {currentPage === 'home' && !isMobile && (
          <button
            className={`nav-btn${!isMuted ? ' nav-btn--active' : ''}`}
            onClick={handleNarrateClick}
          >
            Narrate
          </button>
        )}
        <a
          href="https://github.com/Jadon06"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-social-link"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/jadon-au-yeung-1a3558273/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-social-link"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <button
          className={`nav-sound-btn${isSoundMuted ? ' nav-sound-btn--muted' : ''}`}
          onClick={handleSoundMuteClick}
          aria-label={isSoundMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isSoundMuted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M3.63 3.63a1 1 0 0 0-1.41 1.41L7.29 10.1 7 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3l5 5v-6.59l4.18 4.18A6.92 6.92 0 0 1 14 18.28V20a8.94 8.94 0 0 0 3.54-2.13l2.46 2.46a1 1 0 0 0 1.41-1.41L3.63 3.63zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53A8.93 8.93 0 0 0 21 12c0-4.28-3-7.86-7-8.77V5.3c2.89.86 5 3.54 5 6.7zm-7-8L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </nav>

      {currentPage === 'home' && showAudioHint && !isMobile && (
        <p className="audio-hint">click Narrate to turn off narration</p>
      )}

      {currentPage === 'home' && (
        <>
          {!isMobile && showCrawl && crawlWidth && (
            <Crawl crawlWidth={crawlWidth} duration={crawlDuration} onFirstWordVisible={handleFirstWordVisible} onBeforeFirstWordVisible={() => setWaitPromptVisible(false)} />
          )}
          <section className="hero-panel">
            <h1 className="nameplate">
              <span>
                Jado
                <span className="nameplate-n">
                  n
                  {!isMobile && (
                    <span
                      className="wait-prompt"
                      style={{ opacity: waitPromptVisible ? 1 : 0 }}
                    >
                      wait for it...
                    </span>
                  )}
                </span>
              </span>
              <span ref={auYeungRef}>Au-Yeung</span>
            </h1>
          </section>
        </>
      )}

      {currentPage === 'projects' && <Projects onScroll={handlePageScroll} />}
      {currentPage === 'hobbies' && <Hobbies onScroll={handlePageScroll} />}
    </main>
  )
}

export default App
