import React from "react"
import styled from "styled-components"
import { Input, message, Select } from "antd"
import Table from "../../components/Table"
import { connect } from "react-redux"

import { GetUsers } from "@/api/user"
import { modify_search } from "@/store/modules/users"

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
function Users({ admin, search, modify_search }) {
    return (
        <>
            <div>
                <StyleSearch className="search">
                    <Search
                        className="searchInput"
                        placeholder="请输入你想要搜索的用户名"
                        enterButton="搜索"
                        size="large"
                        onSearch={async (searchValue) => {
                            const { users, total, status, msg } = await GetUsers({
                                searchValue,
                                limit: search.limit,
                                offset: search.offset,
                                privilege: admin.privilege,
                            })
                            if (status === 110 || status === 400) {
                                message.error(msg, 3)
                                return
                            }
                            modify_search({
                                searchValue,
                                users,
                                total
                            })
                        }}
                    />
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
                            onChange={async (limit) => {
                                const { users, total, status, msg } = await GetUsers({
                                    searchValue: search.searchValue,
                                    limit: limit,
                                    offset: search.offset,
                                    privilege: admin.privilege,
                                })
                                if (status === 110 || status === 400) {
                                    message.error(msg, 3)
                                    return
                                }
                                modify_search({
                                    users,
                                    limit,
                                    total
                                })
                            }}
                        />
                    </div>
                </StyleSearch>
            </div>
            <Table />
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)
