"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskHealthAlarmFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
class TaskHealthAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addHealthyTaskCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minHealthyTasks,
            alarmNameSuffix: "Healthy-Tasks",
            alarmDescription: "Number of healthy tasks is too low.",
        });
    }
    addUnhealthyTaskCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxUnhealthyTasks,
            alarmNameSuffix: "Unhealthy-Tasks",
            alarmDescription: "Number of unhealthy tasks is too high.",
        });
    }
    addHealthyTaskPercentAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minHealthyTaskPercent,
            alarmNameSuffix: "Healthy-Task-Percent",
            alarmDescription: "Percentage of healthy tasks is too low.",
        });
    }
    addRunningTaskCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxRunningTasks,
            alarmNameSuffix: "Running-Tasks-High",
            alarmDescription: "Number of running tasks are too high.",
        });
    }
    addRunningTaskRateAlarm(metric, props, disambiguator) {
        const alarmNameSuffix = "Task-Rate";
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxRunningTaskRate,
            alarmNameSuffix,
            // we will dedupe any kind of error to the same ticket
            alarmDedupeStringSuffix: this.alarmFactory.shouldUseDefaultDedupeForError
                ? "AnyError"
                : alarmNameSuffix,
            alarmDescription: "Running task rate is too high.",
        });
    }
    addMinRunningTaskCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minRunningTasks,
            alarmNameSuffix: "Running-Tasks-Low",
            alarmDescription: "Number of running tasks is too low.",
        });
    }
    addAvailabilityAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minAvailabilityPercent,
            alarmNameSuffix: "Availability",
            alarmDescription: "The availability is too low.",
        });
    }
}
exports.TaskHealthAlarmFactory = TaskHealthAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
TaskHealthAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.TaskHealthAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza0hlYWx0aEFsYXJtRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhc2tIZWFsdGhBbGFybUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrREFHb0M7QUFpQ3BDLE1BQWEsc0JBQXNCO0lBR2pDLFlBQVksWUFBMEI7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVELHdCQUF3QixDQUN0QixNQUE4QixFQUM5QixLQUFnQyxFQUNoQyxhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsT0FBTztZQUM1RCxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsbUJBQW1CO1lBQ3hDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLGVBQWU7WUFDaEMsZUFBZSxFQUFFLGVBQWU7WUFDaEMsZ0JBQWdCLEVBQUUscUNBQXFDO1NBQ3hELENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwwQkFBMEIsQ0FDeEIsTUFBOEIsRUFDOUIsS0FBa0MsRUFDbEMsYUFBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsZ0JBQWdCLEVBQ2QsS0FBSyxDQUFDLHdCQUF3QixJQUFJLGlDQUFnQixDQUFDLE9BQU87WUFDNUQsa0JBQWtCLEVBQ2hCLEtBQUssQ0FBQywwQkFBMEI7Z0JBQ2hDLG1DQUFrQixDQUFDLHNCQUFzQjtZQUMzQyxHQUFHLEtBQUs7WUFDUixhQUFhO1lBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQyxpQkFBaUI7WUFDbEMsZUFBZSxFQUFFLGlCQUFpQjtZQUNsQyxnQkFBZ0IsRUFBRSx3Q0FBd0M7U0FD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SyxDQUFDLHNCQUFzQjtZQUN2QyxlQUFlLEVBQUUsY0FBYztZQUMvQixnQkFBZ0IsRUFBRSw4QkFBOEI7U0FDakQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFoSkgsd0RBaUpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcGFyaXNvbk9wZXJhdG9yLFxuICBUcmVhdE1pc3NpbmdEYXRhLFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHsgQWxhcm1GYWN0b3J5LCBDdXN0b21BbGFybVRocmVzaG9sZCB9IGZyb20gXCIuLi8uLi9hbGFybVwiO1xuaW1wb3J0IHsgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB9IGZyb20gXCIuLi8uLi9tZXRyaWNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIZWFsdGh5VGFza0NvdW50VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtaW5IZWFsdGh5VGFza3M6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVbmhlYWx0aHlUYXNrQ291bnRUaHJlc2hvbGQgZXh0ZW5kcyBDdXN0b21BbGFybVRocmVzaG9sZCB7XG4gIHJlYWRvbmx5IG1heFVuaGVhbHRoeVRhc2tzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVhbHRoeVRhc2tQZXJjZW50VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtaW5IZWFsdGh5VGFza1BlcmNlbnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSdW5uaW5nVGFza0NvdW50VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhSdW5uaW5nVGFza3M6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSdW5uaW5nVGFza1JhdGVUaHJlc2hvbGQgZXh0ZW5kcyBDdXN0b21BbGFybVRocmVzaG9sZCB7XG4gIHJlYWRvbmx5IG1heFJ1bm5pbmdUYXNrUmF0ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1pblJ1bm5pbmdUYXNrQ291bnRUaHJlc2hvbGQgZXh0ZW5kcyBDdXN0b21BbGFybVRocmVzaG9sZCB7XG4gIHJlYWRvbmx5IG1pblJ1bm5pbmdUYXNrczogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF2YWlsYWJpbGl0eVRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWluQXZhaWxhYmlsaXR5UGVyY2VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgVGFza0hlYWx0aEFsYXJtRmFjdG9yeSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeTtcblxuICBjb25zdHJ1Y3RvcihhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeSkge1xuICAgIHRoaXMuYWxhcm1GYWN0b3J5ID0gYWxhcm1GYWN0b3J5O1xuICB9XG5cbiAgYWRkSGVhbHRoeVRhc2tDb3VudEFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogSGVhbHRoeVRhc2tDb3VudFRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5MRVNTX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5taW5IZWFsdGh5VGFza3MsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiSGVhbHRoeS1UYXNrc1wiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgaGVhbHRoeSB0YXNrcyBpcyB0b28gbG93LlwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkVW5oZWFsdGh5VGFza0NvdW50QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBVbmhlYWx0aHlUYXNrQ291bnRUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5NSVNTSU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4VW5oZWFsdGh5VGFza3MsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiVW5oZWFsdGh5LVRhc2tzXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIk51bWJlciBvZiB1bmhlYWx0aHkgdGFza3MgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRIZWFsdGh5VGFza1BlcmNlbnRBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IEhlYWx0aHlUYXNrUGVyY2VudFRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5MRVNTX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5taW5IZWFsdGh5VGFza1BlcmNlbnQsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiSGVhbHRoeS1UYXNrLVBlcmNlbnRcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiUGVyY2VudGFnZSBvZiBoZWFsdGh5IHRhc2tzIGlzIHRvbyBsb3cuXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRSdW5uaW5nVGFza0NvdW50QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBSdW5uaW5nVGFza0NvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heFJ1bm5pbmdUYXNrcyxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJSdW5uaW5nLVRhc2tzLUhpZ2hcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIHJ1bm5pbmcgdGFza3MgYXJlIHRvbyBoaWdoLlwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkUnVubmluZ1Rhc2tSYXRlQWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBSdW5uaW5nVGFza1JhdGVUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBhbGFybU5hbWVTdWZmaXggPSBcIlRhc2stUmF0ZVwiO1xuXG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTk9UX0JSRUFDSElORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heFJ1bm5pbmdUYXNrUmF0ZSxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeCxcbiAgICAgIC8vIHdlIHdpbGwgZGVkdXBlIGFueSBraW5kIG9mIGVycm9yIHRvIHRoZSBzYW1lIHRpY2tldFxuICAgICAgYWxhcm1EZWR1cGVTdHJpbmdTdWZmaXg6IHRoaXMuYWxhcm1GYWN0b3J5LnNob3VsZFVzZURlZmF1bHREZWR1cGVGb3JFcnJvclxuICAgICAgICA/IFwiQW55RXJyb3JcIlxuICAgICAgICA6IGFsYXJtTmFtZVN1ZmZpeCxcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiUnVubmluZyB0YXNrIHJhdGUgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRNaW5SdW5uaW5nVGFza0NvdW50QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBNaW5SdW5uaW5nVGFza0NvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkxFU1NfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1pblJ1bm5pbmdUYXNrcyxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJSdW5uaW5nLVRhc2tzLUxvd1wiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgcnVubmluZyB0YXNrcyBpcyB0b28gbG93LlwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkQXZhaWxhYmlsaXR5QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBBdmFpbGFiaWxpdHlUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5NSVNTSU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuTEVTU19USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWluQXZhaWxhYmlsaXR5UGVyY2VudCxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJBdmFpbGFiaWxpdHlcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiVGhlIGF2YWlsYWJpbGl0eSBpcyB0b28gbG93LlwiLFxuICAgIH0pO1xuICB9XG59XG4iXX0=