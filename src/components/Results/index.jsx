import React from "react";
import "./style.css";
import { groupBy } from "ramda";
import { Link } from "react-router-dom";

const Results = () => {
  const gamesString = localStorage.getItem("players");
  const games = JSON.parse(gamesString === null ? "[]" : gamesString);

  const gamesByTime = groupBy((game) => game.time, games);

  //   const byGameLength = groupBy(function (game) {
  //     return game.time;
  //   });
  //   const gamesByTime = byGameLength(games);
  return (
    <div className="results">
      <div className="stage_links">
        <Link to="/">Úvodní strana</Link>
        <Link to="/trenink">Procvičování</Link>
        <Link to="/datlovani">Hra s časovým cílem</Link>
      </div>

      <h1>Výsledky</h1>

      {!games.length ? (
        <div className="no_player">V SEZNAMU NENÍ ULOŽEN ŽÁDNÝ HRÁČ</div>
      ) : ( 
        Object.entries(gamesByTime).map(([key, value]) => {
          return (
            <ul className="result_list" key={key}>
              <div className="time">{key} sekund</div>
              {value
                .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
                .map((player, index) => (
                  <div key={index} className="player">
                    <li className="player_li">Hráč: <strong>{player.name}</strong></li>
                    <li className="score_li">Počet správných slov: <strong>{player.score}</strong></li>
                  </div>
                ))}
              {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
            </ul>
          );
        })
      )}
    </div>
  );
};

export default Results;
