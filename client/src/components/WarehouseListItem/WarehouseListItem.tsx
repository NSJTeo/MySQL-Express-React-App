import React, { ReactElement } from "react";

type Contact = {
  name: string;
  position: string;
  phone: string;
  email: string;
};

export type Warehouse = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  contact: Contact;
};

interface Props {
  warehouse: Warehouse;
}

export default function WarehouseListItem({ warehouse }: Props): ReactElement {
  return <li>{warehouse.name}</li>;
}
