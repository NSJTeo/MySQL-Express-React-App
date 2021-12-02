import React, { ReactElement } from "react";
import { WarehouseProfile } from "../../types/types";
import { Link } from "react-router-dom";

interface Props {
  warehouse: WarehouseProfile;
}

export default function WarehouseListItem({ warehouse }: Props): ReactElement {
  return (
    <li>
      <Link to={`/warehouse/${warehouse.id}`}>{warehouse.name}</Link>
      <Link to={`/warehouse/${warehouse.id}/edit`}>Edit</Link>
    </li>
  );
}
