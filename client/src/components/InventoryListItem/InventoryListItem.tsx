import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

interface Props {
  inventoryItem: InventoryItemInfo;
  handleDelete: Function;
}

export default function InventoryListItem({
  inventoryItem,
  handleDelete,
}: Props): ReactElement {
  const handleClick = () => {
    handleDelete(inventoryItem.id);
  };

  return (
    <div>
      <Link to={`/inventory/${inventoryItem.id}`}>
        {inventoryItem.itemName}
      </Link>
      <button onClick={handleClick}>
        <img src={deleteIcon} alt="delete icon" />
      </button>
      <Link to={`/inventory/${inventoryItem.id}/edit`}>Edit</Link>
    </div>
  );
}
