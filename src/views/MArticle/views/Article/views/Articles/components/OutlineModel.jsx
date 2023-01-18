import React from "react"
import { createPortal } from "react-dom"
import { Button, message } from "antd"
import { useDispatch, connect } from "react-redux"
import styled from "styled-components"
import { PassCheck } from "@/api/check_article"
import { useNavigate } from "react-router-dom"

const CheckingModel = styled.div`
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    .box {
        position: relative;
        width: 500px;
        height: 450px;
        border-radius: 20px;
        background-color: #fff;
        padding: 20px;
        > div {
            display: flex;
            align-items: center;
            height: 45px;
            font-size: 16px;
            font-weight: bold;
        }
        .kits {
            position: absolute;
            bottom: 20px;
            width: 100%;
            button {
                margin: 0 10px;
            }
        }
    }
`

function CheckModel({ article, check_article, admin }) {
    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    return createPortal((
        <CheckingModel className="model flex_center">
            <div className="box">
                <div className="username">
                    <span>发布者：</span>
                    <span>{article.username}</span>
                </div>
                <div className="article_id">
                    <span>编号：</span>
                    <span>{article.article_id}</span>
                </div>
                <div className="title">
                    <span>标题：</span>
                    <span>{article.title}</span>
                </div>
                <div className="content">
                    <span>发布内容：</span>
                    <p>{article.content}</p>
                </div>
                <div className="username">
                    <span>上传时间：</span>
                    <span>{article.upload_time}</span>
                </div>
                <div className="kits flex_center">
                    <Button onClick={() => {
                        dispatch({
                            type: "checking_article/change",
                            isChecking: false
                        })
                    }}>取消</Button>
                    {/* <Button
                        type="default"
                        danger
                    >打回</Button> */}
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { status, msg } = await PassCheck(article.article_id, admin.privilege)
                            if(status === 110) {
                                message.error(msg, 3, () => {
                                    navigateTo("/main")
                                })
                            } else if (status === 400) {
                                message.error(msg, 3)
                            } else {
                                message.success(msg, 3)
                                dispatch({
                                    type: "check_article/modify",
                                    payload: {
                                        articles: check_article.articles.filter(item => item.article_id !== article.article_id)
                                    }
                                })
                            }
                            dispatch({
                                type: "checking_article/change",
                                isChecking: false
                            })
                        }}
                    >通过审核</Button>
                </div>
            </div>
        </CheckingModel>
    ), document.body)
}

const mapStateToProps = state => {
    return {
        admin: state.admin.admin,
        check_article: state.check_article.check_article
    }
}

export default connect(mapStateToProps)(CheckModel)