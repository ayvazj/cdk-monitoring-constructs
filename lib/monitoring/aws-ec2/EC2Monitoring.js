"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EC2Monitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const EC2MetricFactory_1 = require("./EC2MetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class EC2Monitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const fallbackConstructName = props.autoScalingGroup
            ? props.autoScalingGroup.autoScalingGroupName
            : "All Instances";
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            fallbackConstructName,
        });
        this.family = props.autoScalingGroup ? "EC2 Auto Scaling Group" : "EC2";
        this.title = namingStrategy.resolveHumanReadableName();
        const metricFactory = new EC2MetricFactory_1.EC2MetricFactory(scope.createMetricFactory(), props);
        this.cpuUtilisationMetrics =
            metricFactory.metricAverageCpuUtilisationPercent();
        this.diskReadBytesMetrics = metricFactory.metricAverageDiskReadBytes();
        this.diskWriteBytesMetrics = metricFactory.metricAverageDiskWriteBytes();
        this.diskReadOpsMetrics = metricFactory.metricAverageDiskReadOps();
        this.diskWriteOpsMetrics = metricFactory.metricAverageDiskWriteOps();
        this.networkInMetrics = metricFactory.metricAverageNetworkInRateBytes();
        this.networkOutMetrics = metricFactory.metricAverageNetworkOutRateBytes();
    }
    summaryWidgets() {
        return [
            // Title
            this.createTitleWidget(),
            // CPU Usage
            this.createCpuWidget(common_1.ThirdWidth, common_1.DefaultSummaryWidgetHeight),
            // Disk OPS
            this.createDiskOpsWidget(common_1.ThirdWidth, common_1.DefaultSummaryWidgetHeight),
            // Network
            this.createNetworkWidget(common_1.ThirdWidth, common_1.DefaultSummaryWidgetHeight),
        ];
    }
    widgets() {
        return [
            // Title
            this.createTitleWidget(),
            // CPU Usage
            this.createCpuWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight),
            // Disk OPS
            this.createDiskOpsWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight),
            // Disk Bytes
            this.createDiskWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight),
            // Network
            this.createNetworkWidget(common_1.QuarterWidth, common_1.DefaultGraphWidgetHeight),
        ];
    }
    createTitleWidget() {
        return new dashboard_1.MonitoringHeaderWidget({
            family: this.family,
            title: this.title,
        });
    }
    createCpuWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "CPU Utilization",
            left: [...this.cpuUtilisationMetrics],
            leftYAxis: common_1.PercentageAxisFromZeroToHundred,
        });
    }
    createDiskWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Disk - Bytes",
            left: [...this.diskReadBytesMetrics, ...this.diskWriteBytesMetrics],
            leftYAxis: common_1.SizeAxisBytesFromZero,
        });
    }
    createDiskOpsWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Disk - OPS",
            left: [...this.diskReadOpsMetrics, ...this.diskWriteOpsMetrics],
            leftYAxis: common_1.CountAxisFromZero,
        });
    }
    createNetworkWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Network",
            left: [...this.networkInMetrics, ...this.networkOutMetrics],
            leftYAxis: common_1.SizeAxisBytesFromZero,
        });
    }
}
exports.EC2Monitoring = EC2Monitoring;
_a = JSII_RTTI_SYMBOL_1;
EC2Monitoring[_a] = { fqn: "cdk-monitoring-constructs.EC2Monitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRUMyTW9uaXRvcmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVDMk1vbml0b3JpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrREFBMkU7QUFFM0UseURBQTZFO0FBQzdFLHlDQVdzQjtBQUN0QiwrQ0FHeUI7QUFRekIsTUFBYSxhQUFjLFNBQVEsbUJBQVU7SUFZM0MsWUFBWSxLQUFzQixFQUFFLEtBQXlCO1FBQzNELEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEIsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLENBQUMsZ0JBQWdCO1lBQ2xELENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CO1lBQzdDLENBQUMsQ0FBQyxlQUFlLENBQUM7UUFDcEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxvQ0FBd0IsQ0FBQztZQUNsRCxHQUFHLEtBQUs7WUFDUixxQkFBcUI7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUV2RCxNQUFNLGFBQWEsR0FBRyxJQUFJLG1DQUFnQixDQUN4QyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsRUFDM0IsS0FBSyxDQUNOLENBQUM7UUFDRixJQUFJLENBQUMscUJBQXFCO1lBQ3hCLGFBQWEsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUN2RSxJQUFJLENBQUMscUJBQXFCLEdBQUcsYUFBYSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDekUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FB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Z2V0LCBJTWV0cmljLCBJV2lkZ2V0IH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IEVDMk1ldHJpY0ZhY3RvcnksIEVDMk1ldHJpY0ZhY3RvcnlQcm9wcyB9IGZyb20gXCIuL0VDMk1ldHJpY0ZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIEJhc2VNb25pdG9yaW5nUHJvcHMsXG4gIENvdW50QXhpc0Zyb21aZXJvLFxuICBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gIERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICBNb25pdG9yaW5nLFxuICBNb25pdG9yaW5nU2NvcGUsXG4gIFBlcmNlbnRhZ2VBeGlzRnJvbVplcm9Ub0h1bmRyZWQsXG4gIFF1YXJ0ZXJXaWR0aCxcbiAgU2l6ZUF4aXNCeXRlc0Zyb21aZXJvLFxuICBUaGlyZFdpZHRoLFxufSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5pbXBvcnQge1xuICBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0LFxuICBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3ksXG59IGZyb20gXCIuLi8uLi9kYXNoYm9hcmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBFQzJNb25pdG9yaW5nT3B0aW9uc1xuICBleHRlbmRzIEVDMk1ldHJpY0ZhY3RvcnlQcm9wcyxcbiAgICBCYXNlTW9uaXRvcmluZ1Byb3BzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgRUMyTW9uaXRvcmluZ1Byb3BzIGV4dGVuZHMgRUMyTW9uaXRvcmluZ09wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIEVDMk1vbml0b3JpbmcgZXh0ZW5kcyBNb25pdG9yaW5nIHtcbiAgcmVhZG9ubHkgZmFtaWx5OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgY3B1VXRpbGlzYXRpb25NZXRyaWNzOiBJTWV0cmljW107XG4gIHJlYWRvbmx5IGRpc2tSZWFkQnl0ZXNNZXRyaWNzOiBJTWV0cmljW107XG4gIHJlYWRvbmx5IGRpc2tXcml0ZUJ5dGVzTWV0cmljczogSU1ldHJpY1tdO1xuICByZWFkb25seSBkaXNrUmVhZE9wc01ldHJpY3M6IElNZXRyaWNbXTtcbiAgcmVhZG9ubHkgZGlza1dyaXRlT3BzTWV0cmljczogSU1ldHJpY1tdO1xuICByZWFkb25seSBuZXR3b3JrSW5NZXRyaWNzOiBJTWV0cmljW107XG4gIHJlYWRvbmx5IG5ldHdvcmtPdXRNZXRyaWNzOiBJTWV0cmljW107XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IE1vbml0b3JpbmdTY29wZSwgcHJvcHM6IEVDMk1vbml0b3JpbmdQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBwcm9wcyk7XG5cbiAgICBjb25zdCBmYWxsYmFja0NvbnN0cnVjdE5hbWUgPSBwcm9wcy5hdXRvU2NhbGluZ0dyb3VwXG4gICAgICA/IHByb3BzLmF1dG9TY2FsaW5nR3JvdXAuYXV0b1NjYWxpbmdHcm91cE5hbWVcbiAgICAgIDogXCJBbGwgSW5zdGFuY2VzXCI7XG4gICAgY29uc3QgbmFtaW5nU3RyYXRlZ3kgPSBuZXcgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5KHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZmFsbGJhY2tDb25zdHJ1Y3ROYW1lLFxuICAgIH0pO1xuICAgIHRoaXMuZmFtaWx5ID0gcHJvcHMuYXV0b1NjYWxpbmdHcm91cCA/IFwiRUMyIEF1dG8gU2NhbGluZyBHcm91cFwiIDogXCJFQzJcIjtcbiAgICB0aGlzLnRpdGxlID0gbmFtaW5nU3RyYXRlZ3kucmVzb2x2ZUh1bWFuUmVhZGFibGVOYW1lKCk7XG5cbiAgICBjb25zdCBtZXRyaWNGYWN0b3J5ID0gbmV3IEVDMk1ldHJpY0ZhY3RvcnkoXG4gICAgICBzY29wZS5jcmVhdGVNZXRyaWNGYWN0b3J5KCksXG4gICAgICBwcm9wc1xuICAgICk7XG4gICAgdGhpcy5jcHVVdGlsaXNhdGlvbk1ldHJpY3MgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNBdmVyYWdlQ3B1VXRpbGlzYXRpb25QZXJjZW50KCk7XG4gICAgdGhpcy5kaXNrUmVhZEJ5dGVzTWV0cmljcyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljQXZlcmFnZURpc2tSZWFkQnl0ZXMoKTtcbiAgICB0aGlzLmRpc2tXcml0ZUJ5dGVzTWV0cmljcyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljQXZlcmFnZURpc2tXcml0ZUJ5dGVzKCk7XG4gICAgdGhpcy5kaXNrUmVhZE9wc01ldHJpY3MgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0F2ZXJhZ2VEaXNrUmVhZE9wcygpO1xuICAgIHRoaXMuZGlza1dyaXRlT3BzTWV0cmljcyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljQXZlcmFnZURpc2tXcml0ZU9wcygpO1xuICAgIHRoaXMubmV0d29ya0luTWV0cmljcyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljQXZlcmFnZU5ldHdvcmtJblJhdGVCeXRlcygpO1xuICAgIHRoaXMubmV0d29ya091dE1ldHJpY3MgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0F2ZXJhZ2VOZXR3b3JrT3V0UmF0ZUJ5dGVzKCk7XG4gIH1cblxuICBzdW1tYXJ5V2lkZ2V0cygpOiBJV2lkZ2V0W10ge1xuICAgIHJldHVybiBbXG4gICAgICAvLyBUaXRsZVxuICAgICAgdGhpcy5jcmVhdGVUaXRsZVdpZGdldCgpLFxuICAgICAgLy8gQ1BVIFVzYWdlXG4gICAgICB0aGlzLmNyZWF0ZUNwdVdpZGdldChUaGlyZFdpZHRoLCBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCksXG4gICAgICAvLyBEaXNrIE9QU1xuICAgICAgdGhpcy5jcmVhdGVEaXNrT3BzV2lkZ2V0KFRoaXJkV2lkdGgsIERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0KSxcbiAgICAgIC8vIE5ldHdvcmtcbiAgICAgIHRoaXMuY3JlYXRlTmV0d29ya1dpZGdldChUaGlyZFdpZHRoLCBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCksXG4gICAgXTtcbiAgfVxuXG4gIHdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgLy8gVGl0bGVcbiAgICAgIHRoaXMuY3JlYXRlVGl0bGVXaWRnZXQoKSxcbiAgICAgIC8vIENQVSBVc2FnZVxuICAgICAgdGhpcy5jcmVhdGVDcHVXaWRnZXQoUXVhcnRlcldpZHRoLCBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQpLFxuICAgICAgLy8gRGlzayBPUFNcbiAgICAgIHRoaXMuY3JlYXRlRGlza09wc1dpZGdldChRdWFydGVyV2lkdGgsIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCksXG4gICAgICAvLyBEaXNrIEJ5dGVzXG4gICAgICB0aGlzLmNyZWF0ZURpc2tXaWRnZXQoUXVhcnRlcldpZHRoLCBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQpLFxuICAgICAgLy8gTmV0d29ya1xuICAgICAgdGhpcy5jcmVhdGVOZXR3b3JrV2lkZ2V0KFF1YXJ0ZXJXaWR0aCwgRGVmYXVsdEdyYXBoV2lkZ2V0SGVpZ2h0KSxcbiAgICBdO1xuICB9XG5cbiAgY3JlYXRlVGl0bGVXaWRnZXQoKSB7XG4gICAgcmV0dXJuIG5ldyBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0KHtcbiAgICAgIGZhbWlseTogdGhpcy5mYW1pbHksXG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUNwdVdpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJDUFUgVXRpbGl6YXRpb25cIixcbiAgICAgIGxlZnQ6IFsuLi50aGlzLmNwdVV0aWxpc2F0aW9uTWV0cmljc10sXG4gICAgICBsZWZ0WUF4aXM6IFBlcmNlbnRhZ2VBeGlzRnJvbVplcm9Ub0h1bmRyZWQsXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVEaXNrV2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIkRpc2sgLSBCeXRlc1wiLFxuICAgICAgbGVmdDogWy4uLnRoaXMuZGlza1JlYWRCeXRlc01ldHJpY3MsIC4uLnRoaXMuZGlza1dyaXRlQnl0ZXNNZXRyaWNzXSxcbiAgICAgIGxlZnRZQXhpczogU2l6ZUF4aXNCeXRlc0Zyb21aZXJvLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlRGlza09wc1dpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJEaXNrIC0gT1BTXCIsXG4gICAgICBsZWZ0OiBbLi4udGhpcy5kaXNrUmVhZE9wc01ldHJpY3MsIC4uLnRoaXMuZGlza1dyaXRlT3BzTWV0cmljc10sXG4gICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlTmV0d29ya1dpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJOZXR3b3JrXCIsXG4gICAgICBsZWZ0OiBbLi4udGhpcy5uZXR3b3JrSW5NZXRyaWNzLCAuLi50aGlzLm5ldHdvcmtPdXRNZXRyaWNzXSxcbiAgICAgIGxlZnRZQXhpczogU2l6ZUF4aXNCeXRlc0Zyb21aZXJvLFxuICAgIH0pO1xuICB9XG59XG4iXX0=