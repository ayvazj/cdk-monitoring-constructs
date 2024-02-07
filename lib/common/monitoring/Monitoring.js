"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const dashboard_1 = require("../../dashboard");
/**
 * An independent unit of monitoring. This is the base for all monitoring classes with alarm support.
 */
class Monitoring {
    constructor(scope, props) {
        this.scope = scope;
        this.alarms = [];
        this.localAlarmNamePrefixOverride = props?.localAlarmNamePrefixOverride;
    }
    /**
     * Creates a new widget factory.
     */
    createWidgetFactory() {
        return this.scope.createWidgetFactory();
    }
    /**
     * Creates a new metric factory.
     */
    createMetricFactory() {
        return this.scope.createMetricFactory();
    }
    /**
     * Creates a new alarm factory.
     * Alarms created will be named with the given prefix, unless a local name override is present.
     * @param alarmNamePrefix alarm name prefix
     */
    createAlarmFactory(alarmNamePrefix) {
        return this.scope.createAlarmFactory(this.localAlarmNamePrefixOverride ?? alarmNamePrefix);
    }
    /**
     * Adds an alarm.
     * @param alarm alarm to add
     */
    addAlarm(alarm) {
        this.alarms.push(alarm);
    }
    /**
     * Returns all the alarms created.
     */
    createdAlarms() {
        return this.alarms;
    }
    /**
     * Returns widgets for all alarms. These can go to runbook or to service dashboard.
     */
    alarmWidgets() {
        return this.createdAlarms().map((alarm) => this.createWidgetFactory().createAlarmDetailWidget(alarm));
    }
    /**
     * Returns widgets to be placed on the summary dashboard.
     *
     * @default - no widgets.
     */
    summaryWidgets() {
        return [];
    }
    widgetsForDashboard(name) {
        switch (name) {
            case dashboard_1.DefaultDashboards.SUMMARY:
                return this.summaryWidgets();
            case dashboard_1.DefaultDashboards.DETAIL:
                return this.widgets();
            case dashboard_1.DefaultDashboards.ALARMS:
                return this.alarmWidgets();
            default:
                return [];
        }
    }
}
exports.Monitoring = Monitoring;
_a = JSII_RTTI_SYMBOL_1;
Monitoring[_a] = { fqn: "cdk-monitoring-constructs.Monitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uaXRvcmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1vbml0b3JpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSwrQ0FNeUI7QUFvQnpCOztHQUVHO0FBQ0gsTUFBc0IsVUFBVTtJQU85QixZQUFzQixLQUFzQixFQUFFLEtBQTJCO1FBQ3ZFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxLQUFLLEVBQUUsNEJBQTRCLENBQUM7SUFDMUUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtCQUFrQixDQUFDLGVBQXVCO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FDbEMsSUFBSSxDQUFDLDRCQUE0QixJQUFJLGVBQWUsQ0FDckQsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsS0FBMEI7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDeEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQzFELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWM7UUFDWixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFPRCxtQkFBbUIsQ0FBQyxJQUFZO1FBQzlCLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyw2QkFBaUIsQ0FBQyxPQUFPO2dCQUM1QixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMvQixLQUFLLDZCQUFpQixDQUFDLE1BQU07Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLEtBQUssNkJBQWlCLENBQUMsTUFBTTtnQkFDM0IsT0FBTyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDN0I7Z0JBQ0UsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7O0FBdkZILGdDQXdGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHsgTW9uaXRvcmluZ1Njb3BlIH0gZnJvbSBcIi4vTW9uaXRvcmluZ1Njb3BlXCI7XG5pbXBvcnQge1xuICBEZWZhdWx0RGFzaGJvYXJkcyxcbiAgSURhc2hib2FyZFNlZ21lbnQsXG4gIElEeW5hbWljRGFzaGJvYXJkU2VnbWVudCxcbiAgTW9uaXRvcmluZ0Rhc2hib2FyZHNPdmVycmlkZVByb3BzLFxuICBVc2VyUHJvdmlkZWROYW1lcyxcbn0gZnJvbSBcIi4uLy4uL2Rhc2hib2FyZFwiO1xuaW1wb3J0IHsgQWxhcm1XaXRoQW5ub3RhdGlvbiB9IGZyb20gXCIuLi9hbGFybVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBbGFybUNvbnN1bWVyIHtcbiAgY29uc3VtZShhbGFybXM6IEFsYXJtV2l0aEFubm90YXRpb25bXSk6IHZvaWQ7XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgcHJvcGVydGllcyBwYXNzZWQgdG8gZWFjaCBtb25pdG9yaW5nIGNvbnN0cnVjdC5cbiAqIEl0IGNvbnRhaW5zIChtb3N0bHkgb3B0aW9uYWwpIHByb3BlcnRpZXMgdG8gc3BlY2lmeSBuYW1pbmcsIHBsYWNlbWVudCwgYW5kIHNvIG9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VNb25pdG9yaW5nUHJvcHNcbiAgZXh0ZW5kcyBVc2VyUHJvdmlkZWROYW1lcyxcbiAgICBNb25pdG9yaW5nRGFzaGJvYXJkc092ZXJyaWRlUHJvcHMge1xuICAvKipcbiAgICogQ2FsbHMgcHJvdmlkZWQgZnVuY3Rpb24gdG8gcHJvY2VzcyBhbGwgYWxhcm1zIGNyZWF0ZWQuXG4gICAqL1xuICByZWFkb25seSB1c2VDcmVhdGVkQWxhcm1zPzogSUFsYXJtQ29uc3VtZXI7XG59XG5cbi8qKlxuICogQW4gaW5kZXBlbmRlbnQgdW5pdCBvZiBtb25pdG9yaW5nLiBUaGlzIGlzIHRoZSBiYXNlIGZvciBhbGwgbW9uaXRvcmluZyBjbGFzc2VzIHdpdGggYWxhcm0gc3VwcG9ydC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vbml0b3JpbmdcbiAgaW1wbGVtZW50cyBJRGFzaGJvYXJkU2VnbWVudCwgSUR5bmFtaWNEYXNoYm9hcmRTZWdtZW50XG57XG4gIHByb3RlY3RlZCByZWFkb25seSBzY29wZTogTW9uaXRvcmluZ1Njb3BlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYWxhcm1zOiBBbGFybVdpdGhBbm5vdGF0aW9uW107XG4gIHByb3RlY3RlZCByZWFkb25seSBsb2NhbEFsYXJtTmFtZVByZWZpeE92ZXJyaWRlPzogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihzY29wZTogTW9uaXRvcmluZ1Njb3BlLCBwcm9wcz86IEJhc2VNb25pdG9yaW5nUHJvcHMpIHtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgdGhpcy5hbGFybXMgPSBbXTtcbiAgICB0aGlzLmxvY2FsQWxhcm1OYW1lUHJlZml4T3ZlcnJpZGUgPSBwcm9wcz8ubG9jYWxBbGFybU5hbWVQcmVmaXhPdmVycmlkZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHdpZGdldCBmYWN0b3J5LlxuICAgKi9cbiAgY3JlYXRlV2lkZ2V0RmFjdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29wZS5jcmVhdGVXaWRnZXRGYWN0b3J5KCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBtZXRyaWMgZmFjdG9yeS5cbiAgICovXG4gIGNyZWF0ZU1ldHJpY0ZhY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NvcGUuY3JlYXRlTWV0cmljRmFjdG9yeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYWxhcm0gZmFjdG9yeS5cbiAgICogQWxhcm1zIGNyZWF0ZWQgd2lsbCBiZSBuYW1lZCB3aXRoIHRoZSBnaXZlbiBwcmVmaXgsIHVubGVzcyBhIGxvY2FsIG5hbWUgb3ZlcnJpZGUgaXMgcHJlc2VudC5cbiAgICogQHBhcmFtIGFsYXJtTmFtZVByZWZpeCBhbGFybSBuYW1lIHByZWZpeFxuICAgKi9cbiAgY3JlYXRlQWxhcm1GYWN0b3J5KGFsYXJtTmFtZVByZWZpeDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NvcGUuY3JlYXRlQWxhcm1GYWN0b3J5KFxuICAgICAgdGhpcy5sb2NhbEFsYXJtTmFtZVByZWZpeE92ZXJyaWRlID8/IGFsYXJtTmFtZVByZWZpeFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBhbGFybS5cbiAgICogQHBhcmFtIGFsYXJtIGFsYXJtIHRvIGFkZFxuICAgKi9cbiAgYWRkQWxhcm0oYWxhcm06IEFsYXJtV2l0aEFubm90YXRpb24pIHtcbiAgICB0aGlzLmFsYXJtcy5wdXNoKGFsYXJtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgYWxhcm1zIGNyZWF0ZWQuXG4gICAqL1xuICBjcmVhdGVkQWxhcm1zKCkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdpZGdldHMgZm9yIGFsbCBhbGFybXMuIFRoZXNlIGNhbiBnbyB0byBydW5ib29rIG9yIHRvIHNlcnZpY2UgZGFzaGJvYXJkLlxuICAgKi9cbiAgYWxhcm1XaWRnZXRzKCk6IElXaWRnZXRbXSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlZEFsYXJtcygpLm1hcCgoYWxhcm0pID0+XG4gICAgICB0aGlzLmNyZWF0ZVdpZGdldEZhY3RvcnkoKS5jcmVhdGVBbGFybURldGFpbFdpZGdldChhbGFybSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2lkZ2V0cyB0byBiZSBwbGFjZWQgb24gdGhlIHN1bW1hcnkgZGFzaGJvYXJkLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIG5vIHdpZGdldHMuXG4gICAqL1xuICBzdW1tYXJ5V2lkZ2V0cygpOiBJV2lkZ2V0W10ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdpZGdldHMgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYWluIGRhc2hib2FyZC5cbiAgICovXG4gIGFic3RyYWN0IHdpZGdldHMoKTogSVdpZGdldFtdO1xuXG4gIHdpZGdldHNGb3JEYXNoYm9hcmQobmFtZTogc3RyaW5nKTogSVdpZGdldFtdIHtcbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgRGVmYXVsdERhc2hib2FyZHMuU1VNTUFSWTpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VtbWFyeVdpZGdldHMoKTtcbiAgICAgIGNhc2UgRGVmYXVsdERhc2hib2FyZHMuREVUQUlMOlxuICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRzKCk7XG4gICAgICBjYXNlIERlZmF1bHREYXNoYm9hcmRzLkFMQVJNUzpcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxhcm1XaWRnZXRzKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG59XG4iXX0=