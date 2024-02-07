import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { MetricFactory, RateComputationMethod } from "../../common";
export interface StepFunctionLambdaIntegrationMetricFactoryProps {
    readonly lambdaFunction: IFunction;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class StepFunctionLambdaIntegrationMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: StepFunctionLambdaIntegrationMetricFactoryProps);
    metricFunctionRunTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionRunTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionRunTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionScheduleTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionScheduleTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionScheduleTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricFunctionsFailed(): import("../../common").MetricWithAlarmSupport;
    metricFunctionsFailedRate(): import("../../common").MetricWithAlarmSupport;
    metricFunctionsScheduled(): import("../../common").MetricWithAlarmSupport;
    metricFunctionsStarted(): import("../../common").MetricWithAlarmSupport;
    metricFunctionsSucceeded(): import("../../common").MetricWithAlarmSupport;
    metricFunctionsTimedOut(): import("../../common").MetricWithAlarmSupport;
}
