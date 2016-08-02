# node-han-css

[![Build Status](https://travis-ci.org/lujjjh/node-han-css.svg?branch=master)](https://travis-ci.org/lujjjh/node-han-css)
[![NPM version](https://img.shields.io/npm/v/node-han-css.svg)](https://www.npmjs.com/package/node-han-css)

[中文](README-zh-CN.md)

An unofficial library to use han-css in Node.

## Requirements

Before installing this package, you should first install the dependencies of [canvas][node-canvas].

## Installation

    $ npm install --save node-han-css

## Usage

First of all, require `node-han-css`.

```js
var Han = require('node-han-css');
```

Second, create a new instance. Under the hood, it creates a new han-css
environment with jsdom.

```js
var han = new Han();
```

Finally, call `han.ready()` to provide a callback to be called once
the environment is ready.

Note that the context of the callback is set to the instance of `Han`
(i.e. `han`). You can call `han.render()` once the environment is
ready.

```js
han.ready(function () {
  console.log(this.render('Hello，世界'));
  // Hello<h-char unicode="ff0c" class="biaodian cjk bd-end bd-cop bd-jiya bd-hangable"><h-inner>，</h-inner></h-char>世界

  console.log(this.render('<em>Hi</em>'));
  // <em><h-word class="western"><h-char class="alphabet latin">H</h-char><h-char class="alphabet latin">i</h-char></h-word></em>
});
```

You may call `han.ready()` multiple times, even when the environment
is ready. `node-han-css` shares a single jsdom environment in every
`Han` instance to accelerate the process.

```js
han.ready(function () {
  this.render('床前明月光，疑是地上霜。');
});

// After 5 seconds, the callback will be called immediately
// since the environment will have been ready
setTimeout(function () {
  han.ready(function () {
    this.render('举头望明月，低头思故乡。');
  });
}, 5000);
```

Also, you may manually call JavaScript API of han-css by using the
optional second parameter.

```js
this.render('PHP是世界上……', function (han) {
  han.renderHWS();
});
// PHP<h-hws hidden=""> </h-hws>是世界上……
```

See [JavaScript API][hanzi-js-api] for more details.

[node-canvas]: https://github.com/Automattic/node-canvas#installation
[hanzi-js-api]: https://css.hanzi.co/manual/js-api
