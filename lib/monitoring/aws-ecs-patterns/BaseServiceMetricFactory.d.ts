import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IBaseService } from "aws-cdk-lib/aws-ecs";
import { MetricFactory } from "../../common";
/**
 * Props to create BaseServiceMetricFactory.
 */
export interface BaseServiceMetricFactoryProps {
    readonly service: IBaseService;
}
/**
 * Metric factory for a base service (parent class for e.g. Fargate and EC2 services).
 */
export declare class BaseServiceMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    /**
     * @deprecated This isn't required by cdk-monitoring-constructs anymore; use your own reference.
     */
    protected readonly service: IBaseService;
    constructor(metricFactory: MetricFactory, props: BaseServiceMetricFactoryProps);
    metricClusterCpuUtilisationInPercent(): import("../../common").MetricWithAlarmSupport;
    metricClusterMemoryUtilisationInPercent(): import("../../common").MetricWithAlarmSupport;
    metricRunningTaskCount(): import("../../common").MetricWithAlarmSupport;
}
