import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import "./WarehouseInventoryListItem.scss";
import { Link } from "react-router-dom";
import nextItem from "../../assets/icons/chevron_right-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";

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

  const inStock = inventoryItem.status === "In Stock";

  return (
    <li className="warehouse-inventory-list-item__container">
      <div className="warehouse-inventory-list-item__name-status-container">
        <div className="warehouse-inventory-list-item__info-container">
          <h2 className="warehouse-inventory-list-item__header">
            INVENTORY ITEM
          </h2>
          <Link
            to={`/inventory/${inventoryItem.id}`}
            className="warehouse-inventory-list-item__name-container"
          >
            <p className="warehouse-inventory-list-item__info warehouse-inventory-list-item__name-link">
              {inventoryItem.name}
            </p>
            <img
              src={nextItem}
              alt=""
              className="warehouse-inventory-list-item__info warehouse-inventory-list-item__link-icon"
            />
          </Link>
        </div>
        <div className="warehouse-inventory-list-item__info-container">
          <h2 className="warehouse-inventory-list-item__header">STATUS</h2>
          <p
            className={`warehouse-inventory-list-item__status ${
              inStock
                ? "warehouse-inventory-list-item__status--in-stock"
                : "warehouse-inventory-list-item__status--out-of-stock"
            }`}
          >
            {inventoryItem.status.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="warehouse-inventory-list-item__category-quantity-container">
        <div className="warehouse-inventory-list-item__info-container">
          <h2 className="warehouse-inventory-list-item__header">CATEGORY</h2>
          <p className="warehouse-inventory-list-item__info">
            {inventoryItem.category}
          </p>
        </div>
        <div className="warehouse-inventory-list-item__info-container">
          <h2 className="warehouse-inventory-list-item__header">QTY</h2>
          <p className="warehouse-inventory-list-item__info">
            {inventoryItem.quantity}
          </p>
        </div>
      </div>
      <div className="warehouse-inventory-list-item__btns">
        <button
          onClick={handleClick}
          className="warehouse-inventory-list-item__btn"
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
        <Link
          to={`/inventory/${inventoryItem.id}/edit`}
          className="warehouse-inventory-list-item__btn"
        >
          <img src={editIcon} alt="" />
        </Link>
      </div>
    </li>
  );
}
