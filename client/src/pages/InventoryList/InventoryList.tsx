import { ReactElement, useState, useEffect } from "react";
import { InventoryItemInfo, WarehouseProfile } from "../../types/types";
import InventoryListSearchBar from "../../components/InventoryListSearchBar/InventoryListSearchBar";
import InventoryListItem from "../../components/InventoryListItem/InventoryListItem";
import axios from "axios";
import "./InventoryList.scss";

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
      <div>
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
    </div>
  );
}
