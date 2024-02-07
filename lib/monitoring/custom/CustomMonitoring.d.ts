import { Duration } from "aws-cdk-lib";
import { DimensionsMap, HorizontalAnnotation, IWidget, LegendPosition, YAxisProps } from "aws-cdk-lib/aws-cloudwatch";
import { AnomalyDetectingAlarmFactory, AnomalyDetectionThreshold, BaseMonitoringProps, CustomAlarmFactory, CustomThreshold, GraphWidgetType, MetricStatistic, MetricWithAlarmSupport, Monitoring, MonitoringScope } from "../../common";
export declare enum AxisPosition {
    LEFT = "left",
    RIGHT = "right"
}
/**
 * Custom metric with an alarm defined.
 */
export interface CustomMetricWithAlarm {
    /**
     * metric to alarm on
     */
    readonly metric: MetricWithAlarmSupport;
    /**
     * alarm friendly name
     */
    readonly alarmFriendlyName: string;
    /**
     * alarm definitions
     */
    readonly addAlarm: Record<string, CustomThreshold>;
    /**
     * axis (right or left) on which to graph metric
     * default: AxisPosition.LEFT
     */
    readonly position?: AxisPosition;
}
/**
 * Custom metric with anomaly detection.
 */
export interface CustomMetricWithAnomalyDetection {
    /**
     * metric to alarm on
     */
    readonly metric: MetricWithAlarmSupport;
    /**
     * anomaly detection period
     * @default - metric period (if defined) or global default
     */
    readonly period?: Duration;
    /**
     * alarm friendly name
     */
    readonly alarmFriendlyName: string;
    /**
     * standard deviation for the anomaly detection to be rendered on the graph widget
     */
    readonly anomalyDetectionStandardDeviationToRender: number;
    /**
     * adds alarm on a detected anomaly
     */
    readonly addAlarmOnAnomaly?: Record<string, AnomalyDetectionThreshold>;
}
/**
 * Custom metric search.
 */
export interface CustomMetricSearch {
    /**
     * metric namespace
     * @default - none
     */
    readonly namespace?: string;
    /**
     * search query (can be empty)
     */
    readonly searchQuery: string;
    /**
     * custom label for the metrics
     * @default - " "
     */
    readonly label?: string;
    /**
     * search dimensions (can be empty)
     */
    readonly dimensionsMap: DimensionsMap;
    /**
     * metric statistic
     */
    readonly statistic: MetricStatistic;
    /**
     * metric period
     * @default - global default
     */
    readonly period?: Duration;
    /**
     * axis (right or left) on which to graph metric
     * default: AxisPosition.LEFT
     */
    readonly position?: AxisPosition;
}
/**
 * Each custom metric can be of four types:
 * @see MetricWithAlarmSupport for a standard metric
 * @see CustomMetricSearch for a search
 * @see CustomMetricWithAlarm for a metric with an alarm
 * @see CustomMetricWithAnomalyDetection for a metric with an anomaly detecting alarm
 */
export declare type CustomMetric = MetricWithAlarmSupport | CustomMetricSearch | CustomMetricWithAlarm | CustomMetricWithAnomalyDetection;
/**
 * Custom metric group represents a single widget.
 */
export interface CustomMetricGroup {
    /**
     * title of the whole group
     */
    readonly title: string;
    /**
     * type of the widget
     * @default line
     */
    readonly graphWidgetType?: GraphWidgetType;
    /**
     * optional axis
     * @default undefined
     */
    readonly graphWidgetAxis?: YAxisProps;
    /**
     * optional right axis
     * @default undefined
     */
    readonly graphWidgetRightAxis?: YAxisProps;
    /**
     * graph widget legend
     * @default BOTTOM
     */
    readonly graphWidgetLegend?: LegendPosition;
    /**
     * @see {GraphWidgetProps.setPeriodToTimeRange}
     */
    readonly graphWidgetSetPeriodToTimeRange?: boolean;
    /**
     * @deprecated use addToSummaryDashboard. addToSummaryDashboard will take precedence over important.
     * @see addToSummaryDashboard
     */
    readonly important?: boolean;
    /**
     * Flag indicating this metric group should be included in the summary as well.
     * @default - addToSummaryDashboard from CustomMonitoringProps, defaulting to false
     */
    readonly addToSummaryDashboard?: boolean;
    /**
     * list of metrics in the group (can be defined in different ways, see the type documentation)
     */
    readonly metrics: CustomMetric[];
    /**
     * optional custom horizontal annotations which will be displayed over the metrics on the left axis
     * (if there are any alarms, any existing annotations will be merged together)
     */
    readonly horizontalAnnotations?: HorizontalAnnotation[];
    /**
     * optional custom horizontal annotations which will be displayed over the metrics on the right axis
     * (if there are any alarms, any existing annotations will be merged together)
     */
    readonly horizontalRightAnnotations?: HorizontalAnnotation[];
}
export interface CustomMonitoringProps extends BaseMonitoringProps {
    /**
     * optional description of the whole section, in markdown
     * @default no description
     */
    readonly description?: string;
    /**
     * optional height of the description widget, so the content fits
     * @default minimum height (should fit one or two lines of text)
     */
    readonly descriptionWidgetHeight?: number;
    /**
     * height override
     * @default default height
     */
    readonly height?: number;
    /**
     * define metric groups and metrics inside them (each metric group represents a widget)
     */
    readonly metricGroups: CustomMetricGroup[];
}
export interface CustomMetricGroupWithAnnotations {
    readonly metricGroup: CustomMetricGroup;
    readonly annotations: HorizontalAnnotation[];
    readonly rightAnnotations: HorizontalAnnotation[];
    readonly titleAddons: string[];
    readonly height?: number;
}
/**
 * Custom monitoring is a construct allowing you to monitor your own custom metrics.
 * The entire construct consists of metric groups.
 * Each metric group represents a single graph widget with multiple metrics.
 * Each metric inside the metric group represents a single metric inside a graph.
 * The widgets will be sized automatically to waste as little space as possible.
 */
export declare class CustomMonitoring extends Monitoring {
    readonly title: string;
    readonly description?: string;
    readonly descriptionWidgetHeight?: number;
    readonly height?: number;
    readonly addToSummaryDashboard: boolean;
    readonly customAlarmFactory: CustomAlarmFactory;
    readonly anomalyDetectingAlarmFactory: AnomalyDetectingAlarmFactory;
    readonly metricGroups: CustomMetricGroupWithAnnotations[];
    constructor(scope: MonitoringScope, props: CustomMonitoringProps);
    summaryWidgets(): IWidget[];
    widgets(): IWidget[];
    private getAllWidgets;
    private createDescriptionWidget;
    private createCustomMetricGroupWidgets;
    private toMetrics;
    private hasAlarm;
    private hasAnomalyDetection;
    private isSearch;
    private setupAlarm;
    private setupAnomalyDetectionAlarm;
}
