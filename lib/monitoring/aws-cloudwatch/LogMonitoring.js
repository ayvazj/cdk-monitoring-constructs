"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const CloudWatchLogsMetricFactory_1 = require("./CloudWatchLogsMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
const DefaultLimit = 10;
/**
 * Monitors a CloudWatch log group for various patterns.
 */
class LogMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope);
        this.logGroupName = props.logGroupName;
        this.logGroupUrl = scope
            .createAwsConsoleUrlFactory()
            .getCloudWatchLogGroupUrl(props.logGroupName);
        this.title = props.title;
        this.pattern = props.pattern;
        this.limit = props.limit ?? DefaultLimit;
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            fallbackConstructName: this.logGroupName,
        });
        this.alarmFactory = this.createAlarmFactory(namingStrategy.resolveAlarmFriendlyName());
        this.usageAlarmFactory = new common_1.UsageAlarmFactory(this.alarmFactory);
        this.usageAnnotations = [];
        const metricFactory = new CloudWatchLogsMetricFactory_1.CloudWatchLogsMetricFactory(scope.createMetricFactory(), props);
        this.incomingLogEventsMetric = metricFactory.metricIncomingLogEvents();
        for (const disambiguator in props.addMinIncomingLogsAlarm) {
            const alarmProps = props.addMinIncomingLogsAlarm[disambiguator];
            const createdAlarm = this.usageAlarmFactory.addMinUsageCountAlarm(this.incomingLogEventsMetric, alarmProps, disambiguator);
            this.usageAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    summaryWidgets() {
        return [
            this.createTitleWidget(),
            this.createIncomingLogsWidget(common_1.FullWidth, common_1.DefaultSummaryWidgetHeight),
        ];
    }
    widgets() {
        if (this.pattern) {
            const height = this.resolveRecommendedHeight(this.limit);
            return [
                this.createTitleWidget(),
                // Log Query Results
                new aws_cloudwatch_1.LogQueryWidget({
                    logGroupNames: [this.logGroupName],
                    height,
                    width: common_1.ThreeQuartersWidth,
                    title: this.title ?? `Find ${this.pattern} (limit = ${this.limit})`,
                    /**
                     * https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html
                     */
                    queryLines: [
                        "fields @timestamp, @logStream, @message",
                        `filter @message like /${this.pattern}/`,
                        "sort @timestamp desc",
                        `limit ${this.limit}`,
                    ],
                }),
                this.createIncomingLogsWidget(common_1.QuarterWidth, height),
            ];
        }
        else {
            return [
                this.createTitleWidget(),
                this.createIncomingLogsWidget(common_1.FullWidth, common_1.DefaultGraphWidgetHeight),
            ];
        }
    }
    createTitleWidget() {
        return new dashboard_1.MonitoringHeaderWidget({
            family: "Log Group",
            title: this.logGroupName,
            goToLinkUrl: this.logGroupUrl,
        });
    }
    createIncomingLogsWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Incoming logs",
            left: [this.incomingLogEventsMetric],
            leftYAxis: common_1.CountAxisFromZero,
            leftAnnotations: this.usageAnnotations,
        });
    }
    resolveRecommendedHeight(numRows) {
        const heightPerLine = 1;
        const recommendedHeight = heightPerLine * numRows;
        return Math.max(recommendedHeight, common_1.DefaultLogWidgetHeight);
    }
}
exports.LogMonitoring = LogMonitoring;
_a = JSII_RTTI_SYMBOL_1;
LogMonitoring[_a] = { fqn: "cdk-monitoring-constructs.LogMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nTW9uaXRvcmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxvZ01vbml0b3JpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrREFLb0M7QUFFcEMsK0VBR3VDO0FBQ3ZDLHlDQWVzQjtBQUN0QiwrQ0FHeUI7QUFFekIsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBMkJ4Qjs7R0FFRztBQUNILE1BQWEsYUFBYyxTQUFRLG1CQUFVO0lBZTNDLFlBQVksS0FBc0IsRUFBRSxLQUF5QjtRQUMzRCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLO2FBQ3JCLDBCQUEwQixFQUFFO2FBQzVCLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFFekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUM7UUFFekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxvQ0FBd0IsQ0FBQztZQUNsRCxHQUFHLEtBQUs7WUFDUixxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWTtTQUN6QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FDekMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQzFDLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSwwQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUUzQixNQUFNLGFBQWEsR0FBRyxJQUFJLHlEQUEy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QUUsK0JBQXNCLENBQUMsQ0FBQztJQUM3RCxDQUFDOztBQTNISCxzQ0E0SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHcmFwaFdpZGdldCxcbiAgSG9yaXpvbnRhbEFubm90YXRpb24sXG4gIElXaWRnZXQsXG4gIExvZ1F1ZXJ5V2lkZ2V0LFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHtcbiAgQ2xvdWRXYXRjaExvZ3NNZXRyaWNGYWN0b3J5LFxuICBDbG91ZFdhdGNoTG9nc01ldHJpY0ZhY3RvcnlQcm9wcyxcbn0gZnJvbSBcIi4vQ2xvdWRXYXRjaExvZ3NNZXRyaWNGYWN0b3J5XCI7XG5pbXBvcnQge1xuICBBbGFybUZhY3RvcnksXG4gIEJhc2VNb25pdG9yaW5nUHJvcHMsXG4gIENvdW50QXhpc0Zyb21aZXJvLFxuICBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gIERlZmF1bHRMb2dXaWRnZXRIZWlnaHQsXG4gIERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICBGdWxsV2lkdGgsXG4gIE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gIE1pblVzYWdlQ291bnRUaHJlc2hvbGQsXG4gIE1vbml0b3JpbmcsXG4gIE1vbml0b3JpbmdTY29wZSxcbiAgUXVhcnRlcldpZHRoLFxuICBUaHJlZVF1YXJ0ZXJzV2lkdGgsXG4gIFVzYWdlQWxhcm1GYWN0b3J5LFxufSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5pbXBvcnQge1xuICBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0LFxuICBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3ksXG59IGZyb20gXCIuLi8uLi9kYXNoYm9hcmRcIjtcblxuY29uc3QgRGVmYXVsdExpbWl0ID0gMTA7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nTW9uaXRvcmluZ1Byb3BzXG4gIGV4dGVuZHMgQmFzZU1vbml0b3JpbmdQcm9wcyxcbiAgICBDbG91ZFdhdGNoTG9nc01ldHJpY0ZhY3RvcnlQcm9wcyB7XG4gIC8qKlxuICAgKiBXaWRnZXQgdGl0bGVcbiAgICpcbiAgICogQGRlZmF1bHQgLSBhdXRvLWdlbmVyYXRlZCB0aXRsZSBiYXNlZCBvbiB0aGUgcGF0dGVybiBhbmQgbGltaXRcbiAgICovXG4gIHJlYWRvbmx5IHRpdGxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBQYXR0ZXJuIHRvIHNlYXJjaCBmb3IsIGUuZy4gXCJFUlJPUlwiXG4gICAqL1xuICByZWFkb25seSBwYXR0ZXJuPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBNYXhpbXVtIG51bWJlciBvZiBsb2cgbWVzc2FnZXMgdG8gc2VhcmNoIGZvci5cbiAgICpcbiAgICogQGRlZmF1bHQgLSAxMFxuICAgKi9cbiAgcmVhZG9ubHkgbGltaXQ/OiBudW1iZXI7XG5cbiAgcmVhZG9ubHkgYWRkTWluSW5jb21pbmdMb2dzQWxhcm0/OiBSZWNvcmQ8c3RyaW5nLCBNaW5Vc2FnZUNvdW50VGhyZXNob2xkPjtcbn1cblxuLyoqXG4gKiBNb25pdG9ycyBhIENsb3VkV2F0Y2ggbG9nIGdyb3VwIGZvciB2YXJpb3VzIHBhdHRlcm5zLlxuICovXG5leHBvcnQgY2xhc3MgTG9nTW9uaXRvcmluZyBleHRlbmRzIE1vbml0b3Jpbmcge1xuICByZWFkb25seSBsb2dHcm91cE5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgbG9nR3JvdXBVcmw/OiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgdGl0bGU/OiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgcGF0dGVybj86IHN0cmluZztcbiAgcmVhZG9ubHkgbGltaXQ6IG51bWJlcjtcblxuICByZWFkb25seSBhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgdXNhZ2VBbGFybUZhY3Rvcnk6IFVzYWdlQWxhcm1GYWN0b3J5O1xuICByZWFkb25seSBpbmNvbWluZ0xvZ0V2ZW50c01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcblxuICByZWFkb25seSB1c2FnZUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBNb25pdG9yaW5nU2NvcGUsIHByb3BzOiBMb2dNb25pdG9yaW5nUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSk7XG5cbiAgICB0aGlzLmxvZ0dyb3VwTmFtZSA9IHByb3BzLmxvZ0dyb3VwTmFtZTtcbiAgICB0aGlzLmxvZ0dyb3VwVXJsID0gc2NvcGVcbiAgICAgIC5jcmVhdGVBd3NDb25zb2xlVXJsRmFjdG9yeSgpXG4gICAgICAuZ2V0Q2xvdWRXYXRjaExvZ0dyb3VwVXJsKHByb3BzLmxvZ0dyb3VwTmFtZSk7XG5cbiAgICB0aGlzLnRpdGxlID0gcHJvcHMudGl0bGU7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBwcm9wcy5wYXR0ZXJuO1xuICAgIHRoaXMubGltaXQgPSBwcm9wcy5saW1pdCA/PyBEZWZhdWx0TGltaXQ7XG5cbiAgICBjb25zdCBuYW1pbmdTdHJhdGVneSA9IG5ldyBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3koe1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBmYWxsYmFja0NvbnN0cnVjdE5hbWU6IHRoaXMubG9nR3JvdXBOYW1lLFxuICAgIH0pO1xuICAgIHRoaXMuYWxhcm1GYWN0b3J5ID0gdGhpcy5jcmVhdGVBbGFybUZhY3RvcnkoXG4gICAgICBuYW1pbmdTdHJhdGVneS5yZXNvbHZlQWxhcm1GcmllbmRseU5hbWUoKVxuICAgICk7XG4gICAgdGhpcy51c2FnZUFsYXJtRmFjdG9yeSA9IG5ldyBVc2FnZUFsYXJtRmFjdG9yeSh0aGlzLmFsYXJtRmFjdG9yeSk7XG5cbiAgICB0aGlzLnVzYWdlQW5ub3RhdGlvbnMgPSBbXTtcblxuICAgIGNvbnN0IG1ldHJpY0ZhY3RvcnkgPSBuZXcgQ2xvdWRXYXRjaExvZ3NNZXRyaWNGYWN0b3J5KFxuICAgICAgc2NvcGUuY3JlYXRlTWV0cmljRmFjdG9yeSgpLFxuICAgICAgcHJvcHNcbiAgICApO1xuICAgIHRoaXMuaW5jb21pbmdMb2dFdmVudHNNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0luY29taW5nTG9nRXZlbnRzKCk7XG5cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkTWluSW5jb21pbmdMb2dzQWxhcm0pIHtcbiAgICAgIGNvbnN0IGFsYXJtUHJvcHMgPSBwcm9wcy5hZGRNaW5JbmNvbWluZ0xvZ3NBbGFybVtkaXNhbWJpZ3VhdG9yXTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRBbGFybSA9IHRoaXMudXNhZ2VBbGFybUZhY3RvcnkuYWRkTWluVXNhZ2VDb3VudEFsYXJtKFxuICAgICAgICB0aGlzLmluY29taW5nTG9nRXZlbnRzTWV0cmljLFxuICAgICAgICBhbGFybVByb3BzLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICApO1xuICAgICAgdGhpcy51c2FnZUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cblxuICAgIHByb3BzLnVzZUNyZWF0ZWRBbGFybXM/LmNvbnN1bWUodGhpcy5jcmVhdGVkQWxhcm1zKCkpO1xuICB9XG5cbiAgc3VtbWFyeVdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5jcmVhdGVUaXRsZVdpZGdldCgpLFxuICAgICAgdGhpcy5jcmVhdGVJbmNvbWluZ0xvZ3NXaWRnZXQoRnVsbFdpZHRoLCBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCksXG4gICAgXTtcbiAgfVxuXG4gIHdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICBpZiAodGhpcy5wYXR0ZXJuKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnJlc29sdmVSZWNvbW1lbmRlZEhlaWdodCh0aGlzLmxpbWl0KTtcblxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdGhpcy5jcmVhdGVUaXRsZVdpZGdldCgpLFxuXG4gICAgICAgIC8vIExvZyBRdWVyeSBSZXN1bHRzXG4gICAgICAgIG5ldyBMb2dRdWVyeVdpZGdldCh7XG4gICAgICAgICAgbG9nR3JvdXBOYW1lczogW3RoaXMubG9nR3JvdXBOYW1lXSxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgd2lkdGg6IFRocmVlUXVhcnRlcnNXaWR0aCxcbiAgICAgICAgICB0aXRsZTogdGhpcy50aXRsZSA/PyBgRmluZCAke3RoaXMucGF0dGVybn0gKGxpbWl0ID0gJHt0aGlzLmxpbWl0fSlgLFxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BbWF6b25DbG91ZFdhdGNoL2xhdGVzdC9sb2dzL0NXTF9RdWVyeVN5bnRheC5odG1sXG4gICAgICAgICAgICovXG4gICAgICAgICAgcXVlcnlMaW5lczogW1xuICAgICAgICAgICAgXCJmaWVsZHMgQHRpbWVzdGFtcCwgQGxvZ1N0cmVhbSwgQG1lc3NhZ2VcIixcbiAgICAgICAgICAgIGBmaWx0ZXIgQG1lc3NhZ2UgbGlrZSAvJHt0aGlzLnBhdHRlcm59L2AsXG4gICAgICAgICAgICBcInNvcnQgQHRpbWVzdGFtcCBkZXNjXCIsXG4gICAgICAgICAgICBgbGltaXQgJHt0aGlzLmxpbWl0fWAsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSksXG5cbiAgICAgICAgdGhpcy5jcmVhdGVJbmNvbWluZ0xvZ3NXaWRnZXQoUXVhcnRlcldpZHRoLCBoZWlnaHQpLFxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdGhpcy5jcmVhdGVUaXRsZVdpZGdldCgpLFxuICAgICAgICB0aGlzLmNyZWF0ZUluY29taW5nTG9nc1dpZGdldChGdWxsV2lkdGgsIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCksXG4gICAgICBdO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVRpdGxlV2lkZ2V0KCkge1xuICAgIHJldHVybiBuZXcgTW9uaXRvcmluZ0hlYWRlcldpZGdldCh7XG4gICAgICBmYW1pbHk6IFwiTG9nIEdyb3VwXCIsXG4gICAgICB0aXRsZTogdGhpcy5sb2dHcm91cE5hbWUsXG4gICAgICBnb1RvTGlua1VybDogdGhpcy5sb2dHcm91cFVybCxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUluY29taW5nTG9nc1dpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJJbmNvbWluZyBsb2dzXCIsXG4gICAgICBsZWZ0OiBbdGhpcy5pbmNvbWluZ0xvZ0V2ZW50c01ldHJpY10sXG4gICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLnVzYWdlQW5ub3RhdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVzb2x2ZVJlY29tbWVuZGVkSGVpZ2h0KG51bVJvd3M6IG51bWJlcikge1xuICAgIGNvbnN0IGhlaWdodFBlckxpbmUgPSAxO1xuICAgIGNvbnN0IHJlY29tbWVuZGVkSGVpZ2h0ID0gaGVpZ2h0UGVyTGluZSAqIG51bVJvd3M7XG4gICAgcmV0dXJuIE1hdGgubWF4KHJlY29tbWVuZGVkSGVpZ2h0LCBEZWZhdWx0TG9nV2lkZ2V0SGVpZ2h0KTtcbiAgfVxufVxuIl19