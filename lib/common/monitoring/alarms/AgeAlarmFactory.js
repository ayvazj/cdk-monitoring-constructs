"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgeAlarmFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
class AgeAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addDaysToExpiryAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minDaysToExpiry,
            alarmNameSuffix: "DaysToExpiry",
            alarmDescription: "Number of days until expiration is too low.",
        });
    }
    addIteratorMaxAgeAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxAgeInMillis,
            alarmNameSuffix: "Iterator-Age-Max",
            alarmDescription: "Iterator Max Age is too high.",
        });
    }
    addDaysSinceUpdateAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxDaysSinceUpdate,
            alarmNameSuffix: "DaysSinceUpdate",
            alarmDescription: "Number of days since update is too high.",
        });
    }
}
exports.AgeAlarmFactory = AgeAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
AgeAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.AgeAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlQWxhcm1GYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQWdlQWxhcm1GYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBR29DO0FBaUJwQyxNQUFhLGVBQWU7SUFHMUIsWUFBWSxZQUEwQjtRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBRUQsb0JBQW9CLENBQ2xCLE1BQThCLEVBQzlCLEtBQTRCLEVBQzVCLGFBQXNCO1FBRXRCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hDLGdCQUFnQixFQUNkLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxpQ0FBZ0IsQ0FBQyxPQUFPO1lBQzVELGtCQUFrQixFQUNoQixLQUFLLENBQUMsMEJBQTBCO2dCQUNoQyxtQ0FBa0IsQ0FBQyxtQkFBbUI7WUFDeEMsR0FBRyxLQUFLO1lBQ1IsYUFBYTtZQUNiLFNBQVMsRUFBRSxLQUFLLENBQUMsZUFBZTtZQUNoQyxlQUFlLEVBQUUsY0FBYztZQUMvQixnQkFBZ0IsRUFBRSw2Q0FBNkM7U0FDaEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNCQUFzQixDQUNwQixNQUE4QixFQUM5QixLQUFzQixFQUN0QixhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsT0FBTztZQUM1RCxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLGNBQWM7WUFDL0IsZUFBZSxFQUFFLGtCQUFrQjtZQUNuQyxnQkFBZ0IsRUFBRSwrQkFBK0I7U0FDbEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHVCQUF1QixDQUNyQixNQUE4QixFQUM5QixLQUErQixFQUMvQixhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsT0FBTztZQUM1RCxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLGtCQUFrQjtZQUNuQyxlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLGdCQUFnQixFQUFFLDBDQUEwQztTQUM3RCxDQUFDLENBQUM7SUFDTCxDQUFDOztBQTlESCwwQ0ErREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wYXJpc29uT3BlcmF0b3IsXG4gIFRyZWF0TWlzc2luZ0RhdGEsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuXG5pbXBvcnQgeyBBbGFybUZhY3RvcnksIEN1c3RvbUFsYXJtVGhyZXNob2xkIH0gZnJvbSBcIi4uLy4uL2FsYXJtXCI7XG5pbXBvcnQgeyBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0IH0gZnJvbSBcIi4uLy4uL21ldHJpY1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERheXNUb0V4cGlyeVRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWluRGF5c1RvRXhwaXJ5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF4QWdlVGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhBZ2VJbk1pbGxpczogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERheXNTaW5jZVVwZGF0ZVRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWF4RGF5c1NpbmNlVXBkYXRlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZ2VBbGFybUZhY3Rvcnkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYWxhcm1GYWN0b3J5OiBBbGFybUZhY3Rvcnk7XG5cbiAgY29uc3RydWN0b3IoYWxhcm1GYWN0b3J5OiBBbGFybUZhY3RvcnkpIHtcbiAgICB0aGlzLmFsYXJtRmFjdG9yeSA9IGFsYXJtRmFjdG9yeTtcbiAgfVxuXG4gIGFkZERheXNUb0V4cGlyeUFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogRGF5c1RvRXhwaXJ5VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkxFU1NfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1pbkRheXNUb0V4cGlyeSxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJEYXlzVG9FeHBpcnlcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIGRheXMgdW50aWwgZXhwaXJhdGlvbiBpcyB0b28gbG93LlwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlcmF0b3JNYXhBZ2VBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IE1heEFnZVRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhBZ2VJbk1pbGxpcyxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJJdGVyYXRvci1BZ2UtTWF4XCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIkl0ZXJhdG9yIE1heCBBZ2UgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGREYXlzU2luY2VVcGRhdGVBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IERheXNTaW5jZVVwZGF0ZVRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLk1JU1NJTkcsXG4gICAgICBjb21wYXJpc29uT3BlcmF0b3I6XG4gICAgICAgIHByb3BzLmNvbXBhcmlzb25PcGVyYXRvck92ZXJyaWRlID8/XG4gICAgICAgIENvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fVEhSRVNIT0xELFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdGhyZXNob2xkOiBwcm9wcy5tYXhEYXlzU2luY2VVcGRhdGUsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiRGF5c1NpbmNlVXBkYXRlXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIk51bWJlciBvZiBkYXlzIHNpbmNlIHVwZGF0ZSBpcyB0b28gaGlnaC5cIixcbiAgICB9KTtcbiAgfVxufVxuIl19