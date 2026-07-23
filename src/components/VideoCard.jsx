/**
 * VideoCard.jsx
 * Card com Cormorant Garamond no título, hover dourado e waveform animado.
 */

import { motion } from 'framer-motion';
import { getThumbnailUrl } from '../utils/youtubeUtils';

export const cardVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0, scale: 0.9, y: -8,
    transition: { duration: 0.18 },
  },
};

export function VideoCard({ video, isManageMode, onPlay, onRemove }) {
  const thumbnail = getThumbnailUrl(video.videoId);

  return (
    <motion.article
      className={`video-card ${isManageMode ? 'manage-mode' : ''}`}
      variants={cardVariants}
      layout
      onClick={() => !isManageMode && onPlay()}
      onKeyDown={e => { if (!isManageMode && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onPlay(); }}}
      tabIndex={isManageMode ? undefined : 0}
      role={isManageMode ? 'article' : 'button'}
      aria-label={isManageMode ? video.title : `Reproduzir: ${video.title}`}
    >
      <div className="thumbnail-wrapper">
        <img
          src={thumbnail}
          alt={video.title}
          className="thumbnail"
          loading="lazy"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
          }}
        />

        {/* Overlay de play + waveform */}
        {!isManageMode && (
          <div className="play-overlay" aria-hidden="true">
            <div className="play-circle">
              <div className="play-triangle" />
            </div>
            <div className="waveform">
              <div className="wave-bar" />
              <div className="wave-bar" />
              <div className="wave-bar" />
              <div className="wave-bar" />
              <div className="wave-bar" />
            </div>
          </div>
        )}

        {/* Botão deletar (manage mode) */}
        {isManageMode && (
          <motion.button
            className="delete-btn"
            onClick={e => { e.stopPropagation(); onRemove(); }}
            aria-label={`Remover: ${video.title}`}
            title="Remover da playlist"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
          >
            ×
          </motion.button>
        )}
      </div>

      {/* Info do card — título em Cormorant Garamond */}
      <div className="card-info">
        <h3 className="card-title" title={video.title}>{video.title}</h3>
        {video.artist && <p className="card-artist">{video.artist}</p>}
        <div className="card-footer">
          <span className={`type-badge ${video.type === 'musica' ? 'badge-musica' : 'badge-aula'}`}>
            {video.type === 'musica' ? '🎵 Música' : '🎸 Aula'}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
