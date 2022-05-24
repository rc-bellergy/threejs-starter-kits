import * as THREE from 'three'
import App from "../app"

export default class Plane {

    constructor() {
        this.app = new App()
        this.scene = this.app.scene

        const geometry = new THREE.PlaneGeometry(10, 10, 10, 10)
        const material = new THREE.MeshStandardMaterial({ color: 0x555555 })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.y = -1.8
        mesh.rotation.x = - Math.PI * 0.5
        this.scene.add(mesh)
    }
}
