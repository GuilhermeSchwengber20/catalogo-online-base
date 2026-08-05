export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/device'
  ],

  features: {
    inlineStyles: true
  },

  // fonts: {
  //   defaults: {
  //     preload: true,
  //   }
  // },
  image: {
    domains: [
      '://cloudinary.com',
      '://unsplash.com'
    ]
  },

  ui: {
    colorMode: false,
    fonts: false
  },

  ssr: true,

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        {
          rel: 'preload',
          href: '/fonts/font-main.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || ''
    }
  },

  routeRules: {
    // '/': { prerender: true },
    '/category/**': { ssr: true },
    '/product/**': { ssr: true },
    '/admin/**': { ssr: false }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    minify: true,
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})