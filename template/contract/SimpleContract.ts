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

  // 方法中有两个约定的方法 init 和 onPay 分别用于合约初始化和合约地址收到转账后的动作
  // 这两个方法的可见性必须是public, public 在编写时可以省略。public 的方法表示是外部可调用的方法
  // @constant 装饰的方法是只读方法，这种方法不修改状态（ 修改状态会产生异常 ），在调用时不消耗GAS，可以作为接口供外部使用（非打包时执行）
  // 其他public方法是合约调用方法，一般会修改合约状态。在区块被打包时执行（具体依赖产块逻辑），根据其执行消耗的资源（包括CPU和存储）计算GAS
  // 非public的方法是内部方法，无法进行外部访问，只能在合约内部使用
  // 每个方法应写清参数的类型和返回值的类型，参数仅支持基本类型。通常非@constant的合约调用方法返回值是 void

  // 初始化方法，会在合约注册时被调用
  init (): void {
    const companyAddress = 'COMPANY_ADDRESS'
    const totalAmount = 1000000
    this.companyAddress = companyAddress
    this.totalAmount = BigInt(totalAmount)
    this.holding = new Mapping<bigint>()
    this.holding.set(companyAddress, BigInt(totalAmount))
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
    const holdingValue = this.holding.get(address) || BigInt(0)
    this.holding.set(address, holdingValue + BigInt(value))
  }

  private getHolding (address: string): bigint {
    assert(this.holding.has(address), 'please buy stock first')
    return this.holding.get(address)!
  }
}
