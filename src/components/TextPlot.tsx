import {Font} from "./elements.tsx";

export class TextPlotConfig {
    font: Font;
    x: number;
    y: number;

    constructor(props: {
        x?: number; y?: number; font?: Font;
    } | null) {
        this.x = props && props.x || 0;
        this.y = props && props.y || 0;
        this.font = props && props.font || new Font(null);
    }
}

export interface TextPlotProps {
    text: string;
    config: TextPlotConfig;
}

export const TextPlot = ({text, config}: TextPlotProps) => {
    return <text fontFamily={config.font.family}
                 fontSize={config.font.size}
                 fontStyle={config.font.style}
                 fontWeight={config.font.weight}
                 fill={config.font.color}
                 x={config.x}
                 y={config.y}
                 alignmentBaseline="central"
    >{text} </text>
}