import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ProductControllerImpl } from '~~/controller/ProductController'
import { ProductRepositoryImpl } from '~~/repository/ProductRepository'

describe('ProductController', async () => {
  beforeEach(() => {
    vi.spyOn(
      ProductRepositoryImpl.prototype,
      'getProductInfo',
    ).mockResolvedValue({
      product: 'apple',
      price: 30,
      offerPrice: 45,
      offerAmount: 2,
    })
    vi.spyOn(
      ProductRepositoryImpl.prototype,
      'getProductNames',
    ).mockResolvedValue(['banana', 'apple', 'kiwi', 'peach'])
  })

  afterEach(vi.restoreAllMocks)

  it.each([
    ['banana', ['banana']],
    ['banana,apple,kiwi,peach', ['banana', 'apple', 'kiwi', 'peach']],
    ['banana^apple%kiwi(peach@', ['banana', 'apple', 'kiwi', 'peach']],
    ['bananaxxxappleyyykiwihhhpeachmm', ['banana', 'apple', 'kiwi', 'peach']],
    ['bread,butter', null],
    ['', null],
  ])(
    'should get the expected product names from scan string "%s"',
    async (scanString, namesArray) => {
      expect(
        await new ProductControllerImpl().getProductNames(scanString),
      ).toEqual(namesArray)
    },
  )

  it.each([
    [[], {}],
    [['apple'], { apple: 1 }],
    [['apple', 'apple', 'apple'], { apple: 3 }],
    [
      ['apple', 'apple', 'apple', 'banana', 'kiwi', 'kiwi'],
      { apple: 3, banana: 1, kiwi: 2 },
    ],
    [
      [
        'apple',
        'apple',
        'apple',
        'banana',
        'kiwi',
        'kiwi',
        'banana',
        'apple',
        'kiwi',
        'banana',
        'banana',
      ],
      { apple: 4, banana: 4, kiwi: 3 },
    ],
  ])('should count the products "%o"', (products, amounts) => {
    expect(new ProductControllerImpl().countProducts(products)).toEqual(amounts)
  })

  it.each([
    [{ apple: 1 }, { apple: 30 }],
    [{ apple: 2 }, { apple: 45 }],
    [{ apple: 3 }, { apple: 75 }],
    [{ apple: 123 }, { apple: (122 / 2) * 45 + 30 }],
  ])('should calculate the totals for "%o', async (amounts, totals) => {
    expect(await new ProductControllerImpl().calculateTotals(amounts)).toEqual(
      totals,
    )
  })

  it.each([
    [{ apple: 12 }, 'apple: 12\n===============\nTotal price: 12'],
    [
      { apple: 1, kiwi: 2 },
      'apple: 1\nkiwi: 2\n===============\nTotal price: 3',
    ],
    [
      { apple: 123, kiwi: 987 },
      'apple: 123\nkiwi: 987\n===============\nTotal price: 1110',
    ],
    [
      { apple: 2, kiwi: 3, peach: 4, banana: 99, brot: 654 },
      'apple: 2\nkiwi: 3\npeach: 4\nbanana: 99\nbrot: 654\n===============\nTotal price: 762',
    ],
  ])(
    'should print the totals as expected for %o',
    (productPrices, printout) => {
      expect(new ProductControllerImpl().printInvoice(productPrices)).toEqual(
        printout,
      )
    },
  )
})
