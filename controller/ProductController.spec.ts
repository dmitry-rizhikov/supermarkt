import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProductControllerImpl } from '~~/controller/ProductController'
import { ProductRepositoryImpl } from '~~/repository/ProductRepository'

describe('ProductController', async () => {
  beforeEach(() => {
    vi.spyOn(
      ProductRepositoryImpl.prototype,
      'getProductInfo',
    ).mockResolvedValue({ price: 30, offerPrice: 45, offerAmount: 2 })
    vi.spyOn(
      ProductRepositoryImpl.prototype,
      'getProductNames',
    ).mockResolvedValue(['banana', 'apple', 'kiwi'])
  })

  it.each([
    ['banana', ['banana']],
    ['banana,apple,kiwi,peach', ['banana', 'apple', 'kiwi', 'peach']],
    ['banana^apple%kiwi(peach@', ['banana', 'apple', 'kiwi', 'peach']],
    ['bread,butter', null],
  ])(
    'should get the expected product names from scan string "%s"',
    async (scanString, namesArray) => {
      expect(
        await new ProductControllerImpl().getProductNames(scanString),
      ).toEqual(namesArray)
    },
  )
})
