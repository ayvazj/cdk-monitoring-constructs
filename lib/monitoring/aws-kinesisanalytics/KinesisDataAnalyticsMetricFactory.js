"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KinesisDataAnalyticsMetricFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const common_1 = require("../../common");
/**
 * @see https://docs.aws.amazon.com/kinesisanalytics/latest/java/metrics-dimensions.html
 */
class KinesisDataAnalyticsMetricFactory {
    constructor(metricFactory, props) {
        this.metricFactory = metricFactory;
        this.dimensionsMap = {
            Application: props.application,
        };
    }
    metricKPUsCount() {
        return this.generateMetric({
            name: "KPUs",
            description: "Kinesis Processing Units",
        });
    }
    metricDowntimeMs() {
        return this.generateMetric({
            name: "downtime",
            description: "Downtime",
        });
    }
    metricUptimeMs() {
        return this.generateMetric({
            name: "uptime",
            description: "Uptime",
        });
    }
    metricFullRestartsCount() {
        return this.generateMetric({
            name: "fullRestarts",
            description: "Restarts",
        });
    }
    metricNumberOfFailedCheckpointsCount() {
        return this.generateMetric({
            name: "numberOfFailedCheckpoints",
            description: "Failed Checkpoints",
            metricStatistic: common_1.MetricStatistic.SUM,
        });
    }
    metricLastCheckpointDurationMs() {
        return this.generateMetric({
            name: "lastCheckpointDuration",
            description: "Last Checkpoint Duration",
        });
    }
    metricLastCheckpointSizeBytes() {
        return this.generateMetric({
            name: "lastCheckpointSize",
            description: "Last Checkpoint Size",
            metricStatistic: common_1.MetricStatistic.SUM,
        });
    }
    metricCpuUtilizationPercent() {
        return this.generateMetric({
            name: "cpuUtilization",
            description: "CPU Utilization",
        });
    }
    metricHeapMemoryUtilizationPercent() {
        return this.generateMetric({
            name: "heapMemoryUtilization",
            description: "Heap Memory Utilization",
        });
    }
    metricOldGenerationGCTimeMs() {
        return this.generateMetric({
            name: "oldGenerationGCTime",
            description: "GC Time",
        });
    }
    metricOldGenerationGCCount() {
        return this.generateMetric({
            name: "oldGenerationGCCount",
            metricStatistic: common_1.MetricStatistic.N,
            description: "GC Count",
        });
    }
    generateMetric(metricsSpec) {
        return this.metricFactory.createMetric(metricsSpec.name, metricsSpec.metricStatistic || common_1.MetricStatistic.AVERAGE, metricsSpec.description, this.dimensionsMap, undefined, // the hex color code of the metric on a graph
        "AWS/KinesisAnalytics");
    }
}
exports.KinesisDataAnalyticsMetricFactory = KinesisDataAnalyticsMetricFactory;
_a = JSII_RTTI_SYMBOL_1;
KinesisDataAnalyticsMetricFactory[_a] = { fqn: "cdk-monitoring-constructs.KinesisDataAnalyticsMetricFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2luZXNpc0RhdGFBbmFseXRpY3NNZXRyaWNGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiS2luZXNpc0RhdGFBbmFseXRpY3NNZXRyaWNGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEseUNBQThEO0FBZTlEOztHQUVHO0FBQ0gsTUFBYSxpQ0FBaUM7SUFJNUMsWUFDRSxhQUE0QixFQUM1QixLQUE2QztRQUU3QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztTQUMvQixDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDekIsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsMEJBQTBCO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDekIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsV0FBVyxFQUFFLFVBQVU7U0FDeEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDekIsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsUUFBUTtTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN6QixJQUFJLEVBQUUsY0FBYztZQUNwQixXQUFXLEVBQUUsVUFBVTtTQUN4QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQW9DO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN6QixJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsZUFBZSxFQUFFLHdCQUFlLENBQUMsR0FBRztTQUNyQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsOEJBQThCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN6QixJQUFJLEVBQUUsd0JBQXdCO1lBQzlCLFdBQVcsRUFBRSwwQkFBMEI7U0FDeEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDZCQUE2QjtRQUMzQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDekIsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLGVBQWUsRUFBRSx3QkFBZSxDQUFDLEdBQUc7U0FDckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUEyQjtRQUN6QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDekIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixXQUFXLEVBQUUsaUJBQWlCO1NBQy9CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxrQ0FBa0M7UUFDaEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3pCLElBQUksRUFBRSx1QkFBdUI7WUFDN0IsV0FBVyxFQUFFLHlCQUF5QjtTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkJBQTJCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN6QixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLFdBQVcsRUFBRSxTQUFTO1NBQ3ZCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwwQkFBMEI7UUFDeEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3pCLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsZUFBZSxFQUFFLHdCQUFlLENBQUMsQ0FBQztZQUNsQyxXQUFXLEVBQUUsVUFBVTtTQUN4QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sY0FBYyxDQUFDLFdBQXdCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQ3BDLFdBQVcsQ0FBQyxJQUFJLEVBQ2hCLFdBQVcsQ0FBQyxlQUFlLElBQUksd0JBQWUsQ0FBQyxPQUFPLEVBQ3RELFdBQVcsQ0FBQyxXQUFXLEVBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLFNBQVMsRUFBRSw4Q0FBOEM7UUFDekQsc0JBQXNCLENBQ3ZCLENBQUM7SUFDSixDQUFDOztBQXZHSCw4RUF3R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaW1lbnNpb25zTWFwIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IE1ldHJpY0ZhY3RvcnksIE1ldHJpY1N0YXRpc3RpYyB9IGZyb20gXCIuLi8uLi9jb21tb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBLaW5lc2lzRGF0YUFuYWx5dGljc01ldHJpY0ZhY3RvcnlQcm9wcyB7XG4gIHJlYWRvbmx5IGFwcGxpY2F0aW9uOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVXNlZCBpbnRlcm5hbGx5IGJ5IHRoaXMgY2xhc3MgdG8gZWFzZSBnZW5lcmF0aW5nIG1ldHJpY3NcbiAqL1xuaW50ZXJmYWNlIE1ldHJpY3NTcGVjIHtcbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICByZWFkb25seSBtZXRyaWNTdGF0aXN0aWM/OiBNZXRyaWNTdGF0aXN0aWM7XG59XG5cbi8qKlxuICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20va2luZXNpc2FuYWx5dGljcy9sYXRlc3QvamF2YS9tZXRyaWNzLWRpbWVuc2lvbnMuaHRtbFxuICovXG5leHBvcnQgY2xhc3MgS2luZXNpc0RhdGFBbmFseXRpY3NNZXRyaWNGYWN0b3J5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IG1ldHJpY0ZhY3Rvcnk6IE1ldHJpY0ZhY3Rvcnk7XG4gIHByb3RlY3RlZCByZWFkb25seSBkaW1lbnNpb25zTWFwOiBEaW1lbnNpb25zTWFwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG1ldHJpY0ZhY3Rvcnk6IE1ldHJpY0ZhY3RvcnksXG4gICAgcHJvcHM6IEtpbmVzaXNEYXRhQW5hbHl0aWNzTWV0cmljRmFjdG9yeVByb3BzXG4gICkge1xuICAgIHRoaXMubWV0cmljRmFjdG9yeSA9IG1ldHJpY0ZhY3Rvcnk7XG4gICAgdGhpcy5kaW1lbnNpb25zTWFwID0ge1xuICAgICAgQXBwbGljYXRpb246IHByb3BzLmFwcGxpY2F0aW9uLFxuICAgIH07XG4gIH1cblxuICBtZXRyaWNLUFVzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVNZXRyaWMoe1xuICAgICAgbmFtZTogXCJLUFVzXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJLaW5lc2lzIFByb2Nlc3NpbmcgVW5pdHNcIixcbiAgICB9KTtcbiAgfVxuXG4gIG1ldHJpY0Rvd250aW1lTXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVNZXRyaWMoe1xuICAgICAgbmFtZTogXCJkb3dudGltZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiRG93bnRpbWVcIixcbiAgICB9KTtcbiAgfVxuXG4gIG1ldHJpY1VwdGltZU1zKCkge1xuICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWV0cmljKHtcbiAgICAgIG5hbWU6IFwidXB0aW1lXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJVcHRpbWVcIixcbiAgICB9KTtcbiAgfVxuXG4gIG1ldHJpY0Z1bGxSZXN0YXJ0c0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWV0cmljKHtcbiAgICAgIG5hbWU6IFwiZnVsbFJlc3RhcnRzXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJSZXN0YXJ0c1wiLFxuICAgIH0pO1xuICB9XG5cbiAgbWV0cmljTnVtYmVyT2ZGYWlsZWRDaGVja3BvaW50c0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWV0cmljKHtcbiAgICAgIG5hbWU6IFwibnVtYmVyT2ZGYWlsZWRDaGVja3BvaW50c1wiLFxuICAgICAgZGVzY3JpcHRpb246IFwiRmFpbGVkIENoZWNrcG9pbnRzXCIsXG4gICAgICBtZXRyaWNTdGF0aXN0aWM6IE1ldHJpY1N0YXRpc3RpYy5TVU0sXG4gICAgfSk7XG4gIH1cblxuICBtZXRyaWNMYXN0Q2hlY2twb2ludER1cmF0aW9uTXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVNZXRyaWMoe1xuICAgICAgbmFtZTogXCJsYXN0Q2hlY2twb2ludER1cmF0aW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJMYXN0IENoZWNrcG9pbnQgRHVyYXRpb25cIixcbiAgICB9KTtcbiAgfVxuXG4gIG1ldHJpY0xhc3RDaGVja3BvaW50U2l6ZUJ5dGVzKCkge1xuICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWV0cmljKHtcbiAgICAgIG5hbWU6IFwibGFzdENoZWNrcG9pbnRTaXplXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJMYXN0IENoZWNrcG9pbnQgU2l6ZVwiLFxuICAgICAgbWV0cmljU3RhdGlzdGljOiBNZXRyaWNTdGF0aXN0aWMuU1VNLFxuICAgIH0pO1xuICB9XG5cbiAgbWV0cmljQ3B1VXRpbGl6YXRpb25QZXJjZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWV0cmljKHtcbiAgICAgIG5hbWU6IFwiY3B1VXRpbGl6YXRpb25cIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkNQVSBVdGlsaXphdGlvblwiLFxuICAgIH0pO1xuICB9XG5cbiAgbWV0cmljSGVhcE1lbW9yeVV0aWxpemF0aW9uUGVyY2VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZU1ldHJpYyh7XG4gICAgICBuYW1lOiBcImhlYXBNZW1vcnlVdGlsaXphdGlvblwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiSGVhcCBNZW1vcnkgVXRpbGl6YXRpb25cIixcbiAgICB9KTtcbiAgfVxuXG4gIG1ldHJpY09sZEdlbmVyYXRpb25HQ1RpbWVNcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZU1ldHJpYyh7XG4gICAgICBuYW1lOiBcIm9sZEdlbmVyYXRpb25HQ1RpbWVcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkdDIFRpbWVcIixcbiAgICB9KTtcbiAgfVxuXG4gIG1ldHJpY09sZEdlbmVyYXRpb25HQ0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWV0cmljKHtcbiAgICAgIG5hbWU6IFwib2xkR2VuZXJhdGlvbkdDQ291bnRcIixcbiAgICAgIG1ldHJpY1N0YXRpc3RpYzogTWV0cmljU3RhdGlzdGljLk4sXG4gICAgICBkZXNjcmlwdGlvbjogXCJHQyBDb3VudFwiLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZU1ldHJpYyhtZXRyaWNzU3BlYzogTWV0cmljc1NwZWMpIHtcbiAgICByZXR1cm4gdGhpcy5tZXRyaWNGYWN0b3J5LmNyZWF0ZU1ldHJpYyhcbiAgICAgIG1ldHJpY3NTcGVjLm5hbWUsXG4gICAgICBtZXRyaWNzU3BlYy5tZXRyaWNTdGF0aXN0aWMgfHwgTWV0cmljU3RhdGlzdGljLkFWRVJBR0UsXG4gICAgICBtZXRyaWNzU3BlYy5kZXNjcmlwdGlvbixcbiAgICAgIHRoaXMuZGltZW5zaW9uc01hcCxcbiAgICAgIHVuZGVmaW5lZCwgLy8gdGhlIGhleCBjb2xvciBjb2RlIG9mIHRoZSBtZXRyaWMgb24gYSBncmFwaFxuICAgICAgXCJBV1MvS2luZXNpc0FuYWx5dGljc1wiXG4gICAgKTtcbiAgfVxufVxuIl19