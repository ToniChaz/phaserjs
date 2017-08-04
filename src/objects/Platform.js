export default class Platform {
  constructor (platforms) {
    this.platform = null
    this.platforms = platforms
  }

  create (posX, posY) {
    // Create platform image
    this.platform = this.platforms.create(posX, posY, 'ground')

    // Scale it x2 - x1
    this.platform.scale.setTo(2, 1)
    this.platform.body.immovable = true
  }
}
