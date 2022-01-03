# Software Engineering Metric Visualisation

https://user-images.githubusercontent.com/23319263/147977197-18b5a4c8-6887-42f4-954d-3883b6c3226e.mp4

## Run Application

To run this application on your machine execute the following steps:

### Clone Repository

```https://github.com/m477301/SoftwareEngineeringMetricVisualisation.git```

### Run Backend
- Start Docker Application on your machine
- Navigate to the server folder on a command line
- Build the server backend into a container by running the following command on the command line
``` docker build --tag server . ```
- Run the server container
```docker run --rm -d -p 8080:8080 --env-file .env server ```

### Run Frontend
- Navigate to the website folder on the command line
- Build the website into a container by running the following command on the command line
```docker build --tag website . ```
- Run the Website
```docker run --rm -d -p 3000:3000 website ```
- It should occur automatically, but if you navigate to ``http://localhost:3000`` you should see the website running

### Note
To access the github api one needs a personal access token as a security key, for privacy reasons I have kept mine in an .env file. So you must create
such token to access the github api.

## Description

This application attempts to analyze and measure a software engineer based on the information available on through their Github User.

The application is divided into two pages:
- Home Page
- User Profile

The Home Page main component is a search input that allows the user to search for any Github user by their Github username.

Once the User has been searched, the user will be redirected to that users User Profile.
In the User Profile there are the following components.

- The User Details
Here are layed the main details of the user and their github profile image.

- User Commits over time Bar Chart.
Here the user has the option to see the number of commits executed by the user in question over two periods of time.
By default the barchart displays the yearly commits, but if one were to click into the year bar the barchart would expand and display the montlhly commits in that year.

- User Most Frequently used Languages Piechart.
The final component displays the most frequently used languages by the user in a piechart. If you hover over a section, a tooltip will display the language and the overall percentage the language is used by the user.

## Technologies

Github API
||
(Gather Data (Backend) -- Typescript (Dockerized)
||
Rest API (Backend) -- Typescript(React) (Dockerized))
||
Display Data (Frontend) -- Typescript (Dockerized)

## Possible Improvements
In this section, I have noted possible improvement I could implement to the application at a later stage.

Network Graphic User - Repo - Contibutors
Click User, user profile
Click Repo, Compare multiple users performance in single repo (Contributors vs main user)
Click Contributors, contributors profile
Repository Profile
Animated Commit history
Animated Languages used (Piechart)
Collapse Tree Branch History
Animated Page transition bottom to top after search for user profile
Home Page, html canvas moving directed graphs mockup



