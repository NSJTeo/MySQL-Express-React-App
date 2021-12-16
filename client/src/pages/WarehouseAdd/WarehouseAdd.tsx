import axios from "axios";
import React, { ReactElement, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { WarehouseProfile } from "../../types/types";

export default function WarehouseAdd(): ReactElement {
  const navigate = useNavigate();
  const formRef: any = useRef(null);

  const handleClick = (): void => {
    const form = formRef.current;
    if (!form.name.value) {
      return;
    }
    if (!form.address.value) {
      return;
    }
    if (!form.country.value) {
      return;
    }
    if (!form.city.value) {
      return;
    }
    if (!form.contactName.value) {
      return;
    }
    if (!form.contactPosition.value) {
      return;
    }
    if (!form.contactPhone.value) {
      return;
    }
    if (!form.contactEmail.value) {
      return;
    }
    const newWarehouse: WarehouseProfile = {
      name: form.name.value,
      address: form.address.value,
      country: form.country.value,
      city: form.city.value,
      contactName: form.contactName.value,
      contactPosition: form.contactPosition.value,
      contactPhone: form.contactPhone.value,
      contactEmail: form.contactEmail.value,
    };

    axios.post("http://localhost:8080/warehouses", newWarehouse).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <div>
        <Link to="/">Back</Link>
        <h1>Add New Warehouse</h1>
      </div>
      <form ref={formRef}>
        <h2>Warehouse Details</h2>
        <label>Warehouse Name</label>
        <input name="name" />
        <label>Street Address</label>
        <input name="address" />
        <label>City</label>
        <input name="city" />
        <label>Country</label>
        <input name="country" />
        <h2>Contact Details</h2>
        <label>Contact Name</label>
        <input name="contactName" />
        <label>Position</label>
        <input name="contactPosition" />
        <label>Phone Number</label>
        <input name="contactPhone" />
        <label>Email</label>
        <input name="contactEmail" />
        <Link to="/">Cancel</Link>
        <button type="button" onClick={handleClick}>
          + Add New Warehouse
        </button>
      </form>
    </>
  );
}
