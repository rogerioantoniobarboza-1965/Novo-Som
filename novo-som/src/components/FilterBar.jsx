/**
 * FilterBar.jsx
 * Abas com sublinhado dourado (estilo editorial) + busca por texto.
 */

import { motion } from 'framer-motion';

const TABS = [
  { id: 'todas',   label: 'Todas'   },
  { id: 'musicas', label: 'Músicas' },
  { id: 'aulas',   label: 'Aulas'   },
];

export function FilterBar({ search, tab, counts, onSearch, onTabChange }) {
  return (
    <motion.div
      className="filter-bar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Abas com sublinhado dourado */}
      <div className="tabs" role="tablist" aria-label="Filtrar por tipo">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`tab-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => onTabChange(t.id)}
          >
            {t.label}
            <span className="tab-count">({counts[t.id]})</span>
          </button>
        ))}
      </div>

      {/* Campo de busca */}
      <div className="search-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="search-input"
          placeholder="Buscar por título ou artista..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          aria-label="Buscar na playlist"
        />
      </div>
    </motion.div>
  );
}
