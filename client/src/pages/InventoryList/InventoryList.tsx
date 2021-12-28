import { ReactElement, useState, useEffect } from "react";
import { InventoryItemInfo, WarehouseProfile } from "../../types/types";
import InventoryListSearchBar from "../../components/InventoryListSearchBar/InventoryListSearchBar";
import InventoryListItem from "../../components/InventoryListItem/InventoryListItem";
import axios from "axios";
import "./InventoryList.scss";
import sortIcon from "../../assets/icons/sort-24px.svg";

export default function InventoryList(): ReactElement {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemInfo[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/inventory").then((response) => {
      setInventoryItems(response.data);
      axios("http://localhost:8080/warehouses").then((response) => {
        setWarehouses(response.data);
      });
    });
  }, []);

  const handleDelete = (inventoryID: string): void => {
    axios.delete(`http://localhost:8080/inventory/${inventoryID}`).then(() => {
      axios.get("http://localhost:8080/inventory").then((response) => {
        setInventoryItems(response.data);
      });
    });
  };

  const getWarehouse = (warehouseID: string): string => {
    let warehouse = warehouses.find(
      (warehouse) => warehouse.id === warehouseID
    );
    return warehouse!.name || "";
  };

  if (warehouses.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="inventory-list__container">
      <InventoryListSearchBar />
      <div className="inventory-list__headers">
        <div className="inventory-list__header-container">
          <h2 className="inventory-list__header">INVENTORY ITEM</h2>
          <img src={sortIcon} alt="" className="inventory-list__sort-icon" />
        </div>
        <div className="inventory-list__header-container">
          <h2 className="inventory-list__header">CATEGORY</h2>
          <img src={sortIcon} alt="" className="inventory-list__sort-icon" />
        </div>
        <div className="inventory-list__header-container">
          <h2 className="inventory-list__header">STATUS</h2>
          <img src={sortIcon} alt="" className="inventory-list__sort-icon" />
        </div>
        <div className="inventory-list__header-container">
          <h2 className="inventory-list__header">QTY</h2>
          <img src={sortIcon} alt="" className="inventory-list__sort-icon" />
        </div>
        <div className="inventory-list__header-container">
          <h2 className="inventory-list__header">WAREHOUSE</h2>
          <img src={sortIcon} alt="" className="inventory-list__sort-icon" />
        </div>
        <div className="inventory-list__header-container">
          <h2 className="inventory-list__header">ACTIONS</h2>
        </div>
      </div>
      <ul>
        {inventoryItems.map((inventoryItem: InventoryItemInfo) => {
          return (
            <InventoryListItem
              key={inventoryItem.id}
              inventoryItem={inventoryItem}
              handleDelete={handleDelete}
              warehouse={getWarehouse(inventoryItem.warehouseID || "")}
            />
          );
        })}
      </ul>
    </div>
  );
}
