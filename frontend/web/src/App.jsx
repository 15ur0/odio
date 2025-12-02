import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Turmas from "./pages/Turmas";
import AtividadeUpload from "./pages/AtividadeUpload";
import Professor from "./pages/Professor";
import Aluno from "./pages/Aluno";

function App() {
  const user = JSON.parse(localStorage.getItem("pim_user") || "null");
  const isAuthenticated = !!user;

  return (
    <div>
      <header style={{padding:10,background:"#0b5",color:"#fff"}}>PIM - Sistema Acadêmico</header>
      <main style={{padding:20}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuthenticated ? (user.role==="professor" ? <Professor/> : <Aluno/>) : <Navigate to="/login" />} />
          <Route path="/professor" element={isAuthenticated && user.role==="professor" ? <Professor/> : <Navigate to="/login" />} />
          <Route path="/aluno" element={isAuthenticated && user.role==="aluno" ? <Aluno/> : <Navigate to="/login" />} />
          <Route path="/turmas" element={isAuthenticated ? <Turmas /> : <Navigate to="/login" />} />
          <Route path="/upload" element={isAuthenticated ? <AtividadeUpload /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
