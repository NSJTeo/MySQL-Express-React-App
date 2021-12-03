import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

export default function PageHeader(): ReactElement {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <p>Header</p>
      <Link to="/">Warehouses</Link>
      <Link to="/inventory">Inventory</Link>
    </>
  );
}
