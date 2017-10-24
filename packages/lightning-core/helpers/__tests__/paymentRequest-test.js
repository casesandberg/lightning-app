import { decoratePaymentRequest, sanitizePaymentRequest } from '../paymentRequest'

describe('decoratePaymentRequest', () => {
  test('prepends lightning prefix', () => {
    expect(decoratePaymentRequest('test-string')).toBe('lightning://test-string')
  })
})

describe('sanitizePaymentRequest', () => {
  test('removes lightning prefix', () => {
    expect(sanitizePaymentRequest('lightning://test-string')).toBe('test-string')
  })
})
