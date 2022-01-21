import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";


/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();


/*
* Textures
* */
const textureLoader = new THREE.TextureLoader()

const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')
/*
* Fonts
* */
const fontLoader = new THREE.FontLoader()
let fontMesh = null
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextBufferGeometry(
        'Hello Fred',
        {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        }
    )

    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x- 0.02) * 0.5,
    //     -(textGeometry.boundingBox.max.y- 0.02) * 0.5,
    //     -(textGeometry.boundingBox.max.z- 0.03) * 0.5
    // )
    textGeometry.center()

    const material1 = new THREE.MeshMatcapMaterial({matcap: matcapTexture1})
    const material2 = new THREE.MeshMatcapMaterial({matcap: matcapTexture2})
    const material3 = new THREE.MeshMatcapMaterial({matcap: matcapTexture3})
    const material4 = new THREE.MeshMatcapMaterial({matcap: matcapTexture4})
    const material5 = new THREE.MeshMatcapMaterial({matcap: matcapTexture6})
    const material7 = new THREE.MeshMatcapMaterial({matcap: matcapTexture7})
    const material8 = new THREE.MeshMatcapMaterial({matcap: matcapTexture8})
    // textMaterial.wireframe = true
    const text = new THREE.Mesh(textGeometry, material8)
    scene.add(text)
    fontMesh = text
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    const sphereGeometry = new THREE.SphereBufferGeometry(0.3, 64, 64)

    for (let i = 0; i < 500; i++) {
        const randomNum = Math.random()

        let geometry = randomNum < 0.3 ? sphereGeometry : donutGeometry
        let material
        // console.log(randomNum)
        switch (true) {
            case 0 < randomNum && randomNum < 0.1:
                material = material1
                break;
            case 0.1 < randomNum && randomNum < 0.2:
                material = material2
                break;
            case  0.2 < randomNum && randomNum < 0.3:
                material = material3
                break;
            case 0.3 < randomNum && randomNum < 0.4:
                material = material4
                break;
            case 0.4 < randomNum && randomNum < 0.5:
                material = material5
                break;
            case 0.5 < randomNum && randomNum < 0.6:
                material = material7
                break;
            case 0.6 < randomNum && randomNum < 1:
                material = material8
                break;
        }
        // console.log(material)
        const floats = new THREE.Mesh(geometry, material)
        floats.position.x = (Math.random() - 0.5) * 15
        floats.position.y = (Math.random() - 0.5) * 15
        floats.position.z = (Math.random() - 0.5) * 15

        floats.rotation.x = Math.random() * Math.PI
        floats.rotation.y = Math.random() * Math.PI

        const scale = Math.random()
        floats.scale.set(scale, scale, scale)

        scene.add(floats)
    }
})

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    //

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();