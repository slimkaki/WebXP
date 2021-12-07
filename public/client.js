import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'


// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement)

// TEXT
var loader = new THREE.FontLoader();
const gui = new GUI();
loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

    const geometry = new THREE.TextGeometry( 'Hello three.js!', {
        font: font,
        size: 20,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    } );
    var textsMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var text = new THREE.Mesh(geometry, textsMaterial);
    text.position.set(0, 0, 0);
    text.name = "cg"; 
    scene.add(text);
    const textFolder = gui.addFolder('Text')
    textFolder.add(text.scale, 'x', -5, 5)
    textFolder.add(text.scale, 'y', -5, 5)
    textFolder.add(text.scale, 'z', -5, 5)
    textFolder.open()
} );



const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', -5, 10);
cameraFolder.open()

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

// ANIMATE
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}
animate();
// animate()
// document.body.appendChild(renderer.domElement);
// animate();
///////////////////////////////////////////////////////////////
// // Scene
// const scene = new THREE.Scene()

// // Camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
// camera.position.z = 2

// // Renderer
// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// // Controls
// const controls = new OrbitControls(camera, renderer.domElement)

// // Objects

// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// window.addEventListener(
//     'resize',
//     () => {
//         camera.aspect = window.innerWidth / window.innerHeight
//         camera.updateProjectionMatrix()
//         renderer.setSize(window.innerWidth, window.innerHeight)
//         render()
//     },
//     false
// )

// const stats = Stats()
// document.body.appendChild(stats.dom)

// const gui = new GUI()
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(cube.scale, 'x', -5, 5)
// cubeFolder.add(cube.scale, 'y', -5, 5)
// cubeFolder.add(cube.scale, 'z', -5, 5)
// cubeFolder.open()
// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'z', 0, 10)
// cameraFolder.open()

// function animate() {
//     requestAnimationFrame(animate)
//     cube.rotation.x += 0.01
//     cube.rotation.y += 0.01
//     controls.update()
//     render()
//     stats.update()
// }

// function render() {
//     renderer.render(scene, camera)
// }

// animate()
//////////////////////////////////////////////////////////////