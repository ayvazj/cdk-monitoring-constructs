"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoAlarmFactory = exports.CapacityType = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
var CapacityType;
(function (CapacityType) {
    CapacityType["READ"] = "Read";
    CapacityType["WRITE"] = "Write";
})(CapacityType = exports.CapacityType || (exports.CapacityType = {}));
class DynamoAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addConsumedCapacityAlarm(metric, capacityType, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxConsumedCapacityUnits,
            alarmNameSuffix: `${capacityType}-Consumed-Capacity`,
            // we will dedupe any kind of error to the same ticket
            alarmDedupeStringSuffix: "ConsumedCapacity",
            alarmDescription: `${capacityType} consumed capacity is too high.`,
        });
    }
    addThrottledEventsAlarm(metric, capacityType, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.NOT_BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxThrottledEventsThreshold,
            alarmNameSuffix: `${capacityType}-Throttled-Events`,
            // we will dedupe any kind of error to the same ticket
            alarmDedupeStringSuffix: "ThrottledEvents",
            alarmDescription: `${capacityType} throttled events above threshold.`,
        });
    }
}
exports.DynamoAlarmFactory = DynamoAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
DynamoAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.DynamoAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHluYW1vQWxhcm1GYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRHluYW1vQWxhcm1GYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBR29DO0FBS3BDLElBQVksWUFHWDtBQUhELFdBQVksWUFBWTtJQUN0Qiw2QkFBYSxDQUFBO0lBQ2IsK0JBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFVRCxNQUFhLGtCQUFrQjtJQUc3QixZQUFZLFlBQTBCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFRCx3QkFBd0IsQ0FDdEIsTUFBOEIsRUFDOUIsWUFBMEIsRUFDMUIsS0FBZ0MsRUFDaEMsYUFBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsZ0JBQWdCLEVBQ2QsS0FBSyxDQUFDLHdCQUF3QixJQUFJLGlDQUFnQixDQUFDLGFBQWE7WUFDbEUsa0JBQWtCLEVBQ2hCLEtBQUssQ0FBQywwQkFBMEI7Z0JBQ2hDLG1DQUFrQixDQUFDLHNCQUFzQjtZQUMzQyxHQUFHLEtBQUs7WUFDUixhQUFhO1lBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQyx3QkFBd0I7WUFDekMsZUFBZSxFQUFFLEdBQUcsWUFBWSxvQkFBb0I7WUFDcEQsc0RBQXNEO1lBQ3RELHVCQUF1QixFQUFFLGtCQUFrQjtZQUMzQyxnQkFBZ0IsRUFBRSxHQUFHLFlBQVksaUNBQWlDO1NBQ25FLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx1QkFBdUIsQ0FDckIsTUFBOEIsRUFDOUIsWUFBMEIsRUFDMUIsS0FBK0IsRUFDL0IsYUFBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsZ0JBQWdCLEVBQ2QsS0FBSyxDQUFDLHdCQUF3QixJQUFJLGlDQUFnQixDQUFDLGFBQWE7WUFDbEUsa0JBQWtCLEVBQ2hCLEtBQUssQ0FBQywwQkFBMEI7Z0JBQ2hDLG1DQUFrQixDQUFDLHNCQUFzQjtZQUMzQyxHQUFHLEtBQUs7WUFDUixhQUFhO1lBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQywyQkFBMkI7WUFDNUMsZUFBZSxFQUFFLEdBQUcsWUFBWSxtQkFBbUI7WUFDbkQsc0RBQXNEO1lBQ3RELHVCQUF1QixFQUFFLGlCQUFpQjtZQUMxQyxnQkFBZ0IsRUFBRSxHQUFHLFlBQVksb0NBQW9DO1NBQ3RFLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBakRILGdEQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBhcmlzb25PcGVyYXRvcixcbiAgVHJlYXRNaXNzaW5nRGF0YSxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IEFsYXJtRmFjdG9yeSwgQ3VzdG9tQWxhcm1UaHJlc2hvbGQgfSBmcm9tIFwiLi4vLi4vYWxhcm1cIjtcbmltcG9ydCB7IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQgfSBmcm9tIFwiLi4vLi4vbWV0cmljXCI7XG5cbmV4cG9ydCBlbnVtIENhcGFjaXR5VHlwZSB7XG4gIFJFQUQgPSBcIlJlYWRcIixcbiAgV1JJVEUgPSBcIldyaXRlXCIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3VtZWRDYXBhY2l0eVRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWF4Q29uc3VtZWRDYXBhY2l0eVVuaXRzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGhyb3R0bGVkRXZlbnRzVGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhUaHJvdHRsZWRFdmVudHNUaHJlc2hvbGQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIER5bmFtb0FsYXJtRmFjdG9yeSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeTtcblxuICBjb25zdHJ1Y3RvcihhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeSkge1xuICAgIHRoaXMuYWxhcm1GYWN0b3J5ID0gYWxhcm1GYWN0b3J5O1xuICB9XG5cbiAgYWRkQ29uc3VtZWRDYXBhY2l0eUFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBjYXBhY2l0eVR5cGU6IENhcGFjaXR5VHlwZSxcbiAgICBwcm9wczogQ29uc3VtZWRDYXBhY2l0eVRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk5PVF9CUkVBQ0hJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhDb25zdW1lZENhcGFjaXR5VW5pdHMsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IGAke2NhcGFjaXR5VHlwZX0tQ29uc3VtZWQtQ2FwYWNpdHlgLFxuICAgICAgLy8gd2Ugd2lsbCBkZWR1cGUgYW55IGtpbmQgb2YgZXJyb3IgdG8gdGhlIHNhbWUgdGlja2V0XG4gICAgICBhbGFybURlZHVwZVN0cmluZ1N1ZmZpeDogXCJDb25zdW1lZENhcGFjaXR5XCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBgJHtjYXBhY2l0eVR5cGV9IGNvbnN1bWVkIGNhcGFjaXR5IGlzIHRvbyBoaWdoLmAsXG4gICAgfSk7XG4gIH1cblxuICBhZGRUaHJvdHRsZWRFdmVudHNBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgY2FwYWNpdHlUeXBlOiBDYXBhY2l0eVR5cGUsXG4gICAgcHJvcHM6IFRocm90dGxlZEV2ZW50c1RocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk5PVF9CUkVBQ0hJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhUaHJvdHRsZWRFdmVudHNUaHJlc2hvbGQsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IGAke2NhcGFjaXR5VHlwZX0tVGhyb3R0bGVkLUV2ZW50c2AsXG4gICAgICAvLyB3ZSB3aWxsIGRlZHVwZSBhbnkga2luZCBvZiBlcnJvciB0byB0aGUgc2FtZSB0aWNrZXRcbiAgICAgIGFsYXJtRGVkdXBlU3RyaW5nU3VmZml4OiBcIlRocm90dGxlZEV2ZW50c1wiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogYCR7Y2FwYWNpdHlUeXBlfSB0aHJvdHRsZWQgZXZlbnRzIGFib3ZlIHRocmVzaG9sZC5gLFxuICAgIH0pO1xuICB9XG59XG4iXX0=