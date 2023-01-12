import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import "@/styles/base/base.css"
import "@/styles/common/common.css"
import "@/styles/icons/icon.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
