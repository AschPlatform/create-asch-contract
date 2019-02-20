## create-asch-contract

阿希智能合约脚手架。

### Usage

```sh
$ npm i create-asch-contract -g
$ create-asch-contract
$ cd [my-asch-contract] && npm test
```

### 本地调试

前提：安装 VS Code + TSLint 插件

方法一：

```
1. VS Code 安装 [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)
2. 在 __tests__/SimpleContract.test.ts 某个 it 测试里添加断点，右键选择「Debug Jest」
```

方法二：

```
1. 自己编写 test.ts，引入 mock.ts 和 SimpleContract.ts
2. 设置 .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Test Contract",
      "args": [
        "-r",
        "${workspaceFolder}/node_modules/ts-node/register",
        "${workspaceFolder}/test.ts"
      ]
    }
  ]
}
3. 在 SimpleContract.ts 添加断点
4. 启动调试
```

### 相关模块

- asch-contract-core: asch 智能合约核心实现
- asch-contract-types: TypeScript 的 .d.ts 头文件
- asch-contract-tslint: TypeScript 的 lint 规范
