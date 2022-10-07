const maxImgStack = 5;

class Drawer {
  constructor(canvas) {
    this.canvas = canvas;
    this.prevX = 0;
    this.prevY = 0;
    this.currX = 0;
    this.currY = 0;
    this.ismousedown = false;
    this.color = "black";
    this.stroke_thickness = 2;

    this.imgStack = [];

    this.clear();
    this._backup();

    this.canvas.addEventListener("mousedown", (function(e) {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;

      this.ismousedown = true;
      this._drawDot();
    }).bind(this), false);

    this.canvas.addEventListener("mousemove", (function(e) {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;
      if (this.ismousedown) {
        this.canvas.getContext("2d").beginPath();
        this.canvas.getContext("2d").moveTo(this.prevX, this.prevY);
        this.canvas.getContext("2d").lineTo(this.currX, this.currY);
        this.canvas.getContext("2d").strokeStyle = this.color;
        this.canvas.getContext("2d").lineWidth = this.stroke_thickness * 2;
        this.canvas.getContext("2d").stroke();
        this.canvas.getContext("2d").closePath();

        this._drawDot();
      } else {
        this._undo();
        this._backup();
        this._drawDot(false);
      }
    }).bind(this), false);

    this.canvas.addEventListener("mouseup", (function(e) {
      this.ismousedown = false;
      this._drawDot();
      this._backup();
    }).bind(this), false);

    this.canvas.addEventListener("mouseout", (function(e) {
      if (this.ismousedown) {
        this._backup();
      }
      this.ismousedown = false;
    }).bind(this), false);

    this.canvas.addEventListener("mousein", (function(e) {
      if (!this.ismousedown) {
        this._backup();
      }
    }).bind(this), false);

  }

  _backup() {
    this.imgStack.push(this.canvas.getContext("2d").getImageData(0, 0, this.canvas.width, this.canvas.height));
    if(this.imgStack.length > maxImgStack){
      this.imgStack.shift();
    }
  }

  _undo() {
    if (this.imgStack.length > 0) {
      this.canvas.getContext("2d").putImageData(this.imgStack.pop(), 0, 0);
    }
  }

  _drawDot(fill = true) {
    this.canvas.getContext("2d").beginPath();
    this.canvas.getContext("2d").strokeStyle = this.color;
    this.canvas.getContext("2d").fillStyle = this.color;
    this.canvas.getContext("2d").lineWidth = 1;
    this.canvas.getContext("2d").ellipse(this.currX, this.currY, this.stroke_thickness, this.stroke_thickness, 0, 0, 7);
    if (fill) {
      this.canvas.getContext("2d").fill();
    } else {
      this.canvas.getContext("2d").stroke();
    }
    this.canvas.getContext("2d").closePath();
  }

  clear() {
    this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  save(id) {
    document.getElementById(id).style.border = "2px solid";
    var dataURL = this.canvas.toDataURL();
    document.getElementById(id).src = dataURL;
    document.getElementById(id).style.display = "inline";
  }

}
