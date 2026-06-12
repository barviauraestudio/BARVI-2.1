import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

const PARTNERS = [
  { name: 'Sarah Thiesen', role: 'Produção' },
  { name: 'Monan', role: 'Coach Fitness' },
  { name: 'Serra', role: 'Mat. de Construção' },
  { name: 'Savini', role: 'Saúde e Bem-Estar' },
  { name: 'Villa Del Capo', role: 'Produção' },
  { name: 'Cavalos & Montanhas', role: 'Produção' },
  { name: 'Dr. Bernardo', role: 'Cirurgião' },
  { name: 'Fruta Fina Orgânicos', role: 'Alimentação' },
  { name: 'Qu4d Experience', role: 'Produção' },
  { name: 'Dr. Thiago Piva', role: 'Clínico' },
  { name: 'Calmaria Centro de Saúde', role: 'Saúde' },
  { name: 'Parque Mundo Novo', role: 'Turismo' },
  { name: 'Buss & Siementcoski', role: 'Advocacia' },
  { name: 'Rei Cell', role: 'Tecnologia' },
  { name: 'Pousada Vale da Ímbuia', role: 'Hospedagem' },
  { name: 'Lalaio', role: 'Produção' },
]

// Duplicate list to create a seamless infinite loop
const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS]

export default function Partners() {
  return (
    <section 
      id="parceiros" 
      className="section"
      style={{ 
        padding: '80px 0 40px',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: 'auto'
      }}
    >
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 50 }}>
          <p className="section-eyebrow">PRODUÇÕES E PARCEIROS</p>
          <h2 className="section-title">
            Marcas que <em style={{ color: 'var(--gold)' }}>acreditaram</em>
          </h2>
          <div className="section-rule" />
        </Reveal>
      </CenterWrapper>

      {/* Infinite Horizontal Marquee Container */}
      <div className="partners-marquee-container">
        <div className="partners-marquee-track">
          {MARQUEE_ITEMS.map((partner, index) => (
            <div key={index} className="partner-marquee-card">
              <span className="partner-tag">Barví Parceiro</span>
              <h3 className="partner-card-name">{partner.name}</h3>
              <p className="partner-card-role">{partner.role}</p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `

          .partners-marquee-container {
            position: relative;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
            overflow: hidden;
            padding: 24px 0;
            cursor: grab;
          }

          .partners-marquee-container:active {
            cursor: grabbing;
          }

          .partners-marquee-track {
            display: flex;
            width: max-content;
            gap: 20px;
            animation: infiniteScroll 45s linear infinite;
          }

          .partners-marquee-container:hover .partners-marquee-track {
            animation-play-state: paused;
          }

          .partner-marquee-card {
            width: 250px;
            height: 110px;
            padding: 20px 22px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: rgba(10, 3, 5, 0.45);
            backdrop-filter: blur(20px) saturate(1.8);
            -webkit-backdrop-filter: blur(20px) saturate(1.8);
            border: 1px solid rgba(201, 169, 110, 0.13);
            border-radius: 16px;
            box-shadow: 
              inset 0 1px 0 rgba(255,255,255,0.06),
              0 10px 30px rgba(0,0,0,0.4);
            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            user-select: none;
            position: relative;
          }

          .partner-marquee-card:hover {
            transform: translateY(-4px) scale(1.02);
            border-color: rgba(201, 169, 110, 0.38);
            box-shadow: 
              inset 0 1px 0 rgba(255,255,255,0.1),
              0 15px 35px rgba(139, 0, 0, 0.15),
              0 4px 15px rgba(0,0,0,0.5);
            background: rgba(18, 5, 9, 0.65);
          }

          .partner-tag {
            font-family: var(--FB);
            font-size: 8px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--golddm);
            margin-bottom: 6px;
          }

          .partner-card-name {
            font-family: var(--FD);
            font-size: 19px;
            font-style: italic;
            font-weight: 300;
            color: var(--white);
            line-height: 1.25;
            margin-bottom: 4px;
            transition: color 0.3s;
          }

          .partner-marquee-card:hover .partner-card-name {
            color: var(--goldlt);
          }

          .partner-card-role {
            font-family: var(--FB);
            font-size: 11px;
            color: rgba(242, 237, 230, 0.45);
            font-weight: 300;
          }

          @keyframes infiniteScroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              /* Move exactly 1/3 of the duplicated container for loop symmetry */
              transform: translate3d(calc(-100% / 3), 0, 0);
            }
          }

          @media (max-width: 640px) {
            .partner-marquee-card {
              width: 220px;
              height: 100px;
              padding: 16px 18px;
            }
            .partner-card-name {
              font-size: 17px;
            }
            .partner-card-role {
              font-size: 10px;
            }
            .partners-marquee-track {
              animation-duration: 35s; /* Slightly faster on small screens */
            }
          }
        `
      }} />
    </section>
  )
}
