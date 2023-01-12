import { React } from "react"
import { RouterProvider } from "react-router-dom"
import router from "@/router/index.js"

export default function App() {
    return (
        <RouterProvider router={router}>
            <div className="App">app</div>
        </RouterProvider>
    )
}
