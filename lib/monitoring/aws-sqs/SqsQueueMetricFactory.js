"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsQueueMetricFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const common_1 = require("../../common");
class SqsQueueMetricFactory {
    constructor(metricFactory, props) {
        this.metricFactory = metricFactory;
        this.queue = props.queue;
    }
    metricApproximateVisibleMessageCount() {
        return this.metricFactory.adaptMetric(this.queue.metricApproximateNumberOfMessagesVisible({
            label: "Visible",
        }));
    }
    metricIncomingMessageCount() {
        return this.metricFactory.adaptMetric(this.queue.metricNumberOfMessagesSent({
            statistic: common_1.MetricStatistic.SUM,
            label: "Incoming",
        }));
    }
    metricDeletedMessageCount() {
        return this.metricFactory.adaptMetric(this.queue.metricNumberOfMessagesDeleted({
            statistic: common_1.MetricStatistic.SUM,
            label: "Deleted",
        }));
    }
    metricApproximateAgeOfOldestMessageInSeconds() {
        return this.metricFactory.adaptMetric(this.queue.metricApproximateAgeOfOldestMessage({
            label: "Age",
        }));
    }
    metricAverageMessageSizeInBytes() {
        return this.metricFactory.adaptMetric(this.queue.metricSentMessageSize({
            label: "Size",
        }));
    }
    metricProductionRate() {
        return this.metricFactory.createMetricMath("(productionVolume / PERIOD(productionVolume))", {
            productionVolume: this.metricIncomingMessageCount(),
        }, "Production TPS (avg: ${AVG}, max: ${MAX})");
    }
    metricConsumptionRate() {
        return this.metricFactory.createMetricMath("(consumptionVolume / PERIOD(consumptionVolume))", {
            consumptionVolume: this.metricDeletedMessageCount(),
        }, "Consumption TPS (avg: ${AVG}, max: ${MAX})");
    }
    // Time to drain queue (number of visible messages / net consumption rate)
    // Net consumption rate is defined by consumption rate - incoming rate
    metricTimeToDrain() {
        return this.metricFactory.createMetricMath("(visibleMessages / (consumptionVolume - incomingVolume)) * (PERIOD(consumptionVolume))", {
            visibleMessages: this.metricApproximateVisibleMessageCount(),
            incomingVolume: this.metricIncomingMessageCount(),
            consumptionVolume: this.metricDeletedMessageCount(),
        }, "Time to Drain (seconds) (avg: ${AVG}, max: ${MAX})");
    }
}
exports.SqsQueueMetricFactory = SqsQueueMetricFactory;
_a = JSII_RTTI_SYMBOL_1;
SqsQueueMetricFactory[_a] = { fqn: "cdk-monitoring-constructs.SqsQueueMetricFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3FzUXVldWVNZXRyaWNGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3FzUXVldWVNZXRyaWNGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEseUNBQThEO0FBTTlELE1BQWEscUJBQXFCO0lBSWhDLFlBQVksYUFBNEIsRUFBRSxLQUFpQztRQUN6RSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELG9DQUFvQztRQUNsQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDO1lBQ2xELEtBQUssRUFBRSxTQUFTO1NBQ2pCLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELDBCQUEwQjtRQUN4QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDO1lBQ3BDLFNBQVMsRUFBRSx3QkFBZSxDQUFDLEdBQUc7WUFDOUIsS0FBSyxFQUFFLFVBQVU7U0FDbEIsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQseUJBQXlCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUM7WUFDdkMsU0FBUyxFQUFFLHdCQUFlLENBQUMsR0FBRztZQUM5QixLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCw0Q0FBNEM7UUFDMUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQztZQUM3QyxLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELCtCQUErQjtRQUM3QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDO1lBQy9CLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FDeEMsK0NBQStDLEVBQy9DO1lBQ0UsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixFQUFFO1NBQ3BELEVBQ0QsMkNBQTJDLENBQzVDLENBQUM7SUFDSixDQUFDO0lBRUQscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FDeEMsaURBQWlELEVBQ2pEO1lBQ0UsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1NBQ3BELEVBQ0QsNENBQTRDLENBQzdDLENBQUM7SUFDSixDQUFDO0lBRUQsMEVBQTBFO0lBQzFFLHNFQUFzRTtJQUN0RSxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQ3hDLHdGQUF3RixFQUN4RjtZQUNFLGVBQWUsRUFBRSxJQUFJLENBQUMsb0NBQW9DLEVBQUU7WUFDNUQsY0FBYyxFQUFFLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNqRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUU7U0FDcEQsRUFDRCxvREFBb0QsQ0FDckQsQ0FBQztJQUNKLENBQUM7O0FBbkZILHNEQW9GQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElRdWV1ZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc3FzXCI7XG5cbmltcG9ydCB7IE1ldHJpY0ZhY3RvcnksIE1ldHJpY1N0YXRpc3RpYyB9IGZyb20gXCIuLi8uLi9jb21tb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBTcXNRdWV1ZU1ldHJpY0ZhY3RvcnlQcm9wcyB7XG4gIHJlYWRvbmx5IHF1ZXVlOiBJUXVldWU7XG59XG5cbmV4cG9ydCBjbGFzcyBTcXNRdWV1ZU1ldHJpY0ZhY3Rvcnkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWV0cmljRmFjdG9yeTogTWV0cmljRmFjdG9yeTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHF1ZXVlOiBJUXVldWU7XG5cbiAgY29uc3RydWN0b3IobWV0cmljRmFjdG9yeTogTWV0cmljRmFjdG9yeSwgcHJvcHM6IFNxc1F1ZXVlTWV0cmljRmFjdG9yeVByb3BzKSB7XG4gICAgdGhpcy5tZXRyaWNGYWN0b3J5ID0gbWV0cmljRmFjdG9yeTtcbiAgICB0aGlzLnF1ZXVlID0gcHJvcHMucXVldWU7XG4gIH1cblxuICBtZXRyaWNBcHByb3hpbWF0ZVZpc2libGVNZXNzYWdlQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljRmFjdG9yeS5hZGFwdE1ldHJpYyhcbiAgICAgIHRoaXMucXVldWUubWV0cmljQXBwcm94aW1hdGVOdW1iZXJPZk1lc3NhZ2VzVmlzaWJsZSh7XG4gICAgICAgIGxhYmVsOiBcIlZpc2libGVcIixcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG1ldHJpY0luY29taW5nTWVzc2FnZUNvdW50KCkge1xuICAgIHJldHVybiB0aGlzLm1ldHJpY0ZhY3RvcnkuYWRhcHRNZXRyaWMoXG4gICAgICB0aGlzLnF1ZXVlLm1ldHJpY051bWJlck9mTWVzc2FnZXNTZW50KHtcbiAgICAgICAgc3RhdGlzdGljOiBNZXRyaWNTdGF0aXN0aWMuU1VNLFxuICAgICAgICBsYWJlbDogXCJJbmNvbWluZ1wiLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbWV0cmljRGVsZXRlZE1lc3NhZ2VDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5tZXRyaWNGYWN0b3J5LmFkYXB0TWV0cmljKFxuICAgICAgdGhpcy5xdWV1ZS5tZXRyaWNOdW1iZXJPZk1lc3NhZ2VzRGVsZXRlZCh7XG4gICAgICAgIHN0YXRpc3RpYzogTWV0cmljU3RhdGlzdGljLlNVTSxcbiAgICAgICAgbGFiZWw6IFwiRGVsZXRlZFwiLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbWV0cmljQXBwcm94aW1hdGVBZ2VPZk9sZGVzdE1lc3NhZ2VJblNlY29uZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljRmFjdG9yeS5hZGFwdE1ldHJpYyhcbiAgICAgIHRoaXMucXVldWUubWV0cmljQXBwcm94aW1hdGVBZ2VPZk9sZGVzdE1lc3NhZ2Uoe1xuICAgICAgICBsYWJlbDogXCJBZ2VcIixcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG1ldHJpY0F2ZXJhZ2VNZXNzYWdlU2l6ZUluQnl0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljRmFjdG9yeS5hZGFwdE1ldHJpYyhcbiAgICAgIHRoaXMucXVldWUubWV0cmljU2VudE1lc3NhZ2VTaXplKHtcbiAgICAgICAgbGFiZWw6IFwiU2l6ZVwiLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbWV0cmljUHJvZHVjdGlvblJhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljRmFjdG9yeS5jcmVhdGVNZXRyaWNNYXRoKFxuICAgICAgXCIocHJvZHVjdGlvblZvbHVtZSAvIFBFUklPRChwcm9kdWN0aW9uVm9sdW1lKSlcIixcbiAgICAgIHtcbiAgICAgICAgcHJvZHVjdGlvblZvbHVtZTogdGhpcy5tZXRyaWNJbmNvbWluZ01lc3NhZ2VDb3VudCgpLFxuICAgICAgfSxcbiAgICAgIFwiUHJvZHVjdGlvbiBUUFMgKGF2ZzogJHtBVkd9LCBtYXg6ICR7TUFYfSlcIlxuICAgICk7XG4gIH1cblxuICBtZXRyaWNDb25zdW1wdGlvblJhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljRmFjdG9yeS5jcmVhdGVNZXRyaWNNYXRoKFxuICAgICAgXCIoY29uc3VtcHRpb25Wb2x1bWUgLyBQRVJJT0QoY29uc3VtcHRpb25Wb2x1bWUpKVwiLFxuICAgICAge1xuICAgICAgICBjb25zdW1wdGlvblZvbHVtZTogdGhpcy5tZXRyaWNEZWxldGVkTWVzc2FnZUNvdW50KCksXG4gICAgICB9LFxuICAgICAgXCJDb25zdW1wdGlvbiBUUFMgKGF2ZzogJHtBVkd9LCBtYXg6ICR7TUFYfSlcIlxuICAgICk7XG4gIH1cblxuICAvLyBUaW1lIHRvIGRyYWluIHF1ZXVlIChudW1iZXIgb2YgdmlzaWJsZSBtZXNzYWdlcyAvIG5ldCBjb25zdW1wdGlvbiByYXRlKVxuICAvLyBOZXQgY29uc3VtcHRpb24gcmF0ZSBpcyBkZWZpbmVkIGJ5IGNvbnN1bXB0aW9uIHJhdGUgLSBpbmNvbWluZyByYXRlXG4gIG1ldHJpY1RpbWVUb0RyYWluKCkge1xuICAgIHJldHVybiB0aGlzLm1ldHJpY0ZhY3RvcnkuY3JlYXRlTWV0cmljTWF0aChcbiAgICAgIFwiKHZpc2libGVNZXNzYWdlcyAvIChjb25zdW1wdGlvblZvbHVtZSAtIGluY29taW5nVm9sdW1lKSkgKiAoUEVSSU9EKGNvbnN1bXB0aW9uVm9sdW1lKSlcIixcbiAgICAgIHtcbiAgICAgICAgdmlzaWJsZU1lc3NhZ2VzOiB0aGlzLm1ldHJpY0FwcHJveGltYXRlVmlzaWJsZU1lc3NhZ2VDb3VudCgpLFxuICAgICAgICBpbmNvbWluZ1ZvbHVtZTogdGhpcy5tZXRyaWNJbmNvbWluZ01lc3NhZ2VDb3VudCgpLFxuICAgICAgICBjb25zdW1wdGlvblZvbHVtZTogdGhpcy5tZXRyaWNEZWxldGVkTWVzc2FnZUNvdW50KCksXG4gICAgICB9LFxuICAgICAgXCJUaW1lIHRvIERyYWluIChzZWNvbmRzKSAoYXZnOiAke0FWR30sIG1heDogJHtNQVh9KVwiXG4gICAgKTtcbiAgfVxufVxuIl19