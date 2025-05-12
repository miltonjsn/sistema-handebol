const express = require("express");
const cors = require("cors"); // Adicionando CORS
const app = express();
const PORT = 3001;

app.use(cors()); // Habilitando CORS
app.use(express.json());

// Inicializando com 5 partidas
let games = [
  {
    id: 1,
    date: "2025-05-01",
    time: "15:00",
    opponent: "Campinas",
    location: "Ginásio de Sorocaba",
    competition: "Campeonato Paulista",
    score: { team1: 25, team2: 21 },
  },
  {
    id: 2,
    date: "2025-05-03",
    time: "16:00",
    opponent: "Jundiaí",
    location: "Ginásio de Sorocaba",
    competition: "Campeonato Paulista",
    score: { team1: 22, team2: 22 },
  },
  {
    id: 3,
    date: "2025-05-05",
    time: "14:30",
    opponent: "Itu",
    location: "Ginásio de Itu",
    competition: "Campeonato Paulista",
    score: { team1: 30, team2: 18 },
  },
  {
    id: 4,
    date: "2025-05-07",
    time: "17:00",
    opponent: "Bragança Paulista",
    location: "Ginásio de Sorocaba",
    competition: "Campeonato Paulista",
    score: { team1: 20, team2: 25 },
  },
  {
    id: 5,
    date: "2025-05-09",
    time: "18:00",
    opponent: "São João da Boa Vista",
    location: "Ginásio de São João da Boa Vista",
    competition: "Campeonato Paulista",
    score: { team1: 28, team2: 22 },
  },
];

// Rota para cadastrar o jogo
app.post("/api/jogos", (req, res) => {
  const { date, time, opponent, location, competition, score } = req.body;

  const game = {
    id: games.length + 1, // Gerando um ID único para o jogo
    date,
    time,
    opponent,
    location,
    competition,
    score,
  };

  games.push(game); // Adiciona o jogo no array games
  console.log("Jogo registrado:", game);
  res.status(201).json({ message: "Jogo registrado com sucesso!", dados: game });
});

// Rota para obter as estatísticas
app.get("/api/statistics", (req, res) => {
  const stats = {
    totalGames: games.length,
    totalGoals: games.reduce((sum, game) => sum + game.score.team1, 0),
    totalConceded: games.reduce((sum, game) => sum + game.score.team2, 0),
    games: games,
  };

  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
