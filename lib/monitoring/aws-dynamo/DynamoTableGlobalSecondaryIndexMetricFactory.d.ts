import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { MetricFactory } from "../../common";
export interface DynamoTableGlobalSecondaryIndexMetricFactoryProps {
    readonly table: ITable;
    readonly globalSecondaryIndexName: string;
}
export declare class DynamoTableGlobalSecondaryIndexMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly table: ITable;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: DynamoTableGlobalSecondaryIndexMetricFactoryProps);
    metricProvisionedReadCapacityUnits(): import("../../common").MetricWithAlarmSupport;
    metricProvisionedWriteCapacityUnits(): import("../../common").MetricWithAlarmSupport;
    metricConsumedReadCapacityUnits(): import("../../common").MetricWithAlarmSupport;
    metricConsumedWriteCapacityUnits(): import("../../common").MetricWithAlarmSupport;
    metricIndexConsumedWriteUnitsMetric(): import("../../common").MetricWithAlarmSupport;
    metricThrottledReadRequestCount(): import("../../common").MetricWithAlarmSupport;
    metricThrottledWriteRequestCount(): import("../../common").MetricWithAlarmSupport;
    metricThrottledIndexRequestCount(): import("../../common").MetricWithAlarmSupport;
}
