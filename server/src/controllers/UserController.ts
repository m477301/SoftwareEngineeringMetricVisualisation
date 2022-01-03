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

// GET /search/commits
/**
 * /GET COMMITS
 * params:
 *    - user: github username of user
 * returns:
 * all commits done by user
 */
router.get("/commits/:username", async (req, res) => {
  let requestedUser = req.params.username;
  let url =
    process.env["GITHUB_API_URL"] + "/users/" + requestedUser + "/repos";
  let tokenString = ("token " + process.env["PERSONAL_ACCESS_TOKEN"]) as string;
  await axios
    .get(url, {
      headers: {
        authorization: tokenString,
      },
    })
    .then(async (response) => {
      let listOfRepoNames = response.data.map((d) => {
        return d.name;
      });
      let commits = [];
      for (let i = 0; i < listOfRepoNames.length; i++) {
        let repoCommitsByUserUrl =
          process.env["GITHUB_API_URL"] +
          "/repos/" +
          requestedUser +
          "/" +
          listOfRepoNames[i] +
          "/commits";
        await axios
          .get(repoCommitsByUserUrl, {
            headers: {
              authorization: tokenString,
            },
          })
          .then((response) => {
            let commitFilteredData = response.data.filter((d) => {
              return d.committer && d.committer.login === requestedUser;
            });
            let commitData = commitFilteredData.map((d) => {
              if (d.committer && d.committer.login === requestedUser) {
                return {
                  user: d.committer.login,
                  repo: listOfRepoNames[i],
                  date: d.commit.committer.date,
                  message: d.commit.message,
                };
              }
            });
            commits = commits.concat(commitData);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      let orderedCommits = commits.sort(function (a, b) {
        return (new Date(b.date) as any) - (new Date(a.date) as any);
      });
      return res.json(orderedCommits);
    })
    .catch((error) => {
      console.log(error);

      return res.json({ error: "error retrieving users commits" });
    });
});

router.get("/languages/:username", async (req, res) => {
  let requestedUser = req.params.username;
  let url =
    process.env["GITHUB_API_URL"] + "/users/" + requestedUser + "/repos";
  let tokenString = ("token " + process.env["PERSONAL_ACCESS_TOKEN"]) as string;
  await axios
    .get(url, {
      headers: {
        authorization: tokenString,
      },
    })
    .then(async (response) => {
      let listOfRepoNames = response.data.map((d) => {
        return d.name;
      });
      let languages = [];
      for (let i = 0; i < listOfRepoNames.length; i++) {
        let repoLanguagesByUserUrl =
          process.env["GITHUB_API_URL"] +
          "/repos/" +
          requestedUser +
          "/" +
          listOfRepoNames[i] +
          "/languages";
        await axios
          .get(repoLanguagesByUserUrl, {
            headers: {
              authorization: tokenString,
            },
          })
          .then((response) => {
            languages = languages.concat(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // Clean up Languages List
      let singleLanguage = {};
      let total = -1;
      languages.map((d) => {
        for (var key in d) {
          // skip loop if the property is from prototype
          if (!d.hasOwnProperty(key)) continue;

          var obj = d[key];
          total += obj;
          if (singleLanguage.hasOwnProperty(key)) {
            singleLanguage[key] += obj;
          } else {
            singleLanguage[key] = obj;
          }
        }
      });

      let languageOther = { Other: 0 };
      for (var key in singleLanguage) {
        // skip loop if the property is from prototype
        if (!singleLanguage.hasOwnProperty(key)) continue;

        let scaledObj = (singleLanguage[key] / total) * 100;
        if (scaledObj <= 5) {
          languageOther.Other += scaledObj;
        } else {
          languageOther[key] = Math.floor(scaledObj);
        }
      }
      languageOther.Other = Math.ceil(languageOther.Other);
      return res.json(languageOther);
    })
    .catch((error) => {
      console.log(error);

      return res.json({ error: "error retrieving users commits" });
    });
});
export default router;
