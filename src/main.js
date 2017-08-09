//http://paletton.com/#uid=7350u0kc4CfgPuZgovX7jLB7jLB
//https://flatuicolors.com/
import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
  constructor() {
    const width = config.GAMEWIDTH
    const height = config.GAMEHEIGHT

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Boot');

    this.addColorPicker();
  }

  addColorPicker() {
    let content = document.getElementById('content');

    //brush
    let brushColorPickerContainer = document.createElement('div');
    brushColorPickerContainer.innerText = 'Brush Color: ';
    let brushColorPicker = document.createElement('input');
    brushColorPicker.setAttribute('id', 'brush-color-picker');
    brushColorPicker.className += 'jscolor';
    brushColorPicker.value = '00A779';
    brushColorPickerContainer.appendChild(brushColorPicker);
    content.appendChild(brushColorPickerContainer);

    //brush width
    let brushWidthContainer = document.createElement('div');
    brushWidthContainer.innerText = 'Brush Width: ';
    let brushWidth = document.createElement('input');
    brushWidth.setAttribute('id', 'brush-width');
    brushWidth.className += 'brush-width';
    brushWidth.value = '10';
    brushWidthContainer.appendChild(brushWidth);
    content.appendChild(brushWidthContainer);

    //disk
    let diskColorPickerContainer = document.createElement('div');
    diskColorPickerContainer.innerText = 'Disk Color: ';
    let diskColorPicker = document.createElement('input');
    diskColorPicker.setAttribute('id', 'disk-color-picker');
    diskColorPicker.className += 'jscolor';
    diskColorPicker.value = 'D9005B';
    diskColorPickerContainer.appendChild(diskColorPicker);
    content.appendChild(diskColorPickerContainer);

    //disk rotation
    let diskRotationSpeedContainer = document.createElement('div');
    diskRotationSpeedContainer.innerText = 'Disk Speed: ';
    let diskRotationSpeed = document.createElement('input');
    diskRotationSpeed.setAttribute('id', 'disk-rotation');
    diskRotationSpeed.className += 'disk-rotation';
    diskRotationSpeed.value = '0.05';
    diskRotationSpeedContainer.appendChild(diskRotationSpeed);
    content.appendChild(diskRotationSpeedContainer);

    //background
    let backgroundColorPickerContainer = document.createElement('div');
    backgroundColorPickerContainer.innerText = 'Background Color: ';
    let backgroundColorPicker = document.createElement('input');
    backgroundColorPicker.setAttribute('id', 'background-color-picker');
    backgroundColorPicker.className += 'jscolor';
    backgroundColorPicker.value = '00A779';
    backgroundColorPickerContainer.appendChild(backgroundColorPicker);
    content.appendChild(backgroundColorPickerContainer);

    //download
    let downloadButton = document.createElement('a');
    backgroundColorPicker.className += 'download-button';
    downloadButton.innerText = 'Download as PNG';
    downloadButton.setAttribute('id', 'download-button');
    downloadButton.setAttribute('download', 'SpinDraw.png');
    content.appendChild(downloadButton);
  }
}

let ready = function (fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  window.game = new Game()
});