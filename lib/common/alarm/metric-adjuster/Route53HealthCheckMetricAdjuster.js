"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route53HealthCheckMetricAdjuster = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const metric_1 = require("../../metric");
/**
 * The supported statistics by Route53 Health Checks.
 * @see https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html
 */
const SUPPORTED_STATS = new Set([
    metric_1.MetricStatistic.AVERAGE,
    metric_1.MetricStatistic.MIN,
    metric_1.MetricStatistic.MAX,
    metric_1.MetricStatistic.SUM,
    metric_1.MetricStatistic.N,
]);
/**
 * Adjusts a metric so that alarms created from it can be used in Route53 Health Checks.
 * The metric will be validated to ensure it satisfies Route53 Health Check alarm requirements, otherwise it will throw an {@link Error}.
 * @see https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html
 */
class Route53HealthCheckMetricAdjuster {
    /** @inheritdoc */
    adjustMetric(metric, alarmScope, props) {
        // Route53 health checks do not support composite alarms
        if (props.minMetricSamplesToAlarm) {
            throw new Error("Alarms with 'minMetricSamplesToAlarm' are not supported.");
        }
        // Route53 health checks do to support metric math
        if (!(metric instanceof aws_cloudwatch_1.Metric)) {
            throw new Error("The specified metric must be a Metric instance.");
        }
        const { account, period, statistic } = metric;
        if (account && account !== aws_cdk_lib_1.Stack.of(alarmScope).account) {
            throw new Error("Cross-account metrics are not supported.");
        }
        // Route53 health checks do not support high-resolution metrics
        if (period && period.toSeconds() < 60) {
            throw new Error("High resolution metrics are not supported.");
        }
        // Route53 health checks only support a subset of statistics
        if (!SUPPORTED_STATS.has(statistic)) {
            throw new Error(`Metrics with statistic '${statistic}' are not supported.`);
        }
        // Can't use `metric.with()` to remove the label, only change it
        // See: https://github.com/aws/aws-cdk/blob/v2.65.0/packages/%40aws-cdk/aws-cloudwatch/lib/metric.ts#L314-L342
        return new aws_cloudwatch_1.Metric({
            ...metric,
            // all fields except dimensions have the same names
            dimensionsMap: metric.dimensions,
            /*
             * `AWS::CloudWatch::Alarm` CFN resource types have two variants:
             * - Based on a single metric: Uses `MetricName` property.
             * - Based on metric math: Uses `Metrics` property.
             *
             * If the `label` of a `Metric` instance is defined, when an
             * alarm is created from it, even if it doesn't use metric math,
             * it will use the `Metrics` property. Since Route53 does not
             * support metric math it assumes any alarm created using the
             * `Metrics` property must use metric math, thus it must be removed.
             *
             * See: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-alarm.html
             * See: https://github.com/aws/aws-cdk/blob/v2.65.0/packages/@aws-cdk/aws-cloudwatch/lib/alarm.ts#L262-L298
             */
            label: undefined,
        });
    }
}
exports.Route53HealthCheckMetricAdjuster = Route53HealthCheckMetricAdjuster;
_a = JSII_RTTI_SYMBOL_1;
Route53HealthCheckMetricAdjuster[_a] = { fqn: "cdk-monitoring-constructs.Route53HealthCheckMetricAdjuster", version: "0.0.0" };
Route53HealthCheckMetricAdjuster.INSTANCE = new Route53HealthCheckMetricAdjuster();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGU1M0hlYWx0aENoZWNrTWV0cmljQWRqdXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSb3V0ZTUzSGVhbHRoQ2hlY2tNZXRyaWNBZGp1c3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZDQUFvQztBQUNwQywrREFBb0Q7QUFHcEQseUNBQXVFO0FBR3ZFOzs7R0FHRztBQUNILE1BQU0sZUFBZSxHQUFHLElBQUksR0FBRyxDQUFTO0lBQ3RDLHdCQUFlLENBQUMsT0FBTztJQUN2Qix3QkFBZSxDQUFDLEdBQUc7SUFDbkIsd0JBQWUsQ0FBQyxHQUFHO0lBQ25CLHdCQUFlLENBQUMsR0FBRztJQUNuQix3QkFBZSxDQUFDLENBQUM7Q0FDbEIsQ0FBQyxDQUFDO0FBRUg7Ozs7R0FJRztBQUNILE1BQWEsZ0NBQWdDO0lBRzNDLGtCQUFrQjtJQUNsQixZQUFZLENBQ1YsTUFBOEIsRUFDOUIsVUFBcUIsRUFDckIsS0FBb0I7UUFFcEIsd0RBQXdEO1FBQ3hELElBQUksS0FBSyxDQUFDLHVCQUF1QixFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMERBQTBELENBQzNELENBQUM7U0FDSDtRQUVELGtEQUFrRDtRQUNsRCxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksdUJBQU0sQ0FBQyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztTQUNwRTtRQUVELE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUU5QyxJQUFJLE9BQU8sSUFBSSxPQUFPLEtBQUssbUJBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDtRQUVELCtEQUErRDtRQUMvRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtRQUVELDREQUE0RDtRQUM1RCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNuQyxNQUFNLElBQUksS0FBSyxDQUNiLDJCQUEyQixTQUFTLHNCQUFzQixDQUMzRCxDQUFDO1NBQ0g7UUFFRCxnRUFBZ0U7UUFDaEUsOEdBQThHO1FBQzlHLE9BQU8sSUFBSSx1QkFBTSxDQUFDO1lBQ2hCLEdBQUcsTUFBTTtZQUNULG1EQUFtRDtZQUNuRCxhQUFhLEVBQUUsTUFBTSxDQUFDLFVBQVU7WUFDaEM7Ozs7Ozs7Ozs7Ozs7ZUFhRztZQUNILEtBQUssRUFBRSxTQUFTO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBN0RILDRFQThEQzs7O0FBN0RpQix5Q0FBUSxHQUFHLElBQUksZ0NBQWdDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBNZXRyaWMgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgeyBJTWV0cmljQWRqdXN0ZXIgfSBmcm9tIFwiLi9JTWV0cmljQWRqdXN0ZXJcIjtcbmltcG9ydCB7IE1ldHJpY1N0YXRpc3RpYywgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB9IGZyb20gXCIuLi8uLi9tZXRyaWNcIjtcbmltcG9ydCB7IEFkZEFsYXJtUHJvcHMgfSBmcm9tIFwiLi4vQWxhcm1GYWN0b3J5XCI7XG5cbi8qKlxuICogVGhlIHN1cHBvcnRlZCBzdGF0aXN0aWNzIGJ5IFJvdXRlNTMgSGVhbHRoIENoZWNrcy5cbiAqIEBzZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL1JvdXRlNTMvbGF0ZXN0L0RldmVsb3Blckd1aWRlL2hlYWx0aC1jaGVja3MtdHlwZXMuaHRtbFxuICovXG5jb25zdCBTVVBQT1JURURfU1RBVFMgPSBuZXcgU2V0PHN0cmluZz4oW1xuICBNZXRyaWNTdGF0aXN0aWMuQVZFUkFHRSxcbiAgTWV0cmljU3RhdGlzdGljLk1JTixcbiAgTWV0cmljU3RhdGlzdGljLk1BWCxcbiAgTWV0cmljU3RhdGlzdGljLlNVTSxcbiAgTWV0cmljU3RhdGlzdGljLk4sXG5dKTtcblxuLyoqXG4gKiBBZGp1c3RzIGEgbWV0cmljIHNvIHRoYXQgYWxhcm1zIGNyZWF0ZWQgZnJvbSBpdCBjYW4gYmUgdXNlZCBpbiBSb3V0ZTUzIEhlYWx0aCBDaGVja3MuXG4gKiBUaGUgbWV0cmljIHdpbGwgYmUgdmFsaWRhdGVkIHRvIGVuc3VyZSBpdCBzYXRpc2ZpZXMgUm91dGU1MyBIZWFsdGggQ2hlY2sgYWxhcm0gcmVxdWlyZW1lbnRzLCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhbiB7QGxpbmsgRXJyb3J9LlxuICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vUm91dGU1My9sYXRlc3QvRGV2ZWxvcGVyR3VpZGUvaGVhbHRoLWNoZWNrcy10eXBlcy5odG1sXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZTUzSGVhbHRoQ2hlY2tNZXRyaWNBZGp1c3RlciBpbXBsZW1lbnRzIElNZXRyaWNBZGp1c3RlciB7XG4gIHN0YXRpYyByZWFkb25seSBJTlNUQU5DRSA9IG5ldyBSb3V0ZTUzSGVhbHRoQ2hlY2tNZXRyaWNBZGp1c3RlcigpO1xuXG4gIC8qKiBAaW5oZXJpdGRvYyAqL1xuICBhZGp1c3RNZXRyaWMoXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIGFsYXJtU2NvcGU6IENvbnN0cnVjdCxcbiAgICBwcm9wczogQWRkQWxhcm1Qcm9wc1xuICApOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0IHtcbiAgICAvLyBSb3V0ZTUzIGhlYWx0aCBjaGVja3MgZG8gbm90IHN1cHBvcnQgY29tcG9zaXRlIGFsYXJtc1xuICAgIGlmIChwcm9wcy5taW5NZXRyaWNTYW1wbGVzVG9BbGFybSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkFsYXJtcyB3aXRoICdtaW5NZXRyaWNTYW1wbGVzVG9BbGFybScgYXJlIG5vdCBzdXBwb3J0ZWQuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUm91dGU1MyBoZWFsdGggY2hlY2tzIGRvIHRvIHN1cHBvcnQgbWV0cmljIG1hdGhcbiAgICBpZiAoIShtZXRyaWMgaW5zdGFuY2VvZiBNZXRyaWMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3BlY2lmaWVkIG1ldHJpYyBtdXN0IGJlIGEgTWV0cmljIGluc3RhbmNlLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGFjY291bnQsIHBlcmlvZCwgc3RhdGlzdGljIH0gPSBtZXRyaWM7XG5cbiAgICBpZiAoYWNjb3VudCAmJiBhY2NvdW50ICE9PSBTdGFjay5vZihhbGFybVNjb3BlKS5hY2NvdW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDcm9zcy1hY2NvdW50IG1ldHJpY3MgYXJlIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgIH1cblxuICAgIC8vIFJvdXRlNTMgaGVhbHRoIGNoZWNrcyBkbyBub3Qgc3VwcG9ydCBoaWdoLXJlc29sdXRpb24gbWV0cmljc1xuICAgIGlmIChwZXJpb2QgJiYgcGVyaW9kLnRvU2Vjb25kcygpIDwgNjApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhpZ2ggcmVzb2x1dGlvbiBtZXRyaWNzIGFyZSBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG5cbiAgICAvLyBSb3V0ZTUzIGhlYWx0aCBjaGVja3Mgb25seSBzdXBwb3J0IGEgc3Vic2V0IG9mIHN0YXRpc3RpY3NcbiAgICBpZiAoIVNVUFBPUlRFRF9TVEFUUy5oYXMoc3RhdGlzdGljKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTWV0cmljcyB3aXRoIHN0YXRpc3RpYyAnJHtzdGF0aXN0aWN9JyBhcmUgbm90IHN1cHBvcnRlZC5gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIENhbid0IHVzZSBgbWV0cmljLndpdGgoKWAgdG8gcmVtb3ZlIHRoZSBsYWJlbCwgb25seSBjaGFuZ2UgaXRcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hd3MvYXdzLWNkay9ibG9iL3YyLjY1LjAvcGFja2FnZXMvJTQwYXdzLWNkay9hd3MtY2xvdWR3YXRjaC9saWIvbWV0cmljLnRzI0wzMTQtTDM0MlxuICAgIHJldHVybiBuZXcgTWV0cmljKHtcbiAgICAgIC4uLm1ldHJpYyxcbiAgICAgIC8vIGFsbCBmaWVsZHMgZXhjZXB0IGRpbWVuc2lvbnMgaGF2ZSB0aGUgc2FtZSBuYW1lc1xuICAgICAgZGltZW5zaW9uc01hcDogbWV0cmljLmRpbWVuc2lvbnMsXG4gICAgICAvKlxuICAgICAgICogYEFXUzo6Q2xvdWRXYXRjaDo6QWxhcm1gIENGTiByZXNvdXJjZSB0eXBlcyBoYXZlIHR3byB2YXJpYW50czpcbiAgICAgICAqIC0gQmFzZWQgb24gYSBzaW5nbGUgbWV0cmljOiBVc2VzIGBNZXRyaWNOYW1lYCBwcm9wZXJ0eS5cbiAgICAgICAqIC0gQmFzZWQgb24gbWV0cmljIG1hdGg6IFVzZXMgYE1ldHJpY3NgIHByb3BlcnR5LlxuICAgICAgICpcbiAgICAgICAqIElmIHRoZSBgbGFiZWxgIG9mIGEgYE1ldHJpY2AgaW5zdGFuY2UgaXMgZGVmaW5lZCwgd2hlbiBhblxuICAgICAgICogYWxhcm0gaXMgY3JlYXRlZCBmcm9tIGl0LCBldmVuIGlmIGl0IGRvZXNuJ3QgdXNlIG1ldHJpYyBtYXRoLFxuICAgICAgICogaXQgd2lsbCB1c2UgdGhlIGBNZXRyaWNzYCBwcm9wZXJ0eS4gU2luY2UgUm91dGU1MyBkb2VzIG5vdFxuICAgICAgICogc3VwcG9ydCBtZXRyaWMgbWF0aCBpdCBhc3N1bWVzIGFueSBhbGFybSBjcmVhdGVkIHVzaW5nIHRoZVxuICAgICAgICogYE1ldHJpY3NgIHByb3BlcnR5IG11c3QgdXNlIG1ldHJpYyBtYXRoLCB0aHVzIGl0IG11c3QgYmUgcmVtb3ZlZC5cbiAgICAgICAqXG4gICAgICAgKiBTZWU6IGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BV1NDbG91ZEZvcm1hdGlvbi9sYXRlc3QvVXNlckd1aWRlL2F3cy1yZXNvdXJjZS1jbG91ZHdhdGNoLWFsYXJtLmh0bWxcbiAgICAgICAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2F3cy9hd3MtY2RrL2Jsb2IvdjIuNjUuMC9wYWNrYWdlcy9AYXdzLWNkay9hd3MtY2xvdWR3YXRjaC9saWIvYWxhcm0udHMjTDI2Mi1MMjk4XG4gICAgICAgKi9cbiAgICAgIGxhYmVsOiB1bmRlZmluZWQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==