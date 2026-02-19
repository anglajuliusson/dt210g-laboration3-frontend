import { createBrowserRouter } from "react-router-dom";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPostsList from "./pages/BlogPostList";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

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
                path: "/blog-posts/:id",
                element: <BlogPostPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
])

export default router;