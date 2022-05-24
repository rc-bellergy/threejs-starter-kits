import * as THREE from 'three'
import EventEmitter from "./event_emitter";

export default class Time extends EventEmitter {

    constructor() {

        super()

        this.clock = new THREE.Clock()
        this.elapsedTime = 0

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick () {
        this.elapsedTime = this.clock.getElapsedTime()

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

}