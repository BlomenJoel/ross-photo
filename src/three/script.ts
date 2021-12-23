import './style.css'
import * as THREE from 'three'

export const test = async (dispatch):Promise<void> => {
// Scene
const scene = new THREE.Scene()

// Load GLFT
let tree = undefined;
let mixer = undefined;
let action = undefined;
const DRACOLoaderImport = () => import('three/examples/jsm/loaders/DRACOLoader.js')
const GLTFLoaderImport = () => import('three/examples/jsm/loaders/GLTFLoader.js');

Promise.all([GLTFLoaderImport(), DRACOLoaderImport()]).then(result => {
    const gltfLoader = new result[0].GLTFLoader();
    const dracoLoader = new result[1].DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    
    gltfLoader.setDRACOLoader( dracoLoader );
    // Load a glTF resource
    gltfLoader.load(
        // resource URL
        'models/drone/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            scene.add( gltf.scene );
            dispatch('loaded')
            tree = gltf.scene;
            tree.scale.set(7, 7, 7);
            tree.position.set(0, -8, -5);
            const animations: THREE.AnimationClip[] =  gltf.animations;
            mixer = new THREE.AnimationMixer(gltf.scene);
            action = mixer.clipAction(animations[0])
            action.setLoop(THREE.LoopPingPong, 500000).play()
            mixer.setTime(3)
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'Error while loading gltf', error );
        }
    );
}).catch(err => {console.log('error while loadibg importers', err)})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth/1,
    height: window.innerHeight/1.5
}
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// // Lights
// LIGHT 1
const pointLight1 = new THREE.PointLight(0xffffff, 2)
pointLight1.position.set(20,-20,960)
pointLight1.intensity = 4,5

scene.add(pointLight1)

const pointLightHelper = new THREE.PointLightHelper(pointLight1, 1)
scene.add(pointLightHelper)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = -10
camera.position.z = 50

scene.add(camera)

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)   
}

document.addEventListener('mousemove', onDocumentMouseMove);

const clock = new THREE.Clock();
 window.setInterval(() => {
    action.stop();
    action.setLoop(THREE.LoopPingPong, 500000).play()
    mixer.setTime(2)
}, 8400)

const tick = () =>
{

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Update Objects
    const elapsedTime = clock.getElapsedTime();
    if(tree) {
        tree.rotation.y = .5 * elapsedTime;
        tree.rotation.y += .5 * (targetX - tree.rotation.y)
        tree.rotation.x += .5 * (targetY - tree.rotation.x)
        
        tree.position.x  += .5 * (targetX - tree.position.x)
    }

    
    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    if(mixer) {
        mixer.update(0.0061)
    } 
}

tick()
}