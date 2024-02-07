"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3BucketMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const S3BucketMetricFactory_1 = require("./S3BucketMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class S3BucketMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const fallbackConstructName = this.getBucketName(props.bucket);
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            namedConstruct: props.bucket,
            fallbackConstructName,
        });
        this.title = namingStrategy.resolveHumanReadableName();
        this.url = scope
            .createAwsConsoleUrlFactory()
            .getS3BucketUrl(props.bucket.bucketName);
        const metricFactory = new S3BucketMetricFactory_1.S3BucketMetricFactory(this.createMetricFactory(), props);
        this.bucketSizeBytesMetric = metricFactory.metricBucketSizeBytes();
        this.numberOfObjectsMetric = metricFactory.metricNumberOfObjects();
    }
    summaryWidgets() {
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "S3 Bucket",
                title: this.title,
                goToLinkUrl: this.url,
            }),
            // Size
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.HalfWidth,
                height: common_1.DefaultSummaryWidgetHeight,
                title: "Bucket Size",
                left: [this.bucketSizeBytesMetric],
                leftYAxis: common_1.SizeAxisBytesFromZero,
            }),
            // Objects
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.HalfWidth,
                height: common_1.DefaultSummaryWidgetHeight,
                title: "Object Count",
                left: [this.numberOfObjectsMetric],
                leftYAxis: common_1.CountAxisFromZero,
            }),
        ];
    }
    widgets() {
        return [
            // Title
            new dashboard_1.MonitoringHeaderWidget({
                family: "S3 Bucket",
                title: this.title,
                goToLinkUrl: this.url,
            }),
            // Size
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.HalfWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Bucket Size",
                left: [this.bucketSizeBytesMetric],
                leftYAxis: common_1.SizeAxisBytesFromZero,
            }),
            // Objects
            new aws_cloudwatch_1.GraphWidget({
                width: common_1.HalfWidth,
                height: common_1.DefaultGraphWidgetHeight,
                title: "Object Count",
                left: [this.numberOfObjectsMetric],
                leftYAxis: common_1.CountAxisFromZero,
            }),
        ];
    }
    getBucketName(bucket) {
        // try to take the name (if specified) instead of token
        return bucket.node.defaultChild?.bucketName;
    }
}
exports.S3BucketMonitoring = S3BucketMonitoring;
_a = JSII_RTTI_SYMBOL_1;
S3BucketMonitoring[_a] = { fqn: "cdk-monitoring-constructs.S3BucketMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNCdWNrZXRNb25pdG9yaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUzNCdWNrZXRNb25pdG9yaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQWtFO0FBR2xFLG1FQUdpQztBQUNqQyx5Q0FVc0I7QUFDdEIsK0NBR3lCO0FBUXpCLE1BQWEsa0JBQW1CLFNBQVEsbUJBQVU7SUFPaEQsWUFBWSxLQUFzQixFQUFFLEtBQThCO1FBQ2hFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEIsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxNQUFNLGNBQWMsR0FBRyxJQUFJLG9DQUF3QixDQUFDO1lBQ2xELEdBQUcsS0FBSztZQUNSLGNBQWMsRUFBRSxLQUFLLENBQUMsTUFBTTtZQUM1QixxQkFBcUI7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUs7YUFDYiwwQkFBMEIsRUFBRTthQUM1QixjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLDZDQUFxQixDQUM3QyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFDMUIsS0FBSyxDQUNOLENBQUM7UUFDRixJQUFJLENBQUMscUJBQXFCLEdBQUcsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3JFLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTztZQUNMLFFBQVE7WUFDUixJQUFJLGtDQUFzQixDQUFDO2dCQUN6QixNQUFNLEVBQUUsV0FBVztnQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUc7YUFDdEIsQ0FBQztZQUNGLE9BQU87WUFDUCxJQUFJLDRCQUFXLENBQUM7Z0JBQ2QsS0FBSyxFQUFFLGtCQUFTO2dCQUNoQixNQUFNLEVBQUUsbUNBQTBCO2dCQUNsQyxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dCQUNsQyxTQUFTLEVBQUUsOEJBQXFCO2FBQ2pDLENBQUM7WUFDRixVQUFVO1lBQ1YsSUFBSSw0QkFBVyxDQUFDO2dCQUNkLEtBQUssRUFBRSxrQkFBUztnQkFDaEIsTUFBTSxFQUFFLG1DQUEwQjtnQkFDbEMsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEMsU0FBUyxFQUFFLDBCQUFpQjthQUM3QixDQUFDO1NBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTztZQUNMLFFBQVE7WUFDUixJQUFJLGtDQUFzQixDQUFDO2dCQUN6QixNQUFNLEVBQUUsV0FBVztnQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUc7YUFDdEIsQ0FBQztZQUNGLE9BQU87WUFDUCxJQUFJLDRCQUFXLENBQUM7Z0JBQ2QsS0FBSyxFQUFFLGtCQUFTO2dCQUNoQixNQUFNLEVBQUUsaUNBQXdCO2dCQUNoQyxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dCQUNsQyxTQUFTLEVBQUUsOEJBQXFCO2FBQ2pDLENBQUM7WUFDRixVQUFVO1lBQ1YsSUFBSSw0QkFBVyxDQUFDO2dCQUNkLEtBQUssRUFBRSxrQkFBUztnQkFDaEIsTUFBTSxFQUFFLGlDQUF3QjtnQkFDaEMsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEMsU0FBUyxFQUFFLDBCQUFpQjthQUM3QixDQUFDO1NBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTyxhQUFhLENBQUMsTUFBZTtRQUNuQyx1REFBdUQ7UUFDdkQsT0FBUSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQTBCLEVBQUUsVUFBVSxDQUFDO0lBQzdELENBQUM7O0FBdEZILGdEQXVGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoV2lkZ2V0LCBJV2lkZ2V0IH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5pbXBvcnQgeyBDZm5CdWNrZXQsIElCdWNrZXQgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXMzXCI7XG5cbmltcG9ydCB7XG4gIFMzQnVja2V0TWV0cmljRmFjdG9yeSxcbiAgUzNCdWNrZXRNZXRyaWNGYWN0b3J5UHJvcHMsXG59IGZyb20gXCIuL1MzQnVja2V0TWV0cmljRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgQmFzZU1vbml0b3JpbmdQcm9wcyxcbiAgQ291bnRBeGlzRnJvbVplcm8sXG4gIERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCxcbiAgRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQsXG4gIEhhbGZXaWR0aCxcbiAgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgTW9uaXRvcmluZyxcbiAgTW9uaXRvcmluZ1Njb3BlLFxuICBTaXplQXhpc0J5dGVzRnJvbVplcm8sXG59IGZyb20gXCIuLi8uLi9jb21tb25cIjtcbmltcG9ydCB7XG4gIE1vbml0b3JpbmdIZWFkZXJXaWRnZXQsXG4gIE1vbml0b3JpbmdOYW1pbmdTdHJhdGVneSxcbn0gZnJvbSBcIi4uLy4uL2Rhc2hib2FyZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFMzQnVja2V0TW9uaXRvcmluZ09wdGlvbnMgZXh0ZW5kcyBCYXNlTW9uaXRvcmluZ1Byb3BzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgUzNCdWNrZXRNb25pdG9yaW5nUHJvcHNcbiAgZXh0ZW5kcyBTM0J1Y2tldE1ldHJpY0ZhY3RvcnlQcm9wcyxcbiAgICBTM0J1Y2tldE1vbml0b3JpbmdPcHRpb25zIHt9XG5cbmV4cG9ydCBjbGFzcyBTM0J1Y2tldE1vbml0b3JpbmcgZXh0ZW5kcyBNb25pdG9yaW5nIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmc7XG4gIHByb3RlY3RlZCByZWFkb25seSB1cmw/OiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGJ1Y2tldFNpemVCeXRlc01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IG51bWJlck9mT2JqZWN0c01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogTW9uaXRvcmluZ1Njb3BlLCBwcm9wczogUzNCdWNrZXRNb25pdG9yaW5nUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgcHJvcHMpO1xuXG4gICAgY29uc3QgZmFsbGJhY2tDb25zdHJ1Y3ROYW1lID0gdGhpcy5nZXRCdWNrZXROYW1lKHByb3BzLmJ1Y2tldCk7XG4gICAgY29uc3QgbmFtaW5nU3RyYXRlZ3kgPSBuZXcgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5KHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgbmFtZWRDb25zdHJ1Y3Q6IHByb3BzLmJ1Y2tldCxcbiAgICAgIGZhbGxiYWNrQ29uc3RydWN0TmFtZSxcbiAgICB9KTtcbiAgICB0aGlzLnRpdGxlID0gbmFtaW5nU3RyYXRlZ3kucmVzb2x2ZUh1bWFuUmVhZGFibGVOYW1lKCk7XG4gICAgdGhpcy51cmwgPSBzY29wZVxuICAgICAgLmNyZWF0ZUF3c0NvbnNvbGVVcmxGYWN0b3J5KClcbiAgICAgIC5nZXRTM0J1Y2tldFVybChwcm9wcy5idWNrZXQuYnVja2V0TmFtZSk7XG5cbiAgICBjb25zdCBtZXRyaWNGYWN0b3J5ID0gbmV3IFMzQnVja2V0TWV0cmljRmFjdG9yeShcbiAgICAgIHRoaXMuY3JlYXRlTWV0cmljRmFjdG9yeSgpLFxuICAgICAgcHJvcHNcbiAgICApO1xuICAgIHRoaXMuYnVja2V0U2l6ZUJ5dGVzTWV0cmljID0gbWV0cmljRmFjdG9yeS5tZXRyaWNCdWNrZXRTaXplQnl0ZXMoKTtcbiAgICB0aGlzLm51bWJlck9mT2JqZWN0c01ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljTnVtYmVyT2ZPYmplY3RzKCk7XG4gIH1cblxuICBzdW1tYXJ5V2lkZ2V0cygpOiBJV2lkZ2V0W10ge1xuICAgIHJldHVybiBbXG4gICAgICAvLyBUaXRsZVxuICAgICAgbmV3IE1vbml0b3JpbmdIZWFkZXJXaWRnZXQoe1xuICAgICAgICBmYW1pbHk6IFwiUzMgQnVja2V0XCIsXG4gICAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgICBnb1RvTGlua1VybDogdGhpcy51cmwsXG4gICAgICB9KSxcbiAgICAgIC8vIFNpemVcbiAgICAgIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoOiBIYWxmV2lkdGgsXG4gICAgICAgIGhlaWdodDogRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQsXG4gICAgICAgIHRpdGxlOiBcIkJ1Y2tldCBTaXplXCIsXG4gICAgICAgIGxlZnQ6IFt0aGlzLmJ1Y2tldFNpemVCeXRlc01ldHJpY10sXG4gICAgICAgIGxlZnRZQXhpczogU2l6ZUF4aXNCeXRlc0Zyb21aZXJvLFxuICAgICAgfSksXG4gICAgICAvLyBPYmplY3RzXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0LFxuICAgICAgICB0aXRsZTogXCJPYmplY3QgQ291bnRcIixcbiAgICAgICAgbGVmdDogW3RoaXMubnVtYmVyT2ZPYmplY3RzTWV0cmljXSxcbiAgICAgICAgbGVmdFlBeGlzOiBDb3VudEF4aXNGcm9tWmVybyxcbiAgICAgIH0pLFxuICAgIF07XG4gIH1cblxuICB3aWRnZXRzKCk6IElXaWRnZXRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIC8vIFRpdGxlXG4gICAgICBuZXcgTW9uaXRvcmluZ0hlYWRlcldpZGdldCh7XG4gICAgICAgIGZhbWlseTogXCJTMyBCdWNrZXRcIixcbiAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICAgIGdvVG9MaW5rVXJsOiB0aGlzLnVybCxcbiAgICAgIH0pLFxuICAgICAgLy8gU2l6ZVxuICAgICAgbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgd2lkdGg6IEhhbGZXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBEZWZhdWx0R3JhcGhXaWRnZXRIZWlnaHQsXG4gICAgICAgIHRpdGxlOiBcIkJ1Y2tldCBTaXplXCIsXG4gICAgICAgIGxlZnQ6IFt0aGlzLmJ1Y2tldFNpemVCeXRlc01ldHJpY10sXG4gICAgICAgIGxlZnRZQXhpczogU2l6ZUF4aXNCeXRlc0Zyb21aZXJvLFxuICAgICAgfSksXG4gICAgICAvLyBPYmplY3RzXG4gICAgICBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICB3aWR0aDogSGFsZldpZHRoLFxuICAgICAgICBoZWlnaHQ6IERlZmF1bHRHcmFwaFdpZGdldEhlaWdodCxcbiAgICAgICAgdGl0bGU6IFwiT2JqZWN0IENvdW50XCIsXG4gICAgICAgIGxlZnQ6IFt0aGlzLm51bWJlck9mT2JqZWN0c01ldHJpY10sXG4gICAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICB9KSxcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCdWNrZXROYW1lKGJ1Y2tldDogSUJ1Y2tldCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgLy8gdHJ5IHRvIHRha2UgdGhlIG5hbWUgKGlmIHNwZWNpZmllZCkgaW5zdGVhZCBvZiB0b2tlblxuICAgIHJldHVybiAoYnVja2V0Lm5vZGUuZGVmYXVsdENoaWxkIGFzIENmbkJ1Y2tldCk/LmJ1Y2tldE5hbWU7XG4gIH1cbn1cbiJdfQ==