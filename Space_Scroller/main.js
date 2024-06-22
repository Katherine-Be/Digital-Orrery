//test e if bootstrap can be used to make the window responsive to window size changes

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



//  scene
const scene = new THREE.Scene()

//  camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//  renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

//  torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

//  lighting
const pointLight = new THREE.PointLight(0xffffff, 20,0, 2) // arguments color, intensity, distance, decay
pointLight.position.set(0, 2, 5)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight, pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)

// grid
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper) // shows light source

//allow mouse perspective control
const controls = new OrbitControls(camera, renderer.domElement)

// add randomly placed "stars" to scene
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)

//  background
const spaceTexture = new THREE.TextureLoader().load('/images/milky_way.jpg')
scene.background = spaceTexture

//  torus movement
function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    controls.update()

    renderer.render(scene, camera)
}

animate()

//  return perspective to update camera position on key press maybe?

