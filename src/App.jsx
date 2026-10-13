import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";
import Fonctionnalites from "./pages/Fonctionnalites";
import Transport from "./pages/Transport";
import Commander from "./pages/Commander";
import Commentaires from "./pages/Commentaires";
import Profil from "./pages/Profil";
import AccueilPublic from "./pages/AccueilPublic";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";

function EspaceClient() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route index element={<Accueil />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="fonctionnalites" element={<Fonctionnalites />} />
          <Route path="transport" element={<Transport />} />
          <Route path="commander" element={<Commander />} />
          <Route path="commentaires" element={<Commentaires />} />
          <Route path="profil" element={<Profil />} />
          <Route path="*" element={<Navigate to="/espace-client" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AccueilPublic />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/espace-client/*" element={<EspaceClient />} />
      <Route path="/a-propos" element={<Navigate to="/espace-client/a-propos" replace />} />
      <Route path="/fonctionnalites" element={<Navigate to="/espace-client/fonctionnalites" replace />} />
      <Route path="/transport" element={<Navigate to="/espace-client/transport" replace />} />
      <Route path="/commander" element={<Navigate to="/espace-client/commander" replace />} />
      <Route path="/commentaires" element={<Navigate to="/espace-client/commentaires" replace />} />
      <Route path="/profil" element={<Navigate to="/espace-client/profil" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
