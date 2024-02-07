"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevelAlarmFactory = exports.LogLevel = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
/**
 * Level of a given log
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "ERROR";
    LogLevel["CRITICAL"] = "CRITICAL";
    LogLevel["FATAL"] = "FATAL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class LogLevelAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addLogCountAlarm(metric, logLevel, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxLogCount,
            alarmNameSuffix: `${LogLevel[logLevel]}-Logs-Count`,
            // we will dedupe any kind of error to the same ticket
            alarmDedupeStringSuffix: `${LogLevel[logLevel].toLowerCase()}`,
            alarmDescription: `${LogLevel[logLevel]} logs count is too high.`,
        });
    }
}
exports.LogLevelAlarmFactory = LogLevelAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
LogLevelAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.LogLevelAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nTGV2ZWxBbGFybUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJMb2dMZXZlbEFsYXJtRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUdvQztBQUtwQzs7R0FFRztBQUNILElBQVksUUFJWDtBQUpELFdBQVksUUFBUTtJQUNsQiwyQkFBZSxDQUFBO0lBQ2YsaUNBQXFCLENBQUE7SUFDckIsMkJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFJbkI7QUFTRCxNQUFhLG9CQUFvQjtJQUcvQixZQUFZLFlBQTBCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFRCxnQkFBZ0IsQ0FDZCxNQUE4QixFQUM5QixRQUFrQixFQUNsQixLQUE2QixFQUM3QixhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsYUFBYTtZQUNsRSxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDNUIsZUFBZSxFQUFFLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhO1lBQ25ELHNEQUFzRDtZQUN0RCx1QkFBdUIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUM5RCxnQkFBZ0IsRUFBRSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsMEJBQTBCO1NBQ2xFLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBM0JILG9EQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBhcmlzb25PcGVyYXRvcixcbiAgVHJlYXRNaXNzaW5nRGF0YSxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IEFsYXJtRmFjdG9yeSwgQ3VzdG9tQWxhcm1UaHJlc2hvbGQgfSBmcm9tIFwiLi4vLi4vYWxhcm1cIjtcbmltcG9ydCB7IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQgfSBmcm9tIFwiLi4vLi4vbWV0cmljXCI7XG5cbi8qKlxuICogTGV2ZWwgb2YgYSBnaXZlbiBsb2dcbiAqL1xuZXhwb3J0IGVudW0gTG9nTGV2ZWwge1xuICBFUlJPUiA9IFwiRVJST1JcIixcbiAgQ1JJVElDQUwgPSBcIkNSSVRJQ0FMXCIsXG4gIEZBVEFMID0gXCJGQVRBTFwiLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ0xldmVsQ291bnRUaHJlc2hvbGQgZXh0ZW5kcyBDdXN0b21BbGFybVRocmVzaG9sZCB7XG4gIC8qKlxuICAgKiBUaHJlc2hvbGQgZm9yIHRoZSBudW1iZXIgb2YgbG9ncyB0byBhbGFybSBvblxuICAgKi9cbiAgcmVhZG9ubHkgbWF4TG9nQ291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIExvZ0xldmVsQWxhcm1GYWN0b3J5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGFsYXJtRmFjdG9yeTogQWxhcm1GYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKGFsYXJtRmFjdG9yeTogQWxhcm1GYWN0b3J5KSB7XG4gICAgdGhpcy5hbGFybUZhY3RvcnkgPSBhbGFybUZhY3Rvcnk7XG4gIH1cblxuICBhZGRMb2dDb3VudEFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBsb2dMZXZlbDogTG9nTGV2ZWwsXG4gICAgcHJvcHM6IExvZ0xldmVsQ291bnRUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5OT1RfQlJFQUNISU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4TG9nQ291bnQsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IGAke0xvZ0xldmVsW2xvZ0xldmVsXX0tTG9ncy1Db3VudGAsXG4gICAgICAvLyB3ZSB3aWxsIGRlZHVwZSBhbnkga2luZCBvZiBlcnJvciB0byB0aGUgc2FtZSB0aWNrZXRcbiAgICAgIGFsYXJtRGVkdXBlU3RyaW5nU3VmZml4OiBgJHtMb2dMZXZlbFtsb2dMZXZlbF0udG9Mb3dlckNhc2UoKX1gLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogYCR7TG9nTGV2ZWxbbG9nTGV2ZWxdfSBsb2dzIGNvdW50IGlzIHRvbyBoaWdoLmAsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==