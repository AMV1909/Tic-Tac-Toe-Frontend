import { toast } from "react-hot-toast";
import "./ToastReset.css";

export function ToastReset({ t, socket }) {
    return (
        <main className="toast">
            <p>¿Estás seguro de querer reiniciar el juego?</p>
            <section className="toast-buttons">
                <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
                <button
                    onClick={() => {
                        socket.emit("resetGame");
                        toast.dismiss(t.id);
                    }}
                >
                    Reiniciar
                </button>
            </section>
        </main>
    );
}
