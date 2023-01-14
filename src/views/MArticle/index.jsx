import React, { useState, useEffect } from "react"
import { useNavigate, useLoaderData, Outlet, useLocation } from "react-router-dom"
import { Breadcrumb, Layout, Menu, theme } from "antd"
import { HeatMapOutlined, UserOutlined, UserSwitchOutlined, EditOutlined } from "@ant-design/icons"

const { Header, Content, Footer, Sider } = Layout
const items = [
    {
        label: "首页",
        key: "/main",
        icon: <HeatMapOutlined />
    },
    {
        label: "文章管理",
        key: "/article",
        icon: <EditOutlined />,
        children: [
            {
                label: "待审文章",
                key: "/article/check"
            },
            {
                label: "文章概览",
                key: "/article/articles"
            },
        ]
    },
    {
        label: "管理员管理",
        key: "/admin",
        icon: <UserSwitchOutlined />,
        children: [
            {
                label: "权限管理",
                key: "/admin/right"
            },
            {
                label: "成员管理",
                key: "/admin/members"
            }
        ]
    },
    {
        label: "用户管理",
        key: "/user",
        icon: <UserOutlined />,
        children: [
            {
                label: "用户概览",
                key: "/user/users"
            },
        ]
    }
]
export default function MArticle() {
    const [collapsed, setCollapsed] = useState(false)
    const navigateTo = useNavigate()
    const { pathname } = useLocation()
    const { status } = useLoaderData()
    useEffect(() => {
        if (status == 400) {
            navigateTo("/login")
        }
    }, [status])
    useEffect(() => {
        if(pathname == "/MArticle") {
            navigateTo("/mArticle/main")
        }
    }, [pathname])
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    function selected({ key }) {
        navigateTo(`/mArticle${key}`)
    }
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
                    defaultSelectedKeys={["/main"]}
                    mode="inline"
                    items={items}
                    onSelect={selected}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: "16px 0",
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 545,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    <p>All right is preserved by Kkuil</p>
                    <p>In here, Thanks for Antd cooperation providing components support</p>
                </Footer>
            </Layout>
        </Layout>
    )
}
