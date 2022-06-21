function generateArrayPairs() 
{
  let arrayPairs = [];
  for (let i = 0; i < 100; ++i) 
  {
    let a1 = [];
    let a2 = [];

    for(let j = 0; j < 1000000; ++j) 
    {
      let n1 = ~~(10000000*Math.random());
      let n2 = ~~(10000000*Math.random());
      a1.push(n1);
      a2.push(n2);
    }

    arrayPairs.push([Array.from(new Set(a1)), Array.from(new Set(a2))]);
  }
  return arrayPairs;
}

function binarySearch(arr, searchElement){
  let left = 0, right = arr.length - 1, mid;
  while (right > left) {
    mid = ~~((left + right + 1) / 2);
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

function findIntersectionBS(array1, array2)
{
  array2.sort((a, b) => a-b);
  let found = 0;
  for (let i = 0; i < array1.length; ++i) {
    binarySearch(array2, array1[i]) > -1 && (array1[found++] = array1[i]);
  }
  array1.length = found;
}

function findIntersectionHash(array1, array2) 
{
  let array2Map = {};
  array2.map(e => array2Map[e] = true);
  let found = 0;
  for (let i = 0; i < array1.length; ++i) {
    array2Map[array1[i]] && (array1[found++] = array1[i]);
  }
  array1.length = found;
}

let arrayPairs;

console.time("Init arrays for hash");
arrayPairs = generateArrayPairs();
console.timeEnd("Init arrays for hash");

console.time("Find intersections hash");
arrayPairs.map(e => {
  findIntersectionHash(...e);
});
console.timeEnd("Find intersections hash");


console.time("Init arrays for BS");
arrayPairs = generateArrayPairs();
console.timeEnd("Init arrays for BS");

console.time("Find intersections BS");
arrayPairs.map(e => {
  findIntersectionBS(...e);
});
console.timeEnd("Find intersections BS");
