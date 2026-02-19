import { createBrowserRouter } from "react-router-dom";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPostsList from "./pages/BlogPostList";
import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/blog-posts",
                element: <BlogPostsList />
            },
            {
                path: "/blog-post",
                element: <BlogPostPage />
            }
        ]
    }
])

export default router;