/* THIRD PARTY FUNCTIONS */
import React from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* COMPONENT */
import SearchInput from "../components/SearchInput";

/* API */
import { connect } from "react-redux";
import { getBasicUserInfo } from "../actions/usersActions";

function HomePage(props: any) {
  const navigate = useNavigate();
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (props.userBasicInfo.data.error) {
      alert(props.userBasicInfo.data.error);
    } else if (props.userBasicInfo.data) {
      navigate("/user/" + props.userBasicInfo.data.login);
    }
  }, [props.userBasicInfo]);

  const pull_search_value = (data: any) => {
    if (data) {
      props.getBasicUserInfo(data.search);
    }
  };

  return (
    <div className="Home">
      <div className="UpperCanvas">
        <p>
          <strong>GITHUB VISUALISATION</strong>
        </p>
      </div>
      <div className="LowerCanvas">
        <SearchInput getSearchValue={pull_search_value} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  userBasicInfo: state.users.userBasicInfo,
});

export default connect(mapStateToProps, {
  getBasicUserInfo,
})(HomePage);
