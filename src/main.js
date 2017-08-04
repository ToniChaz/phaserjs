import 'pixi'
import 'p2'
import Phaser from 'phaser'

import Boot from './states/Boot'
import Preloader from './states/Preloader'
import Menu from './states/Menu'
import Level01 from './states/Level01'

class Game extends Phaser.Game {
  constructor () {
    super(1366, 768, Phaser.AUTO, 'game')

    // Load the state components
    this.state.add('Boot', Boot)
    this.state.add('Preloader', Preloader)
    this.state.add('Menu', Menu)
    this.state.add('Level01', Level01)

    // Navigate to Boot
    this.state.start('Boot')
  }
}

window.game = new Game()
