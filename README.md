# node-han-css

[![Build Status](https://travis-ci.org/lujjjh/node-han-css.svg?branch=master)](https://travis-ci.org/lujjjh/node-han-css)
[![NPM version](https://img.shields.io/npm/v/node-han-css.svg)](https://www.npmjs.com/package/node-han-css)

An unofficial library to use hanzi (漢字標準格式) in Node.

一个非官方的漢字標準格式 Node 库。

## Installation / 安装

    $ npm install --save node-han-css

## Usage / 使用

```js
const Han = require('node-han-css');

const han = new Han();

console.log(han.render('Hello，世界'));
// Hello<h-char unicode="ff0c" class="biaodian cjk bd-end bd-cop bd-jiya bd-hangable"><h-inner>，</h-inner></h-char>世界

console.log(han.render('<em>Hi</em>'));
// <em>Hi</em>
```

By default, it internally calls [`render`](https://hanzi.pro/manual/js-api#render).
You may also specify a custom renderer by passing a function to the second parameter.

内部默认调用 [`render`](https://hanzi.pro/manual/js-api#render)，也可通过第二个参数自定义渲染的方法。

```js
han.render('PHP是世界上……', han => han.renderHWS());
// PHP<h-hws hidden=""> </h-hws>是世界上……
```
