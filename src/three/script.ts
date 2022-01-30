import './style.css'
import * as THREE from 'three'
import type { Dispatch } from '$lib/types';

const objectsDistance = 4

export const test = async (dispatch: Dispatch):Promise<void> => {
// Scene
const scene = new THREE.Scene()

// Load GLFT
let model = undefined;
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
            model = gltf.scene;
            model.scale.set(5, 5, 5);
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
}).catch(err => {console.log('error while loading importers', err)})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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

/**
 * Particles
 */
// Geometry
const particlesCount = 400
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 100
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffeded',
    sizeAttenuation: true,
    size: 0.06
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


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
// Group 
 const cameraGroup = new THREE.Group()
 scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = -10
camera.position.z = 50

cameraGroup.add(camera)

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
/**
 * Cursor
 */
const cursor = { x: 0, y: 0}
const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)   

    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
}

/**
 * Scroll
 */
 let scrollY = window.scrollY
 let currentSection = 0
 
 window.addEventListener('scroll', () =>
 {
     scrollY = window.scrollY
     const newSection = Math.round(scrollY / sizes.height)
 
     if(newSection != currentSection)
     {
         currentSection = newSection
     }
 })
document.addEventListener('mousemove', onDocumentMouseMove);

const clock = new THREE.Clock();

window.setInterval(() => {
    action.stop();
    action.setLoop(THREE.LoopPingPong, 500000).play()
    mixer.setTime(2)
}, 7800)

let previousTime = 0

const tick = () =>
{
    
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    camera.position.y = - scrollY / sizes.height * objectsDistance
    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    
    
    
    // Update Objects
    if(model) {
        // Constant rotation
        // model.rotation.y = .5 * elapsedTime;
        model.rotation.y += .5 * (targetX - model.rotation.y)
        model.rotation.x += .5 * (targetY - model.rotation.x)

        // model.position.x += (targetX - model.position.x) * 100
        // model.position.y += (targetX - model.position.y) * 100
        model.translateX(.5 * ((mouseX * 0.04) - model.position.x))
        model.translateY(.5 * (- (mouseY * 0.01) - model.position.y))
    
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