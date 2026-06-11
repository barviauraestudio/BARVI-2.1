import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'
import { Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react'

// Curated stock image for slide 4 (Premium medical/dental clinic detail)
const STOCK_CLINIC_IMG = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop'

export default function InstagramCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const slideWidth = 500 // Max width of the instagram mockup

  const slides = [
    {
      type: 'image',
      content: '/insta_5.jpg',
      alt: 'Gengiva Saudável e Contorno do Dente'
    },
    {
      type: 'image',
      content: '/insta_3.png',
      alt: 'Naturalidade do Tecido Mole'
    },
    {
      type: 'image',
      content: '/insta_4.jpg',
      alt: 'Harmonia no Sorriso com Cirurgia Mucogengival'
    },
    {
      type: 'image',
      content: '/insta_1.png',
      alt: 'Preparação e Planejamento de Implantes'
    },
    {
      type: 'image',
      content: '/insta_2.png',
      alt: 'Importância do Planejamento Gengival'
    },
    {
      type: 'image',
      content: '/insta_6.jpg',
      alt: 'Salvar Post de Planejamento de Casos Perfeitos'
    }
  ]

  const totalSlides = slides.length

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  // Handle keyboard arrow navigation when hovering the component
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    const container = containerRef.current
    if (container) {
      container.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%'
    }),
    center: {
      x: 0
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%'
    })
  }

  return (
    <section id="instagram" className="section" style={{ padding: '80px 0 110px', overflow: 'hidden' }}>
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 40 }}>
          <p className="section-eyebrow">PORTFÓLIO SOCIAL</p>
          <h2 className="section-title">
            Atmosfera no <em style={{ color: 'var(--gold)' }}>Feed</em>
          </h2>
          <div className="section-rule" />
        </Reveal>

        <Reveal style={{ marginBottom: 48 }}>
          <p className="partners-intro" style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            maxWidth: '680px',
            lineHeight: 1.7,
            color: 'var(--muted)',
            textAlign: 'center',
            margin: '0 auto'
          }}>
            Nossa entrega de mídias sociais segue padrões editoriais de revistas de moda e arquitetura.
            Navegue no carrossel abaixo para sentir a identidade visual que desenvolvemos.
          </p>
        </Reveal>

        <Reveal>
          <div className="instagram-container" ref={containerRef} tabIndex={0}>
            {/* Instagram Mockup Frame */}
            <div className="instagram-card">
              {/* Header */}
              <div className="insta-header">
                <div className="insta-avatar">
                  <div className="avatar-ring" />
                  <img
                    src="/foto perfil bernardo.jpg"
                    alt="drbernardopassoni"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      position: 'relative',
                      zIndex: 1
                    }}
                  />
                </div>
                <div className="insta-header-info">
                  <span className="insta-username">drbernardopassoni</span>
                  <span className="insta-location">Florianópolis, Santa Catarina</span>
                </div>
                <div className="insta-dots">
                  <span /><span /><span />
                </div>
              </div>

              {/* Slider Area */}
              <div className="insta-slide-area">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="insta-slide-wrapper"
                  >
                    {slides[currentIndex].type === 'image' && (
                      <img
                        src={slides[currentIndex].content}
                        alt={slides[currentIndex].alt}
                        className="insta-img"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Navigation Arrows inside image */}
                <button
                  className="slide-nav-btn prev"
                  onClick={handlePrev}
                  aria-label="Slide anterior"
                >
                  <ChevronLeft size={20} stroke="#ffffff" />
                </button>
                <button
                  className="slide-nav-btn next"
                  onClick={handleNext}
                  aria-label="Próximo slide"
                >
                  <ChevronRight size={20} stroke="#ffffff" />
                </button>

                {/* Slide Count Indicator (Top Right) */}
                <div className="slide-badge">
                  {currentIndex + 1}/{totalSlides}
                </div>
              </div>

              {/* Action Bar */}
              <div className="insta-actions">
                <div className="insta-actions-left">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`insta-btn ${liked ? 'liked' : ''}`}
                    aria-label={liked ? 'Descurtir' : 'Curtir'}
                  >
                    <Heart size={22} fill={liked ? 'var(--rose)' : 'none'} stroke={liked ? 'var(--rose)' : '#B8AFA6'} />
                  </button>
                  <button className="insta-btn" aria-label="Comentar">
                    <MessageCircle size={22} stroke="#B8AFA6" />
                  </button>
                  <button className="insta-btn" aria-label="Compartilhar">
                    <Send size={20} stroke="#B8AFA6" />
                  </button>
                </div>

                {/* Dots indicator inside actions bar */}
                <div className="insta-indicators">
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      className={`indicator-dot ${currentIndex === i ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(i)}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`insta-btn bookmark ${bookmarked ? 'bookmarked' : ''}`}
                  aria-label={bookmarked ? 'Remover salvos' : 'Salvar'}
                >
                  <Bookmark size={22} fill={bookmarked ? 'var(--gold)' : 'none'} stroke={bookmarked ? 'var(--gold)' : '#B8AFA6'} />
                </button>
              </div>

              {/* Caption and likes details */}
              <div className="insta-details">
                <p className="insta-likes">
                  Curtido por <strong>barviauraestudio</strong> e <strong>outras {liked ? '324' : '323'} pessoas</strong>
                </p>
                <p className="insta-caption">
                  <strong>drbernardopassoni</strong> A harmonia do sorriso começa na saúde e no contorno da gengiva. A cirurgia plástica periodontal reconstrói detalhes que fazem toda a diferença. 📐✨
                </p>
                <span className="insta-time">Há 2 horas · Ver tradução</span>
              </div>
            </div>
          </div>
        </Reveal>
      </CenterWrapper>

      <style dangerouslySetInnerHTML={{
        __html: `
          .instagram-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            outline: none;
          }

          .instagram-card {
            width: 100%;
            max-width: 460px;
            background: rgba(10, 3, 5, 0.65);
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            border: 1px solid rgba(201, 169, 110, 0.15);
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), var(--glass-inset);
          }

          .insta-header {
            display: flex;
            align-items: center;
            padding: 14px 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .insta-avatar {
            position: relative;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
          }

          .avatar-ring {
            position: absolute;
            inset: -2px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--gold), var(--rose), var(--crimson));
            padding: 1px;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
          }

          .avatar-letter {
            font-family: var(--FD);
            font-size: 16px;
            font-style: italic;
            color: var(--goldlt);
            font-weight: bold;
          }

          .insta-header-info {
            display: flex;
            flex-direction: column;
          }

          .insta-username {
            font-size: 13.5px;
            font-weight: 500;
            color: var(--white);
            line-height: 1.2;
          }

          .insta-location {
            font-size: 10px;
            color: rgba(184, 175, 166, 0.6);
            line-height: 1.2;
            margin-top: 1px;
          }

          .insta-dots {
            margin-left: auto;
            display: flex;
            gap: 3px;
            cursor: pointer;
            padding: 6px;
          }

          .insta-dots span {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #B8AFA6;
          }

          /* Slide Area */
          .insta-slide-area {
            position: relative;
            width: 100%;
            aspect-ratio: 4/5;
            background: #060606;
            overflow: hidden;
          }

          .insta-slide-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .insta-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            user-select: none;
            pointer-events: none;
          }

          .insta-unsplash-container {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .insta-unsplash-overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(199, 169, 110, 0.08) 0%, rgba(10, 3, 5, 0.4) 100%);
            border: 1px solid rgba(201, 169, 110, 0.1) inset;
          }

          .insta-text-slide {
            width: 100%;
            height: 100%;
            padding: 44px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
            box-sizing: border-box;
          }

          .slide-num {
            font-family: var(--FB);
            font-size: 12px;
            letter-spacing: 0.3em;
            color: var(--gold);
            margin-bottom: 16px;
            text-transform: uppercase;
            border: 1px solid rgba(201, 169, 110, 0.25);
            padding: 3px 12px;
            border-radius: 20px;
          }

          .slide-title {
            font-family: var(--FD);
            font-size: 26px;
            font-style: italic;
            color: var(--white);
            margin-bottom: 20px;
            font-weight: 300;
            line-height: 1.2;
          }

          .slide-divider {
            width: 32px;
            height: 1px;
            background: var(--golddm);
            margin-bottom: 20px;
            opacity: 0.7;
          }

          .slide-description {
            font-size: 14.5px;
            color: rgba(242, 237, 230, 0.82);
            line-height: 1.75;
            max-width: 340px;
          }

          .insta-cta-slide {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #180509 0%, #0d0608 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            box-sizing: border-box;
          }

          .cta-icon-wrap {
            margin-bottom: 24px;
          }

          .cta-badge {
            font-family: var(--FD);
            font-style: italic;
            font-size: 24px;
            color: var(--gold);
            border: 1px solid rgba(201, 169, 110, 0.3);
            padding: 8px 24px;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(201,169,110,0.1);
          }

          .insta-cta-btn {
            font-family: var(--FB);
            font-size: 11px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--black);
            background: var(--gold);
            border: 1px solid var(--gold);
            padding: 14px 28px;
            border-radius: 30px;
            text-decoration: none;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(201,169,110,0.25);
          }

          .insta-cta-btn:hover {
            background: transparent;
            color: var(--gold);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(201,169,110,0.15);
          }

          /* Navigation and Badges */
          .slide-badge {
            position: absolute;
            top: 14px;
            right: 14px;
            background: rgba(20, 5, 10, 0.7);
            backdrop-filter: blur(8px);
            color: var(--white);
            font-size: 11px;
            padding: 4px 10px;
            border-radius: 12px;
            font-weight: 500;
            border: 1px solid rgba(255,255,255,0.06);
            letter-spacing: 0.05em;
          }

          .slide-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(20, 5, 10, 0.6);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(201,169,110,0.25);
            color: #ffffff !important;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            z-index: 10;
          }

          .slide-nav-btn svg {
            stroke: #ffffff !important;
            color: #ffffff !important;
          }

          .slide-nav-btn:hover {
            background: rgba(201, 169, 110, 0.25);
            border-color: var(--gold);
          }

          .slide-nav-btn:hover svg {
            stroke: var(--goldlt) !important;
          }

          .slide-nav-btn.prev { left: 12px; }
          .slide-nav-btn.next { right: 12px; }

          /* Action bar bottom */
          .insta-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            position: relative;
          }

          .insta-actions-left {
            display: flex;
            gap: 14px;
          }

          .insta-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
          }

          .insta-btn:hover {
            transform: scale(1.1);
          }

          .insta-btn.liked svg {
            filter: drop-shadow(0 0 4px rgba(212,84,122,0.4));
          }

          .insta-indicators {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 5px;
          }

          .indicator-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(184, 175, 166, 0.3);
            cursor: pointer;
            transition: all 0.3s;
          }

          .indicator-dot.active {
            background: var(--gold);
            transform: scale(1.1);
          }

          /* Text details */
          .insta-details {
            padding: 0 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 13px;
            line-height: 1.5;
          }

          .insta-likes {
            color: var(--white);
          }

          .insta-likes strong {
            font-weight: 500;
          }

          .insta-caption {
            color: rgba(242, 237, 230, 0.9);
          }

          .insta-caption strong {
            color: var(--white);
            font-weight: 500;
            margin-right: 5px;
          }

          .insta-time {
            font-size: 10.5px;
            color: rgba(184, 175, 166, 0.45);
            text-transform: uppercase;
            letter-spacing: 0.02em;
            margin-top: 2px;
          }

          @media (max-width: 480px) {
            .instagram-card {
              border-radius: 0;
              border-left: none;
              border-right: none;
            }
            .insta-text-slide {
              padding: 24px;
            }
            .slide-title {
              font-size: 20px;
              margin-bottom: 12px;
            }
            .slide-description {
              font-size: 13px;
              line-height: 1.6;
            }
            .slide-nav-btn {
              width: 28px;
              height: 28px;
            }
          }
        `
      }} />
    </section>
  )
}
