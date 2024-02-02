import styled from "styled-components";

export class Tooltip {
    show: boolean;

    constructor(props: { show?: boolean } | null) {
        this.show = props && props.show !== undefined || false;
    }
}

export interface Docker {
    show: boolean;
    position: string;
}

export class Title implements Docker {
    show: boolean;
    position: string;

    constructor(props: { show?: boolean, position?: string } | null) {
        this.show = props && props.show !== undefined ? props.show : false;
        this.position = props && props.position || "top";
    }


}

export class Legend implements Docker {
    show: boolean;
    position: string;

    constructor(props: { show?: boolean, position?: string } | null) {
        this.show = props && props.show !== undefined ? props.show : false;
        this.position = props && props.position || "top";
    }
}

export class ChartWrapper {
    tooltip: Tooltip;
    title: Title;
    legend: Legend;

    constructor(props: { tooltip?: Tooltip, title?: Title, legend?: Legend } | null) {
        this.tooltip = props && props.tooltip !== undefined ? props.tooltip : new Tooltip(null);
        this.title = props && props.title !== undefined ? props.title : new Title(null);
        this.legend = props && props.legend !== undefined ? props.legend : new Legend(null);
    }
}

export const ChartContainer = ({title, legend, tooltip}: ChartWrapper) => {

    const RowWrapper = styled.div``;
    const ColumnWrapper = styled.div``;
    const Tooltip = styled.svg`
        opacity: ${props => props && title && title.show !== undefined && title.show ? "1" : "0"};
    `;
    const HorizontalTitle = styled.div``;
    const VerticalTitle = styled.div``;
    const HorizontalLegend = styled.svg``;
    const VerticalLegend = styled.svg``;
    const Chart = styled.svg``;
    return <RowWrapper>
        <Tooltip></Tooltip>
        <HorizontalTitle></HorizontalTitle>
        <HorizontalLegend></HorizontalLegend>
        <ColumnWrapper>
            <VerticalTitle></VerticalTitle>
            <VerticalLegend></VerticalLegend>
            <Chart></Chart>
            <VerticalLegend></VerticalLegend>
            <VerticalTitle></VerticalTitle>
        </ColumnWrapper>
        <HorizontalLegend></HorizontalLegend>
        <HorizontalTitle></HorizontalTitle>
    </RowWrapper>
}