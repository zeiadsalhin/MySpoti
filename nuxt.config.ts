import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'My Spoti',
      link: [{ rel: 'icon', type: 'image/x-icon', href: "/mainicon.ico" }],
  meta: [
    { hid: 'description', name: 'description', content: 'Welcome to My Spoti, a stats fm alternative for spotify activity' }
  ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@emanuele-em/nuxt-swipe',
    '@pinia/nuxt',
    // ['nuxt-mail', {
    //   message: {
    //     name: 'support',
    //     to: 'support@alfa.store',
    //     bcc: 'zeyadali011@gmail.com'
    //   },
    //   smtp: {
    //     host: "smtp-relay.brevo.com",
    //     port: 587,
    //     auth: {
    //       user: 'pactelcompany@gmail.com',
    //       pass: 'BR6GmALtE9apUQ5C',
    //     },
    //   },
    // }],
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  css: [`assets/css/main.css`],
  // vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

)
