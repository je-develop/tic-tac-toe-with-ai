'use client'

import React from 'react'
import { Square } from './Square'

interface BoradType {
    borad: string[][],
    handleClick: (row: number, col: number) => void;
}

const Borad = ({ borad, handleClick }: BoradType) => {

    return (
        <>
            {borad?.map((row, rowIndex) => (
                <div key={`${rowIndex}`} className="grid grid-cols-3">
                    {row.map((value, colIndex) => (
                        <Square
                            key={`${rowIndex}-${colIndex}`}
                            value={value}
                            onSquareClick={() => handleClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </>
    )
}

export default Borad