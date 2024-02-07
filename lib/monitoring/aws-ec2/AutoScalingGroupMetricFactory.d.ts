import { IAutoScalingGroup } from "aws-cdk-lib/aws-autoscaling";
import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory } from "../../common";
export interface AutoScalingGroupMetricFactoryProps {
    readonly autoScalingGroup: IAutoScalingGroup;
}
export declare class AutoScalingGroupMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: AutoScalingGroupMetricFactoryProps);
    /**
     * The minimum size of the Auto Scaling group.
     */
    metricGroupMinSize(): import("../../common").MetricWithAlarmSupport;
    /**
     * The maximum size of the Auto Scaling group.
     */
    metricGroupMaxSize(): import("../../common").MetricWithAlarmSupport;
    /**
     * The number of instances that the Auto Scaling group attempts to maintain.
     */
    metricGroupDesiredCapacity(): import("../../common").MetricWithAlarmSupport;
    /**
       *
       The number of instances that are running as part of the Auto Scaling group.
       This metric does not include instances that are pending or terminating.
       */
    metricGroupInServiceInstances(): import("../../common").MetricWithAlarmSupport;
    /**
     * The number of instances that are pending. A pending instance is not yet in service.
     * This metric does not include instances that are in service or terminating.
     */
    metricGroupPendingInstances(): import("../../common").MetricWithAlarmSupport;
    /**
     * The number of instances that are in a Standby state.
     * Instances in this state are still running but are not actively in service.
     */
    metricGroupStandbyInstances(): import("../../common").MetricWithAlarmSupport;
    /**
     * The number of instances that are in the process of terminating.
     * This metric does not include instances that are in service or pending.
     */
    metricGroupTerminatingInstances(): import("../../common").MetricWithAlarmSupport;
    /**
     * The total number of instances in the Auto Scaling group.
     * This metric identifies the number of instances that are in service, pending, and terminating.
     */
    metricGroupTotalInstances(): import("../../common").MetricWithAlarmSupport;
    private createMetric;
}
