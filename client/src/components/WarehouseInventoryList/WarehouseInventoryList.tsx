import { ReactElement } from "react";
import { InventoryItemInfo } from "../../types/types";
import "./WarehouseInventoryList.scss";
import WarehouseInventoryListItem from "../WarehouseInventoryListItem/WarehouseInventoryListItem";
import sortIcon from "../../assets/icons/sort-24px.svg";

interface Props {
  inventoryItems: InventoryItemInfo[];
  handleDelete: Function;
}

export default function WarehouseInventoryList({
  inventoryItems,
  handleDelete,
}: Props): ReactElement {
  return (
    <>
      <div className="warehouse-inventory-list__headers">
        <div className="warehouse-inventory-list__item-category-container">
          <div className="warehouse-inventory-list__header-container warehouse-inventory-list__header-container--item">
            <h2 className="warehouse-inventory-list__header">INVENTORY ITEM</h2>
            <img
              src={sortIcon}
              alt=""
              className="warehouse-inventory-list__sort-icon"
            />
          </div>
          <div className="warehouse-inventory-list__header-container">
            <h2 className="warehouse-inventory-list__header">CATEGORY</h2>
            <img
              src={sortIcon}
              alt=""
              className="warehouse-inventory-list__sort-icon"
            />
          </div>
        </div>
        <div className="warehouse-inventory-list__status-quantity-container">
          <div className="warehouse-inventory-list__header-container warehouse-inventory-list__header-container--status">
            <h2 className="warehouse-inventory-list__header">STATUS</h2>
            <img
              src={sortIcon}
              alt=""
              className="warehouse-inventory-list__sort-icon"
            />
          </div>
          <div className="warehouse-inventory-list__header-container">
            <h2 className="warehouse-inventory-list__header">QUANTITY</h2>
            <img
              src={sortIcon}
              alt=""
              className="warehouse-inventory-list__sort-icon"
            />
          </div>
        </div>
        <div className="warehouse-inventory-list__header-container warehouse-inventory-list__header-container--actions">
          <h2 className="warehouse-inventory-list__header warehouse-inventory-list__header--actions">
            ACTIONS
          </h2>
        </div>
      </div>
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
    </>
  );
}
