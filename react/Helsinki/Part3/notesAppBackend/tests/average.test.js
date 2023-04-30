const { average } = require('../utils/for_testing')

describe('average', () => {
  test('average of one', () => {
    const result = average([1])
    expect(result).toBe(1)
  })

  test('average of many', () => {
    const result = average([1, 2, 3, 4, 5, 6])
    expect(result).toBe(3.5) 
  })

  test('average of empty', () => {
    const result = average([])
    expect(result).toBe(0)
  })
})
