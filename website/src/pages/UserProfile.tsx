/* THIRD PARTY FUNCTIONS */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// import * as d3 from "d3";

/* COMPONENTS */
import UserCard from "../components/UserCard";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import ChartHeading from "../components/ChartHeading";

/* HELPERS */
import {
  convertYearlyDataToMonthly,
  convertDataCommitsToYearly,
} from "../helpers/CommitsTimes";

/* API */
import { connect } from "react-redux";
import { getBasicUserInfo, getUserCommits } from "../actions/usersActions";

function UserProfile(props: any) {
  let { username } = useParams();

  const [userData, setUserData]: any = useState({});
  const [userCommits, setUserCommits]: any = useState([]);

  useEffect(() => {
    if (
      props.userBasicInfo &&
      props.userBasicInfo.data &&
      props.userBasicInfo.data.login === username
    ) {
      setUserData(props.userBasicInfo.data);
    } else {
      props.getBasicUserInfo(username);
    }
    props.getUserCommits(username);
  }, [username]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (props.userBasicInfo.data.error) {
      alert(props.userBasicInfo.data.error);
    } else if (props.userBasicInfo.data) {
      setUserData(props.userBasicInfo.data);
    }
  }, [props.userBasicInfo]);

  const firstCommitsUpdate = useRef(true);
  useEffect(() => {
    if (firstCommitsUpdate.current) {
      firstCommitsUpdate.current = false;
      return;
    }
    if (props.userCommits.data.error) {
      alert(props.userCommits.data.error);
    } else if (props.userCommits.data) {
      setUserCommits(convertDataCommitsToYearly(props.userCommits.data));
      console.log("DATA", props.userCommits.data);
    }
  }, [props.userCommits]);

  const selectBarChartTimeline = (data: any) => {
    if (data.title === "year") {
      setUserCommits(convertDataCommitsToYearly(props.userCommits.data));
    } else if (data.title === "month") {
    }
  };

  const pull_convertScale = (data: any) => {
    if (data) {
      if (data.timeScale.length === 4) {
        setUserCommits(convertYearlyDataToMonthly(data.data));
      }
    }
  };

  return (
    <div className="UserProfile">
      {/* <div style={{ margin: "10vh" }}> */}
      <div className="UserProfileCard">
        <div className="first">
          <UserCard {...userData} />
          <div></div>
        </div>
        <div className="second">
          <div className="ChartCard">
            <ChartHeading
              title="User Commits vs. Time"
              widgetOptions={[
                { title: "year", state: true },
                { title: "month", state: false },
              ]}
              selectedTime={selectBarChartTimeline}
            />
            <BarChart data={userCommits} convertScale={pull_convertScale} />
          </div>
        </div>
        {/* <div className="third"></div> */}
        {/* <div
        style={{ backgroundColor: "red", width: "auto", height: "40vh" }}
      ></div> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  userBasicInfo: state.users.userBasicInfo,
  userCommits: state.users.userCommits,
});

export default connect(mapStateToProps, {
  getBasicUserInfo,
  getUserCommits,
})(UserProfile);
