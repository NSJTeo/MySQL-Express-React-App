import { BrowserRouter, Routes, Route } from "react-router-dom";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import Warehouse from "./pages/Warehouse/Warehouse";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";
import WarehouseAdd from "./pages/WarehouseAdd/WarehouseAdd";
import InventoryList from "./pages/InventoryList/InventoryList";
import InventoryItemAdd from "./pages/InventoryItemAdd/InventoryItemAdd";
import InventoryItem from "./pages/InventoryItem/InventoryItem";
import InventoryItemEdit from "./pages/InventoryItemEdit/InventoryItemEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/warehouse/:warehouseID/edit"
          element={<WarehouseEdit />}
        />
        <Route path="/warehouse/add" element={<WarehouseAdd />} />
        <Route path="/warehouse/:warehouseID" element={<Warehouse />} />
        <Route path="/inventory/:inventoryItemID" element={<InventoryItem />} />
        <Route
          path="/inventory/:inventoryItemID/edit"
          element={<InventoryItemEdit />}
        />
        <Route path="/inventory/add" element={<InventoryItemAdd />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/" element={<WarehouseList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
