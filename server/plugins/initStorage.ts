export default defineNitroPlugin(async () => {
  await useStorage('supermarket').setItems([
    {
      key: 'supermarket:apple',
      value: { price: 30, offerPrice: 45, offerAmount: 2 },
    },
    {
      key: 'supermarket:banana',
      value: { price: 50, offerPrice: 130, offerAmount: 3 },
    },
    {
      key: 'supermarket:peach',
      value: { price: 60 },
    },
    {
      key: 'supermarket:kiwi',
      value: { price: 20 },
    },
  ])

  console.info('storage initialized!')
})
