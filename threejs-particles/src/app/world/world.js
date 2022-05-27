// import * as THREE from "three"
import App from "../app"
import Particles from "./particles"

export default class Wrold {
    constructor() {
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources

        this.resources.on('ready', () => {

            // Show the canvas
            this.app.canvas.style.setProperty('display', 'block')

            // Setup
            this.particles = new Particles(this.resources.items['splashWaterXZ'])
        })
    }
}