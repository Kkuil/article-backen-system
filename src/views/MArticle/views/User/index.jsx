import React from "react"
import { Outlet } from "react-router-dom"

export default function User() {
    return (
        <div className="user">
            <Outlet></Outlet>
        </div>
    )
}
