import React from "react"
import { createPortal } from "react-dom"
import { Button } from "antd"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const Observing = styled.div`
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
        border-radius: 20px;
        background-color: #fff;
        padding: 20px;
        > div {
            display: flex;
            height: 40px;
            font-size: 16px;
            font-weight: bold;
        }
        .title {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .content {
            height: auto;
            min-height: 40px;
            max-height: 100px;
            overflow: scroll;
            .words {
                width: 20%;
                position: sticky;
                left: 0;
                top: 0;
            }
            p {
                width: 80%;
            }
        }
        .kits {
            height: 40px;
        }
    }
`

export default function ObserveModel({ article }) {
    const dispatch = useDispatch()
    return createPortal((
        <Observing className="model flex_center">
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
                    <div className="words">发布内容：</div>
                    <p>{article.content}</p>
                </div>
                <div className="publish_time">
                    <span>发布时间：</span>
                    <span>{article.publish_time}</span>
                </div>
                <div className="status">
                    <span>当前状态：</span>
                    <span>{article.status}</span>
                </div>
                <div className="views">
                    <span>总浏览数：</span>
                    <span>{article.views}</span>
                </div>
                <div className="like">
                    <span>总喜欢数：</span>
                    <span>{article.like}</span>
                </div>
                <div className="comments">
                    <span>总评论数：</span>
                    <span>{article.comments}</span>
                </div>
                <div className="kits flex_center">
                    <Button onClick={() => {
                        dispatch({
                            type: "articles/modify_observing",
                            isObserving: false
                        })
                    }}>取消</Button>
                </div>
            </div>
        </Observing>
    ), document.body)
}
