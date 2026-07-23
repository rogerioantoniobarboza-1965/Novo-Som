import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Configuração do Vite para o Novo Som.
 *
 * IMPORTANTE: Troque o valor de `base` pelo nome exato do seu
 * repositório no GitHub antes de fazer o deploy.
 *
 * Exemplo: se seu repositório é github.com/usuario/meu-som
 * use  base: '/meu-som/'
 */
export default defineConfig({
  plugins: [react()],
  base: '/Novo-Som/',
});
