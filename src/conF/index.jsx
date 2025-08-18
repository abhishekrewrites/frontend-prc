import { useState } from "react";

const ROWS = 9;
const COLS = 9;
const CONNECT = 4;

const P1 = 1;
const P2 = 2;

function emptyBoard() {
  return Array.from({ length: 9 }, () => Array(COLS).fill(0));
}

function getDropRow(board, row) {}

function Conn() {
  const [board, setBoard] = useState(() => emptyBoard());
  const [player, setPlayer] = useState(P1);
  const [winner, setWinner] = useState(0);
  const [winCells, setWinCells] = useState([]);

  function drop(col) {
    if (winner) return;

    const row = getRowDrop(board, col);
    if (row === -1) return;

    const next = board.map((r) => r.slice());
    next[row][col] = player;
    setBoard(next);

    const w = findWin();
    if (w) {
      setWinner(player);
      setWinCells(w);
      return;
    }

    if (next.every((r) => r.every((v) => v !== 0))) {
      setWinner(3);
      return;
    }
    setPlayer(player === P1 ? P2 : P1);
  }

  return (
    <div className="rounded-2xl p-3 bg-blue-900/40 border border-blue-300/20 overflow-auto">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {Array.from({ length: COLS }).map((_, col) => {
          return (
            <button key={col} onClick={(e) => drop(col)}>
              <div
                className="grid gap-1"
                style={{ gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
              >
                {Array.from({ length: ROWS }).map((_, r) => {
                  const val = board[r][col];
                  const isWin = winCells.some(
                    ([wr, wc]) => wr === r && wc === col
                  );
                  console.log(val, "val");
                  const colr =
                    val === 0
                      ? "bg-gray-600"
                      : val === P1
                      ? "bg-red-600"
                      : "bg-blue-600";
                  return (
                    <div key={r} className="bg-blue-950 rounded p-0.5">
                      <div
                        className={`w-8 h-8 rounded-full ${colr} ${
                          isWin ? "ring-4 ring-emerald-400" : ""
                        }`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Conn;
