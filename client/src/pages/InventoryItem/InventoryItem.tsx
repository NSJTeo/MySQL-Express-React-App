import { ReactElement, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { InventoryItemInfo, WarehouseProfile } from "../../types/types";
import axios from "axios";

export default function InventoryItem(): ReactElement {
  const [inventoryItem, setInventoryItem] = useState<InventoryItemInfo>();
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);
  const { inventoryItemID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventory/${inventoryItemID}`)
      .then((response) => {
        setInventoryItem(response.data);
        axios.get(`http://localhost:8080/warehouses`).then((response) => {
          setWarehouses(response.data);
        });
      });
  }, [inventoryItemID]);

  if (!inventoryItem) {
    return <p>Loading</p>;
  }

  const itemWarehouse = warehouses.find(
    (warehouse) => warehouse.id === inventoryItem.warehouseID
  );

  if (!itemWarehouse) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <Link to="/inventory">Back</Link>
        <h1>{inventoryItem.name}</h1>
        <Link to={`/inventory/${inventoryItem.id}/edit`}>Edit</Link>
      </div>
      <div>
        <p>ITEM DESCRIPTION:</p>
        <p>{inventoryItem.description}</p>
        <p>CATEGORY:</p>
        <p>{inventoryItem.category}</p>
        <p>STATUS:</p>
        <p>{inventoryItem.status}</p>
        <p>QUANTITY:</p>
        <p>{inventoryItem.quantity}</p>
        <p>WAREHOUSE:</p>
        <p>{itemWarehouse.name}</p>
      </div>
    </>
  );
}
