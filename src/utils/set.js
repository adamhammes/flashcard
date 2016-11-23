const setIsSuperset = function(a, b) {
    for (var elem of b) {
        if (!a.has(elem)) {
            return false;
        }
    }
    return true;
}

const setUnion = function(setA, setB) {
    var union = new Set(setA);
    for (var elem of setB) {
        union.add(elem);
    }
    return union;
}

const setIntersection = function(setA, setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

const setDifference = function(setA, setB) {
    var difference = new Set(setA);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

const elemFromSet = function(set) {
    for (let elem of set) {
        return elem;
    }

    return null;
}

export { setIsSuperset, setUnion, setIntersection, setDifference, elemFromSet}