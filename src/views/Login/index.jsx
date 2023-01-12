import React from "react"
import styled from "styled-components"
import Form from "./components/Form"

const StyleLogin = styled.div`
    height: 100vh;
    overflow: hidden;
    background: url("/images/poster.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .form {
            width: 400px;
            height: 300px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            }
`

export default function Login() {
    return (
        <StyleLogin className="login flex_center">
            <Form />
        </StyleLogin>
    )
}
