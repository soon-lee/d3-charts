import {Font, Polygon} from "./elements.tsx";

export class LegendItem {
    polygon: Polygon;
    text: string;
    font: Font;

    constructor(props: { polygon?: Polygon; text?: string; font?: Font; } | null) {
        this.polygon = props && props.polygon || new Polygon(null);
        this.text = props && props.text || 'default';
        this.font = props && props.font || new Font(null);
    }
}

export interface LegendPlotProps {
    show: boolean;
    position: string;
    cross: number;
    data: LegendItem[];
}

export const LegendPlot = ({show, position, cross, data}: LegendPlotProps) => {

    const dealShape = (polygon: Polygon, x: number, y: number) => {
        if (polygon.shape === 'circle') {
            return <circle fill={polygon.fill} stroke={polygon.stroke} cx={x + 20} cy={y + 10} r="10"/>
        } else if (polygon.shape === 'square') {
            return <rect fill={polygon.fill} stroke={polygon.stroke} x={x + 11} y={y + 1} width="18" height="18"/>
        } else if (polygon.shape === 'triangle') {
            return <polygon fill={polygon.fill} stroke={polygon.stroke}
                            points={`${x + 20},${y} ${x + 30},${y + 20} ${x + 10},${y + 20}`}/>
        } else if (polygon.shape === 'diamond') {
            return <rect fill={polygon.fill} stroke={polygon.stroke} x={x + 12} y={y + 2} width="16" height="16"
                         transform={`rotate(45,${x + 20},${y + 10})`}/>
        } else if (polygon.shape === 'line') {
            return <rect fill={polygon.fill} stroke={polygon.stroke} x={x} y={y + 9} width="40" height="2"
            />
        } else if (polygon.shape === 'ellipse') {
            return <ellipse fill={polygon.fill} stroke={polygon.stroke} cx={x + 20} cy={y + 10} rx="20" ry="10"/>
        } else {
            return <rect fill={polygon.fill} stroke={polygon.stroke} x={x} y={y} width="40" height="20" rx="5" ry="5"/>
        }
    }

    const dealText = (font: Font, text: string, x: number, y: number) => {
        return <text fontFamily={font.family}
                     fontSize={font.size}
                     fontStyle={font.style}
                     fontWeight={font.weight}
                     fill={font.color} x={x + 40} y={y + 10} dominantBaseline="middle">{text} </text>
    }

    return <g opacity={show ? 1 : 0}>
        {data.map((item, index) => {
            let x, y = 0;
            if (position === 'bottom') {
                x = 120 * index;
                y = 270;
            } else if (position === 'left') {
                x = 0;
                y = index * cross;
            } else if (position === 'right') {
                x = 380;
                y = index * cross;
            } else {
                x = 120 * index;
                y = 0;
            }
            return <g key={index}>

                {dealShape(item.polygon, x, y)}
                {dealText(item.font, item.text, x, y)}
            </g>
        })}
    </g>
}