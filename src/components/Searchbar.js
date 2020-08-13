import React, { Component } from "react";
import "./styles.css";

class Searchbar extends Component {
  handleInput = (event) => {
    const value = event.target.value;
    console.log(value);
    this.props.filterBy(value);
  };
  render() {
    return (
      <div className="mb-3">
        <label className="font-weight-bold">Search employees</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="employeeSearch"
          placeholder="John Doe..."
          onChange={this.handleInput}
        ></input>
      </div>
    );
  }
}

export default Searchbar;
