import type { ProductInfo } from '~~/types/ProductInfo'

interface Repository {
  getProductNames: () => Promise<string[]>
  getProductInfo: (product: string) => Promise<ProductInfo>
}

export class RepositoryImpl implements Repository {
  public async getProductNames(): Promise<string[]> {
    return await useStorage('supermarket').getKeys()
  }

  public async getProductInfo(product: string): Promise<ProductInfo> {
    return await useStorage('supermarket').getItem<ProductInfo>(product)
  }
}
