"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleWidgetDashboardSegment = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const DefaultDashboardFactory_1 = require("./DefaultDashboardFactory");
class SingleWidgetDashboardSegment {
    /**
     * Create a dashboard segment representing a single widget.
     * @param widget widget to add
     * @param dashboardsToInclude list of dashboard names which to show this widget on. Defaults to the default dashboards.
     */
    constructor(widget, dashboardsToInclude) {
        this.widget = widget;
        this.dashboardsToInclude = dashboardsToInclude ?? [
            DefaultDashboardFactory_1.DefaultDashboards.ALARMS,
            DefaultDashboardFactory_1.DefaultDashboards.DETAIL,
            DefaultDashboardFactory_1.DefaultDashboards.SUMMARY,
        ];
    }
    widgetsForDashboard(name) {
        if (this.dashboardsToInclude.includes(name)) {
            return [this.widget];
        }
        else {
            return [];
        }
    }
    alarmWidgets() {
        if (this.dashboardsToInclude.includes(DefaultDashboardFactory_1.DefaultDashboards.ALARMS)) {
            return [this.widget];
        }
        else {
            return [];
        }
    }
    summaryWidgets() {
        if (this.dashboardsToInclude.includes(DefaultDashboardFactory_1.DefaultDashboards.SUMMARY)) {
            return [this.widget];
        }
        else {
            return [];
        }
    }
    widgets() {
        if (this.dashboardsToInclude.includes(DefaultDashboardFactory_1.DefaultDashboards.DETAIL)) {
            return [this.widget];
        }
        else {
            return [];
        }
    }
}
exports.SingleWidgetDashboardSegment = SingleWidgetDashboardSegment;
_a = JSII_RTTI_SYMBOL_1;
SingleWidgetDashboardSegment[_a] = { fqn: "cdk-monitoring-constructs.SingleWidgetDashboardSegment", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlV2lkZ2V0RGFzaGJvYXJkU2VnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNpbmdsZVdpZGdldERhc2hib2FyZFNlZ21lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSx1RUFBOEQ7QUFHOUQsTUFBYSw0QkFBNEI7SUFNdkM7Ozs7T0FJRztJQUNILFlBQVksTUFBZSxFQUFFLG1CQUE4QjtRQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLElBQUk7WUFDaEQsMkNBQWlCLENBQUMsTUFBTTtZQUN4QiwyQ0FBaUIsQ0FBQyxNQUFNO1lBQ3hCLDJDQUFpQixDQUFDLE9BQU87U0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxJQUFZO1FBQzlCLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RCO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsMkNBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0QsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0QjthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLDJDQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQywyQ0FBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvRCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RCO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQzs7QUFsREgsb0VBbURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuaW1wb3J0IHsgSURhc2hib2FyZFNlZ21lbnQgfSBmcm9tIFwiLi9EYXNoYm9hcmRTZWdtZW50XCI7XG5pbXBvcnQgeyBEZWZhdWx0RGFzaGJvYXJkcyB9IGZyb20gXCIuL0RlZmF1bHREYXNoYm9hcmRGYWN0b3J5XCI7XG5pbXBvcnQgeyBJRHluYW1pY0Rhc2hib2FyZFNlZ21lbnQgfSBmcm9tIFwiLi9EeW5hbWljRGFzaGJvYXJkU2VnbWVudFwiO1xuXG5leHBvcnQgY2xhc3MgU2luZ2xlV2lkZ2V0RGFzaGJvYXJkU2VnbWVudFxuICBpbXBsZW1lbnRzIElEYXNoYm9hcmRTZWdtZW50LCBJRHluYW1pY0Rhc2hib2FyZFNlZ21lbnRcbntcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHdpZGdldDogSVdpZGdldDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRhc2hib2FyZHNUb0luY2x1ZGU6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkYXNoYm9hcmQgc2VnbWVudCByZXByZXNlbnRpbmcgYSBzaW5nbGUgd2lkZ2V0LlxuICAgKiBAcGFyYW0gd2lkZ2V0IHdpZGdldCB0byBhZGRcbiAgICogQHBhcmFtIGRhc2hib2FyZHNUb0luY2x1ZGUgbGlzdCBvZiBkYXNoYm9hcmQgbmFtZXMgd2hpY2ggdG8gc2hvdyB0aGlzIHdpZGdldCBvbi4gRGVmYXVsdHMgdG8gdGhlIGRlZmF1bHQgZGFzaGJvYXJkcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHdpZGdldDogSVdpZGdldCwgZGFzaGJvYXJkc1RvSW5jbHVkZT86IHN0cmluZ1tdKSB7XG4gICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgdGhpcy5kYXNoYm9hcmRzVG9JbmNsdWRlID0gZGFzaGJvYXJkc1RvSW5jbHVkZSA/PyBbXG4gICAgICBEZWZhdWx0RGFzaGJvYXJkcy5BTEFSTVMsXG4gICAgICBEZWZhdWx0RGFzaGJvYXJkcy5ERVRBSUwsXG4gICAgICBEZWZhdWx0RGFzaGJvYXJkcy5TVU1NQVJZLFxuICAgIF07XG4gIH1cblxuICB3aWRnZXRzRm9yRGFzaGJvYXJkKG5hbWU6IHN0cmluZyk6IElXaWRnZXRbXSB7XG4gICAgaWYgKHRoaXMuZGFzaGJvYXJkc1RvSW5jbHVkZS5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLndpZGdldF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBhbGFybVdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICBpZiAodGhpcy5kYXNoYm9hcmRzVG9JbmNsdWRlLmluY2x1ZGVzKERlZmF1bHREYXNoYm9hcmRzLkFMQVJNUykpIHtcbiAgICAgIHJldHVybiBbdGhpcy53aWRnZXRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgc3VtbWFyeVdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICBpZiAodGhpcy5kYXNoYm9hcmRzVG9JbmNsdWRlLmluY2x1ZGVzKERlZmF1bHREYXNoYm9hcmRzLlNVTU1BUlkpKSB7XG4gICAgICByZXR1cm4gW3RoaXMud2lkZ2V0XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIHdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICBpZiAodGhpcy5kYXNoYm9hcmRzVG9JbmNsdWRlLmluY2x1ZGVzKERlZmF1bHREYXNoYm9hcmRzLkRFVEFJTCkpIHtcbiAgICAgIHJldHVybiBbdGhpcy53aWRnZXRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG59XG4iXX0=