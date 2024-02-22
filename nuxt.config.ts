// import { defineNuxtConfig } from 'nuxt'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/color-mode',
        '@vueuse/nuxt',
        '@sidebase/nuxt-session',
        '@kevinmarrec/nuxt-pwa',
        'nuxt-icon'
    ],
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? [
                    'naive-ui',
                    'vueuc',
                    '@css-render/vue3-ssr',
                    '@juggle/resize-observer'
                ]
                : ['@juggle/resize-observer']
    },
    pwa: {
        manifest: {
            name: 'Nuxt Sushi',
            short_name: 'Sushi',
            background_color: '#3b3b3b',
            lang: 'en',
        }
    },
    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
                    : []
        }
    },
    app: {
        head: {
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1',
          "google-site-verification": 'MSmy-J4XDNXLBlFKqvooWG7RzHPvXmjhSo1BWtgF40E',
        }
    }
})