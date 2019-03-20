/// <reference lib="es6" />

import '../mock'
import SimpleContract from '../contract/SimpleContract'

describe('SimpleContract', () => {
  it('new SimpleContract()', () => {
    const simpleContract = new SimpleContract()

    expect(simpleContract.companyAddress).toBe('COMPANY_ADDRESS')
    expect(simpleContract.holding[simpleContract.companyAddress]).toEqual(100n)
  })

  it('onPay', () => {
    const simpleContract = new SimpleContract()
    simpleContract.onPay(1n, 'XAS')

    expect(simpleContract.holding[simpleContract.companyAddress]).toEqual(98n)
    expect(simpleContract.holding['senderAddress']).toEqual(2n)
  })

  it('onPay error', () => {
    const simpleContract = new SimpleContract()

    expect(simpleContract.onPay.bind(simpleContract, 0)).toThrowError('XAS amount must great than 0')
    expect(simpleContract.onPay.bind(simpleContract, 1, 'XAS2')).toThrowError('support XAS only')
  })

  it('play', () => {
    const simpleContract = new SimpleContract()
    simpleContract.onPay(2n, 'XAS')

    let result = simpleContract.play(1)
    expect(result).toBe('lost 1')
    expect(simpleContract.holding[simpleContract.companyAddress]).toEqual(97n)
    expect(simpleContract.holding['senderAddress']).toEqual(3n)

    result = simpleContract.play(2)
    expect(result).toBe('win 2')
    expect(simpleContract.holding[simpleContract.companyAddress]).toEqual(95n)
    expect(simpleContract.holding['senderAddress']).toEqual(5n)
  })

  it('play error', () => {
    const simpleContract = new SimpleContract()
    simpleContract.onPay(1n, 'XAS')

    expect(simpleContract.play.bind(simpleContract, 0)).toThrowError('stock amount must great than 0')
    expect(simpleContract.play.bind(simpleContract, 101)).toThrowError('holding 2 stock less than 101')

    const simpleContract2 = new SimpleContract()
    expect(simpleContract2.play.bind(simpleContract2, 1)).toThrowError('holding 0 stock less than 1')
  })
})
