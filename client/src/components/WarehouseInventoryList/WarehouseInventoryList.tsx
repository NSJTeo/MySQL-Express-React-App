import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";
import WarehouseInventoryListItem from "../WarehouseInventoryListItem/WarehouseInventoryListItem";

interface Props {
  inventoryItems: InventoryItemInfo[];
}

export default function WarehouseInventoryList({
  inventoryItems,
}: Props): ReactElement {
  return (
    <ul>
      {inventoryItems.map((inventoryItem) => {
        return (
          <WarehouseInventoryListItem
            key={inventoryItem.id}
            inventoryItem={inventoryItem}
          />
        );
      })}
    </ul>
  );
}
