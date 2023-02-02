/**
 * mArticle配置文件，用来存放配置数据
*/

import { HeatMapOutlined, UserOutlined, UserSwitchOutlined, EditOutlined, FormOutlined } from "@ant-design/icons"

export const items = [
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
        label: "活动管理",
        key: "/activity",
        icon: <FormOutlined />,
        children: [
            {
                label: "活动概览",
                key: "/activity/activities"
            },
            {
                label: "发布文章",
                key: "/activity/publish"
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
    },
]