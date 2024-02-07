"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSearchClusterMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const OpenSearchClusterMetricFactory_1 = require("./OpenSearchClusterMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class OpenSearchClusterMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            namedConstruct: props.domain,
        });
        this.title = namingStrategy.resolveHumanReadableName();
        this.url = props.domain.domainName
            ? scope
                .createAwsConsoleUrlFactory()
                .getOpenSearchClusterUrl(props.domain.domainName)
            : undefined;
        const alarmPrefix = namingStrategy.resolveAlarmFriendlyName();
        const indexingAlarmPrefix = `${alarmPrefix}-Indexing`;
        const searchAlarmPrefix = `${alarmPrefix}-Search`;
        const clusterAlarmPrefix = `${alarmPrefix}-Cluster`;
        this.indexingLatencyAlarmFactory = new common_1.LatencyAlarmFactory(this.createAlarmFactory(indexingAlarmPrefix));
        this.indexingLatencyAnnotations = [];
        this.searchLatencyAlarmFactory = new common_1.LatencyAlarmFactory(this.createAlarmFactory(searchAlarmPrefix));
        this.searchLatencyAnnotations = [];
        this.clusterAlarmFactory = new common_1.OpenSearchClusterAlarmFactory(this.createAlarmFactory(clusterAlarmPrefix));
        this.clusterAnnotations = [];
        this.nodeAnnotations = [];
        this.usageAlarmFactory = new common_1.UsageAlarmFactory(this.createAlarmFactory(alarmPrefix));
        this.usageAnnotations = [];
        this.masterUsageAnnotations = [];
        const metricFactory = new OpenSearchClusterMetricFactory_1.OpenSearchClusterMetricFactory(scope.createMetricFactory(), props);
        this.tpsMetric = metricFactory.metricTps();
        this.p50IndexingLatencyMetric =
            metricFactory.metricIndexingLatencyP50InMillis();
        this.p90IndexingLatencyMetric =
            metricFactory.metricIndexingLatencyP90InMillis();
        this.p99IndexingLatencyMetric =
            metricFactory.metricIndexingLatencyP99InMillis();
        this.p50SearchLatencyMetric =
            metricFactory.metricSearchLatencyP50InMillis();
        this.p90SearchLatencyMetric =
            metricFactory.metricSearchLatencyP90InMillis();
        this.p99SearchLatencyMetric =
            metricFactory.metricSearchLatencyP99InMillis();
        this.clusterStatusRedMetric = metricFactory.metricClusterStatusRed();
        this.clusterStatusYellowMetric = metricFactory.metricClusterStatusYellow();
        this.diskSpaceUsageMetric = metricFactory.metricDiskSpaceUsageInPercent();
        this.cpuUsageMetric = metricFactory.metricCpuUsage();
        this.masterCpuUsageMetric = metricFactory.metricMasterCpuUsage();
        this.jvmMemoryPressureMetric = metricFactory.metricJvmMemoryPressure();
        this.masterJvmMemoryPressureMetric =
            metricFactory.metricMasterJvmMemoryPressure();
        this.indexWriteBlockedMetric =
            metricFactory.metricClusterIndexWritesBlocked();
        this.nodesMetric = metricFactory.metricNodes();
        this.automatedSnapshotFailureMetric =
            metricFactory.metricAutomatedSnapshotFailure();
        this.kmsKeyErrorMetric = metricFactory.metricKmsKeyError();
        this.kmsKeyInaccessibleMetric = metricFactory.metricKmsKeyInaccessible();
        for (const disambiguator in props.addIndexingLatencyP50Alarm) {
            const alarmProps = props.addIndexingLatencyP50Alarm[disambiguator];
            const createdAlarm = this.indexingLatencyAlarmFactory.addLatencyAlarm(this.p50IndexingLatencyMetric, common_1.LatencyType.P50, alarmProps, disambiguator);
            this.indexingLatencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addIndexingLatencyP90Alarm) {
            const alarmProps = props.addIndexingLatencyP90Alarm[disambiguator];
            const createdAlarm = this.indexingLatencyAlarmFactory.addLatencyAlarm(this.p90IndexingLatencyMetric, common_1.LatencyType.P90, alarmProps, disambiguator);
            this.indexingLatencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addIndexingLatencyP99Alarm) {
            const alarmProps = props.addIndexingLatencyP99Alarm[disambiguator];
            const createdAlarm = this.indexingLatencyAlarmFactory.addLatencyAlarm(this.p99IndexingLatencyMetric, common_1.LatencyType.P99, alarmProps, disambiguator);
            this.indexingLatencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addSearchLatencyP50Alarm) {
            const alarmProps = props.addSearchLatencyP50Alarm[disambiguator];
            const createdAlarm = this.searchLatencyAlarmFactory.addLatencyAlarm(this.p50SearchLatencyMetric, common_1.LatencyType.P50, alarmProps, disambiguator);
            this.searchLatencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addSearchLatencyP90Alarm) {
            const alarmProps = props.addSearchLatencyP90Alarm[disambiguator];
            const createdAlarm = this.searchLatencyAlarmFactory.addLatencyAlarm(this.p90SearchLatencyMetric, common_1.LatencyType.P90, alarmProps, disambiguator);
            this.searchLatencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addSearchLatencyP99Alarm) {
            const alarmProps = props.addSearchLatencyP99Alarm[disambiguator];
            const createdAlarm = this.searchLatencyAlarmFactory.addLatencyAlarm(this.p99SearchLatencyMetric, common_1.LatencyType.P99, alarmProps, disambiguator);
            this.searchLatencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addClusterStatusAlarm) {
            const alarmProps = props.addClusterStatusAlarm[disambiguator];
            let createdAlarm;
            switch (alarmProps.status) {
                case common_1.OpenSearchClusterStatus.RED:
                    createdAlarm = this.clusterAlarmFactory.addClusterStatusAlarm(this.clusterStatusRedMetric, alarmProps, disambiguator);
                    break;
                case common_1.OpenSearchClusterStatus.YELLOW:
                    createdAlarm = this.clusterAlarmFactory.addClusterStatusAlarm(this.clusterStatusYellowMetric, alarmProps, disambiguator);
                    break;
                default:
                    throw new Error(`Unknown cluster status: ${alarmProps.status}`);
            }
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addDiskSpaceUsageAlarm) {
            const alarmProps = props.addDiskSpaceUsageAlarm[disambiguator];
            const createdAlarm = this.usageAlarmFactory.addMaxDiskUsagePercentAlarm(this.diskSpaceUsageMetric, alarmProps, disambiguator);
            this.usageAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addCpuSpaceUsageAlarm) {
            const alarmProps = props.addCpuSpaceUsageAlarm[disambiguator];
            const createdAlarm = this.usageAlarmFactory.addMaxCpuUsagePercentAlarm(this.cpuUsageMetric, alarmProps, disambiguator);
            this.usageAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addMasterCpuSpaceUsageAlarm) {
            const alarmProps = props.addMasterCpuSpaceUsageAlarm[disambiguator];
            const createdAlarm = this.usageAlarmFactory.addMaxMasterCpuUsagePercentAlarm(this.masterCpuUsageMetric, alarmProps, disambiguator);
            this.masterUsageAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addJvmMemoryPressureAlarm) {
            const alarmProps = props.addJvmMemoryPressureAlarm[disambiguator];
            const createdAlarm = this.usageAlarmFactory.addMaxMemoryUsagePercentAlarm(this.jvmMemoryPressureMetric, alarmProps, disambiguator);
            this.usageAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addMasterJvmMemoryPressureAlarm) {
            const alarmProps = props.addMasterJvmMemoryPressureAlarm[disambiguator];
            const createdAlarm = this.usageAlarmFactory.addMaxMasterMemoryUsagePercentAlarm(this.masterJvmMemoryPressureMetric, alarmProps, disambiguator);
            this.masterUsageAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addClusterNodeCountAlarm) {
            const alarmProps = props.addClusterNodeCountAlarm[disambiguator];
            const createdAlarm = this.clusterAlarmFactory.addClusterNodeCountAlarm(this.nodesMetric, alarmProps, disambiguator);
            this.nodeAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addClusterIndexWritesBlockedAlarm) {
            const alarmProps = props.addClusterIndexWritesBlockedAlarm[disambiguator];
            const createdAlarm = this.clusterAlarmFactory.addClusterIndexWritesBlockedAlarm(this.indexWriteBlockedMetric, alarmProps, disambiguator);
            this.clusterAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addClusterAutomatedSnapshotFailureAlarm) {
            const alarmProps = props.addClusterAutomatedSnapshotFailureAlarm[disambiguator];
            const createdAlarm = this.clusterAlarmFactory.addAutomatedSnapshotFailureAlarm(this.automatedSnapshotFailureMetric, alarmProps, disambiguator);
            this.clusterAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addKmsKeyErrorAlarm) {
            const alarmProps = props.addKmsKeyErrorAlarm[disambiguator];
            const createdAlarm = this.clusterAlarmFactory.addKmsKeyErrorAlarm(this.kmsKeyErrorMetric, alarmProps, disambiguator);
            this.clusterAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addKmsKeyInaccessibleAlarm) {
            const alarmProps = props.addKmsKeyInaccessibleAlarm[disambiguator];
            const createdAlarm = this.clusterAlarmFactory.addKmsKeyInaccessibleAlarm(this.kmsKeyInaccessibleMetric, alarmProps, disambiguator);
            this.clusterAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        // TODO: separate into individual widget methods
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "Elasticsearch Domain",
                title: this.title,
                goToLinkUrl: this.url,
            }),
            // Requests (TPS)
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultSummaryWidgetHeight,
                title: "TPS",
                left: [this.tpsMetric],
                leftYAxis: common_1.RateAxisFromZero,
            }),
            // Indexing latency
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultSummaryWidgetHeight,
                title: "Indexing Latency",
                left: [
                    this.p50IndexingLatencyMetric,
                    this.p90IndexingLatencyMetric,
                    this.p99IndexingLatencyMetric,
                ],
                leftYAxis: common_1.TimeAxisMillisFromZero,
                leftAnnotations: this.indexingLatencyAnnotations,
            }),
            // Search latency
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultSummaryWidgetHeight,
                title: "Search Latency",
                left: [
                    this.p50SearchLatencyMetric,
                    this.p90SearchLatencyMetric,
                    this.p99SearchLatencyMetric,
                ],
                leftYAxis: common_1.TimeAxisMillisFromZero,
                leftAnnotations: this.searchLatencyAnnotations,
            }),
            // CPU, memory, and disk usage
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultSummaryWidgetHeight,
                title: "CPU/Memory/Disk Usage",
                left: [
                    this.cpuUsageMetric,
                    this.masterCpuUsageMetric,
                    this.jvmMemoryPressureMetric,
                    this.masterJvmMemoryPressureMetric,
                    this.diskSpaceUsageMetric,
                ],
                leftYAxis: common_1.PercentageAxisFromZeroToHundred,
                leftAnnotations: [
                    ...this.usageAnnotations,
                    ...this.masterUsageAnnotations,
                ],
            }),
        ];
    }
    widgets() {
        // TODO: separate into individual widget methods
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "Elasticsearch Domain",
                title: this.title,
                goToLinkUrl: this.url,
            }),
            new aws_cloudwatch_1.Row(
            // Requests (TPS)
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "TPS",
                left: [this.tpsMetric],
                leftYAxis: common_1.RateAxisFromZero,
            }), 
            // Indexing latency
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Indexing Latency",
                left: [
                    this.p50IndexingLatencyMetric,
                    this.p90IndexingLatencyMetric,
                    this.p99IndexingLatencyMetric,
                ],
                leftAnnotations: this.indexingLatencyAnnotations,
            }), 
            // Search latency
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Search Latency",
                left: [
                    this.p50SearchLatencyMetric,
                    this.p90SearchLatencyMetric,
                    this.p99SearchLatencyMetric,
                ],
                leftAnnotations: this.searchLatencyAnnotations,
            }), 
            // Node count
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.QuarterWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Node Count",
                left: [this.nodesMetric],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.nodeAnnotations,
            })),
            new aws_cloudwatch_1.Row(
            // CPU, memory, and disk usage
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.ThirdWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "CPU/Memory/Disk Usage",
                left: [
                    this.cpuUsageMetric,
                    this.jvmMemoryPressureMetric,
                    this.diskSpaceUsageMetric,
                ],
                leftYAxis: common_1.PercentageAxisFromZeroToHundred,
                leftAnnotations: this.usageAnnotations,
            }), 
            // Master CPU and memory
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.ThirdWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Master CPU/Memory Usage",
                left: [this.masterCpuUsageMetric, this.masterJvmMemoryPressureMetric],
                leftYAxis: common_1.PercentageAxisFromZeroToHundred,
                leftAnnotations: this.masterUsageAnnotations,
            }), 
            // Index/Snapshot/KMS Errors
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.ThirdWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Index/Snapshot/KMS Errors",
                left: [
                    this.indexWriteBlockedMetric,
                    this.automatedSnapshotFailureMetric,
                    this.kmsKeyErrorMetric,
                    this.kmsKeyInaccessibleMetric,
                ],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.clusterAnnotations,
            })),
        ];
    }
}
exports.OpenSearchClusterMonitoring = OpenSearchClusterMonitoring;
_a = JSII_RTTI_SYMBOL_1;
OpenSearchClusterMonitoring[_a] = { fqn: "cdk-monitoring-constructs.OpenSearchClusterMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblNlYXJjaENsdXN0ZXJNb25pdG9yaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3BlblNlYXJjaENsdXN0ZXJNb25pdG9yaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBS29DO0FBRXBDLHFGQUcwQztBQUMxQyx5Q0EwQnNCO0FBQ3RCLCtDQUd5QjtBQTZDekIsTUFBYSwyQkFBNEIsU0FBUSxtQkFBVTtJQXNDekQsWUFBWSxLQUFzQixFQUFFLEtBQXVDO1FBQ3pFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxvQ0FBd0IsQ0FBQztZQUNsRCxHQUFHLEtBQUs7WUFDUixjQUFjLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDN0IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVTtZQUNoQyxDQUFDLENBQUMsS0FBSztpQkFDRiwwQkFBMEIsRUFBRTtpQkFDNUIsdUJBQXVCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDckQsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVkLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQzlELE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxXQUFXLFdBQVcsQ0FBQztRQUN0RCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsV0FBVyxTQUFTLENBQUM7UUFDbEQsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLFdBQVcsVUFBVSxDQUFDO1FBRXBELElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLDRCQUFtQixDQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FDN0MsQ0FBQztRQUNGLElBQUksQ0FBQywwQkFBMEIs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b0JBQ25CLElBQUksQ0FBQyx1QkFBdUI7b0JBQzVCLElBQUksQ0FBQyxvQkFBb0I7aUJBQzFCO2dCQUNELFNBQVMsRUFBRSx3Q0FBK0I7Z0JBQzFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2FBQ3ZDLENBQUM7WUFDRix3QkFBd0I7WUFDeEIsSUFBSSw0QkFBVyxDQUFDO2dCQUNkLEtBQUssRUFBRSxtQkFBVTtnQkFDakIsTUFBTSxFQUFFLGlDQUF3QjtnQkFDaEMsS0FBSyxFQUFFLHlCQUF5QjtnQkFDaEMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztnQkFDckUsU0FBUyxFQUFFLHdDQUErQjtnQkFDMUMsZUFBZSxFQUFFLElBQUksQ0FBQyxzQkFBc0I7YUFDN0MsQ0FBQztZQUNGLDRCQUE0QjtZQUM1QixJQUFJLDRCQUFXLENBQUM7Z0JBQ2QsS0FBSyxFQUFFLG1CQUFVO2dCQUNqQixNQUFNLEVBQUUsaUNBQXdCO2dCQUNoQyxLQUFLLEVBQUUsMkJBQTJCO2dCQUNsQyxJQUFJLEVBQUU7b0JBQ0osSUFBSSxDQUFDLHVCQUF1QjtvQkFDNUIsSUFBSSxDQUFDLDhCQUE4QjtvQkFDbkMsSUFBSSxDQUFDLGlCQUFpQjtvQkFDdEIsSUFBSSxDQUFDLHdCQUF3QjtpQkFDOUI7Z0JBQ0QsU0FBUyxFQUFFLDBCQUFpQjtnQkFDNUIsZUFBZSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7YUFDekMsQ0FBQyxDQUNIO1NBQ0YsQ0FBQztJQUNKLENBQUM7O0FBOWNILGtFQStjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEdyYXBoV2lkZ2V0LFxuICBIb3Jpem9udGFsQW5ub3RhdGlvbixcbiAgSVdpZGdldCxcbiAgUm93LFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHtcbiAgT3BlblNlYXJjaENsdXN0ZXJNZXRyaWNGYWN0b3J5LFxuICBPcGVuU2VhcmNoQ2x1c3Rlck1ldHJpY0ZhY3RvcnlQcm9wcyxcbn0gZnJvbSBcIi4vT3BlblNlYXJjaENsdXN0ZXJNZXRyaWNGYWN0b3J5XCI7XG5pbXBvcnQge1xuICBCYXNlTW9uaXRvcmluZ1Byb3BzLFxuICBDb3VudEF4aXNGcm9tWmVybyxcbiAgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCxcbiAgTGF0ZW5jeUFsYXJtRmFjdG9yeSxcbiAgTGF0ZW5jeVRocmVzaG9sZCxcbiAgTGF0ZW5jeVR5cGUsXG4gIE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gIE1vbml0b3JpbmcsXG4gIE1vbml0b3JpbmdTY29wZSxcbiAgT3BlblNlYXJjaENsdXN0ZXJBbGFybUZhY3RvcnksXG4gIE9wZW5TZWFyY2hDbHVzdGVyQXV0b21hdGVkU25hcHNob3RGYWlsdXJlVGhyZXNob2xkLFxuICBPcGVuU2VhcmNoQ2x1c3RlckluZGV4V3JpdGVzQmxvY2tlZFRocmVzaG9sZCxcbiAgT3BlblNlYXJjaENsdXN0ZXJOb2Rlc1RocmVzaG9sZCxcbiAgT3BlblNlYXJjaENsdXN0ZXJTdGF0dXMsXG4gIE9wZW5TZWFyY2hDbHVzdGVyU3RhdHVzQ3VzdG9taXphdGlvbixcbiAgT3BlblNlYXJjaEttc0tleUVycm9yVGhyZXNob2xkLFxuICBPcGVuU2VhcmNoS21zS2V5SW5hY2Nlc3NpYmxlVGhyZXNob2xkLFxuICBQZXJjZW50YWdlQXhpc0Zyb21aZXJvVG9IdW5kcmVkLFxuICBRdWFydGVyV2lkdGgsXG4gIFJhdGVBeGlzRnJvbVplcm8sXG4gIFRoaXJkV2lkdGgsXG4gIFRpbWVBeGlzTWlsbGlzRnJvbVplcm8sXG4gIFVzYWdlQWxhcm1GYWN0b3J5LFxuICBVc2FnZVRocmVzaG9sZCxcbn0gZnJvbSBcIi4uLy4uL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgTW9uaXRvcmluZ0hlYWRlcldpZGdldCxcbiAgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5LFxufSBmcm9tIFwiLi4vLi4vZGFzaGJvYXJkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlblNlYXJjaENsdXN0ZXJNb25pdG9yaW5nT3B0aW9uc1xuICBleHRlbmRzIEJhc2VNb25pdG9yaW5nUHJvcHMge1xuICByZWFkb25seSBhZGRJbmRleGluZ0xhdGVuY3lQNTBBbGFybT86IFJlY29yZDxzdHJpbmcsIExhdGVuY3lUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRJbmRleGluZ0xhdGVuY3lQOTBBbGFybT86IFJlY29yZDxzdHJpbmcsIExhdGVuY3lUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRJbmRleGluZ0xhdGVuY3lQOTlBbGFybT86IFJlY29yZDxzdHJpbmcsIExhdGVuY3lUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRTZWFyY2hMYXRlbmN5UDUwQWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBMYXRlbmN5VGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkU2VhcmNoTGF0ZW5jeVA5MEFsYXJtPzogUmVjb3JkPHN0cmluZywgTGF0ZW5jeVRocmVzaG9sZD47XG4gIHJlYWRvbmx5IGFkZFNlYXJjaExhdGVuY3lQOTlBbGFybT86IFJlY29yZDxzdHJpbmcsIExhdGVuY3lUaHJlc2hvbGQ+O1xuXG4gIHJlYWRvbmx5IGFkZENsdXN0ZXJTdGF0dXNBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgT3BlblNlYXJjaENsdXN0ZXJTdGF0dXNDdXN0b21pemF0aW9uXG4gID47XG4gIHJlYWRvbmx5IGFkZERpc2tTcGFjZVVzYWdlQWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBVc2FnZVRocmVzaG9sZD47XG4gIHJlYWRvbmx5IGFkZENwdVNwYWNlVXNhZ2VBbGFybT86IFJlY29yZDxzdHJpbmcsIFVzYWdlVGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkTWFzdGVyQ3B1U3BhY2VVc2FnZUFsYXJtPzogUmVjb3JkPHN0cmluZywgVXNhZ2VUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRKdm1NZW1vcnlQcmVzc3VyZUFsYXJtPzogUmVjb3JkPHN0cmluZywgVXNhZ2VUaHJlc2hvbGQ+O1xuICByZWFkb25seSBhZGRNYXN0ZXJKdm1NZW1vcnlQcmVzc3VyZUFsYXJtPzogUmVjb3JkPHN0cmluZywgVXNhZ2VUaHJlc2hvbGQ+O1xuXG4gIHJlYWRvbmx5IGFkZENsdXN0ZXJJbmRleFdyaXRlc0Jsb2NrZWRBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgT3BlblNlYXJjaENsdXN0ZXJJbmRleFdyaXRlc0Jsb2NrZWRUaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkQ2x1c3Rlck5vZGVDb3VudEFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBPcGVuU2VhcmNoQ2x1c3Rlck5vZGVzVGhyZXNob2xkXG4gID47XG4gIHJlYWRvbmx5IGFkZENsdXN0ZXJBdXRvbWF0ZWRTbmFwc2hvdEZhaWx1cmVBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgT3BlblNlYXJjaENsdXN0ZXJBdXRvbWF0ZWRTbmFwc2hvdEZhaWx1cmVUaHJlc2hvbGRcbiAgPjtcblxuICByZWFkb25seSBhZGRLbXNLZXlFcnJvckFsYXJtPzogUmVjb3JkPHN0cmluZywgT3BlblNlYXJjaEttc0tleUVycm9yVGhyZXNob2xkPjtcbiAgcmVhZG9ubHkgYWRkS21zS2V5SW5hY2Nlc3NpYmxlQWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIE9wZW5TZWFyY2hLbXNLZXlJbmFjY2Vzc2libGVUaHJlc2hvbGRcbiAgPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuU2VhcmNoQ2x1c3Rlck1vbml0b3JpbmdQcm9wc1xuICBleHRlbmRzIE9wZW5TZWFyY2hDbHVzdGVyTWV0cmljRmFjdG9yeVByb3BzLFxuICAgIE9wZW5TZWFyY2hDbHVzdGVyTW9uaXRvcmluZ09wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIE9wZW5TZWFyY2hDbHVzdGVyTW9uaXRvcmluZyBleHRlbmRzIE1vbml0b3Jpbmcge1xuICByZWFkb25seSB0aXRsZTogc3RyaW5nO1xuICByZWFkb25seSB1cmw/OiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgaW5kZXhpbmdMYXRlbmN5QWxhcm1GYWN0b3J5OiBMYXRlbmN5QWxhcm1GYWN0b3J5O1xuICByZWFkb25seSBpbmRleGluZ0xhdGVuY3lBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgc2VhcmNoTGF0ZW5jeUFsYXJtRmFjdG9yeTogTGF0ZW5jeUFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgc2VhcmNoTGF0ZW5jeUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBjbHVzdGVyQWxhcm1GYWN0b3J5OiBPcGVuU2VhcmNoQ2x1c3RlckFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgY2x1c3RlckFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBub2RlQW5ub3RhdGlvbnM6IEhvcml6b250YWxBbm5vdGF0aW9uW107XG4gIHJlYWRvbmx5IHVzYWdlQWxhcm1GYWN0b3J5OiBVc2FnZUFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgdXNhZ2VBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgbWFzdGVyVXNhZ2VBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcblxuICByZWFkb25seSB0cHNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHA1MEluZGV4aW5nTGF0ZW5jeU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcDkwSW5kZXhpbmdMYXRlbmN5TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBwOTlJbmRleGluZ0xhdGVuY3lNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHA1MFNlYXJjaExhdGVuY3lNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHA5MFNlYXJjaExhdGVuY3lNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IHA5OVNlYXJjaExhdGVuY3lNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG5cbiAgcmVhZG9ubHkgY2x1c3RlclN0YXR1c1JlZE1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgY2x1c3RlclN0YXR1c1llbGxvd01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcblxuICByZWFkb25seSBkaXNrU3BhY2VVc2FnZU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgY3B1VXNhZ2VNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IG1hc3RlckNwdVVzYWdlTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBqdm1NZW1vcnlQcmVzc3VyZU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgbWFzdGVySnZtTWVtb3J5UHJlc3N1cmVNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG5cbiAgcmVhZG9ubHkgaW5kZXhXcml0ZUJsb2NrZWRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IG5vZGVzTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBhdXRvbWF0ZWRTbmFwc2hvdEZhaWx1cmVNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGttc0tleUVycm9yTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBrbXNLZXlJbmFjY2Vzc2libGVNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IE1vbml0b3JpbmdTY29wZSwgcHJvcHM6IE9wZW5TZWFyY2hDbHVzdGVyTW9uaXRvcmluZ1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIHByb3BzKTtcblxuICAgIGNvbnN0IG5hbWluZ1N0cmF0ZWd5ID0gbmV3IE1vbml0b3JpbmdOYW1pbmdTdHJhdGVneSh7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIG5hbWVkQ29uc3RydWN0OiBwcm9wcy5kb21haW4sXG4gICAgfSk7XG4gICAgdGhpcy50aXRsZSA9IG5hbWluZ1N0cmF0ZWd5LnJlc29sdmVIdW1hblJlYWRhYmxlTmFtZSgpO1xuICAgIHRoaXMudXJsID0gcHJvcHMuZG9tYWluLmRvbWFpbk5hbWVcbiAgICAgID8gc2NvcGVcbiAgICAgICAgICAuY3JlYXRlQXdzQ29uc29sZVVybEZhY3RvcnkoKVxuICAgICAgICAgIC5nZXRPcGVuU2VhcmNoQ2x1c3RlclVybChwcm9wcy5kb21haW4uZG9tYWluTmFtZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgYWxhcm1QcmVmaXggPSBuYW1pbmdTdHJhdGVneS5yZXNvbHZlQWxhcm1GcmllbmRseU5hbWUoKTtcbiAgICBjb25zdCBpbmRleGluZ0FsYXJtUHJlZml4ID0gYCR7YWxhcm1QcmVmaXh9LUluZGV4aW5nYDtcbiAgICBjb25zdCBzZWFyY2hBbGFybVByZWZpeCA9IGAke2FsYXJtUHJlZml4fS1TZWFyY2hgO1xuICAgIGNvbnN0IGNsdXN0ZXJBbGFybVByZWZpeCA9IGAke2FsYXJtUHJlZml4fS1DbHVzdGVyYDtcblxuICAgIHRoaXMuaW5kZXhpbmdMYXRlbmN5QWxhcm1GYWN0b3J5ID0gbmV3IExhdGVuY3lBbGFybUZhY3RvcnkoXG4gICAgICB0aGlzLmNyZWF0ZUFsYXJtRmFjdG9yeShpbmRleGluZ0FsYXJtUHJlZml4KVxuICAgICk7XG4gICAgdGhpcy5pbmRleGluZ0xhdGVuY3lBbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMuc2VhcmNoTGF0ZW5jeUFsYXJtRmFjdG9yeSA9IG5ldyBMYXRlbmN5QWxhcm1GYWN0b3J5KFxuICAgICAgdGhpcy5jcmVhdGVBbGFybUZhY3Rvcnkoc2VhcmNoQWxhcm1QcmVmaXgpXG4gICAgKTtcbiAgICB0aGlzLnNlYXJjaExhdGVuY3lBbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMuY2x1c3RlckFsYXJtRmFjdG9yeSA9IG5ldyBPcGVuU2VhcmNoQ2x1c3RlckFsYXJtRmFjdG9yeShcbiAgICAgIHRoaXMuY3JlYXRlQWxhcm1GYWN0b3J5KGNsdXN0ZXJBbGFybVByZWZpeClcbiAgICApO1xuICAgIHRoaXMuY2x1c3RlckFubm90YXRpb25zID0gW107XG4gICAgdGhpcy5ub2RlQW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnVzYWdlQWxhcm1GYWN0b3J5ID0gbmV3IFVzYWdlQWxhcm1GYWN0b3J5KFxuICAgICAgdGhpcy5jcmVhdGVBbGFybUZhY3RvcnkoYWxhcm1QcmVmaXgpXG4gICAgKTtcbiAgICB0aGlzLnVzYWdlQW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLm1hc3RlclVzYWdlQW5ub3RhdGlvbnMgPSBbXTtcblxuICAgIGNvbnN0IG1ldHJpY0ZhY3RvcnkgPSBuZXcgT3BlblNlYXJjaENsdXN0ZXJNZXRyaWNGYWN0b3J5KFxuICAgICAgc2NvcGUuY3JlYXRlTWV0cmljRmFjdG9yeSgpLFxuICAgICAgcHJvcHNcbiAgICApO1xuICAgIHRoaXMudHBzTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNUcHMoKTtcbiAgICB0aGlzLnA1MEluZGV4aW5nTGF0ZW5jeU1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0luZGV4aW5nTGF0ZW5jeVA1MEluTWlsbGlzKCk7XG4gICAgdGhpcy5wOTBJbmRleGluZ0xhdGVuY3lNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNJbmRleGluZ0xhdGVuY3lQOTBJbk1pbGxpcygpO1xuICAgIHRoaXMucDk5SW5kZXhpbmdMYXRlbmN5TWV0cmljID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljSW5kZXhpbmdMYXRlbmN5UDk5SW5NaWxsaXMoKTtcbiAgICB0aGlzLnA1MFNlYXJjaExhdGVuY3lNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNTZWFyY2hMYXRlbmN5UDUwSW5NaWxsaXMoKTtcbiAgICB0aGlzLnA5MFNlYXJjaExhdGVuY3lNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNTZWFyY2hMYXRlbmN5UDkwSW5NaWxsaXMoKTtcbiAgICB0aGlzLnA5OVNlYXJjaExhdGVuY3lNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNTZWFyY2hMYXRlbmN5UDk5SW5NaWxsaXMoKTtcbiAgICB0aGlzLmNsdXN0ZXJTdGF0dXNSZWRNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0NsdXN0ZXJTdGF0dXNSZWQoKTtcbiAgICB0aGlzLmNsdXN0ZXJTdGF0dXNZZWxsb3dNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0NsdXN0ZXJTdGF0dXNZZWxsb3coKTtcbiAgICB0aGlzLmRpc2tTcGFjZVVzYWdlTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNEaXNrU3BhY2VVc2FnZUluUGVyY2VudCgpO1xuICAgIHRoaXMuY3B1VXNhZ2VNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0NwdVVzYWdlKCk7XG4gICAgdGhpcy5tYXN0ZXJDcHVVc2FnZU1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljTWFzdGVyQ3B1VXNhZ2UoKTtcbiAgICB0aGlzLmp2bU1lbW9yeVByZXNzdXJlTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNKdm1NZW1vcnlQcmVzc3VyZSgpO1xuICAgIHRoaXMubWFzdGVySnZtTWVtb3J5UHJlc3N1cmVNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNNYXN0ZXJKdm1NZW1vcnlQcmVzc3VyZSgpO1xuICAgIHRoaXMuaW5kZXhXcml0ZUJsb2NrZWRNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNDbHVzdGVySW5kZXhXcml0ZXNCbG9ja2VkKCk7XG4gICAgdGhpcy5ub2Rlc01ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljTm9kZXMoKTtcbiAgICB0aGlzLmF1dG9tYXRlZFNuYXBzaG90RmFpbHVyZU1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0F1dG9tYXRlZFNuYXBzaG90RmFpbHVyZSgpO1xuICAgIHRoaXMua21zS2V5RXJyb3JNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0ttc0tleUVycm9yKCk7XG4gICAgdGhpcy5rbXNLZXlJbmFjY2Vzc2libGVNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0ttc0tleUluYWNjZXNzaWJsZSgpO1xuXG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZEluZGV4aW5nTGF0ZW5jeVA1MEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkSW5kZXhpbmdMYXRlbmN5UDUwQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmluZGV4aW5nTGF0ZW5jeUFsYXJtRmFjdG9yeS5hZGRMYXRlbmN5QWxhcm0oXG4gICAgICAgIHRoaXMucDUwSW5kZXhpbmdMYXRlbmN5TWV0cmljLFxuICAgICAgICBMYXRlbmN5VHlwZS5QNTAsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmluZGV4aW5nTGF0ZW5jeUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkSW5kZXhpbmdMYXRlbmN5UDkwQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGRJbmRleGluZ0xhdGVuY3lQOTBBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuaW5kZXhpbmdMYXRlbmN5QWxhcm1GYWN0b3J5LmFkZExhdGVuY3lBbGFybShcbiAgICAgICAgdGhpcy5wOTBJbmRleGluZ0xhdGVuY3lNZXRyaWMsXG4gICAgICAgIExhdGVuY3lUeXBlLlA5MCxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuaW5kZXhpbmdMYXRlbmN5QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRJbmRleGluZ0xhdGVuY3lQOTlBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZEluZGV4aW5nTGF0ZW5jeVA5OUFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5pbmRleGluZ0xhdGVuY3lBbGFybUZhY3RvcnkuYWRkTGF0ZW5jeUFsYXJtKFxuICAgICAgICB0aGlzLnA5OUluZGV4aW5nTGF0ZW5jeU1ldHJpYyxcbiAgICAgICAgTGF0ZW5jeVR5cGUuUDk5LFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5pbmRleGluZ0xhdGVuY3lBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZFNlYXJjaExhdGVuY3lQNTBBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZFNlYXJjaExhdGVuY3lQNTBBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuc2VhcmNoTGF0ZW5jeUFsYXJtRmFjdG9yeS5hZGRMYXRlbmN5QWxhcm0oXG4gICAgICAgIHRoaXMucDUwU2VhcmNoTGF0ZW5jeU1ldHJpYyxcbiAgICAgICAgTGF0ZW5jeVR5cGUuUDUwLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5zZWFyY2hMYXRlbmN5QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRTZWFyY2hMYXRlbmN5UDkwQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGRTZWFyY2hMYXRlbmN5UDkwQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLnNlYXJjaExhdGVuY3lBbGFybUZhY3RvcnkuYWRkTGF0ZW5jeUFsYXJtKFxuICAgICAgICB0aGlzLnA5MFNlYXJjaExhdGVuY3lNZXRyaWMsXG4gICAgICAgIExhdGVuY3lUeXBlLlA5MCxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuc2VhcmNoTGF0ZW5jeUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkU2VhcmNoTGF0ZW5jeVA5OUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkU2VhcmNoTGF0ZW5jeVA5OUFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5zZWFyY2hMYXRlbmN5QWxhcm1GYWN0b3J5LmFkZExhdGVuY3lBbGFybShcbiAgICAgICAgdGhpcy5wOTlTZWFyY2hMYXRlbmN5TWV0cmljLFxuICAgICAgICBMYXRlbmN5VHlwZS5QOTksXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLnNlYXJjaExhdGVuY3lBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZENsdXN0ZXJTdGF0dXNBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZENsdXN0ZXJTdGF0dXNBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGxldCBjcmVhdGVkQWxhcm07XG4gICAgICBzd2l0Y2ggKGFsYXJtUHJvcHMuc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgT3BlblNlYXJjaENsdXN0ZXJTdGF0dXMuUkVEOlxuICAgICAgICAgIGNyZWF0ZWRBbGFybSA9IHRoaXMuY2x1c3RlckFsYXJtRmFjdG9yeS5hZGRDbHVzdGVyU3RhdHVzQWxhcm0oXG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXJTdGF0dXNSZWRNZXRyaWMsXG4gICAgICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT3BlblNlYXJjaENsdXN0ZXJTdGF0dXMuWUVMTE9XOlxuICAgICAgICAgIGNyZWF0ZWRBbGFybSA9IHRoaXMuY2x1c3RlckFsYXJtRmFjdG9yeS5hZGRDbHVzdGVyU3RhdHVzQWxhcm0oXG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXJTdGF0dXNZZWxsb3dNZXRyaWMsXG4gICAgICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNsdXN0ZXIgc3RhdHVzOiAke2FsYXJtUHJvcHMuc3RhdHVzfWApO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRGlza1NwYWNlVXNhZ2VBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZERpc2tTcGFjZVVzYWdlQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLnVzYWdlQWxhcm1GYWN0b3J5LmFkZE1heERpc2tVc2FnZVBlcmNlbnRBbGFybShcbiAgICAgICAgdGhpcy5kaXNrU3BhY2VVc2FnZU1ldHJpYyxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMudXNhZ2VBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZENwdVNwYWNlVXNhZ2VBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZENwdVNwYWNlVXNhZ2VBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMudXNhZ2VBbGFybUZhY3RvcnkuYWRkTWF4Q3B1VXNhZ2VQZXJjZW50QWxhcm0oXG4gICAgICAgIHRoaXMuY3B1VXNhZ2VNZXRyaWMsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLnVzYWdlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRNYXN0ZXJDcHVTcGFjZVVzYWdlQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGRNYXN0ZXJDcHVTcGFjZVVzYWdlQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPVxuICAgICAgICB0aGlzLnVzYWdlQWxhcm1GYWN0b3J5LmFkZE1heE1hc3RlckNwdVVzYWdlUGVyY2VudEFsYXJtKFxuICAgICAgICAgIHRoaXMubWFzdGVyQ3B1VXNhZ2VNZXRyaWMsXG4gICAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICAgICk7XG4gICAgICB0aGlzLm1hc3RlclVzYWdlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRKdm1NZW1vcnlQcmVzc3VyZUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkSnZtTWVtb3J5UHJlc3N1cmVBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMudXNhZ2VBbGFybUZhY3RvcnkuYWRkTWF4TWVtb3J5VXNhZ2VQZXJjZW50QWxhcm0oXG4gICAgICAgIHRoaXMuanZtTWVtb3J5UHJlc3N1cmVNZXRyaWMsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLnVzYWdlQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRNYXN0ZXJKdm1NZW1vcnlQcmVzc3VyZUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkTWFzdGVySnZtTWVtb3J5UHJlc3N1cmVBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9XG4gICAgICAgIHRoaXMudXNhZ2VBbGFybUZhY3RvcnkuYWRkTWF4TWFzdGVyTWVtb3J5VXNhZ2VQZXJjZW50QWxhcm0oXG4gICAgICAgICAgdGhpcy5tYXN0ZXJKdm1NZW1vcnlQcmVzc3VyZU1ldHJpYyxcbiAgICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICAgKTtcbiAgICAgIHRoaXMubWFzdGVyVXNhZ2VBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZENsdXN0ZXJOb2RlQ291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZENsdXN0ZXJOb2RlQ291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuY2x1c3RlckFsYXJtRmFjdG9yeS5hZGRDbHVzdGVyTm9kZUNvdW50QWxhcm0oXG4gICAgICAgIHRoaXMubm9kZXNNZXRyaWMsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLm5vZGVBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZENsdXN0ZXJJbmRleFdyaXRlc0Jsb2NrZWRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZENsdXN0ZXJJbmRleFdyaXRlc0Jsb2NrZWRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9XG4gICAgICAgIHRoaXMuY2x1c3RlckFsYXJtRmFjdG9yeS5hZGRDbHVzdGVySW5kZXhXcml0ZXNCbG9ja2VkQWxhcm0oXG4gICAgICAgICAgdGhpcy5pbmRleFdyaXRlQmxvY2tlZE1ldHJpYyxcbiAgICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICAgKTtcbiAgICAgIHRoaXMuY2x1c3RlckFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkQ2x1c3RlckF1dG9tYXRlZFNuYXBzaG90RmFpbHVyZUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID1cbiAgICAgICAgcHJvcHMuYWRkQ2x1c3RlckF1dG9tYXRlZFNuYXBzaG90RmFpbHVyZUFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID1cbiAgICAgICAgdGhpcy5jbHVzdGVyQWxhcm1GYWN0b3J5LmFkZEF1dG9tYXRlZFNuYXBzaG90RmFpbHVyZUFsYXJtKFxuICAgICAgICAgIHRoaXMuYXV0b21hdGVkU25hcHNob3RGYWlsdXJlTWV0cmljLFxuICAgICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICApO1xuICAgICAgdGhpcy5jbHVzdGVyQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRLbXNLZXlFcnJvckFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkS21zS2V5RXJyb3JBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMuY2x1c3RlckFsYXJtRmFjdG9yeS5hZGRLbXNLZXlFcnJvckFsYXJtKFxuICAgICAgICB0aGlzLmttc0tleUVycm9yTWV0cmljLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy5jbHVzdGVyQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBwcm9wcy5hZGRLbXNLZXlJbmFjY2Vzc2libGVBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZEttc0tleUluYWNjZXNzaWJsZUFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5jbHVzdGVyQWxhcm1GYWN0b3J5LmFkZEttc0tleUluYWNjZXNzaWJsZUFsYXJtKFxuICAgICAgICB0aGlzLmttc0tleUluYWNjZXNzaWJsZU1ldHJpYyxcbiAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgKTtcbiAgICAgIHRoaXMuY2x1c3RlckFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cblxuICAgIHByb3BzLnVzZUNyZWF0ZWRBbGFybXM/LmNvbnN1bWUodGhpcy5jcmVhdGVkQWxhcm1zKCkpO1xuICB9XG5cbiAgc3VtbWFyeVdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICAvLyBUT0RPOiBzZXBhcmF0ZSBpbnRvIGluZGl2aWR1YWwgd2lkZ2V0IG1ldGhvZHNcbiAgICByZXR1cm4gW1xuICAgICAgLy8gVGl0bGVcbiAgICAgIG5ldyBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0KHtcbiAgICAgICAgZmFtaWx5OiBcIkVsYXN0aWNzZWFyY2ggRG9tYWluXCIsXG4gICAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgICBnb1RvTGlua1VybDogdGhpcy51cmwsXG4gICAgICB9KSxcbiAgICAgIC8vIFJlcXVlc3RzIChUUFMpXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogUXVhcnRlcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJUUFNcIixcbiAgICAgICAgbGVmdDogW3RoaXMudHBzTWV0cmljXSxcbiAgICAgICAgbGVmdFlBeGlzOiBSYXRlQXhpc0Zyb21aZXJvLFxuICAgICAgfSksXG4gICAgICAvLyBJbmRleGluZyBsYXRlbmN5XG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogUXVhcnRlcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJJbmRleGluZyBMYXRlbmN5XCIsXG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICB0aGlzLnA1MEluZGV4aW5nTGF0ZW5jeU1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5MEluZGV4aW5nTGF0ZW5jeU1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5OUluZGV4aW5nTGF0ZW5jeU1ldHJpYyxcbiAgICAgICAgXSxcbiAgICAgICAgbGVmdFlBeGlzOiBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxuICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuaW5kZXhpbmdMYXRlbmN5QW5ub3RhdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIC8vIFNlYXJjaCBsYXRlbmN5XG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogUXVhcnRlcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJTZWFyY2ggTGF0ZW5jeVwiLFxuICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgdGhpcy5wNTBTZWFyY2hMYXRlbmN5TWV0cmljLFxuICAgICAgICAgIHRoaXMucDkwU2VhcmNoTGF0ZW5jeU1ldHJpYyxcbiAgICAgICAgICB0aGlzLnA5OVNlYXJjaExhdGVuY3lNZXRyaWMsXG4gICAgICAgIF0sXG4gICAgICAgIGxlZnRZQXhpczogVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLnNlYXJjaExhdGVuY3lBbm5vdGF0aW9ucyxcbiAgICAgIH0pLFxuICAgICAgLy8gQ1BVLCBtZW1vcnksIGFuZCBkaXNrIHVzYWdlXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogUXVhcnRlcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJDUFUvTWVtb3J5L0Rpc2sgVXNhZ2VcIixcbiAgICAgICAgbGVmdDogW1xuICAgICAgICAgIHRoaXMuY3B1VXNhZ2VNZXRyaWMsXG4gICAgICAgICAgdGhpcy5tYXN0ZXJDcHVVc2FnZU1ldHJpYyxcbiAgICAgICAgICB0aGlzLmp2bU1lbW9yeVByZXNzdXJlTWV0cmljLFxuICAgICAgICAgIHRoaXMubWFzdGVySnZtTWVtb3J5UHJlc3N1cmVNZXRyaWMsXG4gICAgICAgICAgdGhpcy5kaXNrU3BhY2VVc2FnZU1ldHJpYyxcbiAgICAgICAgXSxcbiAgICAgICAgbGVmdFlBeGlzOiBQZXJjZW50YWdlQXhpc0Zyb21aZXJvVG9IdW5kcmVkLFxuICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IFtcbiAgICAgICAgICAuLi50aGlzLnVzYWdlQW5ub3RhdGlvbnMsXG4gICAgICAgICAgLi4udGhpcy5tYXN0ZXJVc2FnZUFubm90YXRpb25zLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgXTtcbiAgfVxuXG4gIHdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICAvLyBUT0RPOiBzZXBhcmF0ZSBpbnRvIGluZGl2aWR1YWwgd2lkZ2V0IG1ldGhvZHNcbiAgICByZXR1cm4gW1xuICAgICAgLy8gVGl0bGVcbiAgICAgIG5ldyBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0KHtcbiAgICAgICAgZmFtaWx5OiBcIkVsYXN0aWNzZWFyY2ggRG9tYWluXCIsXG4gICAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgICBnb1RvTGlua1VybDogdGhpcy51cmwsXG4gICAgICB9KSxcbiAgICAgIG5ldyBSb3coXG4gICAgICAgIC8vIFJlcXVlc3RzIChUUFMpXG4gICAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgICAgd2lkdGg6IFF1YXJ0ZXJXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCxcbiAgICAgICAgICB0aXRsZTogXCJUUFNcIixcbiAgICAgICAgICBsZWZ0OiBbdGhpcy50cHNNZXRyaWNdLFxuICAgICAgICAgIGxlZnRZQXhpczogUmF0ZUF4aXNGcm9tWmVybyxcbiAgICAgICAgfSksXG4gICAgICAgIC8vIEluZGV4aW5nIGxhdGVuY3lcbiAgICAgICAgbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgICB3aWR0aDogUXVhcnRlcldpZHRoLFxuICAgICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICAgIHRpdGxlOiBcIkluZGV4aW5nIExhdGVuY3lcIixcbiAgICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgICB0aGlzLnA1MEluZGV4aW5nTGF0ZW5jeU1ldHJpYyxcbiAgICAgICAgICAgIHRoaXMucDkwSW5kZXhpbmdMYXRlbmN5TWV0cmljLFxuICAgICAgICAgICAgdGhpcy5wOTlJbmRleGluZ0xhdGVuY3lNZXRyaWMsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuaW5kZXhpbmdMYXRlbmN5QW5ub3RhdGlvbnMsXG4gICAgICAgIH0pLFxuICAgICAgICAvLyBTZWFyY2ggbGF0ZW5jeVxuICAgICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICAgIHdpZHRoOiBRdWFydGVyV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gICAgICAgICAgdGl0bGU6IFwiU2VhcmNoIExhdGVuY3lcIixcbiAgICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgICB0aGlzLnA1MFNlYXJjaExhdGVuY3lNZXRyaWMsXG4gICAgICAgICAgICB0aGlzLnA5MFNlYXJjaExhdGVuY3lNZXRyaWMsXG4gICAgICAgICAgICB0aGlzLnA5OVNlYXJjaExhdGVuY3lNZXRyaWMsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuc2VhcmNoTGF0ZW5jeUFubm90YXRpb25zLFxuICAgICAgICB9KSxcbiAgICAgICAgLy8gTm9kZSBjb3VudFxuICAgICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICAgIHdpZHRoOiBRdWFydGVyV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gICAgICAgICAgdGl0bGU6IFwiTm9kZSBDb3VudFwiLFxuICAgICAgICAgIGxlZnQ6IFt0aGlzLm5vZGVzTWV0cmljXSxcbiAgICAgICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5ub2RlQW5ub3RhdGlvbnMsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgbmV3IFJvdyhcbiAgICAgICAgLy8gQ1BVLCBtZW1vcnksIGFuZCBkaXNrIHVzYWdlXG4gICAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgICAgd2lkdGg6IFRoaXJkV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gICAgICAgICAgdGl0bGU6IFwiQ1BVL01lbW9yeS9EaXNrIFVzYWdlXCIsXG4gICAgICAgICAgbGVmdDogW1xuICAgICAgICAgICAgdGhpcy5jcHVVc2FnZU1ldHJpYyxcbiAgICAgICAgICAgIHRoaXMuanZtTWVtb3J5UHJlc3N1cmVNZXRyaWMsXG4gICAgICAgICAgICB0aGlzLmRpc2tTcGFjZVVzYWdlTWV0cmljLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgbGVmdFlBeGlzOiBQZXJjZW50YWdlQXhpc0Zyb21aZXJvVG9IdW5kcmVkLFxuICAgICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy51c2FnZUFubm90YXRpb25zLFxuICAgICAgICB9KSxcbiAgICAgICAgLy8gTWFzdGVyIENQVSBhbmQgbWVtb3J5XG4gICAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgICAgd2lkdGg6IFRoaXJkV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gICAgICAgICAgdGl0bGU6IFwiTWFzdGVyIENQVS9NZW1vcnkgVXNhZ2VcIixcbiAgICAgICAgICBsZWZ0OiBbdGhpcy5tYXN0ZXJDcHVVc2FnZU1ldHJpYywgdGhpcy5tYXN0ZXJKdm1NZW1vcnlQcmVzc3VyZU1ldHJpY10sXG4gICAgICAgICAgbGVmdFlBeGlzOiBQZXJjZW50YWdlQXhpc0Zyb21aZXJvVG9IdW5kcmVkLFxuICAgICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5tYXN0ZXJVc2FnZUFubm90YXRpb25zLFxuICAgICAgICB9KSxcbiAgICAgICAgLy8gSW5kZXgvU25hcHNob3QvS01TIEVycm9yc1xuICAgICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICAgIHdpZHRoOiBUaGlyZFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICAgICAgICAgIHRpdGxlOiBcIkluZGV4L1NuYXBzaG90L0tNUyBFcnJvcnNcIixcbiAgICAgICAgICBsZWZ0OiBbXG4gICAgICAgICAgICB0aGlzLmluZGV4V3JpdGVCbG9ja2VkTWV0cmljLFxuICAgICAgICAgICAgdGhpcy5hdXRvbWF0ZWRTbmFwc2hvdEZhaWx1cmVNZXRyaWMsXG4gICAgICAgICAgICB0aGlzLmttc0tleUVycm9yTWV0cmljLFxuICAgICAgICAgICAgdGhpcy5rbXNLZXlJbmFjY2Vzc2libGVNZXRyaWMsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgICAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5jbHVzdGVyQW5ub3RhdGlvbnMsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgIF07XG4gIH1cbn1cbiJdfQ==