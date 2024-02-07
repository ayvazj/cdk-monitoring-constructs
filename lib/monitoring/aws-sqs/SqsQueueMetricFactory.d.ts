import { IQueue } from "aws-cdk-lib/aws-sqs";
import { MetricFactory } from "../../common";
export interface SqsQueueMetricFactoryProps {
    readonly queue: IQueue;
}
export declare class SqsQueueMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly queue: IQueue;
    constructor(metricFactory: MetricFactory, props: SqsQueueMetricFactoryProps);
    metricApproximateVisibleMessageCount(): import("../../common").MetricWithAlarmSupport;
    metricIncomingMessageCount(): import("../../common").MetricWithAlarmSupport;
    metricDeletedMessageCount(): import("../../common").MetricWithAlarmSupport;
    metricApproximateAgeOfOldestMessageInSeconds(): import("../../common").MetricWithAlarmSupport;
    metricAverageMessageSizeInBytes(): import("../../common").MetricWithAlarmSupport;
    metricProductionRate(): import("../../common").MetricWithAlarmSupport;
    metricConsumptionRate(): import("../../common").MetricWithAlarmSupport;
    metricTimeToDrain(): import("../../common").MetricWithAlarmSupport;
}
