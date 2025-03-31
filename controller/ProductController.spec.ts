import { describe, expect, it, vi } from 'vitest'
import { ProductControllerImpl } from './ProductController'

describe('ProductController', () => {
  useStorage('supermarket')

  it.each([['banana', ['banana']]])(
    'should get the expected product names from scan string',
    async (scanString, namesArray) => {
      expect(
        await new ProductControllerImpl().getProductNames(scanString),
      ).toEqual(namesArray)
    },
  )
})
