import "./style.css";
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'

/**
 * Debug
 * **/
const gui = new dat.GUI({ width: 400})
// gui.hide()
const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {y: mesh.rotation.y + 10, duration: 1})
    }
}
gui
    .addColor(parameters, 'color')
    .onChange((color) => {
        material.color.set(color)
    })

gui
    .add(parameters, 'spin')
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({color: parameters.color});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Debug
gui
    .add(mesh.position, 'x')
    .min(-1)
    .max(3)
    .step(0.01)
    .name('red cube X')
gui
    .add(mesh.position, 'y')
    .min(-1)
    .max(3)
    .step(0.01)
    .name('red cube Y')
gui
    .add(mesh.position, 'z')
    .min(-1)
    .max(3)
    .step(0.01)
    .name('red cube Z')
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    console.log(canvas.webkitRequestFullscreen)
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen().then(() => {
            })
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
        canvas.requestFullscreen().then(() => {
        })
        console.log('go full Screen')
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
            })
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen().then(() => {
            })
        }

    }
})

// Camera 45 -75
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 200)

camera.position.z = 3;
camera.lookAt(mesh.position)
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y =1
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
// 3太多了
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.render(scene, camera);


// Animations
const tick = () => {

    // update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
