import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTextSize } from "../GlobalState"; // importa o contexto

const RegisterGame = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [opponent, setOpponent] = useState("");
  const [location, setLocation] = useState("");
  const [competition, setCompetition] = useState("");
  const [goalsFor, setGoalsFor] = useState("");
  const [goalsAgainst, setGoalsAgainst] = useState("");
  const navigate = useNavigate();

  const { textSize, increaseTextSize, decreaseTextSize } = useTextSize(); // usa o contexto

  const textStyle = {
    fontSize:
      textSize === "small" ? "14px" :
      textSize === "large" ? "22px" : "18px"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3001/api/jogos", {
        date,
        time,
        opponent,
        location,
        competition,
        score: {
          team1: parseInt(goalsFor),
          team2: parseInt(goalsAgainst),
        },
      });
      console.log(response.data);
      navigate("/statistics");
    } catch (error) {
      console.error("Erro ao registrar o jogo", error);
    }
  };

  return (
    <div style={textStyle}>
      <h1>Registrar Novo Jogo</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Data:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Hora:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div>
          <label>Adversário:</label>
          <input type="text" value={opponent} onChange={(e) => setOpponent(e.target.value)} />
        </div>
        <div>
          <label>Local:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label>Competição:</label>
          <input type="text" value={competition} onChange={(e) => setCompetition(e.target.value)} />
        </div>
        <div>
          <label>Gols Marcados:</label>
          <input type="number" value={goalsFor} onChange={(e) => setGoalsFor(e.target.value)} />
        </div>
        <div>
          <label>Gols Sofridos:</label>
          <input type="number" value={goalsAgainst} onChange={(e) => setGoalsAgainst(e.target.value)} />
        </div>
        <button type="submit">Registrar Jogo</button>
      </form>

      <br />
      <div>
        <button onClick={increaseTextSize}>Aumentar Texto</button>
        <button onClick={decreaseTextSize}>Diminuir Texto</button>
      </div>
    </div>
  );
};

export default RegisterGame;
