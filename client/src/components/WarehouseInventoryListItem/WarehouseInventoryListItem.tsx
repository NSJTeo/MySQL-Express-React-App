import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";

interface Props {
  inventoryItem: InventoryItemInfo;
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
