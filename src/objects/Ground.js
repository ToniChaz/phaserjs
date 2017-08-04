export default class Ground {
  constructor () {
    this.ground = null
  }

  create (platforms, game) {
    // Here we create the ground.
    this.ground = platforms.create(0, game.world.height - 100, 'ground')
    // Scale it to fit the width of the game (the original sprite is 1366x100 in size)
    this.ground.scale.setTo(3.5, 3.1)
    // This stops it from falling away when you jump on it
    this.ground.body.immovable = true
  }
}
