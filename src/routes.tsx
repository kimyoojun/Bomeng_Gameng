import { createBrowserRouter } from "react-router-dom"
import Layout from "./web/components/Layout.tsx"
import Home from "./web/Home.tsx"
import Chat from "./web/Chat.tsx"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: Home},
            { path: "chat", Component: Chat },
        ],
    },
])
