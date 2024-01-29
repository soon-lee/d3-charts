import {useEffect, useRef} from "react";
import {select} from "d3";

export class Font {
    family?: string;
    size?: number;
    weight?: string;
    style?: string;
    height?: number;

    constructor({
                    family = '"Fira Code","Microsoft Yahei"',
                    size = 13,
                    weight = 'normal',
                    style = 'normal',
                    height = 30
                }:{
        family?: string;
        size?: number;
        weight?: string;
        style?: string;
        height?: number;
    }) {
        this.family = family;
        this.size = size;
        this.weight = weight;
        this.style = style;
        this.height = height;
    }
}

export class TextPlotProps {
    show: boolean;
    text: string;
    font: Font;
    color?: string;
    position: string;
    offset: string;
    reverse: boolean;

    constructor({show = true, text = '标题', font=new Font() ,color='black', position = 'top', offset = 'start', reverse = false}: {
        show?: boolean,
        text?: string,
        font?: Font,
        color?:string,
        position?: string,
        offset?: string,
        reverse?: boolean
    }) {
        this.show = show;
        this.text = text;
        this.font = font;
        this.color = color;
        this.position = position;
        this.offset = offset;
        this.reverse = reverse;
    }

}

export const TextPlot = ({show,text,font,color,position,offset,reverse}: TextPlotProps) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;
        select(textRef.current).text(text).attr('fill',color);
    }, []);

    return <text ref={textRef}/>;
}