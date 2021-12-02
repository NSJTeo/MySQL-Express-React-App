import React, { ReactElement, useState, useEffect } from "react";
import { WarehouseProfile, InventoryItem } from "../../types/types";
import { useParams, useNavigate, Link } from "react-router-dom";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import axios from "axios";

export default function Warehouse(): ReactElement {
  const [warehouse, setWarehouse] = useState<WarehouseProfile>();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
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

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  if (!warehouse) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <button onClick={handleBack}>Back</button>
        <h1>{warehouse!.name}</h1>
        <Link to={`/warehouse/${warehouseID}/edit`}>Edit</Link>
      </div>
      <div>
        <div>
          <p>WAREHOUSE ADDRESS:</p>
          <p>{warehouse.address}</p>
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
      <WarehouseInventoryList inventoryItems={inventoryItems} />
    </>
  );
}
