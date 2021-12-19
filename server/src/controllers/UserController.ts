import { Router } from "express";
import axios from "axios";

const router = Router();

// comment describing request
// addons: separate request
router.get("/:user", async (req, res) => {
  let requestedUser = req.params.user;
  let url = process.env["GITHUB_API_URL"] + "/users/" + requestedUser;
  let tokenString = ("token " + process.env["PERSONAL_ACCESS_TOKEN"]) as string;
  let user = await axios.get(url, {
    headers: {
      authorization: tokenString,
    },
  });
  return res.json(user.data);
});

export default router;
