import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ru',
  title: 'vue3-truncate-html',
  description: 'Vue 3 компонент для обрезки HTML с санитизацией',

  locales: {
    root: {
      label: 'Русский',
      lang: 'ru',
      title: 'vue3-truncate-html',
      description: 'Vue 3 компонент для обрезки HTML с санитизацией',
      themeConfig: {
        nav: [
          {
            text: 'Github',
            link: 'https://github.com/ikloster03/vue3-truncate-html',
          },
          {
            text: 'NPM',
            link: 'https://www.npmjs.com/package/vue3-truncate-html',
          },
        ],
        sidebar: [
          {
            text: 'Вступление',
            link: '/',
          },
          {
            text: 'Быстрый старт',
            link: '/getting-started',
          },
          {
            text: 'API',
            link: '/api',
          },
          {
            text: 'Тестирование',
            link: '/testing',
          },
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'vue3-truncate-html',
      description: 'A Vue 3 component for html truncating with sanitizing',
      themeConfig: {
        nav: [
          {
            text: 'Github',
            link: 'https://github.com/ikloster03/vue3-truncate-html',
          },
          {
            text: 'NPM',
            link: 'https://www.npmjs.com/package/vue3-truncate-html',
          },
        ],
        sidebar: [
          {
            text: 'Introduction',
            link: '/en/',
          },
          {
            text: 'Getting Started',
            link: '/en/getting-started',
          },
          {
            text: 'API',
            link: '/en/api',
          },
          {
            text: 'Testing',
            link: '/en/testing',
          },
        ]
      }
    }
  },

  themeConfig: {
    docsDir: 'docs',
  }
})
