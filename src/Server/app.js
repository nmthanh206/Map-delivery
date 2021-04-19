const express = require("express");
const cors = require("cors");
const solver = require("node-tspsolver");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/tsp", (req, res) => {
  console.log(req.body.points);
  const costMatrix = JSON.parse(req.body.points);
  solver.solveTsp(costMatrix, true, {}).then(function (result) {
    console.log(result);
    res.status(200).json({ result: result });
  });
  // res.status(200).json({ good: costMatrix });
});

app.listen(3001, () => console.log("server running at http://localhost:3001/"));

// const costMatrix = [
//   [0, 1, 3, 4],
//   [1, 0, 2, 3],
//   [3, 2, 0, 5],
//   [4, 3, 5, 0],
// ];
// // const string = costMatrix.toString();
// const string = JSON.stringify(costMatrix);
// console.log(string);
// const array = JSON.parse(string);
// console.log(array);

// const costMatrix = [
//   [0, 1, 3, 4],
//   [1, 0, 2, 3],
//   [3, 2, 0, 5],
//   [4, 3, 5, 0],
// ];

// solver.solveTsp(costMatrix, true, {}).then(function (result) {
//   console.log(result);
// });
