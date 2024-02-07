"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoScalingGroupMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const AutoScalingGroupMetricFactory_1 = require("./AutoScalingGroupMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class AutoScalingGroupMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const fallbackConstructName = props.autoScalingGroup.autoScalingGroupName;
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            namedConstruct: props.autoScalingGroup,
            fallbackConstructName,
        });
        this.title = namingStrategy.resolveHumanReadableName();
        const metricFactory = new AutoScalingGroupMetricFactory_1.AutoScalingGroupMetricFactory(scope.createMetricFactory(), props);
        this.groupMinSizeMetric = metricFactory.metricGroupMinSize();
        this.groupMaxSizeMetric = metricFactory.metricGroupMaxSize();
        this.groupDesiredSizeMetric = metricFactory.metricGroupDesiredCapacity();
        this.instancesInServiceMetric =
            metricFactory.metricGroupInServiceInstances();
        this.instancesPendingMetric = metricFactory.metricGroupPendingInstances();
        this.instancesStandbyMetric = metricFactory.metricGroupStandbyInstances();
        this.instancesTerminatingMetric =
            metricFactory.metricGroupTerminatingInstances();
        this.instancesTotalMetric = metricFactory.metricGroupTotalInstances();
    }
    summaryWidgets() {
        return [
            this.createTitleWidget(),
            this.createGroupSizeWidget(common_1.FullWidth, common_1.DefaultSummaryWidgetHeight),
        ];
    }
    widgets() {
        return [
            this.createTitleWidget(),
            this.createGroupSizeWidget(common_1.HalfWidth, common_1.DefaultGraphWidgetHeight),
            this.createGroupStatusWidget(common_1.HalfWidth, common_1.DefaultGraphWidgetHeight),
        ];
    }
    createTitleWidget() {
        return new dashboard_1.MonitoringHeaderWidget({
            family: "Auto Scaling Group",
            title: this.title,
        });
    }
    createGroupSizeWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Group Size",
            left: [
                this.groupMinSizeMetric,
                this.groupMaxSizeMetric,
                this.groupDesiredSizeMetric,
                this.instancesTotalMetric,
            ],
            leftYAxis: common_1.CountAxisFromZero,
        });
    }
    createGroupStatusWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Instance States",
            left: [
                this.instancesInServiceMetric,
                this.instancesPendingMetric,
                this.instancesStandbyMetric,
                this.instancesTerminatingMetric,
            ],
            leftYAxis: common_1.CountAxisFromZero,
            stacked: true,
        });
    }
}
exports.AutoScalingGroupMonitoring = AutoScalingGroupMonitoring;
_a = JSII_RTTI_SYMBOL_1;
AutoScalingGroupMonitoring[_a] = { fqn: "cdk-monitoring-constructs.AutoScalingGroupMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0b1NjYWxpbmdHcm91cE1vbml0b3JpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBdXRvU2NhbGluZ0dyb3VwTW9uaXRvcmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFrRTtBQUVsRSxtRkFHeUM7QUFDekMseUNBVXNCO0FBQ3RCLCtDQUd5QjtBQVN6QixNQUFhLDBCQUEyQixTQUFRLG1CQUFVO0lBWXhELFlBQVksS0FBc0IsRUFBRSxLQUFzQztRQUN4RSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBCLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO1FBQzFFLE1BQU0sY0FBYyxHQUFHLElBQUksb0NBQXdCLENBQUM7WUFDbEQsR0FBRyxLQUFLO1lBQ1IsY0FBYyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7WUFDdEMscUJBQXFCO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFdkQsTUFBTSxhQUFhLEdBQUcsSUFBSSw2REFBNkIsQ0FDckQsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQzNCLEtBQUssQ0FDTixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsYUFBYSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDekUsSUFBSSxDQUFDLHdCQUF3QjtZQUMzQixhQUFhLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsYUFBYSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDMUUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGFBQWEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQzFFLElBQUksQ0FBQywwQkFBMEI7WUFDN0IsYUFBYSxDQUFDLCtCQUErQixFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTztZQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixJQUFJLENBQUMscUJBQXFCLENBQUMsa0JBQVMsRUFBRSxtQ0FBMEIsQ0FBQztTQUNsRSxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBUyxFQUFFLGlDQUF3QixDQUFDO1lBQy9ELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBUyxFQUFFLGlDQUF3QixDQUFDO1NBQ2xFLENBQUM7SUFDSixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLGtDQUFzQixDQUFDO1lBQ2hDLE1BQU0sRUFBRSxvQkFBb0I7WUFDNUIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxLQUFhLEVBQUUsTUFBYztRQUNqRCxPQUFPLElBQUksNEJBQVcsQ0FBQztZQUNyQixLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUssRUFBRSxZQUFZO1lBQ25CLElBQUksRUFBRTtnQkFDSixJQUFJLENBQUMsa0JBQWtCO2dCQUN2QixJQUFJLENBQUMsa0JBQWtCO2dCQUN2QixJQUFJLENBQUMsc0JBQXNCO2dCQUMzQixJQUFJLENBQUMsb0JBQW9CO2FBQzFCO1lBQ0QsU0FBUyxFQUFFLDBCQUFpQjtTQUM3QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUJBQXVCLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDbkQsT0FBTyxJQUFJLDRCQUFXLENBQUM7WUFDckIsS0FBSztZQUNMLE1BQU07WUFDTixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLElBQUksRUFBRTtnQkFDSixJQUFJLENBQUMsd0JBQXdCO2dCQUM3QixJQUFJLENBQUMsc0JBQXNCO2dCQUMzQixJQUFJLENBQUMsc0JBQXNCO2dCQUMzQixJQUFJLENBQUMsMEJBQTBCO2FBQ2hDO1lBQ0QsU0FBUyxFQUFFLDBCQUFpQjtZQUM1QixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBMUZILGdFQTJGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoV2lkZ2V0LCBJV2lkZ2V0IH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7XG4gIEF1dG9TY2FsaW5nR3JvdXBNZXRyaWNGYWN0b3J5LFxuICBBdXRvU2NhbGluZ0dyb3VwTWV0cmljRmFjdG9yeVByb3BzLFxufSBmcm9tIFwiLi9BdXRvU2NhbGluZ0dyb3VwTWV0cmljRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgQmFzZU1vbml0b3JpbmdQcm9wcyxcbiAgQ291bnRBeGlzRnJvbVplcm8sXG4gIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCxcbiAgRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQsXG4gIEZ1bGxXaWR0aCxcbiAgSGFsZldpZHRoLFxuICBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICBNb25pdG9yaW5nLFxuICBNb25pdG9yaW5nU2NvcGUsXG59IGZyb20gXCIuLi8uLi9jb21tb25cIjtcbmltcG9ydCB7XG4gIE1vbml0b3JpbmdIZWFkZXJXaWRnZXQsXG4gIE1vbml0b3JpbmdOYW1pbmdTdHJhdGVneSxcbn0gZnJvbSBcIi4uLy4uL2Rhc2hib2FyZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9TY2FsaW5nR3JvdXBNb25pdG9yaW5nT3B0aW9uc1xuICBleHRlbmRzIEJhc2VNb25pdG9yaW5nUHJvcHMge31cblxuZXhwb3J0IGludGVyZmFjZSBBdXRvU2NhbGluZ0dyb3VwTW9uaXRvcmluZ1Byb3BzXG4gIGV4dGVuZHMgQXV0b1NjYWxpbmdHcm91cE1ldHJpY0ZhY3RvcnlQcm9wcyxcbiAgICBBdXRvU2NhbGluZ0dyb3VwTW9uaXRvcmluZ09wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIEF1dG9TY2FsaW5nR3JvdXBNb25pdG9yaW5nIGV4dGVuZHMgTW9uaXRvcmluZyB7XG4gIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgZ3JvdXBNaW5TaXplTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBncm91cE1heFNpemVNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGdyb3VwRGVzaXJlZFNpemVNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGluc3RhbmNlc0luU2VydmljZU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgaW5zdGFuY2VzUGVuZGluZ01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgaW5zdGFuY2VzU3RhbmRieU1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgaW5zdGFuY2VzVGVybWluYXRpbmdNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG4gIHJlYWRvbmx5IGluc3RhbmNlc1RvdGFsTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBNb25pdG9yaW5nU2NvcGUsIHByb3BzOiBBdXRvU2NhbGluZ0dyb3VwTW9uaXRvcmluZ1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIHByb3BzKTtcblxuICAgIGNvbnN0IGZhbGxiYWNrQ29uc3RydWN0TmFtZSA9IHByb3BzLmF1dG9TY2FsaW5nR3JvdXAuYXV0b1NjYWxpbmdHcm91cE5hbWU7XG4gICAgY29uc3QgbmFtaW5nU3RyYXRlZ3kgPSBuZXcgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5KHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgbmFtZWRDb25zdHJ1Y3Q6IHByb3BzLmF1dG9TY2FsaW5nR3JvdXAsXG4gICAgICBmYWxsYmFja0NvbnN0cnVjdE5hbWUsXG4gICAgfSk7XG4gICAgdGhpcy50aXRsZSA9IG5hbWluZ1N0cmF0ZWd5LnJlc29sdmVIdW1hblJlYWRhYmxlTmFtZSgpO1xuXG4gICAgY29uc3QgbWV0cmljRmFjdG9yeSA9IG5ldyBBdXRvU2NhbGluZ0dyb3VwTWV0cmljRmFjdG9yeShcbiAgICAgIHNjb3BlLmNyZWF0ZU1ldHJpY0ZhY3RvcnkoKSxcbiAgICAgIHByb3BzXG4gICAgKTtcbiAgICB0aGlzLmdyb3VwTWluU2l6ZU1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljR3JvdXBNaW5TaXplKCk7XG4gICAgdGhpcy5ncm91cE1heFNpemVNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0dyb3VwTWF4U2l6ZSgpO1xuICAgIHRoaXMuZ3JvdXBEZXNpcmVkU2l6ZU1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljR3JvdXBEZXNpcmVkQ2FwYWNpdHkoKTtcbiAgICB0aGlzLmluc3RhbmNlc0luU2VydmljZU1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0dyb3VwSW5TZXJ2aWNlSW5zdGFuY2VzKCk7XG4gICAgdGhpcy5pbnN0YW5jZXNQZW5kaW5nTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNHcm91cFBlbmRpbmdJbnN0YW5jZXMoKTtcbiAgICB0aGlzLmluc3RhbmNlc1N0YW5kYnlNZXRyaWMgPSBtZXRyaWNGYWN0b3J5Lm1ldHJpY0dyb3VwU3RhbmRieUluc3RhbmNlcygpO1xuICAgIHRoaXMuaW5zdGFuY2VzVGVybWluYXRpbmdNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNHcm91cFRlcm1pbmF0aW5nSW5zdGFuY2VzKCk7XG4gICAgdGhpcy5pbnN0YW5jZXNUb3RhbE1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljR3JvdXBUb3RhbEluc3RhbmNlcygpO1xuICB9XG5cbiAgc3VtbWFyeVdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5jcmVhdGVUaXRsZVdpZGdldCgpLFxuICAgICAgdGhpcy5jcmVhdGVHcm91cFNpemVXaWRnZXQoRnVsbFdpZHRoLCBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCksXG4gICAgXTtcbiAgfVxuXG4gIHdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5jcmVhdGVUaXRsZVdpZGdldCgpLFxuICAgICAgdGhpcy5jcmVhdGVHcm91cFNpemVXaWRnZXQoSGFsZldpZHRoLCBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQpLFxuICAgICAgdGhpcy5jcmVhdGVHcm91cFN0YXR1c1dpZGdldChIYWxmV2lkdGgsIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCksXG4gICAgXTtcbiAgfVxuXG4gIGNyZWF0ZVRpdGxlV2lkZ2V0KCkge1xuICAgIHJldHVybiBuZXcgTW9uaXRvcmluZ0hlYWRlcldpZGdldCh7XG4gICAgICBmYW1pbHk6IFwiQXV0byBTY2FsaW5nIEdyb3VwXCIsXG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUdyb3VwU2l6ZVdpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJHcm91cCBTaXplXCIsXG4gICAgICBsZWZ0OiBbXG4gICAgICAgIHRoaXMuZ3JvdXBNaW5TaXplTWV0cmljLFxuICAgICAgICB0aGlzLmdyb3VwTWF4U2l6ZU1ldHJpYyxcbiAgICAgICAgdGhpcy5ncm91cERlc2lyZWRTaXplTWV0cmljLFxuICAgICAgICB0aGlzLmluc3RhbmNlc1RvdGFsTWV0cmljLFxuICAgICAgXSxcbiAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVHcm91cFN0YXR1c1dpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJJbnN0YW5jZSBTdGF0ZXNcIixcbiAgICAgIGxlZnQ6IFtcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNJblNlcnZpY2VNZXRyaWMsXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzUGVuZGluZ01ldHJpYyxcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNTdGFuZGJ5TWV0cmljLFxuICAgICAgICB0aGlzLmluc3RhbmNlc1Rlcm1pbmF0aW5nTWV0cmljLFxuICAgICAgXSxcbiAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICBzdGFja2VkOiB0cnVlLFxuICAgIH0pO1xuICB9XG59XG4iXX0=