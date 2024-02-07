"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepFunctionServiceIntegrationMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const StepFunctionServiceIntegrationMetricFactory_1 = require("./StepFunctionServiceIntegrationMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class StepFunctionServiceIntegrationMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const fallbackConstructName = "Service Integration Task";
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
        const metricFactory = new StepFunctionServiceIntegrationMetricFactory_1.StepFunctionServiceIntegrationMetricFactory(scope.createMetricFactory(), props);
        this.p50DurationMetric =
            metricFactory.metricServiceIntegrationRunTimeP50InMillis();
        this.p90DurationMetric =
            metricFactory.metricServiceIntegrationRunTimeP90InMillis();
        this.p99DurationMetric =
            metricFactory.metricServiceIntegrationRunTimeP99InMillis();
        this.scheduledServiceIntegrationsMetric =
            metricFactory.metricServiceIntegrationsScheduled();
        this.startedServiceIntegrationsMetric =
            metricFactory.metricServiceIntegrationsStarted();
        this.succeededServiceIntegrationsMetric =
            metricFactory.metricServiceIntegrationsSucceeded();
        this.failedServiceIntegrationsMetric =
            metricFactory.metricServiceIntegrationsFailed();
        this.failedServiceIntegrationRateMetric =
            metricFactory.metricServiceIntegrationsFailedRate();
        this.timedOutServiceIntegrationsMetrics =
            metricFactory.metricServiceIntegrationsTimedOut();
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
        for (const disambiguator in props.addFailedServiceIntegrationsCountAlarm) {
            const alarmProps = props.addFailedServiceIntegrationsCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.failedServiceIntegrationsMetric, common_1.ErrorType.FAILURE, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addFailedServiceIntegrationsRateAlarm) {
            const alarmProps = props.addFailedServiceIntegrationsRateAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorRateAlarm(this.failedServiceIntegrationRateMetric, common_1.ErrorType.FAILURE, alarmProps, disambiguator);
            this.errorRateAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addTimedOutServiceIntegrationsCountAlarm) {
            const alarmProps = props.addTimedOutServiceIntegrationsCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.timedOutServiceIntegrationsMetrics, common_1.ErrorType.TIMED_OUT, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "States Service Integration",
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
                    this.scheduledServiceIntegrationsMetric,
                    this.startedServiceIntegrationsMetric,
                    this.succeededServiceIntegrationsMetric,
                    this.failedServiceIntegrationsMetric,
                    this.timedOutServiceIntegrationsMetrics,
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
                family: "States Service Integration",
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
                    this.scheduledServiceIntegrationsMetric,
                    this.startedServiceIntegrationsMetric,
                    this.succeededServiceIntegrationsMetric,
                    this.failedServiceIntegrationsMetric,
                    this.timedOutServiceIntegrationsMetrics,
                ],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.errorCountAnnotations,
            }),
            // Fault Rate
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Errors (rate)",
                left: [this.failedServiceIntegrationRateMetric],
                leftAnnotations: this.errorRateAnnotations,
            }),
        ];
    }
}
exports.StepFunctionServiceIntegrationMonitoring = StepFunctionServiceIntegrationMonitoring;
_a = JSII_RTTI_SYMBOL_1;
StepFunctionServiceIntegrationMonitoring[_a] = { fqn: "cdk-monitoring-constructs.StepFunctionServiceIntegrationMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcEZ1bmN0aW9uU2VydmljZUludGVncmF0aW9uTW9uaXRvcmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlN0ZXBGdW5jdGlvblNlcnZpY2VJbnRlZ3JhdGlvbk1vbml0b3JpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrREFJb0M7QUFFcEMsK0dBR3VEO0FBQ3ZELHlDQWtCc0I7QUFDdEIsK0NBR3lCO0FBdUJ6QixNQUFhLHdDQUF5QyxTQUFRLG1CQUFVO0lBb0J0RSxZQUNFLEtBQXNCLEVBQ3RCLEtBQW9EO1FBRXBELEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEIsTUFBTSxxQkFBcUIsR0FBRywwQkFBMEIsQ0FBQztRQUN6RCxNQUFNLGNBQWMsR0FBRyxJQUFJLG9DQUF3QixDQUFDO1lBQ2xELEdBQUcsS0FBSztZQUNSLHFCQUFxQjtTQUN0QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBRXZELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FDMUMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQzFDLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSwwQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSw0QkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztRQUUvQixNQUFNLGFBQWEsR0FBRyxJQUFJLHlGQUEyQyxDQUNuRSxLQUFLLENBQUMsbUJBQW1CLEVBQUUsRUFDM0IsS0FBSyxDQUNOLENBQUM7UUFDRixJQUFJLENBQUMsaUJB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LElBQUksQ0FBQyxpQkFBaUI7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSwrQkFBc0I7Z0JBQ2pDLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CO2FBQzFDLENBQUM7WUFDRixXQUFXO1lBQ1gsSUFBSSw0QkFBVyxDQUFDO2dCQUNkLEtBQUssRUFBRSxrQkFBUztnQkFDaEIsTUFBTSxFQUFFLGlDQUF3QjtnQkFDaEMsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLElBQUksRUFBRTtvQkFDSixJQUFJLENBQUMsa0NBQWtDO29CQUN2QyxJQUFJLENBQUMsZ0NBQWdDO29CQUNyQyxJQUFJLENBQUMsa0NBQWtDO29CQUN2QyxJQUFJLENBQUMsK0JBQStCO29CQUNwQyxJQUFJLENBQUMsa0NBQWtDO2lCQUN4QztnQkFDRCxTQUFTLEVBQUUsMEJBQWlCO2dCQUM1QixlQUFlLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjthQUM1QyxDQUFDO1lBQ0YsYUFBYTtZQUNiLElBQUksNEJBQVcsQ0FBQztnQkFDZCxLQUFLLEVBQUUscUJBQVk7Z0JBQ25CLE1BQU0sRUFBRSxpQ0FBd0I7Z0JBQ2hDLEtBQUssRUFBRSxlQUFlO2dCQUN0QixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUM7Z0JBQy9DLGVBQWUsRUFBRSxJQUFJLENBQUMsb0JBQW9CO2FBQzNDLENBQUM7U0FDSCxDQUFDO0lBQ0osQ0FBQzs7QUE3TkgsNEZBOE5DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR3JhcGhXaWRnZXQsXG4gIEhvcml6b250YWxBbm5vdGF0aW9uLFxuICBJV2lkZ2V0LFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHtcbiAgU3RlcEZ1bmN0aW9uU2VydmljZUludGVncmF0aW9uTWV0cmljRmFjdG9yeSxcbiAgU3RlcEZ1bmN0aW9uU2VydmljZUludGVncmF0aW9uTWV0cmljRmFjdG9yeVByb3BzLFxufSBmcm9tIFwiLi9TdGVwRnVuY3Rpb25TZXJ2aWNlSW50ZWdyYXRpb25NZXRyaWNGYWN0b3J5XCI7XG5pbXBvcnQge1xuICBCYXNlTW9uaXRvcmluZ1Byb3BzLFxuICBDb3VudEF4aXNGcm9tWmVybyxcbiAgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCxcbiAgRHVyYXRpb25UaHJlc2hvbGQsXG4gIEVycm9yQWxhcm1GYWN0b3J5LFxuICBFcnJvckNvdW50VGhyZXNob2xkLFxuICBFcnJvclJhdGVUaHJlc2hvbGQsXG4gIEVycm9yVHlwZSxcbiAgSGFsZldpZHRoLFxuICBMYXRlbmN5QWxhcm1GYWN0b3J5LFxuICBMYXRlbmN5VHlwZSxcbiAgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgTW9uaXRvcmluZyxcbiAgTW9uaXRvcmluZ1Njb3BlLFxuICBRdWFydGVyV2lkdGgsXG4gIFRpbWVBeGlzTWlsbGlzRnJvbVplcm8sXG59IGZyb20gXCIuLi8uLi9jb21tb25cIjtcbmltcG9ydCB7XG4gIE1vbml0b3JpbmdIZWFkZXJXaWRnZXQsXG4gIE1vbml0b3JpbmdOYW1pbmdTdHJhdGVneSxcbn0gZnJvbSBcIi4uLy4uL2Rhc2hib2FyZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0ZXBGdW5jdGlvblNlcnZpY2VJbnRlZ3JhdGlvbk1vbml0b3JpbmdQcm9wc1xuICBleHRlbmRzIFN0ZXBGdW5jdGlvblNlcnZpY2VJbnRlZ3JhdGlvbk1ldHJpY0ZhY3RvcnlQcm9wcyxcbiAgICBCYXNlTW9uaXRvcmluZ1Byb3BzIHtcbiAgcmVhZG9ubHkgYWRkRHVyYXRpb25QNTBBbGFybT86IFJlY29yZDxzdHJpbmcsIER1cmF0aW9uVGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkRHVyYXRpb25QOTBBbGFybT86IFJlY29yZDxzdHJpbmcsIER1cmF0aW9uVGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkRHVyYXRpb25QOTlBbGFybT86IFJlY29yZDxzdHJpbmcsIER1cmF0aW9uVGhyZXNob2xkPjtcblxuICByZWFkb25seSBhZGRGYWlsZWRTZXJ2aWNlSW50ZWdyYXRpb25zQ291bnRBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgRXJyb3JDb3VudFRocmVzaG9sZFxuICA+O1xuICByZWFkb25seSBhZGRGYWlsZWRTZXJ2aWNlSW50ZWdyYXRpb25zUmF0ZUFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBFcnJvclJhdGVUaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkVGltZWRPdXRTZXJ2aWNlSW50ZWdyYXRpb25zQ291bnRBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgRXJyb3JDb3VudFRocmVzaG9sZFxuICA+O1xufVxuXG5leHBvcnQgY2xhc3MgU3RlcEZ1bmN0aW9uU2VydmljZUludGVncmF0aW9uTW9uaXRvcmluZyBleHRlbmRzIE1vbml0b3Jpbmcge1xuICByZWFkb25seSB0aXRsZTogc3RyaW5nO1xuXG4gIHJlYWRvbmx5IGVycm9yQWxhcm1GYWN0b3J5OiBFcnJvckFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgZHVyYXRpb25BbGFybUZhY3Rvcnk6IExhdGVuY3lBbGFybUZhY3Rvcnk7XG5cbiAgcmVhZG9ubHkgZHVyYXRpb25Bbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgZXJyb3JDb3VudEFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBlcnJvclJhdGVBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcblxuICByZWFkb25seSBwNTBEdXJhdGlvbk1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcDkwRHVyYXRpb25NZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHA5OUR1cmF0aW9uTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBzY2hlZHVsZWRTZXJ2aWNlSW50ZWdyYXRpb25zTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBzdGFydGVkU2VydmljZUludGVncmF0aW9uc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgc3VjY2VlZGVkU2VydmljZUludGVncmF0aW9uc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZmFpbGVkU2VydmljZUludGVncmF0aW9uc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZmFpbGVkU2VydmljZUludGVncmF0aW9uUmF0ZU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgdGltZWRPdXRTZXJ2aWNlSW50ZWdyYXRpb25zTWV0cmljczogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzY29wZTogTW9uaXRvcmluZ1Njb3BlLFxuICAgIHByb3BzOiBTdGVwRnVuY3Rpb25TZXJ2aWNlSW50ZWdyYXRpb25Nb25pdG9yaW5nUHJvcHNcbiAgKSB7XG4gICAgc3VwZXIoc2NvcGUsIHByb3BzKTtcblxuICAgIGNvbnN0IGZhbGxiYWNrQ29uc3RydWN0TmFtZSA9IFwiU2VydmljZSBJbnRlZ3JhdGlvbiBUYXNrXCI7XG4gICAgY29uc3QgbmFtaW5nU3RyYXRlZ3kgPSBuZXcgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5KHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZmFsbGJhY2tDb25zdHJ1Y3ROYW1lLFxuICAgIH0pO1xuICAgIHRoaXMudGl0bGUgPSBuYW1pbmdTdHJhdGVneS5yZXNvbHZlSHVtYW5SZWFkYWJsZU5hbWUoKTtcblxuICAgIGNvbnN0IGFsYXJtRmFjdG9yeSA9IHRoaXMuY3JlYXRlQWxhcm1GYWN0b3J5KFxuICAgICAgbmFtaW5nU3RyYXRlZ3kucmVzb2x2ZUFsYXJtRnJpZW5kbHlOYW1lKClcbiAgICApO1xuICAgIHRoaXMuZXJyb3JBbGFybUZhY3RvcnkgPSBuZXcgRXJyb3JBbGFybUZhY3RvcnkoYWxhcm1GYWN0b3J5KTtcbiAgICB0aGlzLmR1cmF0aW9uQWxhcm1GYWN0b3J5ID0gbmV3IExhdGVuY3lBbGFybUZhY3RvcnkoYWxhcm1GYWN0b3J5KTtcblxuICAgIHRoaXMuZHVyYXRpb25Bbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zID0gW107XG4gICAgdGhpcy5lcnJvclJhdGVBbm5vdGF0aW9ucyA9IFtdO1xuXG4gICAgY29uc3QgbWV0cmljRmFjdG9yeSA9IG5ldyBTdGVwRnVuY3Rpb25TZXJ2aWNlSW50ZWdyYXRpb25NZXRyaWNGYWN0b3J5KFxuICAgICAgc2NvcGUuY3JlYXRlTWV0cmljRmFjdG9yeSgpLFxuICAgICAgcHJvcHNcbiAgICApO1xuICAgIHRoaXMucDUwRHVyYXRpb25NZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNTZXJ2aWNlSW50ZWdyYXRpb25SdW5UaW1lUDUwSW5NaWxsaXMoKTtcbiAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljU2VydmljZUludGVncmF0aW9uUnVuVGltZVA5MEluTWlsbGlzKCk7XG4gICAgdGhpcy5wOTlEdXJhdGlvbk1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY1NlcnZpY2VJbnRlZ3JhdGlvblJ1blRpbWVQOTlJbk1pbGxpcygpO1xuICAgIHRoaXMuc2NoZWR1bGVkU2VydmljZUludGVncmF0aW9uc01ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY1NlcnZpY2VJbnRlZ3JhdGlvbnNTY2hlZHVsZWQoKTtcbiAgICB0aGlzLnN0YXJ0ZWRTZXJ2aWNlSW50ZWdyYXRpb25zTWV0cmljID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljU2VydmljZUludGVncmF0aW9uc1N0YXJ0ZWQoKTtcbiAgICB0aGlzLnN1Y2NlZWRlZFNlcnZpY2VJbnRlZ3JhdGlvbnNNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNTZXJ2aWNlSW50ZWdyYXRpb25zU3VjY2VlZGVkKCk7XG4gICAgdGhpcy5mYWlsZWRTZXJ2aWNlSW50ZWdyYXRpb25zTWV0cmljID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljU2VydmljZUludGVncmF0aW9uc0ZhaWxlZCgpO1xuICAgIHRoaXMuZmFpbGVkU2VydmljZUludGVncmF0aW9uUmF0ZU1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY1NlcnZpY2VJbnRlZ3JhdGlvbnNGYWlsZWRSYXRlKCk7XG4gICAgdGhpcy50aW1lZE91dFNlcnZpY2VJbnRlZ3JhdGlvbnNNZXRyaWNzID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljU2VydmljZUludGVncmF0aW9uc1RpbWVkT3V0KCk7XG5cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRHVyYXRpb25QNTBBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZER1cmF0aW9uUDUwQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmR1cmF0aW9uQWxhcm1GYWN0b3J5LmFkZER1cmF0aW9uQWxhcm0oXG4gICAgICAgIHRoaXMucDUwRHVyYXRpb25NZXRyaWMsXG4gICAgICAgIExhdGVuY3lUeXBlLlA1MCxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZHVyYXRpb25Bbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZER1cmF0aW9uUDkwQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGREdXJhdGlvblA5MEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5kdXJhdGlvbkFsYXJtRmFjdG9yeS5hZGREdXJhdGlvbkFsYXJtKFxuICAgICAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljLFxuICAgICAgICBMYXRlbmN5VHlwZS5QOTAsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGREdXJhdGlvblA5OUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkRHVyYXRpb25QOTlBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZHVyYXRpb25BbGFybUZhY3RvcnkuYWRkRHVyYXRpb25BbGFybShcbiAgICAgICAgdGhpcy5wOTlEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgTGF0ZW5jeVR5cGUuUDk5LFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5kdXJhdGlvbkFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRmFpbGVkU2VydmljZUludGVncmF0aW9uc0NvdW50QWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPVxuICAgICAgICBwcm9wcy5hZGRGYWlsZWRTZXJ2aWNlSW50ZWdyYXRpb25zQ291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZXJyb3JBbGFybUZhY3RvcnkuYWRkRXJyb3JDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLmZhaWxlZFNlcnZpY2VJbnRlZ3JhdGlvbnNNZXRyaWMsXG4gICAgICAgIEVycm9yVHlwZS5GQUlMVVJFLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRGYWlsZWRTZXJ2aWNlSW50ZWdyYXRpb25zUmF0ZUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID1cbiAgICAgICAgcHJvcHMuYWRkRmFpbGVkU2VydmljZUludGVncmF0aW9uc1JhdGVBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZXJyb3JBbGFybUZhY3RvcnkuYWRkRXJyb3JSYXRlQWxhcm0oXG4gICAgICAgIHRoaXMuZmFpbGVkU2VydmljZUludGVncmF0aW9uUmF0ZU1ldHJpYyxcbiAgICAgICAgRXJyb3JUeXBlLkZBSUxVUkUsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmVycm9yUmF0ZUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkVGltZWRPdXRTZXJ2aWNlSW50ZWdyYXRpb25zQ291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9XG4gICAgICAgIHByb3BzLmFkZFRpbWVkT3V0U2VydmljZUludGVncmF0aW9uc0NvdW50QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmVycm9yQWxhcm1GYWN0b3J5LmFkZEVycm9yQ291bnRBbGFybShcbiAgICAgICAgdGhpcy50aW1lZE91dFNlcnZpY2VJbnRlZ3JhdGlvbnNNZXRyaWNzLFxuICAgICAgICBFcnJvclR5cGUuVElNRURfT1VULFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuXG4gICAgcHJvcHMudXNlQ3JlYXRlZEFsYXJtcz8uY29uc3VtZSh0aGlzLmNyZWF0ZWRBbGFybXMoKSk7XG4gIH1cblxuICBzdW1tYXJ5V2lkZ2V0cygpOiBJV2lkZ2V0W10ge1xuICAgIHJldHVybiBbXG4gICAgICAvLyBUaXRsZVxuICAgICAgbmV3IE1vbml0b3JpbmdIZWFkZXJXaWRnZXQoe1xuICAgICAgICBmYW1pbHk6IFwiU3RhdGVzIFNlcnZpY2UgSW50ZWdyYXRpb25cIixcbiAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICB9KSxcbiAgICAgIC8vIER1cmF0aW9uXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJEdXJhdGlvblwiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5wNTBEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljLFxuICAgICAgICAgIHRoaXMucDk5RHVyYXRpb25NZXRyaWMsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIFN0YXR1c2VzXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJFeGVjdXRpb25zXCIsXG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlZFNlcnZpY2VJbnRlZ3JhdGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5zdGFydGVkU2VydmljZUludGVncmF0aW9uc01ldHJpYyxcbiAgICAgICAgICB0aGlzLnN1Y2NlZWRlZFNlcnZpY2VJbnRlZ3JhdGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5mYWlsZWRTZXJ2aWNlSW50ZWdyYXRpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMudGltZWRPdXRTZXJ2aWNlSW50ZWdyYXRpb25zTWV0cmljcyxcbiAgICAgICAgXSxcbiAgICAgICAgbGVmdFlBeGlzOiBDb3VudEF4aXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucyxcbiAgICAgIH0pLFxuICAgIF07XG4gIH1cblxuICB3aWRnZXRzKCk6IElXaWRnZXRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIC8vIFRpdGxlXG4gICAgICBuZXcgTW9uaXRvcmluZ0hlYWRlcldpZGdldCh7XG4gICAgICAgIGZhbWlseTogXCJTdGF0ZXMgU2VydmljZSBJbnRlZ3JhdGlvblwiLFxuICAgICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIH0pLFxuICAgICAgLy8gRHVyYXRpb25cbiAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoOiBRdWFydGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJEdXJhdGlvblwiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5wNTBEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5MER1cmF0aW9uTWV0cmljLFxuICAgICAgICAgIHRoaXMucDk5RHVyYXRpb25NZXRyaWMsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIFN0YXR1c2VzXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCxcbiAgICAgICAgdGl0bGU6IFwiRXhlY3V0aW9uc1wiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5zY2hlZHVsZWRTZXJ2aWNlSW50ZWdyYXRpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMuc3RhcnRlZFNlcnZpY2VJbnRlZ3JhdGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5zdWNjZWVkZWRTZXJ2aWNlSW50ZWdyYXRpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMuZmFpbGVkU2VydmljZUludGVncmF0aW9uc01ldHJpYyxcbiAgICAgICAgICB0aGlzLnRpbWVkT3V0U2VydmljZUludGVncmF0aW9uc01ldHJpY3MsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIEZhdWx0IFJhdGVcbiAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoOiBRdWFydGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJFcnJvcnMgKHJhdGUpXCIsXG4gICAgICAgIGxlZnQ6IFt0aGlzLmZhaWxlZFNlcnZpY2VJbnRlZ3JhdGlvblJhdGVNZXRyaWNdLFxuICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZXJyb3JSYXRlQW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICBdO1xuICB9XG59XG4iXX0=