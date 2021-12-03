import { ReactElement, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InventoryItemInfo, WarehouseProfile } from "../../types/types";
import axios from "axios";

export default function InventoryItemEdit(): ReactElement {
  const [inventoryItem, setInventoryItem] = useState<InventoryItemInfo>();
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);

  const { inventoryItemID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventory/${inventoryItemID}`)
      .then((response) => {
        setInventoryItem(response.data);
        axios.get(`http://localhost:8080/warehouses`).then((response) => {
          let warehouses = response.data;
          warehouses = warehouses.filter(
            (warehouse: WarehouseProfile) =>
              warehouse.name !== inventoryItem?.warehouseName
          );
          setWarehouses(warehouses);
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

  return (
    <>
      <div>
        <Link to={`/inventory/${inventoryItemID}`}>Back</Link>
        <h1>Edit Inventory Item</h1>
      </div>
      <form>
        <h2>Item Details</h2>
        <label>Item Name</label>
        <input defaultValue={inventoryItem.itemName} />
        <label>Description</label>
        <textarea defaultValue={inventoryItem.description} />
        <label>Category</label>
        <select>
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
            <input name="availability" type="radio" defaultChecked />
          ) : (
            <input name="availability" type="radio" />
          )}
          <label>In Stock</label>
        </div>
        <div>
          {inventoryItem.quantity ? (
            <input name="availability" type="radio" />
          ) : (
            <input name="availability" type="radio" defaultChecked />
          )}
          <label>Out of Stock</label>
        </div>
        <label>Quantity</label>
        <input defaultValue={inventoryItem.quantity} />
        <label>Warehouse</label>
        <select>
          <option value={inventoryItem.warehouseName}>
            {inventoryItem.warehouseName}
          </option>
          {warehouses.map((warehouse) => {
            return <option value={warehouse.name}>{warehouse.name}</option>;
          })}
        </select>
        <Link to={`/inventory/${inventoryItemID}`}>Cancel</Link>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
