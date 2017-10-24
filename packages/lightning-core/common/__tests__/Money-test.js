import React from 'react'
import { shallow } from 'enzyme'

import { Money, MoneyCode, MoneySign } from '../Money'

describe('Money', () => {
  test('returns an amount', () => {
    const component = shallow(<Money currency="btc" amount={ 140000000 } />)
    expect(component.text()).toBe('1.4000')
  })

  test('returns an amount with a sign', () => {
    const component = shallow(<Money currency="btc" amount={ 140000000 } sign />)
    expect(component.text()).toBe('฿ 1.4000')
  })
})

describe('MoneyCode', () => {
  test('returns a code', () => {
    const component = shallow(<MoneyCode currency="btc" />)
    expect(component.text()).toBe('BTC')
  })
})

describe('MoneySign', () => {
  test('returns a sign', () => {
    const component = shallow(<MoneySign currency="btc" />)
    expect(component.text()).toBe('฿')
  })
})
