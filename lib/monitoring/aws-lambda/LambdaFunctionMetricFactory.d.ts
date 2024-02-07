import { IFunction } from "aws-cdk-lib/aws-lambda";
import { LatencyType, MetricFactory, RateComputationMethod } from "../../common";
export interface LambdaFunctionMetricFactoryProps {
    readonly lambdaFunction: IFunction;
    /**
     * @default - true
     */
    readonly fillTpsWithZeroes?: boolean;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
    /**
     * Generate dashboard charts for Lambda Insights metrics.
     *
     * To enable Lambda Insights on your Lambda function, see
     * https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-clouddevelopmentkit.html
     *
     * @default - false
     */
    readonly lambdaInsightsEnabled?: boolean;
}
export declare class LambdaFunctionMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly lambdaFunction: IFunction;
    protected readonly fillTpsWithZeroes: boolean;
    protected readonly rateComputationMethod: RateComputationMethod;
    constructor(metricFactory: MetricFactory, props: LambdaFunctionMetricFactoryProps);
    /**
     * @deprecated Use {@link metricInvocationRate} instead.
     */
    metricTps(): import("../../common").MetricWithAlarmSupport;
    metricInvocationRate(): import("../../common").MetricWithAlarmSupport;
    metricInvocationCount(): import("../../common").MetricWithAlarmSupport;
    metricThrottlesCount(): import("../../common").MetricWithAlarmSupport;
    metricThrottlesRate(): import("../../common").MetricWithAlarmSupport;
    metricFaultCount(): import("../../common").MetricWithAlarmSupport;
    metricFaultRate(): import("../../common").MetricWithAlarmSupport;
    metricLatencyInMillis(latencyType: LatencyType): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricLatencyInMillis} instead.
     */
    metricLatencyP99InMillis(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricLatencyInMillis} instead.
     */
    metricLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricLatencyInMillis} instead.
     */
    metricLatencyP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricConcurrentExecutions(): import("../../common").MetricWithAlarmSupport;
    metricProvisionedConcurrencySpilloverInvocations(): import("../../common").MetricWithAlarmSupport;
    metricProvisionedConcurrencySpilloverRate(): import("../../common").MetricWithAlarmSupport;
    metricMaxIteratorAgeInMillis(): import("../../common").MetricWithAlarmSupport;
}
