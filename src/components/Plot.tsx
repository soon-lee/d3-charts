export interface PlotItem {
    label: string;
    value: Map<string, Map<string, number>>[];
}

export interface PlotData {
    items: PlotItem[];
}

export interface PlotConfig {
    colors: Map<string, string>[];
}

export interface PlotProps {
    data: PlotData;
    config: PlotConfig;
}