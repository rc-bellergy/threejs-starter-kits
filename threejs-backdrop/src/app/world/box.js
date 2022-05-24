import * as THREE from 'three'
import App from "../app"

export default class Box {

    constructor() {
        this.app = new App()
        this.scene = this.app.scene

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.y = 0.5
        this.scene.add(mesh)
    }

}
