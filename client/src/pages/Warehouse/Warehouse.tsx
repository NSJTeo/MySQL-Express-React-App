import React, { ReactElement, useState, useEffect } from "react";
import { WarehouseProfile, InventoryItemInfo } from "../../types/types";
import { useParams, Link } from "react-router-dom";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import axios from "axios";
import "./Warehouse.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-white-24px.svg";

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
            <img src={backArrow} alt="" className="warehouse__back-icon" />
          </Link>
          <h1 className="warehouse__title">{warehouse.name}</h1>
        </div>
        <Link
          to={`/warehouse/${warehouseID}/edit`}
          className="warehouse__edit-link"
        >
          <img src={editIcon} alt="" className="warehouse__edit-icon" />
        </Link>
      </div>
      <div>
        <div>
          <p>WAREHOUSE ADDRESS:</p>
          <p>
            {warehouse.address}, {warehouse.city}, {warehouse.country}
          </p>
        </div>
        <div>
          <p>CONTACT NAME:</p>
          <p>{warehouse.contactName}</p>
          <p>{warehouse.contactPosition}</p>
        </div>
        <div>
          <p>CONTACT INFORMATION:</p>
          <p>{warehouse.contactPhone}</p>
          <p>{warehouse.contactEmail}</p>
        </div>
      </div>
      <WarehouseInventoryList
        inventoryItems={inventoryItems}
        handleDelete={handleDelete}
      />
    </div>
  );
}
