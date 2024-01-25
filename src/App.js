import "./App.css";
import { useState } from "react";
import Player from "./components/Plyers";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATION } from "./components/winning-combination";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BORAD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBored = [...INITIAL_GAME_BORAD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBored[row][col] = player;
  }
  return gameBored;
}

function deriveWinner(gameBored, players) {
  let winner;

  for (const combination of WINNING_COMBINATION) {
    const firstSquareSymbol =
      gameBored[combination[0].row][combination[0].column];
    const seondSquareSymbol =
      gameBored[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBored[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === seondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBored = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBored, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerNmaechange(symbol, newNmae) {
    setPlayers((precPlayers) => {
      return {
        ...precPlayers,
        [symbol]: newNmae,
      };
    });
  }
  return (
    <main>
      <div id="header">Tic-Tac-Toe</div>
      <div id="game-wrapper">
        <div id="game-container">
          <ol id="players" className="highlight-plyaer">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNmaechange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNmaechange}
            />
          </ol>
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBored} />
        </div>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
