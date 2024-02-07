"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricFactory = exports.DefaultMetricPeriod = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const AnomalyDetectionMathExpression_1 = require("./AnomalyDetectionMathExpression");
const MetricStatistic_1 = require("./MetricStatistic");
const RateComputationMethod_1 = require("./RateComputationMethod");
/**
 * The most common default metric period used at Amazon is currently 5 minutes.
 */
exports.DefaultMetricPeriod = aws_cdk_lib_1.Duration.minutes(5);
class MetricFactory {
    constructor(props) {
        this.globalDefaults = props?.globalDefaults ?? {};
    }
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
    createMetric(metricName, statistic, label, dimensionsMap, color, namespace, period, region, account) {
        return new aws_cloudwatch_1.Metric({
            statistic,
            metricName,
            label,
            color,
            dimensionsMap: dimensionsMap
                ? this.removeUndefinedEntries(dimensionsMap)
                : undefined,
            namespace: this.getNamespaceWithFallback(namespace),
            period: period ?? this.globalDefaults.period ?? exports.DefaultMetricPeriod,
            region: region ?? this.globalDefaults.region,
            account: account ?? this.globalDefaults.account,
        });
    }
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
    createMetricMath(expression, usingMetrics, label, color, period, region, account) {
        return new aws_cloudwatch_1.MathExpression({
            label,
            color,
            expression,
            usingMetrics,
            period: period ?? this.globalDefaults.period ?? exports.DefaultMetricPeriod,
            searchRegion: region ?? this.globalDefaults.region,
            searchAccount: account ?? this.globalDefaults.account,
        });
    }
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
    createMetricSearch(query, dimensionsMap, statistic, namespace, label, period, region, account) {
        const finalPeriod = period ?? this.globalDefaults.period ?? exports.DefaultMetricPeriod;
        const searchNamespace = this.getNamespaceWithFallback(namespace);
        const namespacePlusDimensionKeys = [
            searchNamespace,
            ...Object.keys(dimensionsMap),
        ].join(",");
        const metricSchema = `{${namespacePlusDimensionKeys}}`;
        const dimensionKeysAndValues = Object.entries(this.removeUndefinedEntries(dimensionsMap))
            .map(([key, value]) => `${key}="${value}"`)
            .join(" ");
        const expression = `SEARCH('${metricSchema} ${dimensionKeysAndValues} ${query}', '${statistic}', ${finalPeriod.toSeconds()})`;
        return new aws_cloudwatch_1.MathExpression({
            expression,
            // see https://github.com/aws/aws-cdk/issues/7237
            usingMetrics: {},
            // cannot be an empty string and undefined is no good either
            label: label ?? " ",
            period: finalPeriod,
            searchRegion: region ?? this.globalDefaults.region,
            searchAccount: account ?? this.globalDefaults.account,
        });
    }
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
    createMetricAnomalyDetection(metric, stdev, label, color, expressionId, period, region, account) {
        const finalExpressionId = expressionId ?? "m1";
        const usingMetrics = {};
        usingMetrics[finalExpressionId] = metric;
        return new AnomalyDetectionMathExpression_1.AnomalyDetectionMathExpression({
            label,
            color,
            usingMetrics,
            expression: `ANOMALY_DETECTION_BAND(${finalExpressionId},${stdev})`,
            period: period ?? this.globalDefaults.period ?? exports.DefaultMetricPeriod,
            searchRegion: region ?? this.globalDefaults.region,
            searchAccount: account ?? this.globalDefaults.account,
        });
    }
    /**
     * Adapts properties of a foreign metric (metric created outside of this metric factory) to comply with the global defaults.
     * Might modify namespace and metric period.
     *
     * @param metric metric to be adapted
     */
    adaptMetric(metric) {
        return metric.with({
            period: this.globalDefaults.period ?? exports.DefaultMetricPeriod,
        });
    }
    /**
     * Adapts properties of a foreign metric (metric created outside of this metric factory) to comply with the global defaults.
     * Might modify namespace. Preserves metric period.
     *
     * @param metric metric to be adapted
     */
    adaptMetricPreservingPeriod(metric) {
        return metric;
    }
    /**
     * Creates a metric math expression that multiplies the given metric by given coefficient.
     * Does nothing if the multiplier is one. Preserves the metric period.
     *
     * @param metric metric to multiply
     * @param multiplier multiplier (must be > 1)
     * @param label expression label
     * @param expressionId expression ID of the metric; uses `m1` if undefined
     */
    multiplyMetric(metric, multiplier, label, expressionId) {
        if (multiplier == 1) {
            return metric;
        }
        else if (multiplier < 1) {
            throw new Error("Multiplier must be greater than one.");
        }
        else {
            const finalExpressionId = expressionId ?? "m1";
            const usingMetrics = {};
            usingMetrics[finalExpressionId] = metric;
            return this.createMetricMath(`${finalExpressionId} * ${multiplier}`, usingMetrics, label, metric.color, metric.period);
        }
    }
    /**
     * Creates a metric math expression that divides the given metric by given coefficient.
     * Does nothing if the divisor is one. Preserves the metric period.
     *
     * @param metric metric to multiply
     * @param divisor divisor (must be > 1)
     * @param label expression label
     * @param expressionId expression ID of the metric; uses `m1` if undefined
     */
    divideMetric(metric, divisor, label, expressionId) {
        if (divisor == 1) {
            return metric;
        }
        else if (divisor < 1) {
            throw new Error("Divisor must be greater than one.");
        }
        else {
            const finalExpressionId = expressionId ?? "m1";
            const usingMetrics = {};
            usingMetrics[finalExpressionId] = metric;
            return this.createMetricMath(`${finalExpressionId} / ${divisor}`, usingMetrics, label, metric.color, metric.period);
        }
    }
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
    toRate(metric, method, addStatsToLabel, expressionId, fillWithZeroes) {
        const finalExpressionId = expressionId ?? "m1";
        const labelPrefix = metric.label ?? "Rate";
        const statsInLabel = [];
        if (addStatsToLabel ?? false) {
            statsInLabel.push("min: ${MIN}");
            statsInLabel.push("max: ${MAX}");
            if (method !== RateComputationMethod_1.RateComputationMethod.AVERAGE) {
                // only add average if do not have it already
                statsInLabel.push("avg: ${AVG}");
            }
        }
        const finalExpressionIdZeroed = fillWithZeroes ?? false
            ? `FILL(${finalExpressionId},0)`
            : finalExpressionId;
        const labelAppendix = statsInLabel.length > 0 ? ` (${statsInLabel.join(", ")})` : "";
        switch (method) {
            case RateComputationMethod_1.RateComputationMethod.AVERAGE:
                const avgLabel = `${labelPrefix} (avg)${labelAppendix}`;
                const avgMetric = metric.with({
                    label: avgLabel,
                    statistic: MetricStatistic_1.MetricStatistic.AVERAGE,
                });
                if (fillWithZeroes ?? false) {
                    return this.createMetricMath(finalExpressionIdZeroed, { [finalExpressionId]: avgMetric }, avgLabel, avgMetric.color, avgMetric.period);
                }
                return avgMetric;
            case RateComputationMethod_1.RateComputationMethod.PER_SECOND:
                let perSecondLabel = `${labelPrefix}/s${labelAppendix}`;
                if (labelPrefix === "Requests" ||
                    labelPrefix === "Invocations" ||
                    labelPrefix === "Transactions") {
                    // currently, kept as "TPS" to reduce number of snapshot changes
                    perSecondLabel = `TPS${labelAppendix}`;
                }
                return this.createMetricMath(`${finalExpressionIdZeroed} / PERIOD(${finalExpressionId})`, { [finalExpressionId]: metric }, perSecondLabel, metric.color, metric.period);
            case RateComputationMethod_1.RateComputationMethod.PER_MINUTE:
                return this.createMetricMath(`(60 * ${finalExpressionIdZeroed}) / PERIOD(${finalExpressionId})`, { [finalExpressionId]: metric }, `${labelPrefix}/m${labelAppendix}`, metric.color, metric.period);
            case RateComputationMethod_1.RateComputationMethod.PER_HOUR:
                return this.createMetricMath(`(3600 * ${finalExpressionIdZeroed}) / PERIOD(${finalExpressionId})`, { [finalExpressionId]: metric }, `${labelPrefix}/h${labelAppendix}`, metric.color, metric.period);
            case RateComputationMethod_1.RateComputationMethod.PER_DAY:
                return this.createMetricMath(`(86400 * ${finalExpressionIdZeroed}) / PERIOD(${finalExpressionId})`, { [finalExpressionId]: metric }, `${labelPrefix}/d${labelAppendix}`, metric.color, metric.period);
        }
    }
    /**
     * Returns the given namespace (if defined) or the global namespace as a fallback.
     * If there is no namespace to fallback to (neither the custom or the default one), it will fail.
     * @param value custom namespace
     */
    getNamespaceWithFallback(value) {
        const namespace = value ?? this.globalDefaults.namespace;
        if (!namespace) {
            throw new Error("There is no custom namespace defined. Please specify it in your factory defaults.");
        }
        return namespace;
    }
    /**
     * Helper method that helps to sanitize the given expression ID and removes all invalid characters.
     * Valid expression ID regexp is the following: ^[a-z][a-zA-Z0-9_]*$
     * As this is just to validate a suffix and not the whole ID, we do not have to verify the first lower case letter.
     * @param expressionId expression ID to sanitize
     */
    sanitizeMetricExpressionIdSuffix(expressionId) {
        return expressionId.replace(/[^0-9a-z_]/gi, "");
    }
    /**
     * Merges the given additional dimensions to the given target dimension hash.
     * All existing dimensions with the same key are replaced.
     * @param target target dimension hash to update
     * @param additionalDimensions additional dimensions
     */
    addAdditionalDimensions(target, additionalDimensions) {
        // Add additional dimensions in the search query
        Object.keys(additionalDimensions).forEach((key) => {
            target[key] = additionalDimensions[key];
        });
    }
    /**
     * Removes all entries from the given dimension hash that contain an undefined value.
     * @param dimensionsMap dimensions map to update
     */
    removeUndefinedEntries(dimensionsMap) {
        const copy = {};
        Object.entries(dimensionsMap)
            .filter(([_, value]) => value !== undefined)
            .forEach(([key, value]) => (copy[key] = value));
        return copy;
    }
}
exports.MetricFactory = MetricFactory;
_a = JSII_RTTI_SYMBOL_1;
MetricFactory[_a] = { fqn: "cdk-monitoring-constructs.MetricFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0cmljRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1ldHJpY0ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2Q0FBdUM7QUFDdkMsK0RBS29DO0FBRXBDLHFGQUFrRjtBQUNsRix1REFBb0Q7QUFFcEQsbUVBQWdFO0FBRWhFOztHQUVHO0FBQ1UsUUFBQSxtQkFBbUIsR0FBRyxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQXdDdkQsTUFBYSxhQUFhO0lBR3hCLFlBQVksS0FBMEI7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLEVBQUUsY0FBYyxJQUFJLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsWUFBWSxDQUNWLFVBQWtCLEVBQ2xCLFNBQTBCLEVBQzFCLEtBQWMsRUFDZCxhQUE2QixFQUM3QixLQUFjLEVBQ2QsU0FBa0IsRUFDbEIsTUFBaUIsRUFDakIsTUFBZSxFQUNmLE9BQWdCO1FBRWhCLE9BQU8sSUFBSSx1QkFBTSxDQUFDO1lBQ2hCLFNBQVM7WUFDVCxVQUFVO1lBQ1YsS0FBSztZQUNMLEtBQUs7WUFDTCxhQUFhLEVBQUUsYUFBYTtnQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxTQUFTO1lBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUM7WUFDbkQsTUFBTSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSwyQkFBbUI7WUFDbkUsTUFBTSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07WUFDNUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU87U0FDaEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFD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QU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsdUJBQXVCLENBQ3JCLE1BQXFCLEVBQ3JCLG9CQUFtQztRQUVuQyxnREFBZ0Q7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxzQkFBc0IsQ0FBQyxhQUE0QjtRQUN6RCxNQUFNLElBQUksR0FBa0IsRUFBRSxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2FBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO2FBQzNDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7QUEzWkgsc0NBNFpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHVyYXRpb24gfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7XG4gIERpbWVuc2lvbnNNYXAsXG4gIElNZXRyaWMsXG4gIE1hdGhFeHByZXNzaW9uLFxuICBNZXRyaWMsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuXG5pbXBvcnQgeyBBbm9tYWx5RGV0ZWN0aW9uTWF0aEV4cHJlc3Npb24gfSBmcm9tIFwiLi9Bbm9tYWx5RGV0ZWN0aW9uTWF0aEV4cHJlc3Npb25cIjtcbmltcG9ydCB7IE1ldHJpY1N0YXRpc3RpYyB9IGZyb20gXCIuL01ldHJpY1N0YXRpc3RpY1wiO1xuaW1wb3J0IHsgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB9IGZyb20gXCIuL01ldHJpY1dpdGhBbGFybVN1cHBvcnRcIjtcbmltcG9ydCB7IFJhdGVDb21wdXRhdGlvbk1ldGhvZCB9IGZyb20gXCIuL1JhdGVDb21wdXRhdGlvbk1ldGhvZFwiO1xuXG4vKipcbiAqIFRoZSBtb3N0IGNvbW1vbiBkZWZhdWx0IG1ldHJpYyBwZXJpb2QgdXNlZCBhdCBBbWF6b24gaXMgY3VycmVudGx5IDUgbWludXRlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IERlZmF1bHRNZXRyaWNQZXJpb2QgPSBEdXJhdGlvbi5taW51dGVzKDUpO1xuXG4vKipcbiAqIFRoZXNlIGFyZSB0aGUgZ2xvYmFscyB1c2VkIGZvciBlYWNoIG1ldHJpYywgdW5sZXNzIHRoZXJlIGlzIHNvbWUga2luZCBvZiBvdmVycmlkZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXRyaWNGYWN0b3J5RGVmYXVsdHMge1xuICAvKipcbiAgICogRWFjaCBtZXRyaWMgZXhpc3RzIGluIGEgbmFtZXNwYWNlLiBBV1MgU2VydmljZXMgaGF2ZSB0aGVpciBvd24gbmFtZXNwYWNlLCBidXQgaGVyZSB5b3UgY2FuIHNwZWNpZnkgeW91ciBjdXN0b20gb25lLlxuICAgKi9cbiAgcmVhZG9ubHkgbmFtZXNwYWNlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBNZXRyaWMgcGVyaW9kLiBEZWZhdWx0IHZhbHVlIGlzIHVzZWQgaWYgbm90IGRlZmluZWQuXG4gICAqIEBkZWZhdWx0IC0gRGVmYXVsdE1ldHJpY1BlcmlvZFxuICAgKi9cbiAgcmVhZG9ubHkgcGVyaW9kPzogRHVyYXRpb247XG5cbiAgLyoqXG4gICAqIFJlZ2lvbiB3aGVyZSB0aGUgbWV0cmljcyBleGlzdC5cbiAgICpcbiAgICogQGRlZmF1bHQgVGhlIHJlZ2lvbiBjb25maWd1cmVkIGJ5IHRoZSBjb25zdHJ1Y3QgaG9sZGluZyB0aGUgTW9uaXRvcmluZyBjb25zdHJ1Y3RcbiAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uQ2xvdWRXYXRjaC9sYXRlc3QvbW9uaXRvcmluZy9Dcm9zcy1BY2NvdW50LUNyb3NzLVJlZ2lvbi5odG1sXG4gICAqL1xuICByZWFkb25seSByZWdpb24/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBY2NvdW50IHdoZXJlIHRoZSBtZXRyaWNzIGV4aXN0LlxuICAgKlxuICAgKiBAZGVmYXVsdCBUaGUgYWNjb3VudCBjb25maWd1cmVkIGJ5IHRoZSBjb25zdHJ1Y3QgaG9sZGluZyB0aGUgTW9uaXRvcmluZyBjb25zdHJ1Y3RcbiAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uQ2xvdWRXYXRjaC9sYXRlc3QvbW9uaXRvcmluZy9Dcm9zcy1BY2NvdW50LUNyb3NzLVJlZ2lvbi5odG1sXG4gICAqL1xuICByZWFkb25seSBhY2NvdW50Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1ldHJpY0ZhY3RvcnlQcm9wcyB7XG4gIC8qKlxuICAgKiBBbGxvd3MgeW91IHRvIHNwZWNpZnkgdGhlIGdsb2JhbCBkZWZhdWx0cywgd2hpY2ggY2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGluZGl2aWR1YWwgbWV0cmljcyBvciBhbGFybXMuXG4gICAqL1xuICByZWFkb25seSBnbG9iYWxEZWZhdWx0cz86IE1ldHJpY0ZhY3RvcnlEZWZhdWx0cztcbn1cblxuZXhwb3J0IGNsYXNzIE1ldHJpY0ZhY3Rvcnkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZ2xvYmFsRGVmYXVsdHM6IE1ldHJpY0ZhY3RvcnlEZWZhdWx0cztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcz86IE1ldHJpY0ZhY3RvcnlQcm9wcykge1xuICAgIHRoaXMuZ2xvYmFsRGVmYXVsdHMgPSBwcm9wcz8uZ2xvYmFsRGVmYXVsdHMgPz8ge307XG4gIH1cblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdGhhdCBjcmVhdGVzIGEgbWV0cmljLiBUaGUgbWV0cmljIHByb3BlcnRpZXMgd2lsbCBhbHJlYWR5IGJlIHVwZGF0ZWQgdG8gY29tcGx5IHdpdGggdGhlIGdsb2JhbCBkZWZhdWx0cy5cbiAgICpcbiAgICogQHBhcmFtIG1ldHJpY05hbWUgbWV0cmljIG5hbWVcbiAgICogQHBhcmFtIHN0YXRpc3RpYyBhZ2dyZWdhdGlvbiBzdGF0aXN0aWMgdG8gdXNlXG4gICAqIEBwYXJhbSBsYWJlbCBtZXRyaWMgbGFiZWw7IGlmIHVuZGVmaW5lZCwgbWV0cmljIG5hbWUgaXMgdXNlZCBieSBDbG91ZFdhdGNoXG4gICAqIEBwYXJhbSBkaW1lbnNpb25zTWFwIGFkZGl0aW9uYWwgZGltZW5zaW9ucyB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY29sb3IgbWV0cmljIGNvbG9yOyBpZiB1bmRlZmluZWQsIHVzZXMgYSBDbG91ZFdhdGNoIHByb3ZpZGVkIGNvbG9yIChwcmVmZXJyZWQpXG4gICAqIEBwYXJhbSBuYW1lc3BhY2Ugc3BlY2lmeSBhIGN1c3RvbSBuYW1lc3BhY2U7IGlmIHVuZGVmaW5lZCwgdXNlcyB0aGUgZ2xvYmFsIGRlZmF1bHRcbiAgICogQHBhcmFtIHBlcmlvZCBzcGVjaWZ5IGEgY3VzdG9tIHBlcmlvZDsgaWYgdW5kZWZpbmVkLCB1c2VzIHRoZSBnbG9iYWwgZGVmYXVsdFxuICAgKiBAcGFyYW0gcmVnaW9uIHNwZWNpZnkgYSBjdXN0b20gcmVnaW9uOyBpZiB1bmRlZmluZWQsIHVzZXMgdGhlIGdsb2JhbCBkZWZhdWx0XG4gICAqIEBwYXJhbSBhY2NvdW50IHNwZWNpZnkgYSBjdXN0b20gYWNjb3VudDsgaWYgdW5kZWZpbmVkLCB1c2VzIHRoZSBnbG9iYWwgZGVmYXVsdFxuICAgKi9cbiAgY3JlYXRlTWV0cmljKFxuICAgIG1ldHJpY05hbWU6IHN0cmluZyxcbiAgICBzdGF0aXN0aWM6IE1ldHJpY1N0YXRpc3RpYyxcbiAgICBsYWJlbD86IHN0cmluZyxcbiAgICBkaW1lbnNpb25zTWFwPzogRGltZW5zaW9uc01hcCxcbiAgICBjb2xvcj86IHN0cmluZyxcbiAgICBuYW1lc3BhY2U/OiBzdHJpbmcsXG4gICAgcGVyaW9kPzogRHVyYXRpb24sXG4gICAgcmVnaW9uPzogc3RyaW5nLFxuICAgIGFjY291bnQ/OiBzdHJpbmdcbiAgKTogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB7XG4gICAgcmV0dXJuIG5ldyBNZXRyaWMoe1xuICAgICAgc3RhdGlzdGljLFxuICAgICAgbWV0cmljTmFtZSxcbiAgICAgIGxhYmVsLFxuICAgICAgY29sb3IsXG4gICAgICBkaW1lbnNpb25zTWFwOiBkaW1lbnNpb25zTWFwXG4gICAgICAgID8gdGhpcy5yZW1vdmVVbmRlZmluZWRFbnRyaWVzKGRpbWVuc2lvbnNNYXApXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgbmFtZXNwYWNlOiB0aGlzLmdldE5hbWVzcGFjZVdpdGhGYWxsYmFjayhuYW1lc3BhY2UpLFxuICAgICAgcGVyaW9kOiBwZXJpb2QgPz8gdGhpcy5nbG9iYWxEZWZhdWx0cy5wZXJpb2QgPz8gRGVmYXVsdE1ldHJpY1BlcmlvZCxcbiAgICAgIHJlZ2lvbjogcmVnaW9uID8/IHRoaXMuZ2xvYmFsRGVmYXVsdHMucmVnaW9uLFxuICAgICAgYWNjb3VudDogYWNjb3VudCA/PyB0aGlzLmdsb2JhbERlZmF1bHRzLmFjY291bnQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdGhhdCBjcmVhdGVzIGEgbWV0cmljIG1hdGggZXhwcmVzc2lvbi4gVGhlIG1ldHJpYyBwcm9wZXJ0aWVzIHdpbGwgYWxyZWFkeSBiZSB1cGRhdGVkIHRvIGNvbXBseSB3aXRoIHRoZSBnbG9iYWwgZGVmYXVsdHMuXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uIENsb3VkV2F0Y2ggbWV0cmljIG1hdGggZXhwcmVzc2lvbiAoaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FtYXpvbkNsb3VkV2F0Y2gvbGF0ZXN0L21vbml0b3JpbmcvdXNpbmctbWV0cmljLW1hdGguaHRtbClcbiAgICogQHBhcmFtIHVzaW5nTWV0cmljcyBtYXAgb2YgbWV0cmljcywgd2hlcmUga2V5cyBhcmUgZXhwcmVzc2lvbiBJRHMgKHVzZWQgaW4gdGhlIGV4cHJlc3Npb24pIGFuZCB2YWx1ZXMgYXJlIG1ldHJpY3NcbiAgICogQHBhcmFtIGxhYmVsIG1ldHJpYyBsYWJlbCAocmVxdWlyZWQsIGFzIHRoZXJlIGlzIG5vIHJlYXNvbmFibGUgZGVmYXVsdClcbiAgICogQHBhcmFtIGNvbG9yIG1ldHJpYyBjb2xvcjsgaWYgdW5kZWZpbmVkLCB1c2VzIGEgQ2xvdWRXYXRjaCBwcm92aWRlZCBjb2xvciAocHJlZmVycmVkKVxuICAgKiBAcGFyYW0gcGVyaW9kIHNwZWNpZnkgYSBjdXN0b20gcGVyaW9kOyBpZiB1bmRlZmluZWQsIHVzZXMgdGhlIGdsb2JhbCBkZWZhdWx0XG4gICAqIEBwYXJhbSByZWdpb24gc3BlY2lmeSBhIGN1c3RvbSByZWdpb247IGlmIHVuZGVmaW5lZCwgdXNlcyB0aGUgZ2xvYmFsIGRlZmF1bHRcbiAgICogQHBhcmFtIGFjY291bnQgc3BlY2lmeSBhIGN1c3RvbSBhY2NvdW50OyBpZiB1bmRlZmluZWQsIHVzZXMgdGhlIGdsb2JhbCBkZWZhdWx0XG4gICAqL1xuICBjcmVhdGVNZXRyaWNNYXRoKFxuICAgIGV4cHJlc3Npb246IHN0cmluZyxcbiAgICB1c2luZ01ldHJpY3M6IFJlY29yZDxzdHJpbmcsIElNZXRyaWM+LFxuICAgIGxhYmVsOiBzdHJpbmcsXG4gICAgY29sb3I/OiBzdHJpbmcsXG4gICAgcGVyaW9kPzogRHVyYXRpb24sXG4gICAgcmVnaW9uPzogc3RyaW5nLFxuICAgIGFjY291bnQ/OiBzdHJpbmdcbiAgKTogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB7XG4gICAgcmV0dXJuIG5ldyBNYXRoRXhwcmVzc2lvbih7XG4gICAgICBsYWJlbCxcbiAgICAgIGNvbG9yLFxuICAgICAgZXhwcmVzc2lvbixcbiAgICAgIHVzaW5nTWV0cmljcyxcbiAgICAgIHBlcmlvZDogcGVyaW9kID8/IHRoaXMuZ2xvYmFsRGVmYXVsdHMucGVyaW9kID8/IERlZmF1bHRNZXRyaWNQZXJpb2QsXG4gICAgICBzZWFyY2hSZWdpb246IHJlZ2lvbiA/PyB0aGlzLmdsb2JhbERlZmF1bHRzLnJlZ2lvbixcbiAgICAgIHNlYXJjaEFjY291bnQ6IGFjY291bnQgPz8gdGhpcy5nbG9iYWxEZWZhdWx0cy5hY2NvdW50LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZhY3RvcnkgbWV0aG9kIHRoYXQgY3JlYXRlcyBhIG1ldHJpYyBzZWFyY2ggcXVlcnkuIFRoZSBtZXRyaWMgcHJvcGVydGllcyB3aWxsIGFscmVhZHkgYmUgdXBkYXRlZCB0byBjb21wbHkgd2l0aCB0aGUgZ2xvYmFsIGRlZmF1bHRzLlxuICAgKiBJZiB5b3Ugd2FudCB0byBtYXRjaCBcImFueSB2YWx1ZVwiIG9mIGEgc3BlY2lmaWMgZGltZW5zaW9uLCBwbGVhc2UgdXNlIGB1bmRlZmluZWRgIHZhbHVlIHJlcHJlc2VudGF0aW9uIGluIHlvdXIgY29uc3VtZXIgbGFuZ3VhZ2UuXG4gICAqIChGb3IgZXhhbXBsZSwgYHVuZGVmaW5lZCBhcyBhbnkgYXMgc3RyaW5nYCBpbiBUeXBlU2NyaXB0LCBkdWUgdG8gSlNJSSB0eXBpbmcgcXVpcmtzLilcbiAgICpcbiAgICogQHBhcmFtIHF1ZXJ5IG1ldHJpYyBzZWFyY2ggcXVlcnkgKHRoZSBzYW1lIGFzIHRoZSBzZWFyY2ggcXVlcnkgcHJvbXB0IGluIENsb3VkV2F0Y2ggQVdTIENvbnNvbGUpLCBpdCBtaWdodCBhbHNvIGJlIGVtcHR5XG4gICAqIEBwYXJhbSBkaW1lbnNpb25zTWFwIGRpbWVuc2lvbnMsIGZ1cnRoZXIgbmFycm93aW5nIHRoZSBzZWFyY2ggcmVzdWx0czsgdXNlIGB1bmRlZmluZWRgIGlmIHlvdSB3YW50IHRvIHJlcHJlc2VudCBcImFueSB2YWx1ZVwiIChpbiBUUzogYHVuZGVmaW5lZCBhcyBhbnkgYXMgc3RyaW5nYClcbiAgICogQHBhcmFtIHN0YXRpc3RpYyBhZ2dyZWdhdGlvbiBzdGF0aXN0aWMgdG8gdXNlXG4gICAqIEBwYXJhbSBuYW1lc3BhY2Ugc3BlY2lmeSBhIGN1c3RvbSBuYW1lc3BhY2U7IGlmIHVuZGVmaW5lZCwgdXNlcyB0aGUgZ2xvYmFsIGRlZmF1bHRcbiAgICogQHBhcmFtIGxhYmVsIHNwZWNpZnkgY3VzdG9tIGxhYmVsIGZvciBzZWFyY2ggbWV0cmljczsgZGVmYXVsdCBpcyBcIiBcIiBhcyBpdCBjYW5ub3QgYmUgZW1wdHkgc3RyaW5nXG4gICAqIEBwYXJhbSBwZXJpb2Qgc3BlY2lmeSBhIGN1c3RvbSBwZXJpb2Q7IGlmIHVuZGVmaW5lZCwgdXNlcyB0aGUgZ2xvYmFsIGRlZmF1bHRcbiAgICogQHBhcmFtIHJlZ2lvbiBzcGVjaWZ5IGEgY3VzdG9tIHJlZ2lvbjsgaWYgdW5kZWZpbmVkLCB1c2VzIHRoZSBnbG9iYWwgZGVmYXVsdFxuICAgKiBAcGFyYW0gYWNjb3VudCBzcGVjaWZ5IGEgY3VzdG9tIGFjY291bnQ7IGlmIHVuZGVmaW5lZCwgdXNlcyB0aGUgZ2xvYmFsIGRlZmF1bHRcbiAgICovXG4gIGNyZWF0ZU1ldHJpY1NlYXJjaChcbiAgICBxdWVyeTogc3RyaW5nLFxuICAgIGRpbWVuc2lvbnNNYXA6IERpbWVuc2lvbnNNYXAsXG4gICAgc3RhdGlzdGljOiBNZXRyaWNTdGF0aXN0aWMsXG4gICAgbmFtZXNwYWNlPzogc3RyaW5nLFxuICAgIGxhYmVsPzogc3RyaW5nLFxuICAgIHBlcmlvZD86IER1cmF0aW9uLFxuICAgIHJlZ2lvbj86IHN0cmluZyxcbiAgICBhY2NvdW50Pzogc3RyaW5nXG4gICk6IElNZXRyaWMge1xuICAgIGNvbnN0IGZpbmFsUGVyaW9kID1cbiAgICAgIHBlcmlvZCA/PyB0aGlzLmdsb2JhbERlZmF1bHRzLnBlcmlvZCA/PyBEZWZhdWx0TWV0cmljUGVyaW9kO1xuICAgIGNvbnN0IHNlYXJjaE5hbWVzcGFjZSA9IHRoaXMuZ2V0TmFtZXNwYWNlV2l0aEZhbGxiYWNrKG5hbWVzcGFjZSk7XG4gICAgY29uc3QgbmFtZXNwYWNlUGx1c0RpbWVuc2lvbktleXMgPSBbXG4gICAgICBzZWFyY2hOYW1lc3BhY2UsXG4gICAgICAuLi5PYmplY3Qua2V5cyhkaW1lbnNpb25zTWFwKSxcbiAgICBdLmpvaW4oXCIsXCIpO1xuICAgIGNvbnN0IG1ldHJpY1NjaGVtYSA9IGB7JHtuYW1lc3BhY2VQbHVzRGltZW5zaW9uS2V5c319YDtcblxuICAgIGNvbnN0IGRpbWVuc2lvbktleXNBbmRWYWx1ZXMgPSBPYmplY3QuZW50cmllcyhcbiAgICAgIHRoaXMucmVtb3ZlVW5kZWZpbmVkRW50cmllcyhkaW1lbnNpb25zTWFwKVxuICAgIClcbiAgICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4gYCR7a2V5fT1cIiR7dmFsdWV9XCJgKVxuICAgICAgLmpvaW4oXCIgXCIpO1xuXG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IGBTRUFSQ0goJyR7bWV0cmljU2NoZW1hfSAke2RpbWVuc2lvbktleXNBbmRWYWx1ZXN9ICR7cXVlcnl9JywgJyR7c3RhdGlzdGljfScsICR7ZmluYWxQZXJpb2QudG9TZWNvbmRzKCl9KWA7XG5cbiAgICByZXR1cm4gbmV3IE1hdGhFeHByZXNzaW9uKHtcbiAgICAgIGV4cHJlc3Npb24sXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2F3cy9hd3MtY2RrL2lzc3Vlcy83MjM3XG4gICAgICB1c2luZ01ldHJpY3M6IHt9LFxuICAgICAgLy8gY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZyBhbmQgdW5kZWZpbmVkIGlzIG5vIGdvb2QgZWl0aGVyXG4gICAgICBsYWJlbDogbGFiZWwgPz8gXCIgXCIsXG4gICAgICBwZXJpb2Q6IGZpbmFsUGVyaW9kLFxuICAgICAgc2VhcmNoUmVnaW9uOiByZWdpb24gPz8gdGhpcy5nbG9iYWxEZWZhdWx0cy5yZWdpb24sXG4gICAgICBzZWFyY2hBY2NvdW50OiBhY2NvdW50ID8/IHRoaXMuZ2xvYmFsRGVmYXVsdHMuYWNjb3VudCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGYWN0b3J5IG1ldGhvZCB0aGF0IGNyZWF0ZXMgYW5vbWFseSBkZXRlY3Rpb24gb24gYSBtZXRyaWMuXG4gICAqIEFub21hbHkgb2NjdXJzIHdoZW5ldmVyIGEgbWV0cmljIHZhbHVlIGZhbGxzIG91dHNpZGUgb2YgYSBwcmVjb21wdXRlZCByYW5nZSBvZiBwcmVkaWN0ZWQgdmFsdWVzLlxuICAgKiBUaGUgZGV0ZWN0aW9uIGRvZXMgbm90IG5lZWQgYW55IHNldHVwLiBUaGUgbW9kZWwgd2lsbCBzdGFydCBsZWFybmluZyBhdXRvbWF0aWNhbGx5IGFuZCBzaG91bGQgYmUgcmVhZHkgaW4gYSBmZXcgbWludXRlcy5cbiAgICogVXN1YWxseSwgdGhlIGFub21hbHkgZGV0ZWN0aW9uIGlzIHBhaXJlZCB3aXRoIGFuIGFsYXJtLlxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BbWF6b25DbG91ZFdhdGNoL2xhdGVzdC9tb25pdG9yaW5nL0Nsb3VkV2F0Y2hfQW5vbWFseV9EZXRlY3Rpb24uaHRtbFxuICAgKlxuICAgKiBAcGFyYW0gbWV0cmljIG1ldHJpYyB0byBkZXRlY3QgYW5vbWFseSBkZXRlY3Rpb24gb2ZcbiAgICogQHBhcmFtIHN0ZGV2IHN0YW5kYXJkIGRldmlhdGlvbiwgYmFzaWNhbGx5IHRoZSB0b2xlcmFuY2UgLyBiYW5kIHRoaWNrbmVzc1xuICAgKiBAcGFyYW0gbGFiZWwgbWV0cmljIGxhYmVsIChyZXF1aXJlZCwgYXMgdGhlcmUgaXMgbm8gcmVhc29uYWJsZSBkZWZhdWx0KVxuICAgKiBAcGFyYW0gY29sb3IgbWV0cmljIGNvbG9yOyBpZiB1bmRlZmluZWQsIHVzZXMgYSBDbG91ZFdhdGNoIHByb3ZpZGVkIGNvbG9yIChwcmVmZXJyZWQpXG4gICAqIEBwYXJhbSBleHByZXNzaW9uSWQgZXhwcmVzc2lvbiBJRCBvZiB0aGUgbWV0cmljOyB1c2VzIGBtMWAgaWYgdW5kZWZpbmVkXG4gICAqIEBwYXJhbSBwZXJpb2Qgc3BlY2lmeSBhIGN1c3RvbSBwZXJpb2Q7IGlmIHVuZGVmaW5lZCwgdXNlcyB0aGUgZ2xvYmFsIGRlZmF1bHRcbiAgICogQHBhcmFtIHJlZ2lvbiBzcGVjaWZ5IGEgY3VzdG9tIHJlZ2lvbjsgaWYgdW5kZWZpbmVkLCB1c2VzIHRoZSBnbG9iYWwgZGVmYXVsdFxuICAgKiBAcGFyYW0gYWNjb3VudCBzcGVjaWZ5IGEgY3VzdG9tIGFjY291bnQ7IGlmIHVuZGVmaW5lZCwgdXNlcyB0aGUgZ2xvYmFsIGRlZmF1bHRcbiAgICovXG4gIGNyZWF0ZU1ldHJpY0Fub21hbHlEZXRlY3Rpb24oXG4gICAgbWV0cmljOiBJTWV0cmljLFxuICAgIHN0ZGV2OiBudW1iZXIsXG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICBjb2xvcj86IHN0cmluZyxcbiAgICBleHByZXNzaW9uSWQ/OiBzdHJpbmcsXG4gICAgcGVyaW9kPzogRHVyYXRpb24sXG4gICAgcmVnaW9uPzogc3RyaW5nLFxuICAgIGFjY291bnQ/OiBzdHJpbmdcbiAgKTogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB7XG4gICAgY29uc3QgZmluYWxFeHByZXNzaW9uSWQgPSBleHByZXNzaW9uSWQgPz8gXCJtMVwiO1xuICAgIGNvbnN0IHVzaW5nTWV0cmljczogUmVjb3JkPHN0cmluZywgSU1ldHJpYz4gPSB7fTtcbiAgICB1c2luZ01ldHJpY3NbZmluYWxFeHByZXNzaW9uSWRdID0gbWV0cmljO1xuICAgIHJldHVybiBuZXcgQW5vbWFseURldGVjdGlvbk1hdGhFeHByZXNzaW9uKHtcbiAgICAgIGxhYmVsLFxuICAgICAgY29sb3IsXG4gICAgICB1c2luZ01ldHJpY3MsXG4gICAgICBleHByZXNzaW9uOiBgQU5PTUFMWV9ERVRFQ1RJT05fQkFORCgke2ZpbmFsRXhwcmVzc2lvbklkfSwke3N0ZGV2fSlgLFxuICAgICAgcGVyaW9kOiBwZXJpb2QgPz8gdGhpcy5nbG9iYWxEZWZhdWx0cy5wZXJpb2QgPz8gRGVmYXVsdE1ldHJpY1BlcmlvZCxcbiAgICAgIHNlYXJjaFJlZ2lvbjogcmVnaW9uID8/IHRoaXMuZ2xvYmFsRGVmYXVsdHMucmVnaW9uLFxuICAgICAgc2VhcmNoQWNjb3VudDogYWNjb3VudCA/PyB0aGlzLmdsb2JhbERlZmF1bHRzLmFjY291bnQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRhcHRzIHByb3BlcnRpZXMgb2YgYSBmb3JlaWduIG1ldHJpYyAobWV0cmljIGNyZWF0ZWQgb3V0c2lkZSBvZiB0aGlzIG1ldHJpYyBmYWN0b3J5KSB0byBjb21wbHkgd2l0aCB0aGUgZ2xvYmFsIGRlZmF1bHRzLlxuICAgKiBNaWdodCBtb2RpZnkgbmFtZXNwYWNlIGFuZCBtZXRyaWMgcGVyaW9kLlxuICAgKlxuICAgKiBAcGFyYW0gbWV0cmljIG1ldHJpYyB0byBiZSBhZGFwdGVkXG4gICAqL1xuICBhZGFwdE1ldHJpYyhtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQpOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0IHtcbiAgICByZXR1cm4gbWV0cmljLndpdGgoe1xuICAgICAgcGVyaW9kOiB0aGlzLmdsb2JhbERlZmF1bHRzLnBlcmlvZCA/PyBEZWZhdWx0TWV0cmljUGVyaW9kLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkYXB0cyBwcm9wZXJ0aWVzIG9mIGEgZm9yZWlnbiBtZXRyaWMgKG1ldHJpYyBjcmVhdGVkIG91dHNpZGUgb2YgdGhpcyBtZXRyaWMgZmFjdG9yeSkgdG8gY29tcGx5IHdpdGggdGhlIGdsb2JhbCBkZWZhdWx0cy5cbiAgICogTWlnaHQgbW9kaWZ5IG5hbWVzcGFjZS4gUHJlc2VydmVzIG1ldHJpYyBwZXJpb2QuXG4gICAqXG4gICAqIEBwYXJhbSBtZXRyaWMgbWV0cmljIHRvIGJlIGFkYXB0ZWRcbiAgICovXG4gIGFkYXB0TWV0cmljUHJlc2VydmluZ1BlcmlvZChcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnRcbiAgKTogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB7XG4gICAgcmV0dXJuIG1ldHJpYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWV0cmljIG1hdGggZXhwcmVzc2lvbiB0aGF0IG11bHRpcGxpZXMgdGhlIGdpdmVuIG1ldHJpYyBieSBnaXZlbiBjb2VmZmljaWVudC5cbiAgICogRG9lcyBub3RoaW5nIGlmIHRoZSBtdWx0aXBsaWVyIGlzIG9uZS4gUHJlc2VydmVzIHRoZSBtZXRyaWMgcGVyaW9kLlxuICAgKlxuICAgKiBAcGFyYW0gbWV0cmljIG1ldHJpYyB0byBtdWx0aXBseVxuICAgKiBAcGFyYW0gbXVsdGlwbGllciBtdWx0aXBsaWVyIChtdXN0IGJlID4gMSlcbiAgICogQHBhcmFtIGxhYmVsIGV4cHJlc3Npb24gbGFiZWxcbiAgICogQHBhcmFtIGV4cHJlc3Npb25JZCBleHByZXNzaW9uIElEIG9mIHRoZSBtZXRyaWM7IHVzZXMgYG0xYCBpZiB1bmRlZmluZWRcbiAgICovXG4gIG11bHRpcGx5TWV0cmljKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBtdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICBleHByZXNzaW9uSWQ/OiBzdHJpbmdcbiAgKTogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB7XG4gICAgaWYgKG11bHRpcGxpZXIgPT0gMSkge1xuICAgICAgcmV0dXJuIG1ldHJpYztcbiAgICB9IGVsc2UgaWYgKG11bHRpcGxpZXIgPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdWx0aXBsaWVyIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9uZS5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbmFsRXhwcmVzc2lvbklkID0gZXhwcmVzc2lvbklkID8/IFwibTFcIjtcbiAgICAgIGNvbnN0IHVzaW5nTWV0cmljczogUmVjb3JkPHN0cmluZywgSU1ldHJpYz4gPSB7fTtcbiAgICAgIHVzaW5nTWV0cmljc1tmaW5hbEV4cHJlc3Npb25JZF0gPSBtZXRyaWM7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVNZXRyaWNNYXRoKFxuICAgICAgICBgJHtmaW5hbEV4cHJlc3Npb25JZH0gKiAke211bHRpcGxpZXJ9YCxcbiAgICAgICAgdXNpbmdNZXRyaWNzLFxuICAgICAgICBsYWJlbCxcbiAgICAgICAgbWV0cmljLmNvbG9yLFxuICAgICAgICBtZXRyaWMucGVyaW9kXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWV0cmljIG1hdGggZXhwcmVzc2lvbiB0aGF0IGRpdmlkZXMgdGhlIGdpdmVuIG1ldHJpYyBieSBnaXZlbiBjb2VmZmljaWVudC5cbiAgICogRG9lcyBub3RoaW5nIGlmIHRoZSBkaXZpc29yIGlzIG9uZS4gUHJlc2VydmVzIHRoZSBtZXRyaWMgcGVyaW9kLlxuICAgKlxuICAgKiBAcGFyYW0gbWV0cmljIG1ldHJpYyB0byBtdWx0aXBseVxuICAgKiBAcGFyYW0gZGl2aXNvciBkaXZpc29yIChtdXN0IGJlID4gMSlcbiAgICogQHBhcmFtIGxhYmVsIGV4cHJlc3Npb24gbGFiZWxcbiAgICogQHBhcmFtIGV4cHJlc3Npb25JZCBleHByZXNzaW9uIElEIG9mIHRoZSBtZXRyaWM7IHVzZXMgYG0xYCBpZiB1bmRlZmluZWRcbiAgICovXG4gIGRpdmlkZU1ldHJpYyhcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgZGl2aXNvcjogbnVtYmVyLFxuICAgIGxhYmVsOiBzdHJpbmcsXG4gICAgZXhwcmVzc2lvbklkPzogc3RyaW5nXG4gICk6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQge1xuICAgIGlmIChkaXZpc29yID09IDEpIHtcbiAgICAgIHJldHVybiBtZXRyaWM7XG4gICAgfSBlbHNlIGlmIChkaXZpc29yIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRGl2aXNvciBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvbmUuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaW5hbEV4cHJlc3Npb25JZCA9IGV4cHJlc3Npb25JZCA/PyBcIm0xXCI7XG4gICAgICBjb25zdCB1c2luZ01ldHJpY3M6IFJlY29yZDxzdHJpbmcsIElNZXRyaWM+ID0ge307XG4gICAgICB1c2luZ01ldHJpY3NbZmluYWxFeHByZXNzaW9uSWRdID0gbWV0cmljO1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTWV0cmljTWF0aChcbiAgICAgICAgYCR7ZmluYWxFeHByZXNzaW9uSWR9IC8gJHtkaXZpc29yfWAsXG4gICAgICAgIHVzaW5nTWV0cmljcyxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIG1ldHJpYy5jb2xvcixcbiAgICAgICAgbWV0cmljLnBlcmlvZFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1ldHJpYyBtYXRoIGV4cHJlc3Npb24gdGhhdCBjb21wdXRlcyBhIHJhdGUgZnJvbSBhIHJlZ3VsYXIgbWV0cmljLlxuICAgKiBGb3IgZXhhbXBsZSwgaXQgYWxsb3dzIHlvdSB0byBjb21wdXRlIHJhdGUgcGVyIHNlY29uZCAoVFBTKSwgcGVyIG1pbnV0ZSwgb3IganVzdCBhbiBhdmVyYWdlIG9mIHlvdXIgdHJhbnNhY3Rpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gbWV0cmljIG1ldHJpYyB0byBjYWxjdWxhdGUgdGhlIHJhdGUgZnJvbVxuICAgKiBAcGFyYW0gbWV0aG9kIHJhdGUgY29tcHV0YXRpb24gbWV0aG9kXG4gICAqIEBwYXJhbSBhZGRTdGF0c1RvTGFiZWwgYWRkIGRldGFpbGVkIHN0YXRpc3RpY3MgKG1pbiwgbWF4LCBhdmVyYWdlKSB0byB0aGUgbGFiZWxcbiAgICogQHBhcmFtIGV4cHJlc3Npb25JZCBleHByZXNzaW9uIElEIG9mIHRoZSBtZXRyaWM7IHVzZXMgYG0xYCBpZiB1bmRlZmluZWRcbiAgICogQHBhcmFtIGZpbGxXaXRoWmVyb2VzIGlmIFRSVUUsIHRoZSBmaW5hbCBtZXRyaWMgd2lsbCBiZSB6ZXJvLWZpbGxlZCAoMCBvbiBubyBkYXRhKTsgZmFsc2UgaWYgdW5kZWZpbmVkXG4gICAqL1xuICB0b1JhdGUoXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIG1ldGhvZDogUmF0ZUNvbXB1dGF0aW9uTWV0aG9kLFxuICAgIGFkZFN0YXRzVG9MYWJlbD86IGJvb2xlYW4sXG4gICAgZXhwcmVzc2lvbklkPzogc3RyaW5nLFxuICAgIGZpbGxXaXRoWmVyb2VzPzogYm9vbGVhblxuICApOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0IHtcbiAgICBjb25zdCBmaW5hbEV4cHJlc3Npb25JZCA9IGV4cHJlc3Npb25JZCA/PyBcIm0xXCI7XG4gICAgY29uc3QgbGFiZWxQcmVmaXggPSBtZXRyaWMubGFiZWwgPz8gXCJSYXRlXCI7XG5cbiAgICBjb25zdCBzdGF0c0luTGFiZWw6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKGFkZFN0YXRzVG9MYWJlbCA/PyBmYWxzZSkge1xuICAgICAgc3RhdHNJbkxhYmVsLnB1c2goXCJtaW46ICR7TUlOfVwiKTtcbiAgICAgIHN0YXRzSW5MYWJlbC5wdXNoKFwibWF4OiAke01BWH1cIik7XG4gICAgICBpZiAobWV0aG9kICE9PSBSYXRlQ29tcHV0YXRpb25NZXRob2QuQVZFUkFHRSkge1xuICAgICAgICAvLyBvbmx5IGFkZCBhdmVyYWdlIGlmIGRvIG5vdCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgc3RhdHNJbkxhYmVsLnB1c2goXCJhdmc6ICR7QVZHfVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBmaW5hbEV4cHJlc3Npb25JZFplcm9lZCA9XG4gICAgICBmaWxsV2l0aFplcm9lcyA/PyBmYWxzZVxuICAgICAgICA/IGBGSUxMKCR7ZmluYWxFeHByZXNzaW9uSWR9LDApYFxuICAgICAgICA6IGZpbmFsRXhwcmVzc2lvbklkO1xuICAgIGNvbnN0IGxhYmVsQXBwZW5kaXggPVxuICAgICAgc3RhdHNJbkxhYmVsLmxlbmd0aCA+IDAgPyBgICgke3N0YXRzSW5MYWJlbC5qb2luKFwiLCBcIil9KWAgOiBcIlwiO1xuXG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2UgUmF0ZUNvbXB1dGF0aW9uTWV0aG9kLkFWRVJBR0U6XG4gICAgICAgIGNvbnN0IGF2Z0xhYmVsID0gYCR7bGFiZWxQcmVmaXh9IChhdmcpJHtsYWJlbEFwcGVuZGl4fWA7XG4gICAgICAgIGNvbnN0IGF2Z01ldHJpYyA9IG1ldHJpYy53aXRoKHtcbiAgICAgICAgICBsYWJlbDogYXZnTGFiZWwsXG4gICAgICAgICAgc3RhdGlzdGljOiBNZXRyaWNTdGF0aXN0aWMuQVZFUkFHRSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChmaWxsV2l0aFplcm9lcyA/PyBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1ldHJpY01hdGgoXG4gICAgICAgICAgICBmaW5hbEV4cHJlc3Npb25JZFplcm9lZCxcbiAgICAgICAgICAgIHsgW2ZpbmFsRXhwcmVzc2lvbklkXTogYXZnTWV0cmljIH0sXG4gICAgICAgICAgICBhdmdMYWJlbCxcbiAgICAgICAgICAgIGF2Z01ldHJpYy5jb2xvcixcbiAgICAgICAgICAgIGF2Z01ldHJpYy5wZXJpb2RcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdmdNZXRyaWM7XG4gICAgICBjYXNlIFJhdGVDb21wdXRhdGlvbk1ldGhvZC5QRVJfU0VDT05EOlxuICAgICAgICBsZXQgcGVyU2Vjb25kTGFiZWwgPSBgJHtsYWJlbFByZWZpeH0vcyR7bGFiZWxBcHBlbmRpeH1gO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbGFiZWxQcmVmaXggPT09IFwiUmVxdWVzdHNcIiB8fFxuICAgICAgICAgIGxhYmVsUHJlZml4ID09PSBcIkludm9jYXRpb25zXCIgfHxcbiAgICAgICAgICBsYWJlbFByZWZpeCA9PT0gXCJUcmFuc2FjdGlvbnNcIlxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBjdXJyZW50bHksIGtlcHQgYXMgXCJUUFNcIiB0byByZWR1Y2UgbnVtYmVyIG9mIHNuYXBzaG90IGNoYW5nZXNcbiAgICAgICAgICBwZXJTZWNvbmRMYWJlbCA9IGBUUFMke2xhYmVsQXBwZW5kaXh9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNZXRyaWNNYXRoKFxuICAgICAgICAgIGAke2ZpbmFsRXhwcmVzc2lvbklkWmVyb2VkfSAvIFBFUklPRCgke2ZpbmFsRXhwcmVzc2lvbklkfSlgLFxuICAgICAgICAgIHsgW2ZpbmFsRXhwcmVzc2lvbklkXTogbWV0cmljIH0sXG4gICAgICAgICAgcGVyU2Vjb25kTGFiZWwsXG4gICAgICAgICAgbWV0cmljLmNvbG9yLFxuICAgICAgICAgIG1ldHJpYy5wZXJpb2RcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgUmF0ZUNvbXB1dGF0aW9uTWV0aG9kLlBFUl9NSU5VVEU6XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1ldHJpY01hdGgoXG4gICAgICAgICAgYCg2MCAqICR7ZmluYWxFeHByZXNzaW9uSWRaZXJvZWR9KSAvIFBFUklPRCgke2ZpbmFsRXhwcmVzc2lvbklkfSlgLFxuICAgICAgICAgIHsgW2ZpbmFsRXhwcmVzc2lvbklkXTogbWV0cmljIH0sXG4gICAgICAgICAgYCR7bGFiZWxQcmVmaXh9L20ke2xhYmVsQXBwZW5kaXh9YCxcbiAgICAgICAgICBtZXRyaWMuY29sb3IsXG4gICAgICAgICAgbWV0cmljLnBlcmlvZFxuICAgICAgICApO1xuICAgICAgY2FzZSBSYXRlQ29tcHV0YXRpb25NZXRob2QuUEVSX0hPVVI6XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1ldHJpY01hdGgoXG4gICAgICAgICAgYCgzNjAwICogJHtmaW5hbEV4cHJlc3Npb25JZFplcm9lZH0pIC8gUEVSSU9EKCR7ZmluYWxFeHByZXNzaW9uSWR9KWAsXG4gICAgICAgICAgeyBbZmluYWxFeHByZXNzaW9uSWRdOiBtZXRyaWMgfSxcbiAgICAgICAgICBgJHtsYWJlbFByZWZpeH0vaCR7bGFiZWxBcHBlbmRpeH1gLFxuICAgICAgICAgIG1ldHJpYy5jb2xvcixcbiAgICAgICAgICBtZXRyaWMucGVyaW9kXG4gICAgICAgICk7XG4gICAgICBjYXNlIFJhdGVDb21wdXRhdGlvbk1ldGhvZC5QRVJfREFZOlxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNZXRyaWNNYXRoKFxuICAgICAgICAgIGAoODY0MDAgKiAke2ZpbmFsRXhwcmVzc2lvbklkWmVyb2VkfSkgLyBQRVJJT0QoJHtmaW5hbEV4cHJlc3Npb25JZH0pYCxcbiAgICAgICAgICB7IFtmaW5hbEV4cHJlc3Npb25JZF06IG1ldHJpYyB9LFxuICAgICAgICAgIGAke2xhYmVsUHJlZml4fS9kJHtsYWJlbEFwcGVuZGl4fWAsXG4gICAgICAgICAgbWV0cmljLmNvbG9yLFxuICAgICAgICAgIG1ldHJpYy5wZXJpb2RcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ2l2ZW4gbmFtZXNwYWNlIChpZiBkZWZpbmVkKSBvciB0aGUgZ2xvYmFsIG5hbWVzcGFjZSBhcyBhIGZhbGxiYWNrLlxuICAgKiBJZiB0aGVyZSBpcyBubyBuYW1lc3BhY2UgdG8gZmFsbGJhY2sgdG8gKG5laXRoZXIgdGhlIGN1c3RvbSBvciB0aGUgZGVmYXVsdCBvbmUpLCBpdCB3aWxsIGZhaWwuXG4gICAqIEBwYXJhbSB2YWx1ZSBjdXN0b20gbmFtZXNwYWNlXG4gICAqL1xuICBnZXROYW1lc3BhY2VXaXRoRmFsbGJhY2sodmFsdWU/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBuYW1lc3BhY2UgPSB2YWx1ZSA/PyB0aGlzLmdsb2JhbERlZmF1bHRzLm5hbWVzcGFjZTtcbiAgICBpZiAoIW5hbWVzcGFjZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlRoZXJlIGlzIG5vIGN1c3RvbSBuYW1lc3BhY2UgZGVmaW5lZC4gUGxlYXNlIHNwZWNpZnkgaXQgaW4geW91ciBmYWN0b3J5IGRlZmF1bHRzLlwiXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXNwYWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdGhhdCBoZWxwcyB0byBzYW5pdGl6ZSB0aGUgZ2l2ZW4gZXhwcmVzc2lvbiBJRCBhbmQgcmVtb3ZlcyBhbGwgaW52YWxpZCBjaGFyYWN0ZXJzLlxuICAgKiBWYWxpZCBleHByZXNzaW9uIElEIHJlZ2V4cCBpcyB0aGUgZm9sbG93aW5nOiBeW2Etel1bYS16QS1aMC05X10qJFxuICAgKiBBcyB0aGlzIGlzIGp1c3QgdG8gdmFsaWRhdGUgYSBzdWZmaXggYW5kIG5vdCB0aGUgd2hvbGUgSUQsIHdlIGRvIG5vdCBoYXZlIHRvIHZlcmlmeSB0aGUgZmlyc3QgbG93ZXIgY2FzZSBsZXR0ZXIuXG4gICAqIEBwYXJhbSBleHByZXNzaW9uSWQgZXhwcmVzc2lvbiBJRCB0byBzYW5pdGl6ZVxuICAgKi9cbiAgc2FuaXRpemVNZXRyaWNFeHByZXNzaW9uSWRTdWZmaXgoZXhwcmVzc2lvbklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbklkLnJlcGxhY2UoL1teMC05YS16X10vZ2ksIFwiXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlcyB0aGUgZ2l2ZW4gYWRkaXRpb25hbCBkaW1lbnNpb25zIHRvIHRoZSBnaXZlbiB0YXJnZXQgZGltZW5zaW9uIGhhc2guXG4gICAqIEFsbCBleGlzdGluZyBkaW1lbnNpb25zIHdpdGggdGhlIHNhbWUga2V5IGFyZSByZXBsYWNlZC5cbiAgICogQHBhcmFtIHRhcmdldCB0YXJnZXQgZGltZW5zaW9uIGhhc2ggdG8gdXBkYXRlXG4gICAqIEBwYXJhbSBhZGRpdGlvbmFsRGltZW5zaW9ucyBhZGRpdGlvbmFsIGRpbWVuc2lvbnNcbiAgICovXG4gIGFkZEFkZGl0aW9uYWxEaW1lbnNpb25zKFxuICAgIHRhcmdldDogRGltZW5zaW9uc01hcCxcbiAgICBhZGRpdGlvbmFsRGltZW5zaW9uczogRGltZW5zaW9uc01hcFxuICApIHtcbiAgICAvLyBBZGQgYWRkaXRpb25hbCBkaW1lbnNpb25zIGluIHRoZSBzZWFyY2ggcXVlcnlcbiAgICBPYmplY3Qua2V5cyhhZGRpdGlvbmFsRGltZW5zaW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0YXJnZXRba2V5XSA9IGFkZGl0aW9uYWxEaW1lbnNpb25zW2tleV07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgZW50cmllcyBmcm9tIHRoZSBnaXZlbiBkaW1lbnNpb24gaGFzaCB0aGF0IGNvbnRhaW4gYW4gdW5kZWZpbmVkIHZhbHVlLlxuICAgKiBAcGFyYW0gZGltZW5zaW9uc01hcCBkaW1lbnNpb25zIG1hcCB0byB1cGRhdGVcbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlVW5kZWZpbmVkRW50cmllcyhkaW1lbnNpb25zTWFwOiBEaW1lbnNpb25zTWFwKSB7XG4gICAgY29uc3QgY29weTogRGltZW5zaW9uc01hcCA9IHt9O1xuXG4gICAgT2JqZWN0LmVudHJpZXMoZGltZW5zaW9uc01hcClcbiAgICAgIC5maWx0ZXIoKFtfLCB2YWx1ZV0pID0+IHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiAoY29weVtrZXldID0gdmFsdWUpKTtcblxuICAgIHJldHVybiBjb3B5O1xuICB9XG59XG4iXX0=