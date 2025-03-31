import type { ProductAmounts } from '~~/types/ProductAmounts'
import type { ProductInfo } from '~~/types/ProductInfo'
import type { ProductPrices } from '~~/types/ProductPrices'

export function toCounted(products: string[]): ProductAmounts {
  const result = {} as ProductAmounts

  for (const product of products) {
    if (!result[product]) {
      result[product] = 0
    }
    result[product] += 1
  }

  return result
}

export async function calculateTotals(
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
        (productAmounts[product] % productInfo.offerAmount) * productInfo.price
    } else {
      result[product] = productAmounts[product] * productInfo.price
    }
  }

  return result
}
