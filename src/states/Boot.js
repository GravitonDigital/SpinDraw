import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#000000';
    this.stage.disableVisibilityChange = true;
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);

    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = false;
    this.game.tweens.frameBased = true;
  }

  preload() {
    WebFont.load({
      google: {
        families: ['Roboto']
      },
      active: this.fontsLoaded
    });

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', {
      font: '16px Arial',
      fill: '#dddddd',
      align: 'center'
    });
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
  }

  render() {
    if (this.fontsReady) {
      this.state.start('Splash');
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
  }
}