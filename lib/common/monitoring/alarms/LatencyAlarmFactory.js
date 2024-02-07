"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatencyAlarmFactory = exports.getLatencyTypeLabel = exports.getLatencyTypeExpressionId = exports.getLatencyTypeStatistic = exports.LatencyType = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const metric_1 = require("../../metric");
var LatencyType;
(function (LatencyType) {
    LatencyType["P50"] = "P50";
    LatencyType["P70"] = "P70";
    LatencyType["P90"] = "P90";
    LatencyType["P95"] = "P95";
    LatencyType["P99"] = "P99";
    LatencyType["P999"] = "P999";
    LatencyType["P9999"] = "P9999";
    LatencyType["P100"] = "P100";
    LatencyType["TM50"] = "TM50";
    LatencyType["TM70"] = "TM70";
    LatencyType["TM90"] = "TM90";
    LatencyType["TM95"] = "TM95";
    LatencyType["TM99"] = "TM99";
    LatencyType["TM999"] = "TM999";
    LatencyType["TM9999"] = "TM9999";
    LatencyType["TM95_TOP"] = "TM(95%:100%)";
    LatencyType["TM99_TOP"] = "TM(99%:100%)";
    LatencyType["TM999_TOP"] = "TM(99.9%:100%)";
    LatencyType["TM9999_TOP"] = "TM(99.99%:100%)";
    LatencyType["AVERAGE"] = "Average";
    LatencyType["MAX"] = "Maximum";
})(LatencyType = exports.LatencyType || (exports.LatencyType = {}));
function getLatencyTypeStatistic(latencyType) {
    switch (latencyType) {
        case LatencyType.P50:
            return metric_1.MetricStatistic.P50;
        case LatencyType.P70:
            return metric_1.MetricStatistic.P70;
        case LatencyType.P90:
            return metric_1.MetricStatistic.P90;
        case LatencyType.P95:
            return metric_1.MetricStatistic.P95;
        case LatencyType.P99:
            return metric_1.MetricStatistic.P99;
        case LatencyType.P999:
            return metric_1.MetricStatistic.P999;
        case LatencyType.P9999:
            return metric_1.MetricStatistic.P9999;
        case LatencyType.P100:
            return metric_1.MetricStatistic.P100;
        case LatencyType.TM50:
            return metric_1.MetricStatistic.TM50;
        case LatencyType.TM70:
            return metric_1.MetricStatistic.TM70;
        case LatencyType.TM90:
            return metric_1.MetricStatistic.TM90;
        case LatencyType.TM95:
            return metric_1.MetricStatistic.TM95;
        case LatencyType.TM99:
            return metric_1.MetricStatistic.TM99;
        case LatencyType.TM999:
            return metric_1.MetricStatistic.TM999;
        case LatencyType.TM9999:
            return metric_1.MetricStatistic.TM9999;
        case LatencyType.TM95_TOP:
            return metric_1.MetricStatistic.TM95_TOP;
        case LatencyType.TM99_TOP:
            return metric_1.MetricStatistic.TM99_TOP;
        case LatencyType.TM999_TOP:
            return metric_1.MetricStatistic.TM999_TOP;
        case LatencyType.TM9999_TOP:
            return metric_1.MetricStatistic.TM9999_TOP;
        case LatencyType.AVERAGE:
            return metric_1.MetricStatistic.AVERAGE;
        case LatencyType.MAX:
            return metric_1.MetricStatistic.MAX;
        default:
            throw new Error("Unsupported latency type (unknown statistic): " + latencyType);
    }
}
exports.getLatencyTypeStatistic = getLatencyTypeStatistic;
function getLatencyTypeExpressionId(latencyType) {
    switch (latencyType) {
        case LatencyType.P50:
        case LatencyType.P70:
        case LatencyType.P90:
        case LatencyType.P95:
        case LatencyType.P99:
        case LatencyType.P999:
        case LatencyType.P9999:
        case LatencyType.P100:
            // remove the P prefix
            return latencyType.substring(1);
        case LatencyType.AVERAGE:
            // making it shorter for backwards compatibility
            return "Avg";
        case LatencyType.MAX:
            return "Max";
        default:
            // use as-is
            return latencyType;
    }
}
exports.getLatencyTypeExpressionId = getLatencyTypeExpressionId;
function getLatencyTypeLabel(latencyType) {
    const averageSuffix = " (avg: ${AVG})";
    switch (latencyType) {
        case LatencyType.P999:
        case LatencyType.TM999:
            // we need proper decimal here
            return latencyType.replace("999", "99.9") + averageSuffix;
        case LatencyType.P9999:
        case LatencyType.TM9999:
        case LatencyType.TM95_TOP:
        case LatencyType.TM99_TOP:
        case LatencyType.TM999_TOP:
        case LatencyType.TM9999_TOP:
            // we need proper decimal here
            return latencyType.replace("9999", "99.99") + averageSuffix;
        case LatencyType.AVERAGE:
            // no suffix here, since we already have average
            return "Average";
        case LatencyType.MAX:
            return "Maximum";
        default:
            // use as-is
            return latencyType + averageSuffix;
    }
}
exports.getLatencyTypeLabel = getLatencyTypeLabel;
class LatencyAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addLatencyAlarm(metric, latencyType, props, disambiguator, additionalAlarmNameSuffix = undefined) {
        const alarmNameSuffix = ["Latency", latencyType, additionalAlarmNameSuffix]
            .filter((i) => i !== undefined)
            .join("-");
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxLatency.toMilliseconds(),
            alarmNameSuffix,
            // we will dedupe any kind of latency issue to the same ticket
            alarmDedupeStringSuffix: this.alarmFactory
                .shouldUseDefaultDedupeForLatency
                ? "AnyLatency"
                : alarmNameSuffix,
            alarmDescription: `${latencyType} latency is too high.`,
        });
    }
    addIntegrationLatencyAlarm(metric, latencyType, props, disambiguator, additionalAlarmNameSuffix = undefined) {
        const alarmNameSuffix = [
            "IntegrationLatency",
            latencyType,
            additionalAlarmNameSuffix,
        ]
            .filter((i) => i !== undefined)
            .join("-");
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxLatency.toMilliseconds(),
            alarmNameSuffix,
            // we will dedupe any kind of latency issue to the same alarm
            alarmDedupeStringSuffix: this.alarmFactory
                .shouldUseDefaultDedupeForLatency
                ? "AnyLatency"
                : alarmNameSuffix,
            alarmDescription: `${latencyType} integration latency is too high.`,
        });
    }
    addDurationAlarm(metric, latencyType, props, disambiguator, additionalAlarmNameSuffix = undefined) {
        const alarmNameSuffix = ["Duration", latencyType, additionalAlarmNameSuffix]
            .filter((i) => i !== undefined)
            .join("-");
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxDuration.toMilliseconds(),
            alarmNameSuffix,
            // we will dedupe any kind of latency issue to the same ticket
            alarmDedupeStringSuffix: this.alarmFactory
                .shouldUseDefaultDedupeForLatency
                ? "AnyDuration"
                : alarmNameSuffix,
            alarmDescription: `${latencyType} duration is too long.`,
        });
    }
    addJvmGarbageCollectionDurationAlarm(metric, latencyType, props, disambiguator, additionalAlarmNameSuffix = undefined) {
        const alarmNameSuffix = [
            "Garbage-Collection-Time",
            latencyType,
            additionalAlarmNameSuffix,
        ]
            .filter((i) => i !== undefined)
            .join("-");
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxDuration.toMilliseconds(),
            alarmNameSuffix,
            // we will dedupe any kind of latency issue to the same ticket
            alarmDedupeStringSuffix: this.alarmFactory
                .shouldUseDefaultDedupeForLatency
                ? "AnyDuration"
                : alarmNameSuffix,
            alarmDescription: `${latencyType} duration is too long.`,
        });
    }
}
exports.LatencyAlarmFactory = LatencyAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
LatencyAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.LatencyAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0ZW5jeUFsYXJtRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxhdGVuY3lBbGFybUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSwrREFHb0M7QUFHcEMseUNBQXVFO0FBRXZFLElBQVksV0FzQlg7QUF0QkQsV0FBWSxXQUFXO0lBQ3JCLDBCQUFXLENBQUE7SUFDWCwwQkFBVyxDQUFBO0lBQ1gsMEJBQVcsQ0FBQTtJQUNYLDBCQUFXLENBQUE7SUFDWCwwQkFBVyxDQUFBO0lBQ1gsNEJBQWEsQ0FBQTtJQUNiLDhCQUFlLENBQUE7SUFDZiw0QkFBYSxDQUFBO0lBQ2IsNEJBQWEsQ0FBQTtJQUNiLDRCQUFhLENBQUE7SUFDYiw0QkFBYSxDQUFBO0lBQ2IsNEJBQWEsQ0FBQTtJQUNiLDRCQUFhLENBQUE7SUFDYiw4QkFBZSxDQUFBO0lBQ2YsZ0NBQWlCLENBQUE7SUFDakIsd0NBQXlCLENBQUE7SUFDekIsd0NBQXlCLENBQUE7SUFDekIsMkNBQTRCLENBQUE7SUFDNUIsNkNBQThCLENBQUE7SUFDOUIsa0NBQW1CLENBQUE7SUFDbkIsOEJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBdEJXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBc0J0QjtBQUVELFNBQWdCLHVCQUF1QixDQUFDLFdBQXdCO0lBQzlELFFBQVEsV0FBVyxFQUFFO1FBQ25CLEtBQUssV0FBVyxDQUFDLEdBQUc7WUFDbEIsT0FBTyx3QkFBZSxDQUFDLEdBQUcsQ0FBQztRQUM3QixLQUFLLFdBQVcsQ0FBQyxHQUFHO1lBQ2xCLE9BQU8sd0JBQWUsQ0FBQyxHQUFHLENBQUM7UUFDN0IsS0FBSyxXQUFXLENBQUMsR0FBRztZQUNsQixPQUFPLHdCQUFlLENBQUMsR0FBRyxDQUFDO1FBQzdCLEtBQUssV0FBVyxDQUFDLEdBQUc7WUFDbEIsT0FBTyx3QkFBZSxDQUFDLEdBQUcsQ0FBQztRQUM3QixLQUFLLFdBQVcsQ0FBQyxHQUFHO1lBQ2xCLE9B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LE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsYUFBYTtZQUNsRSxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7WUFDN0MsZUFBZTtZQUNmLDhEQUE4RDtZQUM5RCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsWUFBWTtpQkFDdkMsZ0NBQWdDO2dCQUNqQyxDQUFDLENBQUMsYUFBYTtnQkFDZixDQUFDLENBQUMsZUFBZTtZQUNuQixnQkFBZ0IsRUFBRSxHQUFHLFdBQVcsd0JBQXdCO1NBQ3pELENBQUMsQ0FBQztJQUNMLENBQUM7O0FBcklILGtEQXNJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER1cmF0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQge1xuICBDb21wYXJpc29uT3BlcmF0b3IsXG4gIFRyZWF0TWlzc2luZ0RhdGEsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuXG5pbXBvcnQgeyBBbGFybUZhY3RvcnksIEN1c3RvbUFsYXJtVGhyZXNob2xkIH0gZnJvbSBcIi4uLy4uL2FsYXJtXCI7XG5pbXBvcnQgeyBNZXRyaWNTdGF0aXN0aWMsIE1ldHJpY1dpdGhBbGFybVN1cHBvcnQgfSBmcm9tIFwiLi4vLi4vbWV0cmljXCI7XG5cbmV4cG9ydCBlbnVtIExhdGVuY3lUeXBlIHtcbiAgUDUwID0gXCJQNTBcIixcbiAgUDcwID0gXCJQNzBcIixcbiAgUDkwID0gXCJQOTBcIixcbiAgUDk1ID0gXCJQOTVcIixcbiAgUDk5ID0gXCJQOTlcIixcbiAgUDk5OSA9IFwiUDk5OVwiLFxuICBQOTk5OSA9IFwiUDk5OTlcIixcbiAgUDEwMCA9IFwiUDEwMFwiLFxuICBUTTUwID0gXCJUTTUwXCIsXG4gIFRNNzAgPSBcIlRNNzBcIixcbiAgVE05MCA9IFwiVE05MFwiLFxuICBUTTk1ID0gXCJUTTk1XCIsXG4gIFRNOTkgPSBcIlRNOTlcIixcbiAgVE05OTkgPSBcIlRNOTk5XCIsXG4gIFRNOTk5OSA9IFwiVE05OTk5XCIsXG4gIFRNOTVfVE9QID0gXCJUTSg5NSU6MTAwJSlcIixcbiAgVE05OV9UT1AgPSBcIlRNKDk5JToxMDAlKVwiLFxuICBUTTk5OV9UT1AgPSBcIlRNKDk5LjklOjEwMCUpXCIsXG4gIFRNOTk5OV9UT1AgPSBcIlRNKDk5Ljk5JToxMDAlKVwiLFxuICBBVkVSQUdFID0gXCJBdmVyYWdlXCIsXG4gIE1BWCA9IFwiTWF4aW11bVwiLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF0ZW5jeVR5cGVTdGF0aXN0aWMobGF0ZW5jeVR5cGU6IExhdGVuY3lUeXBlKSB7XG4gIHN3aXRjaCAobGF0ZW5jeVR5cGUpIHtcbiAgICBjYXNlIExhdGVuY3lUeXBlLlA1MDpcbiAgICAgIHJldHVybiBNZXRyaWNTdGF0aXN0aWMuUDUwO1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuUDcwOlxuICAgICAgcmV0dXJuIE1ldHJpY1N0YXRpc3RpYy5QNzA7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5QOTA6XG4gICAgICByZXR1cm4gTWV0cmljU3RhdGlzdGljLlA5MDtcbiAgICBjYXNlIExhdGVuY3lUeXBlLlA5NTpcbiAgICAgIHJldHVybiBNZXRyaWNTdGF0aXN0aWMuUDk1O1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuUDk5OlxuICAgICAgcmV0dXJuIE1ldHJpY1N0YXRpc3RpYy5QOTk7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5QOTk5OlxuICAgICAgcmV0dXJuIE1ldHJpY1N0YXRpc3RpYy5QOTk5O1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuUDk5OTk6XG4gICAgICByZXR1cm4gTWV0cmljU3RhdGlzdGljLlA5OTk5O1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuUDEwMDpcbiAgICAgIHJldHVybiBNZXRyaWNTdGF0aXN0aWMuUDEwMDtcbiAgICBjYXNlIExhdGVuY3lUeXBlLlRNNTA6XG4gICAgICByZXR1cm4gTWV0cmljU3RhdGlzdGljLlRNNTA7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5UTTcwOlxuICAgICAgcmV0dXJuIE1ldHJpY1N0YXRpc3RpYy5UTTcwO1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuVE05MDpcbiAgICAgIHJldHVybiBNZXRyaWNTdGF0aXN0aWMuVE05MDtcbiAgICBjYXNlIExhdGVuY3lUeXBlLlRNOTU6XG4gICAgICByZXR1cm4gTWV0cmljU3RhdGlzdGljLlRNOTU7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5UTTk5OlxuICAgICAgcmV0dXJuIE1ldHJpY1N0YXRpc3RpYy5UTTk5O1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuVE05OTk6XG4gICAgICByZXR1cm4gTWV0cmljU3RhdGlzdGljLlRNOTk5O1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuVE05OTk5OlxuICAgICAgcmV0dXJuIE1ldHJpY1N0YXRpc3RpYy5UTTk5OTk7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5UTTk1X1RPUDpcbiAgICAgIHJldHVybiBNZXRyaWNTdGF0aXN0aWMuVE05NV9UT1A7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5UTTk5X1RPUDpcbiAgICAgIHJldHVybiBNZXRyaWNTdGF0aXN0aWMuVE05OV9UT1A7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5UTTk5OV9UT1A6XG4gICAgICByZXR1cm4gTWV0cmljU3RhdGlzdGljLlRNOTk5X1RPUDtcbiAgICBjYXNlIExhdGVuY3lUeXBlLlRNOTk5OV9UT1A6XG4gICAgICByZXR1cm4gTWV0cmljU3RhdGlzdGljLlRNOTk5OV9UT1A7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5BVkVSQUdFOlxuICAgICAgcmV0dXJuIE1ldHJpY1N0YXRpc3RpYy5BVkVSQUdFO1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuTUFYOlxuICAgICAgcmV0dXJuIE1ldHJpY1N0YXRpc3RpYy5NQVg7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJVbnN1cHBvcnRlZCBsYXRlbmN5IHR5cGUgKHVua25vd24gc3RhdGlzdGljKTogXCIgKyBsYXRlbmN5VHlwZVxuICAgICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF0ZW5jeVR5cGVFeHByZXNzaW9uSWQobGF0ZW5jeVR5cGU6IExhdGVuY3lUeXBlKSB7XG4gIHN3aXRjaCAobGF0ZW5jeVR5cGUpIHtcbiAgICBjYXNlIExhdGVuY3lUeXBlLlA1MDpcbiAgICBjYXNlIExhdGVuY3lUeXBlLlA3MDpcbiAgICBjYXNlIExhdGVuY3lUeXBlLlA5MDpcbiAgICBjYXNlIExhdGVuY3lUeXBlLlA5NTpcbiAgICBjYXNlIExhdGVuY3lUeXBlLlA5OTpcbiAgICBjYXNlIExhdGVuY3lUeXBlLlA5OTk6XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5QOTk5OTpcbiAgICBjYXNlIExhdGVuY3lUeXBlLlAxMDA6XG4gICAgICAvLyByZW1vdmUgdGhlIFAgcHJlZml4XG4gICAgICByZXR1cm4gbGF0ZW5jeVR5cGUuc3Vic3RyaW5nKDEpO1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuQVZFUkFHRTpcbiAgICAgIC8vIG1ha2luZyBpdCBzaG9ydGVyIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgcmV0dXJuIFwiQXZnXCI7XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5NQVg6XG4gICAgICByZXR1cm4gXCJNYXhcIjtcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gdXNlIGFzLWlzXG4gICAgICByZXR1cm4gbGF0ZW5jeVR5cGU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExhdGVuY3lUeXBlTGFiZWwobGF0ZW5jeVR5cGU6IExhdGVuY3lUeXBlKSB7XG4gIGNvbnN0IGF2ZXJhZ2VTdWZmaXggPSBcIiAoYXZnOiAke0FWR30pXCI7XG5cbiAgc3dpdGNoIChsYXRlbmN5VHlwZSkge1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuUDk5OTpcbiAgICBjYXNlIExhdGVuY3lUeXBlLlRNOTk5OlxuICAgICAgLy8gd2UgbmVlZCBwcm9wZXIgZGVjaW1hbCBoZXJlXG4gICAgICByZXR1cm4gbGF0ZW5jeVR5cGUucmVwbGFjZShcIjk5OVwiLCBcIjk5LjlcIikgKyBhdmVyYWdlU3VmZml4O1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuUDk5OTk6XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5UTTk5OTk6XG4gICAgY2FzZSBMYXRlbmN5VHlwZS5UTTk1X1RPUDpcbiAgICBjYXNlIExhdGVuY3lUeXBlLlRNOTlfVE9QOlxuICAgIGNhc2UgTGF0ZW5jeVR5cGUuVE05OTlfVE9QOlxuICAgIGNhc2UgTGF0ZW5jeVR5cGUuVE05OTk5X1RPUDpcbiAgICAgIC8vIHdlIG5lZWQgcHJvcGVyIGRlY2ltYWwgaGVyZVxuICAgICAgcmV0dXJuIGxhdGVuY3lUeXBlLnJlcGxhY2UoXCI5OTk5XCIsIFwiOTkuOTlcIikgKyBhdmVyYWdlU3VmZml4O1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuQVZFUkFHRTpcbiAgICAgIC8vIG5vIHN1ZmZpeCBoZXJlLCBzaW5jZSB3ZSBhbHJlYWR5IGhhdmUgYXZlcmFnZVxuICAgICAgcmV0dXJuIFwiQXZlcmFnZVwiO1xuICAgIGNhc2UgTGF0ZW5jeVR5cGUuTUFYOlxuICAgICAgcmV0dXJuIFwiTWF4aW11bVwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyB1c2UgYXMtaXNcbiAgICAgIHJldHVybiBsYXRlbmN5VHlwZSArIGF2ZXJhZ2VTdWZmaXg7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYXRlbmN5VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhMYXRlbmN5OiBEdXJhdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEdXJhdGlvblRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWF4RHVyYXRpb246IER1cmF0aW9uO1xufVxuXG5leHBvcnQgY2xhc3MgTGF0ZW5jeUFsYXJtRmFjdG9yeSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeTtcblxuICBjb25zdHJ1Y3RvcihhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeSkge1xuICAgIHRoaXMuYWxhcm1GYWN0b3J5ID0gYWxhcm1GYWN0b3J5O1xuICB9XG5cbiAgYWRkTGF0ZW5jeUFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBsYXRlbmN5VHlwZTogTGF0ZW5jeVR5cGUsXG4gICAgcHJvcHM6IExhdGVuY3lUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZyxcbiAgICBhZGRpdGlvbmFsQWxhcm1OYW1lU3VmZml4OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcbiAgKSB7XG4gICAgY29uc3QgYWxhcm1OYW1lU3VmZml4ID0gW1wiTGF0ZW5jeVwiLCBsYXRlbmN5VHlwZSwgYWRkaXRpb25hbEFsYXJtTmFtZVN1ZmZpeF1cbiAgICAgIC5maWx0ZXIoKGkpID0+IGkgIT09IHVuZGVmaW5lZClcbiAgICAgIC5qb2luKFwiLVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk5PVF9CUkVBQ0hJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhMYXRlbmN5LnRvTWlsbGlzZWNvbmRzKCksXG4gICAgICBhbGFybU5hbWVTdWZmaXgsXG4gICAgICAvLyB3ZSB3aWxsIGRlZHVwZSBhbnkga2luZCBvZiBsYXRlbmN5IGlzc3VlIHRvIHRoZSBzYW1lIHRpY2tldFxuICAgICAgYWxhcm1EZWR1cGVTdHJpbmdTdWZmaXg6IHRoaXMuYWxhcm1GYWN0b3J5XG4gICAgICAgIC5zaG91bGRVc2VEZWZhdWx0RGVkdXBlRm9yTGF0ZW5jeVxuICAgICAgICA/IFwiQW55TGF0ZW5jeVwiXG4gICAgICAgIDogYWxhcm1OYW1lU3VmZml4LFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogYCR7bGF0ZW5jeVR5cGV9IGxhdGVuY3kgaXMgdG9vIGhpZ2guYCxcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEludGVncmF0aW9uTGF0ZW5jeUFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBsYXRlbmN5VHlwZTogTGF0ZW5jeVR5cGUsXG4gICAgcHJvcHM6IExhdGVuY3lUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZyxcbiAgICBhZGRpdGlvbmFsQWxhcm1OYW1lU3VmZml4OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcbiAgKSB7XG4gICAgY29uc3QgYWxhcm1OYW1lU3VmZml4ID0gW1xuICAgICAgXCJJbnRlZ3JhdGlvbkxhdGVuY3lcIixcbiAgICAgIGxhdGVuY3lUeXBlLFxuICAgICAgYWRkaXRpb25hbEFsYXJtTmFtZVN1ZmZpeCxcbiAgICBdXG4gICAgICAuZmlsdGVyKChpKSA9PiBpICE9PSB1bmRlZmluZWQpXG4gICAgICAuam9pbihcIi1cIik7XG5cbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5OT1RfQlJFQUNISU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4TGF0ZW5jeS50b01pbGxpc2Vjb25kcygpLFxuICAgICAgYWxhcm1OYW1lU3VmZml4LFxuICAgICAgLy8gd2Ugd2lsbCBkZWR1cGUgYW55IGtpbmQgb2YgbGF0ZW5jeSBpc3N1ZSB0byB0aGUgc2FtZSBhbGFybVxuICAgICAgYWxhcm1EZWR1cGVTdHJpbmdTdWZmaXg6IHRoaXMuYWxhcm1GYWN0b3J5XG4gICAgICAgIC5zaG91bGRVc2VEZWZhdWx0RGVkdXBlRm9yTGF0ZW5jeVxuICAgICAgICA/IFwiQW55TGF0ZW5jeVwiXG4gICAgICAgIDogYWxhcm1OYW1lU3VmZml4LFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogYCR7bGF0ZW5jeVR5cGV9IGludGVncmF0aW9uIGxhdGVuY3kgaXMgdG9vIGhpZ2guYCxcbiAgICB9KTtcbiAgfVxuXG4gIGFkZER1cmF0aW9uQWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIGxhdGVuY3lUeXBlOiBMYXRlbmN5VHlwZSxcbiAgICBwcm9wczogRHVyYXRpb25UaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZyxcbiAgICBhZGRpdGlvbmFsQWxhcm1OYW1lU3VmZml4OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcbiAgKSB7XG4gICAgY29uc3QgYWxhcm1OYW1lU3VmZml4ID0gW1wiRHVyYXRpb25cIiwgbGF0ZW5jeVR5cGUsIGFkZGl0aW9uYWxBbGFybU5hbWVTdWZmaXhdXG4gICAgICAuZmlsdGVyKChpKSA9PiBpICE9PSB1bmRlZmluZWQpXG4gICAgICAuam9pbihcIi1cIik7XG5cbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5OT1RfQlJFQUNISU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4RHVyYXRpb24udG9NaWxsaXNlY29uZHMoKSxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeCxcbiAgICAgIC8vIHdlIHdpbGwgZGVkdXBlIGFueSBraW5kIG9mIGxhdGVuY3kgaXNzdWUgdG8gdGhlIHNhbWUgdGlja2V0XG4gICAgICBhbGFybURlZHVwZVN0cmluZ1N1ZmZpeDogdGhpcy5hbGFybUZhY3RvcnlcbiAgICAgICAgLnNob3VsZFVzZURlZmF1bHREZWR1cGVGb3JMYXRlbmN5XG4gICAgICAgID8gXCJBbnlEdXJhdGlvblwiXG4gICAgICAgIDogYWxhcm1OYW1lU3VmZml4LFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogYCR7bGF0ZW5jeVR5cGV9IGR1cmF0aW9uIGlzIHRvbyBsb25nLmAsXG4gICAgfSk7XG4gIH1cblxuICBhZGRKdm1HYXJiYWdlQ29sbGVjdGlvbkR1cmF0aW9uQWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIGxhdGVuY3lUeXBlOiBMYXRlbmN5VHlwZSxcbiAgICBwcm9wczogRHVyYXRpb25UaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZyxcbiAgICBhZGRpdGlvbmFsQWxhcm1OYW1lU3VmZml4OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcbiAgKSB7XG4gICAgY29uc3QgYWxhcm1OYW1lU3VmZml4ID0gW1xuICAgICAgXCJHYXJiYWdlLUNvbGxlY3Rpb24tVGltZVwiLFxuICAgICAgbGF0ZW5jeVR5cGUsXG4gICAgICBhZGRpdGlvbmFsQWxhcm1OYW1lU3VmZml4LFxuICAgIF1cbiAgICAgIC5maWx0ZXIoKGkpID0+IGkgIT09IHVuZGVmaW5lZClcbiAgICAgIC5qb2luKFwiLVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk5PVF9CUkVBQ0hJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhEdXJhdGlvbi50b01pbGxpc2Vjb25kcygpLFxuICAgICAgYWxhcm1OYW1lU3VmZml4LFxuICAgICAgLy8gd2Ugd2lsbCBkZWR1cGUgYW55IGtpbmQgb2YgbGF0ZW5jeSBpc3N1ZSB0byB0aGUgc2FtZSB0aWNrZXRcbiAgICAgIGFsYXJtRGVkdXBlU3RyaW5nU3VmZml4OiB0aGlzLmFsYXJtRmFjdG9yeVxuICAgICAgICAuc2hvdWxkVXNlRGVmYXVsdERlZHVwZUZvckxhdGVuY3lcbiAgICAgICAgPyBcIkFueUR1cmF0aW9uXCJcbiAgICAgICAgOiBhbGFybU5hbWVTdWZmaXgsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBgJHtsYXRlbmN5VHlwZX0gZHVyYXRpb24gaXMgdG9vIGxvbmcuYCxcbiAgICB9KTtcbiAgfVxufVxuIl19