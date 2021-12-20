import { useState, useEffect, ReactElement } from "react";
import axios from "axios";
import WarehouseListItem from "../../components/WarehouseListItem/WarehouseListItem";
import WarehouseListSearchBar from "../../components/WarehouseListSearchBar/WarehouseListSearchBar";
import "./WarehouseList.scss";
import { WarehouseProfile } from "../../types/types";
import sortIcon from "../../assets/icons/sort-24px.svg";

export default function WarehouseList(): ReactElement {
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/warehouses").then((response) => {
      setWarehouses(response.data);
    });
  }, []);

  const handleDelete = (warehouseID: string): void => {
    axios.delete(`http://localhost:8080/warehouses/${warehouseID}`).then(() => {
      axios.get("http://localhost:8080/warehouses").then((response) => {
        setWarehouses(response.data);
      });
    });
  };

  return (
    <div className="warehouse-list__container">
      <WarehouseListSearchBar />
      <div className="warehouse-list__headers">
        <div className="warehouse-list__warehouse-address-header-container">
          <div className="warehouse-list__header-container warehouse-list__header-container--warehouse">
            <h2 className="warehouse-list__header">WAREHOUSE</h2>
            <img src={sortIcon} alt="" className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__header-container warehouse-list__header-container--address">
            <h2 className="warehouse-list__header">ADDRESS</h2>
            <img src={sortIcon} alt="" className="warehouse-list__sort-icon" />
          </div>
        </div>
        <div className="warehouse-list__contact-header-container">
          <div className="warehouse-list__header-container">
            <h2 className="warehouse-list__header">CONTACT NAME</h2>
            <img src={sortIcon} alt="" className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__header-container">
            <h2 className="warehouse-list__header">CONTACT INFORMATION</h2>
            <img src={sortIcon} alt="" className="warehouse-list__sort-icon" />
          </div>
        </div>
        <div className="warehouse-list__header-container warehouse-list__header-container--actions">
          <h2 className="warehouse-list__header warehouse-list__header--actions">
            ACTIONS
          </h2>
        </div>
      </div>
      <ul>
        {warehouses.map((warehouse: WarehouseProfile) => {
          return (
            <WarehouseListItem
              key={warehouse.id}
              warehouse={warehouse}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}
