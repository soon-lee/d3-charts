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
    let width = 32;
    let height = 16;
    if (config.polygon.size === 'small') {
        width = 24;
        height = 12;
    }
    if (config.polygon.size === 'medium') {
        width = 32;
        height = 16;
    }
    if (config.polygon.size === 'large') {
        width = 48;
        height = 24;
    }
    if (config.polygon.shape === 'circle') {
        return <circle
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            cx={config.x + width / 2}
            cy={config.y + height / 2}
            r={height / 4}
        />
    } else if (config.polygon.shape === 'triangle') {
        return <polygon
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            points={`${config.x + width / 2},${config.y + height / 4} ${config.x + width * 2 / 3},${config.y + height * 3 / 4} ${config.x + width / 3},${config.y + height * 3 / 4}`}
        />
    } else if (config.polygon.shape === 'square') {
        return <rect
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            x={config.x + width / 2 - height / 4}
            y={config.y + height / 4}
            width={height / 2}
            height={height / 2}
        />
    } else if (config.polygon.shape === 'diamond') {
        return <rect
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            x={config.x + width / 2 - height / 4}
            y={config.y + height / 4}
            width={height / 2}
            height={height / 2}
            transform={`rotate(45,${config.x + width / 2},${config.y + height / 2})`}
        />
    } else if (config.polygon.shape === 'line') {
        return <rect
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            x={config.x + width / 8}
            y={config.y + height / 2 - 2}
            width={width * 3 / 4}
            height="4"
            rx="2"
            ry="2"
        />
    } else if (config.polygon.shape === 'ellipse') {
        return <ellipse
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            cx={config.x + width / 2}
            cy={config.y + height / 2}
            rx={width * 3 / 8}
            ry={height * 3 / 8}
        />
    } else {
        return <rect
            fill={config.polygon.fill}
            stroke={config.polygon.stroke}
            x={config.x + width / 8}
            y={config.y + height / 8}
            width={width * 3 / 4}
            height={height * 3 / 4}
            rx={config.polygon.size === 'small' ? 3 : 5}
            ry={config.polygon.size === 'small' ? 3 : 5}
        />
    }
}