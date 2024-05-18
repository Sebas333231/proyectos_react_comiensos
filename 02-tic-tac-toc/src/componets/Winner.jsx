import { Square } from "./Square.jsx";

// eslint-disable-next-line react/prop-types
export function Winner({ winner, newGame }) {
    if (winner == null) return null;
    // eslint-disable-next-line no-unused-vars
    const newWinnerValidation = winner == false ? "Empate 😴 : 🤮" : "Gano ";
    return (
        <section className='winner'>
            <div className='text'>
                <h2>{newWinnerValidation}</h2>
                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button onClick={newGame}>Nuevo Juego</button>
                </footer>
            </div>
        </section>
    )
}