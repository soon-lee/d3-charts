import {Font, Polygon} from "./elements.tsx";
import {ShapePlot, ShapePlotConfig} from "./ShapePlot.tsx";
import {TextPlot, TextPlotConfig} from "./TextPlot.tsx";

export class TooltipPlotItem {
    key: string;
    color: string;
    label: string;
    value: number;

    constructor(props: {
        key?: string; label?: string; value?: number; color?: string;
    } | null) {
        this.key = props && props.key || '0';
        this.label = props && props.label || 'default';
        this.value = props && props.value || 0;
        this.color = props && props.color || 'black';
    }
}

export class TooltipPlotData {
    title: string;
    items: TooltipPlotItem[];
    total: number;

    constructor(props: {
        title?: string; items?: TooltipPlotItem[]; total?: number;
    } | null) {
        this.title = props && props.title || 'Tooltip Title';
        this.items = props && props.items || [];
        this.total = props && props.total || 0;
    }
}

export class TooltipPlotConfig {
    show: boolean;
    title: Font;
    polygon: Polygon;
    label: Font;
    value: Font;
    rate: boolean;
    sum: boolean;
    x: number;
    y: number;

    constructor(props: {
        show?: boolean;
        title?: Font;
        polygon?: Polygon;
        label?: Font;
        value?: Font;
        rate?: boolean;
        sum?: boolean;
        x?: number;
        y?: number;
    } | null) {
        this.show = props && props.show !== undefined ? props.show : false;
        this.title = props && props.title || new Font({weight: 'bold', size: 16});
        this.polygon = props && props.polygon || new Polygon(null);
        this.label = props && props.label || new Font(null);
        this.value = props && props.value || new Font({size: 16});
        this.rate = props && props.rate !== undefined ? props.rate : false;
        this.sum = props && props.sum !== undefined ? props.sum : false;
        this.x = props && props.x || 0;
        this.y = props && props.y || 0;
    }
}

export interface TooltipPlotProps {
    data: TooltipPlotData;
    config: TooltipPlotConfig;
}

export const TooltipPlot = ({data, config}: TooltipPlotProps) => {
    return <g opacity={config.show ? 1 : 0} style={{backgroundColor: 'lightgray'}}>
        <rect x={config.x} y={config.y} rx="5" ry="5" width={config.rate ? 420 : 300}
              height={config.sum ? 30 * data.items.length + 80 : 30 * data.items.length + 40}
              fill={'lightgray'}/>
        <TextPlot text={data.title}
                  config={new TextPlotConfig({x: config.x + 10, y: config.y + 20, font: config.title})}/>
        {data.items.map((item, index) => {
            return <g key={index}>
                <ShapePlot config={new ShapePlotConfig({
                    x: config.x + 10, y: config.y + (index) * 30 + 30, polygon: config.polygon
                })}/>
                <TextPlot text={item.label} config={new TextPlotConfig({
                    x: config.x + 60, y: config.y + (index) * 30 + 45, font: config.label
                })}/>
                <TextPlot text={item.value.toFixed(2)} config={new TextPlotConfig({
                    x: config.x + 180, y: config.y + (index) * 30 + 45, font: config.value
                })}/>
                {config.rate ? <TextPlot text={`(${(item.value / data.total * 100).toFixed(2)}%)`}
                                         config={new TextPlotConfig({
                                             x: config.x + 300,
                                             y: config.y + (index) * 30 + 45
                                         })}/> : <></>}
            </g>
        })}
        {
            config.sum ?
                <TextPlot text={`总计: ${data.total.toFixed(2)}`} config={new TextPlotConfig({
                    x: config.x + 10,
                    y: config.y + 30 * data.items.length + 40,
                    font: new Font({size: 16, weight: 'bold'})
                })}/> :
                <></>
        }
    </g>
}