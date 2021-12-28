import React, { ReactElement, useState, useEffect } from "react";
import { WarehouseProfile, InventoryItemInfo } from "../../types/types";
import { useParams, Link } from "react-router-dom";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import axios from "axios";
import "./Warehouse.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";

export default function Warehouse(): ReactElement {
  const [warehouse, setWarehouse] = useState<WarehouseProfile>();
  const [inventoryItems, setInventoryItems] = useState<InventoryItemInfo[]>([]);
  const { warehouseID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouses/${warehouseID}`)
      .then((response) => {
        setWarehouse(response.data);
      })
      .then(() => {
        axios
          .get(`http://localhost:8080/warehouses/${warehouseID}/inventory`)
          .then((response) => {
            setInventoryItems(response.data);
          });
      });
  }, [warehouseID]);

  if (!warehouse) {
    return <p>Loading</p>;
  }

  const handleDelete = (inventoryItemID: string): void => {
    axios
      .delete(`http://localhost:8080/inventory/${inventoryItemID}`)
      .then(() => {
        axios
          .get(`http://localhost:8080/warehouses/${warehouseID}/inventory`)
          .then((response) => {
            setInventoryItems(response.data);
          });
      });
  };

  return (
    <div className="warehouse__container">
      <div className="warehouse__header">
        <div className="warehouse__back-name-container">
          <Link to="/" className="warehouse__back-link">
            <img src={backArrow} alt="" />
          </Link>
          <h1 className="warehouse__title">{warehouse.name}</h1>
        </div>
        <Link
          to={`/warehouse/${warehouseID}/edit`}
          className="warehouse__edit-link"
        >
          <img src={editIcon} alt="" className="warehouse__edit-icon" />
          <p className="warehouse__edit-text">Edit</p>
        </Link>
      </div>
      <div className="warehouse__info-container">
        <div className="warehouse__address-container">
          <p className="warehouse__info-header">WAREHOUSE ADDRESS:</p>
          <p className="warehouse__address">
            {warehouse.address}, {warehouse.city}, {warehouse.country}
          </p>
        </div>
        <div className="warehouse__contact-name-info-container">
          <div className="warehouse__contact-name-container">
            <p className="warehouse__info-header">CONTACT NAME:</p>
            <p className="warehouse__contact-info">{warehouse.contactName}</p>
            <p className="warehouse__contact-info">
              {warehouse.contactPosition}
            </p>
          </div>
          <div className="warehouse__contact-info-container">
            <p className="warehouse__info-header">CONTACT INFORMATION:</p>
            <p className="warehouse__contact-info">{warehouse.contactPhone}</p>
            <p className="warehouse__contact-info">{warehouse.contactEmail}</p>
          </div>
        </div>
      </div>
      <div className="warehouse-list__headers">
        <div className="warehouse-list__warehouse-address-header-container">
          <div className="warehouse-list__header-container warehouse-list__header-container--warehouse">
            <h2 className="warehouse-list__header">INVENTORY ITEM</h2>
            <img src={sortIcon} alt="" className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__header-container warehouse-list__header-container--address">
            <h2 className="warehouse-list__header">CATEGORY</h2>
            <img src={sortIcon} alt="" className="warehouse-list__sort-icon" />
          </div>
        </div>
        <div className="warehouse-list__contact-header-container">
          <div className="warehouse-list__header-container">
            <h2 className="warehouse-list__header">STATUS</h2>
            <img src={sortIcon} alt="" className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__header-container">
            <h2 className="warehouse-list__header">QUANTITY</h2>
            <img src={sortIcon} alt="" className="warehouse-list__sort-icon" />
          </div>
        </div>
        <div className="warehouse-list__header-container warehouse-list__header-container--actions">
          <h2 className="warehouse-list__header warehouse-list__header--actions">
            ACTIONS
          </h2>
        </div>
      </div>
      <WarehouseInventoryList
        inventoryItems={inventoryItems}
        handleDelete={handleDelete}
      />
    </div>
  );
}
