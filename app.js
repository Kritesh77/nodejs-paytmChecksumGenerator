const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PaytmChecksum = require("./PaytmChecksum.js");

app.use(
  cors({
    origin: "*",
  })
);
const port = 4000;

app.post("/getPaytmChecksum", async (req, res) => {
  let data = req.body;

  var checksum = "";
  await PaytmChecksum.generateSignature(JSON.stringify(data.body), data.mkey)
    .then((chksum) => {
      res.status(200).json(chksum);
    })
    .catch((err) => {});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
