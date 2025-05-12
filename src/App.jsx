import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import RegisterGame from './pages/RegisterGame';
import { GlobalState } from './GlobalState'; // agora com .jsx no nome do arquivo

function App() {
  return (
    <GlobalState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/register" element={<RegisterGame />} />
        </Routes>
      </Router>
    </GlobalState>
  );
}

export default App;
