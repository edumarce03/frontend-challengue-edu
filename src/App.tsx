import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Planes } from "./pages/Planes";
import { Resumen } from "./pages/Resumen";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Ruta principal - Landing/Home */}
        <Route path="/" element={<Home />} />

        {/* Ruta de planes */}
        <Route path="/planes" element={<Planes />} />

        {/* Ruta de resumen */}
        <Route path="/resumen" element={<Resumen />} />

        {/* Redirección de rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
