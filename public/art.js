// Parte do código foi feito junto com o vídeo: https://www.youtube.com/watch?v=YK1Sw_hnm58
// Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';


// Setting basics
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene(); // Creating the scene object
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000); // Creating the camera object
const renderer = new THREE.WebGLRenderer(); // Creating the renderer

// Setting GUI
const gui = new GUI();
const world = {
    plane: {
        width: 10,
        height: 10,
        widthSegments: 10,
        heightSegments: 10,
        color: {
            r: 0.5,
            g: 0,
            b: 0.15
        }
    }
};
gui.add(world.plane, 'width', 1, 25).onChange(() => {
    generatePlane();
});
gui.add(world.plane, 'height', 1, 25).onChange(() => {
    generatePlane();
});
gui.add(world.plane, 'widthSegments', 1, 25).onChange(() => {
    generatePlane();
});
gui.add(world.plane, 'heightSegments', 1, 25).onChange(() => {
    generatePlane();
});
gui.add(world.plane.color, 'r', 0, 1).onChange(() => {
    generatePlane();
});
gui.add(world.plane.color, 'g', 0, 1).onChange(() => {
    generatePlane();
});
gui.add(world.plane.color, 'b', 0, 1).onChange(() => {
    generatePlane();
});

// Setting the camera to be on position 5
camera.position.z = 5

// Renderer settings
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
new OrbitControls(camera, renderer.domElement)

// Creating lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light)

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight)

function getHEXColor() {
    const hex = "0x"
    const red = (255*world.plane.color.r).toString(16);
    const green = (255*world.plane.color.g).toString(16);
    const blue = (255*world.plane.color.b).toString(16);
    console.log(parseInt(red, 16));
    console.log(parseInt(green, 16));
    console.log(parseInt(blue, 16));
}

function RGBToHex(rgb) {
    // Fonte: https://css-tricks.com/converting-color-spaces-in-javascript/
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return r + g + b;
}

let colorText = `rgb(${parseInt(255*world.plane.color.r)}, ${parseInt(255*world.plane.color.g)}, ${parseInt(255*world.plane.color.b)})`;
const hexColor = RGBToHex(colorText);

// Creating Objects
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({color: parseInt(hexColor, 16), side: THREE.DoubleSide, flatShading: THREE.FlatShading, vertexColors: true});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

// Adding objects to the scene
scene.add(planeMesh)
function randomize_texture() {
    const {array} = planeMesh.geometry.attributes.position
    for (let i = 0; i < array.length; i += 3) {
        const z = array[i + 2];
        array[i + 2] = z + Math.random();
    }
    planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;
}

function generatePlane() {
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);
    randomize_texture();
    calculateVertexColors();
}

const mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth)*2 - 1;
    mouse.y = -(event.clientY / innerHeight)*2 + 1;
});

function calculateVertexColors() {
    const colors = [];
    const planeMeshVertexCount = planeMesh.geometry.attributes.position.count;
    for (let i = 0; i < planeMeshVertexCount; i++) {
        colors.push(world.plane.color.r, world.plane.color.g, world.plane.color.b);
    }
    planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
}
calculateVertexColors();

let frame = 0;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    frame += 0.01;

    raycaster.setFromCamera(mouse, camera);

    // Moving animation
    const {array, originalPosition} = planeMesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
        array[i] = originalPosition[i] + Math.cos(frame + Math.random() - 0.05) * 0.001;
        array[i + 1] = originalPosition[i + 1] + Math.sin(frame + Math.random() - 0.05) * 0.001;
        array[i + 2] = originalPosition[i + 2] + Math.cos(frame + Math.random()) * 0.0001;
    }
    planeMesh.geometry.attributes.position.needsUpdate = true;

    const intersects = raycaster.intersectObject(planeMesh);
    if (intersects.length > 0) {
        const {color} = intersects[0].object.geometry.attributes;
        // Vertex 1
        color.setX(intersects[0].face.a, world.plane.color.r*1.5);
        color.setY(intersects[0].face.a, world.plane.color.g*1.5);
        color.setZ(intersects[0].face.a, world.plane.color.b*1.5);

        // Vertex 2
        color.setX(intersects[0].face.b, world.plane.color.r*1.5);
        color.setY(intersects[0].face.b, world.plane.color.g*1.5);
        color.setZ(intersects[0].face.b, world.plane.color.b*1.5);

        // Vertex 3
        color.setX(intersects[0].face.c, world.plane.color.r*1.5);
        color.setY(intersects[0].face.c, world.plane.color.g*1.5);
        color.setZ(intersects[0].face.c, world.plane.color.b*1.5);

        color.needsUpdate = true
    }
}

randomize_texture();
animate();