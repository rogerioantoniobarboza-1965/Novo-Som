/**
 * PlayerModal.jsx
 * Player de vídeo embutido (YouTube iframe).
 * Fecha ao pressionar Escape ou clicar no backdrop.
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEmbedUrl } from '../utils/youtubeUtils';

export function PlayerModal({ video, onClose }) {
  /* Fecha com Escape */
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  /* Impede scroll do body enquanto o player está aberto */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <motion.div
      className="player-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Reproduzindo: ${video.title}`}
    >
      {/* Botão fechar */}
      <button
        className="player-close"
        onClick={onClose}
        aria-label="Fechar player"
      >
        ×
      </button>

      {/* Container do player */}
      <motion.div
        className="player-wrapper"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        <div className="player-iframe-container">
          <iframe
            className="player-iframe"
            src={getEmbedUrl(video.videoId)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Título e artista abaixo do player */}
        <div className="player-info">
          <p className="player-title">{video.title}</p>
          {video.artist && (
            <p className="player-artist">{video.artist}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
