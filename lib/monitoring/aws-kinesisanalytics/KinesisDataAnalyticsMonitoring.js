"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KinesisDataAnalyticsMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const KinesisDataAnalyticsMetricFactory_1 = require("./KinesisDataAnalyticsMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class KinesisDataAnalyticsMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            fallbackConstructName: props.application,
        });
        this.title = namingStrategy.resolveHumanReadableName();
        this.kinesisDataAnalyticsUrl = scope
            .createAwsConsoleUrlFactory()
            .getKinesisAnalyticsUrl(props.application);
        const alarmFactory = this.createAlarmFactory(namingStrategy.resolveAlarmFriendlyName());
        this.kdaAlarmFactory = new common_1.KinesisDataAnalyticsAlarmFactory(alarmFactory);
        this.downtimeAnnotations = [];
        this.fullRestartAnnotations = [];
        const metricFactory = new KinesisDataAnalyticsMetricFactory_1.KinesisDataAnalyticsMetricFactory(scope.createMetricFactory(), props);
        this.cpuUtilizationPercentMetric =
            metricFactory.metricCpuUtilizationPercent();
        this.downtimeMsMetric = metricFactory.metricDowntimeMs();
        this.fullRestartsCountMetric = metricFactory.metricFullRestartsCount();
        this.heapMemoryUtilizationPercentMetric =
            metricFactory.metricHeapMemoryUtilizationPercent();
        this.kpusCountMetric = metricFactory.metricKPUsCount();
        this.lastCheckpointDurationMsMetric =
            metricFactory.metricLastCheckpointDurationMs();
        this.lastCheckpointSizeBytesMetric =
            metricFactory.metricLastCheckpointSizeBytes();
        this.numberOfFailedCheckpointsCountMetric =
            metricFactory.metricNumberOfFailedCheckpointsCount();
        this.oldGenerationGCCountMetric =
            metricFactory.metricOldGenerationGCCount();
        this.oldGenerationGCTimeMsMetric =
            metricFactory.metricOldGenerationGCTimeMs();
        for (const disambiguator in props.addDowntimeAlarm) {
            const alarmProps = props.addDowntimeAlarm[disambiguator];
            const createdAlarm = this.kdaAlarmFactory.addDowntimeAlarm(this.downtimeMsMetric, alarmProps, disambiguator);
            this.downtimeAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addFullRestartCountAlarm) {
            const alarmProps = props.addFullRestartCountAlarm[disambiguator];
            const createdAlarm = this.kdaAlarmFactory.addFullRestartAlarm(this.fullRestartsCountMetric, alarmProps, disambiguator);
            this.fullRestartAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        return [
            this.createTitleWidget(),
            ...this.createSummaryWidgetRow(common_1.DefaultSummaryWidgetHeight),
        ];
    }
    widgets() {
        return [
            this.createTitleWidget(),
            ...this.createSummaryWidgetRow(common_1.DefaultGraphWidgetHeight),
            ...this.createCheckpointAndGcWidgets(),
        ];
    }
    createTitleWidget() {
        return new dashboard_1.MonitoringHeaderWidget({
            family: "Kinesis Data Analytics",
            title: this.title,
            goToLinkUrl: this.kinesisDataAnalyticsUrl,
        });
    }
    createKPUWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "KPU Usage",
            left: [this.kpusCountMetric],
            leftYAxis: common_1.CountAxisFromZero,
        });
    }
    createResourceUtilizationWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Resource Utilization",
            left: [
                this.cpuUtilizationPercentMetric,
                this.heapMemoryUtilizationPercentMetric,
            ],
            leftYAxis: common_1.PercentageAxisFromZeroToHundred,
        });
    }
    createDownTimeWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Down Time",
            left: [this.downtimeMsMetric],
            leftYAxis: common_1.TimeAxisMillisFromZero,
            leftAnnotations: this.downtimeAnnotations,
        });
    }
    createFullRestartsWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Full Restarts",
            left: [this.fullRestartsCountMetric],
            leftYAxis: common_1.CountAxisFromZero,
            leftAnnotations: this.fullRestartAnnotations,
        });
    }
    createNumberOfFailedCheckpointsWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Checkpoint Failures",
            left: [this.numberOfFailedCheckpointsCountMetric],
            leftYAxis: common_1.CountAxisFromZero,
        });
    }
    createLastCheckpointDurationWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Checkpoint Duration",
            left: [this.lastCheckpointDurationMsMetric],
            leftYAxis: common_1.TimeAxisMillisFromZero,
        });
    }
    createLastCheckpointSizeWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Checkpoint Size",
            left: [this.lastCheckpointSizeBytesMetric],
            leftYAxis: common_1.SizeAxisBytesFromZero,
        });
    }
    createGarbageCollectionWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Garbage Collection",
            left: [this.oldGenerationGCCountMetric],
            leftYAxis: common_1.CountAxisFromZero,
            right: [this.oldGenerationGCTimeMsMetric],
            rightYAxis: common_1.TimeAxisMillisFromZero,
        });
    }
    createSummaryWidgetRow(height) {
        return [
            // KPUs
            this.createKPUWidget(common_1.QuarterWidth, height),
            // CPU And Heap Usage
            this.createResourceUtilizationWidget(common_1.QuarterWidth, height),
            // Down Time and Up Time
            this.createDownTimeWidget(common_1.QuarterWidth, height),
            // Full Restarts
            this.createFullRestartsWidget(common_1.QuarterWidth, height),
        ];
    }
    createCheckpointAndGcWidgets() {
        return [
            // Checkpointing
            this.createNumberOfFailedCheckpointsWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight),
            // Checkpoint Duration
            this.createLastCheckpointDurationWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight),
            // Checkpoint Size
            this.createLastCheckpointSizeWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight),
            // Garbage Collection
            this.createGarbageCollectionWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight),
        ];
    }
}
exports.KinesisDataAnalyticsMonitoring = KinesisDataAnalyticsMonitoring;
_a = JSII_RTTI_SYMBOL_1;
KinesisDataAnalyticsMonitoring[_a] = { fqn: "cdk-monitoring-constructs.KinesisDataAnalyticsMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2luZXNpc0RhdGFBbmFseXRpY3NNb25pdG9yaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiS2luZXNpc0RhdGFBbmFseXRpY3NNb25pdG9yaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBSW9DO0FBRXBDLDJGQUc2QztBQUM3Qyx5Q0Flc0I7QUFDdEIsK0NBR3lCO0FBYXpCLE1BQWEsOEJBQStCLFNBQVEsbUJBQVU7SUFtQjVELFlBQ0UsS0FBc0IsRUFDdEIsS0FBMEM7UUFFMUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwQixNQUFNLGNBQWMsR0FBRyxJQUFJLG9DQUF3QixDQUFDO1lBQ2xELEdBQUcsS0FBSztZQUNSLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxXQUFXO1NBQ3pDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUs7YUFDakMsMEJBQTBCLEVBQUU7YUFDNUIsc0JBQXNCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FDMUMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQzFDLENBQUM7UUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUkseUNBQWdDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1FBRWpDLE1BQU0sYUFBYSxHQUFHLElBQUkscUVBQWlDLENBQ3pELEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxFQUMzQixLQUFLLENBQ04sQ0FBQztRQUVGLElBQUksQ0FBQywyQkFBMkI7WUFDOUIsYUFBYSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDOUMs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Q0osQ0FBQztJQUVPLDRCQUE0QjtRQUNsQyxPQUFPO1lBQ0wsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxxQ0FBcUMsQ0FDeEMscUJBQVksRUFDWixpQ0FBd0IsQ0FDekI7WUFDRCxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLGtDQUFrQyxDQUNyQyxxQkFBWSxFQUNaLGlDQUF3QixDQUN6QjtZQUNELGtCQUFrQjtZQUNsQixJQUFJLENBQUMsOEJBQThCLENBQ2pDLHFCQUFZLEVBQ1osaUNBQXdCLENBQ3pCO1lBQ0QscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyw2QkFBNkIsQ0FDaEMscUJBQVksRUFDWixpQ0FBd0IsQ0FDekI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7QUEzT0gsd0VBNE9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR3JhcGhXaWRnZXQsXG4gIEhvcml6b250YWxBbm5vdGF0aW9uLFxuICBJV2lkZ2V0LFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHtcbiAgS2luZXNpc0RhdGFBbmFseXRpY3NNZXRyaWNGYWN0b3J5LFxuICBLaW5lc2lzRGF0YUFuYWx5dGljc01ldHJpY0ZhY3RvcnlQcm9wcyxcbn0gZnJvbSBcIi4vS2luZXNpc0RhdGFBbmFseXRpY3NNZXRyaWNGYWN0b3J5XCI7XG5pbXBvcnQge1xuICBCYXNlTW9uaXRvcmluZ1Byb3BzLFxuICBDb3VudEF4aXNGcm9tWmVybyxcbiAgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0LFxuICBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCxcbiAgRnVsbFJlc3RhcnRDb3VudFRocmVzaG9sZCxcbiAgS2luZXNpc0RhdGFBbmFseXRpY3NBbGFybUZhY3RvcnksXG4gIE1heERvd250aW1lVGhyZXNob2xkLFxuICBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICBNb25pdG9yaW5nLFxuICBNb25pdG9yaW5nU2NvcGUsXG4gIFBlcmNlbnRhZ2VBeGlzRnJvbVplcm9Ub0h1bmRyZWQsXG4gIFF1YXJ0ZXJXaWR0aCxcbiAgU2l6ZUF4aXNCeXRlc0Zyb21aZXJvLFxuICBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5pbXBvcnQge1xuICBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0LFxuICBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3ksXG59IGZyb20gXCIuLi8uLi9kYXNoYm9hcmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBLaW5lc2lzRGF0YUFuYWx5dGljc01vbml0b3JpbmdPcHRpb25zXG4gIGV4dGVuZHMgQmFzZU1vbml0b3JpbmdQcm9wcyB7XG4gIHJlYWRvbmx5IGFkZERvd250aW1lQWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBNYXhEb3dudGltZVRocmVzaG9sZD47XG5cbiAgcmVhZG9ubHkgYWRkRnVsbFJlc3RhcnRDb3VudEFsYXJtPzogUmVjb3JkPHN0cmluZywgRnVsbFJlc3RhcnRDb3VudFRocmVzaG9sZD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2luZXNpc0RhdGFBbmFseXRpY3NNb25pdG9yaW5nUHJvcHNcbiAgZXh0ZW5kcyBLaW5lc2lzRGF0YUFuYWx5dGljc01ldHJpY0ZhY3RvcnlQcm9wcyxcbiAgICBLaW5lc2lzRGF0YUFuYWx5dGljc01vbml0b3JpbmdPcHRpb25zIHt9XG5cbmV4cG9ydCBjbGFzcyBLaW5lc2lzRGF0YUFuYWx5dGljc01vbml0b3JpbmcgZXh0ZW5kcyBNb25pdG9yaW5nIHtcbiAgcmVhZG9ubHkgdGl0bGU6IHN0cmluZztcbiAgcmVhZG9ubHkga2luZXNpc0RhdGFBbmFseXRpY3NVcmw/OiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkga2RhQWxhcm1GYWN0b3J5OiBLaW5lc2lzRGF0YUFuYWx5dGljc0FsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgZG93bnRpbWVBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgZnVsbFJlc3RhcnRBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcblxuICByZWFkb25seSBjcHVVdGlsaXphdGlvblBlcmNlbnRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGRvd250aW1lTXNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGZ1bGxSZXN0YXJ0c0NvdW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBoZWFwTWVtb3J5VXRpbGl6YXRpb25QZXJjZW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBrcHVzQ291bnRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGxhc3RDaGVja3BvaW50RHVyYXRpb25Nc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgbGFzdENoZWNrcG9pbnRTaXplQnl0ZXNNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IG51bWJlck9mRmFpbGVkQ2hlY2twb2ludHNDb3VudE1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgb2xkR2VuZXJhdGlvbkdDQ291bnRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IG9sZEdlbmVyYXRpb25HQ1RpbWVNc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzY29wZTogTW9uaXRvcmluZ1Njb3BlLFxuICAgIHByb3BzOiBLaW5lc2lzRGF0YUFuYWx5dGljc01vbml0b3JpbmdQcm9wc1xuICApIHtcbiAgICBzdXBlcihzY29wZSwgcHJvcHMpO1xuXG4gICAgY29uc3QgbmFtaW5nU3RyYXRlZ3kgPSBuZXcgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5KHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZmFsbGJhY2tDb25zdHJ1Y3ROYW1lOiBwcm9wcy5hcHBsaWNhdGlvbixcbiAgICB9KTtcbiAgICB0aGlzLnRpdGxlID0gbmFtaW5nU3RyYXRlZ3kucmVzb2x2ZUh1bWFuUmVhZGFibGVOYW1lKCk7XG4gICAgdGhpcy5raW5lc2lzRGF0YUFuYWx5dGljc1VybCA9IHNjb3BlXG4gICAgICAuY3JlYXRlQXdzQ29uc29sZVVybEZhY3RvcnkoKVxuICAgICAgLmdldEtpbmVzaXNBbmFseXRpY3NVcmwocHJvcHMuYXBwbGljYXRpb24pO1xuXG4gICAgY29uc3QgYWxhcm1GYWN0b3J5ID0gdGhpcy5jcmVhdGVBbGFybUZhY3RvcnkoXG4gICAgICBuYW1pbmdTdHJhdGVneS5yZXNvbHZlQWxhcm1GcmllbmRseU5hbWUoKVxuICAgICk7XG4gICAgdGhpcy5rZGFBbGFybUZhY3RvcnkgPSBuZXcgS2luZXNpc0RhdGFBbmFseXRpY3NBbGFybUZhY3RvcnkoYWxhcm1GYWN0b3J5KTtcbiAgICB0aGlzLmRvd250aW1lQW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmZ1bGxSZXN0YXJ0QW5ub3RhdGlvbnMgPSBbXTtcblxuICAgIGNvbnN0IG1ldHJpY0ZhY3RvcnkgPSBuZXcgS2luZXNpc0RhdGFBbmFseXRpY3NNZXRyaWNGYWN0b3J5KFxuICAgICAgc2NvcGUuY3JlYXRlTWV0cmljRmFjdG9yeSgpLFxuICAgICAgcHJvcHNcbiAgICApO1xuXG4gICAgdGhpcy5jcHVVdGlsaXphdGlvblBlcmNlbnRNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNDcHVVdGlsaXphdGlvblBlcmNlbnQoKTtcbiAgICB0aGlzLmRvd250aW1lTXNNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0Rvd250aW1lTXMoKTtcbiAgICB0aGlzLmZ1bGxSZXN0YXJ0c0NvdW50TWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNGdWxsUmVzdGFydHNDb3VudCgpO1xuICAgIHRoaXMuaGVhcE1lbW9yeVV0aWxpemF0aW9uUGVyY2VudE1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0hlYXBNZW1vcnlVdGlsaXphdGlvblBlcmNlbnQoKTtcbiAgICB0aGlzLmtwdXNDb3VudE1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljS1BVc0NvdW50KCk7XG4gICAgdGhpcy5sYXN0Q2hlY2twb2ludER1cmF0aW9uTXNNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNMYXN0Q2hlY2twb2ludER1cmF0aW9uTXMoKTtcbiAgICB0aGlzLmxhc3RDaGVja3BvaW50U2l6ZUJ5dGVzTWV0cmljID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljTGFzdENoZWNrcG9pbnRTaXplQnl0ZXMoKTtcbiAgICB0aGlzLm51bWJlck9mRmFpbGVkQ2hlY2twb2ludHNDb3VudE1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY051bWJlck9mRmFpbGVkQ2hlY2twb2ludHNDb3VudCgpO1xuICAgIHRoaXMub2xkR2VuZXJhdGlvbkdDQ291bnRNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNPbGRHZW5lcmF0aW9uR0NDb3VudCgpO1xuICAgIHRoaXMub2xkR2VuZXJhdGlvbkdDVGltZU1zTWV0cmljID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljT2xkR2VuZXJhdGlvbkdDVGltZU1zKCk7XG5cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkRG93bnRpbWVBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZERvd250aW1lQWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPSB0aGlzLmtkYUFsYXJtRmFjdG9yeS5hZGREb3dudGltZUFsYXJtKFxuICAgICAgICB0aGlzLmRvd250aW1lTXNNZXRyaWMsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmRvd250aW1lQW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZEZ1bGxSZXN0YXJ0Q291bnRBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZEZ1bGxSZXN0YXJ0Q291bnRBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMua2RhQWxhcm1GYWN0b3J5LmFkZEZ1bGxSZXN0YXJ0QWxhcm0oXG4gICAgICAgIHRoaXMuZnVsbFJlc3RhcnRzQ291bnRNZXRyaWMsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmZ1bGxSZXN0YXJ0QW5ub3RhdGlvbnMucHVzaChjcmVhdGVkQWxhcm0uYW5ub3RhdGlvbik7XG4gICAgICB0aGlzLmFkZEFsYXJtKGNyZWF0ZWRBbGFybSk7XG4gICAgfVxuXG4gICAgcHJvcHMudXNlQ3JlYXRlZEFsYXJtcz8uY29uc3VtZSh0aGlzLmNyZWF0ZWRBbGFybXMoKSk7XG4gIH1cblxuICBzdW1tYXJ5V2lkZ2V0cygpOiBJV2lkZ2V0W10ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNyZWF0ZVRpdGxlV2lkZ2V0KCksXG4gICAgICAuLi50aGlzLmNyZWF0ZVN1bW1hcnlXaWRnZXRSb3coRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQpLFxuICAgIF07XG4gIH1cblxuICB3aWRnZXRzKCk6IElXaWRnZXRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuY3JlYXRlVGl0bGVXaWRnZXQoKSxcbiAgICAgIC4uLnRoaXMuY3JlYXRlU3VtbWFyeVdpZGdldFJvdyhEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQpLFxuICAgICAgLi4udGhpcy5jcmVhdGVDaGVja3BvaW50QW5kR2NXaWRnZXRzKCksXG4gICAgXTtcbiAgfVxuXG4gIGNyZWF0ZVRpdGxlV2lkZ2V0KCkge1xuICAgIHJldHVybiBuZXcgTW9uaXRvcmluZ0hlYWRlcldpZGdldCh7XG4gICAgICBmYW1pbHk6IFwiS2luZXNpcyBEYXRhIEFuYWx5dGljc1wiLFxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICBnb1RvTGlua1VybDogdGhpcy5raW5lc2lzRGF0YUFuYWx5dGljc1VybCxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUtQVVdpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJLUFUgVXNhZ2VcIixcbiAgICAgIGxlZnQ6IFt0aGlzLmtwdXNDb3VudE1ldHJpY10sXG4gICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlUmVzb3VyY2VVdGlsaXphdGlvbldpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJSZXNvdXJjZSBVdGlsaXphdGlvblwiLFxuICAgICAgbGVmdDogW1xuICAgICAgICB0aGlzLmNwdVV0aWxpemF0aW9uUGVyY2VudE1ldHJpYyxcbiAgICAgICAgdGhpcy5oZWFwTWVtb3J5VXRpbGl6YXRpb25QZXJjZW50TWV0cmljLFxuICAgICAgXSxcbiAgICAgIGxlZnRZQXhpczogUGVyY2VudGFnZUF4aXNGcm9tWmVyb1RvSHVuZHJlZCxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZURvd25UaW1lV2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIkRvd24gVGltZVwiLFxuICAgICAgbGVmdDogW3RoaXMuZG93bnRpbWVNc01ldHJpY10sXG4gICAgICBsZWZ0WUF4aXM6IFRpbWVBeGlzTWlsbGlzRnJvbVplcm8sXG4gICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZG93bnRpbWVBbm5vdGF0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUZ1bGxSZXN0YXJ0c1dpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJGdWxsIFJlc3RhcnRzXCIsXG4gICAgICBsZWZ0OiBbdGhpcy5mdWxsUmVzdGFydHNDb3VudE1ldHJpY10sXG4gICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmZ1bGxSZXN0YXJ0QW5ub3RhdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVOdW1iZXJPZkZhaWxlZENoZWNrcG9pbnRzV2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIkNoZWNrcG9pbnQgRmFpbHVyZXNcIixcbiAgICAgIGxlZnQ6IFt0aGlzLm51bWJlck9mRmFpbGVkQ2hlY2twb2ludHNDb3VudE1ldHJpY10sXG4gICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlTGFzdENoZWNrcG9pbnREdXJhdGlvbldpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJDaGVja3BvaW50IER1cmF0aW9uXCIsXG4gICAgICBsZWZ0OiBbdGhpcy5sYXN0Q2hlY2twb2ludER1cmF0aW9uTXNNZXRyaWNdLFxuICAgICAgbGVmdFlBeGlzOiBUaW1lQXhpc01pbGxpc0Zyb21aZXJvLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlTGFzdENoZWNrcG9pbnRTaXplV2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIkNoZWNrcG9pbnQgU2l6ZVwiLFxuICAgICAgbGVmdDogW3RoaXMubGFzdENoZWNrcG9pbnRTaXplQnl0ZXNNZXRyaWNdLFxuICAgICAgbGVmdFlBeGlzOiBTaXplQXhpc0J5dGVzRnJvbVplcm8sXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVHYXJiYWdlQ29sbGVjdGlvbldpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJHYXJiYWdlIENvbGxlY3Rpb25cIixcbiAgICAgIGxlZnQ6IFt0aGlzLm9sZEdlbmVyYXRpb25HQ0NvdW50TWV0cmljXSxcbiAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICByaWdodDogW3RoaXMub2xkR2VuZXJhdGlvbkdDVGltZU1zTWV0cmljXSxcbiAgICAgIHJpZ2h0WUF4aXM6IFRpbWVBeGlzTWlsbGlzRnJvbVplcm8sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVN1bW1hcnlXaWRnZXRSb3coaGVpZ2h0OiBudW1iZXIpOiBHcmFwaFdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgLy8gS1BVc1xuICAgICAgdGhpcy5jcmVhdGVLUFVXaWRnZXQoUXVhcnRlcldpZHRoLCBoZWlnaHQpLFxuICAgICAgLy8gQ1BVIEFuZCBIZWFwIFVzYWdlXG4gICAgICB0aGlzLmNyZWF0ZVJlc291cmNlVXRpbGl6YXRpb25XaWRnZXQoUXVhcnRlcldpZHRoLCBoZWlnaHQpLFxuICAgICAgLy8gRG93biBUaW1lIGFuZCBVcCBUaW1lXG4gICAgICB0aGlzLmNyZWF0ZURvd25UaW1lV2lkZ2V0KFF1YXJ0ZXJXaWR0aCwgaGVpZ2h0KSxcbiAgICAgIC8vIEZ1bGwgUmVzdGFydHNcbiAgICAgIHRoaXMuY3JlYXRlRnVsbFJlc3RhcnRzV2lkZ2V0KFF1YXJ0ZXJXaWR0aCwgaGVpZ2h0KSxcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDaGVja3BvaW50QW5kR2NXaWRnZXRzKCk6IEdyYXBoV2lkZ2V0W10ge1xuICAgIHJldHVybiBbXG4gICAgICAvLyBDaGVja3BvaW50aW5nXG4gICAgICB0aGlzLmNyZWF0ZU51bWJlck9mRmFpbGVkQ2hlY2twb2ludHNXaWRnZXQoXG4gICAgICAgIFF1YXJ0ZXJXaWR0aCxcbiAgICAgICAgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0XG4gICAgICApLFxuICAgICAgLy8gQ2hlY2twb2ludCBEdXJhdGlvblxuICAgICAgdGhpcy5jcmVhdGVMYXN0Q2hlY2twb2ludER1cmF0aW9uV2lkZ2V0KFxuICAgICAgICBRdWFydGVyV2lkdGgsXG4gICAgICAgIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodFxuICAgICAgKSxcbiAgICAgIC8vIENoZWNrcG9pbnQgU2l6ZVxuICAgICAgdGhpcy5jcmVhdGVMYXN0Q2hlY2twb2ludFNpemVXaWRnZXQoXG4gICAgICAgIFF1YXJ0ZXJXaWR0aCxcbiAgICAgICAgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0XG4gICAgICApLFxuICAgICAgLy8gR2FyYmFnZSBDb2xsZWN0aW9uXG4gICAgICB0aGlzLmNyZWF0ZUdhcmJhZ2VDb2xsZWN0aW9uV2lkZ2V0KFxuICAgICAgICBRdWFydGVyV2lkdGgsXG4gICAgICAgIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodFxuICAgICAgKSxcbiAgICBdO1xuICB9XG59XG4iXX0=