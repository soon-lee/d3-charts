import {useEffect, useRef, useState} from "react";
import {TitlePlot, TitlePlotConfig} from "./TitlePlot.tsx";
import {Donut, PiePlot, PiePlotConfig, PiePlotItem} from "./PiePlot.tsx";
import {LegendItem, LegendPlot, LegendPlotConfig} from "./LegendPlot.tsx";
import {Font, Polygon} from "./elements.tsx";
import {TooltipPlotConfig, TooltipPlotData, TooltipPlotItem, TooltipPlotProps} from "./TooltipPlot.tsx";
import {TextPlot, TextPlotConfig} from "./TextPlot.tsx";
import {ShapePlot, ShapePlotConfig} from "./ShapePlot.tsx";

export interface PieConfig {
    width: number,
    height: number,
}

export interface PieProps {
    data: PiePlotItem[],
    donut: Donut,
    config: PieConfig
}

const legendData: LegendItem[] = [new LegendItem({color: 'red'}), new LegendItem({color: 'blue'}), new LegendItem({color: 'green'}), new LegendItem({color: 'yellow'}), new LegendItem({color: 'orange'}), new LegendItem({color: 'purple'}), new LegendItem({color: 'pink'})]
const legendConfig = new LegendPlotConfig({
    x: 0, y: 50, length: 100, cross: 30, position: 'top', polygon: new Polygon({shape: 'line'}), font: new Font(null)
});

const tooltipItems = [new TooltipPlotItem({
    label: 'label0', value: 100, color: 'red'
}), new TooltipPlotItem({label: 'label1', value: 100, color: 'blue'}), new TooltipPlotItem({
    label: 'label2', value: 100, color: 'green'
}), new TooltipPlotItem({label: 'label3', value: 100, color: 'yellow'}), new TooltipPlotItem({
    label: 'label4', value: 100, color: 'orange'
})]
const tooltipData = new TooltipPlotData({
    items: tooltipItems, total: tooltipItems.map(item => item.value).reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    })
});
const tooltipConfig = new TooltipPlotConfig({x: 100, y: 100, rate: false, sum: false})
export const PieChart = ({data, config}: PieProps) => {

    const svgRef = useRef(null);
    const divRef = useRef(null)
    const [tooltipProps, setTooltipProps] = useState<TooltipPlotProps>({data: tooltipData, config: tooltipConfig})
    const [pos, setPos] = useState({x: -1000, y: -1000})
    const [zindex, setZIndex] = useState(0)
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (!svgRef.current) return;
        // select(svgRef.current).
    }, []);
    return <>
        {/*<div ref={divRef} style={{*/}
        {/*    position: 'absolute',*/}
        {/*    top: 0,*/}
        {/*    left: 0,*/}
        {/*    width: '100%',*/}
        {/*    height: '100%',*/}
        {/*}}>*/}
        {/*    <svg opacity={show ? 1 : 0} style={{backgroundColor: 'lightgray'}} width={420}*/}
        {/*         height={30 * data.length + 80} x={0}*/}
        {/*         y={0} transform={`translate(${pos.x},${pos.y})`}*/}
        {/*         viewBox={`0 0 420 ${30 * data.length + 80}`}>*/}
        {/*        /!*<rect x={0} y={0} rx="5" ry="5" width={420}*!/*/}
        {/*        /!*      height={30 * data.length + 80}*!/*/}
        {/*        /!*      fill={'lightgray'}/>*!/*/}
        {/*        <TextPlot text={'data.title'}*/}
        {/*                  config={new TextPlotConfig({x: 10, y: 20})}/>*/}
        {/*        {data.map((item, index) => {*/}
        {/*            return <g key={index} style={{zIndex: zindex}}>*/}
        {/*                <ShapePlot config={new ShapePlotConfig({*/}
        {/*                    x: 10, y: (index) * 30 + 30*/}
        {/*                })}/>*/}
        {/*                <TextPlot text={item.label} config={new TextPlotConfig({*/}
        {/*                    x: 60, y: (index) * 30 + 45*/}
        {/*                })}/>*/}
        {/*                <TextPlot text={item.value.toFixed(2)} config={new TextPlotConfig({*/}
        {/*                    x: 180, y: (index) * 30 + 45*/}
        {/*                })}/>*/}
        {/*                <TextPlot text={`(${(item.value / data.map(item => item.value).reduce((prev, curr) => {*/}
        {/*                    return prev + curr;*/}
        {/*                }) * 100).toFixed(2)}%)`}*/}
        {/*                          config={new TextPlotConfig({*/}
        {/*                              x: 300,*/}
        {/*                              y: (index) * 30 + 45*/}
        {/*                          })}/>*/}
        {/*            </g>*/}
        {/*        })}*/}
        {/*        <TextPlot text={`总计: ${17.4549586.toFixed(2)}`} config={new TextPlotConfig({*/}
        {/*            x: 10,*/}
        {/*            y: 30 * data.length + 40,*/}
        {/*            font: new Font({size: 16, weight: 'bold'})*/}
        {/*        })}/>*/}
        {/*    </svg>*/}
        {/*</div>*/}
        <svg ref={svgRef} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%', overflow: 'visible'
        }}>

            <TitlePlot
                text={'config.title.text'}
                config={new TitlePlotConfig({
                    x: 0, y: 0, position: 'left', length: 300, reverse: false, vertical: true
                })}
            />
            <LegendPlot config={legendConfig} data={legendData}/>
            {/*<TooltipPlot data={tooltipProps.data} config={tooltipProps.config}/>*/}
            <PiePlot
                data={{items: data}}
                config={new PiePlotConfig({
                    onMouseOver: (e, d) => {
                        setShow(true)
                        setPos({
                            x: e.nativeEvent.offsetX - 420,
                            y: e.nativeEvent.offsetY - (data.length * 30 + 80)
                        })
                    }, onMouseOut: () => {
                        setShow(false)
                    }, onMouseMove: (e, d) => {

                    },
                })}
            />
            <g opacity={show ? 1 : 0}>
                <rect x={pos.x} y={pos.y} rx="5" ry="5" width={420}
                      height={30 * data.length + 80}
                      fill={'lightgray'}/>
                <TextPlot text={'data.title'}
                          config={new TextPlotConfig({x: pos.x + 10, y: pos.y + 20})}/>
                {data.map((item, index) => {
                    return <g key={index}>
                        <ShapePlot config={new ShapePlotConfig({
                            x: pos.x + 10, y: pos.y + (index) * 30 + 30
                        })}/>
                        <TextPlot text={item.label} config={new TextPlotConfig({
                            x: pos.x + 60, y: pos.y + (index) * 30 + 45
                        })}/>
                        <TextPlot text={item.value.toFixed(2)} config={new TextPlotConfig({
                            x: pos.x + 180, y: pos.y + (index) * 30 + 45
                        })}/>
                        <TextPlot text={`(${(item.value / data.map(item => item.value).reduce((prev, curr) => {
                            return prev + curr;
                        }) * 100).toFixed(2)}%)`}
                                  config={new TextPlotConfig({
                                      x: pos.x + 300,
                                      y: pos.y + (index) * 30 + 45
                                  })}/>
                    </g>
                })}
                <TextPlot text={`总计: ${17.4549586.toFixed(2)}`} config={new TextPlotConfig({
                    x: pos.x + 10,
                    y: pos.y + 30 * data.length + 40,
                    font: new Font({size: 16, weight: 'bold'})
                })}/></g>
        </svg>

    </>
};