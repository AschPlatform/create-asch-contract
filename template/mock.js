const fs = require('fs')
const path = require('path')
const aschContractCore = require('asch-contract-core')

const getContext = (function () {
  let height = 0
  return function () {
    height++
    return {
      transaction: {
        id: '2f93e9918b43505bcc60e30e92e030eb8721f436b42d04a341da309f7553517c',
        type: 1,
        timestamp: 89024675,
        senderId: 'AC8d6BmvJ4AeftmCNTMVeweCBH96ke2d4D',
        senderPublicKey: 'cb4611c0cc1978bb2d57a18c68481c07a7ed4345e5fb0d51ceeaca6f82a39837',
        fee: 0,
        signatures: [
          'a8ef647bbe08d7c37852d145a53fe19a853f7e1378df08d0347a4684d40ca36e1a5e22ddc88bef402b6c5ac494ad3586109a49d34f705388faed96b9d2eca00c'
        ],
        secondSignature: undefined,
        args: [
          100000,
          'SimpleContract',
          'v1.0',
          'My Simple Contract',
          fs.readFileSync(path.join(__dirname, 'contract/SimpleContract.ts')),
          false
        ],
        height,
        message: undefined
      },
      block: {
        height,
        delegate: '4110e2ab06a075ff540cbcd9af5d7cce3a416595e7c259f15065895f7c84d16f',
        timestamp: 89149400
      },
      lastBlock: {
        version: 0,
        delegate: '2d506a87f7f229129ced11210b103ad6036c70e4a219539c0b962e895b7a584f',
        height,
        prevBlockId: '39dfda884acace9807fdd47be39f7169072ce5c380736329998dddeb28347872',
        timestamp: 89149390,
        payloadHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        id: 'c63e38943295556393599388b887f032118589ccb817d699e58eeaaf327c527f'
      },
      senderAddress: 'senderAddress',
      sender: {
        address: 'senderAddress',
        isAgent: false,
        isLocked: false,
        isDelegate: false,
        publicKey: '',
        xas: 0
      }
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
