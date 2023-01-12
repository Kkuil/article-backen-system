import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Lazy from "@/utils/Lazy"

export default createBrowserRouter([
    {
        path: "/login",
        element: <Lazy path="Login" />,
    },
])
