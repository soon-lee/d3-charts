import React, {useCallback, useMemo, useState} from "react";
import {Font, Group, GroupedPolygon} from "./elements.tsx";
import {ShapePlot, ShapePlotConfig} from "./ShapePlot.tsx";
import {TextPlot, TextPlotConfig} from "./TextPlot.tsx";

export class TooltipPlotItem {
    key: string;
    color: string;
    label: string;
    value: number;
    group: Group;

    constructor(props: {
        key?: string; label?: string; value?: number; color?: string; group?: Group;
    } | null) {
        this.key = props && props.key || '0';
        this.label = props && props.label || 'default';
        this.value = props && props.value || 0;
        this.color = props && props.color || 'black';
        this.group = props && props.group || new Group(null);
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
    background: string;
    title: Font;
    size: string;
    polygon: GroupedPolygon[];
    label: Font;
    value: Font;
    rate: boolean;
    sum: boolean;
    x: number;
    y: number;

    constructor(props: {
        show?: boolean;
        background?: string;
        title?: Font;
        size?: string;
        polygon?: GroupedPolygon[];
        label?: Font;
        value?: Font;
        rate?: boolean;
        sum?: boolean;
        x?: number;
        y?: number;
    } | null) {
        this.show = props && props.show !== undefined ? props.show : false;
        this.background = props && props.background || 'lightgray';
        this.title = props && props.title || new Font({weight: 'bold', size: 16});
        this.size = props && props.size || 'medium';
        this.polygon = props && props.polygon || [];
        this.label = props && props.label || new Font(null);
        this.value = props && props.value || new Font({size: 16});
        this.rate = props && props.rate !== undefined ? props.rate : true;
        this.sum = props && props.sum !== undefined ? props.sum : true;
        this.x = props && props.x || 0;
        this.y = props && props.y || 0;
    }
}

export interface TooltipPlotProps {
    data: TooltipPlotData;
    config: TooltipPlotConfig;
}

export const TooltipPlot = ({data, config}: TooltipPlotProps) => {
    const getTextPixcel = useCallback((font: Font,text:string)=>{
        const context = document.createElement('canvas').getContext('2d')
    })
     = useMemo(() => {

        return ;
    }, []);

    const getLineHeight = useCallback(() => {
        if (config.size === 'small') return 12;
        if (config.size === 'large') return 24;
        return 16;
    }, [config.size])

    const [size, setSize] = React.useState({
        width: 250,
        height: 30 + data.items.length * getLineHeight()
    })
    return <g opacity={config.show ? 1 : 0}>
        <rect x={config.x} y={config.y} rx="5" ry="5" width={config.rate ? size.width + 50 : size.width}
              height={config.sum ? size.height + 30 : size.height}
              fill={config.background}/>
        <TextPlot text={data.title}
                  config={new TextPlotConfig({x: config.x + 10, y: config.y + 15, font: config.title})}/>
        {
            data.items.map((item, index) => {
                return <g key={index}>
                    <ShapePlot config={new ShapePlotConfig({
                        x: config.x + 10,
                        y: config.y + (index) * getLineHeight() + 30,
                        polygon: config.polygon[index]['polygon']
                    })}/>
                    <TextPlot text={item.label} config={new TextPlotConfig({
                        x: config.x + 60, y: config.y + (index) * getLineHeight() + 30, font: config.label
                    })}/>
                    <TextPlot text={item.value.toFixed(2)} config={new TextPlotConfig({
                        x: config.x + 180, y: config.y + (index) * getLineHeight() + 30, font: config.value
                    })}/>
                    {config.rate ? <TextPlot text={`(${(item.value / data.total * 100).toFixed(2)}%)`}
                                             config={new TextPlotConfig({
                                                 x: config.x + 300,
                                                 y: config.y + (index) * getLineHeight() + 30
                                             })}/> : <></>}
                </g>
            })
        }
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