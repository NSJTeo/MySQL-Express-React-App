import axios from "axios";
import React, { ReactElement, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { WarehouseProfile } from "../../types/types";
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import "./WarehouseAdd.scss";

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
    <div className="warehouse-add__background">
      <div className="warehouse-add__container">
        <div className="warehouse-add__back-title-container">
          <Link to="/">
            <img src={backIcon} alt="" />
          </Link>
          <h1 className="warehouse-add__title">Add New Warehouse</h1>
        </div>
        <form ref={formRef}>
          <div className="warehouse-add__form-containers">
            <div className="warehouse-add__form-container warehouse-add__form-container--left">
              <h2 className="warehouse-add__form-header">Warehouse Details</h2>
              <label className="warehouse-add__form-label">
                Warehouse Name
              </label>
              <input
                name="name"
                className="warehouse-add__form-input"
                placeholder="Warehouse Name"
              />
              <label className="warehouse-add__form-label">
                Street Address
              </label>
              <input
                name="address"
                className="warehouse-add__form-input"
                placeholder="Street Address"
              />
              <label className="warehouse-add__form-label">City</label>
              <input
                name="city"
                className="warehouse-add__form-input"
                placeholder="City"
              />
              <label className="warehouse-add__form-label">Country</label>
              <input
                name="country"
                className="warehouse-add__form-input"
                placeholder="Country"
              />
            </div>
            <div className="warehouse-add__form-container">
              <h2 className="warehouse-add__form-header">Contact Details</h2>
              <label className="warehouse-add__form-label">Contact Name</label>
              <input
                name="contactName"
                className="warehouse-add__form-input"
                placeholder="Contact Name"
              />
              <label className="warehouse-add__form-label">Position</label>
              <input
                name="contactPosition"
                className="warehouse-add__form-input"
                placeholder="Position"
              />
              <label className="warehouse-add__form-label">Phone Number</label>
              <input
                name="contactPhone"
                className="warehouse-add__form-input"
                placeholder="Phone Number"
              />
              <label className="warehouse-add__form-label">Email</label>
              <input
                name="contactEmail"
                className="warehouse-add__form-input"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="warehouse-add__btns">
            <Link
              to="/"
              className="warehouse-add__btn warehouse-add__btn--cancel"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleClick}
              className="warehouse-add__btn warehouse-add__btn--save"
            >
              + Add New Warehouse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
