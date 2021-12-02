import React, { ReactElement } from "react";
import { useNavigate } from "react-router";

export default function WarehouseAdd() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <button type="button" onClick={handleCancel}>
          Back
        </button>
        <h1>Add New Warehouse</h1>
      </div>
      <form>
        <h2>Warehouse Details</h2>
        <label>Warehouse Name</label>
        <input />
        <label>Street Address</label>
        <input />
        <label>City</label>
        <input />
        <label>Country</label>
        <input />
        <h2>Contact Details</h2>
        <label>Contact Name</label>
        <input />
        <label>Position</label>
        <input />
        <label>Phone Number</label>
        <input />
        <label>Email</label>
        <input />
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">+ Add New Warehouse</button>
      </form>
    </>
  );
}
