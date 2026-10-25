import React, { useState, useRef, useEffect } from 'react'

interface VideoItem {
  id?: string
  src?: string
}

interface FilmGalleryProps {
  videos?: string[]
  localVideos?: string[]
  title?: string
}

export const FilmGallery: React.FC<FilmGalleryProps> = ({
  videos = [],
  localVideos = [],
  title = 'Projetos em movimento',
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = (video: VideoItem) => {
    setActiveVideo(video)
    document.body.style.overflow = 'hidden'
    if (dialogRef.current) {
      if (!dialogRef.current.open) {
        dialogRef.current.showModal()
      }
    }
  }

  const close = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close()
    }
    setActiveVideo(null)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!videos.length && !localVideos.length) return null

  return (
    <section className="film-section section-wrap">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Nosso trabalho, de perto</p>
          <h2>{title}</h2>
        </div>
        <p>
          Cada cenário tem uma história.
          <br />
          Dê o play e conheça os detalhes.
        </p>
      </div>
      <div className="film-grid">
        {videos.map((id, index) => (
          <button
            key={id}
            type="button"
            className="film-card"
            onClick={() => open({ id })}
            aria-label={`Assistir projeto ${index + 1}`}
          >
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="play-icon" aria-hidden="true">
              ▷
            </span>
            <span className="film-caption">
              Projeto {String(index + 1).padStart(2, '0')} <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
        {localVideos.map((src, index) => (
          <button
            key={src}
            type="button"
            className="film-card"
            onClick={() => open({ src })}
            aria-label={`Assistir cerimônia ${index + 1}`}
          >
            <img src={index ? '/images/hero.jpg' : '/images/cerimonia.jpg'} alt="" loading="lazy" />
            <span className="play-icon" aria-hidden="true">
              ▷
            </span>
            <span className="film-caption">
              Cerimônia {String(index + 1).padStart(2, '0')} <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="media-dialog"
        aria-label="Vídeo do projeto"
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            close()
          }
        }}
      >
        <button className="dialog-close" type="button" onClick={close} aria-label="Fechar vídeo">
          ×
        </button>
        {activeVideo?.id && (
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0&playsinline=1`}
            title="Vídeo do projeto V J Produções e Eventos"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
        {activeVideo?.src && <video src={activeVideo.src} controls autoPlay playsInline />}
      </dialog>
    </section>
  )
}

export default FilmGallery
