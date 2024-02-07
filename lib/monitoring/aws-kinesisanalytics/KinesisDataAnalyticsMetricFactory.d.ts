import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory } from "../../common";
export interface KinesisDataAnalyticsMetricFactoryProps {
    readonly application: string;
}
/**
 * @see https://docs.aws.amazon.com/kinesisanalytics/latest/java/metrics-dimensions.html
 */
export declare class KinesisDataAnalyticsMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: KinesisDataAnalyticsMetricFactoryProps);
    metricKPUsCount(): import("../../common").MetricWithAlarmSupport;
    metricDowntimeMs(): import("../../common").MetricWithAlarmSupport;
    metricUptimeMs(): import("../../common").MetricWithAlarmSupport;
    metricFullRestartsCount(): import("../../common").MetricWithAlarmSupport;
    metricNumberOfFailedCheckpointsCount(): import("../../common").MetricWithAlarmSupport;
    metricLastCheckpointDurationMs(): import("../../common").MetricWithAlarmSupport;
    metricLastCheckpointSizeBytes(): import("../../common").MetricWithAlarmSupport;
    metricCpuUtilizationPercent(): import("../../common").MetricWithAlarmSupport;
    metricHeapMemoryUtilizationPercent(): import("../../common").MetricWithAlarmSupport;
    metricOldGenerationGCTimeMs(): import("../../common").MetricWithAlarmSupport;
    metricOldGenerationGCCount(): import("../../common").MetricWithAlarmSupport;
    private generateMetric;
}
