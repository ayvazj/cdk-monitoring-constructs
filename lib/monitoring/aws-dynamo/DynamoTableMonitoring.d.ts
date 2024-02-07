import { GraphWidget, HorizontalAnnotation, IMetric, IWidget } from "aws-cdk-lib/aws-cloudwatch";
import { BillingMode, Operation } from "aws-cdk-lib/aws-dynamodb";
import { DynamoTableMetricFactoryProps } from "./DynamoTableMetricFactory";
import { AlarmFactory, BaseMonitoringProps, ConsumedCapacityThreshold, DynamoAlarmFactory, ErrorAlarmFactory, ErrorCountThreshold, LatencyAlarmFactory, LatencyThreshold, MetricWithAlarmSupport, Monitoring, MonitoringScope, ThrottledEventsThreshold } from "../../common";
import { MonitoringHeaderWidget } from "../../dashboard";
export interface DynamoTableMonitoringOptions extends BaseMonitoringProps {
    readonly addConsumedReadCapacityAlarm?: Record<string, ConsumedCapacityThreshold>;
    readonly addConsumedWriteCapacityAlarm?: Record<string, ConsumedCapacityThreshold>;
    readonly addReadThrottledEventsCountAlarm?: Record<string, ThrottledEventsThreshold>;
    readonly addWriteThrottledEventsCountAlarm?: Record<string, ThrottledEventsThreshold>;
    readonly addSystemErrorCountAlarm?: Record<string, ErrorCountThreshold>;
    readonly addAverageSuccessfulGetRecordsLatencyAlarm?: Record<string, LatencyThreshold>;
    readonly addAverageSuccessfulQueryLatencyAlarm?: Record<string, LatencyThreshold>;
    readonly addAverageSuccessfulScanLatencyAlarm?: Record<string, LatencyThreshold>;
    readonly addAverageSuccessfulPutItemLatencyAlarm?: Record<string, LatencyThreshold>;
    readonly addAverageSuccessfulGetItemLatencyAlarm?: Record<string, LatencyThreshold>;
    readonly addAverageSuccessfulUpdateItemLatencyAlarm?: Record<string, LatencyThreshold>;
    readonly addAverageSuccessfulDeleteItemLatencyAlarm?: Record<string, LatencyThreshold>;
    readonly addAverageSuccessfulBatchGetItemLatencyAlarm?: Record<string, LatencyThreshold>;
    readonly addAverageSuccessfulBatchWriteItemLatencyAlarm?: Record<string, LatencyThreshold>;
}
export interface DynamoTableMonitoringProps extends DynamoTableMetricFactoryProps, DynamoTableMonitoringOptions {
}
export declare class DynamoTableMonitoring extends Monitoring {
    readonly title: string;
    readonly tableUrl?: string;
    readonly tableBillingMode: BillingMode;
    readonly alarmFactory: AlarmFactory;
    readonly errorAlarmFactory: ErrorAlarmFactory;
    readonly latencyAlarmFactory: LatencyAlarmFactory;
    readonly dynamoCapacityAlarmFactory: DynamoAlarmFactory;
    readonly latencyAnnotations: HorizontalAnnotation[];
    readonly errorCountAnnotations: HorizontalAnnotation[];
    readonly dynamoReadCapacityAnnotations: HorizontalAnnotation[];
    readonly dynamoWriteCapacityAnnotations: HorizontalAnnotation[];
    readonly throttledEventsAnnotations: HorizontalAnnotation[];
    readonly provisionedReadUnitsMetric: MetricWithAlarmSupport;
    readonly provisionedWriteUnitsMetric: MetricWithAlarmSupport;
    readonly consumedReadUnitsMetric: MetricWithAlarmSupport;
    readonly consumedWriteUnitsMetric: MetricWithAlarmSupport;
    readonly readThrottleCountMetric: MetricWithAlarmSupport;
    readonly writeThrottleCountMetric: MetricWithAlarmSupport;
    readonly systemErrorMetric: MetricWithAlarmSupport;
    readonly latencyAverageSearchMetrics: IMetric;
    readonly averagePerOperationLatencyMetrics: Record<string, MetricWithAlarmSupport>;
    readonly readCapacityUsageMetric: MetricWithAlarmSupport;
    readonly writeCapacityUsageMetric: MetricWithAlarmSupport;
    constructor(scope: MonitoringScope, props: DynamoTableMonitoringProps);
    protected forEachOperationLatencyAlarmDefinition(operation: Operation, alarm?: Record<string, LatencyThreshold>): void;
    summaryWidgets(): IWidget[];
    widgets(): IWidget[];
    createLatencyWidget(width: number, height: number): GraphWidget;
    createThrottlesWidget(width: number, height: number): GraphWidget;
    createErrorsWidget(width: number, height: number): GraphWidget;
    createReadCapacityWidget(width: number, height: number): GraphWidget;
    createWriteCapacityWidget(width: number, height: number): GraphWidget;
    createTitleWidget(): MonitoringHeaderWidget;
    private resolveTableName;
    private resolveTableBillingMode;
}
