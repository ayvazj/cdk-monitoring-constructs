import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IDatabaseCluster, ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { MetricFactory } from "../../common";
export interface RdsClusterMetricFactoryProps {
    /**
     * database cluster identifier (either this or `cluster` need to be specified)
     * @deprecated please use `cluster` instead
     */
    readonly clusterIdentifier?: string;
    /**
     * database cluster (either this or `clusterIdentifier` need to be specified)
     */
    readonly cluster?: IDatabaseCluster | ServerlessCluster;
}
export declare class RdsClusterMetricFactory {
    readonly clusterIdentifier: string;
    readonly cluster?: IDatabaseCluster | ServerlessCluster;
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: RdsClusterMetricFactoryProps);
    private static resolveDbClusterIdentifier;
    private isServerlessCluster;
    metricTotalConnectionCount(): import("../../common").MetricWithAlarmSupport;
    metricFreeStorageInBytes(): import("../../common").MetricWithAlarmSupport;
    metricUsedStorageInBytes(): import("../../common").MetricWithAlarmSupport;
    metricDiskSpaceUsageInPercent(): import("../../common").MetricWithAlarmSupport;
    metricAverageCpuUsageInPercent(): import("../../common").MetricWithAlarmSupport;
    metricSelectLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricInsertLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricUpdateLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricDeleteLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricCommitLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServerlessDatabaseCapacity(): import("../../common").MetricWithAlarmSupport;
    private metric;
}
