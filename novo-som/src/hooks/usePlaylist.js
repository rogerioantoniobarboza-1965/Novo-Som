/**
 * usePlaylist.js
 * Hook principal de gerenciamento de estado da playlist.
 * Persiste automaticamente no localStorage a cada alteração.
 */

import { useState, useCallback } from 'react';
import { extractYouTubeId } from '../utils/youtubeUtils';

const STORAGE_KEY = 'novo-som-playlist';

/** Carrega a playlist salva no localStorage. */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    console.warn('[Novo Som] Erro ao ler localStorage. Iniciando com lista vazia.');
    return [];
  }
}

/** Salva a playlist no localStorage. */
function saveToStorage(playlist) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist));
  } catch (err) {
    console.error('[Novo Som] Erro ao salvar no localStorage:', err);
  }
}

/**
 * Hook que gerencia a playlist completa.
 *
 * @returns {{ playlist, add, remove }}
 *   - playlist: Array de vídeos
 *   - add(formData): Adiciona um vídeo; retorna true em sucesso, false se URL inválida
 *   - remove(id): Remove um vídeo pelo id
 */
export function usePlaylist() {
  // Inicializa com a função para evitar leituras desnecessárias do localStorage
  const [playlist, setPlaylist] = useState(loadFromStorage);

  /**
   * Adiciona um novo vídeo à playlist.
   * @param {{ url, title, artist, type }} formData
   * @returns {boolean} true se adicionado com sucesso
   */
  const add = useCallback(({ url, title, artist, type }) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) return false;

    const newItem = {
      id:       `${videoId}-${Date.now()}`,
      videoId,
      url,
      title:    title.trim(),
      artist:   artist?.trim() ?? '',
      type,                                    // 'musica' | 'aula'
      addedAt:  Date.now(),
    };

    setPlaylist(prev => {
      const next = [newItem, ...prev];         // Mais recente primeiro
      saveToStorage(next);
      return next;
    });

    return true;
  }, []);

  /**
   * Remove um vídeo da playlist pelo seu id único.
   * @param {string} id
   */
  const remove = useCallback((id) => {
    setPlaylist(prev => {
      const next = prev.filter(v => v.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  return { playlist, add, remove };
}
