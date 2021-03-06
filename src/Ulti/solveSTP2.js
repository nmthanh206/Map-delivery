import axios from "axios";

const MY_TOKEN =
  "pk.eyJ1IjoiY3V0cmUiLCJhIjoiY2tucGUwMXdvMDUyZzJvbW83eHRwbzhnMyJ9.oRDaQnKxG0jhXpa-MZ78lQ";
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

export const SolveSTP2 = async (control, setPoints, method) => {
  // const result = await SolveSTP(control, setPoints);
  const result = new Promise(async (resolve, reject) => {
    try {
      const wps = control
        .getPlan()
        .getWaypoints()
        .filter(wp => wp.latLng); //bo may wps bi null ma no tu seet amc dinh neu minh ko set 2 cai wp ban dau cho no
      control.getPlan().setWaypoints(wps);
      const pointsArray = control
        .getPlan()
        .getWaypoints()
        .map(({ latLng }) => `${latLng.lng},${latLng.lat};`); //cai nay phai de nguoc lng lat moi fetch duoc
      const points = pointsArray.toString().replaceAll(";,", ";").slice(0, -1);
      // console.log(costMatrix);
      // const curb = Array(pointsArray.length).fill("curb").join(";");
      // const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${points}?approaches=${curb}&annotations=distance&access_token=${MY_TOKEN}`;
      // const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${points}?annotations=distance&access_token=${MY_TOKEN}`;
      // const method = "walking";
      const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/${method}/${points}?annotations=distance&access_token=${MY_TOKEN}`;
      console.log(url);
      const solution = await axios.get(url);
      console.log("MATRIX:  ", solution.data.distances);
      // return;
      // const costMatrix = getMatrix(pointsArray);
      const costMatrix = solution.data.distances;
      // const result2 = permutator(
      //   Array.from(Array(pointsArray.length).keys())
      // ).map(path => [...path]);
      const result2 = permutator(
        Array.from({ length: pointsArray.length - 1 }, (_, i) => i + 1) //- 1 o day
      ).map(path => [0, ...path]); //them 0 dau o day path => [0, ...path]
      console.log("Hoan Vi :", result2);
      let min = Infinity;
      let index = 0;
      let pathCost = 0;
      for (let i = 0; i < result2.length; i++) {
        pathCost = 0;
        for (let j = 0; j < result2[i].length - 1; j++) {
          let from = result2[i][j];
          let to = result2[i][j + 1];
          pathCost += costMatrix[from][to];
        }
        if (pathCost < min) {
          min = pathCost;
          index = i;
        }
      }
      const oldwp = control
        .getPlan()
        .getWaypoints()
        .map(({ latLng }) => [latLng.lat, latLng.lng]);

      console.log("old wp", oldwp);
      const newwp = new Array(oldwp.length).fill(0);
      for (let i = 0; i < oldwp.length; i++) {
        console.log(oldwp[result2[index][i]]);
        newwp[i] = oldwp[result2[index][i]];
      }
      // console.log("toa do moi", newwp);
      control.getPlan().setWaypoints(newwp);
      setPoints(newwp);
      // console.log(setPoints);
      control.show(); //show chi duong chi tiet
      control.route();
      console.log(control.getRouter());
      console.log(result);
      resolve([result2[index], min]);
    } catch {
      reject("Bi block roi =((");
    }
  });
};
