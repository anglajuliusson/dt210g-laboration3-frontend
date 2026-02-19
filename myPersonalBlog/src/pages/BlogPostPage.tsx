import Footer from "../components/Footer"; // Importera footer-komponent
import Header from "../components/Header"; // Importera header-komponent
import { Link } from "react-router-dom";

function BlogPostPage() {
    return (
        <div>
            <Header />
            <Link to="/blog-posts">Tillbaka</Link>
            <h2>Enskilt inlägg</h2>
            <Footer />
        </div>
    )
}

export default BlogPostPage;