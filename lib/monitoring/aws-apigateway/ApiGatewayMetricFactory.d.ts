import { IRestApi } from "aws-cdk-lib/aws-apigateway";
import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { LatencyType, MetricFactory, RateComputationMethod } from "../../common";
export interface ApiGatewayMetricFactoryProps {
    /**
     * API to monitor
     */
    readonly api: IRestApi;
    /**
     * @default - prod
     */
    readonly apiStage?: string;
    /**
     * On undefined value is not set in dimensions
     */
    readonly apiMethod?: string;
    /**
     * On undefined value is not set in dimensions
     */
    readonly apiResource?: string;
    /**
     * @default - true
     */
    readonly fillTpsWithZeroes?: boolean;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class ApiGatewayMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly fillTpsWithZeroes: boolean;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: ApiGatewayMetricFactoryProps);
    /**
     * @deprecated use metricInvocationRate
     */
    metricTps(): import("../../common").MetricWithAlarmSupport;
    metricInvocationRate(): import("../../common").MetricWithAlarmSupport;
    metricInvocationCount(): import("../../common").MetricWithAlarmSupport;
    metric4XXErrorCount(): import("../../common").MetricWithAlarmSupport;
    metric4XXErrorRate(): import("../../common").MetricWithAlarmSupport;
    metric5XXFaultCount(): import("../../common").MetricWithAlarmSupport;
    metric5XXFaultRate(): import("../../common").MetricWithAlarmSupport;
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
    metricLatencyInMillis(latencyType: LatencyType): import("../../common").MetricWithAlarmSupport;
}
