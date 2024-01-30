import {arc, pie, PieArcDatum, schemeCategory10} from "d3";
import {useCallback} from "react";

export class PieItem {
    key: string;
    label: string;
    value: number;
    group: string;

    constructor(props: {
        key?: string; label?: string; value?: number; group?: string;
    } | null) {
        this.key = props && props.key || '0';
        this.label = props && props.label || 'default';
        this.value = props && props.value || 0;
        this.group = props && props.group || 'default';
    }
}

export class Donut {
    enable: boolean;
    rate: number;

    constructor(props: {
        enable?: boolean; rate?: number;
    } | null) {
        this.enable = props && props.enable || true;
        this.rate = props && props.rate || 0.6;
    }
}

export interface PieProps {
    data: PieItem[];
    donut: Donut;
    width: number;
    height: number;
}

export const PiePlot = ({data, donut, width, height}: PieProps) => {

    const radius = useCallback(() => {
        return Math.min(width, (height-40)) / 2 - 10;
    }, [width, height]);

    const pieLayout = pie<PieItem>().value(d => d.value);

    const arcGenerator = useCallback(() => {
        const innerRadius = donut.enable ? radius() * donut.rate : 0;
        const outerRadius = radius();
        return arc<PieArcDatum<PieItem>>().innerRadius(innerRadius).outerRadius(outerRadius);
    }, [donut]);

    return <g transform={`translate(${width / 2}, ${(height-40) / 2+40})`}>
        {
            pieLayout(data)
                .map((item, index) => {
                    const arcGen = arcGenerator();
                    return <path
                        key={index}
                        d={arcGen(item) as string}
                        fill={schemeCategory10[index % 10]}
                        onMouseMove={()=>{}}
                        onMouseOver={()=>{}}
                        onMouseOut={()=>{}}
                    />
                })
        }
    </g>
}