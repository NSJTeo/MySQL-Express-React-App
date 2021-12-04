import { useState, useEffect, ReactElement } from "react";
import axios from "axios";
import WarehouseListItem from "../../components/WarehouseListItem/WarehouseListItem";
import WarehouseListSearchBar from "../../components/WarehouseListSearchBar/WarehouseListSearchBar";
import { WarehouseProfile } from "../../types/types";

export default function WarehouseList(): ReactElement {
  const [warehouses, setWarehouses] = useState<WarehouseProfile[]>([]);

  useEffect(() => {
    console.log("use effect");
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
    <>
      <WarehouseListSearchBar />
      <div>
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
    </>
  );
}
