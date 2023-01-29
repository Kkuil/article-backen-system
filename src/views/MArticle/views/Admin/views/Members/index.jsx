import React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { getAllAdmins } from "@/api/admin"
import { useState } from "react"
import { message, Button, Popconfirm } from "antd"
import { useNavigate } from "react-router-dom"
import { UserOutlined } from "@ant-design/icons"

import { delAdmin } from "@/api/admin"

const Member = styled.div`
    padding: 20px;
    > div {
        margin-bottom: 15px;
        .title {
            position: relative;
            padding: 10px;
            button {
                position: absolute;
                top: 18%;
                right: 20px;
            }
        }
        .members {
            display: flex;
            flex-wrap: wrap;
            min-height: 250px;
            border: 1px solid #ccc;
            padding: 15px;
            .item {
                position: relative;
                margin: 0 15px;
                display: flex;
                cursor: pointer;
                width: 250px;
                height: 100px;
                padding: 10px;
                box-shadow: 0 0 1px 1px #ccc;
                transition: transform .3s;
                .left {
                    background-color: #ccc;
                    width: 80px;
                    font-size: 40px;
                    color: #777;
                }
                .right {
                    padding: 5px;
                    width: 150px;
                    font-size: 12px;
                    font-weight: bold;
                    > div {
                        height: 25px;
                    }
                }
                &:hover {
                    transform: translateY(-5px);
                }
                > i {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    width: 25px;
                    height: 25px;
                    background-color: red;
                    color: #fff;
                    border-radius: 12.5px;
                    transition: all .3s;
                    &:active {
                        transform: scale(0.9);
                    }
                }
                @keyframes show {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }
            }
        }
    }
    .sa {
        .title {
            background-color: #0094ff;
        }
    }
    .ma {
        .title {
            background-color: orange;
        }
    }
    .ca {
        .title {
            background-color: #ccc;
        }
    }
`

export default function Members() {
    const navigateTo = useNavigate()
    const [admins, setAdmins] = useState([])
    const [operations, setOperations] = useState({
        sa: false,
        ma: false,
        ca: false
    })
    useEffect(() => {
        async function fetchData() {
            const { status, msg, admins } = await getAllAdmins()
            if (status === 200) {
                setAdmins(admins)
            } else {
                message.error(msg, 3)
                navigateTo("/mArticle/index")
            }
        }
        fetchData()
    }, [])
    async function del_admin(id) {
        const { status, msg } = await delAdmin(id)
        if(status === 200) {
            message.success(msg, 2)
            setAdmins(admins.filter(admin => admin.id !== id))
        } else {
            message.error(msg, 3)
        }
    }
    return (
        <Member>
            <div className="sa">
                <h2 className="title">
                    <span>超级管理员</span>
                    <Button
                        type="primary"
                        onClick={() => {
                            setOperations({
                                ...operations,
                                sa: !operations.sa
                            })
                        }}
                    >{operations.sa ? "退出管理" : "批量管理"}</Button>
                </h2>
                <div className="members">
                    {
                        admins.map(admin => {
                            if (admin.privilege !== "sa_wwq5714806") return
                            return (
                                <div className="item" key={admin.id}>
                                    <div className="left flex_center">
                                        <UserOutlined />
                                    </div>
                                    <div className="right" style={{
                                        backgroundColor: "#0094ff"
                                    }}>
                                        <div className="id">工号：{admin.id}</div>
                                        <div className="name">管理员姓名：{admin.admin_name}</div>
                                        <div className="pos">权限：{admin.privilege}</div>
                                    </div>
                                    <Popconfirm
                                        title="确认删除此管理员吗？"
                                        onConfirm={() => del_admin(admin.id)}
                                        onCancel={() => {
                                            message.success("已取消", 2)
                                        }}
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <i
                                            className="iconfont icon-cuowu flex_center"
                                            style={{
                                                display: operations.sa || "none",
                                                animation: "show ease-in-out 0.3s",
                                            }}
                                        ></i>
                                    </Popconfirm>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="ma">
                <h2 className="title">
                    <span>中级管理员</span>
                    <Button
                        type="primary"
                        onClick={() => {
                            setOperations({
                                ...operations,
                                ma: !operations.ma
                            })
                        }}
                    >{operations.ma ? "退出管理" : "批量管理"}</Button>
                </h2>
                <div className="members">
                    {
                        admins.map(admin => {
                            if (admin.privilege !== "ma_wwq5714806") return
                            return (
                                <div className="item" key={admin.id}>
                                    <div className="left flex_center">
                                        <UserOutlined />
                                    </div>
                                    <div className="right" style={{
                                        backgroundColor: "orange"
                                    }}>
                                        <div className="id">工号：{admin.id}</div>
                                        <div className="name">管理员姓名：{admin.admin_name}</div>
                                        <div className="pos">权限：{admin.privilege}</div>
                                    </div>
                                    <Popconfirm
                                        title="确认删除此管理员吗？"
                                        onConfirm={() => del_admin(admin.id)}
                                        onCancel={() => {
                                            message.success("已取消", 2)
                                        }}
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <i
                                            className="iconfont icon-cuowu flex_center"
                                            style={{
                                                display: operations.ma || "none",
                                                animation: "show ease-in-out 0.3s",
                                            }}
                                        ></i>
                                    </Popconfirm>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="ca">
                <h2 className="title">
                    <span>普通管理员</span>
                    <Button
                        type="primary"
                        onClick={() => {
                            setOperations({
                                ...operations,
                                ca: !operations.ca
                            })
                        }}
                    >{operations.ca ? "退出管理" : "批量管理"}</Button>
                </h2>
                <div className="members">
                    {
                        admins.map(admin => {
                            if (admin.privilege !== "ca_wwq5714806") return
                            return (
                                <div className="item" key={admin.id}>
                                    <div className="left flex_center">
                                        <UserOutlined />
                                    </div>
                                    <div className="right" style={{
                                        backgroundColor: "#fff"
                                    }}>
                                        <div className="id">工号：{admin.id}</div>
                                        <div className="name">管理员姓名：{admin.admin_name}</div>
                                        <div className="pos">权限：{admin.privilege}</div>
                                    </div>
                                    <Popconfirm
                                        title="确认删除此管理员吗？"
                                        onConfirm={() => del_admin(admin.id)}
                                        onCancel={() => {
                                            message.success("已取消", 2)
                                        }}
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <i
                                            className="iconfont icon-cuowu flex_center"
                                            style={{
                                                display: operations.ca || "none",
                                                animation: "show ease-in-out 0.3s",
                                            }}
                                        ></i>
                                    </Popconfirm>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Member>
    )
}
