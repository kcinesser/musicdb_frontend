import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SideBar from "../Layout/Sidebar/Sidebar";
import Navbar from "../Layout/Navbar/Navbar";

import styles from "./PrivateRoute.module.scss";
import Loading from "./Loading/Loading";

const PrivateRoute = ({
  component: Component,
  auth,
  contentLoading,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Loading />;
      } else if (!auth.isAuthenticated && !auth.isLoading) {
        return <Redirect to="/login" />;
      } else {
        return (
          <Fragment>
            <SideBar />
            <Navbar />
            <div className={styles.content}>
              <div className={styles.content__inner}>
                {contentLoading ? <Loading /> : ""}
                <Component {...props} />
              </div>
            </div>
          </Fragment>
        );
      }
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  contentLoading: state.content.contentLoading,
});

export default connect(mapStateToProps)(PrivateRoute);
