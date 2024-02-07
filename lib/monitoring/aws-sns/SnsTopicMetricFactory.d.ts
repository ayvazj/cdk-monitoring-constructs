import { ITopic } from "aws-cdk-lib/aws-sns";
import { MetricFactory } from "../../common";
export interface SnsTopicMetricFactoryProps {
    readonly topic: ITopic;
}
export declare class SnsTopicMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly topic: ITopic;
    constructor(metricFactory: MetricFactory, props: SnsTopicMetricFactoryProps);
    metricIncomingMessageCount(): import("../../common").MetricWithAlarmSupport;
    metricOutgoingMessageCount(): import("../../common").MetricWithAlarmSupport;
    metricAverageMessageSizeInBytes(): import("../../common").MetricWithAlarmSupport;
    metricNumberOfNotificationsFailed(): import("../../common").MetricWithAlarmSupport;
}
