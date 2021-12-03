import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";
import { Link } from "react-router-dom";

interface Props {
  inventoryItem: InventoryItemInfo;
}

export default function InventoryListItem({
  inventoryItem,
}: Props): ReactElement {
  return (
    <div>
      <Link to={`/inventory/${inventoryItem.id}`}>
        {inventoryItem.itemName}
      </Link>
    </div>
  );
}
