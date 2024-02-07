import { GraphWidget, HorizontalAnnotation, IWidget } from "aws-cdk-lib/aws-cloudwatch";
import { CloudWatchLogsMetricFactoryProps } from "./CloudWatchLogsMetricFactory";
import { AlarmFactory, BaseMonitoringProps, MetricWithAlarmSupport, MinUsageCountThreshold, Monitoring, MonitoringScope, UsageAlarmFactory } from "../../common";
import { MonitoringHeaderWidget } from "../../dashboard";
export interface LogMonitoringProps extends BaseMonitoringProps, CloudWatchLogsMetricFactoryProps {
    /**
     * Widget title
     *
     * @default - auto-generated title based on the pattern and limit
     */
    readonly title?: string;
    /**
     * Pattern to search for, e.g. "ERROR"
     */
    readonly pattern?: string;
    /**
     * Maximum number of log messages to search for.
     *
     * @default - 10
     */
    readonly limit?: number;
    readonly addMinIncomingLogsAlarm?: Record<string, MinUsageCountThreshold>;
}
/**
 * Monitors a CloudWatch log group for various patterns.
 */
export declare class LogMonitoring extends Monitoring {
    readonly logGroupName: string;
    readonly logGroupUrl?: string;
    readonly title?: string;
    readonly pattern?: string;
    readonly limit: number;
    readonly alarmFactory: AlarmFactory;
    readonly usageAlarmFactory: UsageAlarmFactory;
    readonly incomingLogEventsMetric: MetricWithAlarmSupport;
    readonly usageAnnotations: HorizontalAnnotation[];
    constructor(scope: MonitoringScope, props: LogMonitoringProps);
    summaryWidgets(): IWidget[];
    widgets(): IWidget[];
    createTitleWidget(): MonitoringHeaderWidget;
    createIncomingLogsWidget(width: number, height: number): GraphWidget;
    protected resolveRecommendedHeight(numRows: number): number;
}
