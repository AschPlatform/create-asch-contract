/// <reference lib="es6" />

import '../mock'
import SimpleContract from '../contract/SimpleContract'

describe('SimpleContract', () => {
  it('new SimpleContract()', () => {
    const simpleContract = new SimpleContract()

    expect(simpleContract.companyAddress).toBe('COMPANY_ADDRESS')
    expect(String(simpleContract.totalAmount)).toBe('1000000')
    expect(simpleContract.holding[simpleContract.companyAddress]).toEqual(simpleContract.totalAmount)
  })

  it('onPay', () => {
    const simpleContract = new SimpleContract()
    simpleContract.onPay(100, 'XAS')

    expect(simpleContract.holding[simpleContract.companyAddress]).toEqual(BigInt(999900))
    expect(simpleContract.holding['senderAddress']).toEqual(BigInt(100))
  })

  it('onPay error', () => {
    const simpleContract = new SimpleContract()

    expect(simpleContract.onPay.bind(simpleContract, 0)).toThrowError('stock must great than 0')
    expect(simpleContract.onPay.bind(simpleContract, 1, 'XAS2')).toThrowError('support XAS only')
  })

  it('play', () => {
    const simpleContract = new SimpleContract()
    simpleContract.onPay(100, 'XAS')

    let result = simpleContract.play(1)
    expect(result).toBe('lost 1')
    expect(simpleContract.holding[simpleContract.companyAddress]).toEqual(BigInt(999901))
    expect(simpleContract.holding['senderAddress']).toEqual(BigInt(99))

    result = simpleContract.play(2)
    expect(result).toBe('win 2')
    expect(simpleContract.holding[simpleContract.companyAddress]).toEqual(BigInt(999899))
    expect(simpleContract.holding['senderAddress']).toEqual(BigInt(101))
  })

  it('play error', () => {
    const simpleContract = new SimpleContract()
    simpleContract.onPay(100, 'XAS')

    expect(simpleContract.play.bind(simpleContract, 0)).toThrowError('invalid amount, must great than 0')
    expect(simpleContract.play.bind(simpleContract, 10000000)).toThrowError('holding less than 10000000')

    const simpleContract2 = new SimpleContract()
    expect(simpleContract2.play.bind(simpleContract2, 1)).toThrowError('please buy stock first')
  })
})
