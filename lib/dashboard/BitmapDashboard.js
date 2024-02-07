"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitmapDashboard = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const widget_1 = require("./widget");
/**
 * Specific subtype of dashboard that renders supported widgets as bitmaps, while preserving the overall layout.
 */
class BitmapDashboard extends aws_cloudwatch_1.Dashboard {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.bitmapRenderingSupport = new widget_1.BitmapWidgetRenderingSupport(this, "BitmapRenderingSupport");
    }
    addWidgets(...widgets) {
        super.addWidgets(...this.asBitmaps(...widgets));
    }
    asBitmap(widget) {
        if (widget instanceof aws_cloudwatch_1.GraphWidget) {
            return this.bitmapRenderingSupport.asBitmap(widget);
        }
        else if (widget instanceof aws_cloudwatch_1.Row) {
            // needs this to access private property
            const rowWidgets = widget.widgets;
            const rowWidgetsTyped = rowWidgets;
            return new aws_cloudwatch_1.Row(...this.asBitmaps(...rowWidgetsTyped));
        }
        else if (widget instanceof aws_cloudwatch_1.Column) {
            // needs this to access private property
            const colWidgets = widget.widgets;
            const colWidgetsTyped = colWidgets;
            return new aws_cloudwatch_1.Column(...this.asBitmaps(...colWidgetsTyped));
        }
        else {
            return widget;
        }
    }
    asBitmaps(...widgets) {
        return widgets.map((widget) => this.asBitmap(widget));
    }
}
exports.BitmapDashboard = BitmapDashboard;
_a = JSII_RTTI_SYMBOL_1;
BitmapDashboard[_a] = { fqn: "cdk-monitoring-constructs.BitmapDashboard", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0bWFwRGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQml0bWFwRGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBT29DO0FBR3BDLHFDQUF3RDtBQUV4RDs7R0FFRztBQUNILE1BQWEsZUFBZ0IsU0FBUSwwQkFBUztJQUc1QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXFCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLHFDQUE0QixDQUM1RCxJQUFJLEVBQ0osd0JBQXdCLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVSxDQUFDLEdBQUcsT0FBa0I7UUFDOUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFUyxRQUFRLENBQUMsTUFBZTtRQUNoQyxJQUFJLE1BQU0sWUFBWSw0QkFBVyxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQUksTUFBTSxZQUFZLG9CQUFHLEVBQUU7WUFDaEMsd0NBQXdDO1lBQ3hDLE1BQU0sVUFBVSxHQUFJLE1BQWMsQ0FBQyxPQUFPLENBQUM7WUFDM0MsTUFBTSxlQUFlLEdBQUcsVUFBdUIsQ0FBQztZQUNoRCxPQUFPLElBQUksb0JBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU0sSUFBSSxNQUFNLFlBQVksdUJBQU0sRUFBRTtZQUNuQyx3Q0FBd0M7WUFDeEMsTUFBTSxVQUFVLEdBQUksTUFBYyxDQUFDLE9BQU8sQ0FBQztZQUMzQyxNQUFNLGVBQWUsR0FBRyxVQUF1QixDQUFDO1lBQ2hELE9BQU8sSUFBSSx1QkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7YUFBTTtZQUNMLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRVMsU0FBUyxDQUFDLEdBQUcsT0FBa0I7UUFDdkMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7QUFuQ0gsMENBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBEYXNoYm9hcmQsXG4gIERhc2hib2FyZFByb3BzLFxuICBHcmFwaFdpZGdldCxcbiAgSVdpZGdldCxcbiAgUm93LFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbmltcG9ydCB7IEJpdG1hcFdpZGdldFJlbmRlcmluZ1N1cHBvcnQgfSBmcm9tIFwiLi93aWRnZXRcIjtcblxuLyoqXG4gKiBTcGVjaWZpYyBzdWJ0eXBlIG9mIGRhc2hib2FyZCB0aGF0IHJlbmRlcnMgc3VwcG9ydGVkIHdpZGdldHMgYXMgYml0bWFwcywgd2hpbGUgcHJlc2VydmluZyB0aGUgb3ZlcmFsbCBsYXlvdXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBCaXRtYXBEYXNoYm9hcmQgZXh0ZW5kcyBEYXNoYm9hcmQge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYml0bWFwUmVuZGVyaW5nU3VwcG9ydDogQml0bWFwV2lkZ2V0UmVuZGVyaW5nU3VwcG9ydDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRGFzaGJvYXJkUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcbiAgICB0aGlzLmJpdG1hcFJlbmRlcmluZ1N1cHBvcnQgPSBuZXcgQml0bWFwV2lkZ2V0UmVuZGVyaW5nU3VwcG9ydChcbiAgICAgIHRoaXMsXG4gICAgICBcIkJpdG1hcFJlbmRlcmluZ1N1cHBvcnRcIlxuICAgICk7XG4gIH1cblxuICBhZGRXaWRnZXRzKC4uLndpZGdldHM6IElXaWRnZXRbXSkge1xuICAgIHN1cGVyLmFkZFdpZGdldHMoLi4udGhpcy5hc0JpdG1hcHMoLi4ud2lkZ2V0cykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzQml0bWFwKHdpZGdldDogSVdpZGdldCk6IElXaWRnZXQge1xuICAgIGlmICh3aWRnZXQgaW5zdGFuY2VvZiBHcmFwaFdpZGdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuYml0bWFwUmVuZGVyaW5nU3VwcG9ydC5hc0JpdG1hcCh3aWRnZXQpO1xuICAgIH0gZWxzZSBpZiAod2lkZ2V0IGluc3RhbmNlb2YgUm93KSB7XG4gICAgICAvLyBuZWVkcyB0aGlzIHRvIGFjY2VzcyBwcml2YXRlIHByb3BlcnR5XG4gICAgICBjb25zdCByb3dXaWRnZXRzID0gKHdpZGdldCBhcyBhbnkpLndpZGdldHM7XG4gICAgICBjb25zdCByb3dXaWRnZXRzVHlwZWQgPSByb3dXaWRnZXRzIGFzIElXaWRnZXRbXTtcbiAgICAgIHJldHVybiBuZXcgUm93KC4uLnRoaXMuYXNCaXRtYXBzKC4uLnJvd1dpZGdldHNUeXBlZCkpO1xuICAgIH0gZWxzZSBpZiAod2lkZ2V0IGluc3RhbmNlb2YgQ29sdW1uKSB7XG4gICAgICAvLyBuZWVkcyB0aGlzIHRvIGFjY2VzcyBwcml2YXRlIHByb3BlcnR5XG4gICAgICBjb25zdCBjb2xXaWRnZXRzID0gKHdpZGdldCBhcyBhbnkpLndpZGdldHM7XG4gICAgICBjb25zdCBjb2xXaWRnZXRzVHlwZWQgPSBjb2xXaWRnZXRzIGFzIElXaWRnZXRbXTtcbiAgICAgIHJldHVybiBuZXcgQ29sdW1uKC4uLnRoaXMuYXNCaXRtYXBzKC4uLmNvbFdpZGdldHNUeXBlZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhc0JpdG1hcHMoLi4ud2lkZ2V0czogSVdpZGdldFtdKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gd2lkZ2V0cy5tYXAoKHdpZGdldCkgPT4gdGhpcy5hc0JpdG1hcCh3aWRnZXQpKTtcbiAgfVxufVxuIl19