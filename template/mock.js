const aschContractCore = require('asch-contract-core')

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
  get context () {
    return getContext()
  }

  transfer (recipientAddress, amount, currency) {}
}

global.AschContract = AschContract
global.Mapping = aschContractCore.Mapping.Mapping
global.Vector = aschContractCore.Vector.Vector
global.Crypto = aschContractCore.Crypto.Crypto
global.assert = aschContractCore.assert.assert
global.ByteBuffer = aschContractCore.ByteBuffer.ByteBuffer
global.Util = aschContractCore.Util.Util
global.payable = () => () => {}
global.constant = () => () => {}
