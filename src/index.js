import * as THREE from './three/build/three';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls';
import { ColladaLoader } from './three/examples/jsm/loaders/ColladaLoader';
import Camera from './Camera';
import Scene from './Scene';
import config from './config';

/**
 * Prepare renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(config.sceneSize.width, config.sceneSize.height);
document.body.appendChild(renderer.domElement);

/**
 * Preapare scene
 */
const scene = new Scene();

/**
 * Prepare camera
 */
var camera = new Camera().get();

/**
 * Prepare controls
 */
const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Prepare light
 */
const light = new THREE.DirectionalLight(config.baseColor, config.lightIntensivity);

const light2 = new THREE.DirectionalLight(config.baseColor, config.lightIntensivity);

light.position.set(5, 5, 1);
light2.position.set(-4, -1, 2);

const loader = new ColladaLoader();
loader.load(config.modelPath, (model) => {
    scene.add(light);
    scene.add(model.scene);
    controls.update();
});

function render() {
    setInterval(() => requestAnimationFrame(render), config.delay);
    renderer.render(scene.get(), camera);
}

render();