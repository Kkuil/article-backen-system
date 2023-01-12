import React, { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function MArticle() {
    const navigateTo = useNavigate()
    const { status } = useLoaderData()
    useEffect(() => {
        if(status == 400) {
            navigateTo("/login")
        }
    }, [status])
    return (
        <div>MArticle</div>
    )
}
