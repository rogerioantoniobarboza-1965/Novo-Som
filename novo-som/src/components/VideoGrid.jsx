/**
 * VideoGrid.jsx
 * Grid responsivo de cards com animação stagger na entrada
 * e AnimatePresence para remover cards com saída suave.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { VideoCard, cardVariants } from './VideoCard';

/** Container com stagger: cada filho entra 60ms depois do anterior */
const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function VideoGrid({ videos, isManageMode, onPlay, onRemove }) {
  return (
    <motion.div
      className="video-grid"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {videos.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            isManageMode={isManageMode}
            onPlay={() => onPlay(video)}
            onRemove={() => onRemove(video.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
