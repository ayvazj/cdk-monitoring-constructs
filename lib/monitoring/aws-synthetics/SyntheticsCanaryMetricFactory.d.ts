import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { Canary } from "aws-cdk-lib/aws-synthetics";
import { MetricFactory, RateComputationMethod } from "../../common/index";
export interface SyntheticsCanaryMetricFactoryProps {
    /**
     * CloudWatch Canary to monitor
     */
    readonly canary: Canary;
    /**
     * Method used to calculate relative rates
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class SyntheticsCanaryMetricFactory {
    protected readonly canary: Canary;
    protected readonly metricFactory: MetricFactory;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: SyntheticsCanaryMetricFactoryProps);
    metricLatencyAverageInMillis(): import("../../common").MetricWithAlarmSupport;
    metricSuccessInPercent(): import("../../common").MetricWithAlarmSupport;
    metric4xxErrorCount(): import("../../common").MetricWithAlarmSupport;
    metric4xxErrorRate(): import("../../common").MetricWithAlarmSupport;
    metric5xxFaultCount(): import("../../common").MetricWithAlarmSupport;
    metric5xxFaultRate(): import("../../common").MetricWithAlarmSupport;
}
