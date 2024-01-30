import {useEffect, useRef} from "react";
import {Label, Legend, Marking, Title, Tooltip, Total} from "./elements.tsx";
import {Font, TitlePlot} from "./TitlePlot.tsx";
import {Donut, PiePlot, PieItem} from "./PiePlot.tsx";
import {LegendPlot} from "./LegendPlot.tsx";

export interface PieConfig {
    width: number,
    height: number,
    title: Title,
    legend: Legend,
    total: Total,
    tooltip: Tooltip,
    label: Label,
    marking: Marking
}

export interface PieProps {
    data: PieItem[],
    donut: Donut,
    config: PieConfig
}

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
        <LegendPlot shape={'circle'} />
        <LegendPlot shape={'square'} />
        <LegendPlot shape={'triangle'} />
        <LegendPlot shape={'diamond'} />
        <LegendPlot shape={'cross'} />
        <LegendPlot shape={'plus'} />
        <LegendPlot shape={'line'} />
        <PiePlot
            data={data}
            width={config.width}
            height={config.height}
            donut={donut}
        />
    </svg>
};