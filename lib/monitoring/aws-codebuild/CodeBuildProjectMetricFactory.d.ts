import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IProject } from "aws-cdk-lib/aws-codebuild";
import { MetricFactory } from "../../common";
export interface CodeBuildProjectMetricFactoryProps {
    readonly project: IProject;
}
export declare class CodeBuildProjectMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    protected readonly project: IProject;
    constructor(metricFactory: MetricFactory, props: CodeBuildProjectMetricFactoryProps);
    metricBuildCount(): import("../../common").MetricWithAlarmSupport;
    metricSucceededBuildCount(): import("../../common").MetricWithAlarmSupport;
    metricFailedBuildCount(): import("../../common").MetricWithAlarmSupport;
    metricFailedBuildRate(): import("../../common").MetricWithAlarmSupport;
    metricDurationP99InSeconds(): import("../../common").MetricWithAlarmSupport;
    metricDurationP90InSeconds(): import("../../common").MetricWithAlarmSupport;
    metricDurationP50InSeconds(): import("../../common").MetricWithAlarmSupport;
}
