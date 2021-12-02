import { BrowserRouter, Routes, Route } from "react-router-dom";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import Warehouse from "./pages/Warehouse/Warehouse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:warehouseID" element={<Warehouse />} />
        <Route path="/" element={<WarehouseList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
