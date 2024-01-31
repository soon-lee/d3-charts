import {useEffect, useRef} from "react";
import {TitlePlot} from "./TitlePlot.tsx";
import {Donut, PieItem, PiePlot} from "./PiePlot.tsx";
import {LegendItem, LegendPlot} from "./LegendPlot.tsx";
import {Font, Polygon} from "./elements.tsx";

export interface PieConfig {
    width: number,
    height: number,
}

export interface PieProps {
    data: PieItem[],
    donut: Donut,
    config: PieConfig
}

const legendData: LegendItem[] = [
    new LegendItem({polygon: new Polygon({shape: 'circle'})}),
    new LegendItem({polygon: new Polygon({shape: 'triangle'})}),
    new LegendItem({polygon: new Polygon({shape: 'square'})}),
    new LegendItem({polygon: new Polygon({shape: 'diamond'})}),
    new LegendItem({polygon: new Polygon({shape: 'line'})}),
    new LegendItem({polygon: new Polygon({shape: 'ellipse'})}),
    new LegendItem(null)
]
export const PieChart = ({data, donut, config}: PieProps) => {

    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;
        // select(svgRef.current).
    }, []);

    return <svg ref={svgRef} width={500} height={300}>
        <TitlePlot
            show={true}
            width={config.width}
            height={30}
            color={'black'}
            font={new Font(null)}
            direction={'lr'}
            rotation={0}
            text={'config.title.text'}
        />
        <LegendPlot show={true} position={"right"} cross={30} data={legendData}/>
        <PiePlot
            data={data}
            width={config.width}
            height={config.height}
            donut={donut}
        />
    </svg>
};