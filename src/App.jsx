import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import io from "socket.io-client";

import { Home, Game, NotFound } from "./Pages";

import "./App.css";

export function App() {
    let socket = io(import.meta.env.VITE_API_URL);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game socket={socket} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Toaster />
        </Router>
    );
}
