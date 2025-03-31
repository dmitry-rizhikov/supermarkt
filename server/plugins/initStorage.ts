import data from '~~/data/data.json'

export default defineNitroPlugin(async () => {
  await useStorage('supermarket').setItems(data)

  console.info('storage initialized!')
})
