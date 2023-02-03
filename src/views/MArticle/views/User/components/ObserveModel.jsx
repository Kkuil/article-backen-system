import React from "react"
import { createPortal } from "react-dom"
import { Button } from "antd"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const Observing = styled.div`
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    .box {
        position: relative;
        width: 500px;
        border-radius: 20px;
        background-color: #fff;
        padding: 20px;
        > div {
            display: flex;
            height: 40px;
            font-size: 16px;
            font-weight: bold;
        }
        .title {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .content {
            height: auto;
            min-height: 40px;
            max-height: 100px;
            overflow: scroll;
            .words {
                width: 20%;
                position: sticky;
                left: 0;
                top: 0;
            }
            p {
                width: 80%;
            }
        }
        .kits {
            height: 40px;
        }
    }
`

export default function ObserveModel({ user }) {
    const dispatch = useDispatch()
    return createPortal((
        <Observing className="model flex_center">
            <div className="box">
                <div className="id">
                    <span>编号：</span>
                    <span>{user.id}</span>
                </div>
                <div className="username">
                    <span>用户名：</span>
                    <span>{user.username}</span>
                </div>
                <div className="password">
                    <span>密码：</span>
                    <span>{user.password}</span>
                </div>
                <div className="avatar">
                    <span>头像：</span>
                    <span>{user.avatar}</span>
                </div>
                <div className="phone_number">
                    <span>电话：</span>
                    <span>{user.phone_number}</span>
                </div>
                <div className="kits flex_center">
                    <Button onClick={() => {
                        dispatch({
                            type: "users/modify_observing",
                            isObserving: false
                        })
                    }}>取消</Button>
                </div>
            </div>
        </Observing>
    ), document.body)
}
