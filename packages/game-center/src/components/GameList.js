import React, { useEffect, useState } from "react";
import { fetchGames } from "../api";

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  return (
    <div>
      <h2>Oyun Listesi</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name} - {game.players} oyuncu</li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
