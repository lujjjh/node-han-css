var EventEmitter = require('events');
var Promise = require('bluebird');
var joinPath = require('path').join;
var jsdom = require('jsdom');
var read = require('fs').readFileSync;

var html = '<meta charset="utf-8"><body><div id="root"></div></body>';
var han = read(joinPath(require.resolve('han-css'), '../dist/han.min.js'), 'utf-8');

function Han() {
  this._ready = false;
  this._eventEmitter = new EventEmitter();
  this._eventEmitter.setMaxListeners(100);
}

Han.prototype.ready = function () {
  return arguments.length > 0 ?
    this.__ready.apply(this, arguments) :
    Promise.fromCallback(this.__ready.bind(this));
};

Han.prototype.__ready = function (callback) {
  if (this._ready) {
    callback.call(this, null, this);
    return;
  }

  if (!this._initializing) {
    this._initializing = true;
    jsdom.env(html, { src: han }, function (error, window) {
      if (error) {
        throw error;
      }
      this._ready = true;
      this._initializing = false;
      this._window = window;
      this._eventEmitter.emit('ready');
    }.bind(this));
  }

  this._eventEmitter.once('ready', callback.bind(this, null, this));
};

Han.prototype.render = function (content, callback) {
  if (!this._ready) {
    throw new Error('Han#render() should be called after it is ready');
  }

  if (typeof content === 'undefined') {
    return '';
  }

  var window = this._window;
  var document = window.document;
  var documentElement = document.documentElement;
  var root = document.getElementById('root');
  root.innerHTML = '' + content;
  var han = window.Han(root, documentElement);
  if (typeof callback === 'undefined') {
    han.render();
  } else {
    callback(han);
  }
  return root.innerHTML;
};

module.exports = Han;
