import { GraphWidget, HorizontalAnnotation, IWidget } from "aws-cdk-lib/aws-cloudwatch";
import { FargateService, IBaseService } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService, NetworkLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { IApplicationLoadBalancer, IApplicationTargetGroup, INetworkLoadBalancer, INetworkTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { BaseServiceMetricFactory } from "./BaseServiceMetricFactory";
import { BaseMonitoringProps, HealthyTaskCountThreshold, HealthyTaskPercentThreshold, MetricFactory, MetricWithAlarmSupport, MinProcessedBytesThreshold, Monitoring, MonitoringScope, RunningTaskCountThreshold, TaskHealthAlarmFactory, ThroughputAlarmFactory, UnhealthyTaskCountThreshold, UsageAlarmFactory, UsageThreshold } from "../../common";
import { MonitoringHeaderWidget } from "../../dashboard";
import { ApplicationLoadBalancerMetricFactoryProps, ILoadBalancerMetricFactory, NetworkLoadBalancerMetricFactoryProps } from "../aws-loadbalancing";
export interface BaseFargateServiceAlarms {
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
 * Monitoring props for any type of Fargate service.
 */
interface BaseFargateServiceMonitoringProps extends BaseMonitoringProps, BaseFargateServiceAlarms {
}
/**
 * Monitoring props for Simple Fargate service.
 */
export interface SimpleFargateServiceMonitoringProps extends BaseFargateServiceMonitoringProps {
    readonly fargateService: FargateService;
}
/**
 * Base of Monitoring props for load-balanced Fargate service.
 */
interface BaseLoadBalancedFargateServiceMonitoringProps extends BaseFargateServiceMonitoringProps {
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
 * Monitoring props for load-balanced Fargate service.
 */
export interface FargateServiceMonitoringProps extends BaseLoadBalancedFargateServiceMonitoringProps {
    readonly fargateService: NetworkLoadBalancedFargateService | ApplicationLoadBalancedFargateService;
}
/**
 * Monitoring props for Fargate service with network load balancer and plain service.
 */
export interface FargateNetworkLoadBalancerMonitoringProps extends NetworkLoadBalancerMetricFactoryProps, BaseLoadBalancedFargateServiceMonitoringProps {
    readonly fargateService: FargateService;
}
/**
 * Monitoring props for Fargate service with application load balancer and plain service.
 */
export interface FargateApplicationLoadBalancerMonitoringProps extends ApplicationLoadBalancerMetricFactoryProps, BaseLoadBalancedFargateServiceMonitoringProps {
    readonly fargateService: FargateService;
}
export interface CustomFargateServiceMonitoringProps extends BaseLoadBalancedFargateServiceMonitoringProps {
    readonly fargateService: IBaseService;
    readonly loadBalancer?: IApplicationLoadBalancer | INetworkLoadBalancer;
    readonly targetGroup?: IApplicationTargetGroup | INetworkTargetGroup;
}
export declare class FargateServiceMonitoring extends Monitoring {
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
    constructor(scope: MonitoringScope, props: CustomFargateServiceMonitoringProps);
    summaryWidgets(): IWidget[];
    widgets(): IWidget[];
    createTitleWidget(): MonitoringHeaderWidget;
    createCpuWidget(width: number, height: number): GraphWidget;
    createMemoryWidget(width: number, height: number): GraphWidget;
    createTaskHealthWidget(width: number, height: number): GraphWidget;
    createTpcFlowsWidget(width: number, height: number): GraphWidget;
}
export {};
