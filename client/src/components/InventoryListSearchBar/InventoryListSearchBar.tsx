import { ReactElement } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/icons/search-24px.svg";
import "./InventoryListSearchBar.scss";

export default function InventoryListSearchBar(): ReactElement {
  return (
    <div className="inventory-list-search-bar__container">
      <h1 className="inventory-list-search-bar__header">Inventory</h1>
      <form className="inventory-list-search-bar__search-bar">
        <input
          className="inventory-list-search-bar__search-bar-input"
          placeholder="Search..."
        />
        <img src={searchIcon} alt="Magnifying glass" />
      </form>
      <Link
        to="/inventory/add"
        className="inventory-list-search-bar__add-new-item-btn"
      >
        + Add New Item
      </Link>
    </div>
  );
}
