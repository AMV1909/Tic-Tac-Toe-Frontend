import { useState } from "react";

import { CardName } from "../../Components/CardName/CardName";
import logo from "../../Assets/logo.png";

import "./Home.css";

export function Home() {
    const [showCardName, setShowCardName] = useState(false);

    return (
        <main className="ttt__home content">
            <img src={logo} alt="Logo" />
            <button onClick={() => setShowCardName(true)}>Play</button>

            {showCardName && <CardName />}
        </main>
    );
}
