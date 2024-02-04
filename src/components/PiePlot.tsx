import {arc, pie, PieArcDatum} from "d3";
import {MouseEvent, useCallback} from "react";
import {Font} from "./elements.tsx";

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

export class PiePlotData {
    items: PiePlotItem[];

    constructor(props: { items?: PiePlotItem[]; } | null) {
        this.items = props && props.items || [];
    }
}

export class Label {
    enable: boolean;
    font: Font;

    constructor(props: {
        enable?: boolean; font?: Font;
    } | null) {
        this.enable = props && props.enable !== null ? props.enable as boolean : true;
        this.font = props && props.font || new Font(null);
    }
}

export class Marking {
    enable: boolean;
    label: Font;
    value: Font;

    constructor(props: {
        enable?: boolean; label?: Font; value?: Font;
    } | null) {
        this.enable = props && props.enable !== null ? props.enable as boolean : true;
        this.label = props && props.label || new Font(null);
        this.value = props && props.value || new Font({weight: 'bold'});
    }
}

export class PiePlotConfig {
    donut: Donut;
    width: number;
    height: number;
    label: Label;
    marking: Marking;
    onMouseOver: (event: MouseEvent<SVGPathElement>, item: PieArcDatum<PiePlotItem>) => void;
    onMouseOut: (event: MouseEvent<SVGPathElement>, item: PieArcDatum<PiePlotItem>) => void;
    onMouseMove: (event: MouseEvent<SVGPathElement>, item: PieArcDatum<PiePlotItem>) => void;

    constructor(props: {
        donut?: Donut;
        width?: number;
        height?: number;
        label?: Label;
        marking?: Marking;
        onMouseOver?: (event: MouseEvent<SVGPathElement>, item: PieArcDatum<PiePlotItem>) => void;
        onMouseOut?: (event: MouseEvent<SVGPathElement>, item: PieArcDatum<PiePlotItem>) => void;
        onMouseMove?: (event: MouseEvent<SVGPathElement>, item: PieArcDatum<PiePlotItem>) => void;
    }) {
        this.donut = props && props.donut || new Donut(null);
        this.width = props && props.width || 500;
        this.height = props && props.height || 300;
        this.label = props && props.label || new Label(null);
        this.marking = props && props.marking || new Marking(null);
        this.onMouseOver = props && props.onMouseOver !== undefined ? props.onMouseOver : () => {
        };
        this.onMouseOut = props && props.onMouseOut !== undefined ? props.onMouseOut : () => {
        };
        this.onMouseMove = props && props.onMouseMove !== undefined ? props.onMouseMove : () => {
        };
    }
}

export interface PieProps {
    data: PiePlotData;
    config: PiePlotConfig;
}

export const PiePlot = ({data, config}: PieProps) => {

    const radius = useCallback(() => {
        return Math.min(config.width, (config.height - 40)) / 2 - 20;
    }, [config.width, config.height]);

    const pieLayout = pie<PiePlotItem>().value(d => d.value);

    const arcGenerator = useCallback(() => {
        const innerRadius = config.donut.enable ? radius() * config.donut.rate : 0;
        const outerRadius = radius();
        return arc<PieArcDatum<PiePlotItem>>().innerRadius(innerRadius).outerRadius(outerRadius);
    }, [config.donut]);
    const arcMarkingGenerator = useCallback(() => {
        return arc<PieArcDatum<PiePlotItem>>().innerRadius(radius()).outerRadius(radius());
    }, [config.width, config.height]);

    const pieSector = useCallback(() => {
        return pieLayout(data.items)
            .map((item, index) => {
                const arcGen = arcGenerator();
                return <path
                    key={`sector-${index}`}
                    d={arcGen(item) as string}
                    fill={item.data.color}
                    onMouseMove={(event) => {
                        config.onMouseMove(event, item);
                    }}
                    onMouseOver={(event) => {
                        config.onMouseOver(event, item);
                    }}
                    onMouseOut={(event) => {
                        config.onMouseOut(event, item);
                    }}
                />
            })
    }, [data.items]);
    const pieLabel = useCallback(() => {
        return pieLayout(data.items)
            .map((item, index) => {
                const arcGen = arcGenerator();
                return <text
                    key={`label-${index}`}
                    transform={`translate(${arcGen.centroid(item)})`}
                >{item.value}</text>
            })
    }, [data.items]);
    const pieMarking = useCallback(() => {
        return pieLayout(data.items)
            .map((item, index) => {
                const arcGen = arcMarkingGenerator();
                const [x, y] = arcGen.centroid(item);
                const angle = (item.endAngle + item.startAngle) / 2;
                return (
                    <g key={`marking-${index}`}>
                        <line
                            x1={x}
                            y1={y}
                            x2={x * 1.1}
                            y2={y * 1.1}
                            stroke={item.data.color}
                        />
                        <line
                            x1={x * 1.1}
                            y1={y * 1.1}
                            x2={angle >= Math.PI && angle <= Math.PI * 2 ? x * 1.1 - 30 : x * 1.1 + 30}
                            y2={y * 1.1}
                            stroke={item.data.color}
                        />
                        <text x={angle >= Math.PI && angle <= Math.PI * 2 ? x * 1.1 - 30 - 100 : x * 1.1 + 30}
                              y={y * 1.1 + 5}
                              fill={item.data.color}
                        >{`${item.data.label}:  ${item.data.value}`}</text>
                    </g>
                );
            })
    }, [data.items]);

    return (
        <g>
            <g transform={`translate(${config.width / 2}, ${(config.height - 40) / 2 + 40})`}>
                {pieSector()}
            </g>
            <g transform={`translate(${config.width / 2}, ${(config.height - 40) / 2 + 40})`}
               textAnchor='middle' alignmentBaseline='central'>
                {pieLabel()}
            </g>
            <g transform={`translate(${config.width / 2}, ${(config.height - 40) / 2 + 40})`}>
                {pieMarking()}
            </g>
        </g>
    );
}