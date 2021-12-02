import React, { ReactElement, useState, useEffect } from "react";
import { InventoryItem } from "../../types/types";
import InventoryListSearchBar from "../../components/InventoryListSearchBar/InventoryListSearchBar";
import InventoryListItem from "../../components/InventoryListItem/InventoryListItem";
import axios from "axios";

export default function InventoryList(): ReactElement {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    console.log("use effect");
    axios.get("http://localhost:8080/inventory").then((response) => {
      console.log(response.data);
      setInventoryItems(response.data);
    });
  }, []);

  return (
    <>
      <InventoryListSearchBar />
      <div>
        <ul>
          {inventoryItems.map((inventoryItem) => {
            return (
              <InventoryListItem
                key={inventoryItem.id}
                inventoryItem={inventoryItem}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
