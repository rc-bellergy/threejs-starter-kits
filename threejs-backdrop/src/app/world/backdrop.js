import * as THREE from 'three'
import App from "../app"


export default class Backdrop {

    constructor(glb) {
        this.app = new App()
        this.scene = this.app.scene

        const backdrop = glb.scene
        backdrop.scale.set(4, 4, 4)
        backdrop.position.set(0, 10, 10)
        backdrop.receiveShadow = true // shadow not work when lightProbe added

        this.scene.add(backdrop)
    }
}
