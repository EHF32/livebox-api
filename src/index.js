const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const api = require("./API/index");
var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Livebox API🌐💻 => /api/v1" });
});

app.use("/api/v1", api);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
