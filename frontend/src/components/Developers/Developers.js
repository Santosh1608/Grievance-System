import React, { Component } from "react";
import { connect } from "react-redux";
import Developer from "./Developer/Developer";
import * as modelActions from "../../actions/model";
import * as developerActions from "../../actions/developer";
import Model from "../Model/Model";
import SignUp from "../SignUp/SignUp";
import classes from "./Developers.module.css";
class Developers extends Component {
  componentDidMount() {
    this.props.getDevelopers();
  }
  render() {
    let showModel = null;
    if (this.props.isModelOpen && this.props.user.role == 2) {
      showModel = (
        <Model>
          <SignUp
            isDeveloper="developer"
            title="Fill Up developer Details"
            show={false}
          />
        </Model>
      );
      console.log("DONE DONE DONE");
    }
    return (
      <div className={classes.OuterDevelopers}>
        {showModel}
        <table className={classes.Developers}>
          <tr>
            <th>Id</th>
            <th>name</th>
            <th>email</th>
            <th>mobile</th>
            <th>{}</th>
          </tr>
          {this.props.developers.map((developer) => {
            return (
              <Developer
                id={developer._id}
                key={developer._id}
                {...developer}
              />
            );
          })}
        </table>
        <div className={classes.ADDDEV}>
          <button onClick={this.props.modelOpen}>ADD developer</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    developers: state.developer.developers,
    user: state.auth.user,
    isModelOpen: state.model.isModelOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    modelOpen: () => dispatch(modelActions.modelOpen()),
    getDevelopers: () => dispatch(developerActions.getDevelopers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Developers);
