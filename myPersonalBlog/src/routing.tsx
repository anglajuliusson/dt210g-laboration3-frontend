import { createBrowserRouter } from "react-router-dom";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPostsList from "./pages/BlogPostList";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminPage from "./pages/AdminPage";

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
            },
            {
                path: "/admin",
                element: (
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                )
              }
        ]
    }
])

export default router;