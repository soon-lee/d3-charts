import {arc, pie, PieArcDatum} from "d3";
import {useCallback} from "react";

export class PiePlotItem {
    key: string;
    label: string;
    value: number;
    color: string;
    group: string;

    constructor(props: {
        key?: string; label?: string; value?: number; color?: string; group?: string;
    } | null) {
        this.key = props && props.key || '0';
        this.label = props && props.label || 'default';
        this.value = props && props.value || 0;
        this.color = props && props.color || '#00d8ff';
        this.group = props && props.group || 'default';
    }
}

export class Donut {
    enable: boolean;
    rate: number;

    constructor(props: {
        enable?: boolean; rate?: number;
    } | null) {
        this.enable = props && props.enable !== null ? props.enable as boolean : true;
        this.rate = props && props.rate || 0.6;
    }
}

export class PiePlotConfig {
    donut: Donut;
    width: number;
    height: number;

    constructor(props: { donut?: Donut; width?: number; height?: number; } | null) {
        this.donut = props && props.donut || new Donut(null);
        this.width = props && props.width || 500;
        this.height = props && props.height || 300;
    }
}

export interface PieProps {
    data: PiePlotItem[];
    config: PiePlotConfig;
}

export const PiePlot = ({data, config}: PieProps) => {

    const radius = useCallback(() => {
        return Math.min(config.width, (config.height - 40)) / 2 - 10;
    }, [config.width, config.height]);

    const pieLayout = pie<PiePlotItem>().value(d => d.value);

    const arcGenerator = useCallback(() => {
        const innerRadius = config.donut.enable ? radius() * config.donut.rate : 0;
        const outerRadius = radius();
        return arc<PieArcDatum<PiePlotItem>>().innerRadius(innerRadius).outerRadius(outerRadius);
    }, [config.donut]);

    return <g transform={`translate(${config.width / 2}, ${(config.height - 40) / 2 + 40})`}>
        {
            pieLayout(data)
                .map((item, index) => {
                    const arcGen = arcGenerator();
                    return <path
                        key={index}
                        d={arcGen(item) as string}
                        fill={item.data.color}
                        onMouseMove={() => {
                        }}
                        onMouseOver={() => {
                        }}
                        onMouseOut={() => {
                        }}
                    />
                })
        }
    </g>
}