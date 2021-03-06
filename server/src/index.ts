import router from "./controllers/router";
import config from "./configurations/server";

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(router);

app.listen(config.port, () => {
  console.log(`server started at http://localhost:${config.port}`);
});
