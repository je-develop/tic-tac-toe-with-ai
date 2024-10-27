import React from 'react'

interface SquareProps {
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSquareClick: any
}

export const Square = ({ value, onSquareClick }: SquareProps) => {
    return (
        <button className={`bg-white border-2 border-gray-300 text-2xl font-bold leading-8 text-center px-4 py-2 w-16 h-16 m-0.5`} onClick={onSquareClick} >
            <p className={`${value === "X" ? 'text-red-600' : 'text-blue-600'}`}>{value}</p>
        </button >
    )
}
