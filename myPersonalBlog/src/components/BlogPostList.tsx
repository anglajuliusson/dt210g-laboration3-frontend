import { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import type { BlogPostsInterface } from "../interfaces/BlogPostsInterface";

function BlogPostsList() {
    // State för blogginlägg
    const [blogPosts, setBlogPosts] = useState<[BlogPostsInterface] | []>([]);
    const [loading, setLoading] = useState(false);

    // UseEffekt för att hämta in blogginlägg när komponenten mountas
    useEffect(() => {
        getAllBlogPosts()

        const handler = () => getAllBlogPosts();
        window.addEventListener("blogPosts:refresh", handler);

        return () => window.removeEventListener("blogPosts:refresh", handler);
    }, []);

    // Hjälpfunktion för att skapa födröjning
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Asynkron funktion som hämtar alla todos från backend-API:et
    const getAllBlogPosts = async () => {
        try {
            setLoading(true);

            await delay(2000);

            // Skickar GET-request till backend
            const resp = await fetch("http://localhost:3000/blog-posts");

            // KOntrollera att svaret är OK
            if (resp.ok) {

                // Konvertera svaret från JSON till JavaScript-objekt
                const data = await resp.json();

                // Uppdatera state med hämtade blogginlägg
                setBlogPosts(data);
            } else {
                throw Error;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Blogginlägg</h2>
            {/* Meddelande som visas vid laddning av att hämta in alla blogginlägg */}
            {
                loading && <p>Hämtar blogginlägg...</p>
            }
            {/* Lista som innehåller alla blogginlägg */}
            <ul>
                {/* Loopa igenom blogPost-arrayen och rendera en BlogPost-komponent per objekt */}
                {
                    blogPosts.map((blogPost) => (
                        <BlogPost blogPostProp={blogPost} key={blogPost.id} />
                    ))
                }
            </ul>
        </div>
    )
}

export default BlogPostsList;