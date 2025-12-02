import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "pim_materias";

export default function Aluno() {
  const nav = useNavigate();
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setLista(saved);
  }, []);

  function logout() {
    localStorage.removeItem("pim_user");
    nav("/login");
  }

  return (
    <div style={{padding:20}}>
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2>Painel do Aluno</h2>
        <div>
          <button onClick={logout}>Sair</button>
        </div>
      </header>

      <section style={{marginTop:16}}>
        <h3>Minhas matérias e notas</h3>
        {lista.length === 0 ? <p>Sem notas registradas.</p> :
          <table border="1" cellPadding="8">
            <thead>
              <tr><th>Matéria</th><th>NP1</th><th>NP2</th><th>PIM</th><th>Média</th></tr>
            </thead>
            <tbody>
              {lista.map(item => (
                <tr key={item.id}>
                  <td>{item.materia}</td>
                  <td>{item.np1}</td>
                  <td>{item.np2}</td>
                  <td>{item.pim}</td>
                  <td>{item.media}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </section>
    </div>
  );
}
