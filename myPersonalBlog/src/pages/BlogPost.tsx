import type { BlogPostsInterface } from "../interfaces/BlogPostsInterface";
import { Link } from "react-router-dom";
import '../index.css'; // Inkludera css-fil

const LinkStyle = {
    textDecoration: "none",
    color: "rgb(56, 56, 56)",
    display: "flex",
    gap: "3em"
}

const BlogPostStyle = {
    margin: "2em auto 5em auto",
    backgroundColor: "rgb(255, 243, 243)",
    listStyleType: "none",
    padding: "2em",
    borderRadius: "10px",
    marginBottom: "5em",
    width: "fit-content"
}

function BlogPost({blogPostProp} : {blogPostProp: BlogPostsInterface}) {
    return (
        <li className="bp" style={BlogPostStyle}>
            <Link className="bp_link" style={LinkStyle} to={`/blog-posts/${blogPostProp.id}`}>
                <img className="bp_img" style={{ maxWidth: "400px", borderRadius: "5px"}} src={blogPostProp.image}></img> {/* Visar bild för blogginlägg */}
                <div className="bp_text BlogPostText">
                    <h2 style={{marginBottom: "1em", fontSize: "28px", color: "rgb(255, 111, 132)"}}>{blogPostProp.title}</h2> {/* Visar titel för blogginlägg */}
                    <p style={{marginBottom: "1em", maxWidth: "500px"}}>{blogPostProp.description}</p> {/* Visar texten för ett blogginlägg*/}
                    <p>Publicerat: {blogPostProp.date?.slice(0, 10)}</p> {/* Visar datumet för blogginlägget, utskrivet som yyyy-mm-dd */}
                </div>
            </Link>
        </li>
    )
}

export default BlogPost;