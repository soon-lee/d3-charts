import {useEffect, useRef} from "react";
import {TitlePlot, TitlePlotConfig} from "./TitlePlot.tsx";
import {Donut, PiePlot, PiePlotConfig, PiePlotItem} from "./PiePlot.tsx";
import {LegendItem, LegendPlot, LegendPlotConfig} from "./LegendPlot.tsx";
import {Font, Polygon} from "./elements.tsx";

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
export const PieChart = ({data, config}: PieProps) => {

    const svgRef = useRef(null);

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
            data={data}
            config={new PiePlotConfig({})}
        />
    </svg>
};