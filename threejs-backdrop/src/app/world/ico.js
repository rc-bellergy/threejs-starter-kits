import * as THREE from 'three'
import App from "../app"


export default class Ico {

    constructor() {
        this.app = new App()
        this.scene = this.app.scene
        const geometry = new THREE.IcosahedronGeometry(3)
        const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.y = 0.85
        this.scene.add(mesh)
    }
}
