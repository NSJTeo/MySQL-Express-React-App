import React from "react";
import { Link } from "react-router-dom";

export default function WarehouseListSearchBar() {
  return (
    <>
      <h1>Warehouses</h1>
      <form>
        <input />
      </form>
      <Link to="/warehouse/add">Add New Warehouse</Link>
    </>
  );
}
