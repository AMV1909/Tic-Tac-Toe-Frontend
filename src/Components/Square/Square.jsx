import "./Square.css";

export function Square({ children, isSelected, updatedBoard, index }) {
    return (
        <div
            className={`square ${isSelected ? "is-selected" : ""}`}
            onClick={() => updatedBoard(index)}
        >
            {children}
        </div>
    );
}
