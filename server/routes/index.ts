import { calculateTotals, toCounted } from '~/utils/utils'

export default defineEventHandler(async (event) => {
  const { scan } = getQuery<Record<string, string>>(event)
  console.log('scan', scan)

  console.log('apple', await useStorage('supermarket').getItem('apple'))
  console.log('banana', await useStorage('supermarket').getItem('banana'))
  const keys = await useStorage('supermarket').getKeys()
  console.log('supermarket keys', keys)

  console.log(`(${keys.join('|')})`)
  const products = scan.match(new RegExp(`(${keys.join('|')})`, 'gi'))
  console.log('products', JSON.stringify(products, null, 2))

  const amounts = toCounted(products)
  console.log('amounts', JSON.stringify(amounts, null, 2))

  const totals = await calculateTotals(amounts)
  console.log('totals', JSON.stringify(totals, null, 2))

  return 'Hello World!'
})
