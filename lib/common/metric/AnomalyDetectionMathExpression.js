"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnomalyDetectionMathExpression = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
/**
 * Captures specific MathExpression for anomaly detection, for which alarm generation is different.
 * Added to overcome certain CDK limitations at the time of writing.
 * @see https://github.com/aws/aws-cdk/issues/10540
 */
class AnomalyDetectionMathExpression extends aws_cloudwatch_1.MathExpression {
    constructor(props) {
        super(props);
    }
    with(props) {
        return new AnomalyDetectionMathExpression({
            expression: this.expression,
            usingMetrics: this.usingMetrics,
            label: props.label ?? this.label,
            color: props.color ?? this.color,
            period: props.period ?? this.period,
        });
    }
    createAlarm(scope, id, props) {
        const alarm = super.createAlarm(scope, id, props);
        // `usingMetrics` of an anomaly detection alarm can only ever have one entry.
        // Should the entry be a math expression, the math expression can have its own `usingMetrics`.
        const finalExpressionId = Object.keys(this.usingMetrics)[0];
        // https://github.com/aws/aws-cdk/issues/10540#issuecomment-725222564
        const cfnAlarm = alarm.node.defaultChild;
        cfnAlarm.addPropertyDeletionOverride("Threshold");
        cfnAlarm.metrics.forEach((metric, index) => {
            // To create an anomaly detection alarm, returned data should be set to true on two MetricDataQueryProperty(s):
            // 1. The metric or math expression that is being evaluated for anomaly detection (eg. expr_1)
            // 2. The actual expression of anomaly detection (eg. ANOMALY_DETECTION_BAND(expr_1, 1))
            let returnData = false;
            if (metric.expression?.includes("ANOMALY_DETECTION_BAND")) {
                // thresholdMetricId is the ID of the ANOMALY_DETECTION_BAND function used as the threshold for the alarm.
                cfnAlarm.thresholdMetricId = metric.id;
                returnData = true;
            }
            else if (metric.id === finalExpressionId) {
                returnData = true;
            }
            cfnAlarm.addPropertyOverride(`Metrics.${index}.ReturnData`, returnData);
        });
        return alarm;
    }
}
exports.AnomalyDetectionMathExpression = AnomalyDetectionMathExpression;
_a = JSII_RTTI_SYMBOL_1;
AnomalyDetectionMathExpression[_a] = { fqn: "cdk-monitoring-constructs.AnomalyDetectionMathExpression", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5vbWFseURldGVjdGlvbk1hdGhFeHByZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQW5vbWFseURldGVjdGlvbk1hdGhFeHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBT29DO0FBR3BDOzs7O0dBSUc7QUFDSCxNQUFhLDhCQUErQixTQUFRLCtCQUFjO0lBQ2hFLFlBQVksS0FBMEI7UUFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksQ0FBQyxLQUE0QjtRQUMvQixPQUFPLElBQUksOEJBQThCLENBQUM7WUFDeEMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSztZQUNoQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSztZQUNoQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTTtTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXlCO1FBQ2pFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVsRCw2RUFBNkU7UUFDN0UsOEZBQThGO1FBQzlGLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUQscUVBQXFFO1FBQ3JFLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBd0IsQ0FBQztRQUNyRCxRQUFRLENBQUMsMkJBQTJCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsUUFBUSxDQUFDLE9BQThDLENBQUMsT0FBTyxDQUM5RCxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoQiwrR0FBK0c7WUFDL0csOEZBQThGO1lBQzlGLHdGQUF3RjtZQUN4RixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFdkIsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO2dCQUN6RCwwR0FBMEc7Z0JBQzFHLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUN2QyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQ25CO2lCQUFNLElBQUksTUFBTSxDQUFDLEVBQUUsS0FBSyxpQkFBaUIsRUFBRTtnQkFDMUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUNuQjtZQUVELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEtBQUssYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FDRixDQUFDO1FBRUYsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztBQTdDSCx3RUE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbGFybSxcbiAgQ2ZuQWxhcm0sXG4gIENyZWF0ZUFsYXJtT3B0aW9ucyxcbiAgTWF0aEV4cHJlc3Npb24sXG4gIE1hdGhFeHByZXNzaW9uT3B0aW9ucyxcbiAgTWF0aEV4cHJlc3Npb25Qcm9wcyxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuXG4vKipcbiAqIENhcHR1cmVzIHNwZWNpZmljIE1hdGhFeHByZXNzaW9uIGZvciBhbm9tYWx5IGRldGVjdGlvbiwgZm9yIHdoaWNoIGFsYXJtIGdlbmVyYXRpb24gaXMgZGlmZmVyZW50LlxuICogQWRkZWQgdG8gb3ZlcmNvbWUgY2VydGFpbiBDREsgbGltaXRhdGlvbnMgYXQgdGhlIHRpbWUgb2Ygd3JpdGluZy5cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2F3cy9hd3MtY2RrL2lzc3Vlcy8xMDU0MFxuICovXG5leHBvcnQgY2xhc3MgQW5vbWFseURldGVjdGlvbk1hdGhFeHByZXNzaW9uIGV4dGVuZHMgTWF0aEV4cHJlc3Npb24ge1xuICBjb25zdHJ1Y3Rvcihwcm9wczogTWF0aEV4cHJlc3Npb25Qcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHdpdGgocHJvcHM6IE1hdGhFeHByZXNzaW9uT3B0aW9ucyk6IE1hdGhFeHByZXNzaW9uIHtcbiAgICByZXR1cm4gbmV3IEFub21hbHlEZXRlY3Rpb25NYXRoRXhwcmVzc2lvbih7XG4gICAgICBleHByZXNzaW9uOiB0aGlzLmV4cHJlc3Npb24sXG4gICAgICB1c2luZ01ldHJpY3M6IHRoaXMudXNpbmdNZXRyaWNzLFxuICAgICAgbGFiZWw6IHByb3BzLmxhYmVsID8/IHRoaXMubGFiZWwsXG4gICAgICBjb2xvcjogcHJvcHMuY29sb3IgPz8gdGhpcy5jb2xvcixcbiAgICAgIHBlcmlvZDogcHJvcHMucGVyaW9kID8/IHRoaXMucGVyaW9kLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlQWxhcm0oc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IENyZWF0ZUFsYXJtT3B0aW9ucyk6IEFsYXJtIHtcbiAgICBjb25zdCBhbGFybSA9IHN1cGVyLmNyZWF0ZUFsYXJtKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gYHVzaW5nTWV0cmljc2Agb2YgYW4gYW5vbWFseSBkZXRlY3Rpb24gYWxhcm0gY2FuIG9ubHkgZXZlciBoYXZlIG9uZSBlbnRyeS5cbiAgICAvLyBTaG91bGQgdGhlIGVudHJ5IGJlIGEgbWF0aCBleHByZXNzaW9uLCB0aGUgbWF0aCBleHByZXNzaW9uIGNhbiBoYXZlIGl0cyBvd24gYHVzaW5nTWV0cmljc2AuXG4gICAgY29uc3QgZmluYWxFeHByZXNzaW9uSWQgPSBPYmplY3Qua2V5cyh0aGlzLnVzaW5nTWV0cmljcylbMF07XG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYXdzL2F3cy1jZGsvaXNzdWVzLzEwNTQwI2lzc3VlY29tbWVudC03MjUyMjI1NjRcbiAgICBjb25zdCBjZm5BbGFybSA9IGFsYXJtLm5vZGUuZGVmYXVsdENoaWxkIGFzIENmbkFsYXJtO1xuICAgIGNmbkFsYXJtLmFkZFByb3BlcnR5RGVsZXRpb25PdmVycmlkZShcIlRocmVzaG9sZFwiKTtcbiAgICAoY2ZuQWxhcm0ubWV0cmljcyBhcyBDZm5BbGFybS5NZXRyaWNEYXRhUXVlcnlQcm9wZXJ0eVtdKS5mb3JFYWNoKFxuICAgICAgKG1ldHJpYywgaW5kZXgpID0+IHtcbiAgICAgICAgLy8gVG8gY3JlYXRlIGFuIGFub21hbHkgZGV0ZWN0aW9uIGFsYXJtLCByZXR1cm5lZCBkYXRhIHNob3VsZCBiZSBzZXQgdG8gdHJ1ZSBvbiB0d28gTWV0cmljRGF0YVF1ZXJ5UHJvcGVydHkocyk6XG4gICAgICAgIC8vIDEuIFRoZSBtZXRyaWMgb3IgbWF0aCBleHByZXNzaW9uIHRoYXQgaXMgYmVpbmcgZXZhbHVhdGVkIGZvciBhbm9tYWx5IGRldGVjdGlvbiAoZWcuIGV4cHJfMSlcbiAgICAgICAgLy8gMi4gVGhlIGFjdHVhbCBleHByZXNzaW9uIG9mIGFub21hbHkgZGV0ZWN0aW9uIChlZy4gQU5PTUFMWV9ERVRFQ1RJT05fQkFORChleHByXzEsIDEpKVxuICAgICAgICBsZXQgcmV0dXJuRGF0YSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChtZXRyaWMuZXhwcmVzc2lvbj8uaW5jbHVkZXMoXCJBTk9NQUxZX0RFVEVDVElPTl9CQU5EXCIpKSB7XG4gICAgICAgICAgLy8gdGhyZXNob2xkTWV0cmljSWQgaXMgdGhlIElEIG9mIHRoZSBBTk9NQUxZX0RFVEVDVElPTl9CQU5EIGZ1bmN0aW9uIHVzZWQgYXMgdGhlIHRocmVzaG9sZCBmb3IgdGhlIGFsYXJtLlxuICAgICAgICAgIGNmbkFsYXJtLnRocmVzaG9sZE1ldHJpY0lkID0gbWV0cmljLmlkO1xuICAgICAgICAgIHJldHVybkRhdGEgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldHJpYy5pZCA9PT0gZmluYWxFeHByZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm5EYXRhID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNmbkFsYXJtLmFkZFByb3BlcnR5T3ZlcnJpZGUoYE1ldHJpY3MuJHtpbmRleH0uUmV0dXJuRGF0YWAsIHJldHVybkRhdGEpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gYWxhcm07XG4gIH1cbn1cbiJdfQ==