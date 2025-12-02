import path from 'node:path'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'

import { remarkInclude } from './src/lib/plugin-remark.mjs'
import { rehypeBulmaTable, rehypeBulmaTitle, rehypeBulmaImage, rehypeBulmaYoutube } from './src/lib/plugin-rehype.mjs'

export default defineConfig({
  site: 'https://tutor4dev.com',
  integrations: [
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } })
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
    remarkPlugins: [remarkInclude],
    rehypePlugins: [rehypeBulmaTable, rehypeBulmaTitle, rehypeBulmaImage, rehypeBulmaYoutube],
  },
})