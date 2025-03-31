import type { ProductInfo } from '~~/types/ProductInfo'

interface ProductRepository {
  getProductNames: () => Promise<string[]>
  getProductInfo: (product: string) => Promise<ProductInfo>
}

export class ProductRepositoryImpl implements ProductRepository {
  async getProductNames(): Promise<string[]> {
    return await useStorage('supermarket').getKeys()
  }

  async getProductInfo(product: string): Promise<ProductInfo> {
    return await useStorage('supermarket').getItem<ProductInfo>(product)
  }
}
