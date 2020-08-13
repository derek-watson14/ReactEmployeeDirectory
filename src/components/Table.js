import React, { Component } from "react";
import API from "../utils/API";
import Searchbar from "./Searchbar";
import "./styles.css";

class Table extends Component {
  state = {
    employees: [],
    filtered: null,
    sortStatus: "",
  };

  async componentDidMount() {
    const employees = await API.randomEmployees();
    this.setState({ employees: employees.data.results });
  }

  createTableRow(employee) {
    return (
      <tr key={employee.id.value}>
        <td>
          <img
            className="thumbnail"
            src={employee.picture.thumbnail}
            alt={employee.name.first}
          />
        </td>
        <td>{employee.name.first}</td>
        <td>{employee.name.last}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
      </tr>
    );
  }

  sortByName = (header) => {
    let sorted, status;
    let employees = this.state.filtered
      ? [...this.state.filtered]
      : [...this.state.employees];
    if (this.state.sortStatus === `${header}-asc`) {
      sorted = employees.sort((em1, em2) => {
        return em1.name[header] > em2.name[header] ? -1 : 1;
      });
      status = `${header}-desc`;
    } else {
      sorted = employees.sort((em1, em2) => {
        return em1.name[header] > em2.name[header] ? 1 : -1;
      });
      status = `${header}-asc`;
    }
    this.setState({ filtered: sorted, sortStatus: status });
  };

  displayEmployees = () => {
    if (this.state.filtered) {
      return this.state.filtered.map((employee) => {
        return this.createTableRow(employee);
      });
    } else {
      return this.state.employees.map((employee) => {
        return this.createTableRow(employee);
      });
    }
  };

  filterBy = (input) => {
    if (input) {
      const employees = [...this.state.employees];

      const filtered = employees.filter((emp) => {
        const inFirst = emp.name.first.includes(input);
        const inLast = emp.name.last.includes(input);
        const inEmail = emp.email.includes(input);
        if (inFirst || inLast || inEmail) {
          return true;
        } else {
          return false;
        }
      });
      this.setState({ filtered: filtered });
    } else {
      this.setState({ filtered: null });
    }
  };

  determineIcon(columnName) {
    if (this.state.sortStatus.includes(columnName)) {
      if (this.state.sortStatus.includes("asc")) {
        return "fa fa-fw fa-sort-asc";
      } else {
        return "fa fa-fw fa-sort-desc";
      }
    } else {
      return "fa fa-fw fa-sort";
    }
  }

  render() {
    return (
      <>
        <Searchbar filterBy={this.filterBy} />
        <table className="table table-striped table-responsive-md">
          <thead>
            <tr>
              <th scope="col">Photo</th>
              <th
                className="sortable"
                scope="col"
                onClick={() => this.sortByName("first")}
              >
                First <i className={this.determineIcon("first")} />
              </th>
              <th
                className="sortable"
                scope="col"
                onClick={() => this.sortByName("last")}
              >
                Last <i className={this.determineIcon("last")} />
              </th>
              <th scope="col">Email</th>
              <th scope="col">Cell</th>
            </tr>
          </thead>
          <tbody>{this.displayEmployees()}</tbody>
        </table>
      </>
    );
  }
}

export default Table;
