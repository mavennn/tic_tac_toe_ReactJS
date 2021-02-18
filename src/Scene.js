import * as THREE from './three/build/three';
import Object from './Object';

class Scene {
   
    constructor() {
        this.inner = new THREE.Scene();
        this.inner.background = new THREE.Color('white');
        this.objects = [];
    }
    
    init () {

    }

    add(object) {
        this.inner.add(object);
    }

    get() {
        return this.inner;
    }

    scale (koef) {
        this.objects.forEach((object) => object.scale(koef));
    }

    transform(koef) {
        this.objects.forEach(() => object.transform(koef));
    }
}

export default Scene;