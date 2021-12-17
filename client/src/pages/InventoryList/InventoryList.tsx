import { ReactElement, useState, useEffect } from "react";
import { InventoryItemInfo } from "../../types/types";
import InventoryListSearchBar from "../../components/InventoryListSearchBar/InventoryListSearchBar";
import InventoryListItem from "../../components/InventoryListItem/InventoryListItem";
import axios from "axios";
import "./InventoryList.scss";

export default function InventoryList(): ReactElement {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemInfo[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/inventory").then((response) => {
      setInventoryItems(response.data);
    });
  }, []);

  const handleDelete = (inventoryID: string): void => {
    axios.delete(`http://localhost:8080/inventory/${inventoryID}`).then(() => {
      axios.get("http://localhost:8080/inventory").then((response) => {
        setInventoryItems(response.data);
      });
    });
  };

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
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
