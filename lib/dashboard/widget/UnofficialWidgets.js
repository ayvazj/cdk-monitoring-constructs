"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmSummaryMatrixWidget = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const widget_1 = require("../../common/widget");
class AlarmSummaryMatrixWidget extends aws_cloudwatch_1.ConcreteWidget {
    constructor(props) {
        super(props.width ?? widget_1.FullWidth, props.height ?? 2);
        this.props = props;
    }
    toJson() {
        return [
            {
                type: "alarm",
                width: this.width,
                height: this.height,
                x: this.x,
                y: this.y,
                properties: {
                    title: this.props.title,
                    alarms: this.props.alarmArns,
                },
            },
        ];
    }
}
exports.AlarmSummaryMatrixWidget = AlarmSummaryMatrixWidget;
_a = JSII_RTTI_SYMBOL_1;
AlarmSummaryMatrixWidget[_a] = { fqn: "cdk-monitoring-constructs.AlarmSummaryMatrixWidget", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5vZmZpY2lhbFdpZGdldHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVbm9mZmljaWFsV2lkZ2V0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUErRTtBQUUvRSxnREFBZ0Q7QUFXaEQsTUFBYSx3QkFBeUIsU0FBUSwrQkFBYztJQUcxRCxZQUFZLEtBQW9DO1FBQzlDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLGtCQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU87WUFDTDtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNULENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDVCxVQUFVLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztpQkFDN0I7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztBQXRCSCw0REF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25jcmV0ZVdpZGdldCwgTWV0cmljV2lkZ2V0UHJvcHMgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHsgRnVsbFdpZHRoIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi93aWRnZXRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBBbGFybVN1bW1hcnlNYXRyaXhXaWRnZXRQcm9wcyBleHRlbmRzIE1ldHJpY1dpZGdldFByb3BzIHtcbiAgcmVhZG9ubHkgYWxhcm1Bcm5zOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbGFybVN1bW1hcnlNYXRyaXhXaWRnZXRQcm9wZXJ0aWVzSnNvbiB7XG4gIHJlYWRvbmx5IHRpdGxlPzogc3RyaW5nO1xuICByZWFkb25seSBhbGFybXM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY2xhc3MgQWxhcm1TdW1tYXJ5TWF0cml4V2lkZ2V0IGV4dGVuZHMgQ29uY3JldGVXaWRnZXQge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcHJvcHM6IEFsYXJtU3VtbWFyeU1hdHJpeFdpZGdldFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBBbGFybVN1bW1hcnlNYXRyaXhXaWRnZXRQcm9wcykge1xuICAgIHN1cGVyKHByb3BzLndpZHRoID8/IEZ1bGxXaWR0aCwgcHJvcHMuaGVpZ2h0ID8/IDIpO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgfVxuXG4gIHRvSnNvbigpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJhbGFybVwiLFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgeDogdGhpcy54LFxuICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgICAgICBhbGFybXM6IHRoaXMucHJvcHMuYWxhcm1Bcm5zLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdO1xuICB9XG59XG4iXX0=