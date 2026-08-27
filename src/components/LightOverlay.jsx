/**
 * LightOverlay.jsx
 * Banho de luz quente e difuso para o painel do vídeo do hero.
 * Fica DENTRO de .hero-video-side (que já é position:relative; overflow:hidden),
 * então a luz nasce do canto superior direito e "engancha" no vídeo da guitarra.
 *
 * Intensidade única controlada por --luz-i (padrão 0.56, valor aprovado).
 *
 * @param {number} intensity  0 a 1.
 */
import { motion } from 'framer-motion';
import './LightOverlay.css';

export function LightOverlay({ intensity = 0.56 }) {
  return (
    <div className="luz-overlay" style={{ '--luz-i': intensity }} aria-hidden="true">
      {/* Corpo da luz — respiração lenta feita pelo Framer Motion */}
      <motion.div
        className="luz luz--glow"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
      />
      {/* Feixes difusos na diagonal */}
      <div className="luz luz--shafts" />
      {/* Granulado atmosférico (poeira no ar) */}
      <div className="luz luz--haze" />
    </div>
  );
}
