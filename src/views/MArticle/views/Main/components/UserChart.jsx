import React, { createRef, useEffect } from "react"
import styled from "styled-components"
import * as echarts from "echarts/core"
import {
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from "echarts/components"
import { LineChart, PieChart } from "echarts/charts"
import { UniversalTransition, LabelLayout } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    PieChart,
    CanvasRenderer,
    UniversalTransition,
    LabelLayout
])

const Chart = styled.div`
    width: 500px;
    height: 400px;
`

export default function UserChart() {
    const user_chart = createRef()
    useEffect(() => {        
        var myChart = echarts.init(user_chart.current)
        setTimeout(function () {
            var option = {
                title: {
                    text: "Ky客用户日活量",
                    bottom: "0",
                    left: "center"
                },
                legend: {},
                tooltip: {
                    trigger: "axis",
                    showContent: false
                },
                dataset: {
                    source: [
                        ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
                        ["Milk Tea", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                        ["Matcha Latte", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                        ["Cheese Cocoa", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                        ["Walnut Brownie", 25.2, 37.1, 41.2, 18, 33.9, 49.1]
                    ]
                },
                xAxis: { type: "category" },
                yAxis: { gridIndex: 0 },
                grid: { top: "55%" },
                series: [
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" }
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" }
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" }
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" }
                    },
                    {
                        type: "pie",
                        id: "pie",
                        radius: "30%",
                        center: ["50%", "25%"],
                        emphasis: {
                            focus: "self"
                        },
                        label: {
                            formatter: "{b}: {@2012} ({d}%)"
                        },
                        encode: {
                            itemName: "product",
                            value: "2012",
                            tooltip: "2012"
                        }
                    }
                ]
            }
            myChart.on("updateAxisPointer", function (event) {
                const xAxisInfo = event.axesInfo[0]
                if (xAxisInfo) {
                    const dimension = xAxisInfo.value + 1
                    myChart.setOption({
                        series: {
                            id: "pie",
                            label: {
                                formatter: "{b}: {@[" + dimension + "]} ({d}%)"
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    })
                }
            })
            myChart.setOption(option)
        })
    }, [])
    return (
        <Chart ref={user_chart}></Chart>
    )
}

