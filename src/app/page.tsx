'use client'
import { useCallback, useEffect, useState } from "react";
import Borad from "./components/Borad";
import Loading from "./components/loading/Loading";
import { Provider } from "react-redux";
import store from "@/app/redux/store";

enum gameStatus {
  ONGOING = 'ONGOING',
  WINNER = 'WINNER',
  LOADING = "LOADING"
}

const intialBoradState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

export default function Home() {

  const [board, setBorad] = useState(intialBoradState);
  const [currentPlayer, setCurrentPlayer] = useState<string>("X")
  const [status, setStatus] = useState<{ status: string, winner: string }>({ status: gameStatus.ONGOING, winner: "" })

  const onCheckWinner = useCallback(() => {

    const lines = [
      //Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      //columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],

      //Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];
    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[1] === line[2]) {
        setStatus({ status: gameStatus.WINNER, winner: line[0] })
      }
    }
  }, [board])

  const callAI = useCallback(async () => {
    if (status.status === gameStatus.ONGOING) {
      setStatus((prev) => ({ ...prev, status: gameStatus.LOADING }))
      const result = await fetch(`http://localhost:3000/api/game?borad=${encodeURIComponent(JSON.stringify(board))}`)
      const data = await result.json()
      if (data) {
        setBorad(JSON.parse(data).board)
        setCurrentPlayer("X")
      }
      setStatus((prev) => ({ ...prev, status: gameStatus.ONGOING }))
    }

  }, [board, status])

  const onResetGame = () => {
    setBorad([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ])
    setStatus({ status: gameStatus.ONGOING, winner: '' })
    setCurrentPlayer("X")
  }

  const onGetStatus = (status: string): string => {
    switch (status) {
      case gameStatus.ONGOING:
        return 'on going'
      case gameStatus.WINNER:
        return 'Winner is '
      default: return ''
    }
  }

  const handleClick = (row: number, col: number) => {
    if ((board[row][col] === "" || board[row][col] === " ") && currentPlayer === "X" && status.status === gameStatus.ONGOING) {
      board[row][col] = 'X'
      setBorad([...board])
      setCurrentPlayer("O")
    }
  }

  useEffect(() => {
    onCheckWinner()
  }, [board, onCheckWinner])

  useEffect(() => {
    if (currentPlayer === "O") {
      callAI()
    }
  }, [callAI, currentPlayer, status.status])

  return (
    <Provider store={store}>
      <div className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-row">
          <div className="flex flex-col items-center">
            <label className="mb-4 font-bold text-2xl">TIC TAC TOE</label>
            <Borad borad={board} handleClick={handleClick} />
            {status.status === gameStatus.LOADING ? <Loading /> : <p className="mt-2">Game Status: {onGetStatus(status.status)} {status.winner}</p>}
            <button onClick={onResetGame} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 mt-2 border border-gray-400 rounded">
              Reset Game
            </button>
          </div>

        </main>
      </div>
    </Provider>

  );
}
