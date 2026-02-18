import type { BlogPostsInterface } from "../interfaces/BlogPostsInterface";

function BlogPost({blogPostProp} : {blogPostProp: BlogPostsInterface}) {
    return (
        <li>
            <img src={blogPostProp.image}></img> {/* Visar bild för blogginlägg */}
            <h3>{blogPostProp.title}</h3> {/* Visar titel för blogginlägg */}
            <p>{blogPostProp.description}</p> {/* Visar texten för ett blogginlägg*/}
            <p>Publicerat: {blogPostProp.date?.slice(0, 10)}</p> {/* Visar datumet för blogginlägget, utskrivet som yyyy-mm-dd */}
        </li>
    )
}

export default BlogPost;