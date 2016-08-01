var expect = require('expect.js');
var map = require('async/map');
var Han = require('..');

describe('Han', function () {
  describe('#ready()', function () {
    it('should invoke the callback when it is ready', function (done) {
      this.timeout(10000);
      var han = new Han();
      han.ready(function () {
        done();
      });
    })
  });

  describe('#render()', function () {
    var han = new Han();

    before(function (done) {
      han.ready(done);
    });

    it('should return rendered html', function () {
      expect(han.render()).to.be('');
      expect(han.render(0)).to.be('0');
      expect(han.render('')).to.be('');
      expect(han.render('Hello，世界')).to.be('Hello<h-char unicode="ff0c" class="biaodian cjk bd-end bd-cop bd-jiya bd-hangable"><h-inner>，</h-inner></h-char>世界');
      expect(han.render('Hello世界！', function (han) {
        han.renderHWS();
      })).to.be('Hello<h-hws hidden=""> </h-hws>世界！');
    });

    it('should work with multiply calls', function (done) {
      var testIn = ['Hello world', 'Hello，世界', '<em>Emph</em>'];
      var testOut = [
        "Hello world",
        "Hello<h-char unicode=\"ff0c\" class=\"biaodian cjk bd-end bd-cop bd-jiya bd-hangable\"><h-inner>，</h-inner></h-char>世界",
        "<em><h-word class=\"western\"><h-char class=\"alphabet latin\">E</h-char><h-char class=\"alphabet latin\">m</h-char><h-char class=\"alphabet latin\">p</h-char><h-char class=\"alphabet latin\">h</h-char></h-word></em>"
      ];

      var anotherHan = new Han();
      map(testIn, function (content, callback) {
        anotherHan.ready(function () {
          callback(null, this.render(content));
        });
      }, function (err, results) {
        expect(results).to.eql(testOut);
        done();
      });
    });
  });
});
