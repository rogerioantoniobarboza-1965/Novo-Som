/**
 * App.jsx — v2
 * Layout: Header fixo → HeroSection (split) → Content (filtros + grid)
 */

import { useState, useMemo, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Header }       from './components/Header';
import { HeroSection }  from './components/HeroSection';
import { FilterBar }    from './components/FilterBar';
import { VideoGrid }    from './components/VideoGrid';
import { AddModal }     from './components/AddModal';
import { PlayerModal }  from './components/PlayerModal';
import { EmptyState }   from './components/EmptyState';

import { usePlaylist }        from './hooks/usePlaylist';
import { generateBackupHTML } from './utils/backupUtils';

import './styles/globals.css';

export default function App() {
  const { playlist, add, remove } = usePlaylist();

  const [search,       setSearch]       = useState('');
  const [tab,          setTab]          = useState('todas');
  const [isManageMode, setIsManageMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeVideo,  setActiveVideo]  = useState(null);

  // Ref para scroll suave até a playlist
  const contentRef = useRef(null);

  /* Playlist filtrada */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return playlist.filter(v => {
      const matchSearch = !q ||
        v.title.toLowerCase().includes(q) ||
        v.artist.toLowerCase().includes(q);
      const matchTab =
        tab === 'todas' ||
        (tab === 'musicas' && v.type === 'musica') ||
        (tab === 'aulas'   && v.type === 'aula');
      return matchSearch && matchTab;
    });
  }, [playlist, search, tab]);

  const counts = useMemo(() => ({
    todas:   playlist.length,
    musicas: playlist.filter(v => v.type === 'musica').length,
    aulas:   playlist.filter(v => v.type === 'aula').length,
  }), [playlist]);

  function handleAdd(formData) {
    const ok = add(formData);
    if (ok) setShowAddModal(false);
  }

  const handleBackup = useCallback(() => {
    if (playlist.length === 0) {
      alert('Adicione ao menos um vídeo antes de fazer backup.');
      return;
    }
    const html = generateBackupHTML(playlist);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `novo-som-backup-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [playlist]);

  function handleTabChange(newTab) {
    setTab(newTab);
    setSearch('');
  }

  function handleOpenAdd() {
    setIsManageMode(false);
    setShowAddModal(true);
  }

  // Scroll suave até a seção de playlist ao clicar no CTA do hero
  function scrollToPlaylist() {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="app">
      {/* Header fixo — transparente → sólido ao rolar */}
      <Header
        count={playlist.length}
        isManageMode={isManageMode}
        onAdd={handleOpenAdd}
        onToggleManage={() => setIsManageMode(v => !v)}
        onBackup={handleBackup}
      />

      {/* Hero: texto à esquerda, vídeo à direita */}
      <HeroSection onScrollToPlaylist={scrollToPlaylist} />

      {/* Conteúdo principal: filtros + grid */}
      <main className="content-area" ref={contentRef}>
        <FilterBar
          search={search}
          tab={tab}
          counts={counts}
          onSearch={setSearch}
          onTabChange={handleTabChange}
        />

        {filtered.length > 0 ? (
          <VideoGrid
            videos={filtered}
            isManageMode={isManageMode}
            onPlay={setActiveVideo}
            onRemove={remove}
          />
        ) : (
          <EmptyState
            hasItems={playlist.length > 0}
            onAdd={handleOpenAdd}
          />
        )}
      </main>

      {/* Modais */}
      <AnimatePresence>
        {showAddModal && (
          <AddModal
            key="add-modal"
            onAdd={handleAdd}
            onClose={() => setShowAddModal(false)}
          />
        )}
        {activeVideo && (
          <PlayerModal
            key="player-modal"
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
