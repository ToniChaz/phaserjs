import Phaser from 'phaser'

export default class Preloader extends Phaser.State {
  constructor () {
    super()

    this.loader = null
    this.ready = false
  }

  preload () {
    // These are the assets we loaded in Boot.js
    this.loader = this.add.sprite(this.world.centerX, this.world.centerY, 'loaderBar')
    this.loader.anchor.setTo(0.5)

    // Sets a basic loading bar
    this.load.setPreloadSprite(this.loader)

    // Load any assets for the game here
    this.game.load.audio('au1', 'assets/audio/here-we-go.mp3')
    this.game.load.image('sky', 'assets/images/sky.png')
    this.game.load.image('ground', 'assets/images/platform.png')
    this.game.load.image('star', 'assets/images/star.png')
    this.game.load.image('diamond', 'assets/images/diamond.png')
    this.game.load.image('doorOpen', 'assets/images/door-open.png')
    this.game.load.image('doorClose', 'assets/images/door-close.png')
    this.game.load.image('gameOver', 'assets/images/game-over.png')
    this.game.load.image('nextLevel', 'assets/images/next-level.png')
    this.game.load.image('retryAgain', 'assets/images/retry-again.png')
    this.game.load.spritesheet('arrowsBtn', 'assets/images/arrows.png', 62, 62)
    this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48)
    this.game.load.spritesheet('baddie', 'assets/images/baddie.png', 32, 32)
    this.game.load.spritesheet('buttonStart', 'assets/images/button-start.png', 193, 71)
    this.load.onLoadComplete.add(this.loadComplete, this)
  }

  loadComplete () {
    this.ready = true
  }

  update () {
    if (this.ready === true) {
      this.state.start('Menu')
    }
  }
}
