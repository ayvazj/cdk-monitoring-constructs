"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepFunctionMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const StepFunctionMetricFactory_1 = require("./StepFunctionMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class StepFunctionMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const namedConstruct = props.stateMachine;
        const fallbackConstructName = namedConstruct.stateMachineArn;
        const stateMachineArn = namedConstruct.stateMachineArn;
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            namedConstruct,
            fallbackConstructName,
        });
        this.title = namingStrategy.resolveHumanReadableName();
        this.stateMachineUrl = scope
            .createAwsConsoleUrlFactory()
            .getStateMachineUrl(stateMachineArn);
        const alarmFactory = this.createAlarmFactory(namingStrategy.resolveAlarmFriendlyName());
        this.errorAlarmFactory = new common_1.ErrorAlarmFactory(alarmFactory);
        this.durationAlarmFactory = new common_1.LatencyAlarmFactory(alarmFactory);
        this.taskHealthAlarmFactory = new common_1.TaskHealthAlarmFactory(alarmFactory);
        this.durationAnnotations = [];
        this.errorCountAnnotations = [];
        this.errorRateAnnotations = [];
        const metricFactory = new StepFunctionMetricFactory_1.StepFunctionMetricFactory(scope.createMetricFactory(), props);
        this.p50DurationMetric = metricFactory.metricExecutionTimeP50InMillis();
        this.p90DurationMetric = metricFactory.metricExecutionTimeP90InMillis();
        this.p99DurationMetric = metricFactory.metricExecutionTimeP99InMillis();
        this.startedExecutionsMetric = metricFactory.metricExecutionsStarted();
        this.succeededExecutionsMetric = metricFactory.metricExecutionsSucceeded();
        this.failedExecutionsMetric = metricFactory.metricExecutionsFailed();
        this.failedExecutionRateMetric = metricFactory.metricExecutionsFailedRate();
        this.abortedExecutionsMetric = metricFactory.metricExecutionsAborted();
        this.throttledExecutionsMetric = metricFactory.metricExecutionThrottled();
        this.timedOutExecutionsMetrics = metricFactory.metricExecutionsTimedOut();
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
        for (const disambiguator in props.addFailedExecutionCountAlarm) {
            const alarmProps = props.addFailedExecutionCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.failedExecutionsMetric, common_1.ErrorType.FAILURE, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addFailedExecutionRateAlarm) {
            const alarmProps = props.addFailedExecutionRateAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorRateAlarm(this.failedExecutionRateMetric, common_1.ErrorType.FAILURE, alarmProps, disambiguator);
            this.errorRateAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addAbortedExecutionCountAlarm) {
            const alarmProps = props.addAbortedExecutionCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.abortedExecutionsMetric, common_1.ErrorType.ABORTED, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addThrottledExecutionCountAlarm) {
            const alarmProps = props.addThrottledExecutionCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.throttledExecutionsMetric, common_1.ErrorType.THROTTLED, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addTimedOutExecutionCountAlarm) {
            const alarmProps = props.addTimedOutExecutionCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.timedOutExecutionsMetrics, common_1.ErrorType.TIMED_OUT, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addMinStartedExecutionCountAlarm) {
            const alarmProps = props.addMinStartedExecutionCountAlarm[disambiguator];
            const createdAlarm = this.taskHealthAlarmFactory.addMinRunningTaskCountAlarm(this.startedExecutionsMetric, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "State Machine",
                title: this.title,
                goToLinkUrl: this.stateMachineUrl,
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
                    this.startedExecutionsMetric,
                    this.succeededExecutionsMetric,
                    this.failedExecutionsMetric,
                    this.abortedExecutionsMetric,
                    this.throttledExecutionsMetric,
                    this.timedOutExecutionsMetrics,
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
                family: "State Machine",
                title: this.title,
                goToLinkUrl: this.stateMachineUrl,
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
                    this.startedExecutionsMetric,
                    this.succeededExecutionsMetric,
                    this.failedExecutionsMetric,
                    this.abortedExecutionsMetric,
                    this.throttledExecutionsMetric,
                    this.timedOutExecutionsMetrics,
                ],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.errorCountAnnotations,
            }),
            // Fault Rate
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Errors (rate)",
                left: [this.failedExecutionRateMetric],
                leftAnnotations: this.errorRateAnnotations,
            }),
        ];
    }
}
exports.StepFunctionMonitoring = StepFunctionMonitoring;
_a = JSII_RTTI_SYMBOL_1;
StepFunctionMonitoring[_a] = { fqn: "cdk-monitoring-constructs.StepFunctionMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcEZ1bmN0aW9uTW9uaXRvcmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlN0ZXBGdW5jdGlvbk1vbml0b3JpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrREFJb0M7QUFFcEMsMkVBR3FDO0FBQ3JDLHlDQW9Cc0I7QUFDdEIsK0NBR3lCO0FBNEJ6QixNQUFhLHNCQUF1QixTQUFRLG1CQUFVO0lBc0JwRCxZQUFZLEtBQXNCLEVBQUUsS0FBa0M7UUFDcEUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwQixNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQzFDLE1BQU0scUJBQXFCLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQztRQUM3RCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDO1FBQ3ZELE1BQU0sY0FBYyxHQUFHLElBQUksb0NBQXdCLENBQUM7WUFDbEQsR0FBRyxLQUFLO1lBQ1IsY0FBYztZQUNkLHFCQUFxQjtTQUN0QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSzthQUN6QiwwQkFBMEIsRUFBRTthQUM1QixrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV2QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQzFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUMxQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksMEJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksNEJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksK0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkUsSUFB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QUssRUFBRSxxQkFBWTtnQkFDbkIsTUFBTSxFQUFFLGlDQUF3QjtnQkFDaEMsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztnQkFDdEMsZUFBZSxFQUFFLElBQUksQ0FBQyxvQkFBb0I7YUFDM0MsQ0FBQztTQUNILENBQUM7SUFDSixDQUFDOztBQTVQSCx3REE2UEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHcmFwaFdpZGdldCxcbiAgSG9yaXpvbnRhbEFubm90YXRpb24sXG4gIElXaWRnZXQsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuXG5pbXBvcnQge1xuICBTdGVwRnVuY3Rpb25NZXRyaWNGYWN0b3J5LFxuICBTdGVwRnVuY3Rpb25NZXRyaWNGYWN0b3J5UHJvcHMsXG59IGZyb20gXCIuL1N0ZXBGdW5jdGlvbk1ldHJpY0ZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIEJhc2VNb25pdG9yaW5nUHJvcHMsXG4gIENvdW50QXhpc0Zyb21aZXJvLFxuICBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gIERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICBEdXJhdGlvblRocmVzaG9sZCxcbiAgRXJyb3JBbGFybUZhY3RvcnksXG4gIEVycm9yQ291bnRUaHJlc2hvbGQsXG4gIEVycm9yUmF0ZVRocmVzaG9sZCxcbiAgRXJyb3JUeXBlLFxuICBIYWxmV2lkdGgsXG4gIExhdGVuY3lBbGFybUZhY3RvcnksXG4gIExhdGVuY3lUeXBlLFxuICBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICBNaW5SdW5uaW5nVGFza0NvdW50VGhyZXNob2xkLFxuICBNb25pdG9yaW5nLFxuICBNb25pdG9yaW5nU2NvcGUsXG4gIFF1YXJ0ZXJXaWR0aCxcbiAgVGFza0hlYWx0aEFsYXJtRmFjdG9yeSxcbiAgVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbn0gZnJvbSBcIi4uLy4uL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgTW9uaXRvcmluZ0hlYWRlcldpZGdldCxcbiAgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5LFxufSBmcm9tIFwiLi4vLi4vZGFzaGJvYXJkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RlcEZ1bmN0aW9uTW9uaXRvcmluZ09wdGlvbnMgZXh0ZW5kcyBCYXNlTW9uaXRvcmluZ1Byb3BzIHtcbiAgcmVhZG9ubHkgYWRkRHVyYXRpb25QNTBBbGFybT86IFJlY29yZDxzdHJpbmcsIER1cmF0aW9uVGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkRHVyYXRpb25QOTBBbGFybT86IFJlY29yZDxzdHJpbmcsIER1cmF0aW9uVGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkRHVyYXRpb25QOTlBbGFybT86IFJlY29yZDxzdHJpbmcsIER1cmF0aW9uVGhyZXNob2xkPjtcblxuICByZWFkb25seSBhZGRGYWlsZWRFeGVjdXRpb25Db3VudEFsYXJtPzogUmVjb3JkPHN0cmluZywgRXJyb3JDb3VudFRocmVzaG9sZD47XG4gIHJlYWRvbmx5IGFkZEZhaWxlZEV4ZWN1dGlvblJhdGVBbGFybT86IFJlY29yZDxzdHJpbmcsIEVycm9yUmF0ZVRocmVzaG9sZD47XG4gIHJlYWRvbmx5IGFkZEFib3J0ZWRFeGVjdXRpb25Db3VudEFsYXJtPzogUmVjb3JkPHN0cmluZywgRXJyb3JDb3VudFRocmVzaG9sZD47XG4gIHJlYWRvbmx5IGFkZFRocm90dGxlZEV4ZWN1dGlvbkNvdW50QWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIEVycm9yQ291bnRUaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkVGltZWRPdXRFeGVjdXRpb25Db3VudEFsYXJtPzogUmVjb3JkPHN0cmluZywgRXJyb3JDb3VudFRocmVzaG9sZD47XG4gIC8qKlxuICAgKiBBZGQgbWluaW11bSBzdGFydGVkIGV4ZWN1dGlvbiBjb3VudCBhbGFybSBmb3IgdGhlIHN0ZXBmdW5jdGlvbnMuXG4gICAqL1xuICByZWFkb25seSBhZGRNaW5TdGFydGVkRXhlY3V0aW9uQ291bnRBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgTWluUnVubmluZ1Rhc2tDb3VudFRocmVzaG9sZFxuICA+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0ZXBGdW5jdGlvbk1vbml0b3JpbmdQcm9wc1xuICBleHRlbmRzIFN0ZXBGdW5jdGlvbk1ldHJpY0ZhY3RvcnlQcm9wcyxcbiAgICBTdGVwRnVuY3Rpb25Nb25pdG9yaW5nT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgU3RlcEZ1bmN0aW9uTW9uaXRvcmluZyBleHRlbmRzIE1vbml0b3Jpbmcge1xuICByZWFkb25seSB0aXRsZTogc3RyaW5nO1xuICByZWFkb25seSBzdGF0ZU1hY2hpbmVVcmw/OiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgZXJyb3JBbGFybUZhY3Rvcnk6IEVycm9yQWxhcm1GYWN0b3J5O1xuICByZWFkb25seSBkdXJhdGlvbkFsYXJtRmFjdG9yeTogTGF0ZW5jeUFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgdGFza0hlYWx0aEFsYXJtRmFjdG9yeTogVGFza0hlYWx0aEFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgZHVyYXRpb25Bbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgZXJyb3JDb3VudEFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBlcnJvclJhdGVBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcblxuICByZWFkb25seSBwNTBEdXJhdGlvbk1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcDkwRHVyYXRpb25NZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHA5OUR1cmF0aW9uTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBzdGFydGVkRXhlY3V0aW9uc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgc3VjY2VlZGVkRXhlY3V0aW9uc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZmFpbGVkRXhlY3V0aW9uc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZmFpbGVkRXhlY3V0aW9uUmF0ZU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgYWJvcnRlZEV4ZWN1dGlvbnNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHRocm90dGxlZEV4ZWN1dGlvbnNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHRpbWVkT3V0RXhlY3V0aW9uc01ldHJpY3M6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IE1vbml0b3JpbmdTY29wZSwgcHJvcHM6IFN0ZXBGdW5jdGlvbk1vbml0b3JpbmdQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBwcm9wcyk7XG5cbiAgICBjb25zdCBuYW1lZENvbnN0cnVjdCA9IHByb3BzLnN0YXRlTWFjaGluZTtcbiAgICBjb25zdCBmYWxsYmFja0NvbnN0cnVjdE5hbWUgPSBuYW1lZENvbnN0cnVjdC5zdGF0ZU1hY2hpbmVBcm47XG4gICAgY29uc3Qgc3RhdGVNYWNoaW5lQXJuID0gbmFtZWRDb25zdHJ1Y3Quc3RhdGVNYWNoaW5lQXJuO1xuICAgIGNvbnN0IG5hbWluZ1N0cmF0ZWd5ID0gbmV3IE1vbml0b3JpbmdOYW1pbmdTdHJhdGVneSh7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIG5hbWVkQ29uc3RydWN0LFxuICAgICAgZmFsbGJhY2tDb25zdHJ1Y3ROYW1lLFxuICAgIH0pO1xuICAgIHRoaXMudGl0bGUgPSBuYW1pbmdTdHJhdGVneS5yZXNvbHZlSHVtYW5SZWFkYWJsZU5hbWUoKTtcbiAgICB0aGlzLnN0YXRlTWFjaGluZVVybCA9IHNjb3BlXG4gICAgICAuY3JlYXRlQXdzQ29uc29sZVVybEZhY3RvcnkoKVxuICAgICAgLmdldFN0YXRlTWFjaGluZVVybChzdGF0ZU1hY2hpbmVBcm4pO1xuXG4gICAgY29uc3QgYWxhcm1GYWN0b3J5ID0gdGhpcy5jcmVhdGVBbGFybUZhY3RvcnkoXG4gICAgICBuYW1pbmdTdHJhdGVneS5yZXNvbHZlQWxhcm1GcmllbmRseU5hbWUoKVxuICAgICk7XG4gICAgdGhpcy5lcnJvckFsYXJtRmFjdG9yeSA9IG5ldyBFcnJvckFsYXJtRmFjdG9yeShhbGFybUZhY3RvcnkpO1xuICAgIHRoaXMuZHVyYXRpb25BbGFybUZhY3RvcnkgPSBuZXcgTGF0ZW5jeUFsYXJtRmFjdG9yeShhbGFybUZhY3RvcnkpO1xuICAgIHRoaXMudGFza0hlYWx0aEFsYXJtRmFjdG9yeSA9IG5ldyBUYXNrSGVhbHRoQWxhcm1GYWN0b3J5KGFsYXJtRmFjdG9yeSk7XG4gICAgdGhpcy5kdXJhdGlvbkFubm90YXRpb25zID0gW107XG4gICAgdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmVycm9yUmF0ZUFubm90YXRpb25zID0gW107XG5cbiAgICBjb25zdCBtZXRyaWNGYWN0b3J5ID0gbmV3IFN0ZXBGdW5jdGlvbk1ldHJpY0ZhY3RvcnkoXG4gICAgICBzY29wZS5jcmVhdGVNZXRyaWNGYWN0b3J5KCksXG4gICAgICBwcm9wc1xuICAgICk7XG4gICAgdGhpcy5wNTBEdXJhdGlvbk1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRXhlY3V0aW9uVGltZVA1MEluTWlsbGlzKCk7XG4gICAgdGhpcy5wOTBEdXJhdGlvbk1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRXhlY3V0aW9uVGltZVA5MEluTWlsbGlzKCk7XG4gICAgdGhpcy5wOTlEdXJhdGlvbk1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRXhlY3V0aW9uVGltZVA5OUluTWlsbGlzKCk7XG4gICAgdGhpcy5zdGFydGVkRXhlY3V0aW9uc01ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRXhlY3V0aW9uc1N0YXJ0ZWQoKTtcbiAgICB0aGlzLnN1Y2NlZWRlZEV4ZWN1dGlvbnNNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0V4ZWN1dGlvbnNTdWNjZWVkZWQoKTtcbiAgICB0aGlzLmZhaWxlZEV4ZWN1dGlvbnNNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0V4ZWN1dGlvbnNGYWlsZWQoKTtcbiAgICB0aGlzLmZhaWxlZEV4ZWN1dGlvblJhdGVNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0V4ZWN1dGlvbnNGYWlsZWRSYXRlKCk7XG4gICAgdGhpcy5hYm9ydGVkRXhlY3V0aW9uc01ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRXhlY3V0aW9uc0Fib3J0ZWQoKTtcbiAgICB0aGlzLnRocm90dGxlZEV4ZWN1dGlvbnNNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0V4ZWN1dGlvblRocm90dGxlZCgpO1xuICAgIHRoaXMudGltZWRPdXRFeGVjdXRpb25zTWV0cmljcyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRXhlY3V0aW9uc1RpbWVkT3V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRHVyYXRpb25QNTBBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZER1cmF0aW9uUDUwQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmR1cmF0aW9uQWxhcm1GYWN0b3J5LmFkZER1cmF0aW9uQWxhcm0oXG4gICAgICAgIHRoaXMucDUwRHVyYXRpb25NZXRyaWMsXG4gICAgICAgIExhdGVuY3lUeXBlLlA1MCxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZHVyYXRpb25Bbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZER1cmF0aW9uUDkwQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGREdXJhdGlvblA5MEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5kdXJhdGlvbkFsYXJtRmFjdG9yeS5hZGREdXJhdGlvbkFsYXJtKFxuICAgICAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljLFxuICAgICAgICBMYXRlbmN5VHlwZS5QOTAsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGREdXJhdGlvblA5OUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkRHVyYXRpb25QOTlBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZHVyYXRpb25BbGFybUZhY3RvcnkuYWRkRHVyYXRpb25BbGFybShcbiAgICAgICAgdGhpcy5wOTlEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgTGF0ZW5jeVR5cGUuUDk5LFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5kdXJhdGlvbkFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRmFpbGVkRXhlY3V0aW9uQ291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZEZhaWxlZEV4ZWN1dGlvbkNvdW50QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmVycm9yQWxhcm1GYWN0b3J5LmFkZEVycm9yQ291bnRBbGFybShcbiAgICAgICAgdGhpcy5mYWlsZWRFeGVjdXRpb25zTWV0cmljLFxuICAgICAgICBFcnJvclR5cGUuRkFJTFVSRSxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRmFpbGVkRXhlY3V0aW9uUmF0ZUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkRmFpbGVkRXhlY3V0aW9uUmF0ZUFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5lcnJvckFsYXJtRmFjdG9yeS5hZGRFcnJvclJhdGVBbGFybShcbiAgICAgICAgdGhpcy5mYWlsZWRFeGVjdXRpb25SYXRlTWV0cmljLFxuICAgICAgICBFcnJvclR5cGUuRkFJTFVSRSxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZXJyb3JSYXRlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRBYm9ydGVkRXhlY3V0aW9uQ291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZEFib3J0ZWRFeGVjdXRpb25Db3VudEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5lcnJvckFsYXJtRmFjdG9yeS5hZGRFcnJvckNvdW50QWxhcm0oXG4gICAgICAgIHRoaXMuYWJvcnRlZEV4ZWN1dGlvbnNNZXRyaWMsXG4gICAgICAgIEVycm9yVHlwZS5BQk9SVEVELFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRUaHJvdHRsZWRFeGVjdXRpb25Db3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkVGhyb3R0bGVkRXhlY3V0aW9uQ291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZXJyb3JBbGFybUZhY3RvcnkuYWRkRXJyb3JDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLnRocm90dGxlZEV4ZWN1dGlvbnNNZXRyaWMsXG4gICAgICAgIEVycm9yVHlwZS5USFJPVFRMRUQsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZFRpbWVkT3V0RXhlY3V0aW9uQ291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZFRpbWVkT3V0RXhlY3V0aW9uQ291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZXJyb3JBbGFybUZhY3RvcnkuYWRkRXJyb3JDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLnRpbWVkT3V0RXhlY3V0aW9uc01ldHJpY3MsXG4gICAgICAgIEVycm9yVHlwZS5USU1FRF9PVVQsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZE1pblN0YXJ0ZWRFeGVjdXRpb25Db3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkTWluU3RhcnRlZEV4ZWN1dGlvbkNvdW50QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPVxuICAgICAgICB0aGlzLnRhc2tIZWFsdGhBbGFybUZhY3RvcnkuYWRkTWluUnVubmluZ1Rhc2tDb3VudEFsYXJtKFxuICAgICAgICAgIHRoaXMuc3RhcnRlZEV4ZWN1dGlvbnNNZXRyaWMsXG4gICAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICAgICk7XG4gICAgICB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG5cbiAgICBwcm9wcy51c2VDcmVhdGVkQWxhcm1zPy5jb25zdW1lKHRoaXMuY3JlYXRlZEFsYXJtcygpKTtcbiAgfVxuXG4gIHN1bW1hcnlXaWRnZXRzKCk6IElXaWRnZXRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIC8vIFRpdGxlXG4gICAgICBuZXcgTW9uaXRvcmluZ0hlYWRlcldpZGdldCh7XG4gICAgICAgIGZhbWlseTogXCJTdGF0ZSBNYWNoaW5lXCIsXG4gICAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgICBnb1RvTGlua1VybDogdGhpcy5zdGF0ZU1hY2hpbmVVcmwsXG4gICAgICB9KSxcbiAgICAgIC8vIER1cmF0aW9uXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJEdXJhdGlvblwiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5wNTBEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljLFxuICAgICAgICAgIHRoaXMucDk5RHVyYXRpb25NZXRyaWMsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIFN0YXR1c2VzXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJFeGVjdXRpb25zXCIsXG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICB0aGlzLnN0YXJ0ZWRFeGVjdXRpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMuc3VjY2VlZGVkRXhlY3V0aW9uc01ldHJpYyxcbiAgICAgICAgICB0aGlzLmZhaWxlZEV4ZWN1dGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5hYm9ydGVkRXhlY3V0aW9uc01ldHJpYyxcbiAgICAgICAgICB0aGlzLnRocm90dGxlZEV4ZWN1dGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy50aW1lZE91dEV4ZWN1dGlvbnNNZXRyaWNzLFxuICAgICAgICBdLFxuICAgICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zLFxuICAgICAgfSksXG4gICAgXTtcbiAgfVxuXG4gIHdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgLy8gVGl0bGVcbiAgICAgIG5ldyBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0KHtcbiAgICAgICAgZmFtaWx5OiBcIlN0YXRlIE1hY2hpbmVcIixcbiAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICAgIGdvVG9MaW5rVXJsOiB0aGlzLnN0YXRlTWFjaGluZVVybCxcbiAgICAgIH0pLFxuICAgICAgLy8gRHVyYXRpb25cbiAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoOiBRdWFydGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJEdXJhdGlvblwiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5wNTBEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljLFxuICAgICAgICAgIHRoaXMucDk5RHVyYXRpb25NZXRyaWMsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIFN0YXR1c2VzXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCxcbiAgICAgICAgdGl0bGU6IFwiRXhlY3V0aW9uc1wiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5zdGFydGVkRXhlY3V0aW9uc01ldHJpYyxcbiAgICAgICAgICB0aGlzLnN1Y2NlZWRlZEV4ZWN1dGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5mYWlsZWRFeGVjdXRpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMuYWJvcnRlZEV4ZWN1dGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy50aHJvdHRsZWRFeGVjdXRpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMudGltZWRPdXRFeGVjdXRpb25zTWV0cmljcyxcbiAgICAgICAgXSxcbiAgICAgICAgbGVmdFlBeGlzOiBDb3VudEF4aXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucyxcbiAgICAgIH0pLFxuICAgICAgLy8gRmF1bHQgUmF0ZVxuICAgICAgbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgd2lkdGg6IFF1YXJ0ZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gICAgICAgIHRpdGxlOiBcIkVycm9ycyAocmF0ZSlcIixcbiAgICAgICAgbGVmdDogW3RoaXMuZmFpbGVkRXhlY3V0aW9uUmF0ZU1ldHJpY10sXG4gICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5lcnJvclJhdGVBbm5vdGF0aW9ucyxcbiAgICAgIH0pLFxuICAgIF07XG4gIH1cbn1cbiJdfQ==