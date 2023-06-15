import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

import { Square } from "../../Components/Square/Square";
import { ToastReset } from "../../Components/ToastReset/ToastReset";
import { TURNS } from "../../Logic/Constants";

import "./Game.css";
import { WinnerModal } from "../../Components/WinnerModal/WinnerModal";

export function Game({ socket }) {
    const [data, setData] = useState(null);
    const [waitTurn, setWaitTurn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket || !localStorage.getItem("name")) {
            navigate("/");
        } else {
            if (socket.disconnected) socket.connect();

            socket.emit("joinGame", localStorage.getItem("name"));

            window.addEventListener("beforeunload", () => socket.disconnect());
        }
    }, []);

    useEffect(() => {
        checkTurn();
    }, [data]);

    socket.on("game", (data) => {
        setData(data);
    });
    socket.on("resetGame", () => window.location.reload());

    const resetGame = () => {
        if (data.winner || data.draw) {
            socket.emit("resetGame");
        } else {
            toast((t) => <ToastReset t={t} socket={socket} />, {
                duration: Infinity,
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };

    const updatedBoard = (index) => {
        if (data.board[index] || data.winner || data.draw) return;

        socket.emit("move", index);
    };

    const checkTurn = () => {
        if (data) {
            setWaitTurn(
                data.players.find((p) => p.id == socket.id).symbol !==
                    data.turn &&
                    !data.winner &&
                    !data.draw
            );
        }
    };

    return (
        <main className="board content">
            <header>
                <button
                    onClick={() => {
                        socket.disconnect();
                        navigate("/");
                    }}
                >
                    <BsArrowLeft size={30} />
                </button>
                <h1>Tic Tac Toe</h1>
                <button onClick={() => resetGame()}>
                    <AiOutlineReload size={30} />
                </button>
            </header>

            <span></span>

            {data ? (
                <>
                    <section className="game">
                        {data.board &&
                            data.board.map((_, index) => (
                                <Square
                                    key={index}
                                    index={index}
                                    updatedBoard={updatedBoard}
                                >
                                    {data.board[index]}
                                </Square>
                            ))}
                    </section>

                    <section className="turn">
                        <Square isSelected={data.turn === TURNS.X}>
                            {TURNS.X}
                        </Square>
                        <Square isSelected={data.turn === TURNS.O}>
                            {TURNS.O}
                        </Square>
                    </section>
                </>
            ) : (
                <h1>Loading...</h1>
            )}

            {waitTurn && (
                <section>
                    <h1>
                        Esperando a que{" "}
                        {data.players.find((p) => p.symbol === data.turn).name}{" "}
                        haga su movimiento...
                    </h1>
                </section>
            )}

            <WinnerModal
                winner={data?.winner}
                data={data}
                resetGame={resetGame}
            />
        </main>
    );
}
