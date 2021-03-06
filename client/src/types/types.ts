// note that id's are created in the server so might not be present when warehouses or items are created on the client

export interface WarehouseProfile {
  id?: string;
  name: string;
  address: string;
  city: string;
  country: string;
  contactName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
}

export interface InventoryItemInfo {
  id?: string;
  warehouseID: string;
  name: string;
  description: string;
  category: string;
  status: string;
  quantity: number;
}
