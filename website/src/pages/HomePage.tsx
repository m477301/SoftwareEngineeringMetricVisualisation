/* THIRD PARTY FUNCTIONS */
import React from "react";
import { useEffect } from "react";

/* API */
import { connect } from "react-redux";
import { getBasicUserInfo } from "../actions/usersActions";

function HomePage(props: any) {
  useEffect(() => {
    console.log("user");
    props.getBasicUserInfo("m477301");
  }, []);

  useEffect(() => {
    console.log("USER", props.userBasicInfo.data);
  }, [props.userBasicInfo]);

  return <p>Home Page</p>;
}

const mapStateToProps = (state: any) => ({
  userBasicInfo: state.users.userBasicInfo,
});

export default connect(mapStateToProps, {
  getBasicUserInfo,
})(HomePage);
