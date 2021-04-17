import axios from "axios";
const costMatrix = [
  [0, 1, 3, 4],
  [1, 0, 2, 3],
  [3, 2, 0, 5],
  [4, 3, 5, 0],
];
export async function solveSTP() {
  try {
    const response = await axios.get(`http://localhost:3001/tsp`, {
      points: costMatrix,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
