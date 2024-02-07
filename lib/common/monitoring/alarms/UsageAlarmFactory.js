"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageAlarmFactory = exports.UsageType = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
var UsageType;
(function (UsageType) {
    UsageType["P50"] = "P50";
    UsageType["P70"] = "P70";
    UsageType["P90"] = "P90";
    UsageType["P99"] = "P99";
    UsageType["P999"] = "P999";
    UsageType["P9999"] = "P9999";
    UsageType["P100"] = "P100";
    UsageType["AVERAGE"] = "Average";
    UsageType["MAX"] = "Maximum";
})(UsageType = exports.UsageType || (exports.UsageType = {}));
class UsageAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addMaxCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxCount,
            alarmNameSuffix: "Max-Usage-Count",
            alarmDescription: "The count is too high.",
        });
    }
    addMinCountAlarm(percentMetric, props, disambiguator) {
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minCount,
            alarmNameSuffix: "Min-Usage-Count",
            alarmDescription: "The count is too low.",
        });
    }
    /**
     * @deprecated Use {@link addMaxCountAlarm} instead.
     */
    addMaxUsageCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsageCount,
            alarmNameSuffix: "Usage-Count",
            alarmDescription: "The count is too high.",
        });
    }
    /**
     * @deprecated Use {@link addMinCountAlarm} instead.
     */
    addMinUsageCountAlarm(percentMetric, props, disambiguator) {
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minCount,
            alarmNameSuffix: "Usage-Count",
            alarmDescription: "The count is too low.",
        });
    }
    addMaxCpuUsagePercentAlarm(percentMetric, props, disambiguator, usageType, additionalAlarmNameSuffix) {
        const alarmNameSuffix = [
            usageType,
            "CPU-Usage",
            additionalAlarmNameSuffix,
        ]
            .filter((i) => i !== undefined)
            .join("-");
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsagePercent,
            alarmNameSuffix,
            alarmDescription: "The CPU usage is too high.",
        });
    }
    addMaxMasterCpuUsagePercentAlarm(percentMetric, props, disambiguator) {
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsagePercent,
            alarmNameSuffix: "Master-CPU-Usage",
            alarmDescription: "The master CPU usage is too high.",
        });
    }
    addMaxMemoryUsagePercentAlarm(percentMetric, props, disambiguator) {
        return this.addMemoryUsagePercentAlarm(percentMetric, props, UsageType.MAX, disambiguator);
    }
    addMemoryUsagePercentAlarm(percentMetric, props, usageType, disambiguator) {
        const alarmNameSuffix = usageType === UsageType.MAX
            ? "Memory-Usage"
            : `${usageType}-Memory-Usage`;
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsagePercent,
            alarmNameSuffix,
            alarmDescription: "The memory usage is too high.",
        });
    }
    addMaxMasterMemoryUsagePercentAlarm(percentMetric, props, disambiguator) {
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsagePercent,
            alarmNameSuffix: "Master-Memory-Usage",
            alarmDescription: "The master memory usage is too high.",
        });
    }
    addMaxDiskUsagePercentAlarm(percentMetric, props, disambiguator) {
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsagePercent,
            alarmNameSuffix: "Disk-Usage",
            alarmDescription: "The disk usage is too high.",
        });
    }
    addMaxHeapMemoryAfterGCUsagePercentAlarm(percentMetric, props, disambiguator) {
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsagePercent,
            alarmNameSuffix: "HeapMemoryAfterGC-Usage",
            alarmDescription: "The heap memory after GC usage is too high.",
        });
    }
    addMaxFileDescriptorPercentAlarm(percentMetric, props, disambiguator) {
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsagePercent,
            alarmNameSuffix: "File-Descriptor-Usage",
            alarmDescription: "The file descriptor usage is too high.",
        });
    }
    addMaxThreadCountUsageAlarm(percentMetric, props, disambiguator) {
        return this.alarmFactory.addAlarm(percentMetric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUsageCount,
            alarmNameSuffix: "Thread-Count",
            alarmDescription: "The thread count is too high.",
        });
    }
}
exports.UsageAlarmFactory = UsageAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
UsageAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.UsageAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNhZ2VBbGFybUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2FnZUFsYXJtRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUdvQztBQUtwQyxJQUFZLFNBVVg7QUFWRCxXQUFZLFNBQVM7SUFDbkIsd0JBQVcsQ0FBQTtJQUNYLHdCQUFXLENBQUE7SUFDWCx3QkFBVyxDQUFBO0lBQ1gsd0JBQVcsQ0FBQTtJQUNYLDBCQUFhLENBQUE7SUFDYiw0QkFBZSxDQUFBO0lBQ2YsMEJBQWEsQ0FBQTtJQUNiLGdDQUFtQixDQUFBO0lBQ25CLDRCQUFlLENBQUE7QUFDakIsQ0FBQyxFQVZXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBVXBCO0FBcUJELE1BQWEsaUJBQWlCO0lBRzVCLFlBQVksWUFBMEI7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVELGdCQUFnQixDQUNkLE1BQThCLEVBQzlCLEtBQTZCLEVBQzdCLGFBQXNCO1FBRXRCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hDLGdCQUFnQixFQUNkLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxpQ0FBZ0IsQ0FBQyxPQUFPO1lBQzVELGtCQUFrQixFQUNoQixLQUFLLENBQUMsMEJBQTBCO2dCQUNoQyxtQ0FBa0IsQ0FBQyxzQkFBc0I7WUFDM0MsR0FBRyxLQUFLO1lBQ1IsYUFBYTtZQUNiLFNBQVMsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUN6QixlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLGdCQUFnQixFQUFFLHdCQUF3QjtTQUMzQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQ2QsYUFBcUMsRUFDckMsS0FBNkIsRUFDN0IsYUFBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDL0MsZ0JBQWdC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T0FBTztZQUM1RCxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLGVBQWU7WUFDaEMsZUFBZSxFQUFFLHVCQUF1QjtZQUN4QyxnQkFBZ0IsRUFBRSx3Q0FBd0M7U0FDM0QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUEyQixDQUN6QixhQUFxQyxFQUNyQyxLQUEwQixFQUMxQixhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUMvQyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsT0FBTztZQUM1RCxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWE7WUFDOUIsZUFBZSxFQUFFLGNBQWM7WUFDL0IsZ0JBQWdCLEVBQUUsK0JBQStCO1NBQ2xELENBQUMsQ0FBQztJQUNMLENBQUM7O0FBMVFILDhDQTJRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBhcmlzb25PcGVyYXRvcixcbiAgVHJlYXRNaXNzaW5nRGF0YSxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IEFsYXJtRmFjdG9yeSwgQ3VzdG9tQWxhcm1UaHJlc2hvbGQgfSBmcm9tIFwiLi4vLi4vYWxhcm1cIjtcbmltcG9ydCB7IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQgfSBmcm9tIFwiLi4vLi4vbWV0cmljXCI7XG5cbmV4cG9ydCBlbnVtIFVzYWdlVHlwZSB7XG4gIFA1MCA9IFwiUDUwXCIsXG4gIFA3MCA9IFwiUDcwXCIsXG4gIFA5MCA9IFwiUDkwXCIsXG4gIFA5OSA9IFwiUDk5XCIsXG4gIFA5OTkgPSBcIlA5OTlcIixcbiAgUDk5OTkgPSBcIlA5OTk5XCIsXG4gIFAxMDAgPSBcIlAxMDBcIixcbiAgQVZFUkFHRSA9IFwiQXZlcmFnZVwiLFxuICBNQVggPSBcIk1heGltdW1cIixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2FnZVRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWF4VXNhZ2VQZXJjZW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWluVXNhZ2VDb3VudFRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWluQ291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXhVc2FnZUNvdW50VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhDb3VudDogbnVtYmVyO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBNYXhVc2FnZUNvdW50VGhyZXNob2xkIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNhZ2VDb3VudFRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWF4VXNhZ2VDb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgVXNhZ2VBbGFybUZhY3Rvcnkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYWxhcm1GYWN0b3J5OiBBbGFybUZhY3Rvcnk7XG5cbiAgY29uc3RydWN0b3IoYWxhcm1GYWN0b3J5OiBBbGFybUZhY3RvcnkpIHtcbiAgICB0aGlzLmFsYXJtRmFjdG9yeSA9IGFsYXJtRmFjdG9yeTtcbiAgfVxuXG4gIGFkZE1heENvdW50QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBNYXhVc2FnZUNvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heENvdW50LFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBcIk1heC1Vc2FnZS1Db3VudFwiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJUaGUgY291bnQgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRNaW5Db3VudEFsYXJtKFxuICAgIHBlcmNlbnRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IE1pblVzYWdlQ291bnRUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0ocGVyY2VudE1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkxFU1NfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1pbkNvdW50LFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBcIk1pbi1Vc2FnZS1Db3VudFwiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJUaGUgY291bnQgaXMgdG9vIGxvdy5cIixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGFkZE1heENvdW50QWxhcm19IGluc3RlYWQuXG4gICAqL1xuICBhZGRNYXhVc2FnZUNvdW50QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBVc2FnZUNvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heFVzYWdlQ291bnQsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiVXNhZ2UtQ291bnRcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiVGhlIGNvdW50IGlzIHRvbyBoaWdoLlwiLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYWRkTWluQ291bnRBbGFybX0gaW5zdGVhZC5cbiAgICovXG4gIGFkZE1pblVzYWdlQ291bnRBbGFybShcbiAgICBwZXJjZW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBNaW5Vc2FnZUNvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKHBlcmNlbnRNZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5MRVNTX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5taW5Db3VudCxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJVc2FnZS1Db3VudFwiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJUaGUgY291bnQgaXMgdG9vIGxvdy5cIixcbiAgICB9KTtcbiAgfVxuXG4gIGFkZE1heENwdVVzYWdlUGVyY2VudEFsYXJtKFxuICAgIHBlcmNlbnRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IFVzYWdlVGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmcsXG4gICAgdXNhZ2VUeXBlPzogVXNhZ2VUeXBlLFxuICAgIGFkZGl0aW9uYWxBbGFybU5hbWVTdWZmaXg/OiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgYWxhcm1OYW1lU3VmZml4OiBzdHJpbmcgPSBbXG4gICAgICB1c2FnZVR5cGUsXG4gICAgICBcIkNQVS1Vc2FnZVwiLFxuICAgICAgYWRkaXRpb25hbEFsYXJtTmFtZVN1ZmZpeCxcbiAgICBdXG4gICAgICAuZmlsdGVyKChpKSA9PiBpICE9PSB1bmRlZmluZWQpXG4gICAgICAuam9pbihcIi1cIik7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKHBlcmNlbnRNZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhVc2FnZVBlcmNlbnQsXG4gICAgICBhbGFybU5hbWVTdWZmaXgsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIlRoZSBDUFUgdXNhZ2UgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRNYXhNYXN0ZXJDcHVVc2FnZVBlcmNlbnRBbGFybShcbiAgICBwZXJjZW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBVc2FnZVRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShwZXJjZW50TWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5NSVNTSU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4VXNhZ2VQZXJjZW50LFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBcIk1hc3Rlci1DUFUtVXNhZ2VcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiVGhlIG1hc3RlciBDUFUgdXNhZ2UgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRNYXhNZW1vcnlVc2FnZVBlcmNlbnRBbGFybShcbiAgICBwZXJjZW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBVc2FnZVRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFkZE1lbW9yeVVzYWdlUGVyY2VudEFsYXJtKFxuICAgICAgcGVyY2VudE1ldHJpYyxcbiAgICAgIHByb3BzLFxuICAgICAgVXNhZ2VUeXBlLk1BWCxcbiAgICAgIGRpc2FtYmlndWF0b3JcbiAgICApO1xuICB9XG5cbiAgYWRkTWVtb3J5VXNhZ2VQZXJjZW50QWxhcm0oXG4gICAgcGVyY2VudE1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogVXNhZ2VUaHJlc2hvbGQsXG4gICAgdXNhZ2VUeXBlOiBVc2FnZVR5cGUsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBhbGFybU5hbWVTdWZmaXg6IHN0cmluZyA9XG4gICAgICB1c2FnZVR5cGUgPT09IFVzYWdlVHlwZS5NQVhcbiAgICAgICAgPyBcIk1lbW9yeS1Vc2FnZVwiXG4gICAgICAgIDogYCR7dXNhZ2VUeXBlfS1NZW1vcnktVXNhZ2VgO1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShwZXJjZW50TWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5NSVNTSU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4VXNhZ2VQZXJjZW50LFxuICAgICAgYWxhcm1OYW1lU3VmZml4LFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJUaGUgbWVtb3J5IHVzYWdlIGlzIHRvbyBoaWdoLlwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkTWF4TWFzdGVyTWVtb3J5VXNhZ2VQZXJjZW50QWxhcm0oXG4gICAgcGVyY2VudE1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogVXNhZ2VUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0ocGVyY2VudE1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heFVzYWdlUGVyY2VudCxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJNYXN0ZXItTWVtb3J5LVVzYWdlXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIlRoZSBtYXN0ZXIgbWVtb3J5IHVzYWdlIGlzIHRvbyBoaWdoLlwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkTWF4RGlza1VzYWdlUGVyY2VudEFsYXJtKFxuICAgIHBlcmNlbnRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IFVzYWdlVGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKHBlcmNlbnRNZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhVc2FnZVBlcmNlbnQsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiRGlzay1Vc2FnZVwiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJUaGUgZGlzayB1c2FnZSBpcyB0b28gaGlnaC5cIixcbiAgICB9KTtcbiAgfVxuXG4gIGFkZE1heEhlYXBNZW1vcnlBZnRlckdDVXNhZ2VQZXJjZW50QWxhcm0oXG4gICAgcGVyY2VudE1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogVXNhZ2VUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0ocGVyY2VudE1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heFVzYWdlUGVyY2VudCxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJIZWFwTWVtb3J5QWZ0ZXJHQy1Vc2FnZVwiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJUaGUgaGVhcCBtZW1vcnkgYWZ0ZXIgR0MgdXNhZ2UgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRNYXhGaWxlRGVzY3JpcHRvclBlcmNlbnRBbGFybShcbiAgICBwZXJjZW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBVc2FnZVRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShwZXJjZW50TWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5NSVNTSU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4VXNhZ2VQZXJjZW50LFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBcIkZpbGUtRGVzY3JpcHRvci1Vc2FnZVwiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJUaGUgZmlsZSBkZXNjcmlwdG9yIHVzYWdlIGlzIHRvbyBoaWdoLlwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkTWF4VGhyZWFkQ291bnRVc2FnZUFsYXJtKFxuICAgIHBlcmNlbnRNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IFVzYWdlQ291bnRUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0ocGVyY2VudE1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heFVzYWdlQ291bnQsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiVGhyZWFkLUNvdW50XCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIlRoZSB0aHJlYWQgY291bnQgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==