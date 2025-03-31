import { ProductControllerImpl } from '~~/controller/ProductController'

export default defineEventHandler(async (event) => {
  const { scan } = getQuery<Record<string, string>>(event)

  const controller = new ProductControllerImpl()
  const products = await controller.getProductNames(scan)
  const productAmounts = controller.countProducts(products)
  const productPrices = await controller.calculateTotals(productAmounts)
  return controller.printInvoice(productPrices)
})
