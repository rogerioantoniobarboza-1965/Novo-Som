/**
 * HeroSection.jsx
 * Seção principal do topo da página.
 * Layout split: texto à esquerda, vídeo em loop à direita.
 * Inspirado no estilo editorial do KOPKE Store.
 */

import { useRef } from 'react';
import { motion } from 'framer-motion';

export function HeroSection({ onScrollToPlaylist }) {
  const videoRef = useRef(null);

  return (
    <section className="hero" aria-label="Novo Som — hero">

      {/* ── Lado esquerdo: texto ── */}
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sua coleção musical
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Novo
          <em>Som</em>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Músicas e aulas de guitarra do YouTube, organizadas em um só lugar.
        </motion.p>

        <motion.button
          className="hero-cta"
          onClick={onScrollToPlaylist}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Ver Playlist ↓
        </motion.button>
      </motion.div>

      {/* ── Lado direito: vídeo em loop ── */}
      <motion.div
        className="hero-video-side"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <video
          ref={videoRef}
          className="hero-video"
          src={`${import.meta.env.BASE_URL}video/guitarra.mp4`}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Mão tocando violão acústico"
        />
        {/* Vinheta que integra o vídeo ao fundo */}
        <div className="hero-video-vignette" aria-hidden="true" />
      </motion.div>

    </section>
  );
}
