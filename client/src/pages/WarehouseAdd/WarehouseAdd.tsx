import React, { ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function WarehouseAdd(): ReactElement {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <Link to="/">Back</Link>
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
        <Link to="/">Cancel</Link>
        <button type="submit">+ Add New Warehouse</button>
      </form>
    </>
  );
}
