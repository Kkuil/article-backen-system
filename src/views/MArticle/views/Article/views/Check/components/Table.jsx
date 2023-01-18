import { Table, Button, Tooltip, Tag, message } from "antd"
import React, { useState } from "react"
import { connect } from "react-redux"
import { modify_search } from "@/store/modules/check_article"
import { useDispatch } from "react-redux"

import { GetCheckArticles } from "@/api/check_article"
import { useNavigate } from "react-router-dom"
import CheckModel from "./CheckModel"

const columns = [
    {
        title: "编号",
        dataIndex: "article_id",
        key: "article_id",
        align: "center",
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
        title: "标题",
        dataIndex: "title",
        align: "center",
        ellipsis: {
            showTitle: false,
        },
        render: (title) => (
            <Tooltip placement="topLeft" title={title}>
                {title}
            </Tooltip>
        ),
    },
    {
        title: "内容",
        dataIndex: "content",
        align: "center",
        ellipsis: {
            showTitle: false,
        },
        render: (content) => (
            <Tooltip placement="topLeft" title={content}>
                {content}
            </Tooltip>
        ),
    },
    {
        title: "上传时间",
        dataIndex: "upload_time",
        align: "center",
        ellipsis: {
            showTitle: false,
        },
        render: (update_time) => (
            <Tooltip placement="topLeft" title={update_time}>
                {update_time}
            </Tooltip>
        ),
    },
    {
        title: "状态",
        dataIndex: "status",
        align: "center",
        render: () => {
            return <Tag color="pink">未审核</Tag>
        }
    },
    {
        title: "操作",
        dataIndex: "actions",
        align: "center",
        ellipsis: {
            showTitle: false,
        },
        render: (_, info) => {
            const dispatch = useDispatch()
            console.log(_)
            return (
                <Tooltip placement="topLeft">
                    <Button
                        type="primary"
                        onClick={() => {
                            dispatch({
                                type: "check_article/modify_checking",
                                article: info,
                                isChecking: true
                            })
                        }}
                    >进入审核</Button>
                </Tooltip>
            )
        },
    }
]
function App({ data, check_article, admin, modify_search }) {
    const navigateTo = useNavigate()
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    }
    return (
        <>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data.articles}
                pagination={{
                    pageSize: check_article.search.limit,
                    position: "bottomCenter",
                    defaultCurrent: 1,
                    total: data.total,
                    onChange: async (page, pageSize) => {
                        const { data, status, msg } = await GetCheckArticles({
                            searchValue: check_article.search.searchValue,
                            limit: check_article.search.limit,
                            offset: (page - 1) * pageSize,
                            privilege: admin.privilege
                        })
                        if (status === 400) {
                            message.error(msg)
                        } else if (status === 150) {
                            message.error(msg, 3, () => {
                                navigateTo("/mArticle/main")
                            })
                        }
                        modify_search({
                            offset: (page - 1) * pageSize,
                            articles: data.data,
                            total: data.total
                        })
                    }
                }}
            />
            {
                check_article.checking_article.isChecking
                &&
                <CheckModel article={check_article.checking_article.article} />
            }
        </>
    )
}

const mapStateToProps = ({ check_article, admin: { admin } }) => {
    return {
        check_article,
        admin,
    }
}

const mapDispatchToProps = {
    modify_search
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
