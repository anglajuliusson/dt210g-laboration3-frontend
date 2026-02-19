import { Link } from "react-router-dom";

function BlogPostPage() {
    return (
        <div>
            <Link to="/blog-posts">Tillbaka</Link>
            <h2>Enskilt inlägg</h2>
        </div>
    )
}

export default BlogPostPage;