import {useEffect, useRef} from "react";
import {arc, pie, PieArcDatum, select} from "d3";
import {Label, Legend, Marking, Title, Tooltip, Total} from "./elements.tsx";

export interface PieItem{
    group:string,
    label:string,
    value:number,
}
export interface PieDonut{
    enabled:boolean,
    rate:number
}
export interface PieConfig{
    width:number,
    height:number,
    title:Title,
    legend:Legend,
    total:Total,
    tooltip:Tooltip,
    label:Label,
    marking:Marking
}
export interface PieProps{
    data:PieItem[],
    donut:PieDonut,
    config:PieConfig
}

export const PieChart = ({data,donut,config}:PieProps)=>{

    const svgRef = useRef(null);

    const pieLayout = pie<PieItem>().value(d => d.value);

    const arcGenerator = arc<PieArcDatum<PieItem>>();

    useEffect(() => {
        if(!svgRef.current) return;
        const svgTemp = select(svgRef.current);
        svgTemp.attr('width',config.width).attr('height',config.height)
            .append('g').attr('class','sl-title')
            .append('g').attr('class','sl-legend')
            .append('g').attr('class','sl-total')
            .append('g').attr('class','sl-tooltip')
            .append('g').attr('class','sl-label')
            .append('g').attr('class','sl-marking')
            .append('g').attr('class','sl-data');
        // return ()=>svgTemp.selectAll('g').remove();
    }, []);

    useEffect(() => {
        const radius = Math.min(config.width,config.height)/2 -10;
        arcGenerator
            .innerRadius(donut.enabled ? donut.rate*radius : 0)
            .outerRadius(radius);
    }, [donut,config.width,config.height]);

    useEffect(() => {
        if(!svgRef.current) return;
        const svgTemp = select(svgRef.current);
        svgTemp.select('.sl-data')
            .attr('transform',`translate(${config.width / 2}, ${config.height / 2})`)
            .data(pieLayout(data))
            .join('path')
            .attr('d',arcGenerator)
            .style('fill','green');
        // return ()=>svgTemp.selectAll('g').remove();
    }, [data,config.width,config.height]);

    return <svg ref={svgRef} />
};