!function (t) {
  var e = {};

  function i(n) {
    if (e[n]) return e[n].exports;
    var r = e[n] = {i: n, l: !1, exports: {}};
    return t[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports
  }

  i.m = t, i.c = e, i.d = function (t, e, n) {
    i.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
  }, i.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
  }, i.t = function (t, e) {
    if (1 & e && (t = i(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var r in t) i.d(n, r, function (e) {
      return t[e]
    }.bind(null, r));
    return n
  }, i.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return i.d(e, "a", e), e
  }, i.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, i.p = "", i(i.s = 0)
}([function (t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {value: !0}), i(1), i(2)
}, function (t, e, i) {
}, function (t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {value: !0});
  var n = i(3), r = document.querySelector(".hidden-canvas"), o = document.querySelector(".canvas");
  new n.default(o, r)
}, function (t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {value: !0});
  var n = function () {
    function t(t, e) {
      this.getAverageRGB = function (t) {
        for (var e = t.data.length / 4, i = 0, n = 0, r = 0, o = 0; o < e; o++) i += t.data[4 * o + 0], n += t.data[4 * o + 1], r += t.data[4 * o + 2];
        return {r: i / e, g: n / e, b: r / e}
      }, this._canvas = t, this._context = t.getContext("2d"), this._canvas.width = window.innerWidth, this._canvas.height = window.innerHeight, this._canvas.focus(), this._hiddenCanvas = e, this._hiddenContext = e.getContext("2d"), this._charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&", this.setup(), window.requestAnimationFrame(this.frame.bind(this))
    }

    return t.prototype.frame = function (t) {
      this._previousTime || (this._previousTime = t);
      var e = t - this._previousTime;
      this._previousTime = t, this._fps = 1e3 / e, this.update(e / 1e3), this.draw(), window.requestAnimationFrame(this.frame.bind(this))
    }, t.prototype.setup = function () {
      var t = this;
      this._video = document.querySelector(".video");
      navigator.mediaDevices.getUserMedia({audio: !1, video: {width: 512, height: 512}}).then((function (e) {
        t._video.srcObject = e, t._video.play().then()
      })).catch((function (t) {
        alert("Error when getting media"), console.warn(t)
      }))
    }, t.prototype.draw = function () {
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
      var t = this._video, e = t.videoWidth, i = t.videoHeight;
      this._context.textBaseline = "top", this._context.font = "10px Consolas";
      var n = this._context.measureText("@"), r = parseInt(n.width);
      if (e && i) {
        this._hiddenCanvas.width = e, this._hiddenCanvas.height = i, this._hiddenContext.drawImage(this._video, 0, 0, e, i);
        for (var o = 0; o < i; o += 10) for (var a = 0; a < e; a += r) {
          var s = this._hiddenContext.getImageData(a, o, r, 10), h = this.getAverageRGB(s), d = h.r, u = h.g, c = h.b,
            f = this._charset[Math.floor(Math.random() * this._charset.length)];
          this._context.fillStyle = "rgb(" + d + "," + u + "," + c + ")", this._context.fillText(f, a + this._canvas.width / 2 - e / 2, o + this._canvas.height / 2 - i / 2)
        }
      }
    }, t.prototype.update = function (t) {
    }, t
  }();
  e.default = n
}]);