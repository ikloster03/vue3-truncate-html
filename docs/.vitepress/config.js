import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'vue3-truncate-html',
  description: 'A Vue 3 component for html truncating',
  themeConfig: {
    docsDir: 'docs',
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/ikloster03/vue3-truncate-html',
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        link: '/',
      },
      {
        text: 'Getting started',
        link: '/getting-started',
      },
      {
        text: 'API',
        link: '/api',
      },
      // {
      //   text: 'Examples',
      //   link: '/examples',
      // },
    ],
  }
})
