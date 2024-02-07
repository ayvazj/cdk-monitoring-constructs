"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepFunctionLambdaIntegrationMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const StepFunctionLambdaIntegrationMetricFactory_1 = require("./StepFunctionLambdaIntegrationMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class StepFunctionLambdaIntegrationMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            namedConstruct: props.lambdaFunction,
            fallbackConstructName: this.resolveFunctionName(props.lambdaFunction),
        });
        this.title = namingStrategy.resolveHumanReadableName();
        this.functionUrl = scope
            .createAwsConsoleUrlFactory()
            .getLambdaFunctionUrl(props.lambdaFunction.functionName);
        const alarmFactory = this.createAlarmFactory(namingStrategy.resolveAlarmFriendlyName());
        this.errorAlarmFactory = new common_1.ErrorAlarmFactory(alarmFactory);
        this.durationAlarmFactory = new common_1.LatencyAlarmFactory(alarmFactory);
        this.durationAnnotations = [];
        this.errorCountAnnotations = [];
        this.errorRateAnnotations = [];
        const metricFactory = new StepFunctionLambdaIntegrationMetricFactory_1.StepFunctionLambdaIntegrationMetricFactory(scope.createMetricFactory(), props);
        this.p50DurationMetric = metricFactory.metricFunctionRunTimeP50InMillis();
        this.p90DurationMetric = metricFactory.metricFunctionRunTimeP90InMillis();
        this.p99DurationMetric = metricFactory.metricFunctionRunTimeP99InMillis();
        this.scheduledFunctionsMetric = metricFactory.metricFunctionsScheduled();
        this.startedFunctionsMetric = metricFactory.metricFunctionsStarted();
        this.succeededFunctionsMetric = metricFactory.metricFunctionsSucceeded();
        this.failedFunctionsMetric = metricFactory.metricFunctionsFailed();
        this.failedFunctionRateMetric = metricFactory.metricFunctionsFailedRate();
        this.timedOutFunctionsMetrics = metricFactory.metricFunctionsTimedOut();
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
        for (const disambiguator in props.addFailedFunctionsCountAlarm) {
            const alarmProps = props.addFailedFunctionsCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.failedFunctionsMetric, common_1.ErrorType.FAILURE, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addFailedFunctionsRateAlarm) {
            const alarmProps = props.addFailedFunctionsRateAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorRateAlarm(this.failedFunctionRateMetric, common_1.ErrorType.FAILURE, alarmProps, disambiguator);
            this.errorRateAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addTimedOutFunctionsCountAlarm) {
            const alarmProps = props.addTimedOutFunctionsCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.timedOutFunctionsMetrics, common_1.ErrorType.TIMED_OUT, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "States Lambda Integration",
                title: this.title,
                goToLinkUrl: this.functionUrl,
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
                    this.scheduledFunctionsMetric,
                    this.startedFunctionsMetric,
                    this.succeededFunctionsMetric,
                    this.failedFunctionsMetric,
                    this.timedOutFunctionsMetrics,
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
                family: "States Lambda Integration",
                title: this.title,
                goToLinkUrl: this.functionUrl,
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
                    this.scheduledFunctionsMetric,
                    this.startedFunctionsMetric,
                    this.succeededFunctionsMetric,
                    this.failedFunctionsMetric,
                    this.timedOutFunctionsMetrics,
                ],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.errorCountAnnotations,
            }),
            // Fault Rate
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Errors (rate)",
                left: [this.failedFunctionRateMetric],
                leftAnnotations: this.errorRateAnnotations,
            }),
        ];
    }
    resolveFunctionName(lambdaFunction) {
        // try to take the name (if specified) instead of token
        return lambdaFunction.node.defaultChild?.functionName;
    }
}
exports.StepFunctionLambdaIntegrationMonitoring = StepFunctionLambdaIntegrationMonitoring;
_a = JSII_RTTI_SYMBOL_1;
StepFunctionLambdaIntegrationMonitoring[_a] = { fqn: "cdk-monitoring-constructs.StepFunctionLambdaIntegrationMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcEZ1bmN0aW9uTGFtYmRhSW50ZWdyYXRpb25Nb25pdG9yaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3RlcEZ1bmN0aW9uTGFtYmRhSW50ZWdyYXRpb25Nb25pdG9yaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBSW9DO0FBR3BDLDZHQUdzRDtBQUN0RCx5Q0FrQnNCO0FBQ3RCLCtDQUd5QjtBQWN6QixNQUFhLHVDQUF3QyxTQUFRLG1CQUFVO0lBcUJyRSxZQUNFLEtBQXNCLEVBQ3RCLEtBQW1EO1FBRW5ELEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxvQ0FBd0IsQ0FBQztZQUNsRCxHQUFHLEtBQUs7WUFDUixjQUFjLEVBQUUsS0FBSyxDQUFDLGNBQWM7WUFDcEMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7U0FDdEUsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUs7YUFDckIsMEJBQTBCLEVBQUU7YUFDNUIsb0JBQW9CLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUzRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQzFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUMxQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksMEJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksNEJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxD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RSxDQUFDOztBQTVOSCwwRkE2TkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHcmFwaFdpZGdldCxcbiAgSG9yaXpvbnRhbEFubm90YXRpb24sXG4gIElXaWRnZXQsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuaW1wb3J0IHsgSUZ1bmN0aW9uLCBDZm5GdW5jdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5cbmltcG9ydCB7XG4gIFN0ZXBGdW5jdGlvbkxhbWJkYUludGVncmF0aW9uTWV0cmljRmFjdG9yeSxcbiAgU3RlcEZ1bmN0aW9uTGFtYmRhSW50ZWdyYXRpb25NZXRyaWNGYWN0b3J5UHJvcHMsXG59IGZyb20gXCIuL1N0ZXBGdW5jdGlvbkxhbWJkYUludGVncmF0aW9uTWV0cmljRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgQmFzZU1vbml0b3JpbmdQcm9wcyxcbiAgQ291bnRBeGlzRnJvbVplcm8sXG4gIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCxcbiAgRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQsXG4gIER1cmF0aW9uVGhyZXNob2xkLFxuICBFcnJvckFsYXJtRmFjdG9yeSxcbiAgRXJyb3JDb3VudFRocmVzaG9sZCxcbiAgRXJyb3JSYXRlVGhyZXNob2xkLFxuICBFcnJvclR5cGUsXG4gIEhhbGZXaWR0aCxcbiAgTGF0ZW5jeUFsYXJtRmFjdG9yeSxcbiAgTGF0ZW5jeVR5cGUsXG4gIE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gIE1vbml0b3JpbmcsXG4gIE1vbml0b3JpbmdTY29wZSxcbiAgUXVhcnRlcldpZHRoLFxuICBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5pbXBvcnQge1xuICBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0LFxuICBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3ksXG59IGZyb20gXCIuLi8uLi9kYXNoYm9hcmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTdGVwRnVuY3Rpb25MYW1iZGFJbnRlZ3JhdGlvbk1vbml0b3JpbmdQcm9wc1xuICBleHRlbmRzIFN0ZXBGdW5jdGlvbkxhbWJkYUludGVncmF0aW9uTWV0cmljRmFjdG9yeVByb3BzLFxuICAgIEJhc2VNb25pdG9yaW5nUHJvcHMge1xuICByZWFkb25seSBhZGREdXJhdGlvblA1MEFsYXJtPzogUmVjb3JkPHN0cmluZywgRHVyYXRpb25UaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGREdXJhdGlvblA5MEFsYXJtPzogUmVjb3JkPHN0cmluZywgRHVyYXRpb25UaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGREdXJhdGlvblA5OUFsYXJtPzogUmVjb3JkPHN0cmluZywgRHVyYXRpb25UaHJlc2hvbGQ+O1xuXG4gIHJlYWRvbmx5IGFkZEZhaWxlZEZ1bmN0aW9uc0NvdW50QWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBFcnJvckNvdW50VGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkRmFpbGVkRnVuY3Rpb25zUmF0ZUFsYXJtPzogUmVjb3JkPHN0cmluZywgRXJyb3JSYXRlVGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkVGltZWRPdXRGdW5jdGlvbnNDb3VudEFsYXJtPzogUmVjb3JkPHN0cmluZywgRXJyb3JDb3VudFRocmVzaG9sZD47XG59XG5cbmV4cG9ydCBjbGFzcyBTdGVwRnVuY3Rpb25MYW1iZGFJbnRlZ3JhdGlvbk1vbml0b3JpbmcgZXh0ZW5kcyBNb25pdG9yaW5nIHtcbiAgcmVhZG9ubHkgdGl0bGU6IHN0cmluZztcbiAgcmVhZG9ubHkgZnVuY3Rpb25Vcmw/OiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgZXJyb3JBbGFybUZhY3Rvcnk6IEVycm9yQWxhcm1GYWN0b3J5O1xuICByZWFkb25seSBkdXJhdGlvbkFsYXJtRmFjdG9yeTogTGF0ZW5jeUFsYXJtRmFjdG9yeTtcblxuICByZWFkb25seSBkdXJhdGlvbkFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBlcnJvckNvdW50QW5ub3RhdGlvbnM6IEhvcml6b250YWxBbm5vdGF0aW9uW107XG4gIHJlYWRvbmx5IGVycm9yUmF0ZUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuXG4gIHJlYWRvbmx5IHA1MER1cmF0aW9uTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBwOTBEdXJhdGlvbk1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcDk5RHVyYXRpb25NZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHNjaGVkdWxlZEZ1bmN0aW9uc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgc3RhcnRlZEZ1bmN0aW9uc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgc3VjY2VlZGVkRnVuY3Rpb25zTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBmYWlsZWRGdW5jdGlvbnNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGZhaWxlZEZ1bmN0aW9uUmF0ZU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgdGltZWRPdXRGdW5jdGlvbnNNZXRyaWNzOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHNjb3BlOiBNb25pdG9yaW5nU2NvcGUsXG4gICAgcHJvcHM6IFN0ZXBGdW5jdGlvbkxhbWJkYUludGVncmF0aW9uTW9uaXRvcmluZ1Byb3BzXG4gICkge1xuICAgIHN1cGVyKHNjb3BlLCBwcm9wcyk7XG5cbiAgICBjb25zdCBuYW1pbmdTdHJhdGVneSA9IG5ldyBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3koe1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBuYW1lZENvbnN0cnVjdDogcHJvcHMubGFtYmRhRnVuY3Rpb24sXG4gICAgICBmYWxsYmFja0NvbnN0cnVjdE5hbWU6IHRoaXMucmVzb2x2ZUZ1bmN0aW9uTmFtZShwcm9wcy5sYW1iZGFGdW5jdGlvbiksXG4gICAgfSk7XG4gICAgdGhpcy50aXRsZSA9IG5hbWluZ1N0cmF0ZWd5LnJlc29sdmVIdW1hblJlYWRhYmxlTmFtZSgpO1xuICAgIHRoaXMuZnVuY3Rpb25VcmwgPSBzY29wZVxuICAgICAgLmNyZWF0ZUF3c0NvbnNvbGVVcmxGYWN0b3J5KClcbiAgICAgIC5nZXRMYW1iZGFGdW5jdGlvblVybChwcm9wcy5sYW1iZGFGdW5jdGlvbi5mdW5jdGlvbk5hbWUpO1xuXG4gICAgY29uc3QgYWxhcm1GYWN0b3J5ID0gdGhpcy5jcmVhdGVBbGFybUZhY3RvcnkoXG4gICAgICBuYW1pbmdTdHJhdGVneS5yZXNvbHZlQWxhcm1GcmllbmRseU5hbWUoKVxuICAgICk7XG4gICAgdGhpcy5lcnJvckFsYXJtRmFjdG9yeSA9IG5ldyBFcnJvckFsYXJtRmFjdG9yeShhbGFybUZhY3RvcnkpO1xuICAgIHRoaXMuZHVyYXRpb25BbGFybUZhY3RvcnkgPSBuZXcgTGF0ZW5jeUFsYXJtRmFjdG9yeShhbGFybUZhY3RvcnkpO1xuXG4gICAgdGhpcy5kdXJhdGlvbkFubm90YXRpb25zID0gW107XG4gICAgdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmVycm9yUmF0ZUFubm90YXRpb25zID0gW107XG5cbiAgICBjb25zdCBtZXRyaWNGYWN0b3J5ID0gbmV3IFN0ZXBGdW5jdGlvbkxhbWJkYUludGVncmF0aW9uTWV0cmljRmFjdG9yeShcbiAgICAgIHNjb3BlLmNyZWF0ZU1ldHJpY0ZhY3RvcnkoKSxcbiAgICAgIHByb3BzXG4gICAgKTtcbiAgICB0aGlzLnA1MER1cmF0aW9uTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNGdW5jdGlvblJ1blRpbWVQNTBJbk1pbGxpcygpO1xuICAgIHRoaXMucDkwRHVyYXRpb25NZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0Z1bmN0aW9uUnVuVGltZVA5MEluTWlsbGlzKCk7XG4gICAgdGhpcy5wOTlEdXJhdGlvbk1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRnVuY3Rpb25SdW5UaW1lUDk5SW5NaWxsaXMoKTtcbiAgICB0aGlzLnNjaGVkdWxlZEZ1bmN0aW9uc01ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRnVuY3Rpb25zU2NoZWR1bGVkKCk7XG4gICAgdGhpcy5zdGFydGVkRnVuY3Rpb25zTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNGdW5jdGlvbnNTdGFydGVkKCk7XG4gICAgdGhpcy5zdWNjZWVkZWRGdW5jdGlvbnNNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0Z1bmN0aW9uc1N1Y2NlZWRlZCgpO1xuICAgIHRoaXMuZmFpbGVkRnVuY3Rpb25zTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNGdW5jdGlvbnNGYWlsZWQoKTtcbiAgICB0aGlzLmZhaWxlZEZ1bmN0aW9uUmF0ZU1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljRnVuY3Rpb25zRmFpbGVkUmF0ZSgpO1xuICAgIHRoaXMudGltZWRPdXRGdW5jdGlvbnNNZXRyaWNzID0gbWV0cmljRmFjdG9yeS5tZXRyaWNGdW5jdGlvbnNUaW1lZE91dCgpO1xuXG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZER1cmF0aW9uUDUwQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGREdXJhdGlvblA1MEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5kdXJhdGlvbkFsYXJtRmFjdG9yeS5hZGREdXJhdGlvbkFsYXJtKFxuICAgICAgICB0aGlzLnA1MER1cmF0aW9uTWV0cmljLFxuICAgICAgICBMYXRlbmN5VHlwZS5QNTAsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmR1cmF0aW9uQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGREdXJhdGlvblA5MEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkRHVyYXRpb25QOTBBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZHVyYXRpb25BbGFybUZhY3RvcnkuYWRkRHVyYXRpb25BbGFybShcbiAgICAgICAgdGhpcy5wOTBEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgTGF0ZW5jeVR5cGUuUDkwLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5kdXJhdGlvbkFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRHVyYXRpb25QOTlBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZER1cmF0aW9uUDk5QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmR1cmF0aW9uQWxhcm1GYWN0b3J5LmFkZER1cmF0aW9uQWxhcm0oXG4gICAgICAgIHRoaXMucDk5RHVyYXRpb25NZXRyaWMsXG4gICAgICAgIExhdGVuY3lUeXBlLlA5OSxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZHVyYXRpb25Bbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZEZhaWxlZEZ1bmN0aW9uc0NvdW50QWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGRGYWlsZWRGdW5jdGlvbnNDb3VudEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5lcnJvckFsYXJtRmFjdG9yeS5hZGRFcnJvckNvdW50QWxhcm0oXG4gICAgICAgIHRoaXMuZmFpbGVkRnVuY3Rpb25zTWV0cmljLFxuICAgICAgICBFcnJvclR5cGUuRkFJTFVSRSxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRmFpbGVkRnVuY3Rpb25zUmF0ZUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkRmFpbGVkRnVuY3Rpb25zUmF0ZUFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5lcnJvckFsYXJtRmFjdG9yeS5hZGRFcnJvclJhdGVBbGFybShcbiAgICAgICAgdGhpcy5mYWlsZWRGdW5jdGlvblJhdGVNZXRyaWMsXG4gICAgICAgIEVycm9yVHlwZS5GQUlMVVJFLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5lcnJvclJhdGVBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZFRpbWVkT3V0RnVuY3Rpb25zQ291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZFRpbWVkT3V0RnVuY3Rpb25zQ291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZXJyb3JBbGFybUZhY3RvcnkuYWRkRXJyb3JDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLnRpbWVkT3V0RnVuY3Rpb25zTWV0cmljcyxcbiAgICAgICAgRXJyb3JUeXBlLlRJTUVEX09VVCxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cblxuICAgIHByb3BzLnVzZUNyZWF0ZWRBbGFybXM/LmNvbnN1bWUodGhpcy5jcmVhdGVkQWxhcm1zKCkpO1xuICB9XG5cbiAgc3VtbWFyeVdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgLy8gVGl0bGVcbiAgICAgIG5ldyBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0KHtcbiAgICAgICAgZmFtaWx5OiBcIlN0YXRlcyBMYW1iZGEgSW50ZWdyYXRpb25cIixcbiAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICAgIGdvVG9MaW5rVXJsOiB0aGlzLmZ1bmN0aW9uVXJsLFxuICAgICAgfSksXG4gICAgICAvLyBEdXJhdGlvblxuICAgICAgbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgd2lkdGg6IEhhbGZXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCxcbiAgICAgICAgdGl0bGU6IFwiRHVyYXRpb25cIixcbiAgICAgICAgbGVmdDogW1xuICAgICAgICAgIHRoaXMucDUwRHVyYXRpb25NZXRyaWMsXG4gICAgICAgICAgdGhpcy5wOTBEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5OUR1cmF0aW9uTWV0cmljLFxuICAgICAgICBdLFxuICAgICAgICBsZWZ0WUF4aXM6IFRpbWVBeGlzTWlsbGlzRnJvbVplcm8sXG4gICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5kdXJhdGlvbkFubm90YXRpb25zLFxuICAgICAgfSksXG4gICAgICAvLyBTdGF0dXNlc1xuICAgICAgbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgd2lkdGg6IEhhbGZXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCxcbiAgICAgICAgdGl0bGU6IFwiRXhlY3V0aW9uc1wiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5zY2hlZHVsZWRGdW5jdGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5zdGFydGVkRnVuY3Rpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMuc3VjY2VlZGVkRnVuY3Rpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMuZmFpbGVkRnVuY3Rpb25zTWV0cmljLFxuICAgICAgICAgIHRoaXMudGltZWRPdXRGdW5jdGlvbnNNZXRyaWNzLFxuICAgICAgICBdLFxuICAgICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zLFxuICAgICAgfSksXG4gICAgXTtcbiAgfVxuXG4gIHdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgLy8gVGl0bGVcbiAgICAgIG5ldyBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0KHtcbiAgICAgICAgZmFtaWx5OiBcIlN0YXRlcyBMYW1iZGEgSW50ZWdyYXRpb25cIixcbiAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICAgIGdvVG9MaW5rVXJsOiB0aGlzLmZ1bmN0aW9uVXJsLFxuICAgICAgfSksXG4gICAgICAvLyBEdXJhdGlvblxuICAgICAgbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgd2lkdGg6IFF1YXJ0ZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gICAgICAgIHRpdGxlOiBcIkR1cmF0aW9uXCIsXG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICB0aGlzLnA1MER1cmF0aW9uTWV0cmljLFxuICAgICAgICAgIHRoaXMucDkwRHVyYXRpb25NZXRyaWMsXG4gICAgICAgICAgdGhpcy5wOTlEdXJhdGlvbk1ldHJpYyxcbiAgICAgICAgXSxcbiAgICAgICAgbGVmdFlBeGlzOiBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxuICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZHVyYXRpb25Bbm5vdGF0aW9ucyxcbiAgICAgIH0pLFxuICAgICAgLy8gU3RhdHVzZXNcbiAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoOiBIYWxmV2lkdGgsXG4gICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJFeGVjdXRpb25zXCIsXG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlZEZ1bmN0aW9uc01ldHJpYyxcbiAgICAgICAgICB0aGlzLnN0YXJ0ZWRGdW5jdGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5zdWNjZWVkZWRGdW5jdGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy5mYWlsZWRGdW5jdGlvbnNNZXRyaWMsXG4gICAgICAgICAgdGhpcy50aW1lZE91dEZ1bmN0aW9uc01ldHJpY3MsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIEZhdWx0IFJhdGVcbiAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoOiBRdWFydGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJFcnJvcnMgKHJhdGUpXCIsXG4gICAgICAgIGxlZnQ6IFt0aGlzLmZhaWxlZEZ1bmN0aW9uUmF0ZU1ldHJpY10sXG4gICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5lcnJvclJhdGVBbm5vdGF0aW9ucyxcbiAgICAgIH0pLFxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVGdW5jdGlvbk5hbWUobGFtYmRhRnVuY3Rpb246IElGdW5jdGlvbik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgLy8gdHJ5IHRvIHRha2UgdGhlIG5hbWUgKGlmIHNwZWNpZmllZCkgaW5zdGVhZCBvZiB0b2tlblxuICAgIHJldHVybiAobGFtYmRhRnVuY3Rpb24ubm9kZS5kZWZhdWx0Q2hpbGQgYXMgQ2ZuRnVuY3Rpb24pPy5mdW5jdGlvbk5hbWU7XG4gIH1cbn1cbiJdfQ==