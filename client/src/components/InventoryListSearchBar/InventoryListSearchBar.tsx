import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function InventoryListSearchBar(): ReactElement {
  return (
    <>
      <h1>Inventory</h1>
      <input />
      <Link to="/inventory/add">+ Add New Item</Link>
    </>
  );
}
