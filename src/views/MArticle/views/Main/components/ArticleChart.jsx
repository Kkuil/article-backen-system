import React, { createRef, useEffect } from "react"
import * as echarts from "echarts/core"
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from "echarts/components"
import { LineChart } from "echarts/charts"
import { UniversalTransition } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"
import styled from "styled-components"

const Chart = styled.div`
    width: 500px;
    height: 400px;
`

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
])

let data = []
let now = new Date(1997, 9, 3)
let oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000
for (var i = 0; i < 1000; i++) {
    data.push(randomData())
}
function randomData() {
    now = new Date(+now + oneDay)
    value = value + Math.random() * 21 - 10
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
            Math.round(value)
        ]
    }
}

var option = {
    title: {
        text: "Ky客文章日活量",
        bottom: "0",
        left: "center"
    },
    tooltip: {
        trigger: "axis",
        formatter: function (params) {
            params = params[0]
            var date = new Date(params.name)
            return (
                date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear() +
                " : " +
                params.value[1]
            )
        },
        axisPointer: {
            animation: true
        }
    },
    xAxis: {
        type: "time",
        splitLine: {
            show: true
        }
    },
    yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        splitLine: {
            show: true
        }
    },
    series: [
        {
            name: "Article Data",
            type: "line",
            showSymbol: false,
            data: data
        }
    ]
}

export default function ArticleChart() {
    var article_chart = createRef()
    useEffect(() => {
        var myChart = echarts.init(article_chart.current)
        option && myChart.setOption(option)
        setInterval(function () {
            for (var i = 0; i < 5; i++) {
                data.shift()
                data.push(randomData())
            }
            myChart.setOption({
                series: [
                    {
                        data
                    }
                ]
            })
        }, 1000)
    }, [])
    return (
        <Chart ref={article_chart}></Chart>
    )
}
