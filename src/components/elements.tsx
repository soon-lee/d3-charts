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
    size: string;
    fill: string;
    stroke: string;

    constructor(props: {
        shape?: string; size?: string; fill?: string; stroke?: string;
    } | null) {
        this.shape = props && props.shape || 'rect';
        this.size = props && props.size || 'medium';
        this.fill = props && props.fill || '#61dafb';
        this.stroke = props && props.stroke || '#7f7f7f';
    }

    color(newColor: string) {
        if (newColor) this.fill = newColor;
        return this;
    }
}

export class Group {
    data: string;
    polygon: string;

    constructor(props: { data?: string, polygon?: string; } | null) {
        this.data = props && props.data || 'data-1';
        this.polygon = props && props.polygon || 'polygon-1';
    }
}

export class GroupedPolygon {
    key: string;
    polygon: Polygon;

    constructor(props: { key?: string, polygon?: Polygon; } | null) {
        this.key = props && props.key || '0';
        this.polygon = props && props.polygon || new Polygon(null);
    }
}

export class BorderBar {
    position: string;
    cross: number;
    offset: number;

    constructor(props: { position?: string, cross?: number, offset?: number; } | undefined) {
        this.position = props && props.position || 'top';
        this.cross = props && props.cross || 30;
        this.offset = props && props.offset || 0;
    }
}

export class Item {
    dimension: string;
    metric: string;

    constructor(props: { dimension?: string, metric?: string; } | undefined) {
        this.dimension = props && props.dimension || 'dimension';
        this.metric = props && props.metric || 'metric';
    }
}

export class DataItem {
    origin: Item[];
    dimension: string[];
    show: string[];
    render: string[];

    constructor(props: { origin?: Item[], dimension?: string[], show?: string[], render?: string[]; } | undefined) {
        this.origin = props && props.origin || [];
        this.dimension = props && props.dimension || [];
        this.show = props && props.show || [];
        this.render = props && props.render || [];
    }
}

export class Data {
    data: DataItem[];

    constructor(props: { data?: DataItem[]; } | undefined) {
        this.data = props && props.data || [];
    }
}