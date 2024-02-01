import {Font, Polygon} from "./elements.tsx";

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
        this.show = props && props.show !== null ? props.show as boolean : true;
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

    const dealShape = (color: string, x: number, y: number) => {
        if (config.polygon.shape === 'circle') {
            return <circle
                fill={color ? color : config.polygon.fill}
                stroke={config.polygon.stroke}
                cx={x + 20}
                cy={y + config.cross / 2}
                r="10"
                style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
            />
        } else if (config.polygon.shape === 'triangle') {
            return <polygon
                fill={color ? color : config.polygon.fill}
                stroke={config.polygon.stroke}
                points={`${x + 20},${y + 5} ${x + 30},${y + 25} ${x + 10},${y + 25}`}
                style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
            />
        } else if (config.polygon.shape === 'square') {
            return <rect
                fill={color ? color : config.polygon.fill}
                stroke={config.polygon.stroke}
                x={x + 12}
                y={config.cross > 20 ? y + config.cross / 2 - 8 : y + 2}
                width="18"
                height="18"
                style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
            />
        } else if (config.polygon.shape === 'diamond') {
            return <rect
                fill={color ? color : config.polygon.fill}
                stroke={config.polygon.stroke}
                x={x + 12}
                y={config.cross > 20 ? y + config.cross / 2 - 8 : y + 2}
                width="16"
                height="16"
                transform={`rotate(45,${x + 20},${y + 10})`}
                style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
            />
        } else if (config.polygon.shape === 'line') {
            return <rect
                fill={color ? color : config.polygon.fill}
                stroke={config.polygon.stroke}
                x={x}
                y={config.cross > 20 ? y + config.cross / 2 - 2 : y + 8}
                width="40"
                height="4"
                rx="2"
                ry="2"
                style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
            />
        } else if (config.polygon.shape === 'ellipse') {
            return <ellipse
                fill={color ? color : config.polygon.fill}
                stroke={config.polygon.stroke}
                cx={x + 20}
                cy={config.cross > 20 ? y + config.cross / 2 : y + 10}
                rx="20"
                ry="10"
                style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
            />
        } else {
            return <rect
                fill={color ? color : config.polygon.fill}
                stroke={config.polygon.stroke}
                x={x}
                y={config.cross > 20 ? y + (config.cross - 20) / 2 : y}
                width="40"
                height="20"
                rx="5"
                ry="5"
                style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
            />
        }
    }

    const dealText = (text: string, x: number, y: number) => {
        const offset = (config.polygon.shape === 'line' || config.polygon.shape === 'ellipse' || config.polygon.shape === 'rect') ? 45 : 40;
        return <text fontFamily={config.font.family}
                     fontSize={config.font.size}
                     fontStyle={config.font.style}
                     fontWeight={config.font.weight}
                     fill={config.font.color}
                     x={x + offset}
                     y={y + config.cross / 2}
                     alignmentBaseline="central"
                     style={{margin: `${config.cross > 20 ? (config.cross - 20) / 2 : 0} 0`}}
        >{text} </text>
    }

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

                {dealShape(item.color, x, y)}
                {dealText(item.label, x, y)}
            </g>
        })}
    </g>
}