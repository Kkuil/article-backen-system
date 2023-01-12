import React from "react"
import { createBrowserRouter } from "react-router-dom"
import { Navigate } from "react-router-dom"
import loaders from "@/router/loaders"
import Lazy from "@/utils/Lazy"

export default createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/MArticle" />,
    },
    {
        path: "/MArticle",
        element: <Lazy path="MArticle"/>,
        loader: loaders.AuthLoader
    },
    {
        path: "/login",
        element: <Lazy path="Login" />,
    },
])
