"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMonitoring = exports.AxisPosition = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
var AxisPosition;
(function (AxisPosition) {
    AxisPosition["LEFT"] = "left";
    AxisPosition["RIGHT"] = "right";
})(AxisPosition = exports.AxisPosition || (exports.AxisPosition = {}));
/**
 * Custom monitoring is a construct allowing you to monitor your own custom metrics.
 * The entire construct consists of metric groups.
 * Each metric group represents a single graph widget with multiple metrics.
 * Each metric inside the metric group represents a single metric inside a graph.
 * The widgets will be sized automatically to waste as little space as possible.
 */
class CustomMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({ ...props });
        this.title = namingStrategy.resolveHumanReadableName();
        this.description = props.description;
        this.descriptionWidgetHeight = props.descriptionWidgetHeight;
        this.height = props.height;
        this.addToSummaryDashboard = props.addToSummaryDashboard ?? false;
        const alarmFactory = this.createAlarmFactory(namingStrategy.resolveAlarmFriendlyName());
        this.customAlarmFactory = new common_1.CustomAlarmFactory(alarmFactory);
        this.anomalyDetectingAlarmFactory = new common_1.AnomalyDetectingAlarmFactory(alarmFactory);
        this.metricGroups = props.metricGroups.map((metricGroup) => {
            const metricGroupWithAnnotation = {
                metricGroup,
                annotations: [],
                rightAnnotations: [],
                titleAddons: [],
            };
            if (metricGroup.horizontalAnnotations) {
                metricGroupWithAnnotation.annotations.push(...metricGroup.horizontalAnnotations);
            }
            if (metricGroup.horizontalRightAnnotations) {
                metricGroupWithAnnotation.rightAnnotations.push(...metricGroup.horizontalRightAnnotations);
            }
            metricGroup.metrics.forEach((metric) => {
                if (this.hasAlarm(metric) && this.hasAnomalyDetection(metric)) {
                    throw new Error("Adding both a regular alarm and an anomaly detection alarm at the same time is not supported");
                }
                if (this.hasAlarm(metric)) {
                    this.setupAlarm(metricGroupWithAnnotation, metric);
                }
                else if (this.hasAnomalyDetection(metric)) {
                    this.setupAnomalyDetectionAlarm(metricGroupWithAnnotation, metric);
                }
            });
            return metricGroupWithAnnotation;
        });
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        return this.getAllWidgets(true);
    }
    widgets() {
        return this.getAllWidgets(false);
    }
    getAllWidgets(summary) {
        const filteredMetricGroups = summary
            ? this.metricGroups.filter((group) => group.metricGroup.addToSummaryDashboard ??
                group.metricGroup.important ??
                this.addToSummaryDashboard)
            : this.metricGroups;
        if (filteredMetricGroups.length < 1) {
            // short-circuit if there are no metrics specified
            return [];
        }
        const rows = [];
        // header and description
        rows.push(new aws_cloudwatch_1.Row(new dashboard_1.MonitoringHeaderWidget({ title: this.title })));
        if (this.description && !summary) {
            rows.push(new aws_cloudwatch_1.Row(this.createDescriptionWidget(this.description, this.descriptionWidgetHeight)));
        }
        // graphs
        rows.push(new aws_cloudwatch_1.Row(...this.createCustomMetricGroupWidgets(filteredMetricGroups, summary)));
        return rows;
    }
    createDescriptionWidget(markdown, descriptionWidgetHeight) {
        return new aws_cloudwatch_1.TextWidget({
            markdown,
            width: common_1.FullWidth,
            height: descriptionWidgetHeight ?? 1,
        });
    }
    createCustomMetricGroupWidgets(annotatedGroups, summary) {
        const widgets = [];
        const metricGroupWidgetWidth = common_1.recommendedWidgetWidth(annotatedGroups.length);
        const metricGroupWidgetHeightDefault = summary
            ? common_1.DefaultSummaryWidgetHeight
            : common_1.DefaultGraphWidgetHeight;
        const metricGroupWidgetHeight = this.height ?? metricGroupWidgetHeightDefault;
        annotatedGroups.forEach((annotatedGroup) => {
            const metrics = annotatedGroup.metricGroup.metrics;
            const left = this.toMetrics(metrics.filter((metric) => (metric.position ?? AxisPosition.LEFT) == AxisPosition.LEFT));
            const right = this.toMetrics(metrics.filter((metric) => (metric.position ?? AxisPosition.LEFT) ==
                AxisPosition.RIGHT));
            const hasOneMetricOnly = metrics.length === 1;
            const hasAnomalyDetection = metrics.filter((metric) => this.hasAnomalyDetection(metric)).length > 0;
            const useAnomalyDetectionWidget = hasOneMetricOnly && hasAnomalyDetection;
            let title = annotatedGroup.metricGroup.title;
            if (annotatedGroup.titleAddons.length > 0) {
                title = `${title} (${annotatedGroup.titleAddons.join(", ")})`;
            }
            const graphWidgetProps = {
                title,
                width: metricGroupWidgetWidth,
                height: metricGroupWidgetHeight,
                left,
                right,
                leftAnnotations: annotatedGroup.annotations,
                rightAnnotations: annotatedGroup.rightAnnotations,
                leftYAxis: annotatedGroup.metricGroup.graphWidgetAxis,
                rightYAxis: annotatedGroup.metricGroup.graphWidgetRightAxis,
                legendPosition: annotatedGroup.metricGroup.graphWidgetLegend,
                setPeriodToTimeRange: annotatedGroup.metricGroup.graphWidgetSetPeriodToTimeRange,
            };
            const widget = useAnomalyDetectionWidget
                ? new AnomalyDetectionGraphWidget(graphWidgetProps)
                : common_1.createGraphWidget(annotatedGroup.metricGroup.graphWidgetType ?? common_1.GraphWidgetType.LINE, graphWidgetProps);
            widgets.push(widget);
        });
        return widgets;
    }
    toMetrics(metrics) {
        const metricFactory = this.createMetricFactory();
        return metrics.map((metric) => {
            if (this.hasAlarm(metric)) {
                // metric with alarm
                return metricFactory.adaptMetricPreservingPeriod(metric.metric);
            }
            else if (this.hasAnomalyDetection(metric)) {
                // metric with anomaly detection
                return metricFactory.createMetricAnomalyDetection(metric.metric, metric.anomalyDetectionStandardDeviationToRender, `Expected (stdev = ${metric.anomalyDetectionStandardDeviationToRender})`, undefined, 
                // needs to be unique in the whole widget and start with lowercase
                AnomalyDetectionMetricIdPrefix +
                    common_1.getHashForMetricExpressionId(metric.alarmFriendlyName), 
                // preserve the most specific metric period
                metric.period ?? metric.metric.period);
            }
            else if (this.isSearch(metric)) {
                // metric search
                return metricFactory.createMetricSearch(metric.searchQuery, metric.dimensionsMap, metric.statistic, metric.namespace, metric.label, metric.period);
            }
            else {
                // general metric
                return metricFactory.adaptMetricPreservingPeriod(metric);
            }
        });
    }
    hasAlarm(metric) {
        // type guard
        return metric.addAlarm !== undefined;
    }
    hasAnomalyDetection(metric) {
        // type guard
        return (metric
            .anomalyDetectionStandardDeviationToRender !== undefined);
    }
    isSearch(metric) {
        // type guard
        return metric.searchQuery !== undefined;
    }
    setupAlarm(metricGroup, metric) {
        if (this.isSearch(metric)) {
            throw new Error("Alarming on search queries is not supported by CloudWatch");
        }
        for (const disambiguator in metric.addAlarm) {
            const alarmProps = metric.addAlarm[disambiguator];
            const createdAlarm = this.customAlarmFactory.addCustomAlarm(metric.metric, metric.alarmFriendlyName, disambiguator, alarmProps);
            const targetAnnotations = (metric.position ?? AxisPosition.LEFT) == AxisPosition.LEFT
                ? metricGroup.annotations
                : metricGroup.rightAnnotations;
            targetAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
    }
    setupAnomalyDetectionAlarm(metricGroup, metric) {
        if (this.isSearch(metric)) {
            throw new Error("Alarming on search queries is not supported by CloudWatch");
        }
        const alarmStDevs = new Set();
        const metricFactory = this.createMetricFactory();
        for (const disambiguator in metric.addAlarmOnAnomaly) {
            const alarmProps = metric.addAlarmOnAnomaly[disambiguator];
            if (alarmProps.alarmWhenAboveTheBand ||
                alarmProps.alarmWhenBelowTheBand) {
                const anomalyMetric = metricFactory.createMetricAnomalyDetection(
                // Because the metric was provided to us, we use metricFactory.overrideNamespace() to
                // confirm it aligns with any namespace overrides requested for this MonitoringFacade
                metricFactory.adaptMetricPreservingPeriod(metric.metric), alarmProps.standardDeviationForAlarm, `Band (stdev ${alarmProps.standardDeviationForAlarm})`, undefined, 
                // expression ID needs to be unique across the whole widget; needs to start with a lowercase letter
                AnomalyDetectionAlarmIdPrefix +
                    common_1.getHashForMetricExpressionId(metric.alarmFriendlyName + "_" + disambiguator), 
                // preserve the most-specific metric period
                metric.period ?? metric.metric.period);
                const createdAlarm = this.anomalyDetectingAlarmFactory.addAlarmWhenOutOfBand(anomalyMetric, metric.alarmFriendlyName, disambiguator, alarmProps);
                // no need to add annotation since the bands are rendered automatically
                this.addAlarm(createdAlarm);
                alarmStDevs.add(alarmProps.standardDeviationForAlarm);
            }
        }
        if (alarmStDevs.size > 0) {
            const alarmStDevsString = Array.from(alarmStDevs).sort().join(", ");
            metricGroup.titleAddons.push(`alarms with stdev ${alarmStDevsString}`);
        }
    }
}
exports.CustomMonitoring = CustomMonitoring;
_a = JSII_RTTI_SYMBOL_1;
CustomMonitoring[_a] = { fqn: "cdk-monitoring-constructs.CustomMonitoring", version: "0.0.0" };
const AnomalyDetectionAlarmIdPrefix = "alarm_";
const AnomalyDetectionMetricIdPrefix = "anomaly_";
const AnomalyBandMetricIdSuffix = "_band";
/**
 * INTERNAL - PLEASE DO NOT USE
 * This is a hacky solution to make band visible in GraphWidget (default widget only renders lines, not the band).
 * The class makes assumptions about the internal JSON structure but found no other way :(.
 * Ideally, we want to remove this hack once the anomaly detection rendering in CDK gets improved
 */
class AnomalyDetectionGraphWidget extends aws_cloudwatch_1.GraphWidget {
    constructor(props) {
        super(props);
    }
    toJson() {
        const json = super.toJson();
        if (json.length !== 1 || !json?.[0]?.properties?.metrics) {
            throw new Error("The JSON is expected to have exactly one element with properties.metrics property.");
        }
        const metrics = json[0].properties.metrics;
        if (metrics.length < 2) {
            throw new Error("The number of metrics must be at least two (metric + anomaly detection math).");
        }
        const anomalyDetectionMetricPart = metrics[0]?.value;
        if (!anomalyDetectionMetricPart ||
            anomalyDetectionMetricPart.length !== 1) {
            throw new Error("First metric must be a math expression.");
        }
        const evaluatedMetricPart = metrics[1]?.value;
        if (!evaluatedMetricPart ||
            evaluatedMetricPart.length < 1 ||
            !evaluatedMetricPart[evaluatedMetricPart.length - 1].id) {
            throw new Error("Second metric must have an ID.");
        }
        // band rendering requires ID to be set
        anomalyDetectionMetricPart[0].id =
            evaluatedMetricPart[evaluatedMetricPart.length - 1].id +
                AnomalyBandMetricIdSuffix;
        // band rendering requires the evaluated metric to be visible
        evaluatedMetricPart[evaluatedMetricPart.length - 1].visible = true;
        return json;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tTW9uaXRvcmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkN1c3RvbU1vbml0b3JpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSwrREFXb0M7QUFFcEMseUNBaUJzQjtBQUN0QiwrQ0FHeUI7QUFFekIsSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3RCLDZCQUFhLENBQUE7SUFDYiwrQkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUd2QjtBQStMRDs7Ozs7O0dBTUc7QUFDSCxNQUFhLGdCQUFpQixTQUFRLG1CQUFVO0lBVTlDLFlBQVksS0FBc0IsRUFBRSxLQUE0QjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBCLE1BQU0sY0FBYyxHQUFHLElBQUksb0NBQXdCLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUV2RCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztRQUM3RCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxLQUFLLENBQUM7UUFFbEUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUMxQyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsQ0FDMUMsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLDJCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLHFDQUE0QixDQUNsRSxZQUFZLENBQ2Is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QUFNLE9BQU8sR0FBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUNsRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQ2IsK0VBQStFLENBQ2hGLENBQUM7U0FDSDtRQUNELE1BQU0sMEJBQTBCLEdBQVUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQztRQUM1RCxJQUNFLENBQUMsMEJBQTBCO1lBQzNCLDBCQUEwQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQ3ZDO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsTUFBTSxtQkFBbUIsR0FBVSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQ3JELElBQ0UsQ0FBQyxtQkFBbUI7WUFDcEIsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDOUIsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUN2RDtZQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztTQUNuRDtRQUNELHVDQUF1QztRQUN2QywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzlCLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0RCx5QkFBeUIsQ0FBQztRQUM1Qiw2REFBNkQ7UUFDN0QsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEdXJhdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHtcbiAgRGltZW5zaW9uc01hcCxcbiAgR3JhcGhXaWRnZXQsXG4gIEdyYXBoV2lkZ2V0UHJvcHMsXG4gIEhvcml6b250YWxBbm5vdGF0aW9uLFxuICBJTWV0cmljLFxuICBJV2lkZ2V0LFxuICBMZWdlbmRQb3NpdGlvbixcbiAgUm93LFxuICBUZXh0V2lkZ2V0LFxuICBZQXhpc1Byb3BzLFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHtcbiAgQW5vbWFseURldGVjdGluZ0FsYXJtRmFjdG9yeSxcbiAgQW5vbWFseURldGVjdGlvblRocmVzaG9sZCxcbiAgQmFzZU1vbml0b3JpbmdQcm9wcyxcbiAgY3JlYXRlR3JhcGhXaWRnZXQsXG4gIEN1c3RvbUFsYXJtRmFjdG9yeSxcbiAgQ3VzdG9tVGhyZXNob2xkLFxuICBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gIERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICBGdWxsV2lkdGgsXG4gIGdldEhhc2hGb3JNZXRyaWNFeHByZXNzaW9uSWQsXG4gIEdyYXBoV2lkZ2V0VHlwZSxcbiAgTWV0cmljU3RhdGlzdGljLFxuICBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICBNb25pdG9yaW5nLFxuICBNb25pdG9yaW5nU2NvcGUsXG4gIHJlY29tbWVuZGVkV2lkZ2V0V2lkdGgsXG59IGZyb20gXCIuLi8uLi9jb21tb25cIjtcbmltcG9ydCB7XG4gIE1vbml0b3JpbmdIZWFkZXJXaWRnZXQsXG4gIE1vbml0b3JpbmdOYW1pbmdTdHJhdGVneSxcbn0gZnJvbSBcIi4uLy4uL2Rhc2hib2FyZFwiO1xuXG5leHBvcnQgZW51bSBBeGlzUG9zaXRpb24ge1xuICBMRUZUID0gXCJsZWZ0XCIsXG4gIFJJR0hUID0gXCJyaWdodFwiLFxufVxuXG4vKipcbiAqIEN1c3RvbSBtZXRyaWMgd2l0aCBhbiBhbGFybSBkZWZpbmVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbU1ldHJpY1dpdGhBbGFybSB7XG4gIC8qKlxuICAgKiBtZXRyaWMgdG8gYWxhcm0gb25cbiAgICovXG4gIHJlYWRvbmx5IG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgLyoqXG4gICAqIGFsYXJtIGZyaWVuZGx5IG5hbWVcbiAgICovXG4gIHJlYWRvbmx5IGFsYXJtRnJpZW5kbHlOYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBhbGFybSBkZWZpbml0aW9uc1xuICAgKi9cbiAgcmVhZG9ubHkgYWRkQWxhcm06IFJlY29yZDxzdHJpbmcsIEN1c3RvbVRocmVzaG9sZD47XG4gIC8qKlxuICAgKiBheGlzIChyaWdodCBvciBsZWZ0KSBvbiB3aGljaCB0byBncmFwaCBtZXRyaWNcbiAgICogZGVmYXVsdDogQXhpc1Bvc2l0aW9uLkxFRlRcbiAgICovXG4gIHJlYWRvbmx5IHBvc2l0aW9uPzogQXhpc1Bvc2l0aW9uO1xufVxuXG4vKipcbiAqIEN1c3RvbSBtZXRyaWMgd2l0aCBhbm9tYWx5IGRldGVjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDdXN0b21NZXRyaWNXaXRoQW5vbWFseURldGVjdGlvbiB7XG4gIC8qKlxuICAgKiBtZXRyaWMgdG8gYWxhcm0gb25cbiAgICovXG4gIHJlYWRvbmx5IG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgLyoqXG4gICAqIGFub21hbHkgZGV0ZWN0aW9uIHBlcmlvZFxuICAgKiBAZGVmYXVsdCAtIG1ldHJpYyBwZXJpb2QgKGlmIGRlZmluZWQpIG9yIGdsb2JhbCBkZWZhdWx0XG4gICAqL1xuICByZWFkb25seSBwZXJpb2Q/OiBEdXJhdGlvbjtcbiAgLyoqXG4gICAqIGFsYXJtIGZyaWVuZGx5IG5hbWVcbiAgICovXG4gIHJlYWRvbmx5IGFsYXJtRnJpZW5kbHlOYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBzdGFuZGFyZCBkZXZpYXRpb24gZm9yIHRoZSBhbm9tYWx5IGRldGVjdGlvbiB0byBiZSByZW5kZXJlZCBvbiB0aGUgZ3JhcGggd2lkZ2V0XG4gICAqL1xuICByZWFkb25seSBhbm9tYWx5RGV0ZWN0aW9uU3RhbmRhcmREZXZpYXRpb25Ub1JlbmRlcjogbnVtYmVyO1xuICAvKipcbiAgICogYWRkcyBhbGFybSBvbiBhIGRldGVjdGVkIGFub21hbHlcbiAgICovXG4gIHJlYWRvbmx5IGFkZEFsYXJtT25Bbm9tYWx5PzogUmVjb3JkPHN0cmluZywgQW5vbWFseURldGVjdGlvblRocmVzaG9sZD47XG59XG5cbi8qKlxuICogQ3VzdG9tIG1ldHJpYyBzZWFyY2guXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tTWV0cmljU2VhcmNoIHtcbiAgLyoqXG4gICAqIG1ldHJpYyBuYW1lc3BhY2VcbiAgICogQGRlZmF1bHQgLSBub25lXG4gICAqL1xuICByZWFkb25seSBuYW1lc3BhY2U/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBzZWFyY2ggcXVlcnkgKGNhbiBiZSBlbXB0eSlcbiAgICovXG4gIHJlYWRvbmx5IHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjdXN0b20gbGFiZWwgZm9yIHRoZSBtZXRyaWNzXG4gICAqIEBkZWZhdWx0IC0gXCIgXCJcbiAgICovXG4gIHJlYWRvbmx5IGxhYmVsPzogc3RyaW5nO1xuICAvKipcbiAgICogc2VhcmNoIGRpbWVuc2lvbnMgKGNhbiBiZSBlbXB0eSlcbiAgICovXG4gIHJlYWRvbmx5IGRpbWVuc2lvbnNNYXA6IERpbWVuc2lvbnNNYXA7XG4gIC8qKlxuICAgKiBtZXRyaWMgc3RhdGlzdGljXG4gICAqL1xuICByZWFkb25seSBzdGF0aXN0aWM6IE1ldHJpY1N0YXRpc3RpYztcbiAgLyoqXG4gICAqIG1ldHJpYyBwZXJpb2RcbiAgICogQGRlZmF1bHQgLSBnbG9iYWwgZGVmYXVsdFxuICAgKi9cbiAgcmVhZG9ubHkgcGVyaW9kPzogRHVyYXRpb247XG4gIC8qKlxuICAgKiBheGlzIChyaWdodCBvciBsZWZ0KSBvbiB3aGljaCB0byBncmFwaCBtZXRyaWNcbiAgICogZGVmYXVsdDogQXhpc1Bvc2l0aW9uLkxFRlRcbiAgICovXG4gIHJlYWRvbmx5IHBvc2l0aW9uPzogQXhpc1Bvc2l0aW9uO1xufVxuXG4vKipcbiAqIEVhY2ggY3VzdG9tIG1ldHJpYyBjYW4gYmUgb2YgZm91ciB0eXBlczpcbiAqIEBzZWUgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCBmb3IgYSBzdGFuZGFyZCBtZXRyaWNcbiAqIEBzZWUgQ3VzdG9tTWV0cmljU2VhcmNoIGZvciBhIHNlYXJjaFxuICogQHNlZSBDdXN0b21NZXRyaWNXaXRoQWxhcm0gZm9yIGEgbWV0cmljIHdpdGggYW4gYWxhcm1cbiAqIEBzZWUgQ3VzdG9tTWV0cmljV2l0aEFub21hbHlEZXRlY3Rpb24gZm9yIGEgbWV0cmljIHdpdGggYW4gYW5vbWFseSBkZXRlY3RpbmcgYWxhcm1cbiAqL1xuZXhwb3J0IHR5cGUgQ3VzdG9tTWV0cmljID1cbiAgfCBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0XG4gIHwgQ3VzdG9tTWV0cmljU2VhcmNoXG4gIHwgQ3VzdG9tTWV0cmljV2l0aEFsYXJtXG4gIHwgQ3VzdG9tTWV0cmljV2l0aEFub21hbHlEZXRlY3Rpb247XG5cbi8qKlxuICogQ3VzdG9tIG1ldHJpYyBncm91cCByZXByZXNlbnRzIGEgc2luZ2xlIHdpZGdldC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDdXN0b21NZXRyaWNHcm91cCB7XG4gIC8qKlxuICAgKiB0aXRsZSBvZiB0aGUgd2hvbGUgZ3JvdXBcbiAgICovXG4gIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiB0eXBlIG9mIHRoZSB3aWRnZXRcbiAgICogQGRlZmF1bHQgbGluZVxuICAgKi9cbiAgcmVhZG9ubHkgZ3JhcGhXaWRnZXRUeXBlPzogR3JhcGhXaWRnZXRUeXBlO1xuICAvKipcbiAgICogb3B0aW9uYWwgYXhpc1xuICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICovXG4gIHJlYWRvbmx5IGdyYXBoV2lkZ2V0QXhpcz86IFlBeGlzUHJvcHM7XG4gIC8qKlxuICAgKiBvcHRpb25hbCByaWdodCBheGlzXG4gICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgKi9cbiAgcmVhZG9ubHkgZ3JhcGhXaWRnZXRSaWdodEF4aXM/OiBZQXhpc1Byb3BzO1xuICAvKipcbiAgICogZ3JhcGggd2lkZ2V0IGxlZ2VuZFxuICAgKiBAZGVmYXVsdCBCT1RUT01cbiAgICovXG4gIHJlYWRvbmx5IGdyYXBoV2lkZ2V0TGVnZW5kPzogTGVnZW5kUG9zaXRpb247XG4gIC8qKlxuICAgKiBAc2VlIHtHcmFwaFdpZGdldFByb3BzLnNldFBlcmlvZFRvVGltZVJhbmdlfVxuICAgKi9cbiAgcmVhZG9ubHkgZ3JhcGhXaWRnZXRTZXRQZXJpb2RUb1RpbWVSYW5nZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgYWRkVG9TdW1tYXJ5RGFzaGJvYXJkLiBhZGRUb1N1bW1hcnlEYXNoYm9hcmQgd2lsbCB0YWtlIHByZWNlZGVuY2Ugb3ZlciBpbXBvcnRhbnQuXG4gICAqIEBzZWUgYWRkVG9TdW1tYXJ5RGFzaGJvYXJkXG4gICAqL1xuICByZWFkb25seSBpbXBvcnRhbnQ/OiBib29sZWFuO1xuICAvKipcbiAgICogRmxhZyBpbmRpY2F0aW5nIHRoaXMgbWV0cmljIGdyb3VwIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgc3VtbWFyeSBhcyB3ZWxsLlxuICAgKiBAZGVmYXVsdCAtIGFkZFRvU3VtbWFyeURhc2hib2FyZCBmcm9tIEN1c3RvbU1vbml0b3JpbmdQcm9wcywgZGVmYXVsdGluZyB0byBmYWxzZVxuICAgKi9cbiAgcmVhZG9ubHkgYWRkVG9TdW1tYXJ5RGFzaGJvYXJkPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGxpc3Qgb2YgbWV0cmljcyBpbiB0aGUgZ3JvdXAgKGNhbiBiZSBkZWZpbmVkIGluIGRpZmZlcmVudCB3YXlzLCBzZWUgdGhlIHR5cGUgZG9jdW1lbnRhdGlvbilcbiAgICovXG4gIHJlYWRvbmx5IG1ldHJpY3M6IEN1c3RvbU1ldHJpY1tdO1xuICAvKipcbiAgICogb3B0aW9uYWwgY3VzdG9tIGhvcml6b250YWwgYW5ub3RhdGlvbnMgd2hpY2ggd2lsbCBiZSBkaXNwbGF5ZWQgb3ZlciB0aGUgbWV0cmljcyBvbiB0aGUgbGVmdCBheGlzXG4gICAqIChpZiB0aGVyZSBhcmUgYW55IGFsYXJtcywgYW55IGV4aXN0aW5nIGFubm90YXRpb25zIHdpbGwgYmUgbWVyZ2VkIHRvZ2V0aGVyKVxuICAgKi9cbiAgcmVhZG9ubHkgaG9yaXpvbnRhbEFubm90YXRpb25zPzogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgLyoqXG4gICAqIG9wdGlvbmFsIGN1c3RvbSBob3Jpem9udGFsIGFubm90YXRpb25zIHdoaWNoIHdpbGwgYmUgZGlzcGxheWVkIG92ZXIgdGhlIG1ldHJpY3Mgb24gdGhlIHJpZ2h0IGF4aXNcbiAgICogKGlmIHRoZXJlIGFyZSBhbnkgYWxhcm1zLCBhbnkgZXhpc3RpbmcgYW5ub3RhdGlvbnMgd2lsbCBiZSBtZXJnZWQgdG9nZXRoZXIpXG4gICAqL1xuICByZWFkb25seSBob3Jpem9udGFsUmlnaHRBbm5vdGF0aW9ucz86IEhvcml6b250YWxBbm5vdGF0aW9uW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tTW9uaXRvcmluZ1Byb3BzIGV4dGVuZHMgQmFzZU1vbml0b3JpbmdQcm9wcyB7XG4gIC8qKlxuICAgKiBvcHRpb25hbCBkZXNjcmlwdGlvbiBvZiB0aGUgd2hvbGUgc2VjdGlvbiwgaW4gbWFya2Rvd25cbiAgICogQGRlZmF1bHQgbm8gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlYWRvbmx5IGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAvKipcbiAgICogb3B0aW9uYWwgaGVpZ2h0IG9mIHRoZSBkZXNjcmlwdGlvbiB3aWRnZXQsIHNvIHRoZSBjb250ZW50IGZpdHNcbiAgICogQGRlZmF1bHQgbWluaW11bSBoZWlnaHQgKHNob3VsZCBmaXQgb25lIG9yIHR3byBsaW5lcyBvZiB0ZXh0KVxuICAgKi9cbiAgcmVhZG9ubHkgZGVzY3JpcHRpb25XaWRnZXRIZWlnaHQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBoZWlnaHQgb3ZlcnJpZGVcbiAgICogQGRlZmF1bHQgZGVmYXVsdCBoZWlnaHRcbiAgICovXG4gIHJlYWRvbmx5IGhlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIGRlZmluZSBtZXRyaWMgZ3JvdXBzIGFuZCBtZXRyaWNzIGluc2lkZSB0aGVtIChlYWNoIG1ldHJpYyBncm91cCByZXByZXNlbnRzIGEgd2lkZ2V0KVxuICAgKi9cbiAgcmVhZG9ubHkgbWV0cmljR3JvdXBzOiBDdXN0b21NZXRyaWNHcm91cFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbU1ldHJpY0dyb3VwV2l0aEFubm90YXRpb25zIHtcbiAgcmVhZG9ubHkgbWV0cmljR3JvdXA6IEN1c3RvbU1ldHJpY0dyb3VwO1xuICByZWFkb25seSBhbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgcmlnaHRBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgdGl0bGVBZGRvbnM6IHN0cmluZ1tdO1xuICByZWFkb25seSBoZWlnaHQ/OiBudW1iZXI7XG59XG5cbi8qKlxuICogQ3VzdG9tIG1vbml0b3JpbmcgaXMgYSBjb25zdHJ1Y3QgYWxsb3dpbmcgeW91IHRvIG1vbml0b3IgeW91ciBvd24gY3VzdG9tIG1ldHJpY3MuXG4gKiBUaGUgZW50aXJlIGNvbnN0cnVjdCBjb25zaXN0cyBvZiBtZXRyaWMgZ3JvdXBzLlxuICogRWFjaCBtZXRyaWMgZ3JvdXAgcmVwcmVzZW50cyBhIHNpbmdsZSBncmFwaCB3aWRnZXQgd2l0aCBtdWx0aXBsZSBtZXRyaWNzLlxuICogRWFjaCBtZXRyaWMgaW5zaWRlIHRoZSBtZXRyaWMgZ3JvdXAgcmVwcmVzZW50cyBhIHNpbmdsZSBtZXRyaWMgaW5zaWRlIGEgZ3JhcGguXG4gKiBUaGUgd2lkZ2V0cyB3aWxsIGJlIHNpemVkIGF1dG9tYXRpY2FsbHkgdG8gd2FzdGUgYXMgbGl0dGxlIHNwYWNlIGFzIHBvc3NpYmxlLlxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tTW9uaXRvcmluZyBleHRlbmRzIE1vbml0b3Jpbmcge1xuICByZWFkb25seSB0aXRsZTogc3RyaW5nO1xuICByZWFkb25seSBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgcmVhZG9ubHkgZGVzY3JpcHRpb25XaWRnZXRIZWlnaHQ/OiBudW1iZXI7XG4gIHJlYWRvbmx5IGhlaWdodD86IG51bWJlcjtcbiAgcmVhZG9ubHkgYWRkVG9TdW1tYXJ5RGFzaGJvYXJkOiBib29sZWFuO1xuICByZWFkb25seSBjdXN0b21BbGFybUZhY3Rvcnk6IEN1c3RvbUFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgYW5vbWFseURldGVjdGluZ0FsYXJtRmFjdG9yeTogQW5vbWFseURldGVjdGluZ0FsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgbWV0cmljR3JvdXBzOiBDdXN0b21NZXRyaWNHcm91cFdpdGhBbm5vdGF0aW9uc1tdO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBNb25pdG9yaW5nU2NvcGUsIHByb3BzOiBDdXN0b21Nb25pdG9yaW5nUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgcHJvcHMpO1xuXG4gICAgY29uc3QgbmFtaW5nU3RyYXRlZ3kgPSBuZXcgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5KHsgLi4ucHJvcHMgfSk7XG4gICAgdGhpcy50aXRsZSA9IG5hbWluZ1N0cmF0ZWd5LnJlc29sdmVIdW1hblJlYWRhYmxlTmFtZSgpO1xuXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHByb3BzLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGVzY3JpcHRpb25XaWRnZXRIZWlnaHQgPSBwcm9wcy5kZXNjcmlwdGlvbldpZGdldEhlaWdodDtcbiAgICB0aGlzLmhlaWdodCA9IHByb3BzLmhlaWdodDtcbiAgICB0aGlzLmFkZFRvU3VtbWFyeURhc2hib2FyZCA9IHByb3BzLmFkZFRvU3VtbWFyeURhc2hib2FyZCA/PyBmYWxzZTtcblxuICAgIGNvbnN0IGFsYXJtRmFjdG9yeSA9IHRoaXMuY3JlYXRlQWxhcm1GYWN0b3J5KFxuICAgICAgbmFtaW5nU3RyYXRlZ3kucmVzb2x2ZUFsYXJtRnJpZW5kbHlOYW1lKClcbiAgICApO1xuICAgIHRoaXMuY3VzdG9tQWxhcm1GYWN0b3J5ID0gbmV3IEN1c3RvbUFsYXJtRmFjdG9yeShhbGFybUZhY3RvcnkpO1xuICAgIHRoaXMuYW5vbWFseURldGVjdGluZ0FsYXJtRmFjdG9yeSA9IG5ldyBBbm9tYWx5RGV0ZWN0aW5nQWxhcm1GYWN0b3J5KFxuICAgICAgYWxhcm1GYWN0b3J5XG4gICAgKTtcblxuICAgIHRoaXMubWV0cmljR3JvdXBzID0gcHJvcHMubWV0cmljR3JvdXBzLm1hcCgobWV0cmljR3JvdXApID0+IHtcbiAgICAgIGNvbnN0IG1ldHJpY0dyb3VwV2l0aEFubm90YXRpb246IEN1c3RvbU1ldHJpY0dyb3VwV2l0aEFubm90YXRpb25zID0ge1xuICAgICAgICBtZXRyaWNHcm91cCxcbiAgICAgICAgYW5ub3RhdGlvbnM6IFtdLFxuICAgICAgICByaWdodEFubm90YXRpb25zOiBbXSxcbiAgICAgICAgdGl0bGVBZGRvbnM6IFtdLFxuICAgICAgfTtcblxuICAgICAgaWYgKG1ldHJpY0dyb3VwLmhvcml6b250YWxBbm5vdGF0aW9ucykge1xuICAgICAgICBtZXRyaWNHcm91cFdpdGhBbm5vdGF0aW9uLmFubm90YXRpb25zLnB1c2goXG4gICAgICAgICAgLi4ubWV0cmljR3JvdXAuaG9yaXpvbnRhbEFubm90YXRpb25zXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAobWV0cmljR3JvdXAuaG9yaXpvbnRhbFJpZ2h0QW5ub3RhdGlvbnMpIHtcbiAgICAgICAgbWV0cmljR3JvdXBXaXRoQW5ub3RhdGlvbi5yaWdodEFubm90YXRpb25zLnB1c2goXG4gICAgICAgICAgLi4ubWV0cmljR3JvdXAuaG9yaXpvbnRhbFJpZ2h0QW5ub3RhdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgbWV0cmljR3JvdXAubWV0cmljcy5mb3JFYWNoKChtZXRyaWMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQWxhcm0obWV0cmljKSAmJiB0aGlzLmhhc0Fub21hbHlEZXRlY3Rpb24obWV0cmljKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiQWRkaW5nIGJvdGggYSByZWd1bGFyIGFsYXJtIGFuZCBhbiBhbm9tYWx5IGRldGVjdGlvbiBhbGFybSBhdCB0aGUgc2FtZSB0aW1lIGlzIG5vdCBzdXBwb3J0ZWRcIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBbGFybShtZXRyaWMpKSB7XG4gICAgICAgICAgdGhpcy5zZXR1cEFsYXJtKG1ldHJpY0dyb3VwV2l0aEFubm90YXRpb24sIG1ldHJpYyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBbm9tYWx5RGV0ZWN0aW9uKG1ldHJpYykpIHtcbiAgICAgICAgICB0aGlzLnNldHVwQW5vbWFseURldGVjdGlvbkFsYXJtKG1ldHJpY0dyb3VwV2l0aEFubm90YXRpb24sIG1ldHJpYyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWV0cmljR3JvdXBXaXRoQW5ub3RhdGlvbjtcbiAgICB9KTtcblxuICAgIHByb3BzLnVzZUNyZWF0ZWRBbGFybXM/LmNvbnN1bWUodGhpcy5jcmVhdGVkQWxhcm1zKCkpO1xuICB9XG5cbiAgc3VtbWFyeVdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBbGxXaWRnZXRzKHRydWUpO1xuICB9XG5cbiAgd2lkZ2V0cygpOiBJV2lkZ2V0W10ge1xuICAgIHJldHVybiB0aGlzLmdldEFsbFdpZGdldHMoZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbGxXaWRnZXRzKHN1bW1hcnk6IGJvb2xlYW4pOiBJV2lkZ2V0W10ge1xuICAgIGNvbnN0IGZpbHRlcmVkTWV0cmljR3JvdXBzID0gc3VtbWFyeVxuICAgICAgPyB0aGlzLm1ldHJpY0dyb3Vwcy5maWx0ZXIoXG4gICAgICAgICAgKGdyb3VwKSA9PlxuICAgICAgICAgICAgZ3JvdXAubWV0cmljR3JvdXAuYWRkVG9TdW1tYXJ5RGFzaGJvYXJkID8/XG4gICAgICAgICAgICBncm91cC5tZXRyaWNHcm91cC5pbXBvcnRhbnQgPz9cbiAgICAgICAgICAgIHRoaXMuYWRkVG9TdW1tYXJ5RGFzaGJvYXJkXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5tZXRyaWNHcm91cHM7XG5cbiAgICBpZiAoZmlsdGVyZWRNZXRyaWNHcm91cHMubGVuZ3RoIDwgMSkge1xuICAgICAgLy8gc2hvcnQtY2lyY3VpdCBpZiB0aGVyZSBhcmUgbm8gbWV0cmljcyBzcGVjaWZpZWRcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByb3dzOiBSb3dbXSA9IFtdO1xuXG4gICAgLy8gaGVhZGVyIGFuZCBkZXNjcmlwdGlvblxuICAgIHJvd3MucHVzaChuZXcgUm93KG5ldyBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0KHsgdGl0bGU6IHRoaXMudGl0bGUgfSkpKTtcbiAgICBpZiAodGhpcy5kZXNjcmlwdGlvbiAmJiAhc3VtbWFyeSkge1xuICAgICAgcm93cy5wdXNoKFxuICAgICAgICBuZXcgUm93KFxuICAgICAgICAgIHRoaXMuY3JlYXRlRGVzY3JpcHRpb25XaWRnZXQoXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbldpZGdldEhlaWdodFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBncmFwaHNcbiAgICByb3dzLnB1c2goXG4gICAgICBuZXcgUm93KFxuICAgICAgICAuLi50aGlzLmNyZWF0ZUN1c3RvbU1ldHJpY0dyb3VwV2lkZ2V0cyhmaWx0ZXJlZE1ldHJpY0dyb3Vwcywgc3VtbWFyeSlcbiAgICAgIClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURlc2NyaXB0aW9uV2lkZ2V0KFxuICAgIG1hcmtkb3duOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRpb25XaWRnZXRIZWlnaHQ/OiBudW1iZXJcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0V2lkZ2V0KHtcbiAgICAgIG1hcmtkb3duLFxuICAgICAgd2lkdGg6IEZ1bGxXaWR0aCxcbiAgICAgIGhlaWdodDogZGVzY3JpcHRpb25XaWRnZXRIZWlnaHQgPz8gMSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ3VzdG9tTWV0cmljR3JvdXBXaWRnZXRzKFxuICAgIGFubm90YXRlZEdyb3VwczogQ3VzdG9tTWV0cmljR3JvdXBXaXRoQW5ub3RhdGlvbnNbXSxcbiAgICBzdW1tYXJ5OiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IHdpZGdldHM6IElXaWRnZXRbXSA9IFtdO1xuICAgIGNvbnN0IG1ldHJpY0dyb3VwV2lkZ2V0V2lkdGggPSByZWNvbW1lbmRlZFdpZGdldFdpZHRoKFxuICAgICAgYW5ub3RhdGVkR3JvdXBzLmxlbmd0aFxuICAgICk7XG4gICAgY29uc3QgbWV0cmljR3JvdXBXaWRnZXRIZWlnaHREZWZhdWx0ID0gc3VtbWFyeVxuICAgICAgPyBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodFxuICAgICAgOiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQ7XG4gICAgY29uc3QgbWV0cmljR3JvdXBXaWRnZXRIZWlnaHQgPVxuICAgICAgdGhpcy5oZWlnaHQgPz8gbWV0cmljR3JvdXBXaWRnZXRIZWlnaHREZWZhdWx0O1xuXG4gICAgYW5ub3RhdGVkR3JvdXBzLmZvckVhY2goKGFubm90YXRlZEdyb3VwKSA9PiB7XG4gICAgICBjb25zdCBtZXRyaWNzID0gYW5ub3RhdGVkR3JvdXAubWV0cmljR3JvdXAubWV0cmljcztcbiAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLnRvTWV0cmljcyhcbiAgICAgICAgbWV0cmljcy5maWx0ZXIoXG4gICAgICAgICAgKG1ldHJpYykgPT5cbiAgICAgICAgICAgICgobWV0cmljIGFzIGFueSkucG9zaXRpb24gPz8gQXhpc1Bvc2l0aW9uLkxFRlQpID09IEF4aXNQb3NpdGlvbi5MRUZUXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCByaWdodCA9IHRoaXMudG9NZXRyaWNzKFxuICAgICAgICBtZXRyaWNzLmZpbHRlcihcbiAgICAgICAgICAobWV0cmljKSA9PlxuICAgICAgICAgICAgKChtZXRyaWMgYXMgYW55KS5wb3NpdGlvbiA/PyBBeGlzUG9zaXRpb24uTEVGVCkgPT1cbiAgICAgICAgICAgIEF4aXNQb3NpdGlvbi5SSUdIVFxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29uc3QgaGFzT25lTWV0cmljT25seSA9IG1ldHJpY3MubGVuZ3RoID09PSAxO1xuICAgICAgY29uc3QgaGFzQW5vbWFseURldGVjdGlvbiA9XG4gICAgICAgIG1ldHJpY3MuZmlsdGVyKChtZXRyaWMpID0+IHRoaXMuaGFzQW5vbWFseURldGVjdGlvbihtZXRyaWMpKS5sZW5ndGggPiAwO1xuICAgICAgY29uc3QgdXNlQW5vbWFseURldGVjdGlvbldpZGdldCA9IGhhc09uZU1ldHJpY09ubHkgJiYgaGFzQW5vbWFseURldGVjdGlvbjtcbiAgICAgIGxldCB0aXRsZSA9IGFubm90YXRlZEdyb3VwLm1ldHJpY0dyb3VwLnRpdGxlO1xuXG4gICAgICBpZiAoYW5ub3RhdGVkR3JvdXAudGl0bGVBZGRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aXRsZSA9IGAke3RpdGxlfSAoJHthbm5vdGF0ZWRHcm91cC50aXRsZUFkZG9ucy5qb2luKFwiLCBcIil9KWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdyYXBoV2lkZ2V0UHJvcHM6IEdyYXBoV2lkZ2V0UHJvcHMgPSB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICB3aWR0aDogbWV0cmljR3JvdXBXaWRnZXRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBtZXRyaWNHcm91cFdpZGdldEhlaWdodCxcbiAgICAgICAgbGVmdCxcbiAgICAgICAgcmlnaHQsXG4gICAgICAgIGxlZnRBbm5vdGF0aW9uczogYW5ub3RhdGVkR3JvdXAuYW5ub3RhdGlvbnMsXG4gICAgICAgIHJpZ2h0QW5ub3RhdGlvbnM6IGFubm90YXRlZEdyb3VwLnJpZ2h0QW5ub3RhdGlvbnMsXG4gICAgICAgIGxlZnRZQXhpczogYW5ub3RhdGVkR3JvdXAubWV0cmljR3JvdXAuZ3JhcGhXaWRnZXRBeGlzLFxuICAgICAgICByaWdodFlBeGlzOiBhbm5vdGF0ZWRHcm91cC5tZXRyaWNHcm91cC5ncmFwaFdpZGdldFJpZ2h0QXhpcyxcbiAgICAgICAgbGVnZW5kUG9zaXRpb246IGFubm90YXRlZEdyb3VwLm1ldHJpY0dyb3VwLmdyYXBoV2lkZ2V0TGVnZW5kLFxuICAgICAgICBzZXRQZXJpb2RUb1RpbWVSYW5nZTpcbiAgICAgICAgICBhbm5vdGF0ZWRHcm91cC5tZXRyaWNHcm91cC5ncmFwaFdpZGdldFNldFBlcmlvZFRvVGltZVJhbmdlLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgd2lkZ2V0ID0gdXNlQW5vbWFseURldGVjdGlvbldpZGdldFxuICAgICAgICA/IG5ldyBBbm9tYWx5RGV0ZWN0aW9uR3JhcGhXaWRnZXQoZ3JhcGhXaWRnZXRQcm9wcylcbiAgICAgICAgOiBjcmVhdGVHcmFwaFdpZGdldChcbiAgICAgICAgICAgIGFubm90YXRlZEdyb3VwLm1ldHJpY0dyb3VwLmdyYXBoV2lkZ2V0VHlwZSA/PyBHcmFwaFdpZGdldFR5cGUuTElORSxcbiAgICAgICAgICAgIGdyYXBoV2lkZ2V0UHJvcHNcbiAgICAgICAgICApO1xuXG4gICAgICB3aWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB3aWRnZXRzO1xuICB9XG5cbiAgcHJpdmF0ZSB0b01ldHJpY3MobWV0cmljczogQ3VzdG9tTWV0cmljW10pOiBJTWV0cmljW10ge1xuICAgIGNvbnN0IG1ldHJpY0ZhY3RvcnkgPSB0aGlzLmNyZWF0ZU1ldHJpY0ZhY3RvcnkoKTtcblxuICAgIHJldHVybiBtZXRyaWNzLm1hcCgobWV0cmljKSA9PiB7XG4gICAgICBpZiAodGhpcy5oYXNBbGFybShtZXRyaWMpKSB7XG4gICAgICAgIC8vIG1ldHJpYyB3aXRoIGFsYXJtXG4gICAgICAgIHJldHVybiBtZXRyaWNGYWN0b3J5LmFkYXB0TWV0cmljUHJlc2VydmluZ1BlcmlvZChtZXRyaWMubWV0cmljKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBbm9tYWx5RGV0ZWN0aW9uKG1ldHJpYykpIHtcbiAgICAgICAgLy8gbWV0cmljIHdpdGggYW5vbWFseSBkZXRlY3Rpb25cbiAgICAgICAgcmV0dXJuIG1ldHJpY0ZhY3RvcnkuY3JlYXRlTWV0cmljQW5vbWFseURldGVjdGlvbihcbiAgICAgICAgICBtZXRyaWMubWV0cmljLFxuICAgICAgICAgIG1ldHJpYy5hbm9tYWx5RGV0ZWN0aW9uU3RhbmRhcmREZXZpYXRpb25Ub1JlbmRlcixcbiAgICAgICAgICBgRXhwZWN0ZWQgKHN0ZGV2ID0gJHttZXRyaWMuYW5vbWFseURldGVjdGlvblN0YW5kYXJkRGV2aWF0aW9uVG9SZW5kZXJ9KWAsXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIC8vIG5lZWRzIHRvIGJlIHVuaXF1ZSBpbiB0aGUgd2hvbGUgd2lkZ2V0IGFuZCBzdGFydCB3aXRoIGxvd2VyY2FzZVxuICAgICAgICAgIEFub21hbHlEZXRlY3Rpb25NZXRyaWNJZFByZWZpeCArXG4gICAgICAgICAgICBnZXRIYXNoRm9yTWV0cmljRXhwcmVzc2lvbklkKG1ldHJpYy5hbGFybUZyaWVuZGx5TmFtZSksXG4gICAgICAgICAgLy8gcHJlc2VydmUgdGhlIG1vc3Qgc3BlY2lmaWMgbWV0cmljIHBlcmlvZFxuICAgICAgICAgIG1ldHJpYy5wZXJpb2QgPz8gbWV0cmljLm1ldHJpYy5wZXJpb2RcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NlYXJjaChtZXRyaWMpKSB7XG4gICAgICAgIC8vIG1ldHJpYyBzZWFyY2hcbiAgICAgICAgcmV0dXJuIG1ldHJpY0ZhY3RvcnkuY3JlYXRlTWV0cmljU2VhcmNoKFxuICAgICAgICAgIG1ldHJpYy5zZWFyY2hRdWVyeSxcbiAgICAgICAgICBtZXRyaWMuZGltZW5zaW9uc01hcCxcbiAgICAgICAgICBtZXRyaWMuc3RhdGlzdGljLFxuICAgICAgICAgIG1ldHJpYy5uYW1lc3BhY2UsXG4gICAgICAgICAgbWV0cmljLmxhYmVsLFxuICAgICAgICAgIG1ldHJpYy5wZXJpb2RcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGdlbmVyYWwgbWV0cmljXG4gICAgICAgIHJldHVybiBtZXRyaWNGYWN0b3J5LmFkYXB0TWV0cmljUHJlc2VydmluZ1BlcmlvZChtZXRyaWMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNBbGFybShtZXRyaWM6IEN1c3RvbU1ldHJpYyk6IG1ldHJpYyBpcyBDdXN0b21NZXRyaWNXaXRoQWxhcm0ge1xuICAgIC8vIHR5cGUgZ3VhcmRcbiAgICByZXR1cm4gKG1ldHJpYyBhcyBDdXN0b21NZXRyaWNXaXRoQWxhcm0pLmFkZEFsYXJtICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGhhc0Fub21hbHlEZXRlY3Rpb24oXG4gICAgbWV0cmljOiBDdXN0b21NZXRyaWNcbiAgKTogbWV0cmljIGlzIEN1c3RvbU1ldHJpY1dpdGhBbm9tYWx5RGV0ZWN0aW9uIHtcbiAgICAvLyB0eXBlIGd1YXJkXG4gICAgcmV0dXJuIChcbiAgICAgIChtZXRyaWMgYXMgQ3VzdG9tTWV0cmljV2l0aEFub21hbHlEZXRlY3Rpb24pXG4gICAgICAgIC5hbm9tYWx5RGV0ZWN0aW9uU3RhbmRhcmREZXZpYXRpb25Ub1JlbmRlciAhPT0gdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTZWFyY2gobWV0cmljOiBDdXN0b21NZXRyaWMpOiBtZXRyaWMgaXMgQ3VzdG9tTWV0cmljU2VhcmNoIHtcbiAgICAvLyB0eXBlIGd1YXJkXG4gICAgcmV0dXJuIChtZXRyaWMgYXMgQ3VzdG9tTWV0cmljU2VhcmNoKS5zZWFyY2hRdWVyeSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEFsYXJtKFxuICAgIG1ldHJpY0dyb3VwOiBDdXN0b21NZXRyaWNHcm91cFdpdGhBbm5vdGF0aW9ucyxcbiAgICBtZXRyaWM6IEN1c3RvbU1ldHJpY1dpdGhBbGFybVxuICApIHtcbiAgICBpZiAodGhpcy5pc1NlYXJjaChtZXRyaWMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQWxhcm1pbmcgb24gc2VhcmNoIHF1ZXJpZXMgaXMgbm90IHN1cHBvcnRlZCBieSBDbG91ZFdhdGNoXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIG1ldHJpYy5hZGRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IG1ldHJpYy5hZGRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuY3VzdG9tQWxhcm1GYWN0b3J5LmFkZEN1c3RvbUFsYXJtKFxuICAgICAgICBtZXRyaWMubWV0cmljLFxuICAgICAgICBtZXRyaWMuYWxhcm1GcmllbmRseU5hbWUsXG4gICAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICAgIGFsYXJtUHJvcHNcbiAgICAgICk7XG4gICAgICBjb25zdCB0YXJnZXRBbm5vdGF0aW9ucyA9XG4gICAgICAgIChtZXRyaWMucG9zaXRpb24gPz8gQXhpc1Bvc2l0aW9uLkxFRlQpID09IEF4aXNQb3NpdGlvbi5MRUZUXG4gICAgICAgICAgPyBtZXRyaWNHcm91cC5hbm5vdGF0aW9uc1xuICAgICAgICAgIDogbWV0cmljR3JvdXAucmlnaHRBbm5vdGF0aW9ucztcbiAgICAgIHRhcmdldEFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBBbm9tYWx5RGV0ZWN0aW9uQWxhcm0oXG4gICAgbWV0cmljR3JvdXA6IEN1c3RvbU1ldHJpY0dyb3VwV2l0aEFubm90YXRpb25zLFxuICAgIG1ldHJpYzogQ3VzdG9tTWV0cmljV2l0aEFub21hbHlEZXRlY3Rpb25cbiAgKSB7XG4gICAgaWYgKHRoaXMuaXNTZWFyY2gobWV0cmljKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkFsYXJtaW5nIG9uIHNlYXJjaCBxdWVyaWVzIGlzIG5vdCBzdXBwb3J0ZWQgYnkgQ2xvdWRXYXRjaFwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGFsYXJtU3REZXZzID0gbmV3IFNldDxudW1iZXI+KCk7XG4gICAgY29uc3QgbWV0cmljRmFjdG9yeSA9IHRoaXMuY3JlYXRlTWV0cmljRmFjdG9yeSgpO1xuXG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIG1ldHJpYy5hZGRBbGFybU9uQW5vbWFseSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IG1ldHJpYy5hZGRBbGFybU9uQW5vbWFseVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGlmIChcbiAgICAgICAgYWxhcm1Qcm9wcy5hbGFybVdoZW5BYm92ZVRoZUJhbmQgfHxcbiAgICAgICAgYWxhcm1Qcm9wcy5hbGFybVdoZW5CZWxvd1RoZUJhbmRcbiAgICAgICkge1xuICAgICAgICBjb25zdCBhbm9tYWx5TWV0cmljID0gbWV0cmljRmFjdG9yeS5jcmVhdGVNZXRyaWNBbm9tYWx5RGV0ZWN0aW9uKFxuICAgICAgICAgIC8vIEJlY2F1c2UgdGhlIG1ldHJpYyB3YXMgcHJvdmlkZWQgdG8gdXMsIHdlIHVzZSBtZXRyaWNGYWN0b3J5Lm92ZXJyaWRlTmFtZXNwYWNlKCkgdG9cbiAgICAgICAgICAvLyBjb25maXJtIGl0IGFsaWducyB3aXRoIGFueSBuYW1lc3BhY2Ugb3ZlcnJpZGVzIHJlcXVlc3RlZCBmb3IgdGhpcyBNb25pdG9yaW5nRmFjYWRlXG4gICAgICAgICAgbWV0cmljRmFjdG9yeS5hZGFwdE1ldHJpY1ByZXNlcnZpbmdQZXJpb2QobWV0cmljLm1ldHJpYyksXG4gICAgICAgICAgYWxhcm1Qcm9wcy5zdGFuZGFyZERldmlhdGlvbkZvckFsYXJtLFxuICAgICAgICAgIGBCYW5kIChzdGRldiAke2FsYXJtUHJvcHMuc3RhbmRhcmREZXZpYXRpb25Gb3JBbGFybX0pYCxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgLy8gZXhwcmVzc2lvbiBJRCBuZWVkcyB0byBiZSB1bmlxdWUgYWNyb3NzIHRoZSB3aG9sZSB3aWRnZXQ7IG5lZWRzIHRvIHN0YXJ0IHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG4gICAgICAgICAgQW5vbWFseURldGVjdGlvbkFsYXJtSWRQcmVmaXggK1xuICAgICAgICAgICAgZ2V0SGFzaEZvck1ldHJpY0V4cHJlc3Npb25JZChcbiAgICAgICAgICAgICAgbWV0cmljLmFsYXJtRnJpZW5kbHlOYW1lICsgXCJfXCIgKyBkaXNhbWJpZ3VhdG9yXG4gICAgICAgICAgICApLFxuICAgICAgICAgIC8vIHByZXNlcnZlIHRoZSBtb3N0LXNwZWNpZmljIG1ldHJpYyBwZXJpb2RcbiAgICAgICAgICBtZXRyaWMucGVyaW9kID8/IG1ldHJpYy5tZXRyaWMucGVyaW9kXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID1cbiAgICAgICAgICB0aGlzLmFub21hbHlEZXRlY3RpbmdBbGFybUZhY3RvcnkuYWRkQWxhcm1XaGVuT3V0T2ZCYW5kKFxuICAgICAgICAgICAgYW5vbWFseU1ldHJpYyxcbiAgICAgICAgICAgIG1ldHJpYy5hbGFybUZyaWVuZGx5TmFtZSxcbiAgICAgICAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICAgICAgICBhbGFybVByb3BzXG4gICAgICAgICAgKTtcblxuICAgICAgICAvLyBubyBuZWVkIHRvIGFkZCBhbm5vdGF0aW9uIHNpbmNlIHRoZSBiYW5kcyBhcmUgcmVuZGVyZWQgYXV0b21hdGljYWxseVxuICAgICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgICAgIGFsYXJtU3REZXZzLmFkZChhbGFybVByb3BzLnN0YW5kYXJkRGV2aWF0aW9uRm9yQWxhcm0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhbGFybVN0RGV2cy5zaXplID4gMCkge1xuICAgICAgY29uc3QgYWxhcm1TdERldnNTdHJpbmcgPSBBcnJheS5mcm9tKGFsYXJtU3REZXZzKS5zb3J0KCkuam9pbihcIiwgXCIpO1xuICAgICAgbWV0cmljR3JvdXAudGl0bGVBZGRvbnMucHVzaChgYWxhcm1zIHdpdGggc3RkZXYgJHthbGFybVN0RGV2c1N0cmluZ31gKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgQW5vbWFseURldGVjdGlvbkFsYXJtSWRQcmVmaXggPSBcImFsYXJtX1wiO1xuY29uc3QgQW5vbWFseURldGVjdGlvbk1ldHJpY0lkUHJlZml4ID0gXCJhbm9tYWx5X1wiO1xuY29uc3QgQW5vbWFseUJhbmRNZXRyaWNJZFN1ZmZpeCA9IFwiX2JhbmRcIjtcblxuLyoqXG4gKiBJTlRFUk5BTCAtIFBMRUFTRSBETyBOT1QgVVNFXG4gKiBUaGlzIGlzIGEgaGFja3kgc29sdXRpb24gdG8gbWFrZSBiYW5kIHZpc2libGUgaW4gR3JhcGhXaWRnZXQgKGRlZmF1bHQgd2lkZ2V0IG9ubHkgcmVuZGVycyBsaW5lcywgbm90IHRoZSBiYW5kKS5cbiAqIFRoZSBjbGFzcyBtYWtlcyBhc3N1bXB0aW9ucyBhYm91dCB0aGUgaW50ZXJuYWwgSlNPTiBzdHJ1Y3R1cmUgYnV0IGZvdW5kIG5vIG90aGVyIHdheSA6KC5cbiAqIElkZWFsbHksIHdlIHdhbnQgdG8gcmVtb3ZlIHRoaXMgaGFjayBvbmNlIHRoZSBhbm9tYWx5IGRldGVjdGlvbiByZW5kZXJpbmcgaW4gQ0RLIGdldHMgaW1wcm92ZWRcbiAqL1xuY2xhc3MgQW5vbWFseURldGVjdGlvbkdyYXBoV2lkZ2V0IGV4dGVuZHMgR3JhcGhXaWRnZXQge1xuICBjb25zdHJ1Y3Rvcihwcm9wczogR3JhcGhXaWRnZXRQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHRvSnNvbigpIHtcbiAgICBjb25zdCBqc29uID0gc3VwZXIudG9Kc29uKCk7XG4gICAgaWYgKGpzb24ubGVuZ3RoICE9PSAxIHx8ICFqc29uPy5bMF0/LnByb3BlcnRpZXM/Lm1ldHJpY3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJUaGUgSlNPTiBpcyBleHBlY3RlZCB0byBoYXZlIGV4YWN0bHkgb25lIGVsZW1lbnQgd2l0aCBwcm9wZXJ0aWVzLm1ldHJpY3MgcHJvcGVydHkuXCJcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IG1ldHJpY3M6IGFueVtdID0ganNvblswXS5wcm9wZXJ0aWVzLm1ldHJpY3M7XG4gICAgaWYgKG1ldHJpY3MubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlRoZSBudW1iZXIgb2YgbWV0cmljcyBtdXN0IGJlIGF0IGxlYXN0IHR3byAobWV0cmljICsgYW5vbWFseSBkZXRlY3Rpb24gbWF0aCkuXCJcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGFub21hbHlEZXRlY3Rpb25NZXRyaWNQYXJ0OiBhbnlbXSA9IG1ldHJpY3NbMF0/LnZhbHVlO1xuICAgIGlmIChcbiAgICAgICFhbm9tYWx5RGV0ZWN0aW9uTWV0cmljUGFydCB8fFxuICAgICAgYW5vbWFseURldGVjdGlvbk1ldHJpY1BhcnQubGVuZ3RoICE9PSAxXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBtZXRyaWMgbXVzdCBiZSBhIG1hdGggZXhwcmVzc2lvbi5cIik7XG4gICAgfVxuICAgIGNvbnN0IGV2YWx1YXRlZE1ldHJpY1BhcnQ6IGFueVtdID0gbWV0cmljc1sxXT8udmFsdWU7XG4gICAgaWYgKFxuICAgICAgIWV2YWx1YXRlZE1ldHJpY1BhcnQgfHxcbiAgICAgIGV2YWx1YXRlZE1ldHJpY1BhcnQubGVuZ3RoIDwgMSB8fFxuICAgICAgIWV2YWx1YXRlZE1ldHJpY1BhcnRbZXZhbHVhdGVkTWV0cmljUGFydC5sZW5ndGggLSAxXS5pZFxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2Vjb25kIG1ldHJpYyBtdXN0IGhhdmUgYW4gSUQuXCIpO1xuICAgIH1cbiAgICAvLyBiYW5kIHJlbmRlcmluZyByZXF1aXJlcyBJRCB0byBiZSBzZXRcbiAgICBhbm9tYWx5RGV0ZWN0aW9uTWV0cmljUGFydFswXS5pZCA9XG4gICAgICBldmFsdWF0ZWRNZXRyaWNQYXJ0W2V2YWx1YXRlZE1ldHJpY1BhcnQubGVuZ3RoIC0gMV0uaWQgK1xuICAgICAgQW5vbWFseUJhbmRNZXRyaWNJZFN1ZmZpeDtcbiAgICAvLyBiYW5kIHJlbmRlcmluZyByZXF1aXJlcyB0aGUgZXZhbHVhdGVkIG1ldHJpYyB0byBiZSB2aXNpYmxlXG4gICAgZXZhbHVhdGVkTWV0cmljUGFydFtldmFsdWF0ZWRNZXRyaWNQYXJ0Lmxlbmd0aCAtIDFdLnZpc2libGUgPSB0cnVlO1xuICAgIHJldHVybiBqc29uO1xuICB9XG59XG4iXX0=