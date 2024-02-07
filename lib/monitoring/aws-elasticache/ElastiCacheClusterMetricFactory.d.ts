import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory } from "../../common";
export declare enum ElastiCacheClusterType {
    MEMCACHED = 0,
    REDIS = 1
}
export interface ElastiCacheClusterMetricFactoryProps {
    /**
     * Cluster to monitor
     * @default - monitor all clusters
     */
    readonly clusterId?: string;
}
/**
 * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/CacheMetrics.html
 */
export declare class ElastiCacheClusterMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: ElastiCacheClusterMetricFactoryProps);
    metricMaxItemCount(): import("../../common").MetricWithAlarmSupport;
    metricEvictions(): import("../../common").MetricWithAlarmSupport;
    metricAverageFreeableMemoryInBytes(): import("../../common").MetricWithAlarmSupport;
    metricAverageUnusedMemoryInBytes(): import("../../common").MetricWithAlarmSupport;
    metricAverageCachedItemsSizeInBytes(): import("../../common").MetricWithAlarmSupport;
    metricAverageSwapUsageInBytes(): import("../../common").MetricWithAlarmSupport;
    metricMaxCpuUtilizationInPercent(): import("../../common").MetricWithAlarmSupport;
    /**
     * Because Redis is single-threaded, you can use this metric to analyze the load of the Redis process itself.
     * Note that you may want to monitor both Engine CPU Utilization as well as CPU Utilization as background
     * processes can take up a significant portion of the CPU workload. This is especially important for
     * hosts with 2 vCPUs or less.
     *
     * @see https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html
     */
    metricMaxRedisEngineCpuUtilizationInPercent(): import("../../common").MetricWithAlarmSupport;
    metricAverageConnections(): import("../../common").MetricWithAlarmSupport;
    metricNetworkBytesIn(): import("../../common").MetricWithAlarmSupport;
    metricNetworkBytesOut(): import("../../common").MetricWithAlarmSupport;
}
