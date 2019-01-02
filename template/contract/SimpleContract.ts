/// <reference types="asch-contract-types" />

// 合约类只持实例属性和实例方法，不支持静态方法，必须有一个无参的构造函数（可以不写构造函数，系统会默认创建一个）
export default class SimpleContract extends AschContract {
  // 属性为合约的状态，合约调用后，状态的变化会自动持久化到数据库中。
  // 属性的类型支持 基本类型（ string, number, boolean )、内置类型 ( BigInt、Mapping )、自定义状态类型
  // 容器仅支持 Mapping，Mapping中存储的元素是除容器外的支持的属性类型
  // 可见性为public（默认）为外部可查询状态，private和protected 外部不可通过queryState查询
  companyAddress: string
  totalAmount: bigint
  holding: Mapping<bigint>

  // 初始化方法，会在合约注册时被调用
  constructor () {
    super()

    const companyAddress = 'COMPANY_ADDRESS'
    const totalAmount = BigInt(1000000)
    this.companyAddress = companyAddress
    this.totalAmount = totalAmount
    this.holding = new Mapping<bigint>()
    this.holding[companyAddress] = totalAmount
  }

  // 当向本合约地址转账时会自动调用，如果抛出异常转账会被回滚
  onPay (amount: number, currency: string): void {
    assert(amount > 0, 'stock must great than 0')
    assert(currency === 'XAS', 'support XAS only')

    const senderAddress = this.context!.senderAddress

    this.increaseHolding(this.companyAddress, -amount)
    this.increaseHolding(senderAddress, amount)
    this.transfer(senderAddress, 10, 'XAS')
  }

  play (amount: number): string {
    const senderAddress = this.context!.senderAddress
    assert(amount > 0, 'invalid amount, must great than 0')
    assert(this.getHolding(senderAddress) > BigInt(amount), `holding less than ${amount}`)

    const firstValue = String(amount).charCodeAt(0)
    if (firstValue % 2 === 0) {
      this.increaseHolding(senderAddress, amount)
      this.increaseHolding(this.companyAddress, -amount)
      return `win ${amount}`
    } else {
      this.increaseHolding(senderAddress, -amount)
      this.increaseHolding(this.companyAddress, amount)
      return `lost ${amount}`
    }
  }

  private increaseHolding (address: string, value: bigint | number): void {
    const holdingValue = this.holding[address] || BigInt(0)
    this.holding[address] = holdingValue + BigInt(value)
  }

  private getHolding (address: string): bigint {
    assert(address in this.holding, 'please buy stock first')
    return this.holding[address]!
  }
}
