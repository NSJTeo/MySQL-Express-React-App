import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./WarehouseListSearchBar.scss";
import searchIcon from "../../assets/icons/search-24px.svg";

export default function WarehouseListSearchBar(): ReactElement {
  return (
    <div className="warehouse-list-search-bar__container">
      <h1 className="warehouse-list-search-bar__header">Warehouses</h1>
      <form className="warehouse-list-search-bar__search-bar">
        <input
          className="warehouse-list-search-bar__search-bar-input"
          placeholder="Search..."
        />
        <img src={searchIcon} alt="Magnifying glass" />
      </form>
      <Link
        to="/warehouse/add"
        className="warehouse-list-search-bar__add-warehouse-btn"
      >
        <p>+ Add New Warehouse</p>
      </Link>
    </div>
  );
}
