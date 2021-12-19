import { Router } from "express";
import axios from "axios";

const router = Router();

// comment describing request
// addons: separate request
/**
 * /GET USER
 * params:
 *    - user: github username of user
 * returns:
 * basic user information of Github user
 */
router.get("/:username", async (req, res) => {
  let requestedUser = req.params.username;
  let url = process.env["GITHUB_API_URL"] + "/users/" + requestedUser;
  let tokenString = ("token " + process.env["PERSONAL_ACCESS_TOKEN"]) as string;
  await axios
    .get(url, {
      headers: {
        authorization: tokenString,
      },
    })
    .then((response) => {
      let userInfo = {
        login: response.data.login,
        avatar_url: response.data.avatar_url,
        html_url: response.data.html_url,
        name: response.data.name,
        location: response.data.location,
        bio: response.data.bio,
        public_repos: response.data.public_repos,
      };

      return res.json(userInfo);
    })
    .catch((error) => {
      return res.json({ error: "no user with that username" });
    });
});

export default router;
