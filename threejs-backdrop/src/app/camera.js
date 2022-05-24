import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import World from "./app";

export default class Camera {

    constructor() {
        this.world = new World()
        this.sizes = this.world.sizes
        this.scene = this.world.scene
        this.canvas = this.world.canvas
        this.setInstance()
        this.setOrbitControls()
    }

    setInstance () {
        this.instance = new THREE.PerspectiveCamera(40, this.sizes.width / this.sizes.height, 1, 500)
        this.instance.position.set(9, 13, -9)
        this.scene.add(this.instance)
    }

    setOrbitControls () {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.target.set(0, 0.75, 0)
        this.controls.enableDamping = true
        this.controls.autoRotate = false
    }

    resize () {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update () {
        this.controls.update()
    }
}