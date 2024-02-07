import { Domain, OpenSearchBackportedMetrics } from "./OpenSearchBackportedMetrics";
import { MetricFactory, RateComputationMethod } from "../../common";
export interface OpenSearchClusterMetricFactoryProps {
    readonly domain: Domain;
    /**
     * @default - true
     */
    readonly fillTpsWithZeroes?: boolean;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class OpenSearchClusterMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly domainMetrics: OpenSearchBackportedMetrics;
    protected readonly fillTpsWithZeroes: boolean;
    protected readonly rateComputationMethod: RateComputationMethod;
    constructor(metricFactory: MetricFactory, props: OpenSearchClusterMetricFactoryProps);
    metricSearchCount(): import("aws-cdk-lib/aws-cloudwatch").Metric;
    metricSearchRate(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated use metricSearchRate
     */
    metricTps(): import("../../common").MetricWithAlarmSupport;
    metricIndexingLatencyP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricIndexingLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricIndexingLatencyP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricSearchLatencyP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricSearchLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricSearchLatencyP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricClusterStatusRed(): import("../../common").MetricWithAlarmSupport;
    metricClusterStatusYellow(): import("../../common").MetricWithAlarmSupport;
    metricDiskSpaceUsageInPercent(): import("../../common").MetricWithAlarmSupport;
    metricCpuUsage(): import("../../common").MetricWithAlarmSupport;
    metricMasterCpuUsage(): import("../../common").MetricWithAlarmSupport;
    metricJvmMemoryPressure(): import("../../common").MetricWithAlarmSupport;
    metricMasterJvmMemoryPressure(): import("../../common").MetricWithAlarmSupport;
    metricClusterIndexWritesBlocked(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated use metricClusterIndexWritesBlocked instead
     */
    metricClusterIndexWriteBlocked(): import("../../common").MetricWithAlarmSupport;
    metricNodes(): import("../../common").MetricWithAlarmSupport;
    metricAutomatedSnapshotFailure(): import("../../common").MetricWithAlarmSupport;
    metricKmsKeyError(): import("../../common").MetricWithAlarmSupport;
    metricKmsKeyInaccessible(): import("../../common").MetricWithAlarmSupport;
}
