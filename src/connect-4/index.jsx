import { useState } from "react";

// *** Simplified Connect-4 with 9x9 grid ***
// Features: 9x9 grid, click-to-drop, turn switch, win detection (row/col/2 diagonals), reset.

const ROWS = 9;
const COLS = 9;
const CONNECT = 4; // still 4 to win
const P1 = 1; // Red
const P2 = 2; // Yellow

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function getDropRow(board, col) {
  for (let r = ROWS - 1; r >= 0; r--) if (board[r][col] === 0) return r;
  return -1;
}

function inBounds(r, c) {
  return r >= 0 && r < ROWS && c >= 0 && c < COLS;
}

function findWin(board, r0, c0, player) {
  if (r0 < 0 || c0 < 0) return null;
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (const [dr, dc] of dirs) {
    const cells = [[r0, c0]];
    let r = r0 + dr,
      c = c0 + dc;
    while (inBounds(r, c) && board[r][c] === player) {
      cells.push([r, c]);
      r += dr;
      c += dc;
    }
    r = r0 - dr;
    c = c0 - dc;
    while (inBounds(r, c) && board[r][c] === player) {
      cells.unshift([r, c]);
      r -= dr;
      c -= dc;
    }
    if (cells.length >= CONNECT) return cells.slice(0, CONNECT);
  }
  return null;
}

export default function ConnectFour() {
  const [board, setBoard] = useState(() => emptyBoard());
  const [player, setPlayer] = useState(P1);
  const [winner, setWinner] = useState(0);
  const [winCells, setWinCells] = useState([]);

  function drop(col) {
    if (winner) return;
    const row = getDropRow(board, col);
    if (row === -1) return;

    const next = board.map((r) => r.slice());
    next[row][col] = player;
    setBoard(next);

    const w = findWin(next, row, col, player);
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

  function reset() {
    setBoard(emptyBoard());
    setPlayer(P1);
    setWinner(0);
    setWinCells([]);
  }

  const status =
    winner === 3
      ? "Draw"
      : winner === P1
      ? "Red wins"
      : winner === P2
      ? "Yellow wins"
      : player === P1
      ? "Red to move"
      : "Yellow to move";

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Connect 4 (9x9)</h1>
          <button
            onClick={reset}
            className="px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700"
          >
            Reset
          </button>
        </div>

        <div className="mb-3 text-lg" role="status" aria-live="polite">
          {status}
        </div>

        <div className="rounded-2xl p-3 bg-blue-900/40 border border-blue-300/20 overflow-auto">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
          >
            {Array.from({ length: COLS }).map((_, col) => (
              <button
                key={col}
                onClick={() => drop(col)}
                className="bg-blue-800/60 hover:bg-blue-700/60 rounded p-1"
                aria-label={`Drop in column ${col + 1}`}
              >
                <div
                  className="grid gap-1"
                  style={{ gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
                >
                  {Array.from({ length: ROWS }).map((_, r) => {
                    const val = board[r][col];
                    const isWin = winCells.some(
                      ([wr, wc]) => wr === r && wc === col
                    );
                    const color =
                      val === 0
                        ? "bg-slate-900"
                        : val === P1
                        ? "bg-red-500"
                        : "bg-yellow-400";
                    return (
                      <div key={r} className="bg-blue-950 rounded p-0.5">
                        <div
                          className={`w-8 h-8 rounded-full ${color} ${
                            isWin ? "ring-4 ring-emerald-400" : ""
                          }`}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs opacity-75">
          Click a column to drop your piece. First to connect 4 wins in any
          direction.
        </p>
      </div>
    </div>
  );
}
