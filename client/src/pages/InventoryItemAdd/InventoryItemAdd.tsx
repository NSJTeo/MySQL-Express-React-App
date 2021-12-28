import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { WarehouseProfile, InventoryItemInfo } from "../../types/types";
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import "./InventoryItemAdd.scss";

export default function InventoryItemAdd(): ReactElement {
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: any): void => {
    e.preventDefault();
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
    if (!e.target.name.value) {
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
    const newInventoryItem: InventoryItemInfo = {
      warehouseID: selectedWarehouse.id,
      name: e.target.name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      status: +e.target.quantity.value ? "In Stock" : "Out of Stock",
      quantity: +e.target.quantity.value,
    };
    axios.post("http://localhost:8080/inventory", newInventoryItem).then(() => {
      navigate(`/warehouse/${selectedWarehouse.id}`);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/warehouses").then((response) => {
      setWarehouses(response.data);
    });
  }, []);

  const categories: string[] = [
    "Electronics",
    "Gear",
    "Apparel",
    "Accessories",
    "Health",
  ];

  return (
    <div className="inventory-item-add__container">
      <div className="inventory-item-add__back-title-container">
        <Link to="/inventory">
          <img src={backIcon} alt="" />
        </Link>
        <h1 className="inventory-item-add__title">Add New Inventory Item</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inventory-item-add__form-containers">
          <div className="inventory-item-add__form-container inventory-item-add__form-container--left">
            <h2 className="inventory-item-add__form-header">Item Details</h2>
            <label className="inventory-item-add__form-label">Item Name</label>
            <input
              name="name"
              placeholder="Item Name"
              className="inventory-item-edit__form-input"
            />
            <label className="inventory-item-add__form-label">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Please enter a description..."
              className="inventory-item-edit__form-input inventory-item-edit__form-input--text-area"
            />
            <label className="inventory-item-add__form-label">Category</label>
            <select name="category" className="inventory-item-edit__form-input">
              <option value="">Please Select</option>
              {categories.map((category: string) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </div>
          <div className="inventory-item-add__form-container">
            <h2 className="inventory-item-add__form-header">
              Item Availability
            </h2>
            <p className="inventory-item-add__form-label"></p>
            <div className="inventory-item-add__status-containers">
              <div className="inventory-item-add__status-container">
                <input
                  name="status"
                  type="radio"
                  value="In Stock"
                  className="inventory-item-add__radio-input"
                />
                <label className="inventory-item-add__radio-label">
                  In Stock
                </label>
              </div>
              <div className="inventory-item-add__status-container">
                <input
                  name="status"
                  type="radio"
                  value="Out of Stock"
                  className="inventory-item-add__radio-input"
                />
                <label className="inventory-item-add__radio-label">
                  Out of Stock
                </label>
              </div>
            </div>
            <label className="inventory-item-add__form-label">Quantity</label>
            <input
              name="quantity"
              className="inventory-item-edit__form-input"
              defaultValue={0}
            />
            <label className="inventory-item-add__form-label">Warehouse</label>
            <select
              name="warehouseName"
              className="inventory-item-edit__form-input"
            >
              <option value="">Please Select</option>
              {warehouses.map((warehouse: WarehouseProfile) => {
                return <option value={warehouse.name}>{warehouse.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="inventory-item-add__btns">
          <Link
            to="/inventory"
            className="inventory-item-add__btn inventory-item-add__btn--cancel"
          >
            Cancel
          </Link>
          <button className="inventory-item-add__btn inventory-item-add__btn--save">
            + Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
