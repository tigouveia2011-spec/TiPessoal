import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente (do ficheiro .env ou do sistema)
  // O terceiro argumento '' permite carregar todas as variáveis, não apenas VITE_
  // Fix: Cast process to any to resolve error "Property 'cwd' does not exist on type 'Process'"
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Isto permite usar 'process.env.API_KEY' no código do browser sem crashar
      'process.env': env
    }
  };
});