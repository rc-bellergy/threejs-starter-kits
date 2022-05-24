import * as THREE from 'three'
import App from "../app"
import vertexShader from '../../shaders/point-cloud/vertex.glsl'
import fragmentShader from '../../shaders/point-cloud/fragment.glsl'

export default class Particles {

    constructor(particlesData) {
        this.app = new App()
        this.scene = this.app.scene
        this.sizes = this.app.sizes
        this.time = this.app.time

        this.shaderMaterial = new THREE.ShaderMaterial({
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uSize: { value: 18 * this.sizes.pixelRatio },
                uTime: { value: 0 },

                uFogNear: { value: 0 },
                uFogFar: { value: 400 }
            },
        })
        const particles = this.getParticles(particlesData, 1, [0, 220, 255])
        const object = this.createParticlesObject(particles, this.shaderMaterial)
        this.scene.add(object)

        // Frame update event
        this.time.on('tick', () => {
            this.update()
        })
    }

    update () {
        this.shaderMaterial.uniforms.uTime.value = this.time.elapsedTime
    }

    createParticlesObject (particles, shaderMaterial) {
        const bufferGeometry = new THREE.BufferGeometry()
        bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particles.points, 3))
        bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particles.colors, 3))
        bufferGeometry.setAttribute('aStartPosition', new THREE.Float32BufferAttribute(particles.startPoints, 3))
        bufferGeometry.setAttribute('aScale', new THREE.Float32BufferAttribute(particles.scales, 1))
        bufferGeometry.setAttribute('aDuration', new THREE.Float32BufferAttribute(particles.durations, 1))
        bufferGeometry.setAttribute('aJump', new THREE.Float32BufferAttribute(particles.jumps, 1))
        return new THREE.Points(bufferGeometry, shaderMaterial)
    }

    /**
     * 
     * @param {string} data The row data of particles
     * @param {number} percentage The percentage (0-1) of data be converted to particles
     * @returns 
     */
    getParticles (data, percentage = 1, color = [255, 255, 255]) {
        // convert the string to the points "x,y,z,r,g,b" array
        const p = data.split(/\r?\n/) // split lines to points
        const startPoints = [] // random start points
        const points = [] // points destination
        const colors = []
        const scales = []
        const durations = [] // durations move pront from start to destination
        const jumps = [] // a movement of the point in the destinationwsada

        for (let i = 0; i < p.length - 1; i++) {

            if (Math.random() <= percentage) {
                const data = p[i].split(',');

                // Set start position (random points in the sphere)
                const randomPoint = this.getSpherePoint(0.5);
                startPoints.push(randomPoint.x, randomPoint.y, randomPoint.z)

                // Set final positions
                const x2 = Number(data[0])
                const y2 = Number(data[1])
                const z2 = Number(data[2])
                points.push(x2, y2, z2)

                // Random duration and jumping noise
                let d = Math.random() + 2; // 2.x sec.
                let j = Math.random() * 0.03;
                // 5% particles will move more slowly and far than others
                if (Math.random() > 0.8) {
                    d = d * 2;
                    j = j * 10;
                }
                durations.push(d);
                jumps.push(j);

                // Set colors
                if (data.length > 3) {
                    // color provided by data
                    color = [data[3], data[4], data[5]]
                }
                const r = color[0] / 255 + Math.random() * 0.25;
                const g = color[1] / 255 + Math.random() * 0.25;
                const b = color[2] / 255 + Math.random() * 0.25;
                colors.push(r, g, b)

                // Set Size
                scales.push(Math.random() + 1)
            }
        }

        const particles = {
            points: points,
            colors: colors,
            scales: scales,
            startPoints: startPoints,
            durations: durations,
            jumps: jumps
        }

        // console.log("particles:", particles)

        return particles
    }

    // Random points in sphere
    getSpherePoint (scale) {
        let x = Math.random() - 0.5;
        let y = Math.random() - 0.5;
        let z = Math.random() - 0.5;

        let mag = Math.sqrt(x * x + y * y + z * z);
        x /= mag; y /= mag; z /= mag;

        let d = Math.random() * scale;
        return { x: x * d, y: y * d, z: z * d };
    }

}
