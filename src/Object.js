

class Object {

    constructor() {
        this.points = [];
        this.vectors = [];
    }

    init(points) {
        this.points = points;
    }

    scale (koef) {
        this.vectors.forEach(vector => vector.multiply(koef))
    }

    transform(koef) {
        this.vectors.forEach(vector => vector.add(koef));
    }
}

export default Object;