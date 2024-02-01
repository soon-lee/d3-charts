import {useEffect, useRef, useState} from "react";
import {TitlePlot, TitlePlotConfig} from "./TitlePlot.tsx";
import {Donut, PiePlot, PiePlotConfig, PiePlotItem} from "./PiePlot.tsx";
import {LegendItem, LegendPlot, LegendPlotConfig} from "./LegendPlot.tsx";
import {Font, Polygon} from "./elements.tsx";
import {TooltipPlot, TooltipPlotConfig, TooltipPlotData, TooltipPlotItem, TooltipPlotProps} from "./TooltipPlot.tsx";

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

    const [tooltipProps, setTooltipProps] = useState<TooltipPlotProps>({data: tooltipData, config: tooltipConfig})

    useEffect(() => {
        if (!svgRef.current) return;
        // select(svgRef.current).
    }, []);
    return <svg ref={svgRef} width={500} height={300}>
        <TitlePlot
            text={'config.title.text'}
            config={new TitlePlotConfig({
                x: 0, y: 0, position: 'left', length: 300, reverse: false, vertical: true
            })}
        />
        <LegendPlot config={legendConfig} data={legendData}/>
        <PiePlot
            data={{items: data}}
            config={new PiePlotConfig({
                onMouseOver: (e, d) => {
                    const tempItems: TooltipPlotItem[] = [];
                    tempItems.push(new TooltipPlotItem({
                        label: d.data.label,
                        value: d.data.value,
                        color: d.data.color
                    }));
                    const w = tooltipProps.config.rate ? 420 : 300;
                    const h = tooltipProps.config.sum ? 30 * tooltipProps.data.items.length + 80 : 30 * tooltipProps.data.items.length + 40;
                    const x = e.nativeEvent.offsetX + w > config.width ? config.width - w : e.nativeEvent.offsetX;
                    const y = e.nativeEvent.offsetY + h > config.height ? config.height - h : e.nativeEvent.offsetY;
                    setTooltipProps(prevState => ({
                        data: {
                            ...prevState.data,
                            items: tempItems,
                            total: tempItems.map(item => item.value).reduce((previousValue, currentValue) => previousValue + currentValue)
                        }, config: {
                            ...prevState.config, show: true, x: x, y: y
                        }
                    }));
                    e.stopPropagation();
                }, onMouseOut: () => {
                    setTooltipProps(prevState => ({
                        ...prevState, config: {...prevState.config, show: false, x: -1000, y: -1000}
                    }))
                }, onMouseMove: (e, d) => {
                    const tempItems: TooltipPlotItem[] = [];
                    tempItems.push(new TooltipPlotItem({label: d.label, value: d.value, color: d.color}));
                    const w = tooltipProps.config.rate ? 420 : 300;
                    const h = tooltipProps.config.sum ? 30 * tooltipProps.data.items.length + 80 : 30 * tooltipProps.data.items.length + 40;
                    const x = e.nativeEvent.offsetX + w > config.width ? config.width - w : e.nativeEvent.offsetX;
                    const y = e.nativeEvent.offsetY + h > config.height ? config.height - h : e.nativeEvent.offsetY;
                    setTooltipProps(prevState => ({
                        data: {
                            ...prevState.data,
                            items: tempItems,
                            total: tempItems.map(item => item.value).reduce((previousValue, currentValue) => previousValue + currentValue)
                        }, config: {
                            ...prevState.config, show: true, x: x, y: y
                        }
                    }));
                    e.stopPropagation();
                },
            })}
        />
        <TooltipPlot data={tooltipProps.data} config={tooltipProps.config}/>
    </svg>
};