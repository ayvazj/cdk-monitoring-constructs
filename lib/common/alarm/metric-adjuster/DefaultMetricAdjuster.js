"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMetricAdjuster = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const strings_1 = require("../../strings");
/**
 * Applies the default metric adjustments.
 * These adjustments are always applied last, regardless the value configured in {@link AddAlarmProps.metricAdjuster}.
 */
class DefaultMetricAdjuster {
    /** @inheritdoc */
    adjustMetric(metric, _, props) {
        let adjustedMetric = metric;
        if (props.period) {
            // Adjust metric period for the alarm
            adjustedMetric = adjustedMetric.with({ period: props.period });
        }
        if (adjustedMetric.label) {
            // Annotations do not support dynamic labels, so we have to remove them from metric name
            adjustedMetric = adjustedMetric.with({
                label: strings_1.removeBracketsWithDynamicLabels(adjustedMetric.label),
            });
        }
        return adjustedMetric;
    }
}
exports.DefaultMetricAdjuster = DefaultMetricAdjuster;
_a = JSII_RTTI_SYMBOL_1;
DefaultMetricAdjuster[_a] = { fqn: "cdk-monitoring-constructs.DefaultMetricAdjuster", version: "0.0.0" };
DefaultMetricAdjuster.INSTANCE = new DefaultMetricAdjuster();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmYXVsdE1ldHJpY0FkanVzdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRGVmYXVsdE1ldHJpY0FkanVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsMkNBQWdFO0FBR2hFOzs7R0FHRztBQUNILE1BQWEscUJBQXFCO0lBR2hDLGtCQUFrQjtJQUNsQixZQUFZLENBQ1YsTUFBOEIsRUFDOUIsQ0FBWSxFQUNaLEtBQW9CO1FBRXBCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEIscUNBQXFDO1lBQ3JDLGNBQWMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQ3hCLHdGQUF3RjtZQUN4RixjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDbkMsS0FBSyxFQUFFLHlDQUErQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7YUFDN0QsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOztBQXZCSCxzREF3QkM7OztBQXZCaUIsOEJBQVEsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHsgSU1ldHJpY0FkanVzdGVyIH0gZnJvbSBcIi4vSU1ldHJpY0FkanVzdGVyXCI7XG5pbXBvcnQgeyBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0IH0gZnJvbSBcIi4uLy4uL21ldHJpY1wiO1xuaW1wb3J0IHsgcmVtb3ZlQnJhY2tldHNXaXRoRHluYW1pY0xhYmVscyB9IGZyb20gXCIuLi8uLi9zdHJpbmdzXCI7XG5pbXBvcnQgeyBBZGRBbGFybVByb3BzIH0gZnJvbSBcIi4uL0FsYXJtRmFjdG9yeVwiO1xuXG4vKipcbiAqIEFwcGxpZXMgdGhlIGRlZmF1bHQgbWV0cmljIGFkanVzdG1lbnRzLlxuICogVGhlc2UgYWRqdXN0bWVudHMgYXJlIGFsd2F5cyBhcHBsaWVkIGxhc3QsIHJlZ2FyZGxlc3MgdGhlIHZhbHVlIGNvbmZpZ3VyZWQgaW4ge0BsaW5rIEFkZEFsYXJtUHJvcHMubWV0cmljQWRqdXN0ZXJ9LlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdE1ldHJpY0FkanVzdGVyIGltcGxlbWVudHMgSU1ldHJpY0FkanVzdGVyIHtcbiAgc3RhdGljIHJlYWRvbmx5IElOU1RBTkNFID0gbmV3IERlZmF1bHRNZXRyaWNBZGp1c3RlcigpO1xuXG4gIC8qKiBAaW5oZXJpdGRvYyAqL1xuICBhZGp1c3RNZXRyaWMoXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIF86IENvbnN0cnVjdCxcbiAgICBwcm9wczogQWRkQWxhcm1Qcm9wc1xuICApOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0IHtcbiAgICBsZXQgYWRqdXN0ZWRNZXRyaWMgPSBtZXRyaWM7XG4gICAgaWYgKHByb3BzLnBlcmlvZCkge1xuICAgICAgLy8gQWRqdXN0IG1ldHJpYyBwZXJpb2QgZm9yIHRoZSBhbGFybVxuICAgICAgYWRqdXN0ZWRNZXRyaWMgPSBhZGp1c3RlZE1ldHJpYy53aXRoKHsgcGVyaW9kOiBwcm9wcy5wZXJpb2QgfSk7XG4gICAgfVxuXG4gICAgaWYgKGFkanVzdGVkTWV0cmljLmxhYmVsKSB7XG4gICAgICAvLyBBbm5vdGF0aW9ucyBkbyBub3Qgc3VwcG9ydCBkeW5hbWljIGxhYmVscywgc28gd2UgaGF2ZSB0byByZW1vdmUgdGhlbSBmcm9tIG1ldHJpYyBuYW1lXG4gICAgICBhZGp1c3RlZE1ldHJpYyA9IGFkanVzdGVkTWV0cmljLndpdGgoe1xuICAgICAgICBsYWJlbDogcmVtb3ZlQnJhY2tldHNXaXRoRHluYW1pY0xhYmVscyhhZGp1c3RlZE1ldHJpYy5sYWJlbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRqdXN0ZWRNZXRyaWM7XG4gIH1cbn1cbiJdfQ==