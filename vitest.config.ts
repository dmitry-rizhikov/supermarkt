import { defineConfig } from 'vitest/config'

const root = new URL('./', import.meta.url)

export default defineConfig({
  test: {
    alias: {
      '@/': root.pathname,
      '@@/': root.pathname,
      '~/': root.pathname,
      '~~/': root.pathname,
    },
  },
})
