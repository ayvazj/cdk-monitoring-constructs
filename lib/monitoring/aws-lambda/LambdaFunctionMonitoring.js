"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaFunctionMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const LambdaFunctionEnhancedMetricFactory_1 = require("./LambdaFunctionEnhancedMetricFactory");
const LambdaFunctionMetricFactory_1 = require("./LambdaFunctionMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class LambdaFunctionMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        this.namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            namedConstruct: props.lambdaFunction,
            fallbackConstructName: this.resolveFunctionName(props.lambdaFunction),
        });
        this.title = this.namingStrategy.resolveHumanReadableName();
        this.functionUrl = scope
            .createAwsConsoleUrlFactory()
            .getLambdaFunctionUrl(props.lambdaFunction.functionName);
        this.alarmFactory = this.createAlarmFactory(this.namingStrategy.resolveAlarmFriendlyName());
        this.errorAlarmFactory = new common_1.ErrorAlarmFactory(this.alarmFactory);
        this.latencyAlarmFactory = new common_1.LatencyAlarmFactory(this.alarmFactory);
        this.tpsAlarmFactory = new common_1.TpsAlarmFactory(this.alarmFactory);
        this.taskHealthAlarmFactory = new common_1.TaskHealthAlarmFactory(this.alarmFactory);
        this.ageAlarmFactory = new common_1.AgeAlarmFactory(this.alarmFactory);
        this.usageAlarmFactory = new common_1.UsageAlarmFactory(this.alarmFactory);
        this.latencyAnnotations = [];
        this.errorCountAnnotations = [];
        this.errorRateAnnotations = [];
        this.invocationCountAnnotations = [];
        this.invocationRateAnnotations = [];
        this.tpsAnnotations = [];
        this.cpuTotalTimeAnnotations = [];
        this.memoryUsageAnnotations = [];
        this.maxIteratorAgeAnnotations = [];
        this.metricFactory = new LambdaFunctionMetricFactory_1.LambdaFunctionMetricFactory(scope.createMetricFactory(), props);
        this.tpsMetric = this.metricFactory.metricTps();
        this.p50LatencyMetric = this.metricFactory.metricLatencyInMillis(common_1.LatencyType.P50);
        this.p90LatencyMetric = this.metricFactory.metricLatencyInMillis(common_1.LatencyType.P90);
        this.p99LatencyMetric = this.metricFactory.metricLatencyInMillis(common_1.LatencyType.P99);
        this.maxLatencyMetric = this.metricFactory.metricLatencyInMillis(common_1.LatencyType.MAX);
        this.faultCountMetric = this.metricFactory.metricFaultCount();
        this.faultRateMetric = this.metricFactory.metricFaultRate();
        this.invocationCountMetric = this.metricFactory.metricInvocationCount();
        this.throttlesCountMetric = this.metricFactory.metricThrottlesCount();
        this.throttlesRateMetric = this.metricFactory.metricThrottlesRate();
        this.concurrentExecutionsCountMetric =
            this.metricFactory.metricConcurrentExecutions();
        this.provisionedConcurrencySpilloverInvocationsCountMetric =
            this.metricFactory.metricProvisionedConcurrencySpilloverInvocations();
        this.provisionedConcurrencySpilloverInvocationsRateMetric =
            this.metricFactory.metricProvisionedConcurrencySpilloverRate();
        this.maxIteratorAgeMetric =
            this.metricFactory.metricMaxIteratorAgeInMillis();
        this.lambdaInsightsEnabled = props.lambdaInsightsEnabled ?? false;
        if (props.lambdaInsightsEnabled) {
            this.enhancedMetricFactory = new LambdaFunctionEnhancedMetricFactory_1.LambdaFunctionEnhancedMetricFactory(scope.createMetricFactory(), props.lambdaFunction);
            this.enhancedMonitoringMaxCpuTotalTimeMetric =
                this.enhancedMetricFactory.enhancedMetricMaxCpuTotalTime();
            this.enhancedMonitoringP90CpuTotalTimeMetric =
                this.enhancedMetricFactory.enhancedMetricP90CpuTotalTime();
            this.enhancedMonitoringAvgCpuTotalTimeMetric =
                this.enhancedMetricFactory.enhancedMetricAvgCpuTotalTime();
            this.enhancedMonitoringMaxMemoryUtilizationMetric =
                this.enhancedMetricFactory.enhancedMetricMaxMemoryUtilization();
            this.enhancedMonitoringP90MemoryUtilizationMetric =
                this.enhancedMetricFactory.enhancedMetricP90MemoryUtilization();
            this.enhancedMonitoringAvgMemoryUtilizationMetric =
                this.enhancedMetricFactory.enhancedMetricAvgMemoryUtilization();
            this.enhancedMetricFunctionCostMetric =
                this.enhancedMetricFactory.enhancedMetricFunctionCost();
            for (const disambiguator in props.addEnhancedMonitoringMaxCpuTotalTimeAlarm) {
                const alarmProps = props.addEnhancedMonitoringMaxCpuTotalTimeAlarm[disambiguator];
                const createdAlarm = this.latencyAlarmFactory.addDurationAlarm(
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                this.enhancedMonitoringMaxCpuTotalTimeMetric, 
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
                common_1.LatencyType.P100, alarmProps, disambiguator);
                this.cpuTotalTimeAnnotations.push(createdAlarm.annotation);
                this.addAlarm(createdAlarm);
            }
            for (const disambiguator in props.addEnhancedMonitoringP90CpuTotalTimeAlarm) {
                const alarmProps = props.addEnhancedMonitoringP90CpuTotalTimeAlarm[disambiguator];
                const createdAlarm = this.latencyAlarmFactory.addDurationAlarm(
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                this.enhancedMonitoringP90CpuTotalTimeMetric, 
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
                common_1.LatencyType.P90, alarmProps, disambiguator);
                this.cpuTotalTimeAnnotations.push(createdAlarm.annotation);
                this.addAlarm(createdAlarm);
            }
            for (const disambiguator in props.addEnhancedMonitoringAvgCpuTotalTimeAlarm) {
                const alarmProps = props.addEnhancedMonitoringAvgCpuTotalTimeAlarm[disambiguator];
                const createdAlarm = this.latencyAlarmFactory.addDurationAlarm(
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                this.enhancedMonitoringAvgCpuTotalTimeMetric, 
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
                common_1.LatencyType.AVERAGE, alarmProps, disambiguator);
                this.cpuTotalTimeAnnotations.push(createdAlarm.annotation);
                this.addAlarm(createdAlarm);
            }
            for (const disambiguator in props.addEnhancedMonitoringMaxMemoryUtilizationAlarm) {
                const alarmProps = props.addEnhancedMonitoringMaxMemoryUtilizationAlarm[disambiguator];
                const createdAlarm = this.usageAlarmFactory.addMaxMemoryUsagePercentAlarm(
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                this.enhancedMonitoringMaxMemoryUtilizationMetric, 
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
                alarmProps, disambiguator);
                this.memoryUsageAnnotations.push(createdAlarm.annotation);
                this.addAlarm(createdAlarm);
            }
            for (const disambiguator in props.addEnhancedMonitoringP90MemoryUtilizationAlarm) {
                const alarmProps = props.addEnhancedMonitoringP90MemoryUtilizationAlarm[disambiguator];
                const createdAlarm = this.usageAlarmFactory.addMemoryUsagePercentAlarm(
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                this.enhancedMonitoringP90MemoryUtilizationMetric, 
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
                alarmProps, common_1.UsageType.P90, disambiguator);
                this.memoryUsageAnnotations.push(createdAlarm.annotation);
                this.addAlarm(createdAlarm);
            }
            for (const disambiguator in props.addEnhancedMonitoringAvgMemoryUtilizationAlarm) {
                const alarmProps = props.addEnhancedMonitoringAvgMemoryUtilizationAlarm[disambiguator];
                const createdAlarm = this.usageAlarmFactory.addMemoryUsagePercentAlarm(
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                this.enhancedMonitoringAvgMemoryUtilizationMetric, 
                /* eslint-enable @typescript-eslint/no-non-null-assertion */
                alarmProps, common_1.UsageType.AVERAGE, disambiguator);
                this.memoryUsageAnnotations.push(createdAlarm.annotation);
                this.addAlarm(createdAlarm);
            }
        }
        for (const disambiguator in props.addLatencyP50Alarm) {
            const alarmProps = props.addLatencyP50Alarm[disambiguator];
            const createdAlarm = this.latencyAlarmFactory.addLatencyAlarm(this.p50LatencyMetric, common_1.LatencyType.P50, alarmProps, disambiguator);
            this.latencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addLatencyP90Alarm) {
            const alarmProps = props.addLatencyP90Alarm[disambiguator];
            const createdAlarm = this.latencyAlarmFactory.addLatencyAlarm(this.p90LatencyMetric, common_1.LatencyType.P90, alarmProps, disambiguator);
            this.latencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addLatencyP99Alarm) {
            const alarmProps = props.addLatencyP99Alarm[disambiguator];
            const createdAlarm = this.latencyAlarmFactory.addLatencyAlarm(this.p99LatencyMetric, common_1.LatencyType.P99, alarmProps, disambiguator);
            this.latencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addMaxLatencyAlarm) {
            const alarmProps = props.addMaxLatencyAlarm[disambiguator];
            const createdAlarm = this.latencyAlarmFactory.addLatencyAlarm(this.maxLatencyMetric, common_1.LatencyType.MAX, alarmProps, disambiguator);
            this.latencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addFaultCountAlarm) {
            const alarmProps = props.addFaultCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.faultCountMetric, common_1.ErrorType.FAULT, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addFaultRateAlarm) {
            const alarmProps = props.addFaultRateAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorRateAlarm(this.faultRateMetric, common_1.ErrorType.FAULT, alarmProps, disambiguator);
            this.errorRateAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addLowTpsAlarm) {
            const alarmProps = props.addLowTpsAlarm[disambiguator];
            const createdAlarm = this.tpsAlarmFactory.addMinTpsAlarm(this.tpsMetric, alarmProps, disambiguator);
            this.tpsAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addHighTpsAlarm) {
            const alarmProps = props.addHighTpsAlarm[disambiguator];
            const createdAlarm = this.tpsAlarmFactory.addMaxTpsAlarm(this.tpsMetric, alarmProps, disambiguator);
            this.tpsAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addThrottlesCountAlarm) {
            const alarmProps = props.addThrottlesCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.throttlesCountMetric, common_1.ErrorType.THROTTLED, alarmProps, disambiguator);
            this.invocationCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addThrottlesRateAlarm) {
            const alarmProps = props.addThrottlesRateAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorRateAlarm(this.throttlesRateMetric, common_1.ErrorType.THROTTLED, alarmProps, disambiguator);
            this.invocationRateAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addMinInvocationsCountAlarm) {
            const alarmProps = props.addMinInvocationsCountAlarm[disambiguator];
            const createdAlarm = this.usageAlarmFactory.addMinUsageCountAlarm(this.invocationCountMetric, alarmProps, disambiguator);
            this.invocationCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addConcurrentExecutionsCountAlarm) {
            const alarmProps = props.addConcurrentExecutionsCountAlarm[disambiguator];
            const createdAlarm = this.taskHealthAlarmFactory.addRunningTaskCountAlarm(this.concurrentExecutionsCountMetric, alarmProps, disambiguator);
            this.invocationCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addProvisionedConcurrencySpilloverInvocationsCountAlarm) {
            const alarmProps = props.addProvisionedConcurrencySpilloverInvocationsCountAlarm[disambiguator];
            const createdAlarm = this.taskHealthAlarmFactory.addRunningTaskCountAlarm(this.provisionedConcurrencySpilloverInvocationsCountMetric, alarmProps, disambiguator);
            this.invocationCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addProvisionedConcurrencySpilloverInvocationsRateAlarm) {
            const alarmProps = props.addProvisionedConcurrencySpilloverInvocationsRateAlarm[disambiguator];
            const createdAlarm = this.taskHealthAlarmFactory.addRunningTaskRateAlarm(this.provisionedConcurrencySpilloverInvocationsRateMetric, alarmProps, disambiguator);
            this.invocationRateAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addMaxIteratorAgeAlarm) {
            const alarmProps = props.addMaxIteratorAgeAlarm[disambiguator];
            const createdAlarm = this.ageAlarmFactory.addIteratorMaxAgeAlarm(this.maxIteratorAgeMetric, alarmProps, disambiguator);
            this.maxIteratorAgeAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        return [
            this.createTitleWidget(),
            this.createTpsWidget(common_1.ThirdWidth, common_1.DefaultSummaryWidgetHeight),
            this.createLatencyWidget(common_1.ThirdWidth, common_1.DefaultSummaryWidgetHeight),
            this.createErrorRateWidget(common_1.ThirdWidth, common_1.DefaultSummaryWidgetHeight),
        ];
    }
    widgets() {
        const widgets = [
            this.createTitleWidget(),
            new aws_cloudwatch_1.Row(this.createTpsWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight), this.createLatencyWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight), this.createErrorRateWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight), this.createRateWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight)),
            new aws_cloudwatch_1.Row(this.createInvocationWidget(common_1.ThirdWidth, common_1.DefaultGraphWidgetHeight), this.createIteratorAgeWidget(common_1.ThirdWidth, common_1.DefaultGraphWidgetHeight), this.createErrorCountWidget(common_1.ThirdWidth, common_1.DefaultGraphWidgetHeight)),
        ];
        if (this.lambdaInsightsEnabled) {
            widgets.push(new aws_cloudwatch_1.Row(this.createLambdaInsightsCpuWidget(common_1.ThirdWidth, common_1.DefaultGraphWidgetHeight), this.createLambdaInsightsMemoryWidget(common_1.ThirdWidth, common_1.DefaultGraphWidgetHeight), this.createLambdaInsightsFunctionCostWidget(common_1.ThirdWidth, common_1.DefaultGraphWidgetHeight)));
        }
        return widgets;
    }
    createTitleWidget() {
        return new dashboard_1.MonitoringHeaderWidget({
            family: "Lambda Function",
            title: this.title,
            goToLinkUrl: this.functionUrl,
        });
    }
    createTpsWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "TPS",
            left: [this.tpsMetric],
            leftYAxis: common_1.RateAxisFromZero,
            leftAnnotations: this.tpsAnnotations,
        });
    }
    createLatencyWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Latency",
            left: [
                this.p50LatencyMetric,
                this.p90LatencyMetric,
                this.p99LatencyMetric,
            ],
            leftYAxis: common_1.TimeAxisMillisFromZero,
            leftAnnotations: this.latencyAnnotations,
        });
    }
    createErrorCountWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Errors",
            left: [this.faultCountMetric],
            leftYAxis: common_1.CountAxisFromZero,
            leftAnnotations: this.errorCountAnnotations,
        });
    }
    createErrorRateWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Errors (rate)",
            left: [this.faultRateMetric],
            leftYAxis: common_1.RateAxisFromZero,
            leftAnnotations: this.errorRateAnnotations,
        });
    }
    createRateWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Rates",
            left: [
                this.throttlesRateMetric,
                this.provisionedConcurrencySpilloverInvocationsRateMetric,
            ],
            leftYAxis: common_1.RateAxisFromZero,
            leftAnnotations: this.invocationRateAnnotations,
        });
    }
    createInvocationWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Invocations",
            left: [
                this.invocationCountMetric,
                this.throttlesCountMetric,
                this.concurrentExecutionsCountMetric,
                this.provisionedConcurrencySpilloverInvocationsCountMetric,
            ],
            leftYAxis: common_1.CountAxisFromZero,
            leftAnnotations: this.invocationCountAnnotations,
        });
    }
    createIteratorAgeWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Iterator",
            left: [this.maxIteratorAgeMetric],
            leftYAxis: common_1.TimeAxisMillisFromZero,
            leftAnnotations: this.maxIteratorAgeAnnotations,
        });
    }
    createLambdaInsightsCpuWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "CPU Total Time",
            left: [
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                this.enhancedMonitoringMaxCpuTotalTimeMetric,
                this.enhancedMonitoringP90CpuTotalTimeMetric,
                this.enhancedMonitoringAvgCpuTotalTimeMetric,
            ],
            leftYAxis: common_1.TimeAxisMillisFromZero,
            leftAnnotations: this.cpuTotalTimeAnnotations,
        });
    }
    createLambdaInsightsMemoryWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Memory Utilization",
            left: [
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                this.enhancedMonitoringMaxMemoryUtilizationMetric,
                this.enhancedMonitoringP90MemoryUtilizationMetric,
                this.enhancedMonitoringAvgMemoryUtilizationMetric,
            ],
            leftYAxis: common_1.PercentageAxisFromZeroToHundred,
            leftAnnotations: this.memoryUsageAnnotations,
        });
    }
    createLambdaInsightsFunctionCostWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Function Cost",
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            left: [this.enhancedMetricFunctionCostMetric],
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
            leftYAxis: common_1.MegabyteMillisecondAxisFromZero,
        });
    }
    resolveFunctionName(lambdaFunction) {
        // try to take the name (if specified) instead of token
        return lambdaFunction.node.defaultChild?.functionName;
    }
}
exports.LambdaFunctionMonitoring = LambdaFunctionMonitoring;
_a = JSII_RTTI_SYMBOL_1;
LambdaFunctionMonitoring[_a] = { fqn: "cdk-monitoring-constructs.LambdaFunctionMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFtYmRhRnVuY3Rpb25Nb25pdG9yaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTGFtYmRhRnVuY3Rpb25Nb25pdG9yaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBS29DO0FBR3BDLCtGQUE0RjtBQUM1RiwrRUFHdUM7QUFDdkMseUNBbUNzQjtBQUN0QiwrQ0FHeUI7QUFrRXpCLE1BQWEsd0JBQXlCLFNBQVEsbUJBQVU7SUFpRHRELFlBQVksS0FBc0IsRUFBRSxLQUFvQztRQUN0RSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxvQ0FBd0IsQ0FBQztZQUNqRCxHQUFHLEtBQUs7WUFDUixjQUFjLEVBQUUsS0FBSyxDQUFDLGNBQWM7WUFDcEMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7U0FDdEUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLO2FBQ3JCLDBCQUEwQixFQUFFO2FBQzVCLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFM0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsQ0FDL0MsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLDBCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSw0QkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHdCQUFlLENB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RUFBRSxJQUFJLENBQUMsdUJBQXVCO1NBQzlDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQ0FBZ0MsQ0FBQyxLQUFhLEVBQUUsTUFBYztRQUM1RCxPQUFPLElBQUksNEJBQVcsQ0FBQztZQUNyQixLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsSUFBSSxFQUFFO2dCQUNKLDZEQUE2RDtnQkFDN0QsSUFBSSxDQUFDLDRDQUE2QztnQkFDbEQsSUFBSSxDQUFDLDRDQUE2QztnQkFDbEQsSUFBSSxDQUFDLDRDQUE2QzthQUVuRDtZQUNELFNBQVMsRUFBRSx3Q0FBK0I7WUFDMUMsZUFBZSxFQUFFLElBQUksQ0FBQyxzQkFBc0I7U0FDN0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNDQUFzQyxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ2xFLE9BQU8sSUFBSSw0QkFBVyxDQUFDO1lBQ3JCLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSyxFQUFFLGVBQWU7WUFDdEIsNkRBQTZEO1lBQzdELElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxnQ0FBaUMsQ0FBQztZQUM5Qyw0REFBNEQ7WUFDNUQsU0FBUyxFQUFFLHdDQUErQjtTQUMzQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsY0FBeUI7UUFDbkQsdURBQXVEO1FBQ3ZELE9BQVEsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUE0QixFQUFFLFlBQVksQ0FBQztJQUN6RSxDQUFDOztBQXZrQkgsNERBd2tCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdyYXBoV2lkZ2V0LFxuICBIb3Jpem9udGFsQW5ub3RhdGlvbixcbiAgSVdpZGdldCxcbiAgUm93LFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcbmltcG9ydCB7IENmbkZ1bmN0aW9uLCBJRnVuY3Rpb24gfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuXG5pbXBvcnQgeyBMYW1iZGFGdW5jdGlvbkVuaGFuY2VkTWV0cmljRmFjdG9yeSB9IGZyb20gXCIuL0xhbWJkYUZ1bmN0aW9uRW5oYW5jZWRNZXRyaWNGYWN0b3J5XCI7XG5pbXBvcnQge1xuICBMYW1iZGFGdW5jdGlvbk1ldHJpY0ZhY3RvcnksXG4gIExhbWJkYUZ1bmN0aW9uTWV0cmljRmFjdG9yeVByb3BzLFxufSBmcm9tIFwiLi9MYW1iZGFGdW5jdGlvbk1ldHJpY0ZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIEFnZUFsYXJtRmFjdG9yeSxcbiAgQWxhcm1GYWN0b3J5LFxuICBCYXNlTW9uaXRvcmluZ1Byb3BzLFxuICBDb3VudEF4aXNGcm9tWmVybyxcbiAgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCxcbiAgRHVyYXRpb25UaHJlc2hvbGQsXG4gIEVycm9yQWxhcm1GYWN0b3J5LFxuICBFcnJvckNvdW50VGhyZXNob2xkLFxuICBFcnJvclJhdGVUaHJlc2hvbGQsXG4gIEVycm9yVHlwZSxcbiAgSGlnaFRwc1RocmVzaG9sZCxcbiAgTGF0ZW5jeUFsYXJtRmFjdG9yeSxcbiAgTGF0ZW5jeVRocmVzaG9sZCxcbiAgTGF0ZW5jeVR5cGUsXG4gIExvd1Rwc1RocmVzaG9sZCxcbiAgTWF4QWdlVGhyZXNob2xkLFxuICBNZWdhYnl0ZU1pbGxpc2Vjb25kQXhpc0Zyb21aZXJvLFxuICBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICBNaW5Vc2FnZUNvdW50VGhyZXNob2xkLFxuICBNb25pdG9yaW5nLFxuICBNb25pdG9yaW5nU2NvcGUsXG4gIFBlcmNlbnRhZ2VBeGlzRnJvbVplcm9Ub0h1bmRyZWQsXG4gIFF1YXJ0ZXJXaWR0aCxcbiAgUmF0ZUF4aXNGcm9tWmVybyxcbiAgUnVubmluZ1Rhc2tDb3VudFRocmVzaG9sZCxcbiAgUnVubmluZ1Rhc2tSYXRlVGhyZXNob2xkLFxuICBUYXNrSGVhbHRoQWxhcm1GYWN0b3J5LFxuICBUaGlyZFdpZHRoLFxuICBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxuICBUcHNBbGFybUZhY3RvcnksXG4gIFVzYWdlQWxhcm1GYWN0b3J5LFxuICBVc2FnZVRocmVzaG9sZCxcbiAgVXNhZ2VUeXBlLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5pbXBvcnQge1xuICBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0LFxuICBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3ksXG59IGZyb20gXCIuLi8uLi9kYXNoYm9hcmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMYW1iZGFGdW5jdGlvbk1vbml0b3JpbmdPcHRpb25zIGV4dGVuZHMgQmFzZU1vbml0b3JpbmdQcm9wcyB7XG4gIHJlYWRvbmx5IGFkZExhdGVuY3lQNTBBbGFybT86IFJlY29yZDxzdHJpbmcsIExhdGVuY3lUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRMYXRlbmN5UDkwQWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBMYXRlbmN5VGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkTGF0ZW5jeVA5OUFsYXJtPzogUmVjb3JkPHN0cmluZywgTGF0ZW5jeVRocmVzaG9sZD47XG4gIHJlYWRvbmx5IGFkZE1heExhdGVuY3lBbGFybT86IFJlY29yZDxzdHJpbmcsIExhdGVuY3lUaHJlc2hvbGQ+O1xuXG4gIHJlYWRvbmx5IGFkZEZhdWx0Q291bnRBbGFybT86IFJlY29yZDxzdHJpbmcsIEVycm9yQ291bnRUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRGYXVsdFJhdGVBbGFybT86IFJlY29yZDxzdHJpbmcsIEVycm9yUmF0ZVRocmVzaG9sZD47XG5cbiAgcmVhZG9ubHkgYWRkTG93VHBzQWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBMb3dUcHNUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRIaWdoVHBzQWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBIaWdoVHBzVGhyZXNob2xkPjtcblxuICByZWFkb25seSBhZGRUaHJvdHRsZXNDb3VudEFsYXJtPzogUmVjb3JkPHN0cmluZywgRXJyb3JDb3VudFRocmVzaG9sZD47XG4gIHJlYWRvbmx5IGFkZFRocm90dGxlc1JhdGVBbGFybT86IFJlY29yZDxzdHJpbmcsIEVycm9yUmF0ZVRocmVzaG9sZD47XG5cbiAgcmVhZG9ubHkgYWRkTWluSW52b2NhdGlvbnNDb3VudEFsYXJtPzogUmVjb3JkPHN0cmluZywgTWluVXNhZ2VDb3VudFRocmVzaG9sZD47XG5cbiAgcmVhZG9ubHkgYWRkQ29uY3VycmVudEV4ZWN1dGlvbnNDb3VudEFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBSdW5uaW5nVGFza0NvdW50VGhyZXNob2xkXG4gID47XG4gIHJlYWRvbmx5IGFkZFByb3Zpc2lvbmVkQ29uY3VycmVuY3lTcGlsbG92ZXJJbnZvY2F0aW9uc0NvdW50QWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIFJ1bm5pbmdUYXNrQ291bnRUaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkUHJvdmlzaW9uZWRDb25jdXJyZW5jeVNwaWxsb3Zlckludm9jYXRpb25zUmF0ZUFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBSdW5uaW5nVGFza1JhdGVUaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkTWF4SXRlcmF0b3JBZ2VBbGFybT86IFJlY29yZDxzdHJpbmcsIE1heEFnZVRocmVzaG9sZD47XG5cbiAgLy8gRW5oYW5jZWQgQ1BVIG1ldHJpY3MgdGhhdCBhcmUgYWxsIHRpbWUtYmFzZWQgYW5kIG5vdCBwZXJjZW50IGJhc2VkXG4gIHJlYWRvbmx5IGFkZEVuaGFuY2VkTW9uaXRvcmluZ01heENwdVRvdGFsVGltZUFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBEdXJhdGlvblRocmVzaG9sZFxuICA+O1xuICByZWFkb25seSBhZGRFbmhhbmNlZE1vbml0b3JpbmdQOTBDcHVUb3RhbFRpbWVBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgRHVyYXRpb25UaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkRW5oYW5jZWRNb25pdG9yaW5nQXZnQ3B1VG90YWxUaW1lQWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIER1cmF0aW9uVGhyZXNob2xkXG4gID47XG5cbiAgLy8gRW5oYW5jZWQgbWVtb3J5IG1ldHJpY3MgdGhhdCBhcmUgcGVyY2VudC1iYXNlZFxuICByZWFkb25seSBhZGRFbmhhbmNlZE1vbml0b3JpbmdNYXhNZW1vcnlVdGlsaXphdGlvbkFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBVc2FnZVRocmVzaG9sZFxuICA+O1xuICByZWFkb25seSBhZGRFbmhhbmNlZE1vbml0b3JpbmdQOTBNZW1vcnlVdGlsaXphdGlvbkFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBVc2FnZVRocmVzaG9sZFxuICA+O1xuICByZWFkb25seSBhZGRFbmhhbmNlZE1vbml0b3JpbmdBdmdNZW1vcnlVdGlsaXphdGlvbkFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBVc2FnZVRocmVzaG9sZFxuICA+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExhbWJkYUZ1bmN0aW9uTW9uaXRvcmluZ1Byb3BzXG4gIGV4dGVuZHMgTGFtYmRhRnVuY3Rpb25NZXRyaWNGYWN0b3J5UHJvcHMsXG4gICAgTGFtYmRhRnVuY3Rpb25Nb25pdG9yaW5nT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgTGFtYmRhRnVuY3Rpb25Nb25pdG9yaW5nIGV4dGVuZHMgTW9uaXRvcmluZyB7XG4gIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGZ1bmN0aW9uVXJsPzogc3RyaW5nO1xuXG4gIHJlYWRvbmx5IG5hbWluZ1N0cmF0ZWd5OiBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3k7XG4gIHJlYWRvbmx5IG1ldHJpY0ZhY3Rvcnk6IExhbWJkYUZ1bmN0aW9uTWV0cmljRmFjdG9yeTtcbiAgcmVhZG9ubHkgYWxhcm1GYWN0b3J5OiBBbGFybUZhY3Rvcnk7XG4gIHJlYWRvbmx5IGVycm9yQWxhcm1GYWN0b3J5OiBFcnJvckFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgbGF0ZW5jeUFsYXJtRmFjdG9yeTogTGF0ZW5jeUFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgdHBzQWxhcm1GYWN0b3J5OiBUcHNBbGFybUZhY3Rvcnk7XG4gIHJlYWRvbmx5IHRhc2tIZWFsdGhBbGFybUZhY3Rvcnk6IFRhc2tIZWFsdGhBbGFybUZhY3Rvcnk7XG4gIHJlYWRvbmx5IGFnZUFsYXJtRmFjdG9yeTogQWdlQWxhcm1GYWN0b3J5O1xuICByZWFkb25seSB1c2FnZUFsYXJtRmFjdG9yeTogVXNhZ2VBbGFybUZhY3Rvcnk7XG5cbiAgcmVhZG9ubHkgbGF0ZW5jeUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBlcnJvckNvdW50QW5ub3RhdGlvbnM6IEhvcml6b250YWxBbm5vdGF0aW9uW107XG4gIHJlYWRvbmx5IGVycm9yUmF0ZUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBpbnZvY2F0aW9uQ291bnRBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgaW52b2NhdGlvblJhdGVBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgdHBzQW5ub3RhdGlvbnM6IEhvcml6b250YWxBbm5vdGF0aW9uW107XG4gIHJlYWRvbmx5IGNwdVRvdGFsVGltZUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBtZW1vcnlVc2FnZUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBtYXhJdGVyYXRvckFnZUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuXG4gIHJlYWRvbmx5IHRwc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcDUwTGF0ZW5jeU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcDkwTGF0ZW5jeU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcDk5TGF0ZW5jeU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgbWF4TGF0ZW5jeU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZmF1bHRDb3VudE1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZmF1bHRSYXRlTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBpbnZvY2F0aW9uQ291bnRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHRocm90dGxlc0NvdW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSB0aHJvdHRsZXNSYXRlTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBjb25jdXJyZW50RXhlY3V0aW9uc0NvdW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBwcm92aXNpb25lZENvbmN1cnJlbmN5U3BpbGxvdmVySW52b2NhdGlvbnNDb3VudE1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcHJvdmlzaW9uZWRDb25jdXJyZW5jeVNwaWxsb3Zlckludm9jYXRpb25zUmF0ZU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgbWF4SXRlcmF0b3JBZ2VNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG5cbiAgcmVhZG9ubHkgbGFtYmRhSW5zaWdodHNFbmFibGVkOiBib29sZWFuO1xuICByZWFkb25seSBlbmhhbmNlZE1ldHJpY0ZhY3Rvcnk/OiBMYW1iZGFGdW5jdGlvbkVuaGFuY2VkTWV0cmljRmFjdG9yeTtcbiAgcmVhZG9ubHkgZW5oYW5jZWRNb25pdG9yaW5nTWF4Q3B1VG90YWxUaW1lTWV0cmljPzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZW5oYW5jZWRNb25pdG9yaW5nUDkwQ3B1VG90YWxUaW1lTWV0cmljPzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZW5oYW5jZWRNb25pdG9yaW5nQXZnQ3B1VG90YWxUaW1lTWV0cmljPzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZW5oYW5jZWRNb25pdG9yaW5nTWF4TWVtb3J5VXRpbGl6YXRpb25NZXRyaWM/OiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBlbmhhbmNlZE1vbml0b3JpbmdQOTBNZW1vcnlVdGlsaXphdGlvbk1ldHJpYz86IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGVuaGFuY2VkTW9uaXRvcmluZ0F2Z01lbW9yeVV0aWxpemF0aW9uTWV0cmljPzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgZW5oYW5jZWRNZXRyaWNGdW5jdGlvbkNvc3RNZXRyaWM/OiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBNb25pdG9yaW5nU2NvcGUsIHByb3BzOiBMYW1iZGFGdW5jdGlvbk1vbml0b3JpbmdQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBwcm9wcyk7XG5cbiAgICB0aGlzLm5hbWluZ1N0cmF0ZWd5ID0gbmV3IE1vbml0b3JpbmdOYW1pbmdTdHJhdGVneSh7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIG5hbWVkQ29uc3RydWN0OiBwcm9wcy5sYW1iZGFGdW5jdGlvbixcbiAgICAgIGZhbGxiYWNrQ29uc3RydWN0TmFtZTogdGhpcy5yZXNvbHZlRnVuY3Rpb25OYW1lKHByb3BzLmxhbWJkYUZ1bmN0aW9uKSxcbiAgICB9KTtcblxuICAgIHRoaXMudGl0bGUgPSB0aGlzLm5hbWluZ1N0cmF0ZWd5LnJlc29sdmVIdW1hblJlYWRhYmxlTmFtZSgpO1xuICAgIHRoaXMuZnVuY3Rpb25VcmwgPSBzY29wZVxuICAgICAgLmNyZWF0ZUF3c0NvbnNvbGVVcmxGYWN0b3J5KClcbiAgICAgIC5nZXRMYW1iZGFGdW5jdGlvblVybChwcm9wcy5sYW1iZGFGdW5jdGlvbi5mdW5jdGlvbk5hbWUpO1xuXG4gICAgdGhpcy5hbGFybUZhY3RvcnkgPSB0aGlzLmNyZWF0ZUFsYXJtRmFjdG9yeShcbiAgICAgIHRoaXMubmFtaW5nU3RyYXRlZ3kucmVzb2x2ZUFsYXJtRnJpZW5kbHlOYW1lKClcbiAgICApO1xuICAgIHRoaXMuZXJyb3JBbGFybUZhY3RvcnkgPSBuZXcgRXJyb3JBbGFybUZhY3RvcnkodGhpcy5hbGFybUZhY3RvcnkpO1xuICAgIHRoaXMubGF0ZW5jeUFsYXJtRmFjdG9yeSA9IG5ldyBMYXRlbmN5QWxhcm1GYWN0b3J5KHRoaXMuYWxhcm1GYWN0b3J5KTtcbiAgICB0aGlzLnRwc0FsYXJtRmFjdG9yeSA9IG5ldyBUcHNBbGFybUZhY3RvcnkodGhpcy5hbGFybUZhY3RvcnkpO1xuICAgIHRoaXMudGFza0hlYWx0aEFsYXJtRmFjdG9yeSA9IG5ldyBUYXNrSGVhbHRoQWxhcm1GYWN0b3J5KHRoaXMuYWxhcm1GYWN0b3J5KTtcbiAgICB0aGlzLmFnZUFsYXJtRmFjdG9yeSA9IG5ldyBBZ2VBbGFybUZhY3RvcnkodGhpcy5hbGFybUZhY3RvcnkpO1xuICAgIHRoaXMudXNhZ2VBbGFybUZhY3RvcnkgPSBuZXcgVXNhZ2VBbGFybUZhY3RvcnkodGhpcy5hbGFybUZhY3RvcnkpO1xuXG4gICAgdGhpcy5sYXRlbmN5QW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMuZXJyb3JSYXRlQW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmludm9jYXRpb25Db3VudEFubm90YXRpb25zID0gW107XG4gICAgdGhpcy5pbnZvY2F0aW9uUmF0ZUFubm90YXRpb25zID0gW107XG4gICAgdGhpcy50cHNBbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMuY3B1VG90YWxUaW1lQW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLm1lbW9yeVVzYWdlQW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLm1heEl0ZXJhdG9yQWdlQW5ub3RhdGlvbnMgPSBbXTtcblxuICAgIHRoaXMubWV0cmljRmFjdG9yeSA9IG5ldyBMYW1iZGFGdW5jdGlvbk1ldHJpY0ZhY3RvcnkoXG4gICAgICBzY29wZS5jcmVhdGVNZXRyaWNGYWN0b3J5KCksXG4gICAgICBwcm9wc1xuICAgICk7XG4gICAgdGhpcy50cHNNZXRyaWMgPSB0aGlzLm1ldHJpY0ZhY3RvcnkubWV0cmljVHBzKCk7XG4gICAgdGhpcy5wNTBMYXRlbmN5TWV0cmljID0gdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY0xhdGVuY3lJbk1pbGxpcyhcbiAgICAgIExhdGVuY3lUeXBlLlA1MFxuICAgICk7XG4gICAgdGhpcy5wOTBMYXRlbmN5TWV0cmljID0gdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY0xhdGVuY3lJbk1pbGxpcyhcbiAgICAgIExhdGVuY3lUeXBlLlA5MFxuICAgICk7XG4gICAgdGhpcy5wOTlMYXRlbmN5TWV0cmljID0gdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY0xhdGVuY3lJbk1pbGxpcyhcbiAgICAgIExhdGVuY3lUeXBlLlA5OVxuICAgICk7XG4gICAgdGhpcy5tYXhMYXRlbmN5TWV0cmljID0gdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY0xhdGVuY3lJbk1pbGxpcyhcbiAgICAgIExhdGVuY3lUeXBlLk1BWFxuICAgICk7XG4gICAgdGhpcy5mYXVsdENvdW50TWV0cmljID0gdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY0ZhdWx0Q291bnQoKTtcbiAgICB0aGlzLmZhdWx0UmF0ZU1ldHJpYyA9IHRoaXMubWV0cmljRmFjdG9yeS5tZXRyaWNGYXVsdFJhdGUoKTtcbiAgICB0aGlzLmludm9jYXRpb25Db3VudE1ldHJpYyA9IHRoaXMubWV0cmljRmFjdG9yeS5tZXRyaWNJbnZvY2F0aW9uQ291bnQoKTtcbiAgICB0aGlzLnRocm90dGxlc0NvdW50TWV0cmljID0gdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY1Rocm90dGxlc0NvdW50KCk7XG4gICAgdGhpcy50aHJvdHRsZXNSYXRlTWV0cmljID0gdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY1Rocm90dGxlc1JhdGUoKTtcbiAgICB0aGlzLmNvbmN1cnJlbnRFeGVjdXRpb25zQ291bnRNZXRyaWMgPVxuICAgICAgdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY0NvbmN1cnJlbnRFeGVjdXRpb25zKCk7XG4gICAgdGhpcy5wcm92aXNpb25lZENvbmN1cnJlbmN5U3BpbGxvdmVySW52b2NhdGlvbnNDb3VudE1ldHJpYyA9XG4gICAgICB0aGlzLm1ldHJpY0ZhY3RvcnkubWV0cmljUHJvdmlzaW9uZWRDb25jdXJyZW5jeVNwaWxsb3Zlckludm9jYXRpb25zKCk7XG4gICAgdGhpcy5wcm92aXNpb25lZENvbmN1cnJlbmN5U3BpbGxvdmVySW52b2NhdGlvbnNSYXRlTWV0cmljID1cbiAgICAgIHRoaXMubWV0cmljRmFjdG9yeS5tZXRyaWNQcm92aXNpb25lZENvbmN1cnJlbmN5U3BpbGxvdmVyUmF0ZSgpO1xuICAgIHRoaXMubWF4SXRlcmF0b3JBZ2VNZXRyaWMgPVxuICAgICAgdGhpcy5tZXRyaWNGYWN0b3J5Lm1ldHJpY01heEl0ZXJhdG9yQWdlSW5NaWxsaXMoKTtcblxuICAgIHRoaXMubGFtYmRhSW5zaWdodHNFbmFibGVkID0gcHJvcHMubGFtYmRhSW5zaWdodHNFbmFibGVkID8/IGZhbHNlO1xuICAgIGlmIChwcm9wcy5sYW1iZGFJbnNpZ2h0c0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuZW5oYW5jZWRNZXRyaWNGYWN0b3J5ID0gbmV3IExhbWJkYUZ1bmN0aW9uRW5oYW5jZWRNZXRyaWNGYWN0b3J5KFxuICAgICAgICBzY29wZS5jcmVhdGVNZXRyaWNGYWN0b3J5KCksXG4gICAgICAgIHByb3BzLmxhbWJkYUZ1bmN0aW9uXG4gICAgICApO1xuICAgICAgdGhpcy5lbmhhbmNlZE1vbml0b3JpbmdNYXhDcHVUb3RhbFRpbWVNZXRyaWMgPVxuICAgICAgICB0aGlzLmVuaGFuY2VkTWV0cmljRmFjdG9yeS5lbmhhbmNlZE1ldHJpY01heENwdVRvdGFsVGltZSgpO1xuICAgICAgdGhpcy5lbmhhbmNlZE1vbml0b3JpbmdQOTBDcHVUb3RhbFRpbWVNZXRyaWMgPVxuICAgICAgICB0aGlzLmVuaGFuY2VkTWV0cmljRmFjdG9yeS5lbmhhbmNlZE1ldHJpY1A5MENwdVRvdGFsVGltZSgpO1xuICAgICAgdGhpcy5lbmhhbmNlZE1vbml0b3JpbmdBdmdDcHVUb3RhbFRpbWVNZXRyaWMgPVxuICAgICAgICB0aGlzLmVuaGFuY2VkTWV0cmljRmFjdG9yeS5lbmhhbmNlZE1ldHJpY0F2Z0NwdVRvdGFsVGltZSgpO1xuICAgICAgdGhpcy5lbmhhbmNlZE1vbml0b3JpbmdNYXhNZW1vcnlVdGlsaXphdGlvbk1ldHJpYyA9XG4gICAgICAgIHRoaXMuZW5oYW5jZWRNZXRyaWNGYWN0b3J5LmVuaGFuY2VkTWV0cmljTWF4TWVtb3J5VXRpbGl6YXRpb24oKTtcbiAgICAgIHRoaXMuZW5oYW5jZWRNb25pdG9yaW5nUDkwTWVtb3J5VXRpbGl6YXRpb25NZXRyaWMgPVxuICAgICAgICB0aGlzLmVuaGFuY2VkTWV0cmljRmFjdG9yeS5lbmhhbmNlZE1ldHJpY1A5ME1lbW9yeVV0aWxpemF0aW9uKCk7XG4gICAgICB0aGlzLmVuaGFuY2VkTW9uaXRvcmluZ0F2Z01lbW9yeVV0aWxpemF0aW9uTWV0cmljID1cbiAgICAgICAgdGhpcy5lbmhhbmNlZE1ldHJpY0ZhY3RvcnkuZW5oYW5jZWRNZXRyaWNBdmdNZW1vcnlVdGlsaXphdGlvbigpO1xuICAgICAgdGhpcy5lbmhhbmNlZE1ldHJpY0Z1bmN0aW9uQ29zdE1ldHJpYyA9XG4gICAgICAgIHRoaXMuZW5oYW5jZWRNZXRyaWNGYWN0b3J5LmVuaGFuY2VkTWV0cmljRnVuY3Rpb25Db3N0KCk7XG5cbiAgICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRFbmhhbmNlZE1vbml0b3JpbmdNYXhDcHVUb3RhbFRpbWVBbGFybSkge1xuICAgICAgICBjb25zdCBhbGFybVByb3BzID1cbiAgICAgICAgICBwcm9wcy5hZGRFbmhhbmNlZE1vbml0b3JpbmdNYXhDcHVUb3RhbFRpbWVBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5sYXRlbmN5QWxhcm1GYWN0b3J5LmFkZER1cmF0aW9uQWxhcm0oXG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuICAgICAgICAgIHRoaXMuZW5oYW5jZWRNb25pdG9yaW5nTWF4Q3B1VG90YWxUaW1lTWV0cmljISxcbiAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgICBMYXRlbmN5VHlwZS5QMTAwLFxuICAgICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNwdVRvdGFsVGltZUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRW5oYW5jZWRNb25pdG9yaW5nUDkwQ3B1VG90YWxUaW1lQWxhcm0pIHtcbiAgICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9XG4gICAgICAgICAgcHJvcHMuYWRkRW5oYW5jZWRNb25pdG9yaW5nUDkwQ3B1VG90YWxUaW1lQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMubGF0ZW5jeUFsYXJtRmFjdG9yeS5hZGREdXJhdGlvbkFsYXJtKFxuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgICB0aGlzLmVuaGFuY2VkTW9uaXRvcmluZ1A5MENwdVRvdGFsVGltZU1ldHJpYyEsXG4gICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4gICAgICAgICAgTGF0ZW5jeVR5cGUuUDkwLFxuICAgICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNwdVRvdGFsVGltZUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRW5oYW5jZWRNb25pdG9yaW5nQXZnQ3B1VG90YWxUaW1lQWxhcm0pIHtcbiAgICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9XG4gICAgICAgICAgcHJvcHMuYWRkRW5oYW5jZWRNb25pdG9yaW5nQXZnQ3B1VG90YWxUaW1lQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMubGF0ZW5jeUFsYXJtRmFjdG9yeS5hZGREdXJhdGlvbkFsYXJtKFxuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgICB0aGlzLmVuaGFuY2VkTW9uaXRvcmluZ0F2Z0NwdVRvdGFsVGltZU1ldHJpYyEsXG4gICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4gICAgICAgICAgTGF0ZW5jeVR5cGUuQVZFUkFHRSxcbiAgICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jcHVUb3RhbFRpbWVBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZEVuaGFuY2VkTW9uaXRvcmluZ01heE1lbW9yeVV0aWxpemF0aW9uQWxhcm0pIHtcbiAgICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9XG4gICAgICAgICAgcHJvcHMuYWRkRW5oYW5jZWRNb25pdG9yaW5nTWF4TWVtb3J5VXRpbGl6YXRpb25BbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID1cbiAgICAgICAgICB0aGlzLnVzYWdlQWxhcm1GYWN0b3J5LmFkZE1heE1lbW9yeVVzYWdlUGVyY2VudEFsYXJtKFxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuICAgICAgICAgICAgdGhpcy5lbmhhbmNlZE1vbml0b3JpbmdNYXhNZW1vcnlVdGlsaXphdGlvbk1ldHJpYyEsXG4gICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICAgICAgKTtcbiAgICAgICAgdGhpcy5tZW1vcnlVc2FnZUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRW5oYW5jZWRNb25pdG9yaW5nUDkwTWVtb3J5VXRpbGl6YXRpb25BbGFybSkge1xuICAgICAgICBjb25zdCBhbGFybVByb3BzID1cbiAgICAgICAgICBwcm9wcy5hZGRFbmhhbmNlZE1vbml0b3JpbmdQOTBNZW1vcnlVdGlsaXphdGlvbkFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLnVzYWdlQWxhcm1GYWN0b3J5LmFkZE1lbW9yeVVzYWdlUGVyY2VudEFsYXJtKFxuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgICB0aGlzLmVuaGFuY2VkTW9uaXRvcmluZ1A5ME1lbW9yeVV0aWxpemF0aW9uTWV0cmljISxcbiAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICAgIFVzYWdlVHlwZS5QOTAsXG4gICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICApO1xuICAgICAgICB0aGlzLm1lbW9yeVVzYWdlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRFbmhhbmNlZE1vbml0b3JpbmdBdmdNZW1vcnlVdGlsaXphdGlvbkFsYXJtKSB7XG4gICAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPVxuICAgICAgICAgIHByb3BzLmFkZEVuaGFuY2VkTW9uaXRvcmluZ0F2Z01lbW9yeVV0aWxpemF0aW9uQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMudXNhZ2VBbGFybUZhY3RvcnkuYWRkTWVtb3J5VXNhZ2VQZXJjZW50QWxhcm0oXG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuICAgICAgICAgIHRoaXMuZW5oYW5jZWRNb25pdG9yaW5nQXZnTWVtb3J5VXRpbGl6YXRpb25NZXRyaWMhLFxuICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuICAgICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgICAgVXNhZ2VUeXBlLkFWRVJBR0UsXG4gICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICApO1xuICAgICAgICB0aGlzLm1lbW9yeVVzYWdlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkTGF0ZW5jeVA1MEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkTGF0ZW5jeVA1MEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5sYXRlbmN5QWxhcm1GYWN0b3J5LmFkZExhdGVuY3lBbGFybShcbiAgICAgICAgdGhpcy5wNTBMYXRlbmN5TWV0cmljLFxuICAgICAgICBMYXRlbmN5VHlwZS5QNTAsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmxhdGVuY3lBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZExhdGVuY3lQOTBBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZExhdGVuY3lQOTBBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMubGF0ZW5jeUFsYXJtRmFjdG9yeS5hZGRMYXRlbmN5QWxhcm0oXG4gICAgICAgIHRoaXMucDkwTGF0ZW5jeU1ldHJpYyxcbiAgICAgICAgTGF0ZW5jeVR5cGUuUDkwLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5sYXRlbmN5QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRMYXRlbmN5UDk5QWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGRMYXRlbmN5UDk5QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmxhdGVuY3lBbGFybUZhY3RvcnkuYWRkTGF0ZW5jeUFsYXJtKFxuICAgICAgICB0aGlzLnA5OUxhdGVuY3lNZXRyaWMsXG4gICAgICAgIExhdGVuY3lUeXBlLlA5OSxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMubGF0ZW5jeUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkTWF4TGF0ZW5jeUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkTWF4TGF0ZW5jeUFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5sYXRlbmN5QWxhcm1GYWN0b3J5LmFkZExhdGVuY3lBbGFybShcbiAgICAgICAgdGhpcy5tYXhMYXRlbmN5TWV0cmljLFxuICAgICAgICBMYXRlbmN5VHlwZS5NQVgsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmxhdGVuY3lBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRmF1bHRDb3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkRmF1bHRDb3VudEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5lcnJvckFsYXJtRmFjdG9yeS5hZGRFcnJvckNvdW50QWxhcm0oXG4gICAgICAgIHRoaXMuZmF1bHRDb3VudE1ldHJpYyxcbiAgICAgICAgRXJyb3JUeXBlLkZBVUxULFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRGYXVsdFJhdGVBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZEZhdWx0UmF0ZUFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5lcnJvckFsYXJtRmFjdG9yeS5hZGRFcnJvclJhdGVBbGFybShcbiAgICAgICAgdGhpcy5mYXVsdFJhdGVNZXRyaWMsXG4gICAgICAgIEVycm9yVHlwZS5GQVVMVCxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuZXJyb3JSYXRlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRMb3dUcHNBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZExvd1Rwc0FsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy50cHNBbGFybUZhY3RvcnkuYWRkTWluVHBzQWxhcm0oXG4gICAgICAgIHRoaXMudHBzTWV0cmljLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy50cHNBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZEhpZ2hUcHNBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZEhpZ2hUcHNBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMudHBzQWxhcm1GYWN0b3J5LmFkZE1heFRwc0FsYXJtKFxuICAgICAgICB0aGlzLnRwc01ldHJpYyxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMudHBzQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRUaHJvdHRsZXNDb3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkVGhyb3R0bGVzQ291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZXJyb3JBbGFybUZhY3RvcnkuYWRkRXJyb3JDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLnRocm90dGxlc0NvdW50TWV0cmljLFxuICAgICAgICBFcnJvclR5cGUuVEhST1RUTEVELFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5pbnZvY2F0aW9uQ291bnRBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZFRocm90dGxlc1JhdGVBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZFRocm90dGxlc1JhdGVBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuZXJyb3JBbGFybUZhY3RvcnkuYWRkRXJyb3JSYXRlQWxhcm0oXG4gICAgICAgIHRoaXMudGhyb3R0bGVzUmF0ZU1ldHJpYyxcbiAgICAgICAgRXJyb3JUeXBlLlRIUk9UVExFRCxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuaW52b2NhdGlvblJhdGVBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZE1pbkludm9jYXRpb25zQ291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZE1pbkludm9jYXRpb25zQ291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMudXNhZ2VBbGFybUZhY3RvcnkuYWRkTWluVXNhZ2VDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLmludm9jYXRpb25Db3VudE1ldHJpYyxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuaW52b2NhdGlvbkNvdW50QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRDb25jdXJyZW50RXhlY3V0aW9uc0NvdW50QWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGRDb25jdXJyZW50RXhlY3V0aW9uc0NvdW50QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLnRhc2tIZWFsdGhBbGFybUZhY3RvcnkuYWRkUnVubmluZ1Rhc2tDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLmNvbmN1cnJlbnRFeGVjdXRpb25zQ291bnRNZXRyaWMsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmludm9jYXRpb25Db3VudEFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkUHJvdmlzaW9uZWRDb25jdXJyZW5jeVNwaWxsb3Zlckludm9jYXRpb25zQ291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9XG4gICAgICAgIHByb3BzLmFkZFByb3Zpc2lvbmVkQ29uY3VycmVuY3lTcGlsbG92ZXJJbnZvY2F0aW9uc0NvdW50QWxhcm1bXG4gICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICBdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy50YXNrSGVhbHRoQWxhcm1GYWN0b3J5LmFkZFJ1bm5pbmdUYXNrQ291bnRBbGFybShcbiAgICAgICAgdGhpcy5wcm92aXNpb25lZENvbmN1cnJlbmN5U3BpbGxvdmVySW52b2NhdGlvbnNDb3VudE1ldHJpYyxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuaW52b2NhdGlvbkNvdW50QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRQcm92aXNpb25lZENvbmN1cnJlbmN5U3BpbGxvdmVySW52b2NhdGlvbnNSYXRlQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPVxuICAgICAgICBwcm9wcy5hZGRQcm92aXNpb25lZENvbmN1cnJlbmN5U3BpbGxvdmVySW52b2NhdGlvbnNSYXRlQWxhcm1bXG4gICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICBdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy50YXNrSGVhbHRoQWxhcm1GYWN0b3J5LmFkZFJ1bm5pbmdUYXNrUmF0ZUFsYXJtKFxuICAgICAgICB0aGlzLnByb3Zpc2lvbmVkQ29uY3VycmVuY3lTcGlsbG92ZXJJbnZvY2F0aW9uc1JhdGVNZXRyaWMsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmludm9jYXRpb25SYXRlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRNYXhJdGVyYXRvckFnZUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkTWF4SXRlcmF0b3JBZ2VBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuYWdlQWxhcm1GYWN0b3J5LmFkZEl0ZXJhdG9yTWF4QWdlQWxhcm0oXG4gICAgICAgIHRoaXMubWF4SXRlcmF0b3JBZ2VNZXRyaWMsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLm1heEl0ZXJhdG9yQWdlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuXG4gICAgcHJvcHMudXNlQ3JlYXRlZEFsYXJtcz8uY29uc3VtZSh0aGlzLmNyZWF0ZWRBbGFybXMoKSk7XG4gIH1cblxuICBzdW1tYXJ5V2lkZ2V0cygpOiBJV2lkZ2V0W10ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNyZWF0ZVRpdGxlV2lkZ2V0KCksXG4gICAgICB0aGlzLmNyZWF0ZVRwc1dpZGdldChUaGlyZFdpZHRoLCBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCksXG4gICAgICB0aGlzLmNyZWF0ZUxhdGVuY3lXaWRnZXQoVGhpcmRXaWR0aCwgRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQpLFxuICAgICAgdGhpcy5jcmVhdGVFcnJvclJhdGVXaWRnZXQoVGhpcmRXaWR0aCwgRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQpLFxuICAgIF07XG4gIH1cblxuICB3aWRnZXRzKCk6IElXaWRnZXRbXSB7XG4gICAgY29uc3Qgd2lkZ2V0cyA9IFtcbiAgICAgIHRoaXMuY3JlYXRlVGl0bGVXaWRnZXQoKSxcbiAgICAgIG5ldyBSb3coXG4gICAgICAgIHRoaXMuY3JlYXRlVHBzV2lkZ2V0KFF1YXJ0ZXJXaWR0aCwgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0KSxcbiAgICAgICAgdGhpcy5jcmVhdGVMYXRlbmN5V2lkZ2V0KFF1YXJ0ZXJXaWR0aCwgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0KSxcbiAgICAgICAgdGhpcy5jcmVhdGVFcnJvclJhdGVXaWRnZXQoUXVhcnRlcldpZHRoLCBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQpLFxuICAgICAgICB0aGlzLmNyZWF0ZVJhdGVXaWRnZXQoUXVhcnRlcldpZHRoLCBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQpXG4gICAgICApLFxuICAgICAgbmV3IFJvdyhcbiAgICAgICAgdGhpcy5jcmVhdGVJbnZvY2F0aW9uV2lkZ2V0KFRoaXJkV2lkdGgsIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCksXG4gICAgICAgIHRoaXMuY3JlYXRlSXRlcmF0b3JBZ2VXaWRnZXQoVGhpcmRXaWR0aCwgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0KSxcbiAgICAgICAgdGhpcy5jcmVhdGVFcnJvckNvdW50V2lkZ2V0KFRoaXJkV2lkdGgsIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodClcbiAgICAgICksXG4gICAgXTtcblxuICAgIGlmICh0aGlzLmxhbWJkYUluc2lnaHRzRW5hYmxlZCkge1xuICAgICAgd2lkZ2V0cy5wdXNoKFxuICAgICAgICBuZXcgUm93KFxuICAgICAgICAgIHRoaXMuY3JlYXRlTGFtYmRhSW5zaWdodHNDcHVXaWRnZXQoXG4gICAgICAgICAgICBUaGlyZFdpZHRoLFxuICAgICAgICAgICAgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0XG4gICAgICAgICAgKSxcbiAgICAgICAgICB0aGlzLmNyZWF0ZUxhbWJkYUluc2lnaHRzTWVtb3J5V2lkZ2V0KFxuICAgICAgICAgICAgVGhpcmRXaWR0aCxcbiAgICAgICAgICAgIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodFxuICAgICAgICAgICksXG4gICAgICAgICAgdGhpcy5jcmVhdGVMYW1iZGFJbnNpZ2h0c0Z1bmN0aW9uQ29zdFdpZGdldChcbiAgICAgICAgICAgIFRoaXJkV2lkdGgsXG4gICAgICAgICAgICBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHRcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpZGdldHM7XG4gIH1cblxuICBjcmVhdGVUaXRsZVdpZGdldCgpIHtcbiAgICByZXR1cm4gbmV3IE1vbml0b3JpbmdIZWFkZXJXaWRnZXQoe1xuICAgICAgZmFtaWx5OiBcIkxhbWJkYSBGdW5jdGlvblwiLFxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICBnb1RvTGlua1VybDogdGhpcy5mdW5jdGlvblVybCxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVRwc1dpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJUUFNcIixcbiAgICAgIGxlZnQ6IFt0aGlzLnRwc01ldHJpY10sXG4gICAgICBsZWZ0WUF4aXM6IFJhdGVBeGlzRnJvbVplcm8sXG4gICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMudHBzQW5ub3RhdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVMYXRlbmN5V2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIkxhdGVuY3lcIixcbiAgICAgIGxlZnQ6IFtcbiAgICAgICAgdGhpcy5wNTBMYXRlbmN5TWV0cmljLFxuICAgICAgICB0aGlzLnA5MExhdGVuY3lNZXRyaWMsXG4gICAgICAgIHRoaXMucDk5TGF0ZW5jeU1ldHJpYyxcbiAgICAgIF0sXG4gICAgICBsZWZ0WUF4aXM6IFRpbWVBeGlzTWlsbGlzRnJvbVplcm8sXG4gICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMubGF0ZW5jeUFubm90YXRpb25zLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlRXJyb3JDb3VudFdpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJFcnJvcnNcIixcbiAgICAgIGxlZnQ6IFt0aGlzLmZhdWx0Q291bnRNZXRyaWNdLFxuICAgICAgbGVmdFlBeGlzOiBDb3VudEF4aXNGcm9tWmVybyxcbiAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5lcnJvckNvdW50QW5ub3RhdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVFcnJvclJhdGVXaWRnZXQod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgdGl0bGU6IFwiRXJyb3JzIChyYXRlKVwiLFxuICAgICAgbGVmdDogW3RoaXMuZmF1bHRSYXRlTWV0cmljXSxcbiAgICAgIGxlZnRZQXhpczogUmF0ZUF4aXNGcm9tWmVybyxcbiAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5lcnJvclJhdGVBbm5vdGF0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVJhdGVXaWRnZXQod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgdGl0bGU6IFwiUmF0ZXNcIixcbiAgICAgIGxlZnQ6IFtcbiAgICAgICAgdGhpcy50aHJvdHRsZXNSYXRlTWV0cmljLFxuICAgICAgICB0aGlzLnByb3Zpc2lvbmVkQ29uY3VycmVuY3lTcGlsbG92ZXJJbnZvY2F0aW9uc1JhdGVNZXRyaWMsXG4gICAgICBdLFxuICAgICAgbGVmdFlBeGlzOiBSYXRlQXhpc0Zyb21aZXJvLFxuICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmludm9jYXRpb25SYXRlQW5ub3RhdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVJbnZvY2F0aW9uV2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIkludm9jYXRpb25zXCIsXG4gICAgICBsZWZ0OiBbXG4gICAgICAgIHRoaXMuaW52b2NhdGlvbkNvdW50TWV0cmljLFxuICAgICAgICB0aGlzLnRocm90dGxlc0NvdW50TWV0cmljLFxuICAgICAgICB0aGlzLmNvbmN1cnJlbnRFeGVjdXRpb25zQ291bnRNZXRyaWMsXG4gICAgICAgIHRoaXMucHJvdmlzaW9uZWRDb25jdXJyZW5jeVNwaWxsb3Zlckludm9jYXRpb25zQ291bnRNZXRyaWMsXG4gICAgICBdLFxuICAgICAgbGVmdFlBeGlzOiBDb3VudEF4aXNGcm9tWmVybyxcbiAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5pbnZvY2F0aW9uQ291bnRBbm5vdGF0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUl0ZXJhdG9yQWdlV2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIkl0ZXJhdG9yXCIsXG4gICAgICBsZWZ0OiBbdGhpcy5tYXhJdGVyYXRvckFnZU1ldHJpY10sXG4gICAgICBsZWZ0WUF4aXM6IFRpbWVBeGlzTWlsbGlzRnJvbVplcm8sXG4gICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMubWF4SXRlcmF0b3JBZ2VBbm5vdGF0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUxhbWJkYUluc2lnaHRzQ3B1V2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIkNQVSBUb3RhbCBUaW1lXCIsXG4gICAgICBsZWZ0OiBbXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgdGhpcy5lbmhhbmNlZE1vbml0b3JpbmdNYXhDcHVUb3RhbFRpbWVNZXRyaWMhLFxuICAgICAgICB0aGlzLmVuaGFuY2VkTW9uaXRvcmluZ1A5MENwdVRvdGFsVGltZU1ldHJpYyEsXG4gICAgICAgIHRoaXMuZW5oYW5jZWRNb25pdG9yaW5nQXZnQ3B1VG90YWxUaW1lTWV0cmljISxcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4gICAgICBdLFxuICAgICAgbGVmdFlBeGlzOiBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxuICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmNwdVRvdGFsVGltZUFubm90YXRpb25zLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlTGFtYmRhSW5zaWdodHNNZW1vcnlXaWRnZXQod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgdGl0bGU6IFwiTWVtb3J5IFV0aWxpemF0aW9uXCIsXG4gICAgICBsZWZ0OiBbXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgdGhpcy5lbmhhbmNlZE1vbml0b3JpbmdNYXhNZW1vcnlVdGlsaXphdGlvbk1ldHJpYyEsXG4gICAgICAgIHRoaXMuZW5oYW5jZWRNb25pdG9yaW5nUDkwTWVtb3J5VXRpbGl6YXRpb25NZXRyaWMhLFxuICAgICAgICB0aGlzLmVuaGFuY2VkTW9uaXRvcmluZ0F2Z01lbW9yeVV0aWxpemF0aW9uTWV0cmljISxcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4gICAgICBdLFxuICAgICAgbGVmdFlBeGlzOiBQZXJjZW50YWdlQXhpc0Zyb21aZXJvVG9IdW5kcmVkLFxuICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLm1lbW9yeVVzYWdlQW5ub3RhdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVMYW1iZGFJbnNpZ2h0c0Z1bmN0aW9uQ29zdFdpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJGdW5jdGlvbiBDb3N0XCIsXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4gICAgICBsZWZ0OiBbdGhpcy5lbmhhbmNlZE1ldHJpY0Z1bmN0aW9uQ29zdE1ldHJpYyFdLFxuICAgICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4gICAgICBsZWZ0WUF4aXM6IE1lZ2FieXRlTWlsbGlzZWNvbmRBeGlzRnJvbVplcm8sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVGdW5jdGlvbk5hbWUobGFtYmRhRnVuY3Rpb246IElGdW5jdGlvbik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgLy8gdHJ5IHRvIHRha2UgdGhlIG5hbWUgKGlmIHNwZWNpZmllZCkgaW5zdGVhZCBvZiB0b2tlblxuICAgIHJldHVybiAobGFtYmRhRnVuY3Rpb24ubm9kZS5kZWZhdWx0Q2hpbGQgYXMgQ2ZuRnVuY3Rpb24pPy5mdW5jdGlvbk5hbWU7XG4gIH1cbn1cbiJdfQ==