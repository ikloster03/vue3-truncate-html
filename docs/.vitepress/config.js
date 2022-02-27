import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'vue3-truncate-html',
  description: 'A Vue 3 component for html truncating',
  locales: {
    '/en/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'vue3-truncate-html',
      description: ''
    },
    '/ru/': {
      lang: 'ru-RU', // this will be set as the lang attribute on <html>
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
      '/en/': [
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
      '/ru/': [
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
