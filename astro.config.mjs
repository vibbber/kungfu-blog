// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://kungfu.family',
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    server: {
      watch: {
        ignored: ['**/node_modules/**']
      }
    }
  }
});
