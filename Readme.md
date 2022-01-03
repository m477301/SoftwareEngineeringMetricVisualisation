## Notes

https://github.com/m477301/SoftwareEngineeringMetricVisualisation/blob/main/Demo.mp4

So busy developers spread across few projects or many?
Are open source developers explorers/learn, spend time in different places, or engagers stick with projects.
github api v3.
who commits the most?
who is the most active developer?
who is the most useful contributor in a project?
look at dates, consistency.
social network
most awards
most prolific
most helpful
most impact
withing a network of users and contributors, within single repo or multiple

CASE STUDY: Last years algorithms SSHLIDES group project.
Last years sweng group project.

QUESTIONS

Build measuring tool

Good Engineers (Thought of as good) -- what characteristics do they have
Linus
Biography guy

# Technology

d3
three.js

## Ideas

Test backend and frontend
commit often commit early

// Setup Backend and Backend Tests Framework
// Dockerize backend

// Setup frontend and frontend tests
// Dockerize frontend

Searchable Github Visualisation of User (User Profile Analysing performance)

// -- Details about the user (contacts), any relevant infor
-- Commit history
-- Repos Forked
-- Collaborators
-- Impact of Commit (Lines Added Lines Removed)
-- Types of actions Commits/PRs/Resolving Issues
-- Most frequently used languages (Piechart and Barchart)
-- Avg number of commits per week
-- Avg number of prs per week
Bring page all together

Landing Page as well

Script to run frontend easily and backend easily

Explore Github API

Network Graphic User - Repo - Contibutors
Click User, user profile
Click Repo, Compare multiple users performance in single repo (Contributors vs main user)
Click Contributors, contributors profile

Repo Profile
Animated Commit history
Animated Languages used (Piechart)
Collapse Tree Branch History

host the website on matteomcguinness.com/githubvisualisation with github actions
Rewrite Readme.md

Mini Demo video
Describe Setup(Create env)
Describe Folder Structure

## Extras

Animated Page transition bottom to top after search for user profile
Home Page, html canvas moving directed graphs mockup
Interesting Repos sxywu

## Plan

run from script
matteomcguinness.com/githubvisualisation

Github API
||
(Gather Data (Backend) -- Typescript (Dockerized) -- SQL Cache data in db for ease of use in future
||
Rest API (Backend) -- Typescript(React) (Dockerized))
||
Display Data (Frontend) -- Typescript (Dockerized)

// Backend
docker build --tag server .
docker run --rm -d -p 8080:8080 --env-file .env server

// frontend
docker build --tag website .
docker run --rm -d -p 3000:3000 website
