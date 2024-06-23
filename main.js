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

//  lighting
const pointLight = new THREE.PointLight(0xffffff, 20,0, 2) // arguments color, intensity, distance, decay
pointLight.position.set(0, 2, 5)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight, pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)

// // grid
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper) // shows light source

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

//  sun
const sunTexture = new THREE.TextureLoader().load('/images/8k_sun.jpg')
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(20, 32, 32),
    new THREE.MeshBasicMaterial({
        map: sunTexture
    })
)

scene.add(sun)
sun.position.x=0
sun.position.y=0
sun.position.z=-50



//  mercury
const mercuryTexture = new THREE.TextureLoader().load('/images/mercury_surface.jpg')
const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(.15, 60, 60),
    new THREE.MeshBasicMaterial({
        map: mercuryTexture
    })
)
scene.add(mercury)
mercury.position.x=-.5
mercury.position.y=0
mercury.position.z=25


//  venus
const venusTexture = new THREE.TextureLoader().load('/images/venus_surface.jpg')
const venus = new THREE.Mesh(
    new THREE.SphereGeometry(.37, 32, 32),
    new THREE.MeshBasicMaterial({
        map: venusTexture
    })
)
scene.add(venus)
venus.position.x=-1
venus.position.y=0
venus.position.z=27

//  earth
const earthTexture = new THREE.TextureLoader().load('/images/earth_surface.jpg')
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(.39, 60, 60),
    new THREE.MeshBasicMaterial({
        map: earthTexture
    })
)

scene.add(earth)

earth.position.x=-1.5
earth.position.y=0
earth.position.z=30

//  mars
const marsTexture = new THREE.TextureLoader().load('/images/mars_surface.jpg')
const mars = new THREE.Mesh(
    new THREE.SphereGeometry(.21, 60, 60),
    new THREE.MeshBasicMaterial({
        map: marsTexture
    })
)

scene.add(mars)

mars.position.x=-3
mars.position.y=0
mars.position.z=32

//  jupiter
const jupiterTexture = new THREE.TextureLoader().load('/images/jupiter_surface.jpg')
const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(4.3, 60, 60),
    new THREE.MeshBasicMaterial({
        map: jupiterTexture
    })
)

scene.add(jupiter)

jupiter.position.x=-8
jupiter.position.y=0
jupiter.position.z=40

//  saturn
const saturnTexture = new THREE.TextureLoader().load('/images/saturn_surface.jpg')
const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(3.6, 60, 60),
    new THREE.MeshBasicMaterial({
        map: saturnTexture
    })
)

scene.add(saturn)
saturn.position.x=-11
saturn.position.y=0
saturn.position.z=55

//  saturn rings
const ringTexture = new THREE.TextureLoader().load('/images/jupiter_surface.jpg')
const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.7, 3, 2, 55),
    new THREE.MeshBasicMaterial({
        map: ringTexture
     })
)
ring.rotateX(1.7)


scene.add(ring)
ring.position.x=-11
ring.position.y=0
ring.position.z=55

//  uranus
const uranusTexture = new THREE.TextureLoader().load('/images/uranus_surface.jpg')
// uranusTexture.rotation = 2
const uranus = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 60, 60),
    new THREE.MeshBasicMaterial({
        map: uranusTexture,
    })
)

scene.add(uranus)
uranus.position.x=-11.5
uranus.position.y=0
uranus.position.z=65

//  neptune
const neptuneTexture = new THREE.TextureLoader().load('/images/neptune_surface.jpg')
const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 60, 60),
    new THREE.MeshBasicMaterial({
        map: neptuneTexture,
    })
)

scene.add(neptune)
neptune.position.x=-12
neptune.position.y=0
neptune.position.z=70

//  pluto
const plutoTexture = new THREE.TextureLoader().load('/images/pluto_surface.jpg')
const pluto = new THREE.Mesh(
    new THREE.SphereGeometry(.1, 60, 60),
    new THREE.MeshBasicMaterial({
        map: plutoTexture,
    })
)

scene.add(pluto)
pluto.position.x=-12.
pluto.position.y=0
pluto.position.z=75



function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    // moon.rotation.x += 0.05;
    // moon.rotation.y += 0.075;
    // moon.rotation.z += 0.05;

    // planet.rotation.x += 0.05;
    // planet.rotation.y += 1;
    // planet.rotation.z += 0.05;

    // Adjusted multipliers for a more noticeable effect
    camera.position.z = t * -0.01; // Adjust this value to control zoom effect on scroll
    camera.position.x = t * -0.002; // Adjust for horizontal movement
    camera.position.y = t * -0.002; // Adjust for vertical movement
    camera.rotation.y = t * -0.002; // Adjust for rotation effect
    camera.rotation.z = t * -0.002; // Adjust for rotation effect
}

document.body.onscroll = moveCamera;

//  saturn ring movement
function animate() {
    requestAnimationFrame(animate)

    ring.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.01)
    earth.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01)
    mars.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01)
    jupiter.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.03)
    saturn.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.03)
    uranus.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.02)
    neptune.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.02)

    controls.update()

    renderer.render(scene, camera)
}

animate()

//  return perspective to update camera position on key press maybe?

