import { defineConfig } from 'astro/config';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [tina()],
  vite: {
    plugins: [tinaAdminDevRedirect(), tailwindcss()],
  },
});