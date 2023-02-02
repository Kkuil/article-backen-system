import React, { useState, useEffect } from "react"
import { useNavigate, useLoaderData, Outlet, useLocation } from "react-router-dom"
import { Layout, Menu, Avatar, Dropdown } from "antd"
import { connect } from "react-redux"
import styled from "styled-components"
import _ from "lodash"

import { modify } from "@/store/modules/admin"

import { items } from "./mArticle.config"

const StyleHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
`

const { Header, Content, Footer, Sider } = Layout

const getDropItems = (navigateTo) => {
    return [
        {
            key: "logout",
            label: <span
                onClick={() => {
                    const ADMIN_TOKEN = localStorage.getItem("ADMIN_TOKEN")
                    ADMIN_TOKEN && localStorage.removeItem("ADMIN_TOKEN")
                    navigateTo("/login")
                }}
            >
                <i className="iconfont icon-dingbudaohang-zhangh"></i>
                <span>退出登录</span>
            </span>
        }
    ]
}
function MArticle({ admin_info, modify }) {
    const navigateTo = useNavigate()
    const { pathname } = useLocation()
    const { status, admin } = useLoaderData()
    const [collapsed, setCollapsed] = useState(false)
    const [wlcWrd, setWlcWrd] = useState("上午好")
    // 默认选中的项
    const [defaultKey] = useState("/" + pathname.split("/").slice(2).join("/"))
    // 默认展开的项
    const [openKey] = useState("/" + pathname.split("/")[2])
    // 权限管理
    useEffect(() => {
        if (status == 400) {
            navigateTo("/login")
            return
        }
        modify({ admin })
    }, [status])
    // 重定向
    useEffect(() => {
        if (pathname == "/MArticle") {
            navigateTo("/mArticle/main")
            return
        }
    }, [pathname])
    // 监听页面尺寸变化
    useEffect(() => {
        window.onresize = _.throttle(function (e) {
            if (e.target.outerWidth <= 1000) {
                setCollapsed(true)
            } else {
                setCollapsed(false)
            }
        }, 1000)
        return () => {
            window.onresize = null
        }
    }, [])
    // 修改问候语
    useEffect(() => {
        const cur_hour = new Date().getHours()
        if(cur_hour <= 6) setWlcWrd("凌晨好")
        else if(cur_hour <= 11) setWlcWrd("上午好")
        else if(cur_hour <= 13) setWlcWrd("中午好")
        else if(cur_hour <= 17) setWlcWrd("下午好")
        else if(cur_hour <= 21) setWlcWrd("晚上好")
        else setWlcWrd("夜深了")
    }, [wlcWrd])
    function selected({ key }) {
        navigateTo(`/mArticle${key}`)
    }
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh"
                }}
            >
                <div
                    style={{
                        height: 45,
                        margin: 16,
                    }}
                    className="flex_center"
                >
                    <img
                        style={{
                            height: "100%",
                        }}
                        src="/images/logo.png"
                        className="flex_center"
                    />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[defaultKey]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    items={((privilege) => {
                        if (!(privilege === "sa_wwq5714806")) {
                            return items.slice(0, 3)
                        } else {
                            return items
                        }
                    })(admin_info.privilege)}
                    onSelect={selected}
                    onClick={({ key }) => {
                        console.log(key)
                    }}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        backgroundColor: "#fff",
                        position: "sticky",
                        top: 0,
                        zIndex: 999
                    }}
                >
                    <StyleHeader>
                        <div className="left">
                            <h3>
                                {
                                    admin_info.privilege === "sa_wwq5714806"
                                        ? "超级管理员"
                                        : admin_info.privilege === "ma_wwq5714806"
                                            ? "中级管理员"
                                            : "管理员"
                                }
                            </h3>
                        </div>
                        <div className="center">
                            <h3>{ wlcWrd }</h3>
                        </div>
                        <div
                            className="right"
                            style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <div
                                className="admin_info"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                    flexDirection: "column",
                                    height: "100%",
                                    marginRight: "10px",
                                    fontWeight: "bold"
                                }}
                            >
                                <span style={{ lineHeight: "initial" }}>{admin_info?.admin_name}</span>
                                <span style={{ lineHeight: "initial" }}>
                                    编号: {admin_info?.id}
                                </span>
                            </div>
                            <Avatar
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    backgroundColor: "#0094ff",
                                }}
                                size="large"
                            >
                                {admin_info.admin_name[0]}
                            </Avatar>
                            <Dropdown
                                menu={{ items: getDropItems(navigateTo) }}
                                destroyPopupOnHide={true}
                            >
                                <i
                                    className="iconfont icon-arrow-down-filling"
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 5,
                                        fontSize: 70,
                                        color: "transparent",
                                        cursor: "pointer"
                                    }}
                                ></i>
                            </Dropdown>
                        </div>
                    </StyleHeader>
                </Header>
                <Content
                    style={{
                        margin: "16px 16px 0",
                    }}
                >
                    <div
                        style={{
                            minHeight: 600,
                            background: "#fff",
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                        padding: "10px 50px"
                    }}
                >
                    <p>All right is preserved by Kkuil</p>
                    <p>In here, Thanks for Antd cooperation providing components support</p>
                </Footer>
            </Layout>
        </Layout>
    )
}

const mapStateToProps = ({ admin: { admin } }) => {
    return {
        admin_info: admin
    }
}

export default connect(mapStateToProps, {
    modify
})(MArticle)
