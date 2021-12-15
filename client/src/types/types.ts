export type WarehouseProfile = {
  id?: string;
  name: string;
  address: string;
  city: string;
  country: string;
  contactName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
};

export type InventoryItemInfo = {
  id?: string;
  warehouseID?: string;
  warehouseName?: string;
  name: string;
  description: string;
  category: string;
  status: string;
  quantity: number;
};
