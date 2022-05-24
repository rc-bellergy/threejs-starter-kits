// import * as THREE from "three"
import App from "../app"
import Ico from './ico'
import Lights from './lights'
import Backdrop from './backdrop'

export default class Wrold {
    constructor() {
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources

        this.resources.on('ready', () => {

            // Show the canvas
            this.app.canvas.style.setProperty('display', 'block')

            // Setup
            this.ico = new Ico()
            this.backdrop = new Backdrop(this.resources.items['backdropModel'])
            this.lights = new Lights()
        })
    }
}