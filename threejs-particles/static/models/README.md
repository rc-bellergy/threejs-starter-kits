# How to use

## Load module 
Add modules to `/src/app/sources.js`.\
The `/src/app/utils/resource.js` will load the file.

    export default [
        {
            name: 'splashWaterXZ',
            type: 'xz',
            path: 'models/splash-water.csv.xz'
        }
    ]

In the `/src/app/world/world.js` create and add the object to the scene.

    this.particles = new Particles(this.resources.items['splashWaterXZ'])