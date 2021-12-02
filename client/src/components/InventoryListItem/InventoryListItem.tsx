import React, { ReactElement } from "react";
import { InventoryItem } from "../../types/types";

interface Props {
  inventoryItem: InventoryItem;
}

export default function InventoryListItem({
  inventoryItem,
}: Props): ReactElement {
  return <div>{inventoryItem.itemName}</div>;
}
