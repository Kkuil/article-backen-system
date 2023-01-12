import React, { createRef, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Button, message } from "antd"
import { findAdmin } from "@/api/admin"

const StyleFrom = styled.div`
    display: flex;
    flex-direction: column;
    .title {
        font-size: 28px;
        color: #fff;
        margin-bottom: 30px;
    }
    .info {
        display: flex;
        flex-direction: column;
        input {
            width: 300px;
            height: 40px;
            border-radius: 10px;
            font-size: 16px;
            color: #fff;
            padding-left: 10px;
            margin: 10px 0;
            transition: all .3s;
            border: 2px solid #ccc;
            ::-webkit-input-placeholder {
                color: #ccc;
            }
            :moz-placeholder {
                color: #ccc;
            }
            ::-moz-placeholder {
                color: #ccc;
            }
            :-ms-input-placeholder {
                color: #ccc;
            }
            &:focus {
                border-color: #0094ff;
            }
        }
        .password {
            position: relative;
            i {
                cursor: pointer;
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                color: #fff;
                font-size: 18px;
            }
        }
        .submit {
            margin-top: 20px;
        }
    }
`

export default function Form() {
    const navigateTo = useNavigate()
    const [isCheckPw, setIsCheckPw] = useState(false)
    const admin_name = createRef()
    const password = createRef()
    async function login(e) {
        if (e.type == "click" || (e.type == "keyup" && e.key == "Enter")) {
            if (!admin_name.current.value) {
                message.error("账号不能为空")
                admin_name.current.focus()
                return
            } else if (!password.current.value) {
                password.current.focus()
                message.error("密码不能为空")
                return
            }
            const { status, msg } = await findAdmin({
                admin_name: admin_name.current.value,
                password: password.current.value
            })
            if (status == 200) {
                message.success(msg)
                navigateTo("/MArticle")
            } else {
                message.error(msg)
                return
            }
        }

    }
    return (
        <StyleFrom className="form flex_center">
            <h1 className="title">Ky客-后台管理系统</h1>
            <div className="info">
                <input type="text" ref={admin_name} placeholder="admin" className="admin_name" onKeyUp={login} />
                <div className="password">
                    <input type={isCheckPw ? "text" : "password"} ref={password} placeholder="password" onKeyUp={login} />
                    <i
                        className={`iconfont ${isCheckPw ? "icon-open_eyes" : "icon-CloseEyes"}`}
                        onMouseDown={e => {
                            e.stopPropagation()
                            setIsCheckPw(true)
                        }}
                        onMouseUp={e => {
                            e.stopPropagation()
                            setIsCheckPw(false)
                        }}
                    ></i>
                </div>
                <Button
                    type="primary"
                    size="large"
                    className="submit"
                    onClick={login}
                >登录</Button>
            </div>
        </StyleFrom>
    )
}
