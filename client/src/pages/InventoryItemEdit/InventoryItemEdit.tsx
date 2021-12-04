import { ReactElement, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InventoryItemInfo, WarehouseProfile } from "../../types/types";
import axios from "axios";

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
      warehouseName: selectedWarehouse.name,
      itemName: e.target.itemName.value,
      description: e.target.description.value,
      category: e.target.category.value,
      status: +e.target.quantity.value ? "In Stock" : "Out of Stock",
      quantity: +e.target.quantity.value,
      id: inventoryItemID,
    };

    console.log(itemInformation);
    axios
      .put(
        `http://localhost:8080/inventory/${inventoryItemID}`,
        itemInformation
      )
      .then((response) => {
        console.log(response.data);
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
    (category) => category !== inventoryItem.category
  );

  const filteredWarehouses = warehouses.filter(
    (warehouse: WarehouseProfile) =>
      warehouse.name !== inventoryItem?.warehouseName
  );

  return (
    <>
      <div>
        <Link to={`/inventory/${inventoryItemID}`}>Back</Link>
        <h1>Edit Inventory Item</h1>
      </div>
      <form onSubmit={(e: any) => handleSubmit(e)}>
        <h2>Item Details</h2>
        <label>Item Name</label>
        <input defaultValue={inventoryItem.itemName} name="itemName" />
        <label>Description</label>
        <textarea defaultValue={inventoryItem.description} name="description" />
        <label>Category</label>
        <select name="category">
          <option value={inventoryItem.category}>
            {inventoryItem.category}
          </option>
          {categories.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </select>
        <h2>Item Availability</h2>
        <div>
          {inventoryItem.quantity ? (
            <input name="status" type="radio" defaultChecked />
          ) : (
            <input name="status" type="radio" />
          )}
          <label>In Stock</label>
        </div>
        <div>
          {inventoryItem.quantity ? (
            <input name="status" type="radio" />
          ) : (
            <input name="status" type="radio" defaultChecked />
          )}
          <label>Out of Stock</label>
        </div>
        <label>Quantity</label>
        <input defaultValue={inventoryItem.quantity} name="quantity" />
        <label>Warehouse</label>
        <select name="warehouseName">
          <option value={inventoryItem.warehouseName}>
            {inventoryItem.warehouseName}
          </option>
          {filteredWarehouses.map((warehouse) => {
            return <option value={warehouse.name}>{warehouse.name}</option>;
          })}
        </select>
        <Link to={`/inventory/${inventoryItemID}`}>Cancel</Link>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
