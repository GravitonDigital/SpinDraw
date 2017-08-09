import Phaser from 'phaser';
import config from '../config'

export default class extends Phaser.State {
  init() {
    this.disk = this.game.add.graphics(0, 0);
    this.disk.beginFill(0xffffff);
    this.disk.drawEllipse(this.game.world.centerX, this.game.world.centerY, config.DISKWIDTH_RADIUS, config.DISKHEIGHT_RADIUS);
    this.disk.endFill();

    this.drawing = this.game.add.graphics(config.DISKHEIGHT_RADIUS, config.DISKWIDTH_RADIUS);

    let diskPicker = document.getElementById('disk-color-picker');
    diskPicker.onchange = () => {
      this.disk.tint = parseInt(diskPicker.value, 16);
    }
    this.disk.tint = parseInt(diskPicker.value, 16);

    let backgroundPicker = document.getElementById('background-color-picker');
    backgroundPicker.onchange = () => {
      this.stage.backgroundColor = parseInt(backgroundPicker.value, 16);
    }
    this.stage.backgroundColor = parseInt(backgroundPicker.value, 16);

    this.mousedown = false;
    this.mouseover = false;

    this.rotationSpeed = document.getElementById('disk-rotation');
    this.brushWidth = document.getElementById('brush-width');
    this.brushPicker = document.getElementById('brush-color-picker');
    this.lastPoint = undefined;

    let downloadButton = document.getElementById("download-button")
    downloadButton.addEventListener('click', () => {
      let canvas = document.getElementsByTagName('canvas')[0];
      let base64png = canvas.toDataURL('image/png');
      base64png = base64png.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
      downloadButton.href = base64png;
    }, false);

    let clearButton = document.getElementById("clear-button")
    clearButton.addEventListener('click', () => {
      this.drawing.clear();
    }, false);
  }

  draw() {
    let brushWidth = parseFloat(this.brushWidth.value);
    if (!brushWidth) {
      brushWidth = 1;
    }
    let lastX = this.lastPoint.x;
    let lastY = this.lastPoint.y;
    let currentX = this.game.input.x;
    let currentY = this.game.input.y;
    let currentLocal = this.drawing.toLocal(new Phaser.Point(currentX, currentY));
    currentX = currentLocal.x;
    currentY = currentLocal.y;
    this.drawing.beginFill(parseInt(this.brushPicker.value, 16));
    this.drawing.lineStyle(brushWidth, parseInt(this.brushPicker.value, 16));
    this.drawing.moveTo(lastX, lastY);
    this.drawing.lineTo(currentX, currentY);
    this.drawing.endFill();
    this.drawing.beginFill(parseInt(this.brushPicker.value, 16));
    this.drawing.lineStyle(0);
    this.drawing.drawCircle(currentX, currentY, brushWidth);
    this.drawing.endFill();
  }

  shutdown() {}

  preload() {}

  create() {}

  render() {
    if (this.game.input.activePointer.isDown) {
      if (!this.mousedown) {
        this.lastPoint = this.drawing.toLocal(new Phaser.Point(this.game.input.x, this.game.input.y));
      }
      this.mousedown = true;
    } else {
      this.mousedown = false;
    }

    if (this.isMouseOverDisk()) {
      this.mouseover = true;
    } else {
      this.mouseover = false;
    }

    if (this.mousedown && this.mouseover) {
      this.draw();
      this.lastPoint = this.drawing.toLocal(new Phaser.Point(this.game.input.x, this.game.input.y));
    }

    let rotationSpeed = parseFloat(this.rotationSpeed.value);
    if (!rotationSpeed) {
      rotationSpeed = 0.05;
    }
    this.drawing.rotation += rotationSpeed;
  }

  isMouseOverDisk() {
    //https://math.stackexchange.com/questions/76457/check-if-a-point-is-within-an-ellipse
    let x = this.game.input.x;
    let y = this.game.input.y;
    let rx = config.DISKHEIGHT_RADIUS;
    let ry = config.DISKWIDTH_RADIUS;
    let centerX = config.DISKWIDTH_RADIUS;
    let centerY = config.DISKHEIGHT_RADIUS;
    let wCalc = Math.pow(x - centerX, 2) / Math.pow(rx, 2);
    let yCalc = Math.pow(y - centerY, 2) / Math.pow(ry, 2);
    let test = wCalc + yCalc;
    return test < 1;
  }
}