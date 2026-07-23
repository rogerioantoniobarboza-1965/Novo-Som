/**
 * youtubeUtils.js
 * Funções utilitárias para trabalhar com URLs do YouTube.
 * Suporta todos os formatos comuns de link.
 */

/**
 * Extrai o ID de um vídeo do YouTube a partir de qualquer formato de URL.
 * Formatos suportados:
 *   - https://youtube.com/watch?v=XXXXX
 *   - https://youtu.be/XXXXX
 *   - https://youtube.com/embed/XXXXX
 *   - https://youtube.com/shorts/XXXXX
 *   - https://m.youtube.com/watch?v=XXXXX
 *
 * @param {string} url - URL do YouTube
 * @returns {string|null} ID do vídeo (11 caracteres) ou null se inválido
 */
export function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;

  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,           // ?v= ou &v=
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,       // youtu.be/
    /\/embed\/([a-zA-Z0-9_-]{11})/,         // /embed/
    /\/shorts\/([a-zA-Z0-9_-]{11})/,        // /shorts/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Retorna a URL da thumbnail em alta qualidade (hqdefault = 480×360).
 * Em caso de erro de carregamento, tente mqdefault (320×180) como fallback.
 *
 * @param {string} videoId - ID do vídeo (11 caracteres)
 * @returns {string} URL da thumbnail
 */
export function getThumbnailUrl(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Retorna a URL de embed do vídeo com autoplay e sem vídeos relacionados.
 *
 * @param {string} videoId - ID do vídeo (11 caracteres)
 * @returns {string} URL de embed
 */
export function getEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

/**
 * Valida se uma URL pertence ao YouTube e contém um ID válido.
 *
 * @param {string} url - URL a validar
 * @returns {boolean}
 */
export function isValidYouTubeUrl(url) {
  return extractYouTubeId(url) !== null;
}
