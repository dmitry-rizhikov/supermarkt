import { ProductRepositoryImpl } from '~~/repository/ProductRepository'
import type { ProductAmounts } from '~~/types/ProductAmounts'
import type { ProductInfo } from '~~/types/ProductInfo'
import type { ProductPrices } from '~~/types/ProductPrices'

interface ProductController {
  countProducts(products: string[]): ProductAmounts
  calculateTotals(productAmounts: ProductAmounts): Promise<ProductPrices>
  printInvoice(productPrices: ProductPrices): string
  getProductNames(scanString: string): Promise<string[]>
}

export class ProductControllerImpl implements ProductController {
  public countProducts(products: string[]): ProductAmounts {
    const result = {} as ProductAmounts

    for (const product of products) {
      if (!result[product]) {
        result[product] = 0
      }
      result[product] += 1
    }
    console.log('countProducts', JSON.stringify(result, null, 2))
    return result
  }

  public async calculateTotals(
    productAmounts: ProductAmounts,
  ): Promise<ProductPrices> {
    const result = {} as ProductPrices

    for (const product of Object.keys(productAmounts)) {
      const productInfo =
        await useStorage('supermarket').getItem<ProductInfo>(product)
      if (productInfo.offerAmount) {
        result[product] =
          Math.floor(productAmounts[product] / productInfo.offerAmount) *
            productInfo.offerPrice +
          (productAmounts[product] % productInfo.offerAmount) *
            productInfo.price
      } else {
        result[product] = productAmounts[product] * productInfo.price
      }
    }

    console.log('calculateTotals', JSON.stringify(result, null, 2))
    return result
  }

  async getProductNames(scanString: string): Promise<string[]> {
    const keys = await new ProductRepositoryImpl().getProductNames()
    const names = scanString.match(
      new RegExp(`(${keys.join('|')})`, 'gi'),
    ) as string[]
    console.log('getProductNames', JSON.stringify(names, null, 2))
    return names
  }

  printInvoice(productPrices: ProductPrices): string {
    return JSON.stringify(productPrices, null, 2)
  }
}
