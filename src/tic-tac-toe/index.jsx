import { useState, useMemo, useRef, useEffect } from "react";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        player: board[a],
        line: [a, b, c],
      };
    }
  }
  return null;
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((ms % 1000) / 100); // tenths
  return `${minutes}:${seconds}.${milliseconds}`;
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [xTime, setXTime] = useState(10_000);
  const [yTime, setYTime] = useState(10_000);

  const timerXRef = useRef(null);
  const timerYRef = useRef(null);

  const [result, setResult] = useState({
    winner: null,
    reason: null,
  });

  const winnerFromBoard = useMemo(() => checkWinner(board), [board]);

  function clearTimer(ref) {
    if (ref.current != null) {
      clearInterval(ref.current);
      ref.current = null;
    }
  }

  function stopAllTimers() {
    clearTimer(timerXRef);
    clearTimer(timerYRef);
  }

  function startXTimer() {
    clearTimer(timerXRef);
    timerXRef.current = window.setInterval(() => {
      setXTime((t) => Math.max(0, t - 100));
    }, 100);
  }
  function startYTimer() {
    clearTimer(timerYRef);
    timerYRef.current = window.setInterval(() => {
      setYTime((t) => Math.max(0, t - 100));
    }, 100);
  }

  useEffect(() => {
    if (!hasGameStarted || result.winner) return;

    if (isXNext) {
      startXTimer();
      clearTimer(timerYRef);
    } else {
      startYTimer();
      clearTimer(timerXRef);
    }
  }, [isXNext, hasGameStarted, result.winner]);

  useEffect(() => {
    if (!hasGameStarted || result.winner) return;

    if (xTime === 0) {
      setResult({ winner: "⭕", reason: "timeout" });
      stopAllTimers();
    } else if (yTime === 0) {
      setResult({ winner: "❌", reason: "timeout" });
      stopAllTimers();
    }
  }, [xTime, yTime, hasGameStarted, result.winner]);

  useEffect(() => {
    if (!hasGameStarted || result.winner) return;
    if (board.every((c) => c !== null) && !winnerFromBoard) {
      setResult({ winner: null, reason: "tie" });
      stopAllTimers();
    }
  }, [board, hasGameStarted, result.winner, winnerFromBoard]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAllTimers();
  }, []);

  const handleOnClick = (idx) => {
    if (!hasGameStarted || result.winner) return;
    if (board[idx]) return;

    const currentPlayer = isXNext ? "❌" : "⭕";
    const currentTime = isXNext ? xTime : yTime;

    const next = [...board];
    next[idx] = currentPlayer;

    const maybeWin = checkWinner(next);

    if (maybeWin && currentTime > 0) {
      setBoard(next);
      setResult({ winner: currentPlayer, reason: "line" });
      stopAllTimers();
      return;
    }

    if (maybeWin && currentTime <= 0) {
      setBoard(next);
      setResult({
        winner: currentPlayer === "❌" ? "⭕" : "❌",
        reason: "timeout",
      });
      stopAllTimers();
      return;
    }

    setBoard(next);
    setIsXNext((p) => !p);
  };

  const gameStatus = () => {
    if (result.reason === "tie") return "🤝 It's a Tie!";
    if (result.winner && result.reason === "line")
      return `🎉 Player ${result.winner} wins (line)!`;
    if (result.winner && result.reason === "timeout")
      return `⏱️ Player ${result.winner} wins (opponent timed out)!`;
    return `Next: ${isXNext ? "❌" : "⭕"}`;
  };

  const onStart = () => {
    stopAllTimers();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setHasGameStarted(true);
    setXTime(10_000);
    setYTime(10_000);
    setResult({ winner: null, reason: null });
    startXTimer();
  };

  return (
    <main className="flex flex-col gap-3 items-start">
      <div className="flex gap-2">
        <button
          onClick={onStart}
          className="p-2 border rounded-md border-indigo-600"
        >
          Start / Restart
        </button>
      </div>

      <div className="text-lg font-medium">{gameStatus()}</div>

      <div className="flex justify-between w-[300px] font-mono">
        <div>❌ {formatTime(xTime)}</div>
        <div>⭕ {formatTime(yTime)}</div>
      </div>

      <div className="grid grid-cols-3 w-[300px]">
        {board.map((item, idx) => (
          <button
            type="button"
            onClick={() => handleOnClick(idx)}
            className="flex w-[100px] h-[100px] justify-center items-center border border-indigo-200 text-4xl"
            key={idx}
            disabled={!!result.winner || !hasGameStarted || !!board[idx]}
          >
            {item}
          </button>
        ))}
      </div>
    </main>
  );
}
