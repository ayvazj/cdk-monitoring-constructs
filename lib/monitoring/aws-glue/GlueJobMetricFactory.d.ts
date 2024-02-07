import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory, RateComputationMethod } from "../../common";
export interface GlueJobMetricFactoryProps {
    readonly jobName: string;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class GlueJobMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    protected readonly typeCountDimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: GlueJobMetricFactoryProps);
    metricTotalReadBytesFromS3(): import("../../common").MetricWithAlarmSupport;
    metricTotalWrittenBytesToS3(): import("../../common").MetricWithAlarmSupport;
    metricAverageExecutorCpuUsagePercentage(): import("../../common").MetricWithAlarmSupport;
    metricAverageExecutorMemoryUsagePercentage(): import("../../common").MetricWithAlarmSupport;
    metricActiveExecutorsAverage(): import("../../common").MetricWithAlarmSupport;
    metricCompletedStagesSum(): import("../../common").MetricWithAlarmSupport;
    metricCompletedTasksSum(): import("../../common").MetricWithAlarmSupport;
    metricFailedTasksSum(): import("../../common").MetricWithAlarmSupport;
    metricFailedTasksRate(): import("../../common").MetricWithAlarmSupport;
    metricKilledTasksSum(): import("../../common").MetricWithAlarmSupport;
    metricKilledTasksRate(): import("../../common").MetricWithAlarmSupport;
    metricMaximumNeededExecutors(): import("../../common").MetricWithAlarmSupport;
}
