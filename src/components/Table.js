import React, { Component } from "react";
import API from "../utils/API";

class Table extends Component {
  state = {
    employees: [],
  };

  componentDidMount() {
    const employees = API.randomEmployees();
    console.log(employees);
  }

  render() {
    return <div>Working?</div>;
  }
}

export default Table;
