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
        return Math.min(config.width, (config.height - 40)) / 2 - 10;
    }, [config.width, config.height]);

    const pieLayout = pie<PiePlotItem>().value(d => d.value);

    const arcGenerator = useCallback(() => {
        const innerRadius = config.donut.enable ? radius() * config.donut.rate : 0;
        const outerRadius = radius();
        return arc<PieArcDatum<PiePlotItem>>().innerRadius(innerRadius).outerRadius(outerRadius);
    }, [config.donut]);

    return <g transform={`translate(${config.width / 2}, ${(config.height - 40) / 2 + 40})`}>
        {pieLayout(data.items)
            .map((item, index) => {
                const arcGen = arcGenerator();
                return <path
                    key={index}
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
            })}
    </g>
}