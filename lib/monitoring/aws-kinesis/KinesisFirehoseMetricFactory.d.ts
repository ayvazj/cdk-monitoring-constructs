import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory } from "../../common";
export interface KinesisFirehoseMetricFactoryProps {
    readonly deliveryStreamName: string;
}
/**
 * @see https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-metrics.html
 */
export declare class KinesisFirehoseMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: KinesisFirehoseMetricFactoryProps);
    metricSuccessfulConversionCount(): import("../../common").MetricWithAlarmSupport;
    metricFailedConversionCount(): import("../../common").MetricWithAlarmSupport;
    metricIncomingBytes(): import("../../common").MetricWithAlarmSupport;
    metricIncomingPutRequests(): import("../../common").MetricWithAlarmSupport;
    metricIncomingRecordCount(): import("../../common").MetricWithAlarmSupport;
    metricThrottledRecordCount(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordBatchLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricIncomingBytesToLimitRate(): import("../../common").MetricWithAlarmSupport;
    metricIncomingRecordsToLimitRate(): import("../../common").MetricWithAlarmSupport;
    metricIncomingPutRequestsToLimitRate(): import("../../common").MetricWithAlarmSupport;
    metricBytesPerSecondLimit(): import("../../common").MetricWithAlarmSupport;
    metricRecordsPerSecondLimit(): import("../../common").MetricWithAlarmSupport;
    metricPutRequestsPerSecondLimit(): import("../../common").MetricWithAlarmSupport;
}
