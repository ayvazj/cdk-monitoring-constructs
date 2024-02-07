import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IDatabaseCluster } from "aws-cdk-lib/aws-docdb";
import { LatencyType, MetricFactory } from "../../common";
export interface DocumentDbMetricFactoryProps {
    /**
     * database cluster
     */
    readonly cluster: IDatabaseCluster;
}
export declare class DocumentDbMetricFactory {
    readonly clusterIdentifier: string;
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: DocumentDbMetricFactoryProps);
    metricAverageCpuUsageInPercent(): import("../../common").MetricWithAlarmSupport;
    metricMaxConnectionCount(): import("../../common").MetricWithAlarmSupport;
    metricMaxCursorCount(): import("../../common").MetricWithAlarmSupport;
    metricMaxTransactionOpenCount(): import("../../common").MetricWithAlarmSupport;
    metricOperationsThrottledDueLowMemoryCount(): import("../../common").MetricWithAlarmSupport;
    metricReadLatencyInMillis(latencyType: LatencyType): import("../../common").MetricWithAlarmSupport;
    metricWriteLatencyInMillis(latencyType: LatencyType): import("../../common").MetricWithAlarmSupport;
    private metric;
}
