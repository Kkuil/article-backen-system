import React from "react"
import { Outlet } from "react-router-dom"

export default function Article() {
    return (
        <div className="article">
            <Outlet></Outlet>
        </div>
    )
}
