import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  let tokenString = ("token " + process.env["PERSONAL_ACCESS_TOKEN"]) as string;
  let user = await axios.get("https://api.github.com/users/esjmb", {
    headers: {
      authorization: tokenString,
    },
  });
  return res.json(user.data);
});

export default router;
