/* THIRD PARTY FUNCTIONS */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

/* COMPONENTS */
import UserCard from "../components/UserCard";

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
    <>
      <UserCard {...userData} />
    </>
  );
}

const mapStateToProps = (state: any) => ({
  userBasicInfo: state.users.userBasicInfo,
});

export default connect(mapStateToProps, {
  getBasicUserInfo,
})(UserProfile);
