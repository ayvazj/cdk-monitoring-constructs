import { INetworkLoadBalancer, INetworkTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { ILoadBalancerMetricFactory, BaseLoadBalancerMetricFactoryProps } from "./LoadBalancerMetricFactory";
import { MetricFactory } from "../../common";
/**
 * Props to create NetworkLoadBalancerMetricFactory.
 */
export interface NetworkLoadBalancerMetricFactoryProps extends BaseLoadBalancerMetricFactoryProps {
    readonly networkLoadBalancer: INetworkLoadBalancer;
    readonly networkTargetGroup: INetworkTargetGroup;
}
/**
 * Metric factory to create metrics for network load-balanced service.
 */
export declare class NetworkLoadBalancerMetricFactory implements ILoadBalancerMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly networkLoadBalancer: INetworkLoadBalancer;
    protected readonly networkTargetGroup: INetworkTargetGroup;
    protected readonly invertStatisticsOfTaskCountEnabled: boolean;
    constructor(metricFactory: MetricFactory, props: NetworkLoadBalancerMetricFactoryProps);
    metricHealthyTaskCount(): import("../../common").MetricWithAlarmSupport;
    metricUnhealthyTaskCount(): import("../../common").MetricWithAlarmSupport;
    metricHealthyTaskInPercent(): import("../../common").MetricWithAlarmSupport;
    metricActiveConnectionCount(): import("../../common").MetricWithAlarmSupport;
    metricNewConnectionCount(): import("../../common").MetricWithAlarmSupport;
    metricProcessedBytesMin(): import("../../common").MetricWithAlarmSupport;
}
