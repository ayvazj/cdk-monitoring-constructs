import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IDatabaseInstance } from "aws-cdk-lib/aws-rds";
import { LatencyType, MetricFactory } from "../../common";
export interface RdsInstanceMetricFactoryProps {
    /**
     * database instance
     */
    readonly instance?: IDatabaseInstance;
}
export declare class RdsInstanceMetricFactory {
    readonly instanceIdentifier: string;
    readonly instance?: IDatabaseInstance;
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: RdsInstanceMetricFactoryProps);
    private static resolveDbInstanceIdentifier;
    metricTotalConnectionCount(): import("../../common").MetricWithAlarmSupport;
    metricAverageCpuUsageInPercent(): import("../../common").MetricWithAlarmSupport;
    metricAverageFreeStorageSpace(): import("../../common").MetricWithAlarmSupport;
    metricAverageFreeableMemory(): import("../../common").MetricWithAlarmSupport;
    metricReadLatencyInMillis(latencyType: LatencyType): import("../../common").MetricWithAlarmSupport;
    metricReadThroughput(): import("../../common").MetricWithAlarmSupport;
    metricReadIops(): import("../../common").MetricWithAlarmSupport;
    metricWriteLatencyInMillis(latencyType: LatencyType): import("../../common").MetricWithAlarmSupport;
    metricWriteThroughput(): import("../../common").MetricWithAlarmSupport;
    metricWriteIops(): import("../../common").MetricWithAlarmSupport;
    private metric;
}
