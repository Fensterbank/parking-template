/**
 Props to Marco Dell'Anna for building this.
 https://codepen.io/plasm
  
 LICENSE:
 Copyright (c) 2020 by Marco Dell'Anna (https://codepen.io/plasm/pen/zwjMPy)
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var _this = this;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.runParticles = function (textContent) {
  var particles = [];
  var frequency = 20; // Popolate particles

  setInterval(function () {
    popolate();
  }.bind(_this), frequency);
  var c1 = createCanvas({
    width: $(window).width(),
    height: $(window).height()
  });
  var c2 = createCanvas({
    width: $(window).width(),
    height: $(window).height()
  });
  var c3 = createCanvas({
    width: $(window).width(),
    height: $(window).height()
  });
  var tela = c1.canvas;
  var canvas = c1.context;
  $("body").append(c3.canvas);
  writeText(c2.canvas, c2.context, textContent);

  var Particle = /*#__PURE__*/function () {
    "use strict";

    function Particle(canvas, options) {
      _classCallCheck(this, Particle);

      var random = Math.random();
      this.canvas = canvas;
      this.x = options.x;
      this.y = options.y;
      this.s = 3 + Math.random();
      this.a = 0;
      this.w = $(window).width();
      this.h = $(window).height();
      this.radius = 0.5 + Math.random() * 20;
      this.color = '#76b343';
    }

    _createClass(Particle, [{
      key: "randomColor",
      value: function randomColor() {
        var colors = ["#76b343", "#FFFFFF"];
        return colors[this.randomIntFromInterval(0, colors.length - 1)];
      }
    }, {
      key: "randomIntFromInterval",
      value: function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    }, {
      key: "render",
      value: function render() {
        this.canvas.beginPath();
        this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.canvas.lineWidth = 2;
        this.canvas.fillStyle = this.color;
        this.canvas.fill();
        this.canvas.closePath();
      }
    }, {
      key: "move",
      value: function move() {
        //this.swapColor()
        this.x += Math.cos(this.a) * this.s;
        this.y += Math.sin(this.a) * this.s;
        this.a += Math.random() * 0.8 - 0.4;

        if (this.x < 0 || this.x > this.w - this.radius) {
          return false;
        }

        if (this.y < 0 || this.y > this.h - this.radius) {
          return false;
        }

        this.render();
        return true;
      }
    }]);

    return Particle;
  }();

  function createCanvas(properties) {
    var canvas = document.createElement('canvas');
    canvas.width = properties.width;
    canvas.height = properties.height;
    var context = canvas.getContext('2d');
    return {
      canvas: canvas,
      context: context
    };
  }

  function writeText(canvas, context, text) {
    var size = 100;
    context.font = size + "px Montserrat";
    context.fillStyle = "#111111";
    context.textAlign = "center";
    var lineheight = 70;
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      context.fillText(lines[i], canvas.width / 2, canvas.height / 2 + lineheight * i - lineheight * (lines.length - 1) / 3);
    }
  }

  function maskCanvas() {
    c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
    c3.context.globalCompositeOperation = 'source-atop';
    c3.context.drawImage(c1.canvas, 0, 0);
    blur(c1.context, c1.canvas, 2);
  }

  function blur(ctx, canvas, amt) {
    ctx.filter = "blur(".concat(amt, "px)");
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  }
  /*
   * Function to clear layer canvas
   * @num:number number of 
   
   
   */


  function popolate() {
    particles.push(new Particle(canvas, {
      x: $(window).width() / 2,
      y: $(window).height() / 2
    }));
    return particles.length;
  }

  function clear() {
    canvas.globalAlpha = 0.03;
    canvas.fillStyle = '#111111';
    canvas.fillRect(0, 0, tela.width, tela.height);
    canvas.globalAlpha = 1;
  }

  function update() {
    clear();
    particles = particles.filter(function (p) {
      return p.move();
    });
    maskCanvas();
    requestAnimationFrame(update.bind(this));
  }

  update();
};
