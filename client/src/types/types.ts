type Contact = {
  name: string;
  position: string;
  phone: string;
  email: string;
};

export type WarehouseProfile = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  contact: Contact;
};

export type InventoryItemInfo = {
  id?: string;
  warehouseID: string;
  warehouseName: string;
  itemName: string;
  description: string;
  category: string;
  status: string;
  quantity: number;
};
