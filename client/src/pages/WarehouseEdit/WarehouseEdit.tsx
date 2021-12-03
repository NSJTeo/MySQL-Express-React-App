import React, { ReactElement, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { WarehouseProfile } from "../../types/types";
import axios from "axios";

export default function WarehouseEdit(): ReactElement {
  const [warehouseDetails, setWarehouseDetails] = useState<WarehouseProfile>();
  const { warehouseID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouses/${warehouseID}`)
      .then((response) => {
        setWarehouseDetails(response.data);
      });
  }, [warehouseID]);

  if (!warehouseDetails) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <Link to={`/warehouse/${warehouseDetails.id}`}>Back</Link>
        <h1>Edit Warehouse</h1>
      </div>
      <form>
        <h2>Warehouse Details</h2>
        <label>Warehouse Name</label>
        <input defaultValue={warehouseDetails.name} />
        <label>Street Address</label>
        <input defaultValue={warehouseDetails.address} />
        <label>City</label>
        <input defaultValue={warehouseDetails.city} />
        <label>Country</label>
        <input defaultValue={warehouseDetails.country} />
        <h2>Contact Details</h2>
        <label>Contact Name</label>
        <input defaultValue={warehouseDetails.contact.name} />
        <label>Position</label>
        <input defaultValue={warehouseDetails.contact.position} />
        <label>Phone Number</label>
        <input defaultValue={warehouseDetails.contact.phone} />
        <label>Email</label>
        <input defaultValue={warehouseDetails.contact.email} />
        <Link to={`/warehouse/${warehouseDetails.id}`}>Cancel</Link>
        <button type="submit">Save</button>
      </form>
    </>
  );
}