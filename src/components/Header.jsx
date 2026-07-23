/**
 * Header.jsx
 * Cabeçalho fixo — transparente sobre o hero, sólido ao rolar.
 * Logo em Cormorant Garamond com versalete + botões de ação.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Header({ count, isManageMode, onAdd, onToggleManage, onBackup }) {
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para ativar o fundo sólido
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Logo */}
      <div className="brand">
        <span className="brand-title">Novo Som</span>
      </div>

      {/* Ações */}
      <div className="header-actions">
        <motion.button
          className="btn btn-ghost"
          onClick={onBackup}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          title="Baixar backup (.html)"
          aria-label="Baixar backup"
        >
          ⬇
        </motion.button>

        <motion.button
          className={`btn ${isManageMode ? 'btn-danger' : 'btn-secondary'}`}
          onClick={onToggleManage}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-pressed={isManageMode}
        >
          {isManageMode
            ? '✕ Sair'
            : <><span aria-hidden="true">⚙</span><span className="btn-label"> Gerenciar</span></>
          }
        </motion.button>

        <motion.button
          className="btn btn-primary"
          onClick={onAdd}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          +<span className="btn-label"> Adicionar</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
