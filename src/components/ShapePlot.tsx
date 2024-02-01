import {Polygon} from "./elements.tsx";

export class ShapePlotConfig {
    x: number;
    y: number;
    polygon: Polygon;
    cross: number;

    constructor(props: {
        x?: number;
        y?: number;
        polygon?: Polygon;
        cross?: number;
    } | null) {
        this.x = props && props.x || 0;
        this.y = props && props.y || 0;
        this.polygon = props && props.polygon || new Polygon(null);
        this.cross = props && props.cross || 30;
    }
}

export interface ShapePlotProps {
    config: ShapePlotConfig;
}

export const ShapePlot = ({config}: ShapePlotProps) => {
    if (config.polygon.shape === 'circle') {
        return <circle
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            cx={config.x + 20}
            cy={config.y + config.cross / 2}
            r="10"
            style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
        />
    } else if (config.polygon.shape === 'triangle') {
        return <polygon
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            points={`${config.x + 20},${config.y + 5} ${config.x + 30},${config.y + 25} ${config.x + 10},${config.y + 25}`}
            style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
        />
    } else if (config.polygon.shape === 'square') {
        return <rect
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            x={config.x + 12}
            y={config.cross > 20 ? config.y + config.cross / 2 - 8 : config.y + 2}
            width="18"
            height="18"
            style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
        />
    } else if (config.polygon.shape === 'diamond') {
        return <rect
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            x={config.x + 12}
            y={config.cross > 20 ? config.y + config.cross / 2 - 8 : config.y + 2}
            width="16"
            height="16"
            transform={`rotate(45,${config.x + 20},${config.y + 10})`}
            style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
        />
    } else if (config.polygon.shape === 'line') {
        return <rect
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            x={config.x}
            y={config.cross > 20 ? config.y + config.cross / 2 - 2 : config.y + 8}
            width="40"
            height="4"
            rx="2"
            ry="2"
            style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
        />
    } else if (config.polygon.shape === 'ellipse') {
        return <ellipse
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            cx={config.x + 20}
            cy={config.cross > 20 ? config.y + config.cross / 2 : config.y + 10}
            rx="20"
            ry="10"
            style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
        />
    } else {
        return <rect
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            x={config.x}
            y={config.cross > 20 ? config.y + (config.cross - 20) / 2 : config.y}
            width="40"
            height="20"
            rx="5"
            ry="5"
            style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
        />
    }
}