## create-asch-dapp

Asch contract DApp template.

### Usage

```sh
$ git clone https://github.com/AschPlatform/create-asch-dapp.git
$ npm i
$ npm test
```

### Debug

前提：安装 VS Cdoee

方法一：

```
1. VS Code 安装 [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)
2. 在 __tests__/MyContract.test.ts 某个 it 测试里添加断点，右键选择「Debug Jest」
```

方法二：

```
1. 自己编写 test.ts，引入 mock.ts 和 MyContract.ts
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
3. 在 MyContract.ts 添加断点
4. 启动调试
```
