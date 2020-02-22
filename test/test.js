var expect = require('expect.js');
var Han = require('..');

describe('Han', function () {
  describe('#render()', function () {
    var han = new Han();

    it('should return rendered html', () => {
      expect(han.render()).to.be('');
      expect(han.render(0)).to.be('0');
      expect(han.render('')).to.be('');
      expect(han.render('Hello，世界')).to.be('Hello<h-char unicode="ff0c" class="biaodian cjk bd-end bd-cop bd-jiya bd-hangable"><h-inner>，</h-inner></h-char>世界');
      expect(han.render('Hello世界！', han => han.renderHWS())).to.be('Hello<h-hws hidden=""> </h-hws>世界！');
    });
  });

  describe('#ready() (deprecated)', () => {
    it('should invoke the callback when it is ready', done => {
      this.timeout(10000);
      var han = new Han();
      han.ready(function (error, innerHan) {
        expect(innerHan).to.be(han);
        expect(this).to.be(han);
        done();
      });
    });

    it('should support Promise', async () => {
      this.timeout(10000);
      var han = new Han();
      expect(await han.ready()).to.be(han);
    });
  });
});
