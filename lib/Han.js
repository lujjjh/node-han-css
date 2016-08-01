var joinPath = require('path').join;
var jsdom = require('jsdom');
var read = require('fs').readFileSync;

var html = '<meta charset="utf-8"><body><div id="root"></div></body>';
var han = read(joinPath(__dirname, '../node_modules/han-css/dist/han.min.js'), 'utf-8');

function Han() {
  this._ready = false;
}

Han.prototype.ready = function (callback) {
  jsdom.env(html, { src: han }, function (error, window) {
    if (error) {
      throw error;
    }
    this._ready = true;
    this._window = window;
    callback();
  }.bind(this));
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