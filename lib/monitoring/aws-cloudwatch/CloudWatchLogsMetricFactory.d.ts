import { MetricFactory } from "../../common";
export interface CloudWatchLogsMetricFactoryProps {
    /**
     * Name of the log group to monitor.
     */
    readonly logGroupName: string;
}
export declare class CloudWatchLogsMetricFactory {
    private readonly metricFactory;
    private readonly dimensionsMap;
    constructor(metricFactory: MetricFactory, props: CloudWatchLogsMetricFactoryProps);
    metricIncomingLogEvents(): import("../../common").MetricWithAlarmSupport;
}
