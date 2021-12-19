import React, { ReactElement } from "react";
import { WarehouseProfile } from "../../types/types";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import "./WarehouseListItem.scss";
import nextIcon from "../../assets/icons/chevron_right-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";

interface Props {
  warehouse: WarehouseProfile;
  handleDelete: Function;
}

export default function WarehouseListItem({
  warehouse,
  handleDelete,
}: Props): ReactElement {
  const handleClick = (): void => {
    handleDelete(warehouse.id);
  };

  return (
    <li className="warehouse-list-item__container">
      <div className="warehouse-list-item__inner-container">
        <div className="warehouse-list-item__warehouse-address-container">
          <div className="warehouse-list-item__warehouse-container">
            <h2 className="warehouse-list-item__info-header">WAREHOUSE</h2>
            <Link
              to={`/warehouse/${warehouse.id}`}
              className="warehouse-list-item__warehouse-link"
            >
              <p className="warehouse-list-item__warehouse-link-text">
                {warehouse.name}
              </p>
              <img
                src={nextIcon}
                alt=""
                className="warehouse-list-item__warehouse-link-icon"
              />
            </Link>
          </div>
          <div className="warehouse-list-item__address-container">
            <h2 className="warehouse-list-item__info-header">ADDRESS</h2>
            <p className="warehouse-list-item__info warehouse-list-item__info--address">
              {warehouse.address}, {warehouse.city}, {warehouse.country}
            </p>
          </div>
        </div>
        <div className="warehouse-list-item__contact-info-container">
          <div className="warehouse-list-item__contact-container">
            <h2 className="warehouse-list-item__info-header">CONTACT NAME</h2>
            <p className="warehouse-list-item__info">{warehouse.contactName}</p>
          </div>
          <div className="warehouse-list-item__contact-info-container">
            <h2 className="warehouse-list-item__info-header">
              CONTACT INFORMATION
            </h2>
            <p className="warehouse-list-item__info">
              {warehouse.contactPhone}
            </p>
            <p className="warehouse-list-item__info">
              {warehouse.contactEmail}
            </p>
          </div>
        </div>
      </div>
      <div className="warehouse-list-item__btns-container">
        <button
          onClick={handleClick}
          className="warehouse-list-item__btn warehouse-list-item__btn--delete"
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
        <Link
          to={`/warehouse/${warehouse.id}/edit`}
          className="warehouse-list-item__btn warehouse-list-item__btn--edit"
        >
          <img src={editIcon} alt="" />
        </Link>
      </div>
    </li>
  );
}
