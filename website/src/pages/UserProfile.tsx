/* THIRD PARTY FUNCTIONS */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

/* COMPONENTS */
import UserCard from "../components/UserCard";
import BarChart from "../components/BarChart";
import ChartHeading from "../components/ChartHeading";
import PieChart from "../components/PieChart";

/* HELPERS */
import {
  convertYearlyDataToMonthly,
  convertDataCommitsToYearly,
} from "../helpers/CommitsTimes";
import { dataLanguagesToPieChartData } from "../helpers/Piechart";

/* API */
import { connect } from "react-redux";
import {
  getBasicUserInfo,
  getUserCommits,
  getUserMostFrequentlyUsedLanguages,
} from "../actions/usersActions";

function UserProfile(props: any) {
  let { username } = useParams();

  const [userData, setUserData]: any = useState({});
  const [userCommits, setUserCommits]: any = useState([]);
  const [userLanguages, setUserLanguages]: any = useState([]);

  const [backText, setBackText]: any = useState("");

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
    props.getUserMostFrequentlyUsedLanguages(username);
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
    }
  }, [props.userCommits]);

  const firstLanguagesUpdate = useRef(true);
  useEffect(() => {
    if (firstLanguagesUpdate.current) {
      firstLanguagesUpdate.current = false;
      return;
    }
    if (props.userLanguagesUsed.data.error) {
      alert(props.userLanguagesUsed.data.error);
    } else if (props.userLanguagesUsed.data) {
      console.log("REC");
      setUserLanguages(
        dataLanguagesToPieChartData(props.userLanguagesUsed.data)
      );
    }
  }, [props.userLanguagesUsed]);

  const pull_convertScale = (data: any) => {
    if (data) {
      if (data.timeScale.length === 4) {
        setBackText("yearly");
        setUserCommits(convertYearlyDataToMonthly(data.data));
      }
    }
  };

  const pull_backTo = (data: any) => {
    setBackText("");
    setUserCommits(convertDataCommitsToYearly(props.userCommits.data));
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
              backText={backText}
              backTo={pull_backTo}
            />
            <BarChart data={userCommits} convertScale={pull_convertScale} />
          </div>
        </div>
        <div className="third">
          <div className="ChartCard">
            <ChartHeading title="Most Frequently Used Languages By User" />
            <PieChart data={userLanguages} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  userBasicInfo: state.users.userBasicInfo,
  userCommits: state.users.userCommits,
  userLanguagesUsed: state.users.userLanguagesUsed,
});

export default connect(mapStateToProps, {
  getBasicUserInfo,
  getUserCommits,
  getUserMostFrequentlyUsedLanguages,
})(UserProfile);
