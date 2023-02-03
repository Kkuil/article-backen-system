import React, { useEffect } from "react"
import { message, Table } from "antd"

import { columns, expandable } from "./outline.config"
import { getActivities } from "@/api/activity"
import { useDispatch, connect } from "react-redux"

function Activities({ activities, admin }) {
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchData() {
            const { status, activities } = await getActivities({
                offset: 0,
                nums: 10
            })
            if (status !== 200) {
                message.error("查询失败", 3)
            } else {
                dispatch({
                    type: "activity/save_activities",
                    payload: {
                        activities
                    }
                })
            }
        }
        fetchData()
    }, [])
    return (
        <Table
            columns={columns(admin, dispatch).map(c => {
                return {
                    ...c,
                    ellipsis: true,
                    align: "center"
                }
            })}
            expandable={expandable}
            dataSource={activities}
        />
    )
}

const mapStateToProps = ({ activity: { activities }, admin: { admin } }) => {
    return {
        activities,
        admin
    }
}

export default connect(mapStateToProps)(Activities)
