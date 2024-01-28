export interface Line{
    color:string,
    size:string,
    style:string
}
export interface Shape{
    type:string,
    fill:string,
    border:Line,
}
export interface Font{
    family:string,
    size:string,
    weight:string,
    style:string,
    height:string
}
export interface Text{
    font:Font,
    color:string,
    decoration:string,
    direction:string,
    align:string,
    overflow:string,
    format:string,
    link?:string,
}
export interface Record{
    dimension:Text,
    measure:Text,
}
export interface Title{
    show:boolean,
    position:string,
    text:Text
}
export interface Legend{
    show:boolean,
    position:string,
    offset:string,
    shape:Shape[],
    text:Text[]
}
export interface Total{
    show:boolean,
    position:string,
    offset:string,
    title:Text,
    text:Text
}
export interface Tooltip{
    show:boolean,
    position:string,
    offset:string,
    title:Text,
    group:Record[],
    rate:boolean,
    sum:boolean
}
export interface Label{
    show:boolean,
    position:string,
    offset:string,
    dimension:string[],
    text:Text
}
export interface Marking{
    show:boolean,
    line:Line,
    shape:Shape,
    content:Record
}