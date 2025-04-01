import { ProductRepositoryImpl } from '~~/repository/ProductRepository'
import type { ProductAmounts } from '~~/types/ProductAmounts'
import type { ProductPrices } from '~~/types/ProductPrices'

interface ProductController {
  countProducts(products: string[]): ProductAmounts
  calculateTotals(productAmounts: ProductAmounts): Promise<ProductPrices>
  printInvoice(productPrices: ProductPrices): string
  getProductNames(scanString: string): Promise<string[]>
}

export class ProductControllerImpl implements ProductController {
  private readonly productRepository = new ProductRepositoryImpl()

  countProducts(products: string[]): ProductAmounts {
    const result = {} as ProductAmounts

    for (const product of products) {
      if (!result[product]) {
        result[product] = 0
      }
      result[product] += 1
    }
    return result
  }

  async calculateTotals(
    productAmounts: ProductAmounts,
  ): Promise<ProductPrices> {
    const result = {} as ProductPrices

    for (const [product, amount] of Object.entries(productAmounts)) {
      const productInfo = await this.productRepository.getProductInfo(product)
      let totalPrice = 0

      if (productInfo.offerPrice && productInfo.offerAmount) {
        totalPrice =
          Math.floor(amount / productInfo.offerAmount) *
            productInfo.offerPrice +
          (amount % productInfo.offerAmount) * productInfo.price
      } else {
        totalPrice = amount * productInfo.price
      }
      result[product] = totalPrice
    }
    return result
  }

  async getProductNames(scanString: string): Promise<string[]> {
    const keys = await this.productRepository.getProductNames()
    if (!keys || !keys.length) {
      return []
    }
    const pattern = `${keys.join('|')}`

    return scanString.match(new RegExp(pattern, 'gi')) as string[]
  }

  printInvoice(productPrices: ProductPrices): string {
    const array = []
    let totalPrice = 0
    for (const [product, total] of Object.entries(productPrices)) {
      totalPrice += total
      array.push(`${product}: ${total}`)
    }
    array.push('===============')
    array.push(`Total price: ${totalPrice}`)
    return array.join('<br/>\r\n')
  }
}
