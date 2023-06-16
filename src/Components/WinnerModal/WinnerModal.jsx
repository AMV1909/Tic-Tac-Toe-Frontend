import confetti from "canvas-confetti";

export function WinnerModal({ winner, data, resetGame }) {
    if (!winner || winner === null) return null;

    if (winner !== false) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    }

    return (
        <section className="winner">
            <div className="text">
                <h2>
                    {winner == false
                        ? "Draw"
                        : `Winner: ${
                              data.players.find((p) => p.symbol === winner)
                                  ?.name
                          }`}
                </h2>

                <footer>
                    <button onClick={() => resetGame()}>Reset Game</button>
                </footer>
            </div>
        </section>
    );
}
