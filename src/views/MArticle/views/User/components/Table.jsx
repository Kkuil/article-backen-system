import { message, Table, Tooltip, Button } from "antd"
import React, { useEffect } from "react"
import { connect } from "react-redux"

import { GetUsers } from "@/api/user"
import { modify_search } from "@/store/modules/users"

const columns = [
    {
        title: "编号",
        dataIndex: "id",
        align: "center",
        fixed: "left",
        width: 150,
        ellipsis: {
            showTitle: false,
        },
        render: (article_id) => (
            <Tooltip placement="topLeft" title={article_id}>
                {article_id}
            </Tooltip>
        ),
    },
    {
        title: "用户名",
        dataIndex: "username",
        align: "center",
        fixed: "left",
        width: 80,
        ellipsis: {
            showTitle: false,
        },
        render: (username) => (
            <Tooltip placement="topLeft" title={username}>
                {username}
            </Tooltip>
        ),
    },
    {
        title: "密码",
        dataIndex: "password",
        align: "center",
        fixed: "left",
        width: 80,
        ellipsis: {
            showTitle: false,
        },
        render: (password) => (
            <Tooltip placement="topLeft" title={password}>
                {password}
            </Tooltip>
        ),
    },
    {
        title: "头像",
        dataIndex: "avatar",
        align: "center",
        fixed: "left",
        width: 80,
        ellipsis: {
            showTitle: false,
        },
        render: (avatar) => (
            <Tooltip placement="topLeft" title={avatar}>
                {avatar}
            </Tooltip>
        ),
    },
    {
        title: "电话",
        dataIndex: "phone_number",
        align: "center",
        fixed: "left",
        width: 80,
        ellipsis: {
            showTitle: false,
        },
        render: (phone) => (
            <Tooltip placement="topLeft" title={phone}>
                {phone}
            </Tooltip>
        ),
    },
    {
        title: "查看详情",
        dataIndex: "details",
        align: "center",
        fixed: "left",
        width: 100,
        ellipsis: {
            showTitle: false,
        },
        render: () => (
            <Button type="primary">查看详情</Button>
        ),
    },
]

function App({ admin, search, modify_search }) {
    useEffect(() => {
        async function fetchData() {
            const { users, total, status, msg } = await GetUsers({
                privilege: admin.privilege
            })
            if (status === 110 || status === 400) {
                message.error(msg, 3)
                return
            }
            modify_search({
                users,
                total
            })
        }
        fetchData()
    }, [])
    return (
        <>
            <Table
                columns={columns}
                dataSource={search.users}
                pagination={{
                    position: "bottomCenter",
                    pageSize: search.limit,
                    defaultCurrent: 1,
                    total: search.total,
                    onChange: async (page) => {
                        const { users, total, status, msg } = await GetUsers({
                            limit: search.limit,
                            offset: page - 1,
                            privilege: admin.privilege
                        })
                        if(status === 110 || status === 400) {
                            message.error(msg, 3)
                            return 
                        }
                        modify_search({
                            users,
                            total,
                            offset: page - 1
                        })
                    }
                }}
                scroll={{
                    x: 1000,
                }}
            />
            {/* {
                observing_user.isObserving
                &&
                <ObserveModel user={observing_user.user} />
            } */}
        </>
    )
}

const mapStateToProps = ({ admin: { admin }, users: { search } }) => {
    return {
        admin,
        search
    }
}

const mapDispatchToProps = {
    modify_search
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
