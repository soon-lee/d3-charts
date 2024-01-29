import {useRef} from "react";

export class TitlePlotProps{
    text: string;
    position:string;
    offset:string;
    reverse:boolean;
    constructor(props: { text: string|null;position: string|null,offset: string|null,reverse: boolean|null }) {
        this.text = props && props.text || '标题';
        this.position = props && props.position || 'top';
        this.offset = props && props.offset || 'left';
        this.reverse = props && props.reverse || false;
    }
}
export const TitlePlot = ()=>{

    const groupRef = useRef(null);

    return <g ref={groupRef} />
}