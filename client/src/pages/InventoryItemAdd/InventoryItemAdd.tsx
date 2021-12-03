import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { WarehouseProfile } from "../../types/types";

type NewInventoryItem = {
  warehouseId: string;
  warehouseName: string;
  itemName: string;
  description: string;
  category: string;
  status: string;
  quantity: number;
};

export default function InventoryItemAdd(): ReactElement {
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);

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
    const newInventoryItem: NewInventoryItem = {
      warehouseId: selectedWarehouse.id,
      warehouseName: selectedWarehouse.name,

      itemName: e.target.itemName.value,
      description: e.target.description.value,
      category: e.target.category.value,
      status: +e.target.quantity.value ? "In Stock" : "Out of Stock",
      quantity: +e.target.quantity.value,
    };
    console.log(newInventoryItem);
    alert(newInventoryItem);
    axios
      .post("http://localhost:8080/inventory", newInventoryItem)
      .then((response) => {
        console.log(response);
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
        <input name="itemName" />
        <label>Description</label>
        <textarea name="description" />
        <label>Category</label>
        <select name="category">
          <option value="">--Please Select--</option>
          {categories.map((category) => {
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
          {warehouses.map((warehouse) => {
            return <option value={warehouse.name}>{warehouse.name}</option>;
          })}
        </select>
        <Link to="/inventory">Back</Link>
        <button>+ Add New Warehouse</button>
      </form>
    </>
  );
}
