/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import confetti from 'canvas-confetti'
import './App.css'
import { Square } from './componets/Square.jsx'
import { TURNS } from './const/constantes.jsx'
import { Winner } from './componets/Winner.jsx'
import { checkWinner,  checkEndWinner} from './Func.jsx'

function App() {


  // eslint-disable-next-line no-unused-vars
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, isTurn] = useState(() =>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ??
    TURNS.x
  })

  const [contadorTurn1, newContador] = useState(()=>{
    const counter1 = window.localStorage.getItem('contadorTurn1')
    return counter1 ?? 0
  })
  const [contadorTurn2, newContador2] = useState(()=>{
    const counter2= window.localStorage.getItem('contadorTurn2')
    return counter2 ?? 0
  })


  const [winner, setWinner] = useState(null)

  const newGame = () => {
    setBoard(Array(9).fill(null))
    isTurn(winner)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {

    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    isTurn(newTurn)

    // Guarda la partida en el local Storage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    window.localStorage.setItem('contadorTurn1', newContador)
    window.localStorage.setItem('contadorTurn2', newContador2)

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
      if(newWinner == TURNS.x){
        newContador(contadorTurn1 + 1)
      }else{
        newContador2(contadorTurn2 + 1)
      }
    } else if (checkEndWinner(newBoard)) {
      setWinner(false);
      contadorTurn1
      contadorTurn2
    }
    console.log("Hola")
  }

  return (
    <div>
      <main className='board'>
        <h1>Tic tac toe</h1>
        <img onClick={newGame} src={reactLogo} alt='logoReactJs' width="100px" height="100px" />
        <section className='game'>
          {
            board.map((square, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}>
                  {board[index]}
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.x}>
            {TURNS.x}
          </Square>
          <Square isSelected={turn === TURNS.o}>
            {TURNS.o}
          </Square>

          <h1>{ }</h1>
        </section>
        {
          <Winner winner={winner} newGame={newGame} />
        }

        <section>
          <span>😴 {contadorTurn1}</span>
          <hr></hr>
          <span>🤮 {contadorTurn2}</span>
          
        </section>
      </main>
    </div>
  )
}

export default App
