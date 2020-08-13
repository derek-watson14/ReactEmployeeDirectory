import React from "react";
import Table from "./components/Table";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container mt-3">
        <Table />
      </div>
    </>
  );
}

export default App;
