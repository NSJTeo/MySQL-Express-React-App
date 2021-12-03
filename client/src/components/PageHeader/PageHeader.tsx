import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function PageHeader(): ReactElement {
  return (
    <>
      <p>Header</p>
      <Link to="/">Warehouses</Link>
      <Link to="/inventory">Inventory</Link>
    </>
  );
}
