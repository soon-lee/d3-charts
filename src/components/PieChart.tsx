import {useRef, useState} from "react";
import {TitlePlot, TitlePlotConfig} from "./TitlePlot.tsx";
import {Donut, PiePlot, PiePlotConfig, PiePlotItem} from "./PiePlot.tsx";
import {LegendPlot, LegendPlotConfig, LegendPlotData, LegendPlotItem, LegendPlotProps} from "./LegendPlot.tsx";
import {TooltipPlot, TooltipPlotConfig, TooltipPlotData, TooltipPlotItem, TooltipPlotProps} from "./TooltipPlot.tsx";
import {GroupedPolygon, Polygon} from "./elements.tsx";

export interface PieConfig {
    width: number,
    height: number,
}

export interface PieProps {
    data: PiePlotItem[],
    donut: Donut,
    config: PieConfig
}

export const PieChart = ({data, config}: PieProps) => {

    const svgRef = useRef(null);
    const [legendProps, setLegendProps] = useState<LegendPlotProps>({
        data: new LegendPlotData({
            items: data.map((item, index) => {
                return new LegendPlotItem(
                    {
                        key: index.toString(),
                        label: item.label,
                        color: item.color
                    }
                )
            }),
        }),
        config: new LegendPlotConfig({
            polygons: data.map(item => {
                return new Polygon({
                    shape: 'rect',
                    size: 'medium',
                    fill: item.color,
                    stroke: 'black'
                })
            })
        })
    });
    const [tooltipProps, setTooltipProps] = useState<TooltipPlotProps>({
        data: new TooltipPlotData({
            title: 'dfg',
            total: data.map(item => item.value).reduce((prev, curr) => prev + curr)
        }),
        config: new TooltipPlotConfig({
            polygon: data.map(item => {
                return new GroupedPolygon({
                    polygon: new Polygon({
                        fill: item.color
                    })
                })
            })
        })
    });

    return <svg style={{
        width: config.width, height: config.height, overflow: 'visible'
    }}>

        <TitlePlot
            text={'config.title.text'}
            config={new TitlePlotConfig({
                x: 0, y: 0, position: 'left', length: 300, reverse: false, vertical: true
            })}
        />
        <LegendPlot data={legendProps.data} config={legendProps.config}/>
        <TooltipPlot data={tooltipProps.data} config={tooltipProps.config}/>
        <PiePlot
            data={{items: data}}
            config={new PiePlotConfig({
                onMouseOver: (e, d) => {
                    setTooltipProps(prev => ({
                        data: {
                            ...prev.data,
                            items: [new TooltipPlotItem({
                                color: d.data.color,
                                label: d.data.label,
                                value: d.data.value
                            })]
                        },
                        config: {
                            ...prev.config,
                            show: true,
                        }
                    }))
                }, onMouseOut: () => {
                    setTooltipProps(prev => ({
                        ...prev,
                        config: {
                            ...prev.config,
                            show: false,
                        }
                    }))
                }, onMouseMove: (e, d) => {

                },
            })}
        />

    </svg>
};