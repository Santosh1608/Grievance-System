import React, { Component } from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import { connect } from "react-redux";
import Developers from "./components/Developers/Developers";
import Navbar from "./components/Navbar/Navbar";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import classes from "./App.css";
class App extends Component {
  render() {
    console.log(this.props);
    const privateRoutes = (
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/updateProfile" component={UpdateProfile} />
          {this.props.user && this.props.user.role == 2 ? (
            <Route path="/developers" exact component={Developers} />
          ) : null}
          <Redirect to="/" />
        </Switch>
      </div>
    );
    const publicRoutes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route
          path="/signup"
          exact
          render={(props) => <SignUp {...props} title="SignUp" show={true} />}
        />
        <Redirect to="/login" />
      </Switch>
    );
    const routes = this.props.token ? privateRoutes : publicRoutes;
    return routes;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(App);
