import { IApplicationLoadBalancer, IApplicationTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { ILoadBalancerMetricFactory, BaseLoadBalancerMetricFactoryProps } from "./LoadBalancerMetricFactory";
import { MetricFactory } from "../../common";
/**
 * Props to create ApplicationLoadBalancerMetricFactory.
 */
export interface ApplicationLoadBalancerMetricFactoryProps extends BaseLoadBalancerMetricFactoryProps {
    readonly applicationLoadBalancer: IApplicationLoadBalancer;
    readonly applicationTargetGroup: IApplicationTargetGroup;
}
/**
 * Metric factory to create metrics for application load-balanced service.
 */
export declare class ApplicationLoadBalancerMetricFactory implements ILoadBalancerMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly applicationLoadBalancer: IApplicationLoadBalancer;
    protected readonly applicationTargetGroup: IApplicationTargetGroup;
    protected readonly invertStatisticsOfTaskCountEnabled: boolean;
    constructor(metricFactory: MetricFactory, props: ApplicationLoadBalancerMetricFactoryProps);
    metricHealthyTaskCount(): import("../../common").MetricWithAlarmSupport;
    metricUnhealthyTaskCount(): import("../../common").MetricWithAlarmSupport;
    metricHealthyTaskInPercent(): import("../../common").MetricWithAlarmSupport;
    metricActiveConnectionCount(): import("../../common").MetricWithAlarmSupport;
    metricNewConnectionCount(): import("../../common").MetricWithAlarmSupport;
    metricProcessedBytesMin(): import("../../common").MetricWithAlarmSupport;
}
