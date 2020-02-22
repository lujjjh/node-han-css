const { JSDOM } = require('jsdom');
const { readFileSync } = require('fs');

const html = '<meta charset="utf-8"><body><div id="root"></div></body>';
const han = readFileSync(require.resolve('han-css/dist/han.min.js'), 'utf-8');

function defaultRenderer(han) {
  han.render();
}

class Han {
  constructor() {
    const dom = this.dom = new JSDOM(html, { runScripts: 'outside-only' });
    dom.window.eval(han);
  }

  render(content = '', renderer = defaultRenderer) {
    const { window } = this.dom;
    const { document } = window;
    const { documentElement } = document;
    const root = document.getElementById('root');
    root.innerHTML = '' + content;
    const han = window.Han(root, documentElement);
    renderer(han);
    return root.innerHTML;
  }

  ready(callback) {
    console.warn('Han#ready() is deprecated,. Call Han#render() directly.');
    if (typeof callback === 'function') {
      callback.call(this, null, this);
    } else {
      return Promise.resolve(this);
    }
  }
}

module.exports = Han;
