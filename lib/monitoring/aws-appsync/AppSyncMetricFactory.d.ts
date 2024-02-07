import { IGraphqlApi } from "aws-cdk-lib/aws-appsync";
import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory, RateComputationMethod } from "../../common";
export interface AppSyncMetricFactoryProps {
    /**
     * the GraphQL API to monitor
     */
    readonly api: IGraphqlApi;
    /**
     * whether the TPS should be filled with zeroes
     * @default - true
     */
    readonly fillTpsWithZeroes?: boolean;
    /**
     * method to compute TPS
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class AppSyncMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly fillTpsWithZeroes: boolean;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: AppSyncMetricFactoryProps);
    /**
     * @deprecated use metricRequestRate
     */
    metricTps(): import("../../common").MetricWithAlarmSupport;
    metricRequestRate(): import("../../common").MetricWithAlarmSupport;
    metricRequestCount(): import("../../common").MetricWithAlarmSupport;
    metricLatencyP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricLatencyP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricLatencyP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metric4XXErrorCount(): import("../../common").MetricWithAlarmSupport;
    metric4XXErrorRate(): import("../../common").MetricWithAlarmSupport;
    metric5XXFaultCount(): import("../../common").MetricWithAlarmSupport;
    metric5XXFaultRate(): import("../../common").MetricWithAlarmSupport;
}
