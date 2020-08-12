import React, { Component } from "react";
import API from "../utils/API";

const styles = {
  img: {
    borderRadius: "50%",
    border: "lightsalmon solid 3px",
  },
  th: {},
};

class Table extends Component {
  state = {
    employees: [],
    sortStatus: "",
  };

  async componentDidMount() {
    const employees = await API.randomEmployees();
    const sorted = employees.data.results.sort((em1, em2) => {
      return em1.name.first > em2.name.first ? 1 : -1;
    });
    this.setState({ employees: sorted, sortStatus: "first-asc" });
  }

  createTableRow(employee) {
    return (
      <tr key={employee.id.value}>
        <td>
          <img
            style={styles.img}
            src={employee.picture.thumbnail}
            alt={employee.name}
          />
        </td>
        <td>{employee.name.first}</td>
        <td>{employee.name.last}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
      </tr>
    );
  }

  sortTable = (button) => {
    const employees = [...this.state.employees];
    let sorted, status;
    switch (this.state.sortStatus) {
      case "first-asc" && button === "first":
        sorted = employees.sort((em1, em2) => {
          return em1.name.first > em2.name.first ? -1 : 1;
        });
        status = "first-desc";
        break;
      case "first-desc" && button === "first":
        sorted = employees.sort((em1, em2) => {
          return em1.name.first > em2.name.first ? 1 : -1;
        });
        status = "first-asc";
        break;
      case "last-asc" && button === "first":
        sorted = employees.sort((em1, em2) => {
          return em1.name.last > em2.name.last ? 1 : -1;
        });
        status = "last-desc";
        break;
      case "last-asc" && button === "first":
        sorted = employees.sort((em1, em2) => {
          return em1.name.last > em2.name.last ? 1 : -1;
        });
        status = "last-desc";
        break;
      default:
        sorted = employees.sort((em1, em2) => {
          return em1.name.first > em2.name.first ? 1 : -1;
        });
        status = "first-asc";
    }
    this.setState({ employees: sorted, sortStatus: status });
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
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Photo</th>
            <th scope="col" onClick={() => this.sortTable("first")}>
              First <i className={this.determineIcon("first")} />
            </th>
            <th scope="col" onClick={() => this.sortTable("last")}>
              Last <i className={this.determineIcon("last")} />
            </th>
            <th scope="col">Email</th>
            <th scope="col">Cell</th>
          </tr>
        </thead>
        <tbody>
          {this.state.employees.map((employee) => {
            return this.createTableRow(employee);
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
