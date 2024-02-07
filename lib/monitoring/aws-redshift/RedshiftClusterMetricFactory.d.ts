import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory } from "../../common";
export interface RedshiftClusterMetricFactoryProps {
    readonly clusterIdentifier: string;
}
export declare class RedshiftClusterMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: RedshiftClusterMetricFactoryProps);
    metricTotalConnectionCount(): import("../../common").MetricWithAlarmSupport;
    metricAverageDiskSpaceUsageInPercent(): import("../../common").MetricWithAlarmSupport;
    metricAverageCpuUsageInPercent(): import("../../common").MetricWithAlarmSupport;
    metricShortQueryDurationP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricMediumQueryDurationP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricLongQueryDurationP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricMaintenanceModeEnabled(): import("../../common").MetricWithAlarmSupport;
    metricReadLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricWriteLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    private metricQueryDuration;
    private metric;
}
