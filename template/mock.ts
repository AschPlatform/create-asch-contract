/// <reference types="asch-contract-types" />

import * as aschContractCore from 'asch-contract-core'

const getContext = (function () {
  let height = 0
  return function () {
    height++
    return {
      transaction: { id: String(height), args: [] },
      senderAddress: 'senderAddress',
      block: { height, timestamp: height, version: 'v1.0' }
    }
  }
})()

class AschContract {
  get context (): ContractContext {
    return getContext()
  }

  protected transfer (recipientAddress: string, amount: number | string | BigInt , currency: string): void {}
}

global.AschContract = AschContract
global.Mapping = aschContractCore.Mapping.Mapping
global.assert = aschContractCore.assert.assert
global.require = aschContractCore.assert.require
