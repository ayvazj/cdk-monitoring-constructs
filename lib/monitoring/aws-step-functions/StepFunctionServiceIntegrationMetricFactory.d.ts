import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory, RateComputationMethod } from "../../common";
export interface StepFunctionServiceIntegrationMetricFactoryProps {
    readonly serviceIntegrationResourceArn: string;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
}
export declare class StepFunctionServiceIntegrationMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly rateComputationMethod: RateComputationMethod;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: StepFunctionServiceIntegrationMetricFactoryProps);
    metricServiceIntegrationRunTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationRunTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationRunTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationScheduleTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationScheduleTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationScheduleTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationTimeP99InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationTimeP90InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationTimeP50InMillis(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationsFailed(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationsFailedRate(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationsScheduled(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationsStarted(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationsSucceeded(): import("../../common").MetricWithAlarmSupport;
    metricServiceIntegrationsTimedOut(): import("../../common").MetricWithAlarmSupport;
}
