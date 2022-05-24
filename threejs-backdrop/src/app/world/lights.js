import * as THREE from 'three'
import App from "../app"

export default class Lights {

    constructor() {
        this.app = new App()
        this.scene = this.app.scene

        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
            encoding: THREE.sRGBEncoding, // since gamma is applied during rendering, the cubeCamera renderTarget texture encoding must be sRGBEncoding
            format: THREE.RGBAFormat
        })
        const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget)
        const lightProbe = new THREE.LightProbe()
        this.scene.add(lightProbe)

        // Directional Light
        const directionalLight = new THREE.DirectionalLight(0xffffff)
        directionalLight.intensity = 0.5
        directionalLight.position.set(29, 10, -10)
        directionalLight.castShadow = true
        this.scene.add(directionalLight)

        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
        this.scene.add(directionalLightHelper)

    }
}
