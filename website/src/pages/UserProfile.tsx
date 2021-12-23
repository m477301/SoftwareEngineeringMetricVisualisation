/* THIRD PARTY FUNCTIONS */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// import * as d3 from "d3";

/* COMPONENTS */
import UserCard from "../components/UserCard";
import LineChart from "../components/LineChart";

/* API */
import { connect } from "react-redux";
import { getBasicUserInfo } from "../actions/usersActions";

function UserProfile(props: any) {
  let { username } = useParams();

  const [userData, setUserData]: any = useState({});

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
            <div>Title</div>
            <LineChart
              width={500}
              height={200}
              top={25}
              bottom={30}
              left={30}
              right={25}
            />
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
});

export default connect(mapStateToProps, {
  getBasicUserInfo,
})(UserProfile);
