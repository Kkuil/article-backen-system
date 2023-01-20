import React from "react"
import ArticleChart from "./components/ArticleChart"
import UserChart from "./components/UserChart"
import styled from "styled-components"

const StyleMain = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 600px;
    padding: 20px;
`

export default function Main() {
    return (
        <StyleMain className="main">
            <ArticleChart />
            <UserChart />
        </StyleMain>
    )
}
