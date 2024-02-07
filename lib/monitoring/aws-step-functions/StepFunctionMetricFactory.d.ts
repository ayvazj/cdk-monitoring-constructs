import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IStateMachine } from "aws-cdk-lib/aws-stepfunctions";
import { MetricFactory, RateComputationMethod } from "../../common";
export interface StepFunctionMetricFactoryProps {
    readonly stateMachine: IStateMachine;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class StepFunctionMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: StepFunctionMetricFactoryProps);
    metricExecutionTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricExecutionTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricExecutionTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricExecutionsFailed(): import("../../common").MetricWithAlarmSupport;
    metricExecutionsFailedRate(): import("../../common").MetricWithAlarmSupport;
    metricExecutionsTimedOut(): import("../../common").MetricWithAlarmSupport;
    metricExecutionThrottled(): import("../../common").MetricWithAlarmSupport;
    metricExecutionsAborted(): import("../../common").MetricWithAlarmSupport;
    metricExecutionsStarted(): import("../../common").MetricWithAlarmSupport;
    metricExecutionsSucceeded(): import("../../common").MetricWithAlarmSupport;
}
