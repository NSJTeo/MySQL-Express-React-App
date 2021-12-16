import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { WarehouseProfile, InventoryItemInfo } from "../../types/types";

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
    <>
      <div>
        <Link to="/inventory">Back</Link>
        <h1>Add New Inventory Item</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Item Details</h2>
        <label>Item Name</label>
        <input name="name" />
        <label>Description</label>
        <textarea name="description" />
        <label>Category</label>
        <select name="category">
          <option value="">--Please Select--</option>
          {categories.map((category: string) => {
            return <option value={category}>{category}</option>;
          })}
        </select>
        <h2>Item Availability</h2>
        <div>
          <input name="status" type="radio" value="In Stock" />
          <label>In Stock</label>
        </div>
        <div>
          <input name="status" type="radio" value="Out of Stock" />
          <label>Out of Stock</label>
        </div>
        <label>Quantity</label>
        <input name="quantity" />
        <label>Warehouse</label>
        <select name="warehouseName">
          <option value="">--Please Select--</option>
          {warehouses.map((warehouse: WarehouseProfile) => {
            return <option value={warehouse.name}>{warehouse.name}</option>;
          })}
        </select>
        <Link to="/inventory">Back</Link>
        <button>+ Add New Item</button>
      </form>
    </>
  );
}
