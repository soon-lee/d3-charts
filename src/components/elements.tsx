export class Font {
    color: string;
    family: string;
    size: number;
    weight: string;
    style: string;
    direction: string;

    constructor(props: {
        color?: string; family?: string; size?: number; weight?: string; style?: string; direction?: string;
    } | null) {
        this.color = props && props.color || 'black';
        this.family = props && props.family || '"Fira Code","Microsoft Yahei"';
        this.size = props && props.size || 13;
        this.weight = props && props.weight || 'normal';
        this.style = props && props.style || 'normal';
        this.direction = props && props.direction || 'ltr';
    }

}

export class Polygon {
    shape: string;
    fill: string;
    stroke: string;

    constructor(props: {
        shape?: string; fill?: string; stroke?: string;
    } | null) {
        this.shape = props && props.shape || 'rect';
        this.fill = props && props.fill || '#61dafb';
        this.stroke = props && props.stroke || '#7f7f7f';
    }
}