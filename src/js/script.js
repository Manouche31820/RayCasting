import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { add } from 'three/examples/jsm/nodes/Nodes.js';

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 30, 30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);

scene.add(directionalLight);

directionalLight.position.set(-30, 50, 0);
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper);
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0FFFF,
    wireframe: false,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
let step = 0;
let speed = 0.01;
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
    renderer.render(scene, camera); 
    orbit.update();  // Update the controls each frame
}

renderer.setAnimationLoop(animate);
