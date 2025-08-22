import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Navbar from "./components/Navbar";
import Editions from "./pages/Editions";
import EditionDetails from "./pages/EditionDetails";
import CreateEdition from "./pages/CreateEdition";
import EditEdition from "./pages/EditEdition";

function App() {
  return (
    <Router>
      <Navbar
        tabs={[
          { label: "Editions", path: "/editions" },
          { label: "Create Edition", path: "/create" },
        ]}
      />
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/editions" />} />
        <Route path="/editions" element={<Editions />} />
        <Route path="/editions/:id" element={<EditionDetails />} />
        <Route path="/create" element={<CreateEdition />} />
        <Route path="/editions/edit/:id" element={<EditEdition />} />
      </Routes>
    </Router>
  );
}

export default App;
