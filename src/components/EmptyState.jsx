/**
 * EmptyState.jsx — com tipografia Cormorant Garamond.
 */

import { motion } from 'framer-motion';

export function EmptyState({ hasItems, onAdd }) {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="empty-icon" aria-hidden="true">
        {hasItems ? '🔍' : '🎸'}
      </div>
      <h2 className="empty-title">
        {hasItems ? 'Nenhum resultado' : 'Playlist vazia'}
      </h2>
      <p className="empty-desc">
        {hasItems
          ? 'Tente um termo diferente ou mude a aba de filtro.'
          : 'Adicione músicas e aulas de guitarra do YouTube para começar.'}
      </p>
      {!hasItems && (
        <motion.button
          className="btn btn-primary"
          onClick={onAdd}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          + Adicionar primeiro vídeo
        </motion.button>
      )}
    </motion.div>
  );
}
