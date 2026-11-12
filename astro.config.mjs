// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Absolute URLs for the sitemap, canonical links and Open Graph tags.
  site: 'https://stafy.ro',
  integrations: [
    react(),
    // Placeholder pages carry `noindex` (Layout.astro) and stay out of the sitemap.
    sitemap({ filter: (page) => !page.includes('/under-construction') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
}
);
