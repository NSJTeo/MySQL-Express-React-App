import { ReactElement, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { InventoryItemInfo } from "../../types/types";
import axios from "axios";

export default function InventoryItemEdit(): ReactElement {
  const [inventoryItem, setInventoryItem] = useState<InventoryItemInfo>();

  const { inventoryItemID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventory/${inventoryItemID}`)
      .then((response) => {
        setInventoryItem(response.data);
      });
  }, [inventoryItemID]);

  if (!inventoryItem) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <Link to={`/inventory/${inventoryItemID}`}>Back</Link>
        <h1>Add New Inventory Item</h1>
      </div>
      <form>
        <h2>Item Details</h2>
        <label>Item Name</label>
        <input defaultValue={inventoryItem.itemName} />
        <label>Description</label>
        <textarea defaultValue={inventoryItem.description} />
        <label>Category</label>
        <select>
          <option>{inventoryItem.category}</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
        <h2>Item Availability</h2>
        <div>
          {inventoryItem.quantity ? (
            <input name="availability" type="radio" checked />
          ) : (
            <input name="availability" type="radio" />
          )}
          <label>In Stock</label>
        </div>
        <div>
          {inventoryItem.quantity ? (
            <input name="availability" type="radio" />
          ) : (
            <input name="availability" type="radio" checked />
          )}
          <label>Out of Stock</label>
        </div>
        <label>Quantity</label>
        <input defaultValue={inventoryItem.quantity} />
        <label>Warehouse</label>
        <select>
          <option>{inventoryItem.warehouseName}</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
        <Link to={`/inventory/${inventoryItemID}`}>Cancel</Link>
        <button type="submit">+ Add New Warehouse</button>
      </form>
    </>
  );
}
