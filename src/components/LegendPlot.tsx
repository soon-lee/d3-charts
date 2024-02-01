import {Font, Polygon} from "./elements.tsx";
import {TextPlot, TextPlotConfig} from "./TextPlot.tsx";
import {ShapePlot, ShapePlotConfig} from "./ShapePlot.tsx";

export class LegendItem {
    key: string;
    label: string;
    color: string;

    constructor(props: { key?: string; label?: string; color?: string; } | null) {
        this.key = props && props.key || '0';
        this.label = props && props.label || 'default';
        this.color = props && props.color || 'black';
    }
}

export class LegendPlotConfig {
    show: boolean;
    x: number;
    y: number;
    length: number;
    cross: number;
    position: string;
    polygon: Polygon;
    font: Font;

    constructor(props: {
        show?: boolean;
        x?: number;
        y?: number;
        length?: number;
        cross?: number;
        position?: string;
        polygon?: Polygon;
        font?: Font;
    } | null) {
        this.show = props && props.show !== undefined ? props.show : true;
        this.x = props && props.x || 0;
        this.y = props && props.y || 0;
        this.length = props && props.length || 0;
        this.cross = props && props.cross || 30;
        this.position = props && props.position || 'top';
        this.polygon = props && props.polygon || new Polygon(null);
        this.font = props && props.font || new Font(null);
    }
}

export interface LegendPlotProps {
    data: LegendItem[];
    config: LegendPlotConfig;
}

export const LegendPlot = ({data, config}: LegendPlotProps) => {

    const dealAnchor = (index: number) => {
        const length = (config.polygon.shape === 'line' || config.polygon.shape === 'ellipse' || config.polygon.shape === 'rect') ? 120 : 110;
        if (config.position === 'bottom') {
            return [config.x + length * index, config.y]
        } else if (config.position === 'left') {
            return [config.x, config.y + config.cross * index]
        } else if (config.position === 'right') {
            return [config.x - length, config.y + config.cross * index]
        } else {
            return [config.x + length * index, config.y - config.cross]
        }
    }

    return <g x={config.x} y={config.y} opacity={config.show ? 1 : 0}>
        {data.map((item, index) => {
            const [x, y] = dealAnchor(index);
            return <g key={index}>
                <ShapePlot config={new ShapePlotConfig({polygon: config.polygon, x: x, y: y})}/>
                <TextPlot text={item.label} config={new TextPlotConfig({x: x + 45, y: y + config.cross / 2})}/>
            </g>
        })}
    </g>
}