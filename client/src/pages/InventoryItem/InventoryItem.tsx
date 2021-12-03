import { ReactElement, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { InventoryItemInfo } from "../../types/types";
import axios from "axios";

export default function InventoryItem(): ReactElement {
  const [inventoryItem, setInventoryItem] = useState<InventoryItemInfo>();
  const { inventoryItemID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventory/${inventoryItemID}`)
      .then((response) => {
        console.log(response.data);
        setInventoryItem(response.data);
      });
  }, []);

  if (!inventoryItem) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <Link to="/inventory">Back</Link>
        <h1>{inventoryItem.itemName}</h1>
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
        <p>{inventoryItem.warehouseName}</p>
      </div>
    </>
  );
}
