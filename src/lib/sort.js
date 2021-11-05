
let testArray = [
    { name: 'Luke Skywalker', homeworld: 'Tatooine'},
    { name: 'C-3PO', homeworld: 'Tatooine' },
    { name: 'R2-D2', homeworld: 'Naboo' },
    { name: 'Darth Vader', homeworld: 'Tatooine' },
    { name: 'Leia Organa', homeworld: 'Alderaan' },
    { name: 'Owen Lars', homeworld: 'Tatooine' },
    { name: 'Beru Whitesun lars', homeworld: 'Tatooine' },
    { name: 'R5-D4', homeworld: 'Tatooine' }
]

const AscendingCompareFn = (firstObject, secondObject) => {

    if(sortBy == 'homeworld'){
        var firstEl = firstObject.homeworld;
        var secondEl = secondObject.homeworld;
    }

    if(sortBy == 'vehicles'){
        var firstEl = firstObject.vehicles.length;
        var secondEl = secondObject.vehicles.length;
    }

    if(sortBy == 'starships'){
        var firstEl = firstObject.starships.length;
        var secondEl = secondObject.starships.length;
    }

    if (firstEl < secondEl) return -1;
    if (secondEl < firstEl) return 1;
    return 0;
}

const DescendingCompareFn = (firstObject, secondObject) => {

    if(sortBy == 'homeworld'){
        var firstEl = firstObject.homeworld;
        var secondEl = secondObject.homeworld;
    }

    if(sortBy == 'vehicles'){
        var firstEl = firstObject.vehicles.length;
        var secondEl = secondObject.vehicles.length;
    }

    if(sortBy == 'starships'){
        var firstEl = firstObject.starships.length;
        var secondEl = secondObject.starships.length;
    }

    if (firstEl > secondEl) return -1;
    if (secondEl < firstEl) return 1;
    return 0;
}

const sortAscending = (unsortedArray) => {
    let sortedArray = [...unsortedArray].sort(AscendingCompareFn);
    return sortedArray;
}

const sortDescending = (unsortedArray) => {
    let sortedArray = [...unsortedArray].sort(DescendingCompareFn);
    return sortedArray;
}

