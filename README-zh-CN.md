# node-han-css

[![Build Status](https://travis-ci.org/lujjjh/node-han-css.svg?branch=master)](https://travis-ci.org/lujjjh/node-han-css)
[![NPM version](https://img.shields.io/npm/v/node-han-css.svg)](https://www.npmjs.com/package/node-han-css)

[English](README.md)

（非官方）在 Node 里使用汉字标准格式（han-css）。

## 要求

在安装这个包之前，你应当先安装 [canvas][node-canvas] 的依赖。

## 安装

    $ npm install --save node-han-css

## 用法

首先，引入 `node-han-css`。

```js
var Han = require('node-han-css');
```

然后，创建一个新的实例。实际上，这会使用 jsdom 创建一个新的 han-css 环境。

```js
var han = new Han();
```

最后，调用 `han.ready()`，传入一个回调函数。一旦环境就绪，`node-han-css`
就会调用它。

注意回调函数的上下文是 `Han` 的实例（即 `han`）。一旦环境就绪，你就可以调用 `han.render` 了。

```js
han.ready(function () {
  console.log(this.render('Hello，世界'));
  // Hello<h-char unicode="ff0c" class="biaodian cjk bd-end bd-cop bd-jiya bd-hangable"><h-inner>，</h-inner></h-char>世界

  console.log(this.render('<em>Hi</em>'));
  // <em><h-word class="western"><h-char class="alphabet latin">H</h-char><h-char class="alphabet latin">i</h-char></h-word></em>
});
```

你可以多次调用 `han.ready()`，即便在环境已经就绪的时候。`node-han-css` 的每一个 `Han` 实例只有一个 jsdom 环境，这可以加速渲染过程。

```js
han.ready(function () {
  this.render('床前明月光，疑是地上霜。');
});

// 由于 5 秒之后环境已经就绪，
// 彼时会立即调用这个回调函数
setTimeout(function () {
  han.ready(function () {
    this.render('举头望明月，低头思故乡。');
  });
}, 5000);
```

你也可以手动调用 han-css 的 JavaScript API，只需要传入第 2 个可选参数。

```js
this.render('PHP是世界上……', function (han) {
  han.renderHWS();
});
// PHP<h-hws hidden=""> </h-hws>是世界上……
```

详情请查阅 [JavaScript API][hanzi-js-api]。

[node-canvas]: https://github.com/Automattic/node-canvas#installation
[hanzi-js-api]: https://css.hanzi.co/manual/js-api
