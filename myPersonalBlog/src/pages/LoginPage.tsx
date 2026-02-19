import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

const LinkStyle = {
    color: "rgb(56, 56, 56)",
    margin: "2em"
}

const inputStyle = {
    width: "100%", 
    padding: "0.5em", 
    backgroundColor: "rgb(255, 243, 243)",
    color: "rgb(56, 56, 56)",
    border: "none",
    borderRadius: "5px",
    marginTop: "5px"
}

const buttonStyle = {
    backgroundColor: "rgb(255, 111, 132)",
    border: "none",
    borderRadius: "5px",
    padding: "0.7em 1.5em",
    cursor: "pointer"
}

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const resp = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.message || "Fel vid inloggning");
            }

            // Spara token
            localStorage.setItem("token", data.token);

            // Skicka användaren till admin
            navigate("/admin");

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Link to="/blog-posts" style={LinkStyle}>Tillbaka</Link>

            <h2 style={{textAlign: "center", color: "rgb(255, 111, 132)", fontSize: "28px", marginBottom: "2em"}}>Logga in</h2>
            <div className="login_form" style={{maxWidth: "400px", margin: "auto"}}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1em" }}>
                        <label>Användarnamn:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: "1em" }}>
                        <label>Lösenord:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>Logga in</button>

                    {error && <p style={{ color: "red", marginTop: "1em" }}>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default LoginPage;