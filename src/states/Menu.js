import Phaser from 'phaser'

export default class Menu extends Phaser.State {
  constructor () {
    super()

    this.button = null
    this.buttonPosY = 400
    this.bounce = null
  }

  create () {
    // Set global vars
    this.global = {
      sound: false
    }

    // Set general background
    this.game.stage.backgroundColor = '#00bbff'

    // Add Start Menu button
    this.button = this.game.add.button(this.game.world.centerX - 95, this.buttonPosY, 'buttonStart', this.startGame, this, 2, 1, 0)
    this.button.onInputOver.add(this.over, this)
    this.button.onInputOut.add(this.out, this)
    this.startBounceDown()
  }

  startBounceDown () {
    // Bounce down animation button
    this.bounce = this.game.add.tween(this.button)
    this.bounce.to({y: this.buttonPosY + 5}, 500, Phaser.Easing.Linear.In)
    this.bounce.onComplete.add(this.startBounceUp, this)
    this.bounce.start()
  }

  startBounceUp () {
    // Bounce up animation button
    this.bounce = this.game.add.tween(this.button)
    this.bounce.to({y: this.buttonPosY}, 500, Phaser.Easing.Bounce.In)
    this.bounce.onComplete.add(this.startBounceDown, this)
    this.bounce.start()
  }

  out () {
    // Restart animation when mouse is out of button
    this.startBounceDown()
  }

  over () {
    // Remove bounce animation when mouse is over button
    this.game.tweens.removeAll()
  }

  startGame () {
    // Navigate to Level 01
    this.state.start('Level01')
  }
}
