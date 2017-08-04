export default class Star {
  constructor () {
    this.star = null
  }

  create (i, stars) {
    // Create star, 120 is margin between stars
    this.star = stars.create(i * 120, 0, 'star')

    //  Let gravity do its thing
    this.star.body.gravity.y = 600

    //  This just gives each star a slightly random bounce value
    this.star.body.bounce.y = 0.2 + Math.random() * 0.2
  }
}
