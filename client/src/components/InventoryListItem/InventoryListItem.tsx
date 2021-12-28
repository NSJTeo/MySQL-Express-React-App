import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import nextIcon from "../../assets/icons/chevron_right-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import "./InventoryListItem.scss";

interface Props {
  inventoryItem: InventoryItemInfo;
  handleDelete: Function;
  warehouse: String;
}

export default function InventoryListItem({
  inventoryItem,
  handleDelete,
  warehouse,
}: Props): ReactElement {
  const handleClick = () => {
    handleDelete(inventoryItem.id);
  };

  const inStock = inventoryItem.status === "In Stock";

  return (
    <li className="inventory-list-item__container">
      <div className="inventory-list-item__inner-container">
        <div className="inventory-list-item__item-status-container">
          <div className="inventory-list-item__info-container inventory-list-item__info-container--item">
            <h2 className="inventory-list-item__info-header">INVENTORY ITEM</h2>
            <Link
              to={`/inventory/${inventoryItem.id}`}
              className="inventory-list-item__item-link"
            >
              <p className="inventory-list-item__item-link-text">
                {inventoryItem.name}
              </p>
              <img
                src={nextIcon}
                alt=""
                className="inventory-list-item__item-link-icon"
              />
            </Link>
          </div>
          {/* {inStock ? (
          <div className="inventory-list-item__info-container">
            <h2 className="inventory-list-item__info-header">STATUS</h2>
            <p className="inventory-list-item__status inventory-list-item__status--in-stock">
              {inventoryItem.status.toUpperCase()}
            </p>
          </div>
        ) : (
          <div className="inventory-list-item__info-container">
            <h2 className="inventory-list-item__info-header">STATUS</h2>
            <p className="inventory-list-item__status inventory-list-item__status--out-of-stock">
              {inventoryItem.status.toUpperCase()}
            </p>
          </div>
        )} */}
          <div className="inventory-list-item__info-container">
            <h2 className="inventory-list-item__info-header">CATEGORY</h2>
            <p className="inventory-list-item__info">
              {inventoryItem.category}
            </p>
          </div>
        </div>
        <div className="inventory-list-item__category-qty-container">
          {inStock ? (
            <div className="inventory-list-item__info-container inventory-list-item__info-container--status">
              <h2 className="inventory-list-item__info-header">STATUS</h2>
              <p className="inventory-list-item__status inventory-list-item__status--in-stock">
                {inventoryItem.status.toUpperCase()}
              </p>
            </div>
          ) : (
            <div className="inventory-list-item__info-container inventory-list-item__info-container--status">
              <h2 className="inventory-list-item__info-header">STATUS</h2>
              <p className="inventory-list-item__status inventory-list-item__status--out-of-stock">
                {inventoryItem.status.toUpperCase()}
              </p>
            </div>
          )}
          <div className="inventory-list-item__info-container">
            <h2 className="inventory-list-item__info-header">QTY</h2>
            <p className="inventory-list-item__info">
              {inventoryItem.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="inventory-list-item__warehouse-container">
        <div className="inventory-list-item__info-container">
          <h2 className="inventory-list-item__info-header">WAREHOUSE</h2>
          <p className="inventory-list-item__info">{warehouse}</p>
        </div>
      </div>
      <div className="inventory-list-item__btns">
        <button onClick={handleClick} className="inventory-list-item__btn">
          <img src={deleteIcon} alt="delete icon" />
        </button>
        <Link
          to={`/inventory/${inventoryItem.id}/edit`}
          className="inventory-list-item__btn inventory-list-item__btn--edit"
        >
          <img src={editIcon} alt="" />
        </Link>
      </div>
    </li>
  );
}
