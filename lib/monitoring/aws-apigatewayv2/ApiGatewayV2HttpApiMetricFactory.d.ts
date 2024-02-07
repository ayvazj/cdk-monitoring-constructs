import { IHttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { LatencyType, MetricFactory, RateComputationMethod } from "../../common";
export interface ApiGatewayV2HttpApiMetricFactoryProps {
    readonly api: IHttpApi;
    /**
     * @default - $default
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
export declare class ApiGatewayV2HttpApiMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly fillTpsWithZeroes: boolean;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: ApiGatewayV2HttpApiMetricFactoryProps);
    /**
     * @deprecated use metricInvocationRate
     */
    metricTps(): import("../../common").MetricWithAlarmSupport;
    metricInvocationRate(): import("../../common").MetricWithAlarmSupport;
    metricInvocationCount(): import("../../common").MetricWithAlarmSupport;
    metric4xxCount(): import("../../common").MetricWithAlarmSupport;
    metric4xxRate(): import("../../common").MetricWithAlarmSupport;
    metric5xxCount(): import("../../common").MetricWithAlarmSupport;
    metric5xxRate(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricLatencyInMillis} instead.
     */
    metricLatencyP50InMillis(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricLatencyInMillis} instead.
     */
    metricLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricLatencyInMillis} instead.
     */
    metricLatencyP99InMillis(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricIntegrationLatencyInMillis} instead.
     */
    metricIntegrationLatencyP50InMillis(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricIntegrationLatencyInMillis} instead.
     */
    metricIntegrationLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated Use {@link metricIntegrationLatencyInMillis} instead.
     */
    metricIntegrationLatencyP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricIntegrationLatencyInMillis(latencyType: LatencyType): import("../../common").MetricWithAlarmSupport;
    metricLatencyInMillis(latencyType: LatencyType): import("../../common").MetricWithAlarmSupport;
}
