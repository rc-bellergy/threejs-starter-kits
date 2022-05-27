import * as THREE from 'three'
import { XzReadableStream } from 'xzwasm'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './event_emitter.js'

/**
 * Handle resource loading and emitting events
 */
export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders () {
        this.loaders = {}
        this.loaders.fileLoader = new THREE.FileLoader()
    }

    startLoading () {
        // Load each source

        for (const source of this.sources) {
            switch (source.type) {

                case 'csv':
                    this.loaders.fileLoader.load(
                        source.path,
                        (data) => {
                            this.sourceLoaded(source, data)
                        }
                    )
                    break;

                case 'xz':
                    const discompress = async (source) => {
                        const request = await fetch(source.path)
                        const response = new Response(
                            new XzReadableStream(request.body)
                        )
                        const data = await response.text()
                        console.log(data)
                        this.sourceLoaded(source, data)
                    }
                    discompress(source)
                    break;

                default:
                    console.log('source.type not found', source.type)
                    break;
            }
        }
    }

    sourceLoaded (source, file) {
        this.items[source.name] = file

        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }

    promiseLoader (loader, url) {
        return new Promise((resolve, reject) => {
            loader.load(url, data => resolve(data), null, reject)
        })
    }
}