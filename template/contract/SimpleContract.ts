/// <reference types="asch-contract-types" />

export default class SimpleContract extends AschContract {
  companyAddress: string
  holding: Mapping<bigint>

  constructor () {
    super()

    const companyAddress = 'COMPANY_ADDRESS'
    const totalAmount = BigInt(100)

    this.companyAddress = companyAddress
    this.holding = new Mapping<bigint>()
    this.holding[companyAddress] = totalAmount
  }

  @payable ({ isDefault : true })
  onPay (amount: bigint, currency: string): void {
    assert(amount > 0, 'XAS amount must great than 0')
    assert(currency === 'XAS', 'support XAS only')

    const senderAddress = this.context!.senderAddress
    const updateAmount = BigInt(amount) * BigInt(2)

    this.increaseHolding(senderAddress, updateAmount)
    this.increaseHolding(this.companyAddress, -updateAmount)
  }

  play (amount: bigint): string {
    const senderAddress = this.context!.senderAddress
    assert(amount > 0, 'stock amount must great than 0')
    const remainingHolding = this.getHolding(senderAddress)
    assert(remainingHolding >= amount, `holding ${remainingHolding} stock less than ${amount}`)

    const win = (BigInt(amount) % BigInt(2)) === BigInt(0)
    const winAmount = win ? amount : -amount

    this.increaseHolding(senderAddress, winAmount)
    this.increaseHolding(this.companyAddress, -winAmount)

    return win ? `win ${amount}` : `lost ${amount}`
  }

  private increaseHolding (address: string, amount: bigint): void {
    const holdingValue = this.holding[address] || BigInt(0)
    this.holding[address] = holdingValue + BigInt(amount)
  }

  @constant
  getHolding (address: string): bigint {
    return this.holding[address] || BigInt(0)
  }
}
