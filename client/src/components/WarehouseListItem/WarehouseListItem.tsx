import React, { ReactElement } from "react";
import { WarehouseProfile } from "../../types/types";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

interface Props {
  warehouse: WarehouseProfile;
  handleDelete: Function;
}

export default function WarehouseListItem({
  warehouse,
  handleDelete,
}: Props): ReactElement {
  const handleClick = (): void => {
    handleDelete(warehouse.id);
  };

  return (
    <li>
      <Link to={`/warehouse/${warehouse.id}`}>{warehouse.name}</Link>
      <button onClick={handleClick}>
        <img src={deleteIcon} alt="delete icon" />
      </button>
      <Link to={`/warehouse/${warehouse.id}/edit`}>Edit</Link>
    </li>
  );
}
