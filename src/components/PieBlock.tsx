import {arc, pie, PieArcDatum, schemeCategory10} from "d3";
import {useCallback, useMemo} from "react";

export class PieItem {
    id: string;
    label: string;
    value: number;
    group: string;

    constructor(props: {
        id?: string; label?: string; value?: number; group?: string;
    } | null) {
        this.id = props && props.id || '0';
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
        this.enable = props && props.enable || false;
        this.rate = props && props.rate || 0.6;
    }
}

export interface PieProps {
    data: PieItem[];
    donut?: Donut;
    width: number;
    height: number;
}

export const PieBlock = ({data, donut, width, height}: PieProps) => {

    const pieLayout = pie<PieItem>().value(d => d.value);

    const arcGenerator = arc<PieArcDatum<PieItem>>()
        .innerRadius(0)
        .outerRadius(100);

    const radius = useCallback(() => {
        return Math.min(width, height) / 2 - 10;
    }, [width, height]);

    useMemo(() => {
        const innerRadius = donut.enable ? radius() * donut.rate : 0;
        const outerRadius = radius();
        arcGenerator.innerRadius(innerRadius).outerRadius(outerRadius);
    }, []);

    return <g transform={`translate(${width / 2}, ${height / 2})`}>
        {
            pieLayout(data)
                .map((item, index) => {

                    return <path d={arcGenerator(item)} fill={schemeCategory10[index % 10]} onMouseMove={() => {
                    }} onMouseOver={() => {
                    }} onMouseOut={() => {
                    }}></path>
                })
        }
    </g>
}