import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {}

export default function InventoryListSearchBar({}: Props): ReactElement {
  return (
    <>
      <h1>Inventory</h1>
      <input />
      <Link to="/inventory/add">+ Add New Item</Link>
    </>
  );
}
