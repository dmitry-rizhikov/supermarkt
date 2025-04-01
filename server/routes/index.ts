import { ProductControllerImpl } from '~~/controller/ProductController'

export default defineEventHandler(async (event) => {
  const { scan } = getQuery<Record<string, string>>(event)
  if (!scan) {
    return `Invalid "scan" query parameter: "${scan}"`
  }

  const controller = new ProductControllerImpl()
  const products = await controller.getProductNames(scan)
  if (!products || !products.length) {
    return 'No valid products identified'
  }
  const productAmounts = controller.countProducts(products)
  const productPrices = await controller.calculateTotals(productAmounts)
  return controller.printInvoice(productPrices)
})
