import { IMetric } from "aws-cdk-lib/aws-cloudwatch";
import { BillingMode, ITable, Operation } from "aws-cdk-lib/aws-dynamodb";
import { MetricFactory } from "../../common";
export interface DynamoTableMetricFactoryProps {
    /**
     * table to monitor
     */
    readonly table: ITable;
    /**
     * table billing mode
     *
     * @default - best effort auto-detection or PROVISIONED as a fallback
     */
    readonly billingMode?: BillingMode;
}
export declare class DynamoTableMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly table: ITable;
    constructor(metricFactory: MetricFactory, props: DynamoTableMetricFactoryProps);
    metricProvisionedReadCapacityUnits(): import("../../common").MetricWithAlarmSupport;
    metricProvisionedWriteCapacityUnits(): import("../../common").MetricWithAlarmSupport;
    metricConsumedReadCapacityUnits(): import("../../common").MetricWithAlarmSupport;
    metricConsumedWriteCapacityUnits(): import("../../common").MetricWithAlarmSupport;
    metricReadCapacityUtilizationPercentage(): import("../../common").MetricWithAlarmSupport;
    metricWriteCapacityUtilizationPercentage(): import("../../common").MetricWithAlarmSupport;
    metricSearchAverageSuccessfulRequestLatencyInMillis(): IMetric;
    metricAverageSuccessfulRequestLatencyInMillis(operation: Operation): import("../../common").MetricWithAlarmSupport;
    metricThrottledReadRequestCount(): import("../../common").MetricWithAlarmSupport;
    metricThrottledWriteRequestCount(): import("../../common").MetricWithAlarmSupport;
    /**
     * This represents the number of requests that resulted in a 500 (server error) error code.
     * It summarizes across the basic CRUD operations:
     * GetItem, BatchGetItem, Scan, Query, GetRecords, PutItem, DeleteItem, UpdateItem, BatchWriteItem
     *
     * It’s usually equal to zero.
     */
    metricSystemErrorsCount(): import("../../common").MetricWithAlarmSupport;
}
