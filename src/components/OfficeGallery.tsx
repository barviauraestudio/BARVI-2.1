import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'
import FadeContent from './FadeContent'
import BorderGlow from './BorderGlow'
import { X, ZoomIn } from 'lucide-react'

const OFFICE_PHOTOS = [
  {
    src: '/estetica_1.jpg',
    title: 'Posicionamento Profissional',
    desc: 'Retratos estratégicos que expressam a autoridade e o padrão de excelência de especialistas da saúde.',
    aspect: 'aspect-[4/3] md:aspect-square'
  },
  {
    src: '/estetica_2.jpg',
    title: 'Precisão & Foco',
    desc: 'Registros dinâmicos de procedimentos complexos com foco no rigor profissional e técnicas ópticas avançadas.',
    aspect: 'aspect-[4/3] md:aspect-[3/4] md:row-span-2'
  },
  {
    src: '/estetica_3.jpg',
    title: 'Fotografia Clínica Estética',
    desc: 'Capturas em alta fidelidade evidenciando a minúcia, materiais e tecnologia em tratamentos odontológicos.',
    aspect: 'aspect-[4/3] md:aspect-[3/2]'
  },
  {
    src: '/estetica_4.jpg',
    title: 'Experiência & Cuidado',
    desc: 'A representação visual do atendimento humanizado, segurança clínica e entrega de resultados extraordinários.',
    aspect: 'aspect-[4/3] md:aspect-[16/10]'
  },
  {
    src: '/estetica_5.jpg',
    title: 'Harmonia & Simetria',
    desc: 'Mapeamento detalhado e planejamento facial meticuloso para os tratamentos estéticos.',
    aspect: 'aspect-[4/3] md:aspect-[16/10]'
  }
]

export default function OfficeGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="consultorios" className="section" style={{ padding: '100px 0' }}>
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 50 }}>
          <p className="section-eyebrow">DIREÇÃO DE IMAGEM</p>
          <h2 className="section-title">
            A Narrativa do <em style={{ color: 'var(--gold)' }}>Rigor Clínico</em>
          </h2>
          <div className="section-rule" />
        </Reveal>

        <Reveal style={{ marginBottom: 40 }}>
          <p className="partners-intro" style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            maxWidth: '680px',
            lineHeight: 1.7,
            color: 'var(--muted)',
            textAlign: 'center',
            margin: '0 auto'
          }}>
            Produção de imagem autoral e registros cirúrgicos sob direção artística premium, evidenciando a precisão técnica e a autoridade dos profissionais.
          </p>
        </Reveal>

        <Reveal>
          <div className="gallery-grid">
            {OFFICE_PHOTOS.map((photo, i) => (
              <FadeContent key={i} duration={800} delay={i * 150} blur className={`gallery-item-wrap ${photo.aspect}`}>
                <BorderGlow
                  className="gallery-item"
                  backgroundColor="rgba(10, 3, 5, 0.45)"
                  borderRadius={16}
                  glowColor="36 65 65"
                  colors={['#C9A96E', '#8B0000', '#A8883A']}
                  glowIntensity={0.8}
                  glowRadius={32}
                  edgeSensitivity={28}
                  coneSpread={20}
                  fillOpacity={0.15}
                >
                  <div 
                    className="photo-cardGroup"
                    onClick={() => setSelectedImage(photo.src)}
                    style={{ borderRadius: 'inherit', overflow: 'hidden', height: '100%', width: '100%' }}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.title}
                      className="gallery-image"
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <ZoomIn className="zoom-icon" size={24} />
                      <div className="overlay-text">
                        <h3>{photo.title}</h3>
                        <p>{photo.desc}</p>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </FadeContent>
            ))}
          </div>
        </Reveal>
      </CenterWrapper>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Fechar galeria"
            >
              <X size={28} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={selectedImage} 
              alt="Consultório ampliado"
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 1100px;
            margin: 0 auto;
          }

          @media (min-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              grid-auto-flow: dense;
            }
          }

          .gallery-item-wrap {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .gallery-item {
            position: relative;
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .photo-cardGroup {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .gallery-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .photo-cardGroup:hover .gallery-image {
            transform: scale(1.04);
          }

          .gallery-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(8, 2, 5, 0.9) 0%, rgba(8, 2, 5, 0.3) 60%, transparent 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 24px;
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 2;
          }

          .photo-cardGroup:hover .gallery-overlay {
            opacity: 1;
          }

          .zoom-icon {
            color: var(--gold);
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(8, 2, 5, 0.6);
            padding: 6px;
            border-radius: 50%;
            border: 1px solid rgba(201, 169, 110, 0.2);
            box-sizing: content-box;
            transition: transform 0.4s ease, color 0.3s;
          }

          .photo-cardGroup:hover .zoom-icon {
            transform: scale(1.1) rotate(90deg);
            color: var(--white);
          }

          .overlay-text h3 {
            font-family: var(--FD);
            font-size: 20px;
            color: var(--gold);
            margin-bottom: 6px;
            font-weight: 300;
          }

          .overlay-text p {
            font-size: 13px;
            color: rgba(242, 237, 230, 0.8);
            line-height: 1.5;
          }

          /* Lightbox styling */
          .lightbox-overlay {
            position: fixed;
            inset: 0;
            background: rgba(6, 2, 4, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .lightbox-image {
            max-width: 95%;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 8px;
            border: 1px solid rgba(201, 169, 110, 0.25);
            box-shadow: 0 24px 60px rgba(0,0,0,0.6);
          }

          .lightbox-close {
            position: absolute;
            top: 30px;
            right: 30px;
            background: rgba(20, 5, 10, 0.6);
            border: 1px solid rgba(201, 169, 110, 0.3);
            color: var(--white);
            cursor: pointer;
            padding: 10px;
            border-radius: 50%;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .lightbox-close:hover {
            background: var(--crimson);
            border-color: var(--goldlt);
            transform: scale(1.1);
          }

          @media (max-width: 640px) {
            .gallery-overlay {
              opacity: 1;
              background: linear-gradient(to top, rgba(8, 2, 5, 0.95) 0%, rgba(8, 2, 5, 0.4) 70%, transparent 100%);
              padding: 16px;
            }
            .zoom-icon {
              display: none;
            }
            .overlay-text h3 {
              font-size: 16px;
            }
            .overlay-text p {
              font-size: 12px;
            }
            .lightbox-close {
              top: 20px;
              right: 20px;
            }
          }
        `
      }} />
    </section>
  )
}
