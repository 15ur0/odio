import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import Logo from "../assets/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("aluno"); // "aluno" ou "professor"
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("pim_user", JSON.stringify({ email, role }));
    if (role === "professor") nav("/professor");
    else nav("/aluno");
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={Logo} alt="logo" className="login-logo" />
        <h1 className="login-title">SISTEMA ACADÉMICO COLABORATIVO</h1>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label">Endereço de e mail</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label className="label">Senha</label>
          <input
            className="input"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />

          <div style={{marginTop:12}}>
            <label style={{marginRight:8}}>Entrar como:</label>
            <label style={{marginRight:8}}>
              <input type="radio" name="role" value="aluno" checked={role==="aluno"} onChange={()=>setRole("aluno")} /> Aluno
            </label>
            <label>
              <input type="radio" name="role" value="professor" checked={role==="professor"} onChange={()=>setRole("professor")} /> Professor
            </label>
          </div>

          <button className="btn-primary" type="submit" style={{marginTop:16}}>Entrar</button>

          <a className="forgot-link" href="#forgot">Esqueceu sua senha?</a>
        </form>
      </div>
    </div>
  );
}
