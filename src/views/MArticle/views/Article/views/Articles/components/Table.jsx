import { Table, Button, Tooltip, Tag, message } from "antd"
import React from "react"
import { connect } from "react-redux"

import { modify_search } from "@/store/modules/articles"

import { GetArticles } from "@/api/article"

import { Recommend } from "@/api/article"

// import { useNavigate } from "react-router-dom"
// import OutlineModel from "./OutlineModel"

const getColumns = (admin, search, modify_search) => {
    return [
        {
            title: "编号",
            dataIndex: "article_id",
            key: "article_id",
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
            title: "标题",
            dataIndex: "title",
            align: "center",
            width: 150,
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
            width: 200,
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
            title: "发布时间",
            dataIndex: "publish_time",
            align: "center",
            width: 150,
            ellipsis: {
                showTitle: false,
            },
            render: (publish_time) => (
                <Tooltip placement="topLeft" title={publish_time}>
                    {publish_time}
                </Tooltip>
            ),
        },
        {
            title: "状态",
            dataIndex: "status",
            align: "center",
            width: 100,
            render: status => {
                return <Tag color="pink">{status}</Tag>
            }
        },
        {
            title: "浏览",
            dataIndex: "views",
            align: "center"
        },
        {
            title: "喜欢",
            dataIndex: "like",
            align: "center",
        },
        {
            title: "评论",
            dataIndex: "comments",
            align: "center",
        },
        {
            title: "上推荐",
            dataIndex: "recommend",
            align: "center",
            fixed: "right",
            width: 110,
            render: (_, info) => {
                console.log(_)
                return (
                    <Button
                        danger
                        disabled={info.status === "已上推荐"}
                        onClick={async () => {
                            // 上推荐
                            const { status, msg } = await Recommend({
                                article_id: info.article_id,
                                privilege: admin.privilege
                            })
                            if (status === 400) {
                                message.error(msg, 3)
                            } else {
                                message.success(msg, 3)
                            }
                            modify_search({
                                articles: search.articles.map(item => {
                                    if (item.article_id === info.article_id) {
                                        item.status = "已上推荐"
                                    }
                                    return item
                                })
                            })
                        }}
                    >{info.status === "已上推荐" ? "已上推荐" : "上推荐"}</Button>
                )
            },
        },
        {
            title: "查看",
            dataIndex: "details",
            align: "center",
            fixed: "right",
            width: 120,
            render: () => {
                return (
                    <Button type="primary">查看详情</Button>
                )
            },
        },
    ]
}

function App({ data: { articles, total }, admin, search, modify_search }) {
    // const navigateTo = useNavigate()
    return (
        <>
            <Table
                columns={getColumns(admin, search, modify_search)}
                dataSource={articles}
                pagination={{
                    position: "bottomCenter",
                    pageSize: search.limit,
                    defaultCurrent: 1,
                    total,
                    onChange: async (page) => {
                        const { article: { articles, total } } = await GetArticles({
                            searchValue: search.searchValue,
                            offset: page - 1,
                            limit: search.limit,
                            privilege: admin.privilege
                        })
                        modify_search({
                            articles,
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
                checking_article.isChecking
                &&
                <OutlineModel article={checking_article.article} />
            } */}
        </>
    )
}

const mapStateToProps = ({ admin: { admin }, articles: { search } }) => {
    return {
        admin,
        search
    }
}

const mapDispatchToProps = {
    modify_search
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
