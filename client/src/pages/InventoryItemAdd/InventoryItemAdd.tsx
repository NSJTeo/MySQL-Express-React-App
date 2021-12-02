import React, { ReactElement } from "react";
import { useNavigate } from "react-router";

export default function InventoryItemAdd(): ReactElement {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/inventory");
  };

  return (
    <>
      <div>
        <button type="button" onClick={handleCancel}>
          Back
        </button>
        <h1>Add New Inventory Item</h1>
      </div>
      <form>
        <h2>Item Details</h2>
        <label>Item Name</label>
        <input />
        <label>Description</label>
        <textarea />
        <label>Category</label>
        <select>
          <option>Please Select</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
        <h2>Item Availability</h2>
        <div>
          <input name="availability" type="radio" />
          <label>In Stock</label>
        </div>
        <div>
          <input name="availability" type="radio" />
          <label>Out of Stock</label>
        </div>
        <label>Quantity</label>
        <input />
        <select>
          <option>Please Select</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">+ Add New Warehouse</button>
      </form>
    </>
  );
}
