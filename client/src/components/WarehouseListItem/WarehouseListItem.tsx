import React, { ReactElement } from "react";

// {
//   "id": "2922c286-16cd-4d43-ab98-c79f698aeab0",
//   "name": "Manhattan",
//   "address": "503 Broadway",
//   "city": "New York",
//   "country": "USA",
//   "contact": {
//     "name": "Parmin Aujla",
//     "position": "Warehouse Manager",
//     "phone": "+1 (646) 123-1234",
//     "email": "paujla@instock.com"
//   }

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
