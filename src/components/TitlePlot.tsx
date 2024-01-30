export class Font {
    family: string;
    size: number;
    weight: string;
    style: string;
    height: number;

    constructor(props: {
        family?: string; size?: number; weight?: string; style?: string; height?: number;
    } | null) {
        this.family = props && props.family || '"Fira Code","Microsoft Yahei"';
        this.size = props && props.size || 13;
        this.weight = props && props.weight || 'normal';
        this.style = props && props.style || 'normal';
        this.height = props && props.height || 30;
    }
}

export interface TitlePlotProps {
    show: boolean;
    text: string;
    font: Font;
    color: string;
    direction: string;
    rotation: number;
    width: number;
    height: number;
}

export const TitlePlot = ({show, text, font, color, direction, rotation, width, height}: TitlePlotProps) => {
    const randomChar12 = Array
        .from({length: 12})
        .map(() => {
            const num = Math.random() > 0.5 ? Math.random() * 25 + 65 : Math.random() * 25 + 97;
            String.fromCharCode(num);
        })
    const pathId = `path-${randomChar12.join('')}`;

    const dealDirect: () => string = () => {
        if (direction === 'rl') {
            return `M ${width},${height / 2}L${0},${height / 2}`;
        } else if (direction === 'tb') {
            return `M ${width / 2},0L${width / 2},${height}`;
        } else if (direction === 'bt') {
            return `M ${width / 2},${height}L${width / 2},0`;
        } else {
            return `M 0,${height / 2}L${width},${height / 2}`;
        }
    }
    const dealRotate: () => number = () => {
        if (direction === 'rl') {
            return 180;
        } else if (direction === 'tb') {
            return -90;
        } else if (direction === 'bt') {
            return 90;
        } else {
            return 0
        }
    }

    return <g width={width} height={height} opacity={show ? 1 : 0} stroke={'red'} color={'green'}>
        <path id={pathId} d={dealDirect()}/>
        <text
            width={width}
            height={height}
            rotate={dealRotate()}
            letterSpacing={(direction === 'lr' || direction === 'rl') ? 0 : 10}
            fill={color}
            fontSize={font.size}
            fontFamily={font.family}
            fontStyle={font.style}
            transform={`rotate(${rotation},${width / 2},${height / 2})`}
        >
            <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
    </g>;
}