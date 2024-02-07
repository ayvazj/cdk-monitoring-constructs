import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { ISecret } from "aws-cdk-lib/aws-secretsmanager";
import { MetricFactory } from "../../common";
export interface SecretsManagerSecretMetricFactoryProps {
    readonly secret: ISecret;
}
export declare class SecretsManagerSecretMetricFactory {
    static readonly Namespace = "SecretsManager";
    static readonly MetricNameDaysSinceLastChange = "DaysSinceLastChange";
    static readonly MetricNameDaysSinceLastRotation = "DaysSinceLastRotation";
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    protected readonly secret: ISecret;
    constructor(metricFactory: MetricFactory, props: SecretsManagerSecretMetricFactoryProps);
    metricDaysSinceLastChange(): import("../../common").MetricWithAlarmSupport;
    metricDaysSinceLastRotation(): import("../../common").MetricWithAlarmSupport;
}
