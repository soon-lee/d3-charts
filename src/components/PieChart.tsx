import {useEffect, useRef} from "react";
import {Label, Legend, Marking, Title, Tooltip, Total} from "./elements.tsx";
import {Font, TitlePlot} from "./TitlePlot.tsx";
import {arc, pie, PieArcDatum} from "d3";
import {PieBlock} from "./PieBlock.tsx";

export interface PieItem {
    group: string,
    label: string,
    value: number,
}

export interface PieDonut {
    enabled: boolean,
    rate: number
}

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
    donut: PieDonut,
    config: PieConfig
}

export const PieChart = ({data, donut, config}: PieProps) => {

    const svgRef = useRef(null);

    const pieLayout = pie<PieItem>().value(d => d.value);

    const arcSector = arc<PieArcDatum<PieItem>>();
    const arcLabel = arc<PieArcDatum<PieItem>>();
    const arcMarking = arc<PieArcDatum<PieItem>>();

    useEffect(() => {
        if (!svgRef.current) return;
        // select(svgRef.current).
    }, []);

    return <svg ref={svgRef}>
        <TitlePlot
            show={true}
            width={100}
            height={30}
            color={'black'}
            font={new Font(null)}
            direction={'lr'}
            rotation={0}
            text={'config.title.text'}
        />
        <PieBlock
            data={data}
            width={config.width}
            height={config.height}
            donut={donut}
            config={config}
        />
    </svg>
};