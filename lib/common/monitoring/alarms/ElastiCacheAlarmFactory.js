"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElastiCacheAlarmFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
class ElastiCacheAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addMaxItemsCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxItemsCount,
            alarmNameSuffix: "Items-Count",
            alarmDescription: "The number of items in the cache is too high.",
        });
    }
    addMaxEvictedItemsCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxItemsCount,
            alarmNameSuffix: "Items-Evicted",
            alarmDescription: "The number of items evicted by the cache is too high.",
        });
    }
    addMinFreeableMemoryAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minFreeableMemoryInBytes,
            alarmNameSuffix: "Memory-Freeable",
            alarmDescription: "The size of freeable memory is too low.",
        });
    }
    addMaxUsedSwapMemoryAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsedSwapMemoryInBytes,
            alarmNameSuffix: "Memory-Swap",
            alarmDescription: "The size of swap memory used is too high.",
        });
    }
}
exports.ElastiCacheAlarmFactory = ElastiCacheAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
ElastiCacheAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.ElastiCacheAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxhc3RpQ2FjaGVBbGFybUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFbGFzdGlDYWNoZUFsYXJtRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUdvQztBQWlCcEMsTUFBYSx1QkFBdUI7SUFHbEMsWUFBWSxZQUEwQjtRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBRUQscUJBQXFCLENBQ25CLE1BQThCLEVBQzlCLEtBQTZCLEVBQzdCLGFBQXNCO1FBRXRCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hDLGdCQUFnQixFQUNkLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxpQ0FBZ0IsQ0FBQyxPQUFPO1lBQzVELGtCQUFrQixFQUNoQixLQUFLLENBQUMsMEJBQTBCO2dCQUNoQyxtQ0FBa0IsQ0FBQyxzQkFBc0I7WUFDM0MsR0FBRyxLQUFLO1lBQ1IsYUFBYTtZQUNiLFNBQVMsRUFBRSxLQUFLLENBQUMsYUFBYTtZQUM5QixlQUFlLEVBQUUsYUFBYTtZQUM5QixnQkFBZ0IsRUFBRSwrQ0FBK0M7U0FDbEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRCQUE0QixDQUMxQixNQUE4QixFQUM5QixLQUE2QixFQUM3QixhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsT0FBTztZQUM1RCxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWE7WUFDOUIsZUFBZSxFQUFFLGVBQWU7WUFDaEMsZ0JBQWdCLEVBQUUsdURBQXVEO1NBQzFFLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5QkFBeUIsQ0FDdkIsTUFBOEIsRUFDOUIsS0FBaUMsRUFDakMsYUFBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsZ0JBQWdCLEVBQ2QsS0FBSyxDQUFDLHdCQUF3QixJQUFJLGlDQUFnQixDQUFDLE9BQU87WUFDNUQsa0JBQWtCLEVBQ2hCLEtBQUssQ0FBQywwQkFBMEI7Z0JBQ2hDLG1DQUFrQixDQUFDLG1CQUFtQjtZQUN4QyxHQUFHLEtBQUs7WUFDUixhQUFhO1lBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQyx3QkFBd0I7WUFDekMsZUFBZSxFQUFFLGlCQUFpQjtZQUNsQyxnQkFBZ0IsRUFBRSx5Q0FBeUM7U0FDNUQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHlCQUF5QixDQUN2QixNQUE4QixFQUM5QixLQUFpQyxFQUNqQyxhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsT0FBTztZQUM1RCxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLHdCQUF3QjtZQUN6QyxlQUFlLEVBQUUsYUFBYTtZQUM5QixnQkFBZ0IsRUFBRSwyQ0FBMkM7U0FDOUQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFqRkgsMERBa0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcGFyaXNvbk9wZXJhdG9yLFxuICBUcmVhdE1pc3NpbmdEYXRhLFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHsgQWxhcm1GYWN0b3J5LCBDdXN0b21BbGFybVRocmVzaG9sZCB9IGZyb20gXCIuLi8uLi9hbGFybVwiO1xuaW1wb3J0IHsgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB9IGZyb20gXCIuLi8uLi9tZXRyaWNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNYXhJdGVtc0NvdW50VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhJdGVtc0NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWluRnJlZWFibGVNZW1vcnlUaHJlc2hvbGQgZXh0ZW5kcyBDdXN0b21BbGFybVRocmVzaG9sZCB7XG4gIHJlYWRvbmx5IG1pbkZyZWVhYmxlTWVtb3J5SW5CeXRlczogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1heFVzZWRTd2FwTWVtb3J5VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhVc2VkU3dhcE1lbW9yeUluQnl0ZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEVsYXN0aUNhY2hlQWxhcm1GYWN0b3J5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGFsYXJtRmFjdG9yeTogQWxhcm1GYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKGFsYXJtRmFjdG9yeTogQWxhcm1GYWN0b3J5KSB7XG4gICAgdGhpcy5hbGFybUZhY3RvcnkgPSBhbGFybUZhY3Rvcnk7XG4gIH1cblxuICBhZGRNYXhJdGVtc0NvdW50QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBNYXhJdGVtc0NvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heEl0ZW1zQ291bnQsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiSXRlbXMtQ291bnRcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiVGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgY2FjaGUgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRNYXhFdmljdGVkSXRlbXNDb3VudEFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogTWF4SXRlbXNDb3VudFRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhJdGVtc0NvdW50LFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBcIkl0ZW1zLUV2aWN0ZWRcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiVGhlIG51bWJlciBvZiBpdGVtcyBldmljdGVkIGJ5IHRoZSBjYWNoZSBpcyB0b28gaGlnaC5cIixcbiAgICB9KTtcbiAgfVxuXG4gIGFkZE1pbkZyZWVhYmxlTWVtb3J5QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBNaW5GcmVlYWJsZU1lbW9yeVRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5MRVNTX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5taW5GcmVlYWJsZU1lbW9yeUluQnl0ZXMsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiTWVtb3J5LUZyZWVhYmxlXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIlRoZSBzaXplIG9mIGZyZWVhYmxlIG1lbW9yeSBpcyB0b28gbG93LlwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkTWF4VXNlZFN3YXBNZW1vcnlBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IE1heFVzZWRTd2FwTWVtb3J5VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heFVzZWRTd2FwTWVtb3J5SW5CeXRlcyxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJNZW1vcnktU3dhcFwiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJUaGUgc2l6ZSBvZiBzd2FwIG1lbW9yeSB1c2VkIGlzIHRvbyBoaWdoLlwiLFxuICAgIH0pO1xuICB9XG59XG4iXX0=