export default class Player {
  constructor () {
    this.player = null
    this.game = null
    this.platforms = null
    this.hitPlatform = null
    this.walkLeft = false
    this.walkRight = false
    this.turnLeft = this._turnLeft
    this.turnRight = this._turnRight
    this.jump = this._jump
  }

  create (game, platforms) {
    // Set game and platforms
    this.game = game
    this.platforms = platforms

    // The player and its settings
    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude')

    // We need to enable physics on the player
    this.game.physics.arcade.enable(this.player)

    // Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 200
    this.player.body.collideWorldBounds = true

    // Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true)
    this.player.animations.add('right', [5, 6, 7, 8], 10, true)
  }

  update () {
    // Collide the player and the stars with the platforms
    this.hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms)
    let cursors = this.game.input.keyboard.createCursorKeys()

    // Reset the players velocity (movement)
    this.player.body.velocity.x = 0

    if (cursors.left.isDown || this.walkLeft) {
      // Move to the left
      this.player.body.velocity.x = -150
      this.player.animations.play('left')
    } else if (cursors.right.isDown || this.walkRight) {
      // Move to the right
      this.player.body.velocity.x = 150
      this.player.animations.play('right')
    } else {
      // Stand still
      this.player.animations.stop()

      this.player.frame = 4
    }

    // Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && this.player.body.touching.down && this.hitPlatform) {
      this.player.body.velocity.y = -350
    }
  }

  _turnLeft () {
    this.player.walkRight = false
    this.player.walkLeft = true
  }

  _turnRight () {
    this.player.walkLeft = false
    this.player.walkRight = true
  }

  _jump () {
    if (this.player.player.body.touching.down && this.player.hitPlatform) {
      this.player.player.body.velocity.y = -350
    }
  }
}
