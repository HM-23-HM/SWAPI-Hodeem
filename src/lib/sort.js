
let testArray = [
    { name: 'Luke Skywalker' },
    { name: 'C-3PO' },
    { name: 'R2-D2' },
    { name: 'Darth Vader' },
    { name: 'Leia Organa' },
    { name: 'Owen Lars' },
    { name: 'Beru Whitesun lars' },
    { name: 'R5-D4' }
]

const AscendingCompareFn = (firstObject, secondObject) => {
    let firstEl = firstObject.name;
    let secondEl = secondObject.name;

    if (firstEl < secondEl) return -1;
    if (secondEl < firstEl) return 1;
    return 0;
}

const DescendingCompareFn = (firstObject, secondObject) => {
    let firstEl = firstObject.name;
    let secondEl = secondObject.name;

    if (firstEl > secondEl) return -1;
    if (secondEl < firstEl) return 1;
    return 0;
}

export const sortAscending = (unsortedArray) => {
    let sortedArray = [...unsortedArray].sort(AscendingCompareFn);
    return sortedArray;
}

export const sortDescending = (unsortedArray) => {
    let sortedArray = [...unsortedArray].sort(DescendingCompareFn);
    return sortedArray;
}