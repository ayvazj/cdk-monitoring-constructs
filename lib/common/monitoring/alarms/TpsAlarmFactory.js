"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpsAlarmFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
class TpsAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addMinTpsAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minTps,
            alarmNameSuffix: `MinTPS`,
            alarmDedupeStringSuffix: "Tps-Min",
            alarmDescription: `TPS is too low.`,
        });
    }
    addMaxTpsAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxTps,
            alarmNameSuffix: `MaxTPS`,
            alarmDedupeStringSuffix: "Tps-Max",
            alarmDescription: `TPS is too high.`,
        });
    }
}
exports.TpsAlarmFactory = TpsAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
TpsAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.TpsAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHBzQWxhcm1GYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVHBzQWxhcm1GYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBR29DO0FBYXBDLE1BQWEsZUFBZTtJQUcxQixZQUFZLFlBQTBCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFRCxjQUFjLENBQ1osTUFBOEIsRUFDOUIsS0FBc0IsRUFDdEIsYUFBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsZ0JBQWdCLEVBQ2QsS0FBSyxDQUFDLHdCQUF3QixJQUFJLGlDQUFnQixDQUFDLE9BQU87WUFDNUQsa0JBQWtCLEVBQ2hCLEtBQUssQ0FBQywwQkFBMEI7Z0JBQ2hDLG1DQUFrQixDQUFDLG1CQUFtQjtZQUN4QyxHQUFHLEtBQUs7WUFDUixhQUFhO1lBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3ZCLGVBQWUsRUFBRSxRQUFRO1lBQ3pCLHVCQUF1QixFQUFFLFNBQVM7WUFDbEMsZ0JBQWdCLEVBQUUsaUJBQWlCO1NBQ3BDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxjQUFjLENBQ1osTUFBOEIsRUFDOUIsS0FBdUIsRUFDdkIsYUFBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsZ0JBQWdCLEVBQ2QsS0FBSyxDQUFDLHdCQUF3QixJQUFJLGlDQUFnQixDQUFDLE9BQU87WUFDNUQsa0JBQWtCLEVBQ2hCLEtBQUssQ0FBQywwQkFBMEI7Z0JBQ2hDLG1DQUFrQixDQUFDLHNCQUFzQjtZQUMzQyxHQUFHLEtBQUs7WUFDUixhQUFhO1lBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3ZCLGVBQWUsRUFBRSxRQUFRO1lBQ3pCLHVCQUF1QixFQUFFLFNBQVM7WUFDbEMsZ0JBQWdCLEVBQUUsa0JBQWtCO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBN0NILDBDQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBhcmlzb25PcGVyYXRvcixcbiAgVHJlYXRNaXNzaW5nRGF0YSxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IEFsYXJtRmFjdG9yeSwgQ3VzdG9tQWxhcm1UaHJlc2hvbGQgfSBmcm9tIFwiLi4vLi4vYWxhcm1cIjtcbmltcG9ydCB7IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQgfSBmcm9tIFwiLi4vLi4vbWV0cmljXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG93VHBzVGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtaW5UcHM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIaWdoVHBzVGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhUcHM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFRwc0FsYXJtRmFjdG9yeSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeTtcblxuICBjb25zdHJ1Y3RvcihhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeSkge1xuICAgIHRoaXMuYWxhcm1GYWN0b3J5ID0gYWxhcm1GYWN0b3J5O1xuICB9XG5cbiAgYWRkTWluVHBzQWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBMb3dUcHNUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5NSVNTSU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuTEVTU19USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWluVHBzLFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBgTWluVFBTYCxcbiAgICAgIGFsYXJtRGVkdXBlU3RyaW5nU3VmZml4OiBcIlRwcy1NaW5cIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IGBUUFMgaXMgdG9vIGxvdy5gLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkTWF4VHBzQWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBIaWdoVHBzVGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heFRwcyxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogYE1heFRQU2AsXG4gICAgICBhbGFybURlZHVwZVN0cmluZ1N1ZmZpeDogXCJUcHMtTWF4XCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBgVFBTIGlzIHRvbyBoaWdoLmAsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==