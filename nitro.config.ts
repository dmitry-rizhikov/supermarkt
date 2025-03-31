//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-03-28',

  storage: {
    data: {
      driver: 'fs',
      base: './data',
    },
  },
})
