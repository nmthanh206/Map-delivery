const permutator = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const costMatrix = [
  [0, 1, 3, 45],
  [1, 0, 24, 3],
  [3, 24, 0, 52],
  [45, 3, 52, 0],
];

// const result2 = permutator([0, 1, 2, 3]);
const result2 = permutator([1, 2, 3]).map(arr => [0, ...arr]);
console.log(result2);
let min = Infinity;
let index = 0;
let pathCost = 0;
for (let i = 0; i < result2.length; i++) {
  pathCost = 0;
  for (let j = 0; j < result2[i].length - 1; j++) {
    let from = result2[i][j];
    let to = result2[i][j + 1];
    console.log(`From: ${from} ; To: ${to}`);
    pathCost += costMatrix[from][to];
    console.log(result2[i], pathCost);
  }
  console.log("Sum Pathcost", result2[i], pathCost);
  if (pathCost < min) {
    min = pathCost;
    index = i;
  }
}

console.log("final result", result2[index], min);
