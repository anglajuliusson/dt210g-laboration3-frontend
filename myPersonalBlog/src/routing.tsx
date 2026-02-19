import { createBrowserRouter } from "react-router-dom";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPostsList from "./pages/BlogPostList";

const router = createBrowserRouter([
    {
        path: "/blog-posts",
        element: <BlogPostsList />
    },
    {
        path: "/blog-post",
        element: <BlogPostPage />
    }
])

export default router;