"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluentBitMetricFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_logs_1 = require("aws-cdk-lib/aws-logs");
const FluentBitConstants_1 = require("./FluentBitConstants");
const common_1 = require("../../common");
class FluentBitMetricFactory {
    constructor(scope, props) {
        this.scope = scope;
        this.metricFactory = scope.createMetricFactory();
        this.namespace =
            props.namespace ??
                this.metricFactory.getNamespaceWithFallback(props.namespace);
    }
    filterMetrics(logGroup) {
        return Object.values(FluentBitConstants_1.FluentBitFilterMetricTag).map((metricName) => {
            return this.pluginMetric(logGroup, metricName);
        });
    }
    outputMetrics(logGroup) {
        return Object.values(FluentBitConstants_1.FluentBitOutputMetricTag).map((metricName) => {
            return this.pluginMetric(logGroup, metricName);
        });
    }
    inputMetrics(logGroup) {
        return Object.values(FluentBitConstants_1.FluentBitInputMetricTag).map((metricName) => {
            return this.pluginMetric(logGroup, metricName);
        });
    }
    pluginMetric(logGroup, metricName) {
        const metricFilter = new aws_logs_1.MetricFilter(this.scope, `FluentBit-${metricName}-${logGroup}-MetricFilter`, {
            logGroup: logGroup,
            filterPattern: aws_logs_1.FilterPattern.literal(`{ $.metric = "${metricName}" }`),
            metricNamespace: this.namespace,
            metricName,
            metricValue: "$.value",
        });
        return metricFilter.metric({
            statistic: common_1.MetricStatistic.MAX,
        });
    }
    storageMetrics(logGroup) {
        return Object.values(FluentBitConstants_1.FluentBitStorageMetricTag).map((metricName) => {
            const valueString = `$.storage_layer.chunks.${metricName}`;
            const metricFilter = new aws_logs_1.MetricFilter(this.scope, `FluentBit-${metricName}-${logGroup}-MetricFilter`, {
                logGroup: logGroup,
                filterPattern: aws_logs_1.FilterPattern.literal(`{ ${valueString} = * }`),
                metricNamespace: this.namespace,
                metricName,
                metricValue: `${valueString}`,
            });
            const metric = metricFilter.metric({
                statistic: common_1.MetricStatistic.MAX,
            });
            return metric;
        });
    }
    metricsWithoutWidgets(logGroup) {
        Object.values(FluentBitConstants_1.FluentBitMetricsWithoutWidget).forEach((metricName) => this.pluginMetric(logGroup, metricName));
    }
}
exports.FluentBitMetricFactory = FluentBitMetricFactory;
_a = JSII_RTTI_SYMBOL_1;
FluentBitMetricFactory[_a] = { fqn: "cdk-monitoring-constructs.FluentBitMetricFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmx1ZW50Qml0TWV0cmljRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZsdWVudEJpdE1ldHJpY0ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtREFBOEU7QUFDOUUsNkRBTThCO0FBQzlCLHlDQUErRTtBQVUvRSxNQUFhLHNCQUFzQjtJQUtqQyxZQUFZLEtBQXNCLEVBQUUsS0FBa0M7UUFDcEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUztZQUNaLEtBQUssQ0FBQyxTQUFTO2dCQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxhQUFhLENBQUMsUUFBbUI7UUFDL0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLDZDQUF3QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDaEUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsUUFBbUI7UUFDL0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLDZDQUF3QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDaEUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBbUI7UUFDOUIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLDRDQUF1QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDL0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxZQUFZLENBQUMsUUFBbUIsRUFBRSxVQUFrQjtRQUMxRCxNQUFNLFlBQVksR0FBRyxJQUFJLHVCQUFZLENBQ25DLElBQUksQ0FBQyxLQUFLLEVBQ1YsYUFBYSxVQUFVLElBQUksUUFBUSxlQUFlLEVBQ2xEO1lBQ0UsUUFBUSxFQUFFLFFBQVE7WUFDbEIsYUFBYSxFQUFFLHdCQUFhLENBQUMsT0FBTyxDQUFDLGlCQUFpQixVQUFVLEtBQUssQ0FBQztZQUN0RSxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDL0IsVUFBVTtZQUNWLFdBQVcsRUFBRSxTQUFTO1NBQ3ZCLENBQ0YsQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUN6QixTQUFTLEVBQUUsd0JBQWUsQ0FBQyxHQUFHO1NBQy9CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBbUI7UUFDaEMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLDhDQUF5QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDakUsTUFBTSxXQUFXLEdBQUcsMEJBQTBCLFVBQVUsRUFBRSxDQUFDO1lBQzNELE1BQU0sWUFBWSxHQUFHLElBQUksdUJBQVksQ0FDbkMsSUFBSSxDQUFDLEtBQUssRUFDVixhQUFhLFVBQVUsSUFBSSxRQUFRLGVBQWUsRUFDbEQ7Z0JBQ0UsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGFBQWEsRUFBRSx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFdBQVcsUUFBUSxDQUFDO2dCQUM5RCxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQy9CLFVBQVU7Z0JBQ1YsV0FBVyxFQUFFLEdBQUcsV0FBVyxFQUFFO2FBQzlCLENBQ0YsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQ2pDLFNBQVMsRUFBRSx3QkFBZSxDQUFDLEdBQUc7YUFDL0IsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUJBQXFCLENBQUMsUUFBbUI7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrREFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUN4QyxDQUFDO0lBQ0osQ0FBQzs7QUF6RUgsd0RBMEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsdGVyUGF0dGVybiwgSUxvZ0dyb3VwLCBNZXRyaWNGaWx0ZXIgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxvZ3NcIjtcbmltcG9ydCB7XG4gIEZsdWVudEJpdEZpbHRlck1ldHJpY1RhZyxcbiAgRmx1ZW50Qml0SW5wdXRNZXRyaWNUYWcsXG4gIEZsdWVudEJpdE1ldHJpY3NXaXRob3V0V2lkZ2V0LFxuICBGbHVlbnRCaXRPdXRwdXRNZXRyaWNUYWcsXG4gIEZsdWVudEJpdFN0b3JhZ2VNZXRyaWNUYWcsXG59IGZyb20gXCIuL0ZsdWVudEJpdENvbnN0YW50c1wiO1xuaW1wb3J0IHsgTWV0cmljRmFjdG9yeSwgTWV0cmljU3RhdGlzdGljLCBNb25pdG9yaW5nU2NvcGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmx1ZW50Qml0TWV0cmljRmFjdG9yeVByb3BzIHtcbiAgLyoqXG4gICAqIE5hbWVzcGFjZSB0aGF0IG1ldHJpY3Mgd2lsbCBiZSBlbWl0dGVkIHRvLlxuICAgKiBAZGVmYXVsdCBtZXRyaWMgZmFjdG9yeSBkZWZhdWx0XG4gICAqL1xuICByZWFkb25seSBuYW1lc3BhY2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBGbHVlbnRCaXRNZXRyaWNGYWN0b3J5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IG1ldHJpY0ZhY3Rvcnk6IE1ldHJpY0ZhY3Rvcnk7XG4gIHByb3RlY3RlZCByZWFkb25seSBuYW1lc3BhY2U6IHN0cmluZztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNjb3BlOiBNb25pdG9yaW5nU2NvcGU7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IE1vbml0b3JpbmdTY29wZSwgcHJvcHM6IEZsdWVudEJpdE1ldHJpY0ZhY3RvcnlQcm9wcykge1xuICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB0aGlzLm1ldHJpY0ZhY3RvcnkgPSBzY29wZS5jcmVhdGVNZXRyaWNGYWN0b3J5KCk7XG4gICAgdGhpcy5uYW1lc3BhY2UgPVxuICAgICAgcHJvcHMubmFtZXNwYWNlID8/XG4gICAgICB0aGlzLm1ldHJpY0ZhY3RvcnkuZ2V0TmFtZXNwYWNlV2l0aEZhbGxiYWNrKHByb3BzLm5hbWVzcGFjZSk7XG4gIH1cblxuICBmaWx0ZXJNZXRyaWNzKGxvZ0dyb3VwOiBJTG9nR3JvdXApIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhGbHVlbnRCaXRGaWx0ZXJNZXRyaWNUYWcpLm1hcCgobWV0cmljTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucGx1Z2luTWV0cmljKGxvZ0dyb3VwLCBtZXRyaWNOYW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIG91dHB1dE1ldHJpY3MobG9nR3JvdXA6IElMb2dHcm91cCkge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKEZsdWVudEJpdE91dHB1dE1ldHJpY1RhZykubWFwKChtZXRyaWNOYW1lKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wbHVnaW5NZXRyaWMobG9nR3JvdXAsIG1ldHJpY05hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5wdXRNZXRyaWNzKGxvZ0dyb3VwOiBJTG9nR3JvdXApIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhGbHVlbnRCaXRJbnB1dE1ldHJpY1RhZykubWFwKChtZXRyaWNOYW1lKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wbHVnaW5NZXRyaWMobG9nR3JvdXAsIG1ldHJpY05hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwbHVnaW5NZXRyaWMobG9nR3JvdXA6IElMb2dHcm91cCwgbWV0cmljTmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgbWV0cmljRmlsdGVyID0gbmV3IE1ldHJpY0ZpbHRlcihcbiAgICAgIHRoaXMuc2NvcGUsXG4gICAgICBgRmx1ZW50Qml0LSR7bWV0cmljTmFtZX0tJHtsb2dHcm91cH0tTWV0cmljRmlsdGVyYCxcbiAgICAgIHtcbiAgICAgICAgbG9nR3JvdXA6IGxvZ0dyb3VwLFxuICAgICAgICBmaWx0ZXJQYXR0ZXJuOiBGaWx0ZXJQYXR0ZXJuLmxpdGVyYWwoYHsgJC5tZXRyaWMgPSBcIiR7bWV0cmljTmFtZX1cIiB9YCksXG4gICAgICAgIG1ldHJpY05hbWVzcGFjZTogdGhpcy5uYW1lc3BhY2UsXG4gICAgICAgIG1ldHJpY05hbWUsXG4gICAgICAgIG1ldHJpY1ZhbHVlOiBcIiQudmFsdWVcIixcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiBtZXRyaWNGaWx0ZXIubWV0cmljKHtcbiAgICAgIHN0YXRpc3RpYzogTWV0cmljU3RhdGlzdGljLk1BWCxcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3JhZ2VNZXRyaWNzKGxvZ0dyb3VwOiBJTG9nR3JvdXApIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhGbHVlbnRCaXRTdG9yYWdlTWV0cmljVGFnKS5tYXAoKG1ldHJpY05hbWUpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlU3RyaW5nID0gYCQuc3RvcmFnZV9sYXllci5jaHVua3MuJHttZXRyaWNOYW1lfWA7XG4gICAgICBjb25zdCBtZXRyaWNGaWx0ZXIgPSBuZXcgTWV0cmljRmlsdGVyKFxuICAgICAgICB0aGlzLnNjb3BlLFxuICAgICAgICBgRmx1ZW50Qml0LSR7bWV0cmljTmFtZX0tJHtsb2dHcm91cH0tTWV0cmljRmlsdGVyYCxcbiAgICAgICAge1xuICAgICAgICAgIGxvZ0dyb3VwOiBsb2dHcm91cCxcbiAgICAgICAgICBmaWx0ZXJQYXR0ZXJuOiBGaWx0ZXJQYXR0ZXJuLmxpdGVyYWwoYHsgJHt2YWx1ZVN0cmluZ30gPSAqIH1gKSxcbiAgICAgICAgICBtZXRyaWNOYW1lc3BhY2U6IHRoaXMubmFtZXNwYWNlLFxuICAgICAgICAgIG1ldHJpY05hbWUsXG4gICAgICAgICAgbWV0cmljVmFsdWU6IGAke3ZhbHVlU3RyaW5nfWAsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBjb25zdCBtZXRyaWMgPSBtZXRyaWNGaWx0ZXIubWV0cmljKHtcbiAgICAgICAgc3RhdGlzdGljOiBNZXRyaWNTdGF0aXN0aWMuTUFYLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWV0cmljO1xuICAgIH0pO1xuICB9XG5cbiAgbWV0cmljc1dpdGhvdXRXaWRnZXRzKGxvZ0dyb3VwOiBJTG9nR3JvdXApIHtcbiAgICBPYmplY3QudmFsdWVzKEZsdWVudEJpdE1ldHJpY3NXaXRob3V0V2lkZ2V0KS5mb3JFYWNoKChtZXRyaWNOYW1lKSA9PlxuICAgICAgdGhpcy5wbHVnaW5NZXRyaWMobG9nR3JvdXAsIG1ldHJpY05hbWUpXG4gICAgKTtcbiAgfVxufVxuIl19