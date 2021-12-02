import { BrowserRouter, Routes, Route } from "react-router-dom";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import Warehouse from "./pages/Warehouse/Warehouse";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/warehouse/:warehouseID/edit"
          element={<WarehouseEdit />}
        />
        <Route path="/warehouse/:warehouseID" element={<Warehouse />} />
        <Route path="/" element={<WarehouseList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
