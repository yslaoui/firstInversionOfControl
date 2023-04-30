const { reverse } = require('../utils/for_testing')

describe('reverse', () => {
  test('reverse of one', () => {
    const result = reverse('a')
    expect(result).toBe('a')
  })

  test('reverse of many', () => {
    const result = reverse('react')
    expect(result).toBe('tcaer')
  })

  test('reverse of palyndrome', () => {
    const result = reverse('releveler')
    expect(result).toBe('releveler')
  })
})
