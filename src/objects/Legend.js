import Phaser from 'phaser'

export default class Legend {
  constructor () {
    this.legend = null
    this.legendMap = {
      gameOver: 'gameOver',
      nextLevel: 'nextLevel',
      retryAgain: 'retryAgain'
    }
  }

  create (game, type) {
    let tmpImg = game.cache.getImage(this.legendMap[type])
    this.legend = game.add.sprite(game.world.centerX - tmpImg.width / 2.0, 0, this.legendMap[type])
    this.legend.y = 0

    let bounce = game.add.tween(this.legend)
    bounce.to({y: 350}, 500, Phaser.Easing.Bounce.Out)
    bounce.onComplete.add(this.pausedGame, this, game)
    bounce.start()
  }

  pausedGame (self) {
    self.game.paused = true
  }
}
