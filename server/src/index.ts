import router from "./controllers/router.js";
import config from "./configurations/server.js";

const express = require("express");
const app = express();
const port = 8080;

app.use(router);

app.listen(config.port, () => {
  console.log(`server started at http://localhost:${config.port}`);
});
