import React, { Component } from "react";
import Compliant from "./Compliant/Compliant";
class Compliants extends Component {
  render() {
    console.log(this.props);
    return this.props.compliants.map((compliant) => {
      return (
        <Compliant
          id={compliant._id}
          key={compliant._id}
          compliant={compliant}
        />
      );
    });
  }
}

export default Compliants;
