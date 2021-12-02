import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseListItem, {
  Warehouse,
} from "../../components/WarehouseListItem/WarehouseListItem";
import WarehouseListSearchBar from "../../components/WarehouseListSearchBar/WarehouseListSearchBar";

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    console.log("use effect");
    axios.get("http://localhost:8080/warehouses").then((response) => {
      setWarehouses(response.data);
    });
  }, []);

  return (
    <>
      <WarehouseListSearchBar />
      <div>
        <ul>
          {warehouses.map((warehouse) => {
            return (
              <WarehouseListItem key={warehouse.id} warehouse={warehouse} />
            );
          })}
        </ul>
      </div>
    </>
  );
}
