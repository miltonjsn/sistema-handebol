import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useTextSize } from "../GlobalState"; // importa o contexto

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [results, setResults] = useState({ vitórias: 0, empates: 0, derrotas: 0 });

  const { textSize, increaseTextSize, decreaseTextSize } = useTextSize(); // usa o contexto

  const textStyle = {
    fontSize:
      textSize === "small" ? "14px" :
      textSize === "large" ? "22px" : "18px"
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/statistics");
        setStats(response.data);

        const contagem = { vitórias: 0, empates: 0, derrotas: 0 };
        response.data.games.forEach((game) => {
          if (game.score.team1 > game.score.team2) contagem.vitórias++;
          else if (game.score.team1 < game.score.team2) contagem.derrotas++;
          else contagem.empates++;
        });
        setResults(contagem);
      } catch (error) {
        console.error("Erro ao buscar estatísticas", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div style={textStyle}>Carregando estatísticas...</div>;

  const barData = stats.games.map((game) => ({
    name: game.opponent,
    Marcados: game.score.team1,
    Sofridos: game.score.team2,
  }));

  const pieData = [
    { name: "Vitórias", value: results.vitórias },
    { name: "Empates", value: results.empates },
    { name: "Derrotas", value: results.derrotas },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

  return (
    <div style={{ padding: "2rem", ...textStyle }}>
      <h1>Estatísticas da Equipe</h1>

      <div style={{ marginBottom: "1rem" }}>
        <p><strong>Total de Jogos:</strong> {stats.totalGames}</p>
        <p><strong>Total de Gols Marcados:</strong> {stats.totalGoals}</p>
        <p><strong>Total de Gols Sofridos:</strong> {stats.totalConceded}</p>
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 400px", height: 300 }}>
          <h2>Gols por Jogo</h2>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Marcados" fill="#4CAF50" />
              <Bar dataKey="Sofridos" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: "1 1 300px", height: 300 }}>
          <h2>Resultados</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Tabela de Jogos</h2>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Adversário</th>
              <th>Local</th>
              <th>Competição</th>
              <th>Gols Marcados</th>
              <th>Gols Sofridos</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {stats.games.map((game) => {
              const resultado =
                game.score.team1 > game.score.team2
                  ? "Vitória"
                  : game.score.team1 < game.score.team2
                  ? "Derrota"
                  : "Empate";
              return (
                <tr key={game.id}>
                  <td>{game.date}</td>
                  <td>{game.time}</td>
                  <td>{game.opponent}</td>
                  <td>{game.location}</td>
                  <td>{game.competition}</td>
                  <td>{game.score.team1}</td>
                  <td>{game.score.team2}</td>
                  <td>{resultado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <br />
      <div>
        <button onClick={increaseTextSize}>Aumentar Texto</button>
        <button onClick={decreaseTextSize}>Diminuir Texto</button>
      </div>
    </div>
  );
};

export default Statistics;
