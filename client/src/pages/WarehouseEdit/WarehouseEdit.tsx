import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { WarehouseProfile } from "../../types/types";
import axios from "axios";

export default function WarehouseEdit(): ReactElement {
  const [warehouseDetails, setWarehouseDetails] = useState<WarehouseProfile>();
  const { warehouseID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouses/${warehouseID}`)
      .then((response) => {
        setWarehouseDetails(response.data);
      });
  }, [warehouseID]);

  // need ref type
  const formRef: any = useRef(null);

  const handleClick = () => {
    // need form type
    const form = formRef.current;
    const warehouseInfo: WarehouseProfile = {
      id: warehouseID,
      name: form.name.value,
      address: form.address.value,
      city: form.city.value,
      country: form.country.value,
      contact: {
        name: form.contactName.value,
        position: form.contactPosition.value,
        phone: form.contactPhoneNumber.value,
        email: form.contactEmailAddress.value,
      },
    };
    console.log(warehouseInfo);
    axios
      .put(`http://localhost:8080/warehouses/${warehouseID}`, warehouseInfo)
      .then(() => {
        navigate(`/warehouse/${warehouseID}`);
      });
  };

  if (!warehouseDetails) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <Link to={`/warehouse/${warehouseDetails.id}`}>Back</Link>
        <h1>Edit Warehouse</h1>
      </div>
      <form ref={formRef}>
        <h2>Warehouse Details</h2>
        <label>Warehouse Name</label>
        <input defaultValue={warehouseDetails.name} name="name" />
        <label>Street Address</label>
        <input defaultValue={warehouseDetails.address} name="address" />
        <label>City</label>
        <input defaultValue={warehouseDetails.city} name="city" />
        <label>Country</label>
        <input defaultValue={warehouseDetails.country} name="country" />
        <h2>Contact Details</h2>
        <label>Contact Name</label>
        <input
          defaultValue={warehouseDetails.contact.name}
          name="contactName"
        />
        <label>Position</label>
        <input
          defaultValue={warehouseDetails.contact.position}
          name="contactPosition"
        />
        <label>Phone Number</label>
        <input
          defaultValue={warehouseDetails.contact.phone}
          name="contactPhoneNumber"
        />
        <label>Email</label>
        <input
          defaultValue={warehouseDetails.contact.email}
          name="contactEmailAddress"
        />
        <Link to={`/warehouse/${warehouseDetails.id}`}>Cancel</Link>
        <button type="button" onClick={handleClick}>
          Save
        </button>
      </form>
    </>
  );
}
