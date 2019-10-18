import Game from './Game/Game.js'
import View from './Game/View.js'
import Controller from './Game/Controller.js'

const root = document.getElementById("root")

const game = new Game()
const view = new View(root, 400, 400, 20, 20)
const controller = new Controller(game, view)

window.game = game
window.view = view
window.controller = controller
