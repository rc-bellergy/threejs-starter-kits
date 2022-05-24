import anime from 'animejs/lib/anime.es.js'

// Camera animation
export function play (camera, settings, viewID) {

    switch (viewID) {
        case 1:
            anime({
                targets: camera.position,
                y: 10, z: 70,
                duration: 5000,
                // delay: 5000,
                easing: 'easeOutCubic'
            })
            break

        default:
            console.log("viewID not found")
            break
    }

}