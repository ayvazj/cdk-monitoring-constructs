"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringHeaderWidget = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const HeaderWidget_1 = require("./HeaderWidget");
class MonitoringHeaderWidget extends HeaderWidget_1.HeaderWidget {
    constructor(props) {
        super(MonitoringHeaderWidget.getText(props), HeaderWidget_1.HeaderLevel.SMALL, props.description, props.descriptionHeight);
    }
    static getText(props) {
        let title = props.title;
        if (props.goToLinkUrl) {
            title = `[${title}](${props.goToLinkUrl})`;
        }
        if (props.family) {
            title = `${props.family} **${title}**`;
        }
        return title;
    }
}
exports.MonitoringHeaderWidget = MonitoringHeaderWidget;
_a = JSII_RTTI_SYMBOL_1;
MonitoringHeaderWidget[_a] = { fqn: "cdk-monitoring-constructs.MonitoringHeaderWidget", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uaXRvcmluZ0hlYWRlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1vbml0b3JpbmdIZWFkZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpREFBMkQ7QUFVM0QsTUFBYSxzQkFBdUIsU0FBUSwyQkFBWTtJQUN0RCxZQUFZLEtBQWtDO1FBQzVDLEtBQUssQ0FDSCxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ3JDLDBCQUFXLENBQUMsS0FBSyxFQUNqQixLQUFLLENBQUMsV0FBVyxFQUNqQixLQUFLLENBQUMsaUJBQWlCLENBQ3hCLENBQUM7SUFDSixDQUFDO0lBRU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFrQztRQUN2RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBRXhCLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNyQixLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLEtBQUssR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLE1BQU0sS0FBSyxJQUFJLENBQUM7U0FDeEM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O0FBdEJILHdEQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhlYWRlckxldmVsLCBIZWFkZXJXaWRnZXQgfSBmcm9tIFwiLi9IZWFkZXJXaWRnZXRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0UHJvcHMge1xuICByZWFkb25seSB0aXRsZTogc3RyaW5nO1xuICByZWFkb25seSBmYW1pbHk/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGdvVG9MaW5rVXJsPzogc3RyaW5nO1xuICByZWFkb25seSBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgcmVhZG9ubHkgZGVzY3JpcHRpb25IZWlnaHQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0IGV4dGVuZHMgSGVhZGVyV2lkZ2V0IHtcbiAgY29uc3RydWN0b3IocHJvcHM6IE1vbml0b3JpbmdIZWFkZXJXaWRnZXRQcm9wcykge1xuICAgIHN1cGVyKFxuICAgICAgTW9uaXRvcmluZ0hlYWRlcldpZGdldC5nZXRUZXh0KHByb3BzKSxcbiAgICAgIEhlYWRlckxldmVsLlNNQUxMLFxuICAgICAgcHJvcHMuZGVzY3JpcHRpb24sXG4gICAgICBwcm9wcy5kZXNjcmlwdGlvbkhlaWdodFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRUZXh0KHByb3BzOiBNb25pdG9yaW5nSGVhZGVyV2lkZ2V0UHJvcHMpOiBzdHJpbmcge1xuICAgIGxldCB0aXRsZSA9IHByb3BzLnRpdGxlO1xuXG4gICAgaWYgKHByb3BzLmdvVG9MaW5rVXJsKSB7XG4gICAgICB0aXRsZSA9IGBbJHt0aXRsZX1dKCR7cHJvcHMuZ29Ub0xpbmtVcmx9KWA7XG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmZhbWlseSkge1xuICAgICAgdGl0bGUgPSBgJHtwcm9wcy5mYW1pbHl9ICoqJHt0aXRsZX0qKmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpdGxlO1xuICB9XG59XG4iXX0=