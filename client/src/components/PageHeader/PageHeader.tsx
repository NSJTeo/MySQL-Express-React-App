import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/InStock-Logo.svg";
import "./PageHeader.scss";

export default function PageHeader(): ReactElement {
  const location = useLocation();

  let warehousePage = true;
  if (location.pathname[1] === "i") {
    warehousePage = false;
  }

  return (
    <div className="header__container">
      <img src={logo} alt="" className="header__logo" />
      {warehousePage ? (
        <div className="header__links">
          <Link to="/" className="header__link header__link--selected">
            <p className="header__link-text">Warehouses</p>
          </Link>
          <Link to="/inventory" className="header__link">
            <p className="header__link-text">Inventory</p>
          </Link>
        </div>
      ) : (
        <div className="header__links">
          <Link to="/" className="header__link">
            <p className="header__link-text">Warehouses</p>
          </Link>
          <Link to="/inventory" className="header__link header__link--selected">
            <p className="header__link-text">Inventory</p>
          </Link>
        </div>
      )}
    </div>
  );
}
