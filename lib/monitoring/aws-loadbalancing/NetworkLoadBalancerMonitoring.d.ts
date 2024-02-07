import { GraphWidget, HorizontalAnnotation, IWidget } from "aws-cdk-lib/aws-cloudwatch";
import { NetworkLoadBalancerMetricFactory, NetworkLoadBalancerMetricFactoryProps } from "./NetworkLoadBalancerMetricFactory";
import { BaseMonitoringProps, HealthyTaskCountThreshold, HealthyTaskPercentThreshold, MetricWithAlarmSupport, MinProcessedBytesThreshold, Monitoring, MonitoringScope, TaskHealthAlarmFactory, ThroughputAlarmFactory, UnhealthyTaskCountThreshold } from "../../common";
import { MonitoringHeaderWidget } from "../../dashboard";
export interface NetworkLoadBalancerMonitoringProps extends NetworkLoadBalancerMetricFactoryProps, BaseMonitoringProps {
    readonly addHealthyTaskCountAlarm?: Record<string, HealthyTaskCountThreshold>;
    readonly addUnhealthyTaskCountAlarm?: Record<string, UnhealthyTaskCountThreshold>;
    readonly addHealthyTaskPercentAlarm?: Record<string, HealthyTaskPercentThreshold>;
    readonly addMinProcessedBytesAlarm?: Record<string, MinProcessedBytesThreshold>;
}
export declare class NetworkLoadBalancerMonitoring extends Monitoring {
    protected readonly humanReadableName: string;
    protected readonly metricFactory: NetworkLoadBalancerMetricFactory;
    protected readonly taskHealthAlarmFactory: TaskHealthAlarmFactory;
    protected readonly throughputAlarmFactory: ThroughputAlarmFactory;
    protected readonly taskHealthAnnotations: HorizontalAnnotation[];
    protected readonly processedBytesAnnotations: HorizontalAnnotation[];
    protected readonly healthyTaskCountMetric: MetricWithAlarmSupport;
    protected readonly unhealthyTaskCountMetric: MetricWithAlarmSupport;
    protected readonly healthyTaskPercentMetric: MetricWithAlarmSupport;
    protected readonly activeTcpFlowCountMetric: MetricWithAlarmSupport;
    protected readonly newTcpFlowCountMetric: MetricWithAlarmSupport;
    protected readonly processedBytesMetric: MetricWithAlarmSupport;
    constructor(scope: MonitoringScope, props: NetworkLoadBalancerMonitoringProps);
    summaryWidgets(): IWidget[];
    widgets(): IWidget[];
    protected createTitleWidget(): MonitoringHeaderWidget;
    protected createTaskHealthWidget(width: number, height: number): GraphWidget;
    protected createTcpFlowsWidget(width: number, height: number): GraphWidget;
}
