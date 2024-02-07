"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAlarmFactory = exports.ErrorType = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
var ErrorType;
(function (ErrorType) {
    ErrorType["FAULT"] = "Fault";
    ErrorType["ERROR"] = "Error";
    ErrorType["SYSTEM_ERROR"] = "SystemError";
    ErrorType["USER_ERROR"] = "UserError";
    ErrorType["FAILURE"] = "Failure";
    ErrorType["ABORTED"] = "Aborted";
    ErrorType["THROTTLED"] = "Throttled";
    ErrorType["TIMED_OUT"] = "TimedOut";
    ErrorType["READ_ERROR"] = "ReadError";
    ErrorType["WRITE_ERROR"] = "WriteError";
    ErrorType["EXPIRED"] = "Expired";
    ErrorType["KILLED"] = "Killed";
    ErrorType["BLOCKED"] = "Blocked";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
class ErrorAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addErrorCountAlarm(metric, errorType, props, disambiguator) {
        const alarmNameSuffix = `${errorType}-Count`;
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxErrorCount,
            alarmNameSuffix,
            // we will dedupe any kind of error to the same ticket
            alarmDedupeStringSuffix: this.alarmFactory.shouldUseDefaultDedupeForError
                ? "AnyError"
                : alarmNameSuffix,
            alarmDescription: `${errorType} count is too high.`,
        });
    }
    addErrorRateAlarm(metric, errorType, props, disambiguator) {
        const alarmNameSuffix = `${errorType}-Rate`;
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxErrorRate,
            alarmNameSuffix,
            // we will dedupe any kind of error to the same ticket
            alarmDedupeStringSuffix: this.alarmFactory.shouldUseDefaultDedupeForError
                ? "AnyError"
                : alarmNameSuffix,
            alarmDescription: `${errorType} rate is too high.`,
        });
    }
}
exports.ErrorAlarmFactory = ErrorAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
ErrorAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.ErrorAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JBbGFybUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFcnJvckFsYXJtRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUdvQztBQUtwQyxJQUFZLFNBY1g7QUFkRCxXQUFZLFNBQVM7SUFDbkIsNEJBQWUsQ0FBQTtJQUNmLDRCQUFlLENBQUE7SUFDZix5Q0FBNEIsQ0FBQTtJQUM1QixxQ0FBd0IsQ0FBQTtJQUN4QixnQ0FBbUIsQ0FBQTtJQUNuQixnQ0FBbUIsQ0FBQTtJQUNuQixvQ0FBdUIsQ0FBQTtJQUN2QixtQ0FBc0IsQ0FBQTtJQUN0QixxQ0FBd0IsQ0FBQTtJQUN4Qix1Q0FBMEIsQ0FBQTtJQUMxQixnQ0FBbUIsQ0FBQTtJQUNuQiw4QkFBaUIsQ0FBQTtJQUNqQixnQ0FBbUIsQ0FBQTtBQUNyQixDQUFDLEVBZFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFjcEI7QUFVRCxNQUFhLGlCQUFpQjtJQUc1QixZQUFZLFlBQTBCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFRCxrQkFBa0IsQ0FDaEIsTUFBOEIsRUFDOUIsU0FBb0IsRUFDcEIsS0FBMEIsRUFDMUIsYUFBc0I7UUFFdEIsTUFBTSxlQUFlLEdBQUcsR0FBRyxTQUFTLFFBQVEsQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsYUFBYTtZQUNsRSxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWE7WUFDOUIsZUFBZTtZQUNmLHNEQUFzRDtZQUN0RCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLDhCQUE4QjtnQkFDdkUsQ0FBQyxDQUFDLFVBQVU7Z0JBQ1osQ0FBQyxDQUFDLGVBQWU7WUFDbkIsZ0JBQWdCLEVBQUUsR0FBRyxTQUFTLHFCQUFxQjtTQUNwRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQ2YsTUFBOEIsRUFDOUIsU0FBb0IsRUFDcEIsS0FBeUIsRUFDekIsYUFBc0I7UUFFdEIsTUFBTSxlQUFlLEdBQUcsR0FBRyxTQUFTLE9BQU8sQ0FBQztRQUU1QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsYUFBYTtZQUNsRSxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLFlBQVk7WUFDN0IsZUFBZTtZQUNmLHNEQUFzRDtZQUN0RCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLDhCQUE4QjtnQkFDdkUsQ0FBQyxDQUFDLFVBQVU7Z0JBQ1osQ0FBQyxDQUFDLGVBQWU7WUFDbkIsZ0JBQWdCLEVBQUUsR0FBRyxTQUFTLG9CQUFvQjtTQUNuRCxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXpESCw4Q0EwREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wYXJpc29uT3BlcmF0b3IsXG4gIFRyZWF0TWlzc2luZ0RhdGEsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuXG5pbXBvcnQgeyBBbGFybUZhY3RvcnksIEN1c3RvbUFsYXJtVGhyZXNob2xkIH0gZnJvbSBcIi4uLy4uL2FsYXJtXCI7XG5pbXBvcnQgeyBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0IH0gZnJvbSBcIi4uLy4uL21ldHJpY1wiO1xuXG5leHBvcnQgZW51bSBFcnJvclR5cGUge1xuICBGQVVMVCA9IFwiRmF1bHRcIixcbiAgRVJST1IgPSBcIkVycm9yXCIsXG4gIFNZU1RFTV9FUlJPUiA9IFwiU3lzdGVtRXJyb3JcIixcbiAgVVNFUl9FUlJPUiA9IFwiVXNlckVycm9yXCIsXG4gIEZBSUxVUkUgPSBcIkZhaWx1cmVcIixcbiAgQUJPUlRFRCA9IFwiQWJvcnRlZFwiLFxuICBUSFJPVFRMRUQgPSBcIlRocm90dGxlZFwiLFxuICBUSU1FRF9PVVQgPSBcIlRpbWVkT3V0XCIsXG4gIFJFQURfRVJST1IgPSBcIlJlYWRFcnJvclwiLFxuICBXUklURV9FUlJPUiA9IFwiV3JpdGVFcnJvclwiLFxuICBFWFBJUkVEID0gXCJFeHBpcmVkXCIsXG4gIEtJTExFRCA9IFwiS2lsbGVkXCIsXG4gIEJMT0NLRUQgPSBcIkJsb2NrZWRcIixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFcnJvckNvdW50VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhFcnJvckNvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JSYXRlVGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhFcnJvclJhdGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEVycm9yQWxhcm1GYWN0b3J5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGFsYXJtRmFjdG9yeTogQWxhcm1GYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKGFsYXJtRmFjdG9yeTogQWxhcm1GYWN0b3J5KSB7XG4gICAgdGhpcy5hbGFybUZhY3RvcnkgPSBhbGFybUZhY3Rvcnk7XG4gIH1cblxuICBhZGRFcnJvckNvdW50QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIGVycm9yVHlwZTogRXJyb3JUeXBlLFxuICAgIHByb3BzOiBFcnJvckNvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgYWxhcm1OYW1lU3VmZml4ID0gYCR7ZXJyb3JUeXBlfS1Db3VudGA7XG5cbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5OT1RfQlJFQUNISU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4RXJyb3JDb3VudCxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeCxcbiAgICAgIC8vIHdlIHdpbGwgZGVkdXBlIGFueSBraW5kIG9mIGVycm9yIHRvIHRoZSBzYW1lIHRpY2tldFxuICAgICAgYWxhcm1EZWR1cGVTdHJpbmdTdWZmaXg6IHRoaXMuYWxhcm1GYWN0b3J5LnNob3VsZFVzZURlZmF1bHREZWR1cGVGb3JFcnJvclxuICAgICAgICA/IFwiQW55RXJyb3JcIlxuICAgICAgICA6IGFsYXJtTmFtZVN1ZmZpeCxcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IGAke2Vycm9yVHlwZX0gY291bnQgaXMgdG9vIGhpZ2guYCxcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEVycm9yUmF0ZUFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBlcnJvclR5cGU6IEVycm9yVHlwZSxcbiAgICBwcm9wczogRXJyb3JSYXRlVGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgYWxhcm1OYW1lU3VmZml4ID0gYCR7ZXJyb3JUeXBlfS1SYXRlYDtcblxuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk5PVF9CUkVBQ0hJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhFcnJvclJhdGUsXG4gICAgICBhbGFybU5hbWVTdWZmaXgsXG4gICAgICAvLyB3ZSB3aWxsIGRlZHVwZSBhbnkga2luZCBvZiBlcnJvciB0byB0aGUgc2FtZSB0aWNrZXRcbiAgICAgIGFsYXJtRGVkdXBlU3RyaW5nU3VmZml4OiB0aGlzLmFsYXJtRmFjdG9yeS5zaG91bGRVc2VEZWZhdWx0RGVkdXBlRm9yRXJyb3JcbiAgICAgICAgPyBcIkFueUVycm9yXCJcbiAgICAgICAgOiBhbGFybU5hbWVTdWZmaXgsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBgJHtlcnJvclR5cGV9IHJhdGUgaXMgdG9vIGhpZ2guYCxcbiAgICB9KTtcbiAgfVxufVxuIl19