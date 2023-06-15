import { useNavigate } from "react-router-dom";
import { HiOutlineEmojiSad } from "react-icons/hi";

import "./NotFound.css";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="ttt_notFound content">
            <HiOutlineEmojiSad size={256} />
            <h1>Page Not Found</h1>
            <button onClick={() => navigate("/")}>Go Home</button>
        </main>
    );
}
