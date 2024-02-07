"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardWithBitmapCopy = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const BitmapDashboard_1 = require("./BitmapDashboard");
/**
 * Composite dashboard which keeps a normal dashboard with its bitmap copy.
 * The bitmap copy name will be derived from the primary dashboard name, if specified.
 */
class DashboardWithBitmapCopy extends aws_cloudwatch_1.Dashboard {
    constructor(scope, id, props) {
        super(scope, id, props);
        let dashboardName = props.dashboardName;
        if (dashboardName !== undefined) {
            dashboardName = "Bitmap-" + dashboardName;
        }
        this.bitmapCopy = new BitmapDashboard_1.BitmapDashboard(this, "BitmapCopy", {
            ...props,
            dashboardName,
        });
    }
    addWidgets(...widgets) {
        super.addWidgets(...widgets);
        this.bitmapCopy.addWidgets(...widgets);
    }
}
exports.DashboardWithBitmapCopy = DashboardWithBitmapCopy;
_a = JSII_RTTI_SYMBOL_1;
DashboardWithBitmapCopy[_a] = { fqn: "cdk-monitoring-constructs.DashboardWithBitmapCopy", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFzaGJvYXJkV2l0aEJpdG1hcENvcHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEYXNoYm9hcmRXaXRoQml0bWFwQ29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFnRjtBQUdoRix1REFBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsTUFBYSx1QkFBd0IsU0FBUSwwQkFBUztJQUdwRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXFCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQy9CLGFBQWEsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUN4RCxHQUFHLEtBQUs7WUFDUixhQUFhO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFHLE9BQWtCO1FBQzlCLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O0FBbEJILDBEQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhc2hib2FyZCwgRGFzaGJvYXJkUHJvcHMsIElXaWRnZXQgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbmltcG9ydCB7IEJpdG1hcERhc2hib2FyZCB9IGZyb20gXCIuL0JpdG1hcERhc2hib2FyZFwiO1xuXG4vKipcbiAqIENvbXBvc2l0ZSBkYXNoYm9hcmQgd2hpY2gga2VlcHMgYSBub3JtYWwgZGFzaGJvYXJkIHdpdGggaXRzIGJpdG1hcCBjb3B5LlxuICogVGhlIGJpdG1hcCBjb3B5IG5hbWUgd2lsbCBiZSBkZXJpdmVkIGZyb20gdGhlIHByaW1hcnkgZGFzaGJvYXJkIG5hbWUsIGlmIHNwZWNpZmllZC5cbiAqL1xuZXhwb3J0IGNsYXNzIERhc2hib2FyZFdpdGhCaXRtYXBDb3B5IGV4dGVuZHMgRGFzaGJvYXJkIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGJpdG1hcENvcHk6IEJpdG1hcERhc2hib2FyZDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRGFzaGJvYXJkUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcbiAgICBsZXQgZGFzaGJvYXJkTmFtZSA9IHByb3BzLmRhc2hib2FyZE5hbWU7XG4gICAgaWYgKGRhc2hib2FyZE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGFzaGJvYXJkTmFtZSA9IFwiQml0bWFwLVwiICsgZGFzaGJvYXJkTmFtZTtcbiAgICB9XG4gICAgdGhpcy5iaXRtYXBDb3B5ID0gbmV3IEJpdG1hcERhc2hib2FyZCh0aGlzLCBcIkJpdG1hcENvcHlcIiwge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBkYXNoYm9hcmROYW1lLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkV2lkZ2V0cyguLi53aWRnZXRzOiBJV2lkZ2V0W10pOiB2b2lkIHtcbiAgICBzdXBlci5hZGRXaWRnZXRzKC4uLndpZGdldHMpO1xuICAgIHRoaXMuYml0bWFwQ29weS5hZGRXaWRnZXRzKC4uLndpZGdldHMpO1xuICB9XG59XG4iXX0=