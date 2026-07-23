/**
 * backupUtils.js
 * Gera um arquivo .html standalone com todos os dados da playlist.
 * O arquivo pode ser aberto no navegador sem servidor.
 */

/**
 * Gera o HTML do backup com todos os vídeos e estatísticas.
 *
 * @param {Array} playlist - Array de objetos de vídeo
 * @returns {string} HTML completo como string
 */
export function generateBackupHTML(playlist) {
  const total   = playlist.length;
  const musicas = playlist.filter(v => v.type === 'musica').length;
  const aulas   = playlist.filter(v => v.type === 'aula').length;
  const date    = new Date().toLocaleString('pt-BR');

  const cards = playlist.map(video => `
    <div class="card">
      <a href="https://youtube.com/watch?v=${video.videoId}" target="_blank" rel="noopener">
        <img
          src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg"
          alt="${escapeHtml(video.title)}"
          loading="lazy"
          onerror="this.src='https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg'"
        />
        <div class="card-play">▶</div>
      </a>
      <div class="card-body">
        <h3>${escapeHtml(video.title)}</h3>
        ${video.artist ? `<p class="artist">${escapeHtml(video.artist)}</p>` : ''}
        <div class="card-meta">
          <span class="badge ${video.type}">${video.type === 'musica' ? '🎵 Música' : '🎸 Aula'}</span>
          <span class="date">${new Date(video.addedAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Novo Som — Backup ${date}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: #08080E;
      color: #F0EEF6;
      padding: 2rem 1.25rem 4rem;
      -webkit-font-smoothing: antialiased;
    }

    .page-header { margin-bottom: 2rem; }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .logo-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #FF6B35, #FF8A5C);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      box-shadow: 0 4px 16px rgba(255,107,53,0.3);
    }

    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.6rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .subtitle { color: #6A6A82; font-size: 0.85rem; margin-top: 0.25rem; }

    /* Estatísticas */
    .stats {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .stat {
      background: #13131C;
      border: 1px solid rgba(255,107,53,0.12);
      border-radius: 12px;
      padding: 0.875rem 1.25rem;
      min-width: 90px;
    }

    .stat-value {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: #FF6B35;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #6A6A82;
      margin-top: 0.25rem;
      letter-spacing: 0.03em;
    }

    /* Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1rem;
    }

    .card {
      background: #13131C;
      border: 1px solid rgba(255,107,53,0.1);
      border-radius: 14px;
      overflow: hidden;
      transition: transform 0.2s, border-color 0.2s;
    }

    .card:hover {
      transform: translateY(-3px);
      border-color: rgba(255,107,53,0.25);
    }

    .card a { position: relative; display: block; }

    .card img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
    }

    .card-play {
      position: absolute;
      inset: 0;
      background: rgba(8,8,14,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      opacity: 0;
      transition: opacity 0.2s;
      color: #FF6B35;
    }

    .card:hover .card-play { opacity: 1; }

    .card-body { padding: 0.875rem; }

    h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.45;
      margin-bottom: 0.3rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .artist { font-size: 0.78rem; color: #6A6A82; margin-bottom: 0.5rem; }

    .card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
    }

    .badge {
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 2px 8px;
      border-radius: 99px;
    }

    .badge.musica { background: rgba(255,107,53,0.1); color: #FF6B35; }
    .badge.aula   { background: rgba(74,144,217,0.1); color: #4A90D9; }

    .date { font-size: 0.72rem; color: #6A6A82; }

    @media (max-width: 480px) {
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header class="page-header">
    <div class="logo">
      <div class="logo-icon">🎵</div>
      <h1>Novo Som</h1>
    </div>
    <p class="subtitle">Backup gerado em ${date}</p>
  </header>

  <div class="stats">
    <div class="stat">
      <div class="stat-value">${total}</div>
      <div class="stat-label">Total</div>
    </div>
    <div class="stat">
      <div class="stat-value">${musicas}</div>
      <div class="stat-label">Músicas</div>
    </div>
    <div class="stat">
      <div class="stat-value">${aulas}</div>
      <div class="stat-label">Aulas</div>
    </div>
  </div>

  <main class="grid">
    ${cards}
  </main>

  <script>
    // Dados completos da playlist em JSON para restauração futura
    const PLAYLIST_BACKUP = ${JSON.stringify(playlist, null, 2)};
    console.log('[Novo Som] Dados do backup:', PLAYLIST_BACKUP);
  </script>
</body>
</html>`;
}

/**
 * Escapa caracteres especiais HTML para evitar XSS no backup.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
