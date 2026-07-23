/**
 * AddModal.jsx
 * Modal de adição com estética KOPKE: fundo escuro, linhas douradas sutis.
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { isValidYouTubeUrl } from '../utils/youtubeUtils';

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0, transition: { delay: 0.05 } },
};

const panelVariants = {
  hidden:  { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 28 } },
  exit:    { opacity: 0, y: 48, transition: { duration: 0.18 } },
};

const INITIAL = { url: '', title: '', artist: '', type: 'musica' };

export function AddModal({ onAdd, onClose }) {
  const [form,   setForm]   = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const urlRef = useRef(null);

  useEffect(() => { urlRef.current?.focus(); }, []);
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  function setField(f) {
    return e => {
      setForm(prev => ({ ...prev, [f]: e.target.value }));
      if (errors[f]) setErrors(prev => ({ ...prev, [f]: '' }));
    };
  }

  function validate() {
    const errs = {};
    if (!form.url.trim())              errs.url   = 'Cole o link do YouTube';
    else if (!isValidYouTubeUrl(form.url)) errs.url = 'URL inválida — use um link do YouTube';
    if (!form.title.trim())            errs.title = 'Informe o título do vídeo';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onAdd(form);
  }

  return (
    <motion.div
      className="modal-overlay"
      variants={overlayVariants}
      initial="hidden" animate="visible" exit="exit"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="modal-panel"
        variants={panelVariants}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-pill" aria-hidden="true" />

        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">Adicionar Vídeo</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label className="form-label" htmlFor="add-url">Link do YouTube *</label>
            <input
              id="add-url" ref={urlRef} type="url" inputMode="url"
              className={`form-input ${errors.url ? 'error' : ''}`}
              placeholder="https://youtube.com/watch?v=..."
              value={form.url} onChange={setField('url')}
              aria-invalid={!!errors.url}
            />
            {errors.url && <p className="form-error" role="alert">⚠ {errors.url}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="add-title">Título *</label>
            <input
              id="add-title" type="text"
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Nome da música ou aula"
              value={form.title} onChange={setField('title')}
              aria-invalid={!!errors.title}
            />
            {errors.title && <p className="form-error" role="alert">⚠ {errors.title}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="add-artist">
              Artista / Professor <span className="form-optional">(opcional)</span>
            </label>
            <input
              id="add-artist" type="text"
              className="form-input"
              placeholder="Ex: John Mayer"
              value={form.artist} onChange={setField('artist')}
            />
          </div>

          <div className="form-group">
            <p className="form-label" id="type-label">Tipo</p>
            <div className="type-options" role="radiogroup" aria-labelledby="type-label">
              <label className="type-option">
                <input type="radio" name="type" value="musica" checked={form.type === 'musica'} onChange={setField('type')} />
                <span className="type-option-label">🎵 Música</span>
              </label>
              <label className="type-option">
                <input type="radio" name="type" value="aula" checked={form.type === 'aula'} onChange={setField('type')} />
                <span className="type-option-label">🎸 Aula</span>
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Adicionar</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
