export const fetchGames = async () => {
    const res = await fetch("http://localhost:5000/api/games");
    return res.json();
  };
  