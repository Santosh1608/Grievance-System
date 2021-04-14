import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/compliant";
import * as developerActions from "../../actions/developer";
import { Link } from "react-router-dom";
import Compliants from "../Compliants/Compliants";
import Count from "../Count/Count";
import Model from "../Model/Model";
import ShowCompliant from "../ShowCompliant/ShowCompliant";
import classes from "./Home.module.css";
class Home extends Component {
  componentDidMount() {
    console.log(this.props.user);
    if (this.props.user.role == 1) {
      this.props.getAllCompliants(this.props.user.role, "active");
    } else {
      this.props.getAllCompliants(this.props.user.role, "new");
    }
    if (this.props.user.role == 2) {
      this.props.getDevelopers();
    }
  }
  render() {
    let compliants = [];
    let showModel = null;
    let showLink = (
      <button
        disabled={this.props.newChecked}
        onClick={(e) =>
          this.props.getAllCompliants(this.props.user.role, e.target.name)
        }
        name="new"
      >
        NEW
      </button>
    );
    if (this.props.user.role == 1) {
      showLink = null;
    }
    if (this.props.activeChecked) {
      compliants = this.props.active;
    } else if (this.props.newChecked) {
      compliants = this.props.new;
    } else if (this.props.solvedChecked) {
      compliants = this.props.solved;
    }
    if (this.props.isModelOpen && this.props.user.role == 0) {
      showModel = (
        <Model>
          <ShowCompliant title="ADD" />
        </Model>
      );
    }
    return (
      <div className={classes.Home}>
        {showModel}
        <div className={classes.Buttons}>
          {showLink}
          <button
            disabled={this.props.activeChecked}
            onClick={(e) =>
              this.props.getAllCompliants(this.props.user.role, e.target.name)
            }
            name="active"
          >
            ACTIVE
          </button>
          <button
            disabled={this.props.solvedChecked}
            onClick={(e) =>
              this.props.getAllCompliants(this.props.user.role, e.target.name)
            }
            name="solved"
          >
            SOLVED
          </button>
        </div>
        <Compliants compliants={compliants} />
        <Count
          role={this.props.user.role}
          total={this.props.totalCount}
          active={this.props.activeCount}
          new={this.props.newCount}
          solved={this.props.solvedCount}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCompliants: (role, name) => {
      dispatch(
        actions.getAllCompliants(
          role == 1 ? "Developer" : role == 0 ? "Customer" : "Admin",
          name
        )
      );
    },
    getDevelopers: () => dispatch(developerActions.getDevelopers()),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    activeChecked: state.compliant.activeCheck,
    newChecked: state.compliant.newCheck,
    solvedChecked: state.compliant.solvedCheck,
    active: state.compliant.activeCompliants,
    new: state.compliant.newCompliants,
    solved: state.compliant.solvedCompliants,
    totalCount: state.compliant.allCompliantsCount,
    newCount: state.compliant.newCompliantsCount,
    activeCount: state.compliant.activeCompliantsCount,
    solvedCount: state.compliant.solvedCompliantsCount,
    isModelOpen: state.model.isModelOpen,
    developers: state.developer.developers,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
