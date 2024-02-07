import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IActivity } from "aws-cdk-lib/aws-stepfunctions";
import { MetricFactory, RateComputationMethod } from "../../common";
export interface StepFunctionActivityMetricFactoryProps {
    readonly activity: IActivity;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class StepFunctionActivityMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: StepFunctionActivityMetricFactoryProps);
    metricActivityRunTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivityRunTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivityRunTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivityScheduleTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivityScheduleTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivityScheduleTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivityTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivityTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivityTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricActivitiesFailed(): import("../../common").MetricWithAlarmSupport;
    metricActivitiesFailedRate(): import("../../common").MetricWithAlarmSupport;
    metricActivitiesHeartbeatTimedOut(): import("../../common").MetricWithAlarmSupport;
    metricActivitiesScheduled(): import("../../common").MetricWithAlarmSupport;
    metricActivitiesStarted(): import("../../common").MetricWithAlarmSupport;
    metricActivitiesSucceeded(): import("../../common").MetricWithAlarmSupport;
    metricActivitiesTimedOut(): import("../../common").MetricWithAlarmSupport;
}
