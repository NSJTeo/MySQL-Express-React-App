import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    console.log("use effect");
    axios.get("http://localhost:8080/warehouses").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <div>Search Bar</div>
      <div>
        <ul>
          {warehouses.map((warehouse) => {
            return <div></div>;
          })}
        </ul>
      </div>
    </>
  );
}
