"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepFunctionActivityMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const StepFunctionActivityMetricFactory_1 = require("./StepFunctionActivityMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class StepFunctionActivityMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const fallbackConstructName = props.activity.activityName;
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            fallbackConstructName,
        });
        this.title = namingStrategy.resolveHumanReadableName();
        const alarmFactory = this.createAlarmFactory(namingStrategy.resolveAlarmFriendlyName());
        this.errorAlarmFactory = new common_1.ErrorAlarmFactory(alarmFactory);
        this.durationAlarmFactory = new common_1.LatencyAlarmFactory(alarmFactory);
        this.durationAnnotations = [];
        this.errorCountAnnotations = [];
        this.errorRateAnnotations = [];
        const metricFactory = new StepFunctionActivityMetricFactory_1.StepFunctionActivityMetricFactory(scope.createMetricFactory(), props);
        this.p50DurationMetric = metricFactory.metricActivityRunTimeP50InMillis();
        this.p90DurationMetric = metricFactory.metricActivityRunTimeP90InMillis();
        this.p99DurationMetric = metricFactory.metricActivityRunTimeP99InMillis();
        this.scheduledActivitiesMetric = metricFactory.metricActivitiesScheduled();
        this.startedActivitiesMetric = metricFactory.metricActivitiesStarted();
        this.succeededActivitiesMetric = metricFactory.metricActivitiesSucceeded();
        this.failedActivitiesMetric = metricFactory.metricActivitiesFailed();
        this.failedActivitiesRateMetric =
            metricFactory.metricActivitiesFailedRate();
        this.heartbeatTimedOutActivitiesMetrics =
            metricFactory.metricActivitiesHeartbeatTimedOut();
        this.timedOutActivitiesMetrics = metricFactory.metricActivitiesTimedOut();
        for (const disambiguator in props.addDurationP50Alarm) {
            const alarmProps = props.addDurationP50Alarm[disambiguator];
            const createdAlarm = this.durationAlarmFactory.addDurationAlarm(this.p50DurationMetric, common_1.LatencyType.P50, alarmProps, disambiguator);
            this.durationAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addDurationP90Alarm) {
            const alarmProps = props.addDurationP90Alarm[disambiguator];
            const createdAlarm = this.durationAlarmFactory.addDurationAlarm(this.p90DurationMetric, common_1.LatencyType.P90, alarmProps, disambiguator);
            this.durationAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addDurationP99Alarm) {
            const alarmProps = props.addDurationP99Alarm[disambiguator];
            const createdAlarm = this.durationAlarmFactory.addDurationAlarm(this.p99DurationMetric, common_1.LatencyType.P99, alarmProps, disambiguator);
            this.durationAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addFailedActivitiesCountAlarm) {
            const alarmProps = props.addFailedActivitiesCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.failedActivitiesMetric, common_1.ErrorType.FAILURE, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addFailedActivitiesRateAlarm) {
            const alarmProps = props.addFailedActivitiesRateAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorRateAlarm(this.failedActivitiesRateMetric, common_1.ErrorType.FAILURE, alarmProps, disambiguator);
            this.errorRateAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addTimedOutActivitiesCountAlarm) {
            const alarmProps = props.addTimedOutActivitiesCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.timedOutActivitiesMetrics, common_1.ErrorType.TIMED_OUT, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "States Activity",
                title: this.title,
            }),
            // Duration
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.HalfWidth,
                height: common_1.DefaultSummaryWidgetHeight,
                title: "Duration",
                left: [
                    this.p50DurationMetric,
                    this.p90DurationMetric,
                    this.p99DurationMetric,
                ],
                leftYAxis: common_1.TimeAxisMillisFromZero,
                leftAnnotations: this.durationAnnotations,
            }),
            // Statuses
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.HalfWidth,
                height: common_1.DefaultSummaryWidgetHeight,
                title: "Executions",
                left: [
                    this.scheduledActivitiesMetric,
                    this.startedActivitiesMetric,
                    this.succeededActivitiesMetric,
                    this.failedActivitiesMetric,
                    this.heartbeatTimedOutActivitiesMetrics,
                    this.timedOutActivitiesMetrics,
                ],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.errorCountAnnotations,
            }),
        ];
    }
    widgets() {
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "States Activity",
                title: this.title,
            }),
            // Duration
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Duration",
                left: [
                    this.p50DurationMetric,
                    this.p90DurationMetric,
                    this.p99DurationMetric,
                ],
                leftYAxis: common_1.TimeAxisMillisFromZero,
                leftAnnotations: this.durationAnnotations,
            }),
            // Statuses
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.HalfWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Executions",
                left: [
                    this.scheduledActivitiesMetric,
                    this.startedActivitiesMetric,
                    this.succeededActivitiesMetric,
                    this.failedActivitiesMetric,
                    this.heartbeatTimedOutActivitiesMetrics,
                    this.timedOutActivitiesMetrics,
                ],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.errorCountAnnotations,
            }),
            // Fault Rate
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Errors (rate)",
                left: [this.failedActivitiesRateMetric],
                leftAnnotations: this.errorRateAnnotations,
            }),
        ];
    }
}
exports.StepFunctionActivityMonitoring = StepFunctionActivityMonitoring;
_a = JSII_RTTI_SYMBOL_1;
StepFunctionActivityMonitoring[_a] = { fqn: "cdk-monitoring-constructs.StepFunctionActivityMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcEZ1bmN0aW9uQWN0aXZpdHlNb25pdG9yaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3RlcEZ1bmN0aW9uQWN0aXZpdHlNb25pdG9yaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBSW9DO0FBRXBDLDJGQUc2QztBQUM3Qyx5Q0FrQnNCO0FBQ3RCLCtDQUd5QjtBQWlCekIsTUFBYSw4QkFBK0IsU0FBUSxtQkFBVTtJQXFCNUQsWUFDRSxLQUFzQixFQUN0QixLQUEwQztRQUUxQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBCLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDMUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxvQ0FBd0IsQ0FBQztZQUNsRCxHQUFHLEtBQUs7WUFDUixxQkFBcUI7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUV2RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQzFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUMxQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksMEJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksNEJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFFL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxxRUFBaUMsQ0FDekQsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQzNCLEtBQUssQ0FDTixDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFp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Z0JBQ2pCLElBQUksRUFBRTtvQkFDSixJQUFJLENBQUMsaUJBQWlCO29CQUN0QixJQUFJLENBQUMsaUJBQWlCO29CQUN0QixJQUFJLENBQUMsaUJBQWlCO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUUsK0JBQXNCO2dCQUNqQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjthQUMxQyxDQUFDO1lBQ0YsV0FBVztZQUNYLElBQUksNEJBQVcsQ0FBQztnQkFDZCxLQUFLLEVBQUUsa0JBQVM7Z0JBQ2hCLE1BQU0sRUFBRSxpQ0FBd0I7Z0JBQ2hDLEtBQUssRUFBRSxZQUFZO2dCQUNuQixJQUFJLEVBQUU7b0JBQ0osSUFBSSxDQUFDLHlCQUF5QjtvQkFDOUIsSUFBSSxDQUFDLHVCQUF1QjtvQkFDNUIsSUFBSSxDQUFDLHlCQUF5QjtvQkFDOUIsSUFBSSxDQUFDLHNCQUFzQjtvQkFDM0IsSUFBSSxDQUFDLGtDQUFrQztvQkFDdkMsSUFBSSxDQUFDLHlCQUF5QjtpQkFDL0I7Z0JBQ0QsU0FBUyxFQUFFLDBCQUFpQjtnQkFDNUIsZUFBZSxFQUFFLElBQUksQ0FBQyxxQkFBcUI7YUFDNUMsQ0FBQztZQUNGLGFBQWE7WUFDYixJQUFJLDRCQUFXLENBQUM7Z0JBQ2QsS0FBSyxFQUFFLHFCQUFZO2dCQUNuQixNQUFNLEVBQUUsaUNBQXdCO2dCQUNoQyxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDO2dCQUN2QyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjthQUMzQyxDQUFDO1NBQ0gsQ0FBQztJQUNKLENBQUM7O0FBdk5ILHdFQXdOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdyYXBoV2lkZ2V0LFxuICBIb3Jpem9udGFsQW5ub3RhdGlvbixcbiAgSVdpZGdldCxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7XG4gIFN0ZXBGdW5jdGlvbkFjdGl2aXR5TWV0cmljRmFjdG9yeSxcbiAgU3RlcEZ1bmN0aW9uQWN0aXZpdHlNZXRyaWNGYWN0b3J5UHJvcHMsXG59IGZyb20gXCIuL1N0ZXBGdW5jdGlvbkFjdGl2aXR5TWV0cmljRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgQmFzZU1vbml0b3JpbmdQcm9wcyxcbiAgQ291bnRBeGlzRnJvbVplcm8sXG4gIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCxcbiAgRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQsXG4gIER1cmF0aW9uVGhyZXNob2xkLFxuICBFcnJvckFsYXJtRmFjdG9yeSxcbiAgRXJyb3JDb3VudFRocmVzaG9sZCxcbiAgRXJyb3JSYXRlVGhyZXNob2xkLFxuICBFcnJvclR5cGUsXG4gIEhhbGZXaWR0aCxcbiAgTGF0ZW5jeUFsYXJtRmFjdG9yeSxcbiAgTGF0ZW5jeVR5cGUsXG4gIE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gIE1vbml0b3JpbmcsXG4gIE1vbml0b3JpbmdTY29wZSxcbiAgUXVhcnRlcldpZHRoLFxuICBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5pbXBvcnQge1xuICBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0LFxuICBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3ksXG59IGZyb20gXCIuLi8uLi9kYXNoYm9hcmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTdGVwRnVuY3Rpb25BY3Rpdml0eU1vbml0b3JpbmdQcm9wc1xuICBleHRlbmRzIFN0ZXBGdW5jdGlvbkFjdGl2aXR5TWV0cmljRmFjdG9yeVByb3BzLFxuICAgIEJhc2VNb25pdG9yaW5nUHJvcHMge1xuICByZWFkb25seSBhZGREdXJhdGlvblA1MEFsYXJtPzogUmVjb3JkPHN0cmluZywgRHVyYXRpb25UaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGREdXJhdGlvblA5MEFsYXJtPzogUmVjb3JkPHN0cmluZywgRHVyYXRpb25UaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGREdXJhdGlvblA5OUFsYXJtPzogUmVjb3JkPHN0cmluZywgRHVyYXRpb25UaHJlc2hvbGQ+O1xuXG4gIHJlYWRvbmx5IGFkZEZhaWxlZEFjdGl2aXRpZXNDb3VudEFsYXJtPzogUmVjb3JkPHN0cmluZywgRXJyb3JDb3VudFRocmVzaG9sZD47XG4gIHJlYWRvbmx5IGFkZEZhaWxlZEFjdGl2aXRpZXNSYXRlQWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBFcnJvclJhdGVUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRUaW1lZE91dEFjdGl2aXRpZXNDb3VudEFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBFcnJvckNvdW50VGhyZXNob2xkXG4gID47XG59XG5cbmV4cG9ydCBjbGFzcyBTdGVwRnVuY3Rpb25BY3Rpdml0eU1vbml0b3JpbmcgZXh0ZW5kcyBNb25pdG9yaW5nIHtcbiAgcmVhZG9ubHkgdGl0bGU6IHN0cmluZztcblxuICByZWFkb25seSBlcnJvckFsYXJtRmFjdG9yeTogRXJyb3JBbGFybUZhY3Rvcnk7XG4gIHJlYWRvbmx5IGR1cmF0aW9uQWxhcm1GYWN0b3J5OiBMYXRlbmN5QWxhcm1GYWN0b3J5O1xuXG4gIHJlYWRvbmx5IGR1cmF0aW9uQW5ub3RhdGlvbnM6IEhvcml6b250YWxBbm5vdGF0aW9uW107XG4gIHJlYWRvbmx5IGVycm9yQ291bnRBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgZXJyb3JSYXRlQW5ub3RhdGlvbnM6IEhvcml6b250YWxBbm5vdGF0aW9uW107XG5cbiAgcmVhZG9ubHkgcDUwRHVyYXRpb25NZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHA5MER1cmF0aW9uTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBwOTlEdXJhdGlvbk1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgc2NoZWR1bGVkQWN0aXZpdGllc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgc3RhcnRlZEFjdGl2aXRpZXNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHN1Y2NlZWRlZEFjdGl2aXRpZXNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGZhaWxlZEFjdGl2aXRpZXNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGZhaWxlZEFjdGl2aXRpZXNSYXRlTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBoZWFydGJlYXRUaW1lZE91dEFjdGl2aXRpZXNNZXRyaWNzOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSB0aW1lZE91dEFjdGl2aXRpZXNNZXRyaWNzOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHNjb3BlOiBNb25pdG9yaW5nU2NvcGUsXG4gICAgcHJvcHM6IFN0ZXBGdW5jdGlvbkFjdGl2aXR5TW9uaXRvcmluZ1Byb3BzXG4gICkge1xuICAgIHN1cGVyKHNjb3BlLCBwcm9wcyk7XG5cbiAgICBjb25zdCBmYWxsYmFja0NvbnN0cnVjdE5hbWUgPSBwcm9wcy5hY3Rpdml0eS5hY3Rpdml0eU5hbWU7XG4gICAgY29uc3QgbmFtaW5nU3RyYXRlZ3kgPSBuZXcgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5KHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZmFsbGJhY2tDb25zdHJ1Y3ROYW1lLFxuICAgIH0pO1xuICAgIHRoaXMudGl0bGUgPSBuYW1pbmdTdHJhdGVneS5yZXNvbHZlSHVtYW5SZWFkYWJsZU5hbWUoKTtcblxuICAgIGNvbnN0IGFsYXJtRmFjdG9yeSA9IHRoaXMuY3JlYXRlQWxhcm1GYWN0b3J5KFxuICAgICAgbmFtaW5nU3RyYXRlZ3kucmVzb2x2ZUFsYXJtRnJpZW5kbHlOYW1lKClcbiAgICApO1xuICAgIHRoaXMuZXJyb3JBbGFybUZhY3RvcnkgPSBuZXcgRXJyb3JBbGFybUZhY3RvcnkoYWxhcm1GYWN0b3J5KTtcbiAgICB0aGlzLmR1cmF0aW9uQWxhcm1GYWN0b3J5ID0gbmV3IExhdGVuY3lBbGFybUZhY3RvcnkoYWxhcm1GYWN0b3J5KTtcblxuICAgIHRoaXMuZHVyYXRpb25Bbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zID0gW107XG4gICAgdGhpcy5lcnJvclJhdGVBbm5vdGF0aW9ucyA9IFtdO1xuXG4gICAgY29uc3QgbWV0cmljRmFjdG9yeSA9IG5ldyBTdGVwRnVuY3Rpb25BY3Rpdml0eU1ldHJpY0ZhY3RvcnkoXG4gICAgICBzY29wZS5jcmVhdGVNZXRyaWNGYWN0b3J5KCksXG4gICAgICBwcm9wc1xuICAgICk7XG4gICAgdGhpcy5wNTBEdXJhdGlvbk1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljQWN0aXZpdHlSdW5UaW1lUDUwSW5NaWxsaXMoKTtcbiAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNBY3Rpdml0eVJ1blRpbWVQOTBJbk1pbGxpcygpO1xuICAgIHRoaXMucDk5RHVyYXRpb25NZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0FjdGl2aXR5UnVuVGltZVA5OUluTWlsbGlzKCk7XG4gICAgdGhpcy5zY2hlZHVsZWRBY3Rpdml0aWVzTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNBY3Rpdml0aWVzU2NoZWR1bGVkKCk7XG4gICAgdGhpcy5zdGFydGVkQWN0aXZpdGllc01ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljQWN0aXZpdGllc1N0YXJ0ZWQoKTtcbiAgICB0aGlzLnN1Y2NlZWRlZEFjdGl2aXRpZXNNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0FjdGl2aXRpZXNTdWNjZWVkZWQoKTtcbiAgICB0aGlzLmZhaWxlZEFjdGl2aXRpZXNNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0FjdGl2aXRpZXNGYWlsZWQoKTtcbiAgICB0aGlzLmZhaWxlZEFjdGl2aXRpZXNSYXRlTWV0cmljID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljQWN0aXZpdGllc0ZhaWxlZFJhdGUoKTtcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVkT3V0QWN0aXZpdGllc01ldHJpY3MgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNBY3Rpdml0aWVzSGVhcnRiZWF0VGltZWRPdXQoKTtcbiAgICB0aGlzLnRpbWVkT3V0QWN0aXZpdGllc01ldHJpY3MgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0FjdGl2aXRpZXNUaW1lZE91dCgpO1xuXG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZER1cmF0aW9uUDUwQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGREdXJhdGlvblA1MEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5kdXJhdGlvbkFsYXJtRmFjdG9yeS5hZGREdXJhdGlvbkFsYXJtKFxuICAgICAgICB0aGlzLnA1MER1cmF0aW9uTWV0cmljLFxuICAgICAgICBMYXRlbmN5VHlwZS5QNTAsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGREdXJhdGlvblA5MEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkRHVyYXRpb25QOTBBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZHVyYXRpb25BbGFybUZhY3RvcnkuYWRkRHVyYXRpb25BbGFybShcbiAgICAgICAgdGhpcy5wOTBEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgTGF0ZW5jeVR5cGUuUDkwLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5kdXJhdGlvbkFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRHVyYXRpb25QOTlBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZER1cmF0aW9uUDk5QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmR1cmF0aW9uQWxhcm1GYWN0b3J5LmFkZER1cmF0aW9uQWxhcm0oXG4gICAgICAgIHRoaXMucDk5RHVyYXRpb25NZXRyaWMsXG4gICAgICAgIExhdGVuY3lUeXBlLlA5OSxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZHVyYXRpb25Bbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZEZhaWxlZEFjdGl2aXRpZXNDb3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkRmFpbGVkQWN0aXZpdGllc0NvdW50QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmVycm9yQWxhcm1GYWN0b3J5LmFkZEVycm9yQ291bnRBbGFybShcbiAgICAgICAgdGhpcy5mYWlsZWRBY3Rpdml0aWVzTWV0cmljLFxuICAgICAgICBFcnJvclR5cGUuRkFJTFVSRSxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRmFpbGVkQWN0aXZpdGllc1JhdGVBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZEZhaWxlZEFjdGl2aXRpZXNSYXRlQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmVycm9yQWxhcm1GYWN0b3J5LmFkZEVycm9yUmF0ZUFsYXJtKFxuICAgICAgICB0aGlzLmZhaWxlZEFjdGl2aXRpZXNSYXRlTWV0cmljLFxuICAgICAgICBFcnJvclR5cGUuRkFJTFVSRSxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZXJyb3JSYXRlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRUaW1lZE91dEFjdGl2aXRpZXNDb3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkVGltZWRPdXRBY3Rpdml0aWVzQ291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZXJyb3JBbGFybUZhY3RvcnkuYWRkRXJyb3JDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLnRpbWVkT3V0QWN0aXZpdGllc01ldHJpY3MsXG4gICAgICAgIEVycm9yVHlwZS5USU1FRF9PVVQsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG5cbiAgICBwcm9wcy51c2VDcmVhdGVkQWxhcm1zPy5jb25zdW1lKHRoaXMuY3JlYXRlZEFsYXJtcygpKTtcbiAgfVxuXG4gIHN1bW1hcnlXaWRnZXRzKCk6IElXaWRnZXRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIC8vIFRpdGxlXG4gICAgICBuZXcgTW9uaXRvcmluZ0hlYWRlcldpZGdldCh7XG4gICAgICAgIGZhbWlseTogXCJTdGF0ZXMgQWN0aXZpdHlcIixcbiAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICB9KSxcbiAgICAgIC8vIER1cmF0aW9uXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJEdXJhdGlvblwiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5wNTBEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljLFxuICAgICAgICAgIHRoaXMucDk5RHVyYXRpb25NZXRyaWMsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIFN0YXR1c2VzXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJFeGVjdXRpb25zXCIsXG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlZEFjdGl2aXRpZXNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5zdGFydGVkQWN0aXZpdGllc01ldHJpYyxcbiAgICAgICAgICB0aGlzLnN1Y2NlZWRlZEFjdGl2aXRpZXNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5mYWlsZWRBY3Rpdml0aWVzTWV0cmljLFxuICAgICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZWRPdXRBY3Rpdml0aWVzTWV0cmljcyxcbiAgICAgICAgICB0aGlzLnRpbWVkT3V0QWN0aXZpdGllc01ldHJpY3MsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICBdO1xuICB9XG5cbiAgd2lkZ2V0cygpOiBJV2lkZ2V0W10ge1xuICAgIHJldHVybiBbXG4gICAgICAvLyBUaXRsZVxuICAgICAgbmV3IE1vbml0b3JpbmdIZWFkZXJXaWRnZXQoe1xuICAgICAgICBmYW1pbHk6IFwiU3RhdGVzIEFjdGl2aXR5XCIsXG4gICAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgfSksXG4gICAgICAvLyBEdXJhdGlvblxuICAgICAgbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgd2lkdGg6IFF1YXJ0ZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gICAgICAgIHRpdGxlOiBcIkR1cmF0aW9uXCIsXG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICB0aGlzLnA1MER1cmF0aW9uTWV0cmljLFxuICAgICAgICAgIHRoaXMucDkwRHVyYXRpb25NZXRyaWMsXG4gICAgICAgICAgdGhpcy5wOTlEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgXSxcbiAgICAgICAgbGVmdFlBeGlzOiBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxuICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZHVyYXRpb25Bbm5vdGF0aW9ucyxcbiAgICAgIH0pLFxuICAgICAgLy8gU3RhdHVzZXNcbiAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoOiBIYWxmV2lkdGgsXG4gICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJFeGVjdXRpb25zXCIsXG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlZEFjdGl2aXRpZXNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5zdGFydGVkQWN0aXZpdGllc01ldHJpYyxcbiAgICAgICAgICB0aGlzLnN1Y2NlZWRlZEFjdGl2aXRpZXNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5mYWlsZWRBY3Rpdml0aWVzTWV0cmljLFxuICAgICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZWRPdXRBY3Rpdml0aWVzTWV0cmljcyxcbiAgICAgICAgICB0aGlzLnRpbWVkT3V0QWN0aXZpdGllc01ldHJpY3MsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIEZhdWx0IFJhdGVcbiAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoOiBRdWFydGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJFcnJvcnMgKHJhdGUpXCIsXG4gICAgICAgIGxlZnQ6IFt0aGlzLmZhaWxlZEFjdGl2aXRpZXNSYXRlTWV0cmljXSxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmVycm9yUmF0ZUFubm90YXRpb25zLFxuICAgICAgfSksXG4gICAgXTtcbiAgfVxufVxuIl19