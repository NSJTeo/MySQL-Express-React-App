import React, { ReactElement } from "react";
import { InventoryItem } from "../../types/types";
import WarehouseInventoryListItem from "../WarehouseInventoryListItem/WarehouseInventoryListItem";

interface Props {
  inventoryItems: InventoryItem[];
}

export default function WarehouseInventoryList({
  inventoryItems,
}: Props): ReactElement {
  return (
    <ul>
      {inventoryItems.map((inventoryItem) => {
        return <WarehouseInventoryListItem inventoryItem={inventoryItem} />;
      })}
    </ul>
  );
}
