// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static',
  adapter: netlify(),
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
