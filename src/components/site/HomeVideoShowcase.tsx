import React, { useEffect, useRef, useState } from 'react'
import './HomeVideoShowcase.css'

interface VideoItem {
  id: string
  format: 'vertical' | 'horizontal'
  title: string
  tag: string
  startTime: number
}

interface PlayerState {
  isReady: boolean
  isLoaded: boolean
}

const VIDEOS: VideoItem[] = [
  {
    id: 'm7OETuDX684',
    format: 'vertical',
    title: 'Momentos & Detalhes Especiais',
    tag: '01 / 04 · Vertical',
    startTime: 0,
  },
  {
    id: 'ENxamFIJknY',
    format: 'horizontal',
    title: 'Cenografia e Ambientação de Eventos',
    tag: '02 / 04 · Horizontal',
    startTime: 3,
  },
  {
    id: 'O1sKoeN-4mM',
    format: 'horizontal',
    title: 'Celebrações Únicas e Memoráveis',
    tag: '03 / 04 · Horizontal',
    startTime: 18,
  },
  {
    id: 'jol6xQvyitk',
    format: 'horizontal',
    title: 'A Arte e o Cuidado em Cada Cenário',
    tag: '04 / 04 · Horizontal',
    startTime: 0,
  },
]

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export const HomeVideoShowcase: React.FC = () => {
  const playersRef = useRef<{ [key: number]: any }>({})
  const [apiReady, setApiReady] = useState<boolean>(false)
  const [loadedPlayers, setLoadedPlayers] = useState<Set<number>>(new Set())
  const [enteringIndex, setEnteringIndex] = useState<number | null>(null)

  // Load YouTube IFrame API
  useEffect(() => {
    let isMounted = true

    const checkApi = () => {
      if (window.YT && window.YT.Player) {
        if (isMounted) setApiReady(true)
        return true
      }
      return false
    }

    if (checkApi()) return

    const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]')
    if (!existingScript) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    const prevOnReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevOnReady === 'function') prevOnReady()
      if (isMounted) setApiReady(true)
    }

    const interval = setInterval(() => {
      if (checkApi()) clearInterval(interval)
    }, 300)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  // Initialize YT Players when API is ready
  useEffect(() => {
    if (!apiReady || !window.YT || !window.YT.Player) return

    VIDEOS.forEach((video, index) => {
      const containerId = `yt-showcase-player-${index}`
      const el = document.getElementById(containerId)
      if (!el || playersRef.current[index]) return

      try {
        const player = new window.YT.Player(containerId, {
          videoId: video.id,
          playerVars: {
            autoplay: index === 0 ? 1 : 0,
            mute: 1, // Browser policy requires initial mute for autoplay
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            controls: 1,
            start: video.startTime,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              // Mark this player as loaded (removes skeleton)
              setLoadedPlayers(prev => new Set([...prev, index]))

              if (index === 0) {
                try {
                  event.target.mute()
                  event.target.playVideo()
                } catch {}
              }
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING -> Pause other players to avoid overlapping audio
              if (event.data === 1) {
                Object.entries(playersRef.current).forEach(([k, p]) => {
                  const pIdx = Number(k)
                  if (pIdx !== index && p && typeof p.pauseVideo === 'function') {
                    try {
                      p.pauseVideo()
                    } catch {}
                  }
                })
              }
              // 0 = ENDED -> Advance to next video automatically
              if (event.data === 0) {
                const nextIndex = (index + 1) % VIDEOS.length
                const nextContainer = document.getElementById(`video-card-${nextIndex}`)
                if (nextContainer) {
                  // Trigger entering animation
                  setEnteringIndex(nextIndex)
                  nextContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  // Clear entering animation after it completes
                  setTimeout(() => setEnteringIndex(null), 600)
                }
                const nextPlayer = playersRef.current[nextIndex]
                if (nextPlayer && typeof nextPlayer.playVideo === 'function') {
                  try {
                    nextPlayer.playVideo()
                  } catch {}
                }
              }
            },
          },
        })
        playersRef.current[index] = player
      } catch {}
    })

    return () => {
      Object.values(playersRef.current).forEach((player) => {
        try {
          if (player && typeof player.destroy === 'function') player.destroy()
        } catch {}
      })
      playersRef.current = {}
    }
  }, [apiReady])

  return (
    <section className="home-video-showcase" aria-label="Vídeos em destaque da V J Produções">
      <div className="home-video-showcase__list">
        {VIDEOS.map((video, index) => {
          const isVertical = video.format === 'vertical'
          const isLoaded = loadedPlayers.has(index)
          const isEntering = enteringIndex === index
          return (
            <article
              key={video.id}
              id={`video-card-${index}`}
              className={`video-item-card ${isVertical ? 'video-item-card--vertical' : 'video-item-card--horizontal'} ${isEntering ? 'video-entering' : ''}`}
              style={{ maxWidth: isVertical ? '440px' : '1100px', '--reveal-delay': `${index * 0.15}s` }}
            >
              <div
                className={`video-frame ${isVertical ? 'video-frame--vertical' : 'video-frame--horizontal'}`}
              >
                {/* Skeleton loader - shows while YouTube player initializes */}
                <div className={`video-skeleton ${isLoaded ? 'loaded' : ''}`} aria-hidden="true" />

                {/* Fallback iframe rendered if API is still loading; YT.Player replaces or binds to container */}
                <div id={`yt-showcase-player-${index}`}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=${index === 0 ? 1 : 0}&mute=1&playsinline=1&rel=0&modestbranding=1&start=${video.startTime}&enablejsapi=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default HomeVideoShowcase
