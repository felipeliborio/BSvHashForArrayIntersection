const INSTANCE_COUNT = 100;
const INSTANCE_SIZE = 1000000;

function generateArrayPairs() {
  let arrayPairs = [];
  for (let i = 0; i < INSTANCE_COUNT; ++i) {
    let a1 = [];
    let a2 = [];

    for (let j = 0; j < INSTANCE_SIZE; ++j) {
      let n1 = ~~(10 * INSTANCE_SIZE * Math.random());
      let n2 = ~~(10 * INSTANCE_SIZE * Math.random());
      a1.push(n1);
      a2.push(n2);
    }

    arrayPairs.push([Array.from(new Set(a1)), Array.from(new Set(a2))]);
  }
  return arrayPairs;
}

function binarySearch(arr, searchElement) {
  let left = 0,
    right = arr.length - 1,
    mid;
  while (right > left) {
    mid = (left + right + 1) >> 1;
    if (arr[mid] === searchElement) {
      return mid;
    }
    if (searchElement < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

function findIntersectionBS(array1, array2) {
  array2.sort((a, b) => a - b);
  let found = 0;
  for (let i = 0; i < array1.length; ++i) {
    binarySearch(array2, array1[i]) > -1 && (array1[found++] = array1[i]);
  }
  array1.length = found;
}

function findIntersectionHash(array1, array2) {
  let array2Map = {};
  array2.map((e) => (array2Map[e] = true));
  let found = 0;
  for (let i = 0; i < array1.length; ++i) {
    array2Map[array1[i]] && (array1[found++] = array1[i]);
  }
  array1.length = found;
}

function findIntersectionSet(array1, array2) {
  let array2Set = new Set(array2);
  let found = 0;
  for (let i = 0; i < array1.length; ++i) {
    array2Set.has(array1[i]) && (array1[found++] = array1[i]);
  }
  array1.length = found;
}

let arrayPairs;

console.time("Init arrays for hash");
arrayPairs = generateArrayPairs();
console.timeEnd("Init arrays for hash");

console.time("Find intersections hash");
arrayPairs.map((e) => {
  findIntersectionHash(...e);
});
console.timeEnd("Find intersections hash");

console.time("Init arrays for BS");
arrayPairs = generateArrayPairs();
console.timeEnd("Init arrays for BS");

console.time("Find intersections BS");
arrayPairs.map((e) => {
  findIntersectionBS(...e);
});
console.timeEnd("Find intersections BS");

console.time("Init arrays for set");
arrayPairs = generateArrayPairs();
console.timeEnd("Init arrays for set");

console.time("Find intersections set");
arrayPairs.map((e) => {
  findIntersectionSet(...e);
});
console.timeEnd("Find intersections set");
