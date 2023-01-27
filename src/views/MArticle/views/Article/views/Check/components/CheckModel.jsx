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
        width: 500px;
        border-radius: 20px;
        background-color: #fff;
        padding: 20px;
        overflow: hidden;
        > div {
            display: flex;
            height: 45px;
            font-size: 16px;
            font-weight: bold;
        }
        .kits {
            z-index: 999;
            width: 100%;
            height: 60px;
            button {
                margin: 0 10px;
            }
        }
        .title {
            .words {
                width: 75px;
            }
        }
        .content {
            height: 320px;
            .words {
                width: 200px;
            }
            p {
                height: 300px;
                overflow: scroll;
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
                    <span className="words">标题：</span>
                    <span>{article.title}</span>
                </div>
                <div className="content">
                    <span className="words">发布内容：</span>
                    <p>{article.content}</p>
                </div>
                <div className="upload_time">
                    <span>上传时间：</span>
                    <span>{article.upload_time}</span>
                </div>
                <div className="kits flex_center">
                    <Button onClick={() => {
                        dispatch({
                            type: "check_article/modify_checking",
                            isChecking: false
                        })
                    }}>取消</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { status, msg } = await PassCheck(article.article_id, admin.privilege)
                            if (status === 110) {
                                message.error(msg, 3, () => {
                                    navigateTo("/main")
                                })
                            } else if (status === 400) {
                                message.error(msg, 3)
                            } else {
                                message.success(msg, 3)
                                dispatch({
                                    type: "check_article/modify_search",
                                    payload: {
                                        articles: check_article.search.articles.filter(item => item.article_id !== article.article_id)
                                    }
                                })
                            }
                            dispatch({
                                type: "check_article/modify_checking",
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
        check_article: state.check_article
    }
}

export default connect(mapStateToProps)(CheckModel)
