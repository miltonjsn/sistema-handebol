import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTextSize } from "../GlobalState"; // importa o hook do contexto

const Home = () => {
  const { textSize, increaseTextSize, decreaseTextSize } = useTextSize(); // usa o contexto

  // Testar conexão com backend
  useEffect(() => {
    fetch("http://localhost:3001/api/test")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Erro ao conectar com a API:", err));
  }, []);

  const textStyle = {
    fontSize:
      textSize === "small" ? "14px" :
      textSize === "large" ? "22px" : "18px"
  };

  return (
    <div style={textStyle}>
      <h1>Bem-vindo ao Sistema de Estatísticas de Handebol</h1>
      <p>Acompanhe as estatísticas dos jogos e desempenhos da equipe.</p>

      <Link to="/statistics">
        <button>Ver Estatísticas</button>
      </Link>

      <br /><br />

      <Link to="/register">
        <button>Cadastrar Novo Jogo</button>
      </Link>

      <br /><br />

      <div>
        <button onClick={increaseTextSize}>Aumentar Texto</button>
        <button onClick={decreaseTextSize}>Diminuir Texto</button>
      </div>
    </div>
  );
};

export default Home;
