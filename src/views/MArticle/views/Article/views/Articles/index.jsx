import React, { useEffect } from "react"
import styled from "styled-components"
import { Input, Select } from "antd"
import { useDispatch } from "react-redux"
import { connect } from "react-redux"

import { modify_search } from "@/store/modules/articles"

import { GetArticles } from "@/api/article"

import Table from "./components/Table"

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
`
const { Search } = Input
const searchI = async (value, admin, modify_search) => {
    const { article: { articles, total } } = await GetArticles({
        searchValue: value,
        privilege: admin.privilege
    })
    console.log(articles)
    modify_search({
        articles,
        total,
        searchValue: value
    })
}

function Articles({ admin, search, modify_search }) {
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchData() {
            const { article: { articles, total } } = await GetArticles({
                privilege: admin.privilege
            })
            dispatch({
                type: "articles/modify_search",
                payload: {
                    articles,
                    total
                }
            })
        }
        fetchData()
    }, [])
    return (
        <>
            <div>
                <StyleSearch className="search">
                    <Search
                        className="searchInput"
                        placeholder="请输入你想要搜索的内容"
                        enterButton="搜索"
                        size="large"
                        onSearch={(value) => searchI(value, admin, modify_search)}
                    />
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
                            onChange={async (val) => {
                                const { article: { articles, total } } = await GetArticles({
                                    searchValue: search.searchValue,
                                    offset: search.offset,
                                    limit: val,
                                    privilege: admin.privilege
                                })
                                console.log(val, articles, total)
                                dispatch({
                                    type: "articles/modify_search",
                                    payload: {
                                        articles,
                                        total,
                                        limit: +val
                                    }
                                })
                            }}
                        />
                    </div>
                </StyleSearch>
            </div>
            <Table data={{
                articles: search.articles,
                total: search.total
            }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
