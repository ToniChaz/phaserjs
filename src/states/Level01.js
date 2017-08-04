import Phaser from 'phaser'
import Player from '../objects/Player'
import Star from '../objects/Star'
import Ground from '../objects/Ground'
import Platform from '../objects/Platform'
import Legend from '../objects/Legend'
import Diamond from '../objects/Diamond'

export default class Level01 extends Phaser.State {
  constructor () {
    super()

    this.platforms = null
    this.player = new Player()
    this.stars = null
    this.diamonds = null
    this.door = null
    this.timer = null
    this.legend = new Legend()
    this.enemy = null
  }

  create () {
    // Set global vars
    this.game.global = {
      score: 500,
      scoreText: null,
      timerText: null,
      time: 60,
      sound: false
    }

    // We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    // A simple background for our game
    this.game.add.sprite(0, 0, 'sky')

    // The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group()

    // We will enable physics for any object that is created in this group
    this.platforms.enableBody = true

    let ground = new Ground()
    ground.create(this.platforms, this.game)

    // Now let's create two ledges
    let platform = new Platform(this.platforms)
    platform.create(966, 400)
    platform.create(-100, 200)

    // Add the door
    this.door = this.game.add.sprite(1200, 594, 'doorClose')
    this.game.physics.arcade.enable(this.door)
    this.door.enableBody = true
    this.door.body.immovable = true

    // Add the player
    this.player.create(this.game, this.platforms)

    //  We create one enemy
    this.enemy = this.game.add.sprite(500, this.game.world.height - 250, 'baddie')

    // Enemy physics properties. Give the little guy a slight bounce.
    this.game.physics.arcade.enable(this.enemy)
    this.enemy.body.bounce.y = 0.2
    this.enemy.body.gravity.y = 200
    this.enemy.body.collideWorldBounds = true

    // Our two animations, walking left and right.
    this.enemy.animations.add('left', [0, 1], 10, true)
    this.enemy.animations.add('right', [2, 3], 10, true)

    // Initialise enemy movement
    this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.initEnemiesMove, this)

    // The stars
    this.stars = this.game.add.group()
    this.stars.enableBody = true

    //  Here we'll create 12 of them evenly spaced apart
    for (let i = 0; i < 12; i++) {
      let star = new Star()
      star.create(i, this.stars)
    }

    // The diamonds
    this.diamonds = this.game.add.group()
    this.diamonds.enableBody = true

    //  Here we'll create 3 of diamonds
    for (let i = 1; i < 4; i++) {
      let diamond = new Diamond()
      diamond.create(i, this.diamonds)
    }

    // Add buttons
    this.game.add.button(10, 685, 'arrowsBtn', this.player.turnLeft, this, 3, 3, 3)
    this.game.add.button(1295, 685, 'arrowsBtn', this.player.turnRight, this, 1, 1, 1)
    this.game.add.button(1295, 435, 'arrowsBtn', this.player.jump, this, 2, 2, 2)

    // The score
    this.game.global.scoreText = this.game.add.text(16, 16, 'Money: 500 €', {fontSize: '32px', fill: '#121212'})

    //  Create our Timer
    this.timer = this.game.time.create(false)

    //  Set a TimerEvent to occur after 1 seconds
    this.timer.loop(1000, this.updateCounter, this)

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    this.game.global.timerText = this.game.add.text(640, 16, `Time: ${this.game.global.time}`, {fontSize: '32px', fill: '#121212'})
    this.timer.start()
  }

  update () {
    // Update the player
    this.player.update()

    // Checks to see if the player overlaps with any of the stars, diamonds or enemies, if he does call the collectStar function
    this.game.physics.arcade.collide(this.stars, this.platforms)
    this.game.physics.arcade.collide(this.diamonds, this.platforms)
    this.game.physics.arcade.collide(this.enemy, this.platforms)

    // Checks to see if the player overlaps with any of the stars, diamonds or enemies, if he does call the touchEnemy function
    this.game.physics.arcade.overlap(this.player.player, this.stars, this.collectStar, null, this)
    this.game.physics.arcade.overlap(this.player.player, this.diamonds, this.collectDiamond, null, this)
    this.game.physics.arcade.overlap(this.player.player, this.enemy, this.touchEnemy, null, this)

    // Enemy automatic movenemt
    if (this.enemy.x < 400) {
      this.enemy.body.velocity.x = 250
      this.enemy.animations.play('right')
    } else if (this.enemy.x > 760) {
      this.enemy.body.velocity.x = -250
      this.enemy.animations.play('left')
    }

    // If kill all stars open the door and can player collide
    if (this.diamonds.total === 0) {
      this.door.loadTexture('doorOpen')
      this.game.physics.arcade.collide(this.player.player, this.door, this.changeLevel, null, this)
    }
  }

  updateCounter () {
    if (this.game.global.time === 0 && this.legend.legend === null) {
      this.legend.create(this.game, 'gameOver')
      this.game.add.button(this.game.world.centerX - 95, 450, 'buttonStart', this.restartLevel, this, 2, 1, 0)
    } else if (this.legend.legend === null) {
      // Update time counter
      this.game.global.time--
      this.game.global.timerText.text = `Time: ${this.game.global.time}`
    }
  }

  touchEnemy (player) {
    player.kill()
    this.legend.create(this.game, 'retryAgain')
    this.game.add.button(this.game.world.centerX - 95, 450, 'buttonStart', this.retryAgain, this, 2, 1, 0)
  }

  initEnemiesMove () {
    this.enemy.body.velocity.x = 250
    this.enemy.animations.play('right')
  }

  collectStar (player, star) {
    // Removes the star from the screen
    star.kill()

    //  Add and update the score
    this.game.global.score += 10
    this.game.global.scoreText.text = `Money: ${this.game.global.score} €`
  }

  collectDiamond (player, diamond) {
    // Removes the star from the screen
    diamond.kill()

    //  Add and update the score
    this.game.global.score += 50
    this.game.global.scoreText.text = `Money: ${this.game.global.score} €`
  }

  changeLevel (player) {
    // Navigate to Level 02
    player.kill()
    this.legend.create(this.game, 'nextLevel')
    this.game.add.button(this.game.world.centerX - 95, 450, 'buttonStart', this.nextLevel, this, 2, 1, 0)
  }

  nextLevel () {
    this.state.start('Level02')
  }

  restartLevel () {
    this.legend.legend = null
    this.game.paused = false
    this.game.state.restart()
  }

  retryAgain () {
    this.legend.legend = null
    this.game.paused = false
    this.game.state.restart()
  }
}
