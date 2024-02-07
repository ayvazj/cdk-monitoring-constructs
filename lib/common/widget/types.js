"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphWidget = exports.GraphWidgetType = void 0;
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
var GraphWidgetType;
(function (GraphWidgetType) {
    GraphWidgetType["BAR"] = "Bar";
    GraphWidgetType["LINE"] = "Line";
    GraphWidgetType["PIE"] = "Pie";
    GraphWidgetType["SINGLE_VALUE"] = "SingleValue";
    GraphWidgetType["STACKED_AREA"] = "StackedArea";
})(GraphWidgetType = exports.GraphWidgetType || (exports.GraphWidgetType = {}));
/**
 * Creates a graph widget of the desired type.
 *
 * @param type graph type (e.g. Pie or Bar)
 * @param props graph widget properties
 */
function createGraphWidget(type, props) {
    switch (type) {
        case GraphWidgetType.BAR:
            return new aws_cloudwatch_1.GraphWidget({
                ...props,
                view: aws_cloudwatch_1.GraphWidgetView.BAR,
            });
        case GraphWidgetType.LINE:
            return new aws_cloudwatch_1.GraphWidget(props);
        case GraphWidgetType.PIE:
            return new aws_cloudwatch_1.GraphWidget({
                ...props,
                view: aws_cloudwatch_1.GraphWidgetView.PIE,
            });
        case GraphWidgetType.SINGLE_VALUE:
            return new aws_cloudwatch_1.SingleValueWidget({
                ...props,
                metrics: [...(props.left ?? []), ...(props.right ?? [])],
            });
        case GraphWidgetType.STACKED_AREA:
            return new aws_cloudwatch_1.GraphWidget({
                ...props,
                stacked: true,
            });
        default:
            throw new Error(`Unsupported graph type: ${type}`);
    }
}
exports.createGraphWidget = createGraphWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrREFNb0M7QUFFcEMsSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3pCLDhCQUFXLENBQUE7SUFDWCxnQ0FBYSxDQUFBO0lBQ2IsOEJBQVcsQ0FBQTtJQUNYLCtDQUE0QixDQUFBO0lBQzVCLCtDQUE0QixDQUFBO0FBQzlCLENBQUMsRUFOVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQU0xQjtBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQy9CLElBQXFCLEVBQ3JCLEtBQXVCO0lBRXZCLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxlQUFlLENBQUMsR0FBRztZQUN0QixPQUFPLElBQUksNEJBQVcsQ0FBQztnQkFDckIsR0FBRyxLQUFLO2dCQUNSLElBQUksRUFBRSxnQ0FBZSxDQUFDLEdBQUc7YUFDMUIsQ0FBQyxDQUFDO1FBRUwsS0FBSyxlQUFlLENBQUMsSUFBSTtZQUN2QixPQUFPLElBQUksNEJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxLQUFLLGVBQWUsQ0FBQyxHQUFHO1lBQ3RCLE9BQU8sSUFBSSw0QkFBVyxDQUFDO2dCQUNyQixHQUFHLEtBQUs7Z0JBQ1IsSUFBSSxFQUFFLGdDQUFlLENBQUMsR0FBRzthQUMxQixDQUFDLENBQUM7UUFFTCxLQUFLLGVBQWUsQ0FBQyxZQUFZO1lBQy9CLE9BQU8sSUFBSSxrQ0FBaUIsQ0FBQztnQkFDM0IsR0FBRyxLQUFLO2dCQUNSLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pELENBQUMsQ0FBQztRQUVMLEtBQUssZUFBZSxDQUFDLFlBQVk7WUFDL0IsT0FBTyxJQUFJLDRCQUFXLENBQUM7Z0JBQ3JCLEdBQUcsS0FBSztnQkFDUixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztRQUVMO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN0RDtBQUNILENBQUM7QUFuQ0QsOENBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR3JhcGhXaWRnZXQsXG4gIEdyYXBoV2lkZ2V0UHJvcHMsXG4gIEdyYXBoV2lkZ2V0VmlldyxcbiAgSVdpZGdldCxcbiAgU2luZ2xlVmFsdWVXaWRnZXQsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuXG5leHBvcnQgZW51bSBHcmFwaFdpZGdldFR5cGUge1xuICBCQVIgPSBcIkJhclwiLFxuICBMSU5FID0gXCJMaW5lXCIsXG4gIFBJRSA9IFwiUGllXCIsXG4gIFNJTkdMRV9WQUxVRSA9IFwiU2luZ2xlVmFsdWVcIixcbiAgU1RBQ0tFRF9BUkVBID0gXCJTdGFja2VkQXJlYVwiLFxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBncmFwaCB3aWRnZXQgb2YgdGhlIGRlc2lyZWQgdHlwZS5cbiAqXG4gKiBAcGFyYW0gdHlwZSBncmFwaCB0eXBlIChlLmcuIFBpZSBvciBCYXIpXG4gKiBAcGFyYW0gcHJvcHMgZ3JhcGggd2lkZ2V0IHByb3BlcnRpZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyYXBoV2lkZ2V0KFxuICB0eXBlOiBHcmFwaFdpZGdldFR5cGUsXG4gIHByb3BzOiBHcmFwaFdpZGdldFByb3BzXG4pOiBJV2lkZ2V0IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBHcmFwaFdpZGdldFR5cGUuQkFSOlxuICAgICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICB2aWV3OiBHcmFwaFdpZGdldFZpZXcuQkFSLFxuICAgICAgfSk7XG5cbiAgICBjYXNlIEdyYXBoV2lkZ2V0VHlwZS5MSU5FOlxuICAgICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldChwcm9wcyk7XG5cbiAgICBjYXNlIEdyYXBoV2lkZ2V0VHlwZS5QSUU6XG4gICAgICByZXR1cm4gbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHZpZXc6IEdyYXBoV2lkZ2V0Vmlldy5QSUUsXG4gICAgICB9KTtcblxuICAgIGNhc2UgR3JhcGhXaWRnZXRUeXBlLlNJTkdMRV9WQUxVRTpcbiAgICAgIHJldHVybiBuZXcgU2luZ2xlVmFsdWVXaWRnZXQoe1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgbWV0cmljczogWy4uLihwcm9wcy5sZWZ0ID8/IFtdKSwgLi4uKHByb3BzLnJpZ2h0ID8/IFtdKV0sXG4gICAgICB9KTtcblxuICAgIGNhc2UgR3JhcGhXaWRnZXRUeXBlLlNUQUNLRURfQVJFQTpcbiAgICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgc3RhY2tlZDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZ3JhcGggdHlwZTogJHt0eXBlfWApO1xuICB9XG59XG4iXX0=