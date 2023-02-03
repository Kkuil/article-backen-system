/**
 * 此函数用来存放activities的配置项
*/

import { Button, message, Popconfirm, Tooltip } from "antd"
import { delActivity } from "@/api/activity"

const confirmDel = async (activity, admin, dispatch) => {
    const { status, msg } = await delActivity(activity.id, admin.privilege)
    if (status === 200) {
        // 删除本地数据，增加用户体验
        dispatch({
            type: "activity/del_activity",
            payload: {
                id: activity.id
            }
        })
        message.success(msg, 2)
    } else {
        message.error(msg, 2)
    }
}

export const columns = (admin, dispatch) => {
    return [
        {
            title: "活动编号",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "活动主题",
            dataIndex: "act_name",
            key: "act_name",
        },
        {
            title: "活动发起者",
            dataIndex: "creator",
            key: "creator",
            render: (creator) => {
                return (
                    <Tooltip
                        title={() => {
                            return (
                                <>
                                    <div>工号：{creator.id}</div>
                                    <div>姓名：{creator.admin_name}</div>
                                    <div>权限：{creator.privilege}</div>
                                </>
                            )
                        }}
                    >
                        <span>{creator.admin_name}</span>
                    </Tooltip>
                )
            }
        },
        {
            title: "当前报名人数",
            dataIndex: "attendance",
            key: "attendance",
        },
        {
            title: "最大报名人数",
            dataIndex: "maxAttendance",
            key: "maxAttendance",
        },
        {
            title: "活动有效期",
            dataIndex: "timeRange",
            key: "timeRange",
        },
        {
            title: "活动封面",
            dataIndex: "cover",
            key: "cover",
        },
        {
            title: "查看详情",
            render: () => {
                return (
                    <Button type="primary">查看详情</Button>
                )
            },
        },
        {
            title: "删除",
            render: (activity) => {
                return (
                    <Popconfirm
                        title="确认删除此活动吗？"
                        onConfirm={() => confirmDel(activity, admin, dispatch)}
                        onCancel={() => message.success("取消成功", 2)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button type="default">删除活动</Button>
                    </Popconfirm>
                )
            },
        },
    ]
}

export const expandable = {
    expandedRowRender: (record) => <p>{record.act_content}</p>,
}