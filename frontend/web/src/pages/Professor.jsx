import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "pim_materias";

function calcMedia(np1, np2, pim) {
  const n1 = parseFloat(np1) || 0;
  const n2 = parseFloat(np2) || 0;
  const p = parseFloat(pim) || 0;
  return (n1 * 0.4 + n2 * 0.4 + p * 0.2).toFixed(2);
}

export default function Professor() {
  const nav = useNavigate();
  const [materia, setMateria] = useState("");
  const [np1, setNp1] = useState("");
  const [np2, setNp2] = useState("");
  const [pim, setPim] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setLista(saved);
  }, []);

  function salvar() {
    if (!materia.trim()) return alert("Informe a matéria");
    const media = calcMedia(np1, np2, pim);
    const novo = { id: Date.now(), materia: materia.trim(), np1, np2, pim, media };
    const updated = [novo, ...lista];
    setLista(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMateria(""); setNp1(""); setNp2(""); setPim("");
  }

  function logout() {
    localStorage.removeItem("pim_user");
    nav("/login");
  }

  return (
    <div style={{padding:20}}>
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2>Painel do Professor</h2>
        <div>
          <button onClick={logout}>Sair</button>
        </div>
      </header>

      <section style={{marginTop:16, maxWidth:600}}>
        <h3>Registrar nota</h3>
        <input placeholder="Matéria" value={materia} onChange={e=>setMateria(e.target.value)} />
        <input placeholder="NP1 (0-100)" value={np1} onChange={e=>setNp1(e.target.value)} />
        <input placeholder="NP2 (0-100)" value={np2} onChange={e=>setNp2(e.target.value)} />
        <input placeholder="PIM (0-100)" value={pim} onChange={e=>setPim(e.target.value)} />
        <div style={{marginTop:8}}>
          <strong>Média atual: </strong>{calcMedia(np1, np2, pim)}
        </div>
        <button style={{marginTop:8}} onClick={salvar}>Salvar matéria e notas</button>
      </section>

      <section style={{marginTop:24}}>
        <h3>Matérias cadastradas</h3>
        {lista.length === 0 ? <p>Nenhuma matéria cadastrada.</p> :
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
