"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnomalyDetectingAlarmFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
class AnomalyDetectingAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addAlarmWhenOutOfBand(metric, alarmNameSuffix, disambiguator, props) {
        return this.alarmFactory.addAlarm(metric, {
            ...props,
            disambiguator,
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            // Dummy threshold value. This gets removed later.
            threshold: 0,
            comparisonOperator: this.getComparisonOperator(props),
            alarmDedupeStringSuffix: props.dedupeStringOverride,
            alarmNameSuffix,
            alarmDescription: props.additionalDescription ?? this.getDefaultDescription(props),
        });
    }
    getDefaultDescription(props) {
        if (props.alarmWhenAboveTheBand && props.alarmWhenBelowTheBand) {
            return "Anomaly detection: value is outside of the expected band.";
        }
        else if (props.alarmWhenAboveTheBand) {
            return "Anomaly detection: value is above the expected band.";
        }
        else if (props.alarmWhenBelowTheBand) {
            return "Anomaly detection: value is below the expected band.";
        }
        else {
            throw new Error("You need to alarm when the value is above or below the band, or both.");
        }
    }
    getComparisonOperator(props) {
        if (props.alarmWhenAboveTheBand && props.alarmWhenBelowTheBand) {
            return aws_cloudwatch_1.ComparisonOperator.LESS_THAN_LOWER_OR_GREATER_THAN_UPPER_THRESHOLD;
        }
        else if (props.alarmWhenAboveTheBand) {
            return aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_UPPER_THRESHOLD;
        }
        else if (props.alarmWhenBelowTheBand) {
            return aws_cloudwatch_1.ComparisonOperator.LESS_THAN_LOWER_THRESHOLD;
        }
        else {
            throw new Error("You need to alarm when the value is above or below the band, or both.");
        }
    }
}
exports.AnomalyDetectingAlarmFactory = AnomalyDetectingAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
AnomalyDetectingAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.AnomalyDetectingAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5vbWFseURldGVjdGluZ0FsYXJtRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFub21hbHlEZXRlY3RpbmdBbGFybUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrREFHb0M7QUFZcEMsTUFBYSw0QkFBNEI7SUFHdkMsWUFBWSxZQUEwQjtRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBRUQscUJBQXFCLENBQ25CLE1BQThCLEVBQzlCLGVBQXVCLEVBQ3ZCLGFBQXFCLEVBQ3JCLEtBQWdDO1FBRWhDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsT0FBTztZQUM1RCxrREFBa0Q7WUFDbEQsU0FBUyxFQUFFLENBQUM7WUFDWixrQkFBa0IsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDO1lBQ3JELHVCQUF1QixFQUFFLEtBQUssQ0FBQyxvQkFBb0I7WUFDbkQsZUFBZTtZQUNmLGdCQUFnQixFQUNkLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDO1NBQ25FLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxLQUFnQztRQUM1RCxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxLQUFLLENBQUMscUJBQXFCLEVBQUU7WUFDOUQsT0FBTywyREFBMkQsQ0FBQztTQUNwRTthQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixFQUFFO1lBQ3RDLE9BQU8sc0RBQXNELENBQUM7U0FDL0Q7YUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtZQUN0QyxPQUFPLHNEQUFzRCxDQUFDO1NBQy9EO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUNiLHVFQUF1RSxDQUN4RSxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBZ0M7UUFDNUQsSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksS0FBSyxDQUFDLHFCQUFxQixFQUFFO1lBQzlELE9BQU8sbUNBQWtCLENBQUMsK0NBQStDLENBQUM7U0FDM0U7YUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtZQUN0QyxPQUFPLG1DQUFrQixDQUFDLDRCQUE0QixDQUFDO1NBQ3hEO2FBQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLEVBQUU7WUFDdEMsT0FBTyxtQ0FBa0IsQ0FBQyx5QkFBeUIsQ0FBQztTQUNyRDthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYix1RUFBdUUsQ0FDeEUsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7QUF0REgsb0VBdURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcGFyaXNvbk9wZXJhdG9yLFxuICBUcmVhdE1pc3NpbmdEYXRhLFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHsgQWxhcm1GYWN0b3J5LCBDdXN0b21BbGFybVRocmVzaG9sZCB9IGZyb20gXCIuLi8uLi9hbGFybVwiO1xuaW1wb3J0IHsgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB9IGZyb20gXCIuLi8uLi9tZXRyaWNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBBbm9tYWx5RGV0ZWN0aW9uVGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBzdGFuZGFyZERldmlhdGlvbkZvckFsYXJtOiBudW1iZXI7XG4gIHJlYWRvbmx5IGFsYXJtV2hlbkFib3ZlVGhlQmFuZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgYWxhcm1XaGVuQmVsb3dUaGVCYW5kOiBib29sZWFuO1xuICByZWFkb25seSBhZGRpdGlvbmFsRGVzY3JpcHRpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBbm9tYWx5RGV0ZWN0aW5nQWxhcm1GYWN0b3J5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGFsYXJtRmFjdG9yeTogQWxhcm1GYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKGFsYXJtRmFjdG9yeTogQWxhcm1GYWN0b3J5KSB7XG4gICAgdGhpcy5hbGFybUZhY3RvcnkgPSBhbGFybUZhY3Rvcnk7XG4gIH1cblxuICBhZGRBbGFybVdoZW5PdXRPZkJhbmQoXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIGFsYXJtTmFtZVN1ZmZpeDogc3RyaW5nLFxuICAgIGRpc2FtYmlndWF0b3I6IHN0cmluZyxcbiAgICBwcm9wczogQW5vbWFseURldGVjdGlvblRocmVzaG9sZFxuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5NSVNTSU5HLFxuICAgICAgLy8gRHVtbXkgdGhyZXNob2xkIHZhbHVlLiBUaGlzIGdldHMgcmVtb3ZlZCBsYXRlci5cbiAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjogdGhpcy5nZXRDb21wYXJpc29uT3BlcmF0b3IocHJvcHMpLFxuICAgICAgYWxhcm1EZWR1cGVTdHJpbmdTdWZmaXg6IHByb3BzLmRlZHVwZVN0cmluZ092ZXJyaWRlLFxuICAgICAgYWxhcm1OYW1lU3VmZml4LFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjpcbiAgICAgICAgcHJvcHMuYWRkaXRpb25hbERlc2NyaXB0aW9uID8/IHRoaXMuZ2V0RGVmYXVsdERlc2NyaXB0aW9uKHByb3BzKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdERlc2NyaXB0aW9uKHByb3BzOiBBbm9tYWx5RGV0ZWN0aW9uVGhyZXNob2xkKSB7XG4gICAgaWYgKHByb3BzLmFsYXJtV2hlbkFib3ZlVGhlQmFuZCAmJiBwcm9wcy5hbGFybVdoZW5CZWxvd1RoZUJhbmQpIHtcbiAgICAgIHJldHVybiBcIkFub21hbHkgZGV0ZWN0aW9uOiB2YWx1ZSBpcyBvdXRzaWRlIG9mIHRoZSBleHBlY3RlZCBiYW5kLlwiO1xuICAgIH0gZWxzZSBpZiAocHJvcHMuYWxhcm1XaGVuQWJvdmVUaGVCYW5kKSB7XG4gICAgICByZXR1cm4gXCJBbm9tYWx5IGRldGVjdGlvbjogdmFsdWUgaXMgYWJvdmUgdGhlIGV4cGVjdGVkIGJhbmQuXCI7XG4gICAgfSBlbHNlIGlmIChwcm9wcy5hbGFybVdoZW5CZWxvd1RoZUJhbmQpIHtcbiAgICAgIHJldHVybiBcIkFub21hbHkgZGV0ZWN0aW9uOiB2YWx1ZSBpcyBiZWxvdyB0aGUgZXhwZWN0ZWQgYmFuZC5cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIllvdSBuZWVkIHRvIGFsYXJtIHdoZW4gdGhlIHZhbHVlIGlzIGFib3ZlIG9yIGJlbG93IHRoZSBiYW5kLCBvciBib3RoLlwiXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29tcGFyaXNvbk9wZXJhdG9yKHByb3BzOiBBbm9tYWx5RGV0ZWN0aW9uVGhyZXNob2xkKSB7XG4gICAgaWYgKHByb3BzLmFsYXJtV2hlbkFib3ZlVGhlQmFuZCAmJiBwcm9wcy5hbGFybVdoZW5CZWxvd1RoZUJhbmQpIHtcbiAgICAgIHJldHVybiBDb21wYXJpc29uT3BlcmF0b3IuTEVTU19USEFOX0xPV0VSX09SX0dSRUFURVJfVEhBTl9VUFBFUl9USFJFU0hPTEQ7XG4gICAgfSBlbHNlIGlmIChwcm9wcy5hbGFybVdoZW5BYm92ZVRoZUJhbmQpIHtcbiAgICAgIHJldHVybiBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1VQUEVSX1RIUkVTSE9MRDtcbiAgICB9IGVsc2UgaWYgKHByb3BzLmFsYXJtV2hlbkJlbG93VGhlQmFuZCkge1xuICAgICAgcmV0dXJuIENvbXBhcmlzb25PcGVyYXRvci5MRVNTX1RIQU5fTE9XRVJfVEhSRVNIT0xEO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiWW91IG5lZWQgdG8gYWxhcm0gd2hlbiB0aGUgdmFsdWUgaXMgYWJvdmUgb3IgYmVsb3cgdGhlIGJhbmQsIG9yIGJvdGguXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=