import { GraphWidget, HorizontalAnnotation, IMetric, YAxisProps } from "aws-cdk-lib/aws-cloudwatch";
export interface SingleAxisGraphWidgetProps {
    readonly title?: string;
    readonly width: number;
    readonly height: number;
    readonly leftMetrics: IMetric[];
    readonly leftAxis: YAxisProps;
    readonly leftAnnotations?: HorizontalAnnotation[];
}
/**
 * Line graph widget with one axis only (left).
 * If there is just one metric, it will hide the legend to save space.
 * The purpose of this custom class is to make the properties more strict.
 * It will avoid graphs with undefined axis and dimensions.
 */
export declare class SingleAxisGraphWidget extends GraphWidget {
    constructor(props: SingleAxisGraphWidgetProps);
    private static transformProps;
}
export interface DoubleAxisGraphWidgetProps {
    readonly title?: string;
    readonly width: number;
    readonly height: number;
    readonly leftMetrics: IMetric[];
    readonly leftAxis: YAxisProps;
    readonly leftAnnotations?: HorizontalAnnotation[];
    readonly rightMetrics: IMetric[];
    readonly rightAxis: YAxisProps;
    readonly rightAnnotations?: HorizontalAnnotation[];
}
/**
 * Line graph widget with both left and right axes.
 * The purpose of this custom class is to make the properties more strict.
 * It will avoid graphs with undefined axes and dimensions.
 */
export declare class DoubleAxisGraphWidget extends GraphWidget {
    constructor(props: DoubleAxisGraphWidgetProps);
    private static transformProps;
}
