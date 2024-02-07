import { IDistribution } from "aws-cdk-lib/aws-cloudfront";
import { MetricFactory, RateComputationMethod } from "../../common";
export interface CloudFrontDistributionMetricFactoryProps {
    readonly distribution: IDistribution;
    /**
     * @default - true
     */
    readonly fillTpsWithZeroes?: boolean;
    /**
     * @default - average
     */
    readonly rateComputationMethod?: RateComputationMethod;
    /**
     * Generate dashboard charts for additional CloudFront distribution metrics.
     *
     * To enable additional metrics on your CloudFront distribution, see
     * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html#monitoring-console.distributions-additional
     *
     * @default - true
     */
    readonly additionalMetricsEnabled?: boolean;
}
/**
 * To get the CloudFront metrics from the CloudWatch API, you must use the US East (N. Virginia) Region (us-east-1).
 * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/programming-cloudwatch-metrics.html
 */
export declare class CloudFrontDistributionMetricFactory {
    private readonly metricFactory;
    private readonly fillTpsWithZeroes;
    private readonly rateComputationMethod;
    private readonly dimensionsMap;
    constructor(metricFactory: MetricFactory, props: CloudFrontDistributionMetricFactoryProps);
    metricRequestCount(): import("../../common").MetricWithAlarmSupport;
    metricRequestRate(): import("../../common").MetricWithAlarmSupport;
    /**
     * @deprecated use metricRequestRate
     */
    metricRequestTps(): import("../../common").MetricWithAlarmSupport;
    metricTotalBytesUploaded(): import("../../common").MetricWithAlarmSupport;
    metricTotalBytesDownloaded(): import("../../common").MetricWithAlarmSupport;
    /**
     * Cache hit rate metric. This is an additional metric that needs to be explicitly enabled for an additional cost.
     *
     * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html#monitoring-console.distributions-additional
     */
    metricCacheHitRateAverageInPercent(): import("../../common").MetricWithAlarmSupport;
    metric4xxErrorRateAverage(): import("../../common").MetricWithAlarmSupport;
    metric5xxErrorRateAverage(): import("../../common").MetricWithAlarmSupport;
    metricTotalErrorRateAverage(): import("../../common").MetricWithAlarmSupport;
}
