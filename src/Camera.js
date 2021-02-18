"use strict";
import * as THREE from './three/build/three';

class Camera {
    constructor() {
        this.inner = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.inner.position.set(0, 0, 200);
    }
   
    get() {
        return this.inner;
    }
}


export default Camera;