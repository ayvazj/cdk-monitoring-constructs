import { GraphWidget, HorizontalAnnotation, IWidget } from "aws-cdk-lib/aws-cloudwatch";
import { Ec2Service, IBaseService } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedEc2Service, NetworkLoadBalancedEc2Service } from "aws-cdk-lib/aws-ecs-patterns";
import { IApplicationLoadBalancer, IApplicationTargetGroup, INetworkLoadBalancer, INetworkTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { BaseServiceMetricFactory } from "./BaseServiceMetricFactory";
import { BaseMonitoringProps, HealthyTaskCountThreshold, HealthyTaskPercentThreshold, MetricFactory, MetricWithAlarmSupport, MinProcessedBytesThreshold, Monitoring, MonitoringScope, RunningTaskCountThreshold, TaskHealthAlarmFactory, ThroughputAlarmFactory, UnhealthyTaskCountThreshold, UsageAlarmFactory, UsageThreshold } from "../../common";
import { MonitoringHeaderWidget } from "../../dashboard";
import { ApplicationLoadBalancerMetricFactoryProps, ILoadBalancerMetricFactory, NetworkLoadBalancerMetricFactoryProps } from "../aws-loadbalancing";
export interface BaseEc2ServiceAlarms {
    /**
     * minimum number of tasks, as specified in your auto scaling config
     */
    readonly minAutoScalingTaskCount?: number;
    /**
     * maximum number of tasks, as specified in your auto scaling config
     */
    readonly maxAutoScalingTaskCount?: number;
    /**
     * Container Insights needs to be enabled for the cluster for this alarm
     */
    readonly addRunningTaskCountAlarm?: Record<string, RunningTaskCountThreshold>;
    readonly addCpuUsageAlarm?: Record<string, UsageThreshold>;
    readonly addMemoryUsageAlarm?: Record<string, UsageThreshold>;
}
/**
 * Monitoring props for any type of EC2 service.
 */
interface BaseEc2ServiceMonitoringProps extends BaseMonitoringProps, BaseEc2ServiceAlarms {
}
/**
 * Monitoring props for Simple EC2 service.
 */
export interface SimpleEc2ServiceMonitoringProps extends BaseEc2ServiceMonitoringProps {
    readonly ec2Service: Ec2Service;
}
/**
 * Base of Monitoring props for load-balanced EC2 service.
 */
interface BaseLoadBalancedEc2ServiceMonitoringProps extends BaseEc2ServiceMonitoringProps {
    readonly addHealthyTaskCountAlarm?: Record<string, HealthyTaskCountThreshold>;
    readonly addUnhealthyTaskCountAlarm?: Record<string, UnhealthyTaskCountThreshold>;
    readonly addHealthyTaskPercentAlarm?: Record<string, HealthyTaskPercentThreshold>;
    readonly addMinProcessedBytesAlarm?: Record<string, MinProcessedBytesThreshold>;
    /**
     * Invert the statistics of `HealthyHostCount` and `UnHealthyHostCount`.
     *
     * When `invertLoadBalancerTaskCountMetricsStatistics` is set to false, the minimum of `HealthyHostCount` and the maximum of `UnHealthyHostCount` are monitored.
     * When `invertLoadBalancerTaskCountMetricsStatistics` is set to true, the maximum of `HealthyHostCount` and the minimum of `UnHealthyHostCount` are monitored.
     *
     * `invertLoadBalancerTaskCountMetricsStatistics` is recommended to set to true as per the guidelines at
  https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-cloudwatch-metrics.html#metric-statistics
     *
     * @default false
     */
    readonly invertLoadBalancerTaskCountMetricsStatistics?: boolean;
}
/**
 * Monitoring props for load-balanced EC2 service.
 */
export interface Ec2ServiceMonitoringProps extends BaseLoadBalancedEc2ServiceMonitoringProps {
    readonly ec2Service: NetworkLoadBalancedEc2Service | ApplicationLoadBalancedEc2Service;
}
/**
 * Monitoring props for EC2 service with network load balancer and plain service.
 */
export interface Ec2NetworkLoadBalancerMonitoringProps extends NetworkLoadBalancerMetricFactoryProps, BaseLoadBalancedEc2ServiceMonitoringProps {
    readonly ec2Service: Ec2Service;
}
/**
 * Monitoring props for EC2 service with application load balancer and plain service.
 */
export interface Ec2ApplicationLoadBalancerMonitoringProps extends ApplicationLoadBalancerMetricFactoryProps, BaseLoadBalancedEc2ServiceMonitoringProps {
    readonly ec2Service: Ec2Service;
}
export interface CustomEc2ServiceMonitoringProps extends BaseLoadBalancedEc2ServiceMonitoringProps {
    readonly ec2Service: IBaseService;
    readonly loadBalancer?: IApplicationLoadBalancer | INetworkLoadBalancer;
    readonly targetGroup?: IApplicationTargetGroup | INetworkTargetGroup;
}
export declare class Ec2ServiceMonitoring extends Monitoring {
    readonly title: string;
    readonly metricFactory: MetricFactory;
    readonly baseServiceMetricFactory: BaseServiceMetricFactory;
    readonly loadBalancerMetricFactory?: ILoadBalancerMetricFactory;
    readonly taskHealthAlarmFactory: TaskHealthAlarmFactory;
    readonly throughputAlarmFactory: ThroughputAlarmFactory;
    readonly taskHealthAnnotations: HorizontalAnnotation[];
    readonly usageAlarmFactory: UsageAlarmFactory;
    readonly cpuUsageAnnotations: HorizontalAnnotation[];
    readonly memoryUsageAnnotations: HorizontalAnnotation[];
    readonly processedBytesAnnotations: HorizontalAnnotation[];
    readonly healthyTaskCountMetric?: MetricWithAlarmSupport;
    readonly unhealthyTaskCountMetric?: MetricWithAlarmSupport;
    readonly healthyTaskPercentMetric?: MetricWithAlarmSupport;
    readonly runningTaskCountMetric: MetricWithAlarmSupport;
    readonly cpuUtilisationMetric: MetricWithAlarmSupport;
    readonly memoryUtilisationMetric: MetricWithAlarmSupport;
    readonly activeTcpFlowCountMetric?: MetricWithAlarmSupport;
    readonly newTcpFlowCountMetric?: MetricWithAlarmSupport;
    readonly processedBytesMetric?: MetricWithAlarmSupport;
    private hasLoadBalancer;
    constructor(scope: MonitoringScope, props: CustomEc2ServiceMonitoringProps);
    summaryWidgets(): IWidget[];
    widgets(): IWidget[];
    createTitleWidget(): MonitoringHeaderWidget;
    createCpuWidget(width: number, height: number): GraphWidget;
    createMemoryWidget(width: number, height: number): GraphWidget;
    createTaskHealthWidget(width: number, height: number): GraphWidget;
    createTpcFlowsWidget(width: number, height: number): GraphWidget;
}
export {};
