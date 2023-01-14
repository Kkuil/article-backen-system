import React from "react"
import { createBrowserRouter } from "react-router-dom"
import { Navigate } from "react-router-dom"
import loaders from "@/router/loaders"
import Lazy from "@/utils/Lazy"

export default createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/mArticle/main" />,
    },
    {
        path: "/mArticle",
        element: <Lazy path="MArticle"/>,
        loader: loaders.AuthLoader,
        children: [
            {
                path: "main",
                element: <Lazy path="MArticle/views/Main"/>
            },
            {
                path: "article",
                element: <Lazy path="MArticle/views/Article"/>,
                children: [
                    {
                        path: "check",
                        element: <Lazy path="MArticle/views/Article/views/Check"/>
                    },
                    {
                        path: "articles",
                        element: <Lazy path="MArticle/views/Article/views/Articles"/>
                    }
                ]
            },
            {
                path: "admin",
                element: <Lazy path="MArticle/views/Admin"/>,
                children: [
                    {
                        path: "right",
                        element: <Lazy path="MArticle/views/Admin/views/Right" />
                    },
                    {
                        path: "members",
                        element: <Lazy path="MArticle/views/Admin/views/Members" />
                    }
                ]
            },
            {
                path: "user",
                element: <Lazy path="MArticle/views/User"/>,
                children: [
                    {
                        path: "users",
                        element: <Lazy path="MArticle/views/User/views/Users" />
                    }
                ]
            },
        ]
    },
    {
        path: "/login",
        element: <Lazy path="Login" />,
    },
])
