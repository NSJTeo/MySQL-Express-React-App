import { ReactElement, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InventoryItemInfo, WarehouseProfile } from "../../types/types";
import axios from "axios";
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import "./InventoryItemEdit.scss";

export default function InventoryItemEdit(): ReactElement {
  const [inventoryItem, setInventoryItem] = useState<InventoryItemInfo>();
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);

  const { inventoryItemID } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (!inventoryItemID) {
      return;
    }
    const selectedWarehouseName = e.target.warehouseName.value;
    if (!selectedWarehouseName) {
      return;
    }
    const selectedWarehouse: WarehouseProfile | undefined = warehouses.find(
      (warehouse) => warehouse.name === selectedWarehouseName
    );
    if (!selectedWarehouse) {
      return;
    }
    if (!selectedWarehouse.id) {
      return;
    }
    if (!e.target.itemName.value) {
      return;
    }
    if (!e.target.description.value) {
      return;
    }
    if (!e.target.category.value) {
      return;
    }
    if (!e.target.status.value) {
      return;
    }
    if (isNaN(+e.target.quantity.value) || e.target.quantity.value < 0) {
      return;
    }
    const itemInformation: InventoryItemInfo = {
      warehouseID: selectedWarehouse.id,
      name: e.target.itemName.value,
      description: e.target.description.value,
      category: e.target.category.value,
      status: +e.target.quantity.value ? "In Stock" : "Out of Stock",
      quantity: +e.target.quantity.value,
      id: inventoryItemID,
    };

    axios
      .put(
        `http://localhost:8080/inventory/${inventoryItemID}`,
        itemInformation
      )
      .then(() => {
        navigate(`/inventory/${inventoryItemID}`);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventory/${inventoryItemID}`)
      .then((response) => {
        setInventoryItem(response.data);
        axios.get(`http://localhost:8080/warehouses`).then((response) => {
          setWarehouses(response.data);
        });
      });
  }, [inventoryItemID]);

  if (!inventoryItem) {
    return <p>Loading</p>;
  }

  let categories: string[] = [
    "Electronics",
    "Gear",
    "Apparel",
    "Accessories",
    "Health",
  ];

  categories = categories.filter(
    (category: string) => category !== inventoryItem.category
  );

  const currentWarehouse: WarehouseProfile | undefined = warehouses.find(
    (warehouse) => warehouse.id === inventoryItem.warehouseID
  );

  const filteredWarehouses: WarehouseProfile[] = warehouses.filter(
    (warehouse: WarehouseProfile) => warehouse.name !== currentWarehouse?.name
  );

  return (
    <div className="inventory-item-edit__container">
      <div className="inventory-item-edit__back-title-container">
        <Link to={`/inventory`}>
          <img src={backIcon} alt="" />
        </Link>
        <h1 className="inventory-item-edit__title">Edit Inventory Item</h1>
      </div>
      <form onSubmit={(e: any) => handleSubmit(e)}>
        <div className="inventory-item-edit__form-container">
          <h2 className="inventory-item-edit__form-header">Item Details</h2>
          <label className="inventory-item-edit__form-label">Item Name</label>
          <input
            defaultValue={inventoryItem.name}
            name="itemName"
            className="inventory-item-edit__form-input"
          />
          <label className="inventory-item-edit__form-label">Description</label>
          <textarea
            defaultValue={inventoryItem.description}
            name="description"
            className="inventory-item-edit__form-input inventory-item-edit__form-input--text-area"
          />
          <label className="inventory-item-edit__form-label">Category</label>
          <select name="category" className="inventory-item-edit__form-input">
            <option value={inventoryItem.category}>
              {inventoryItem.category}
            </option>
            {categories.map((category: string) => {
              return (
                <option value={category} key={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="inventory-item-edit__form-container">
          <h2 className="inventory-item-edit__form-header">
            Item Availability
          </h2>
          {/* remove hover cursor */}
          <p className="inventory-item-edit__form-label">Status</p>
          <div className="inventory-item-edit__status-containers">
            <div className="inventory-item-edit__status-container">
              {inventoryItem.quantity ? (
                <input
                  name="status"
                  type="radio"
                  defaultChecked
                  className="inventory-item-edit__radio-input"
                />
              ) : (
                <input
                  name="status"
                  type="radio"
                  className="inventory-item-edit__radio-input"
                />
              )}
              <label className="inventory-item-edit__radio-label">
                In Stock
              </label>
            </div>
            <div className="inventory-item-edit__status-container">
              {inventoryItem.quantity ? (
                <input
                  name="status"
                  type="radio"
                  className="inventory-item-edit__radio-input"
                />
              ) : (
                <input
                  name="status"
                  type="radio"
                  defaultChecked
                  className="inventory-item-edit__radio-input"
                />
              )}
              <label className="inventory-item-edit__radio-label">
                Out of Stock
              </label>
            </div>
          </div>
          <label className="inventory-item-edit__form-label">Quantity</label>
          <input
            defaultValue={inventoryItem.quantity}
            name="quantity"
            className="inventory-item-edit__form-input"
          />
          <label className="inventory-item-edit__form-label">Warehouse</label>
          <select
            name="warehouseName"
            className="inventory-item-edit__form-input"
          >
            {currentWarehouse && (
              <option value={currentWarehouse.name}>
                {currentWarehouse.name}
              </option>
            )}
            {filteredWarehouses.map((warehouse: WarehouseProfile) => {
              return (
                <option value={warehouse.name} key={warehouse.id}>
                  {warehouse.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="inventory-item-edit__btns">
          <Link
            to={`/inventory`}
            className="inventory-item-edit__btn inventory-item-edit__btn--cancel"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inventory-item-edit__btn inventory-item-edit__btn--save"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
