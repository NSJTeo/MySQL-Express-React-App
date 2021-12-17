import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { WarehouseProfile } from "../../types/types";
import axios from "axios";
import "./WarehouseEdit.scss";
import backIcon from "../../assets/icons/arrow_back-24px.svg";

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

  const handleClick = (): void => {
    // need form type
    const form = formRef.current;
    const warehouseInfo: WarehouseProfile = {
      id: warehouseID,
      name: form.name.value,
      address: form.address.value,
      city: form.city.value,
      country: form.country.value,
      contactName: form.contactName.value,
      contactPosition: form.contactPosition.value,
      contactPhone: form.contactPhone.value,
      contactEmail: form.contactEmail.value,
    };

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
    <div className="warehouse-edit__container">
      <div className="warehouse-edit__back-title-container">
        <Link to={`/warehouse/${warehouseDetails.id}`}>
          <img src={backIcon} alt="" />
        </Link>
        <h1 className="warehouse-edit__title">Edit Warehouse</h1>
      </div>
      <form ref={formRef}>
        <div className="warehouse-edit__form-container">
          <h2 className="warehouse-edit__form-header">Warehouse Details</h2>
          <label className="warehouse-edit__form-label">Warehouse Name</label>
          <input
            defaultValue={warehouseDetails.name}
            name="name"
            className="warehouse-edit__form-input"
          />
          <label className="warehouse-edit__form-label">Street Address</label>
          <input
            defaultValue={warehouseDetails.address}
            name="address"
            className="warehouse-edit__form-input"
          />
          <label className="warehouse-edit__form-label">City</label>
          <input
            defaultValue={warehouseDetails.city}
            name="city"
            className="warehouse-edit__form-input"
          />
          <label className="warehouse-edit__form-label">Country</label>
          <input
            defaultValue={warehouseDetails.country}
            name="country"
            className="warehouse-edit__form-input"
          />
        </div>
        <div className="warehouse-edit__form-container">
          <h2 className="warehouse-edit__form-header">Contact Details</h2>
          <label className="warehouse-edit__form-label">Contact Name</label>
          <input
            defaultValue={warehouseDetails.contactName}
            name="contactName"
            className="warehouse-edit__form-input"
          />
          <label className="warehouse-edit__form-label">Position</label>
          <input
            defaultValue={warehouseDetails.contactPosition}
            name="contactPosition"
            className="warehouse-edit__form-input"
          />
          <label className="warehouse-edit__form-label">Phone Number</label>
          <input
            defaultValue={warehouseDetails.contactPhone}
            name="contactPhone"
            className="warehouse-edit__form-input"
          />
          <label className="warehouse-edit__form-label">Email</label>
          <input
            defaultValue={warehouseDetails.contactEmail}
            name="contactEmail"
            className="warehouse-edit__form-input"
          />
        </div>
        <div className="warehouse-edit__btns">
          <Link
            to={`/warehouse/${warehouseDetails.id}`}
            className="warehouse-edit__btn warehouse-edit__btn--cancel"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleClick}
            className="warehouse-edit__btn warehouse-edit__btn--save"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
