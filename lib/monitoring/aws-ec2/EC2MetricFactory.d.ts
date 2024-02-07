import { IAutoScalingGroup } from "aws-cdk-lib/aws-autoscaling";
import { IMetric } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory, MetricStatistic } from "../../common";
export interface IEC2MetricFactoryStrategy {
    createMetrics(metricFactory: MetricFactory, metricName: string, statistic: MetricStatistic): IMetric[];
}
export interface EC2MetricFactoryProps {
    /**
     * Auto-Scaling Group to monitor.
     * @default - no Auto-Scaling Group filter
     */
    readonly autoScalingGroup?: IAutoScalingGroup;
    /**
     * Selected IDs of EC2 instances to monitor.
     * @default - no instance filter
     */
    readonly instanceIds?: string[];
}
export declare class EC2MetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly strategy: IEC2MetricFactoryStrategy;
    constructor(metricFactory: MetricFactory, props: EC2MetricFactoryProps);
    /**
     * The percentage of allocated EC2 compute units that are currently in use on the instance.
     * This metric identifies the processing power required to run an application on a selected instance.
     * Depending on the instance type, tools in your operating system can show a lower percentage than
     * CloudWatch when the instance is not allocated a full processor core.
     */
    metricAverageCpuUtilisationPercent(): IMetric[];
    /**
     * Bytes read from all instance store volumes available to the instance.
     * This metric is used to determine the volume of the data the application reads from the hard disk of the instance.
     * This can be used to determine the speed of the application.
     */
    metricAverageDiskReadBytes(): import("../../common").MetricWithAlarmSupport[];
    /**
     * Bytes written to all instance store volumes available to the instance.
     * This metric is used to determine the volume of the data the application writes onto the hard disk of the instance.
     * This can be used to determine the speed of the application.
     */
    metricAverageDiskWriteBytes(): import("../../common").MetricWithAlarmSupport[];
    /**
     * Completed read operations from all instance store volumes available to the instance in a specified period of time.
     */
    metricAverageDiskReadOps(): import("../../common").MetricWithAlarmSupport[];
    /**
     * Completed write operations to all instance store volumes available to the instance in a specified period of time.
     */
    metricAverageDiskWriteOps(): import("../../common").MetricWithAlarmSupport[];
    /**
     * The number of bytes received on all network interfaces by the instance.
     * This metric identifies the volume of incoming network traffic to a single instance.
     */
    metricAverageNetworkInRateBytes(): IMetric[];
    /**
     * The number of bytes sent out on all network interfaces by the instance.
     * This metric identifies the volume of outgoing network traffic from a single instance.
     */
    metricAverageNetworkOutRateBytes(): IMetric[];
    private createDiskMetrics;
    private createMetrics;
}
