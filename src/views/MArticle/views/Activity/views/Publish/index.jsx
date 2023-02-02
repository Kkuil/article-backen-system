import React, { useState } from "react"
import { connect } from "react-redux"
import { PlusOutlined } from "@ant-design/icons"
import {
    Form,
    Input,
    Button,
    DatePicker,
    Upload,
    Select,
    message,
} from "antd"
import { nanoid } from "nanoid"
import { publish as issue } from "@/api/activity"
import { useNavigate } from "react-router-dom"

const { RangePicker } = DatePicker
const { TextArea } = Input

function Publish({ admin }) {
    const navigateTo = useNavigate()
    let act_info = new FormData()
    const [info, setInfo] = useState({
        id: nanoid(8),
        creator: JSON.stringify(admin),
        act_name: "",
        act_content: "",
        timeRange: "",
        maxAttendance: 100,
        cover: null,
    })
    const publish = async () => {
        if (
            info.id
            &&
            info.creator
            &&
            info.act_name
            &&
            info.timeRange
            &&
            info.maxAttendance
            &&
            info.act_content
            &&
            info.cover
        ) {
            for (const p in info) {
                act_info.append([p], info[p])
            }
            const { status, msg } = await issue(act_info, admin.privilege)
            if (status === 200) {
                message.success(msg, 1, function () {
                    navigateTo("/mArticle/activity/activities")
                })
            } else {
                message.error(msg, 3)
            }
        } else message.error("必填字段不能为空", 2)
    }
    return (
        <div
            className="flex_center"
            style={{
                padding: "20px 0",
                flexDirection: "column"
            }}
        >
            <>
                <h2 style={{
                    marginBottom: "20px"
                }}>创建活动</h2>
                <Form
                    layout="horizontal"
                >
                    <Form.Item label="id" required>
                        <Input value={info.id} disabled />
                    </Form.Item>
                    <Form.Item label="创建人" required>
                        <Input value={JSON.parse(info.creator).admin_name} disabled />
                    </Form.Item>
                    <Form.Item label="活动标题" required>
                        <Input
                            value={info.act_name}
                            placeholder="请输入活动标题"
                            onChange={e => setInfo({
                                ...info,
                                act_name: e.target.value
                            })}
                        />
                    </Form.Item>
                    <Form.Item label="活动有效期" required>
                        <RangePicker
                            onChange={value => setInfo({
                                ...info,
                                timeRange: value
                            })}
                        />
                    </Form.Item>
                    <Form.Item label="最大报名人数" required>
                        <Select defaultValue={info.maxAttendance}>
                            <Select.Option value={50}>50</Select.Option>
                            <Select.Option value={100}>100</Select.Option>
                            <Select.Option value={200}>200</Select.Option>
                            <Select.Option value={500}>500</Select.Option>
                            <Select.Option value={1000}>1000</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item value={info.act_content} label="活动内容(介绍)" required>
                        <TextArea
                            rows={4}
                            placeholder="请填写活动相关内容（介绍）"
                            onChange={e => setInfo({
                                ...info,
                                act_content: e.target.value
                            })}
                        />
                    </Form.Item>
                    <Form.Item label="上传活动封面" valuePropName="fileList" required>
                        <Upload
                            maxCount={1}
                            listType="picture-card"
                            onChange={imgInfo => setInfo({
                                ...info,
                                cover: imgInfo.file
                            })}
                            beforeUpload={() => false}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>上传封面</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item className="flex_center">
                        {/* <Button>暂存</Button> */}
                        <Button
                            type="primary"
                            onClick={publish}
                        >发布</Button>
                    </Form.Item>
                </Form>
            </>
        </div>
    )
}

const mapStateToProps = ({ admin: { admin } }) => {
    return {
        admin
    }
}

export default connect(mapStateToProps)(Publish)
