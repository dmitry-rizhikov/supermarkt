import {beforeAll, describe, expect, it} from 'vitest'
import {type NitroContext, setupTests} from '~~/test/tests'

describe('index', async () => {
  let nitroCtx: NitroContext

  beforeAll(async () => {
    nitroCtx = await setupTests()
  })

  it('should print "No valid products identified"', async () => {
    const response = await nitroCtx.fetch('/?scan=xxxxx')
    expect(await response.text()).toEqual('No valid products identified')
  })

  it.each([
    [undefined, ''],
    ['', 'scan'],
    ['', 'scan='],
  ])(
    'should print \'Invalid "scan" query parameter: "%s"\' for "%s"',
    async (value, scan) => {
      const response = await nitroCtx.fetch(`/?${scan}`)
      expect(await response.text()).toEqual(
        `Invalid "scan" query parameter: "${value}"`,
      )
    },
  )

  it('should print the expected totals', async () => {
    const response = await nitroCtx.fetch(
      '/?scan=banana,apple,banana,apple,banana,kiwi,bred',
    )
    const responseText = await response.text()
    expect(responseText).toEqual(
      'banana: 130<br/>\r\napple: 45<br/>\r\nkiwi: 20<br/>\r\n===============<br/>\r\nTotal price: 195',
    )
  })
})
