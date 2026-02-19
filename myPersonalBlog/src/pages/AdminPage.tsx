import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPostsInterface } from "../interfaces/BlogPostsInterface";

// Styling tillbaka-länk
const LinkStyle = {
    color: "rgb(56, 56, 56)",
    margin: "2em"
}
// Styling för huvudknappar
const buttonStyle = {
    backgroundColor: "rgb(255, 111, 132)",
    border: "none",
    borderRadius: "5px",
    padding: "0.7em 1.5em",
    cursor: "pointer",
}
// Styling för röd knapp (ta bort & avbryt)
const redButtonStyle = {
    backgroundColor: "crimson",
    border: "none",
    borderRadius: "5px",
    padding: "0.5em 1em",
    cursor: "pointer",
}
// Styling för ljusrosa knapp (redigera & spara)
const pinkButtonStyle = {
    backgroundColor: "lightpink",
    border: "none",
    borderRadius: "5px",
    padding: "0.5em 1em",
    cursor: "pointer",
}
// Styling för input- & textarea-fält
const inputStyle = {
    width: "100%", 
    padding: "0.5em", 
    backgroundColor: "rgb(255, 243, 243)",
    color: "rgb(56, 56, 56)",
    border: "none",
    borderRadius: "5px",
    marginTop: "5px"
}
// Styling för varje blogginlägg i listan
const BlogPostStyle = {
    margin: "1em auto 1em auto",
    backgroundColor: "rgb(255, 243, 243)",
    listStyleType: "none",
    padding: "2em",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "900px"
}

// Bas-URL till backend-API
const API_BASE = "http://localhost:3000";

function AdminPage() {
  // Hämtar JWT-token från localstorage
  const token = localStorage.getItem("token") || "";

  // Sate-hantering
  const [posts, setPosts] = useState<BlogPostsInterface[]>([]); // Alla blogginlägg
  const [loading, setLoading] = useState(false); // Laddningsindikator
  const [error, setError] = useState(""); // Felmeddelande

  // Formulär-state för nytt inlägg
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");

  // State för redigering
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDate, setEditDate] = useState("");

  // Headers med JWt-token för skyddade requests
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Hämtar alla inlägg
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const resp = await fetch(`${API_BASE}/blog-posts`);

      if (!resp.ok) throw new Error("Kunde inte hämta inlägg");

      const data = await resp.json();
      setPosts(data);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Körs när komponenten mountas
  useEffect(() => {
    loadPosts();
  }, []);

  // Skapa nytt inlägg
  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");

      const body = {
        title,
        description,
        image: image.trim() === "" ? null : image.trim(),
        date,
      };

      const resp = await fetch(`${API_BASE}/blog-posts`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(body),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Kunde inte skapa inlägg");

      // Nollställ formulär
      setTitle("");
      setDescription("");
      setImage("");
      setDate("");

      await loadPosts();

    } catch (e: any) {
      setError(e.message);
    }
  };

  // Radera inlägg
  const deletePost = async (id: number) => {
    if (!confirm("Vill du ta bort inlägget?")) return;

    try {
      setError("");
      const resp = await fetch(`${API_BASE}/blog-posts/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data.message || "Kunde inte ta bort inlägg");

      await loadPosts();

    } catch (e: any) {
      setError(e.message);
    }
  };

  // Starta redigering
  const startEdit = (p: BlogPostsInterface) => {
    setEditingId(p.id);
    setEditTitle(p.title);
    setEditDescription(p.description);
    setEditImage(p.image ?? "");
    setEditDate(p.date?.slice(0, 10));
  };

  // Avbryt redigering
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditImage("");
    setEditDate("");
  };

  // Spara uppdaterat inlägg
  const saveEdit = async (id: number) => {
    try {
      setError("");

      const body = {
        title: editTitle,
        description: editDescription,
        image: editImage.trim() === "" ? null : editImage.trim(),
        date: editDate
      };

      const resp = await fetch(`${API_BASE}/blog-posts/${id}`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(body),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Kunde inte uppdatera inlägg");

      cancelEdit();
      await loadPosts();
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Logga ut
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{marginBottom: "5em"}}>
        <Link to="/blog-posts" style={LinkStyle}>Tillbaka</Link>

        <h2 style={{textAlign: "center", color: "rgb(255, 111, 132)", fontSize: "28px", marginBottom: "2em"}}>Redigera inlägg</h2>

        <div style={{maxWidth: "900px", margin: "auto"}}>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p style={{textAlign: "center", fontSize: "20px", margin: "2em"}}>Hämtar inlägg...</p>}

            <h3 style={{marginBottom: "5px"}}>Skapa nytt inlägg</h3>
            <form onSubmit={createPost} style={{ display: "grid", gap: "0.8em", marginBottom: "2em" }}>
                <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel" required />
                <textarea style={inputStyle} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Text" required rows={5} />
                <input style={inputStyle} value={image} onChange={(e) => setImage(e.target.value)} placeholder="Bild-URL (valfritt)" />
                <input style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} placeholder="Datum (yyyy-mm-dd)"></input>
                <button type="submit" style={buttonStyle}>Skapa</button>
            </form>

            <h3 style={{marginBottom: "5px"}}>Befintliga inlägg</h3>

            <ul style={{ padding: 0, listStyle: "none", display: "grid", gap: "1em" }}>
                {posts.map((p) => (
                <li key={p.id} style={BlogPostStyle}>
                    {editingId === p.id ? (
                    <>
                        <input style={inputStyle} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        <textarea style={inputStyle} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={5} />
                        <input style={inputStyle} value={editImage} onChange={(e) => setEditImage(e.target.value)} placeholder="Bild-URL (valfritt)" />
                        <input style={inputStyle} value={editDate} onChange={(e) => setEditDate(e.target.value)}></input>

                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <button style={pinkButtonStyle} onClick={() => saveEdit(p.id)}>Spara</button>
                        <button style={redButtonStyle} onClick={cancelEdit}>Avbryt</button>
                        </div>
                    </>
                    ) : (
                    <>
                        <strong>{p.title}</strong>
                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <button style={pinkButtonStyle} onClick={() => startEdit(p)}>Redigera</button>
                        <button style={redButtonStyle} onClick={() => deletePost(p.id)}>Ta bort</button>
                        </div>
                    </>
                    )}
                </li>
                ))}
            </ul>
            <div style={{marginTop: "2em"}}>
                <button onClick={logout} style={buttonStyle}>Logga ut</button>
            </div>
        </div>
    </div>
  );
}

export default AdminPage;