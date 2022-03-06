import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en',
  title: 'vue3-truncate-html',
  description: 'A Vue 3 component for html truncating',
  locales: {
    '/en/': {
      lang: 'en',
      title: 'vue3-truncate-html',
      description: ''
    },
    '/ru/': {
      lang: 'ru',
      title: 'vue3-truncate-html',
      description: ''
    },
  },
  themeConfig: {
    docsDir: 'docs',
    locales: {
      '/en/': {
        label: 'English',
        selectText: 'English',
      },
      '/ru/': {
        label: 'Русский',
        selectText: 'Русский',
      },
    },
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/ikloster03/vue3-truncate-html',
      },
    ],
    sidebar: {
      'en': [
        {
          text: 'Introduction',
          link: '/en/index',
        },
        {
          text: 'Getting started',
          link: '/en/getting-started',
        },
        {
          text: 'API',
          link: '/en/api',
        },
        // {
        //   text: 'Examples',
        //   link: '/examples',
        // },
      ],
      'ru': [
        {
          text: 'Вступление',
          link: '/ru/index',
        },
        {
          text: 'Быстрый старт',
          link: '/ru/getting-started',
        },
        {
          text: 'API',
          link: '/ru/api',
        },
        // {
        //   text: 'Examples',
        //   link: '/examples',
        // },
      ]
    }
  }
})
