import React from "react"

export default function Main(props) {
    const { startGame } = props
    return (
        <div className="content">
            <h1 className="content--title">Quizzical</h1>
            <h4 className="content--text">Press button to start the game</h4>
            <button onClick={startGame} className="content--btn">Start quiz</button>
        </div>
    )
}