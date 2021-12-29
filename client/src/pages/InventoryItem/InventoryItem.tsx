import { ReactElement, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { InventoryItemInfo, WarehouseProfile } from "../../types/types";
import axios from "axios";
import "./InventoryItem.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-white-24px.svg";

export default function InventoryItem(): ReactElement {
  const [inventoryItem, setInventoryItem] = useState<InventoryItemInfo>();
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);
  const { inventoryItemID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventory/${inventoryItemID}`)
      .then((response) => {
        setInventoryItem(response.data);
        axios.get(`http://localhost:8080/warehouses`).then((response) => {
          setWarehouses(response.data);
        });
      });
  }, [inventoryItemID]);

  if (!inventoryItem) {
    return <p>Loading</p>;
  }

  const itemWarehouse = warehouses.find(
    (warehouse) => warehouse.id === inventoryItem.warehouseID
  );

  if (!itemWarehouse) {
    return <p>Loading</p>;
  }

  const inStock = inventoryItem.status === "In Stock";

  return (
    <div className="inventory-item__container">
      <div className="inventory-item__header">
        <div className="inventory-item__back-name-container">
          <Link to="/inventory" className="inventory-item__back-link">
            <img src={backArrow} alt="" />
          </Link>
          <h1 className="inventory-item__title">{inventoryItem.name}</h1>
        </div>
        <Link
          to={`/inventory/${inventoryItem.id}/edit`}
          className="inventory-item__edit-link"
        >
          <img src={editIcon} alt="" className="inventory-item__edit-icon" />
          <p className="inventory-item__edit-text">Edit</p>
        </Link>
      </div>
      <div className="inventory-item__info-containers">
        <div className="inventory-item__info-container inventory-item__info-container--left">
          <h2 className="inventory-item__info-header">ITEM DESCRIPTION:</h2>
          <p className="inventory-item__info inventory-item__info--description">
            {inventoryItem.description}
          </p>
          <h2 className="inventory-item__info-header">CATEGORY:</h2>
          <p className="inventory-item__info inventory-item__info--category">
            {inventoryItem.category}
          </p>
        </div>
        <div className="inventory-item__info-container">
          <div className="inventory-item__status-qty-container">
            <div className="inventory-item__status-container">
              <h2 className="inventory-item__info-header inventory-item__info-header--status">
                STATUS:
              </h2>
              {inStock ? (
                <p className="inventory-item__status inventory-item__status--in-stock">
                  {inventoryItem.status.toUpperCase()}
                </p>
              ) : (
                <p className="inventory-item__status inventory-item__status--out-of-stock">
                  {inventoryItem.status.toUpperCase()}
                </p>
              )}
            </div>
            <div className="inventory-item__qty-container">
              <h2 className="inventory-item__info-header">QUANTITY:</h2>
              <p className="inventory-item__info">{inventoryItem.quantity}</p>
            </div>
          </div>
          <h2 className="inventory-item__info-header">WAREHOUSE:</h2>
          <p className="inventory-item__info">{itemWarehouse.name}</p>
        </div>
      </div>
    </div>
  );
}
