import React, { ReactElement } from "react";
import { InventoryItem } from "../../types/types";

interface Props {
  inventoryItem: InventoryItem;
}

export default function WarehouseInventoryListItem({
  inventoryItem,
}: Props): ReactElement {
  return (
    <li>
      <p>{inventoryItem.itemName}</p>
    </li>
  );
}
