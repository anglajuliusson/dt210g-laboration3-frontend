import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { BlogPostsInterface } from "../interfaces/BlogPostsInterface";

const LinkStyle = {
    color: "rgb(56, 56, 56)",
    margin: "2em"
}

const BlogPostStyle = {
    margin: "2em auto 5em auto",
    backgroundColor: "rgb(255, 243, 243)",
    listStyleType: "none",
    padding: "2em",
    borderRadius: "10px",
    marginBottom: "5em",
    width: "fit-content",
    display: "flex",
    gap: "3em"
}

function BlogPostPage() {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPostsInterface | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const resp = await fetch(`http://localhost:3000/blog-posts/${id}`);
        if (!resp.ok) throw new Error("Kunde inte hämta inlägget");

        const data = await resp.json();
        // om backend returnerar en array:
        setBlogPost(Array.isArray(data) ? data[0] : data);
      } catch (e) {
        console.error(e);
        setBlogPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogPost();
  }, [id]);

  if (loading) return <p style={{textAlign: "center", fontSize: "20px", margin: "2em"}}>Laddar inlägg...</p>;

  if (!blogPost) {
    return (
      <div>
        <Link to="/blog-posts" style={LinkStyle}>Tillbaka</Link>
        <p style={{textAlign: "center", fontSize: "20px", margin: "2em"}}>Inlägget hittades inte.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/blog-posts" style={LinkStyle}>Tillbaka</Link>
      <div style={BlogPostStyle}>
        {blogPost.image ? (
            <img style={{ maxWidth: "400px", borderRadius: "5px" }} src={blogPost.image} alt={blogPost.title} />
        ) : null}

        <div className="BlogPostText">
            <h2 style={{ marginBottom: "1em", fontSize: "28px", color: "rgb(255, 111, 132)" }}>
            {blogPost.title}
            </h2>

            <p style={{ marginBottom: "1em", maxWidth: "500px" }}>
            {blogPost.description}
            </p>

            <p>Publicerat: {blogPost.date?.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogPostPage;