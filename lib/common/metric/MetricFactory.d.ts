import { Duration } from "aws-cdk-lib";
import { DimensionsMap, IMetric } from "aws-cdk-lib/aws-cloudwatch";
import { MetricStatistic } from "./MetricStatistic";
import { MetricWithAlarmSupport } from "./MetricWithAlarmSupport";
import { RateComputationMethod } from "./RateComputationMethod";
/**
 * The most common default metric period used at Amazon is currently 5 minutes.
 */
export declare const DefaultMetricPeriod: Duration;
/**
 * These are the globals used for each metric, unless there is some kind of override.
 */
export interface MetricFactoryDefaults {
    /**
     * Each metric exists in a namespace. AWS Services have their own namespace, but here you can specify your custom one.
     */
    readonly namespace?: string;
    /**
     * Metric period. Default value is used if not defined.
     * @default - DefaultMetricPeriod
     */
    readonly period?: Duration;
    /**
     * Region where the metrics exist.
     *
     * @default The region configured by the construct holding the Monitoring construct
     * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Cross-Account-Cross-Region.html
     */
    readonly region?: string;
    /**
     * Account where the metrics exist.
     *
     * @default The account configured by the construct holding the Monitoring construct
     * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Cross-Account-Cross-Region.html
     */
    readonly account?: string;
}
export interface MetricFactoryProps {
    /**
     * Allows you to specify the global defaults, which can be overridden in the individual metrics or alarms.
     */
    readonly globalDefaults?: MetricFactoryDefaults;
}
export declare class MetricFactory {
    protected readonly globalDefaults: MetricFactoryDefaults;
    constructor(props?: MetricFactoryProps);
    /**
     * Factory method that creates a metric. The metric properties will already be updated to comply with the global defaults.
     *
     * @param metricName metric name
     * @param statistic aggregation statistic to use
     * @param label metric label; if undefined, metric name is used by CloudWatch
     * @param dimensionsMap additional dimensions to be added
     * @param color metric color; if undefined, uses a CloudWatch provided color (preferred)
     * @param namespace specify a custom namespace; if undefined, uses the global default
     * @param period specify a custom period; if undefined, uses the global default
     * @param region specify a custom region; if undefined, uses the global default
     * @param account specify a custom account; if undefined, uses the global default
     */
    createMetric(metricName: string, statistic: MetricStatistic, label?: string, dimensionsMap?: DimensionsMap, color?: string, namespace?: string, period?: Duration, region?: string, account?: string): MetricWithAlarmSupport;
    /**
     * Factory method that creates a metric math expression. The metric properties will already be updated to comply with the global defaults.
     *
     * @param expression CloudWatch metric math expression (https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/using-metric-math.html)
     * @param usingMetrics map of metrics, where keys are expression IDs (used in the expression) and values are metrics
     * @param label metric label (required, as there is no reasonable default)
     * @param color metric color; if undefined, uses a CloudWatch provided color (preferred)
     * @param period specify a custom period; if undefined, uses the global default
     * @param region specify a custom region; if undefined, uses the global default
     * @param account specify a custom account; if undefined, uses the global default
     */
    createMetricMath(expression: string, usingMetrics: Record<string, IMetric>, label: string, color?: string, period?: Duration, region?: string, account?: string): MetricWithAlarmSupport;
    /**
     * Factory method that creates a metric search query. The metric properties will already be updated to comply with the global defaults.
     * If you want to match "any value" of a specific dimension, please use `undefined` value representation in your consumer language.
     * (For example, `undefined as any as string` in TypeScript, due to JSII typing quirks.)
     *
     * @param query metric search query (the same as the search query prompt in CloudWatch AWS Console), it might also be empty
     * @param dimensionsMap dimensions, further narrowing the search results; use `undefined` if you want to represent "any value" (in TS: `undefined as any as string`)
     * @param statistic aggregation statistic to use
     * @param namespace specify a custom namespace; if undefined, uses the global default
     * @param label specify custom label for search metrics; default is " " as it cannot be empty string
     * @param period specify a custom period; if undefined, uses the global default
     * @param region specify a custom region; if undefined, uses the global default
     * @param account specify a custom account; if undefined, uses the global default
     */
    createMetricSearch(query: string, dimensionsMap: DimensionsMap, statistic: MetricStatistic, namespace?: string, label?: string, period?: Duration, region?: string, account?: string): IMetric;
    /**
     * Factory method that creates anomaly detection on a metric.
     * Anomaly occurs whenever a metric value falls outside of a precomputed range of predicted values.
     * The detection does not need any setup. The model will start learning automatically and should be ready in a few minutes.
     * Usually, the anomaly detection is paired with an alarm.
     * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html
     *
     * @param metric metric to detect anomaly detection of
     * @param stdev standard deviation, basically the tolerance / band thickness
     * @param label metric label (required, as there is no reasonable default)
     * @param color metric color; if undefined, uses a CloudWatch provided color (preferred)
     * @param expressionId expression ID of the metric; uses `m1` if undefined
     * @param period specify a custom period; if undefined, uses the global default
     * @param region specify a custom region; if undefined, uses the global default
     * @param account specify a custom account; if undefined, uses the global default
     */
    createMetricAnomalyDetection(metric: IMetric, stdev: number, label: string, color?: string, expressionId?: string, period?: Duration, region?: string, account?: string): MetricWithAlarmSupport;
    /**
     * Adapts properties of a foreign metric (metric created outside of this metric factory) to comply with the global defaults.
     * Might modify namespace and metric period.
     *
     * @param metric metric to be adapted
     */
    adaptMetric(metric: MetricWithAlarmSupport): MetricWithAlarmSupport;
    /**
     * Adapts properties of a foreign metric (metric created outside of this metric factory) to comply with the global defaults.
     * Might modify namespace. Preserves metric period.
     *
     * @param metric metric to be adapted
     */
    adaptMetricPreservingPeriod(metric: MetricWithAlarmSupport): MetricWithAlarmSupport;
    /**
     * Creates a metric math expression that multiplies the given metric by given coefficient.
     * Does nothing if the multiplier is one. Preserves the metric period.
     *
     * @param metric metric to multiply
     * @param multiplier multiplier (must be > 1)
     * @param label expression label
     * @param expressionId expression ID of the metric; uses `m1` if undefined
     */
    multiplyMetric(metric: MetricWithAlarmSupport, multiplier: number, label: string, expressionId?: string): MetricWithAlarmSupport;
    /**
     * Creates a metric math expression that divides the given metric by given coefficient.
     * Does nothing if the divisor is one. Preserves the metric period.
     *
     * @param metric metric to multiply
     * @param divisor divisor (must be > 1)
     * @param label expression label
     * @param expressionId expression ID of the metric; uses `m1` if undefined
     */
    divideMetric(metric: MetricWithAlarmSupport, divisor: number, label: string, expressionId?: string): MetricWithAlarmSupport;
    /**
     * Creates a metric math expression that computes a rate from a regular metric.
     * For example, it allows you to compute rate per second (TPS), per minute, or just an average of your transactions.
     *
     * @param metric metric to calculate the rate from
     * @param method rate computation method
     * @param addStatsToLabel add detailed statistics (min, max, average) to the label
     * @param expressionId expression ID of the metric; uses `m1` if undefined
     * @param fillWithZeroes if TRUE, the final metric will be zero-filled (0 on no data); false if undefined
     */
    toRate(metric: MetricWithAlarmSupport, method: RateComputationMethod, addStatsToLabel?: boolean, expressionId?: string, fillWithZeroes?: boolean): MetricWithAlarmSupport;
    /**
     * Returns the given namespace (if defined) or the global namespace as a fallback.
     * If there is no namespace to fallback to (neither the custom or the default one), it will fail.
     * @param value custom namespace
     */
    getNamespaceWithFallback(value?: string): string;
    /**
     * Helper method that helps to sanitize the given expression ID and removes all invalid characters.
     * Valid expression ID regexp is the following: ^[a-z][a-zA-Z0-9_]*$
     * As this is just to validate a suffix and not the whole ID, we do not have to verify the first lower case letter.
     * @param expressionId expression ID to sanitize
     */
    sanitizeMetricExpressionIdSuffix(expressionId: string): string;
    /**
     * Merges the given additional dimensions to the given target dimension hash.
     * All existing dimensions with the same key are replaced.
     * @param target target dimension hash to update
     * @param additionalDimensions additional dimensions
     */
    addAdditionalDimensions(target: DimensionsMap, additionalDimensions: DimensionsMap): void;
    /**
     * Removes all entries from the given dimension hash that contain an undefined value.
     * @param dimensionsMap dimensions map to update
     */
    private removeUndefinedEntries;
}
