import { IApplicationLoadBalancer, IApplicationTargetGroup, INetworkLoadBalancer, INetworkTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { MetricFactory, MetricWithAlarmSupport } from "../../common";
/**
 * Factory method to create appropriate metric factory based on the load balancer and target group type.
 * @param metricFactory metric factory
 * @param loadBalancer load balancer
 * @param targetGroup target group
 */
export declare function createLoadBalancerMetricFactory(metricFactory: MetricFactory, loadBalancer: INetworkLoadBalancer | IApplicationLoadBalancer, targetGroup: INetworkTargetGroup | IApplicationTargetGroup, invertStatisticsOfTaskCountEnabled?: boolean): ILoadBalancerMetricFactory;
/**
 * Base of Monitoring props for load-balancer metric factories.
 */
export interface BaseLoadBalancerMetricFactoryProps {
    /**
     * Invert the statistics of `HealthyHostCount` and `UnHealthyHostCount`.
     *
     * When `invertStatisticsOfTaskCountEnabled` is set to false, the minimum of `HealthyHostCount` and the maximum of `UnHealthyHostCount` are monitored.
     * When `invertStatisticsOfTaskCountEnabled` is set to true, the maximum of `HealthyHostCount` and the minimum of `UnHealthyHostCount` are monitored.
     *
     * `invertStatisticsOfTaskCountEnabled` is recommended to set to true as per the guidelines at
  https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-cloudwatch-metrics.html#metric-statistics
     *
     * @default false
     */
    readonly invertStatisticsOfTaskCountEnabled?: boolean;
}
/**
 * Common interface for load-balancer based service metric factories.
 */
export interface ILoadBalancerMetricFactory {
    metricHealthyTaskCount(): MetricWithAlarmSupport;
    metricUnhealthyTaskCount(): MetricWithAlarmSupport;
    metricHealthyTaskInPercent(): MetricWithAlarmSupport;
    metricActiveConnectionCount(): MetricWithAlarmSupport;
    metricNewConnectionCount(): MetricWithAlarmSupport;
    metricProcessedBytesMin(): MetricWithAlarmSupport;
}
