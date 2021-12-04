import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";
import WarehouseInventoryListItem from "../WarehouseInventoryListItem/WarehouseInventoryListItem";

interface Props {
  inventoryItems: InventoryItemInfo[];
  handleDelete: Function;
}

export default function WarehouseInventoryList({
  inventoryItems,
  handleDelete,
}: Props): ReactElement {
  return (
    <ul>
      {inventoryItems.map((inventoryItem) => {
        return (
          <WarehouseInventoryListItem
            key={inventoryItem.id}
            inventoryItem={inventoryItem}
            handleDelete={handleDelete}
          />
        );
      })}
    </ul>
  );
}
