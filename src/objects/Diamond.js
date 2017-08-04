export default class Diamond {
  constructor () {
    this.diamond = null
  }

  create (i, diamonds) {
    // Create star, 120 is margin between stars
    this.diamond = diamonds.create(i * 400, 0, 'diamond')

    //  Let gravity do its thing
    this.diamond.body.gravity.y = 600

    //  This just gives each star a slightly random bounce value
    this.diamond.body.bounce.y = 0.2 + Math.random() * 0.2
  }
}
