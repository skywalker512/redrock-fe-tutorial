## npm

npm 是全球最大的包管理器。

通过 npm 可以让全球的开源软件开发者相互分享和借鉴 JavaScript 的代码模块。

npm 自带 CLI (命令行工具) ，开发者通过 CLI 与 npm 打交道。

## npm script

通过 npm script 我们可以构建出一套前端工作流。

**新建 package.json** 

```shell
# 设置淘宝镜像源
npm config set registry https://registry.npm.taobao.org -g
npm config set disturl https://npm.taobao.org/dist -g
# 修改默认 config
npm config set init.author.name "RetroAstro"
npm config set init.license "MIT"
npm config set init.version "1.0.0"
# 创建 package.json 文件
npm init -y
```

```json
// package.json
{
  "name": "npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "RetroAstro",
  "license": "MIT",
  "dependencies": {
  },
  "devDependencies": {
  }
}
```

**基础的 npm script** 

```shell
# 安装包
npm install xxx
# 全局安装包
npm install xxx -g
# 安装只在开发环境下所需的包
npm install xxx --save-dev
# 安装在生产环境下所需的包
npm install xxx --save
# 更新包
npm update xxx
# 卸载包
npm uninstall xxx
# 全局卸载包
npm uninstall xxx -g
# 查看全局包列表
npm list -g --depth 0
# 执行 package.json 中的 scripts
npm run xxx
# 串行执行 package.json 中的 scripts
npm run abc && npm run def && npm run ghi
# 并行执行 package.json 中的 scripts
npm run abc & npm run def & npm run ghi
```

**基础的前端工作流**

* 代码检查
  * eslint
  * stylelint
  * prettier
* 单元测试
  * chai
  * mocha 

**使用 npm script 自带的钩子** 

`pre` 与 `post` 钩子

例如执行 npm run test 的时候：

1. 检查 scripts 对象中是否存在 pretest 命令，如果有，先执行该命令。
2. 检查是否有 test 命令，有的话运行 test 命令，没有的话报错。
3. 检查是否存在 posttest 命令，如果有，执行 posttest 命令。

**预定义变量与自定义变量**

```shell
# 显示预定义变量
npm run env
```

```json
// 自定义变量
"config": {
}
```

**跨平台兼容命令**

* cpr

* rimraf
* cross-env

**拆分 npm script**

* scripty
* shelljs

```shell
# 为脚本文件添加可执行权限
chmod -R a+x scripts
```

**实现页面自动刷新**

* browser-sync 

**使用 Git Hooks**

* husky
* lint-staged

**利用 npm script 构建前端项目** 

* 使用 CSS 预处理器（sass、less、stylus ...）
* 压缩图片，压缩 css 和 js 文件
* 资源版本号和引用替换

## CommonJS 规范

* node_modules

* module 对象
* require 命令
* 模块的加载机制

每个文件就是一个模块，有自己的私有作用域，module 对象代表当前模块。

`require` 命令基本功能是读取并执行一个 JS 文件，然后返回该模块的 exports 对象。

```js
function Module () {
    this.exports = {}
}

var module = new Module()
var exports = module.exports

// a.js
var x = 5
var add = function (a, b) {
    return a + b
}

exports.x = x
module.exports.add = add

// b.js 
var obj = require('./a.js')

console.log(obj.x) // 5
console.log(obj.add(1 + 1)) // 2
```

若执行 `require` 时不以相对路径加载，以在 `/home/user/projects/foo.js` 中调用 `require('bar.js')` 为例，则相应的文件查找规则应为：

```js
# /usr/local/lib/node/bar.js
# /home/user/projects/node_modules/bar.js
# /home/user/node_modules/bar.js
# /home/node_modules/bar.js
# /node_modules/bar.js
```

CommonJS 模块的加载机制是，输入的是被输出的值的拷贝，即一旦输出一个值，模块内部的变化就影响不到这个值。但当输出值为对象时，输入的则为输出对象的引用，因此结果会有所不同。

```js
// a.js
var counter = 3;

function incCounter() {
  counter++
}

module.exports = {
  counter,
  incCounter
}

// b.js
var { counter, incCounter } = require('./a.js')

console.log(counter)  // 3
incCounter()
console.log(counter) // 3
```

```js
// a.js
var obj = { a: 2 }
var func = () => obj.a++

module.exports = { obj, func }

// b.js
var { obj, func } = require('./a.js')

console.log(obj.a) // 2
func()
console.log(obj.a) // 3
```



