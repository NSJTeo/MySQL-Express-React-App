import React, { ReactElement } from "react";
import { InventoryItem } from "../../types/types";

interface Props {
  inventoryItem: InventoryItem;
}

export default function WarehouseInventoryListItem({
  inventoryItem,
}: Props): ReactElement {
  return <li>{inventoryItem.itemName}</li>;
}
