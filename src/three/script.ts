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
            tree.scale.set(5, 5, 5);
            tree.position.set(0, -12, -5);
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

// STARS // STARS // STARS
const geometry = new THREE.TetrahedronGeometry(0.09,5);
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
})
const starsArray = new THREE.Object3D()
scene.add(starsArray)
for(let i = 0; i< 600; i++) {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5)
        mesh.position.multiplyScalar(90 + (Math.random() * 7))
        mesh.rotation.set(Math.random() * 20,Math.random() * 20,Math.random() * 20)
        starsArray.add(mesh)
}

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
let lastScrollTop = 0;


const onDocumentScroll = (event) => {
    const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop){
        console.log('scrolling down,', event)
        
        // downscroll code
    } else {
        console.log('scrolling up,', event)
       // upscroll code
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling   
}

document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('scroll',onDocumentScroll)

const clock = new THREE.Clock();
 window.setInterval(() => {
    action.stop();
    action.setLoop(THREE.LoopPingPong, 500000).play()
    mixer.setTime(3)
}, 8400)

const tick = () =>
{
    starsArray.rotation.x += 0.000;
    starsArray.rotation.y -= 0.0040;
    starsArray.rotation.z -= 0.002;



    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Update Objects
    const elapsedTime = clock.getElapsedTime();
    if(tree) {
        tree.rotation.y = .2 * elapsedTime;
        tree.rotation.y += .5 * (targetX - tree.rotation.y)
        tree.rotation.x += .5 * (targetY - tree.rotation.x)
        
        tree.position.x  += .5 * ((mouseX * 0.04) - tree.position.x)
        tree.position.y  += .5 * (- (mouseY * 0.01) - tree.position.y)
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