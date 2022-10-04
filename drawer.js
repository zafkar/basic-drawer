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

    this.clear();

    this.canvas.addEventListener("mousedown", (function(e) {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;

      this.ismousedown = true;
      this._drawDot();
    }).bind(this), false);

    this.canvas.addEventListener("mousemove", (function(e) {
      if (this.ismousedown) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;

        this.canvas.getContext("2d").beginPath();
        this.canvas.getContext("2d").moveTo(this.prevX, this.prevY);
        this.canvas.getContext("2d").lineTo(this.currX, this.currY);
        this.canvas.getContext("2d").strokeStyle = this.color;
        this.canvas.getContext("2d").lineWidth = this.stroke_thickness * 2;
        this.canvas.getContext("2d").stroke();
        this.canvas.getContext("2d").closePath();

        this._drawDot();
      }
    }).bind(this), false);

    this.canvas.addEventListener("mouseup", (function(e) {
      this.ismousedown = false;
      this._drawDot();
    }).bind(this), false);

    this.canvas.addEventListener("mouseout", (function(e) {
      this.ismousedown = false;
    }).bind(this), false);

  }

  _drawDot() {
    this.canvas.getContext("2d").beginPath();
    this.canvas.getContext("2d").fillStyle = this.color;
    this.canvas.getContext("2d").ellipse(this.currX, this.currY, this.stroke_thickness, this.stroke_thickness, 0, 0, 7);
    this.canvas.getContext("2d").fill();
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
