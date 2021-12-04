import React, { ReactElement, useState, useEffect } from "react";
import { WarehouseProfile, InventoryItemInfo } from "../../types/types";
import { useParams, Link } from "react-router-dom";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import axios from "axios";

export default function Warehouse(): ReactElement {
  const [warehouse, setWarehouse] = useState<WarehouseProfile>();
  const [inventoryItems, setInventoryItems] = useState<InventoryItemInfo[]>([]);
  const { warehouseID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouses/${warehouseID}`)
      .then((response) => {
        setWarehouse(response.data);
      })
      .then(() => {
        axios
          .get(`http://localhost:8080/warehouses/${warehouseID}/inventory`)
          .then((response) => {
            setInventoryItems(response.data);
          });
      });
  }, [warehouseID]);

  if (!warehouse) {
    return <p>Loading</p>;
  }

  const handleDelete = (inventoryItemID: string) => {
    axios
      .delete(`http://localhost:8080/inventory/${inventoryItemID}`)
      .then((response) => {
        axios
          .get(`http://localhost:8080/warehouses/${warehouseID}/inventory`)
          .then((response) => {
            setInventoryItems(response.data);
          });
      });
  };

  return (
    <>
      <div>
        <Link to="/">Back</Link>
        <h1>{warehouse!.name}</h1>
        <Link to={`/warehouse/${warehouseID}/edit`}>Edit</Link>
      </div>
      <div>
        <div>
          <p>WAREHOUSE ADDRESS:</p>
          <p>
            {warehouse.address}, {warehouse.city}, {warehouse.country}
          </p>
        </div>
        <div>
          <p>CONTACT NAME:</p>
          <p>{warehouse.contact.name}</p>
          <p>{warehouse.contact.position}</p>
        </div>
        <div>
          <p>CONTACT INFORMATION:</p>
          <p>{warehouse.contact.phone}</p>
          <p>{warehouse.contact.email}</p>
        </div>
      </div>
      <WarehouseInventoryList
        inventoryItems={inventoryItems}
        handleDelete={handleDelete}
      />
    </>
  );
}
