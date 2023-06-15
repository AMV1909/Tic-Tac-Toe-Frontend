import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./CardName.css";

export function CardName() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("name", name);
        navigate("/game");
    };

    return (
        <form className="ttt__cardName" onSubmit={handleSubmit}>
            <h3>Choose a name</h3>
            <input type="text" onChange={onChange} autoFocus required />
            <button>Play</button>
        </form>
    );
}
