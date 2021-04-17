const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/tsp", (req, res) => {
  // res.send(JSON.stringify("culi"));
  console.log(req.body);
  res.status(200).json({ good: "ngon" });
});

// app.post("/tsp", (req, res) => {
//   console.log(req.body);
//   res.status(200).json({ good: "ngon" });
// });

app.listen(3001, () => console.log("server running at http://localhost:3001/"));
