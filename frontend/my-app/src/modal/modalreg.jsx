import "./modalreg.css";
import { useState } from "react";

export default function ModalReg({ open, onClose }) {
    if(!open) return null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        const response = await fetch("http://localhost:5050/reg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        if(!response.ok) {
            setError(data.message);
        }
        console.log(data);
     };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h3>Rekisteröityminen</h3>
                {error && <p>{error}</p>}
                <input  type="email" placeholder="Syötä sähköposti" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Syötä salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={handleRegister}>Rekisteröidy</button>
            </div>
        </div>
    );
}