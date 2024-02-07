import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory } from "../../common";
export interface KinesisDataStreamMetricFactoryProps {
    readonly streamName: string;
}
/**
 * @see https://docs.aws.amazon.com/streams/latest/dev/monitoring-with-cloudwatch.html
 */
export declare class KinesisDataStreamMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: KinesisDataStreamMetricFactoryProps);
    metricGetRecordsSumBytes(): import("../../common").MetricWithAlarmSupport;
    metricGetRecordsIteratorAgeMaxMs(): import("../../common").MetricWithAlarmSupport;
    metricGetRecordsLatencyAverageMs(): import("../../common").MetricWithAlarmSupport;
    metricGetRecordsSumCount(): import("../../common").MetricWithAlarmSupport;
    metricGetRecordsSuccessCount(): import("../../common").MetricWithAlarmSupport;
    metricIncomingDataSumBytes(): import("../../common").MetricWithAlarmSupport;
    metricIncomingDataSumCount(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordSumBytes(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordLatencyAverageMs(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordSuccessCount(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordsSumBytes(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordsLatencyAverageMs(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordsSuccessCount(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordsSuccessfulRecordsCount(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordsTotalRecordsCount(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordsFailedRecordsCount(): import("../../common").MetricWithAlarmSupport;
    metricPutRecordsThrottledRecordsCount(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated please use `metricReadProvisionedThroughputExceeded` instead
     */
    metricReadProvisionedThroughputExceededPercent(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated please use `metricWriteProvisionedThroughputExceeded` instead
     */
    metricWriteProvisionedThroughputExceededPercent(): import("../../common").MetricWithAlarmSupport;
    metricReadProvisionedThroughputExceeded(): import("../../common").MetricWithAlarmSupport;
    metricWriteProvisionedThroughputExceeded(): import("../../common").MetricWithAlarmSupport;
}
