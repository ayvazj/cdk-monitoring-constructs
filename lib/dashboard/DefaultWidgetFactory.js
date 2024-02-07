"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultWidgetFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const common_1 = require("../common");
class DefaultWidgetFactory {
    createAlarmDetailWidget(alarm) {
        return new aws_cloudwatch_1.AlarmWidget({
            alarm: alarm.alarm,
            title: alarm.alarmLabel,
            width: common_1.DefaultAlarmWidgetWidth,
            height: common_1.DefaultAlarmWidgetHeight,
        });
    }
}
exports.DefaultWidgetFactory = DefaultWidgetFactory;
_a = JSII_RTTI_SYMBOL_1;
DefaultWidgetFactory[_a] = { fqn: "cdk-monitoring-constructs.DefaultWidgetFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmYXVsdFdpZGdldEZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEZWZhdWx0V2lkZ2V0RmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFrRTtBQUdsRSxzQ0FJbUI7QUFFbkIsTUFBYSxvQkFBb0I7SUFDL0IsdUJBQXVCLENBQUMsS0FBMEI7UUFDaEQsT0FBTyxJQUFJLDRCQUFXLENBQUM7WUFDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2xCLEtBQUssRUFBRSxLQUFLLENBQUMsVUFBVTtZQUN2QixLQUFLLEVBQUUsZ0NBQXVCO1lBQzlCLE1BQU0sRUFBRSxpQ0FBd0I7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFSSCxvREFTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFsYXJtV2lkZ2V0LCBJV2lkZ2V0IH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IElXaWRnZXRGYWN0b3J5IH0gZnJvbSBcIi4vSVdpZGdldEZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIEFsYXJtV2l0aEFubm90YXRpb24sXG4gIERlZmF1bHRBbGFybVdpZGdldEhlaWdodCxcbiAgRGVmYXVsdEFsYXJtV2lkZ2V0V2lkdGgsXG59IGZyb20gXCIuLi9jb21tb25cIjtcblxuZXhwb3J0IGNsYXNzIERlZmF1bHRXaWRnZXRGYWN0b3J5IGltcGxlbWVudHMgSVdpZGdldEZhY3Rvcnkge1xuICBjcmVhdGVBbGFybURldGFpbFdpZGdldChhbGFybTogQWxhcm1XaXRoQW5ub3RhdGlvbik6IElXaWRnZXQge1xuICAgIHJldHVybiBuZXcgQWxhcm1XaWRnZXQoe1xuICAgICAgYWxhcm06IGFsYXJtLmFsYXJtLFxuICAgICAgdGl0bGU6IGFsYXJtLmFsYXJtTGFiZWwsXG4gICAgICB3aWR0aDogRGVmYXVsdEFsYXJtV2lkZ2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IERlZmF1bHRBbGFybVdpZGdldEhlaWdodCxcbiAgICB9KTtcbiAgfVxufVxuIl19