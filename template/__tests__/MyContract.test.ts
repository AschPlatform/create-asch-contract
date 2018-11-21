/// <reference lib="es6" />

import '../mock'
import MyContract from '../contract/MyContract'

describe('MyContract', () => {
  it('init', () => {
    const myContract = new MyContract()
    myContract.init()

    expect(myContract.companyAddress).toBe('COMPANY_ADDRESS')
    expect(String(myContract.totalAmount)).toBe('1000000')
    expect(myContract.holding.get(myContract.companyAddress)).toEqual(myContract.totalAmount)
  })

  it('onPay', () => {
    const myContract = new MyContract()
    myContract.init()
    myContract.onPay(100, 'XAS')

    expect(myContract.holding.get(myContract.companyAddress)).toEqual(BigInt(999900))
    expect(myContract.holding.get('senderAddress')).toEqual(BigInt(100))
  })

  it('onPay error', () => {
    const myContract = new MyContract()
    myContract.init()

    expect(myContract.onPay.bind(myContract, 0)).toThrowError('stock must great than 0')
    expect(myContract.onPay.bind(myContract, 1, 'XAS2')).toThrowError('support XAS only')
  })

  it('play', () => {
    const myContract = new MyContract()
    myContract.init()
    myContract.onPay(100, 'XAS')

    let result = myContract.play(1)
    expect(result).toBe('lost 1')
    expect(myContract.holding.get(myContract.companyAddress)).toEqual(BigInt(999901))
    expect(myContract.holding.get('senderAddress')).toEqual(BigInt(99))

    result = myContract.play(2)
    expect(result).toBe('win 2')
    expect(myContract.holding.get(myContract.companyAddress)).toEqual(BigInt(999899))
    expect(myContract.holding.get('senderAddress')).toEqual(BigInt(101))
  })

  it('play error', () => {
    const myContract = new MyContract()
    myContract.init()
    myContract.onPay(100, 'XAS')

    expect(myContract.play.bind(myContract, 0)).toThrowError('invalid amount, must great than 0')
    expect(myContract.play.bind(myContract, 10000000)).toThrowError('holding less than 10000000')

    const myContract2 = new MyContract()
    myContract2.init()
    expect(myContract2.play.bind(myContract2, 1)).toThrowError('please buy stock first')
  })
})
