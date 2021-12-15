import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

interface Props {
  inventoryItem: InventoryItemInfo;
  handleDelete: Function;
}

export default function WarehouseInventoryListItem({
  inventoryItem,
  handleDelete,
}: Props): ReactElement {
  const handleClick = (): void => {
    handleDelete(inventoryItem.id);
  };

  return (
    <li>
      <p>{inventoryItem.name}</p>
      <button onClick={handleClick}>
        <img src={deleteIcon} alt="delete icon" />
      </button>
    </li>
  );
}
