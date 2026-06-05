import { useEffect, useRef } from 'react'
import CenterWrapper from './CenterWrapper'

const LETTERS = 'MINIMALISMO'.split('')

export default function Minimalism() {
  const sectionRef = useRef<HTMLElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const phraseRef = useRef<HTMLParagraphElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          animateText()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  function animateText() {
    lettersRef.current.forEach((el, i) => {
      if (!el) return
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        el.style.filter = 'blur(0px)'
      }, 400 + i * 80)
    })

    setTimeout(() => {
      if (phraseRef.current) {
        phraseRef.current.style.opacity = '1'
        phraseRef.current.style.transform = 'translateY(0)'
      }
    }, 400 + LETTERS.length * 80 + 200)

    setTimeout(() => {
      if (lineRef.current) {
        lineRef.current.style.transition = 'width 1.4s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease'
        lineRef.current.style.width = '220px'
        lineRef.current.style.opacity = '1'
      }
    }, 4500)

    setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '1'
        textRef.current.style.transform = 'translateY(0)'
      }
    }, 5000)
  }

  return (
    <section
      ref={sectionRef}
      id="minimalismo"
      style={{
        padding: '140px 0 120px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <CenterWrapper>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(1px, 0.4vw, 5px)',
            marginBottom: 36,
          }}>
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={el => { lettersRef.current[i] = el }}
                style={{
                  fontFamily: 'var(--FD)', fontStyle: 'italic', fontWeight: 300,
                  fontSize: 'clamp(42px, 7vw, 110px)', lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: i === 0 ? 'var(--gold)' : 'var(--white)',
                  opacity: 0, transform: 'translateY(40px)', filter: 'blur(8px)',
                  transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease',
                  display: 'inline-block',
                }}
              >{letter}</span>
            ))}
          </div>

          <p ref={phraseRef} style={{
            fontFamily: 'var(--FD)', fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.2vw, 28px)', color: 'var(--gold)',
            letterSpacing: '0.02em', marginBottom: 20,
            opacity: 0, transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}>
            Na estética, no volume, no foco.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div
              ref={lineRef}
              style={{
                height: 1,
                width: 0,
                opacity: 0,
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.7), transparent)',
              }}
            />
          </div>

          <p ref={textRef} style={{
            fontSize: 'clamp(14px, 1.5vw, 17px)', color: 'var(--muted)',
            lineHeight: 1.88, maxWidth: 460, margin: '0 auto',
            opacity: 0, transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}>
            Removemos o que distrai.
            Cada escolha é intencional, cada silêncio tem peso.
            O que sobra é{' '}
            <em style={{ color: 'var(--goldlt)', fontStyle: 'italic' }}>intenção pura.</em>
          </p>
        </div>
      </CenterWrapper>
    </section>
  )
}
