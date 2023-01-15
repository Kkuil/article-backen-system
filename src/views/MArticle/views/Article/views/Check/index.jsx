import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { Input, message, Select } from "antd"
import { connect } from "react-redux"

import { modify } from "@/store/modules/check_article"

import { GetCheckArticles } from "@/api/check_article"

import Table from "./components/Table"
import { useNavigate } from "react-router-dom"

const StyleSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    .searchInput {
        width: 300px;
    }
    .sort {
        margin: 0 20px;
    }
    .returnLimit {
    }
`

const CheckList = styled.div`
`

const { Search } = Input
function Check({ admin, check_article, modify }) {
    const navigateTo = useNavigate()
    const check = useRef()
    // const [sortType, setSortType] = useState("article_id")
    // 监页面变化
    useEffect(() => {
        check.current.onresize = function (e) {
            console.log(e.target)
        }
        console.dir(check.current)
    }, [check])
    // 获取未审核数据
    useEffect(() => {
        async function fetchData() {
            const { data, status, msg } = await GetCheckArticles({
                limit: 10,
                privilege: admin.privilege
            })
            if (status === 400) {
                message.error(msg)
            } else if (status === 150) {
                message.error(msg, 3, () => {
                    navigateTo("/mArticle/main")
                })
            }
            modify({
                articles: data.data,
                total: data.total
            })
        }
        fetchData()
    }, [admin])
    const search = async value => {
        const { data, status, msg } = await GetCheckArticles({
            searchValue: value,
            limit: check_article.limit,
            privilege: admin.privilege
        })
        if (status === 400) {
            message.error(msg)
        } else if (status === 150) {
            message.error(msg, 3, () => {
                navigateTo("/mArticle/main")
            })
        }
        modify({
            searchValue: value,
            articles: data.data,
            total: data.total
        })
    }
    return (
        <div className="check" ref={check}>
            <StyleSearch className="search">
                <Search
                    className="searchInput"
                    placeholder="请输入你想要搜索的内容"
                    enterButton="搜索"
                    size="large"
                    onSearch={search}
                />
                {/* 排序方式 */}
                {/* <div className="sort">
                    <span>排序方式：</span>
                    <Select
                        defaultValue="id"
                        style={{
                            width: 110,
                        }}
                        options={[
                            {
                                value: "article_id",
                                label: "id",
                            },
                            {
                                value: "username",
                                label: "username",
                            }
                        ]}
                        onChange={(value) => {
                            setSortType(value)
                        }}
                    />
                </div> */}
                {/* 限制条数 */}
                <div
                    className="returnLimit"
                    style={{
                        marginLeft: "20px"
                    }}
                >
                    <span>限制条数：</span>
                    <Select
                        defaultValue="10"
                        style={{
                            width: 60
                        }}
                        options={[
                            {
                                value: "10",
                                label: "10",
                            },
                            {
                                value: "50",
                                label: "50",
                            },
                            {
                                value: "100",
                                label: "100",
                            },
                        ]}
                        onChange={async value => {
                            const { data, status, msg } = await GetCheckArticles({
                                searchValue: check_article.searchValue,
                                limit: value,
                                offset: check_article.offset,
                                privilege: admin.privilege
                            })
                            if (status === 400) {
                                message.error(msg)
                            } else if (status === 150) {
                                message.error(msg, 3, () => {
                                    navigateTo("/mArticle/main")
                                })
                            }
                            modify({
                                articles: data.data,
                                total: data.total,
                                limit: +value
                            })
                        }}
                    />
                </div>
            </StyleSearch>
            <CheckList className="check_list">
                <Table data={{
                    articles: check_article.articles,
                    total: check_article.total
                }} />
            </CheckList>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        admin: state.admin.admin,
        check_article: state.check_article.check_article
    }
}

const mapDispatchToProps = {
    modify
}

export default connect(mapStateToProps, mapDispatchToProps)(Check)
