import {Font} from "./elements.tsx";

export class TitlePlotConfig {
    show: boolean;
    x: number;
    y: number;
    length: number;
    cross: number;
    font: Font;
    position: string;
    reverse: boolean;
    vertical: boolean;

    constructor(props: {
        show?: boolean;
        x?: number;
        y?: number;
        length?: number;
        cross?: number;
        position?: string;
        font?: Font;
        reverse?: boolean;
        vertical?: boolean;
    } | null) {
        this.show = props && props.show !== undefined ? props.show : true;
        this.x = props && props.x || 0;
        this.y = props && props.y || 0;
        this.length = props && props.length || 0;
        this.cross = props && props.cross || 30;
        this.position = props && props.position || 'top';
        this.font = props && props.font || new Font(null);
        this.reverse = props && props.reverse !== undefined ? props.reverse : false;
        this.vertical = props && props.vertical !== undefined ? props.vertical : true;
    }
}

export interface TitlePlotProps {
    text: string;
    config: TitlePlotConfig;
}

export const TitlePlot = ({text, config}: TitlePlotProps) => {
    const randomChar12 = Array
        .from({length: 12})
        .map(() => {
            const num = Math.random() > 0.5 ? Math.random() * 25 + 65 : Math.random() * 25 + 97;
            String.fromCharCode(num);
        })
    const pathId = `path-${randomChar12.join('')}`;

    const dealDirect: () => string = () => {
        if (config.position === 'right') {
            const x = config.x - config.cross / 2;
            const y1 = config.reverse ? config.y + config.length : config.y;
            const y2 = config.reverse ? config.y : config.y + config.length;
            return `M ${x},${y1}L${x},${y2}`;
        } else if (config.position === 'bottom') {
            const x1 = config.reverse ? config.x + config.length : config.x;
            const x2 = config.reverse ? config.x : config.x + config.length;
            const y = config.y - config.cross / 2;
            return `M ${x1},${y}L${x2},${y}`;
        } else if (config.position === 'left') {
            const x = config.x + config.cross / 2;
            const y1 = config.reverse ? config.y + config.length : config.y;
            const y2 = config.reverse ? config.y : config.y + config.length;
            return `M ${x},${y1}L${x},${y2}`;
        } else {
            const x1 = config.reverse ? config.x + config.length : config.x;
            const x2 = config.reverse ? config.x : config.x + config.length;
            const y = config.y + config.cross / 2;
            return `M ${x1},${y}L${x2},${y}`;
        }
    }
    const dealRotate: () => number = () => {
        if (config.position === 'left' || config.position === 'right') {
            return config.vertical ? (config.reverse ? 90 : -90) : 0;
        } else {
            console.log(config)
            return config.reverse ? (config.vertical ? 180 : -90) : (config.vertical ? 0 : -90);
        }
    }

    return <g x={config.x} y={config.y} opacity={config.show ? 1 : 0}>
        <g>
            <path id={pathId} d={dealDirect()}/>
            <text
                rotate={dealRotate()}
                letterSpacing={config.vertical ? (config.position === 'right' || config.position === 'left' ? 10 : 0) : 10}
                stroke={config.font.color}
                fontSize={config.font.size}
                fontFamily={config.font.family}
                fontStyle={config.font.style}
                fontWeight={config.font.weight}
            >
                <textPath href={`#${pathId}`}>{text}</textPath>
            </text>
        </g>
    </g>;
}