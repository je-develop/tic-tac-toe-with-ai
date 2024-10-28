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
  const [xWinnerCount, setXWinnerCount] = useState<number>(0)
  const [oWinnerCount, setOWinnerCount] = useState<number>(0)

  const onCheckWinner = useCallback(() => {
    const winner = { isWinner: false, who: '' }
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
        winner.isWinner = true
        winner.who = line[0]
      }
    }

    if (winner.isWinner) {
      setStatus({ status: gameStatus.WINNER, winner: winner.who })
      if (winner.who === 'O') setOWinnerCount((prev) => prev + 1)
      else setXWinnerCount((prev) => prev + 1)
    }

    return winner.isWinner
  }, [board])


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterMultipleOs = (boradData: any) => {
    let foundO = false;
    for (const element of boradData) {
      for (let j = 0; j < element.length; j++) {
        if (element[j] === 'O') {
          if (foundO) {
            return boradData;
          }
          foundO = true;
        }
      }
    }
    return boradData;
  }

  const callAI = useCallback(async () => {
    if (status.status === gameStatus.ONGOING && !onCheckWinner()) {
      setStatus((prev) => ({ ...prev, status: gameStatus.LOADING }))
      const result = await fetch(`http://localhost:3000/api/game?borad=${encodeURIComponent(JSON.stringify(board))}`)
      const data = await result.json()
      if (data) {
        setBorad(filterMultipleOs(JSON.parse(data).board))
        setCurrentPlayer("X")
      }
      setStatus((prev) => ({ ...prev, status: gameStatus.ONGOING }))
    }

  }, [board, onCheckWinner, status.status])

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
    if ((board[row][col] === "" || board[row][col] === " ") && currentPlayer === "X" && status.status === gameStatus.ONGOING && !onCheckWinner()) {
      board[row][col] = 'X'
      setBorad([...board])
      setCurrentPlayer("O")
    }
  }

  useEffect(() => {
    if (currentPlayer === "O") {
      callAI()
    }
  }, [callAI, currentPlayer, status.status])

  return (
    <Provider store={store}>
      <div className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-row">
          <div className="flex tems-center">
            <div className="flex flex-col justify-center pr-10">
              <p className="font-bold">SCORE</p>
              <div><span className="text-red-600 font-bold">X</span> :  {xWinnerCount}</div>
              <div><span className="text-blue-600 font-bold">O</span> :  {oWinnerCount}</div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-4 font-bold text-2xl">TIC TAC TOE</p>
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
