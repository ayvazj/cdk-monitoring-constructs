"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleAxisGraphWidget = exports.SingleAxisGraphWidget = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
/**
 * Line graph widget with one axis only (left).
 * If there is just one metric, it will hide the legend to save space.
 * The purpose of this custom class is to make the properties more strict.
 * It will avoid graphs with undefined axis and dimensions.
 */
class SingleAxisGraphWidget extends aws_cloudwatch_1.GraphWidget {
    constructor(props) {
        super(SingleAxisGraphWidget.transformProps(props));
    }
    static transformProps(props) {
        if (props.leftMetrics.length < 1) {
            throw new Error("No metrics defined. Please define at least one metric.");
        }
        const legendPosition = props.leftMetrics.length === 1 ? aws_cloudwatch_1.LegendPosition.HIDDEN : undefined;
        return {
            title: props.title,
            width: props.width,
            height: props.height,
            left: props.leftMetrics,
            leftYAxis: props.leftAxis,
            leftAnnotations: props.leftAnnotations,
            legendPosition,
        };
    }
}
exports.SingleAxisGraphWidget = SingleAxisGraphWidget;
_a = JSII_RTTI_SYMBOL_1;
SingleAxisGraphWidget[_a] = { fqn: "cdk-monitoring-constructs.SingleAxisGraphWidget", version: "0.0.0" };
/**
 * Line graph widget with both left and right axes.
 * The purpose of this custom class is to make the properties more strict.
 * It will avoid graphs with undefined axes and dimensions.
 */
class DoubleAxisGraphWidget extends aws_cloudwatch_1.GraphWidget {
    constructor(props) {
        super(DoubleAxisGraphWidget.transformProps(props));
    }
    static transformProps(props) {
        if (props.leftMetrics.length < 1) {
            throw new Error("No left metrics defined. Please define at least one metric.");
        }
        if (props.rightMetrics.length < 1) {
            throw new Error("No right metrics defined. Please define at least one metric.");
        }
        return {
            title: props.title,
            width: props.width,
            height: props.height,
            left: props.leftMetrics,
            leftYAxis: props.leftAxis,
            leftAnnotations: props.leftAnnotations,
            right: props.rightMetrics,
            rightYAxis: props.rightAxis,
            rightAnnotations: props.rightAnnotations,
        };
    }
}
exports.DoubleAxisGraphWidget = DoubleAxisGraphWidget;
_b = JSII_RTTI_SYMBOL_1;
DoubleAxisGraphWidget[_b] = { fqn: "cdk-monitoring-constructs.DoubleAxisGraphWidget", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaWN0R3JhcGhXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdHJpY3RHcmFwaFdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQU9vQztBQVdwQzs7Ozs7R0FLRztBQUNILE1BQWEscUJBQXNCLFNBQVEsNEJBQVc7SUFDcEQsWUFBWSxLQUFpQztRQUMzQyxLQUFLLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxjQUFjLENBQzNCLEtBQWlDO1FBRWpDLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUMzRTtRQUVELE1BQU0sY0FBYyxHQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFckUsT0FBTztZQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztZQUNsQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVztZQUN2QixTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDekIsZUFBZSxFQUFFLEtBQUssQ0FBQyxlQUFlO1lBQ3RDLGNBQWM7U0FDZixDQUFDO0lBQ0osQ0FBQzs7QUF4Qkgsc0RBeUJDOzs7QUFjRDs7OztHQUlHO0FBQ0gsTUFBYSxxQkFBc0IsU0FBUSw0QkFBVztJQUNwRCxZQUFZLEtBQWlDO1FBQzNDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU8sTUFBTSxDQUFDLGNBQWMsQ0FDM0IsS0FBaUM7UUFFakMsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FDYiw2REFBNkQsQ0FDOUQsQ0FBQztTQUNIO1FBQ0QsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FDYiw4REFBOEQsQ0FDL0QsQ0FBQztTQUNIO1FBRUQsT0FBTztZQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztZQUNsQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVztZQUN2QixTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDekIsZUFBZSxFQUFFLEtBQUssQ0FBQyxlQUFlO1lBQ3RDLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWTtZQUN6QixVQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDM0IsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtTQUN6QyxDQUFDO0lBQ0osQ0FBQzs7QUE5Qkgsc0RBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR3JhcGhXaWRnZXQsXG4gIEdyYXBoV2lkZ2V0UHJvcHMsXG4gIEhvcml6b250YWxBbm5vdGF0aW9uLFxuICBJTWV0cmljLFxuICBMZWdlbmRQb3NpdGlvbixcbiAgWUF4aXNQcm9wcyxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2luZ2xlQXhpc0dyYXBoV2lkZ2V0UHJvcHMge1xuICByZWFkb25seSB0aXRsZT86IHN0cmluZztcbiAgcmVhZG9ubHkgd2lkdGg6IG51bWJlcjtcbiAgcmVhZG9ubHkgaGVpZ2h0OiBudW1iZXI7XG4gIHJlYWRvbmx5IGxlZnRNZXRyaWNzOiBJTWV0cmljW107XG4gIHJlYWRvbmx5IGxlZnRBeGlzOiBZQXhpc1Byb3BzO1xuICByZWFkb25seSBsZWZ0QW5ub3RhdGlvbnM/OiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xufVxuXG4vKipcbiAqIExpbmUgZ3JhcGggd2lkZ2V0IHdpdGggb25lIGF4aXMgb25seSAobGVmdCkuXG4gKiBJZiB0aGVyZSBpcyBqdXN0IG9uZSBtZXRyaWMsIGl0IHdpbGwgaGlkZSB0aGUgbGVnZW5kIHRvIHNhdmUgc3BhY2UuXG4gKiBUaGUgcHVycG9zZSBvZiB0aGlzIGN1c3RvbSBjbGFzcyBpcyB0byBtYWtlIHRoZSBwcm9wZXJ0aWVzIG1vcmUgc3RyaWN0LlxuICogSXQgd2lsbCBhdm9pZCBncmFwaHMgd2l0aCB1bmRlZmluZWQgYXhpcyBhbmQgZGltZW5zaW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpbmdsZUF4aXNHcmFwaFdpZGdldCBleHRlbmRzIEdyYXBoV2lkZ2V0IHtcbiAgY29uc3RydWN0b3IocHJvcHM6IFNpbmdsZUF4aXNHcmFwaFdpZGdldFByb3BzKSB7XG4gICAgc3VwZXIoU2luZ2xlQXhpc0dyYXBoV2lkZ2V0LnRyYW5zZm9ybVByb3BzKHByb3BzKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB0cmFuc2Zvcm1Qcm9wcyhcbiAgICBwcm9wczogU2luZ2xlQXhpc0dyYXBoV2lkZ2V0UHJvcHNcbiAgKTogR3JhcGhXaWRnZXRQcm9wcyB7XG4gICAgaWYgKHByb3BzLmxlZnRNZXRyaWNzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1ldHJpY3MgZGVmaW5lZC4gUGxlYXNlIGRlZmluZSBhdCBsZWFzdCBvbmUgbWV0cmljLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBsZWdlbmRQb3NpdGlvbiA9XG4gICAgICBwcm9wcy5sZWZ0TWV0cmljcy5sZW5ndGggPT09IDEgPyBMZWdlbmRQb3NpdGlvbi5ISURERU4gOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHByb3BzLnRpdGxlLFxuICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBwcm9wcy5oZWlnaHQsXG4gICAgICBsZWZ0OiBwcm9wcy5sZWZ0TWV0cmljcyxcbiAgICAgIGxlZnRZQXhpczogcHJvcHMubGVmdEF4aXMsXG4gICAgICBsZWZ0QW5ub3RhdGlvbnM6IHByb3BzLmxlZnRBbm5vdGF0aW9ucyxcbiAgICAgIGxlZ2VuZFBvc2l0aW9uLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb3VibGVBeGlzR3JhcGhXaWRnZXRQcm9wcyB7XG4gIHJlYWRvbmx5IHRpdGxlPzogc3RyaW5nO1xuICByZWFkb25seSB3aWR0aDogbnVtYmVyO1xuICByZWFkb25seSBoZWlnaHQ6IG51bWJlcjtcbiAgcmVhZG9ubHkgbGVmdE1ldHJpY3M6IElNZXRyaWNbXTtcbiAgcmVhZG9ubHkgbGVmdEF4aXM6IFlBeGlzUHJvcHM7XG4gIHJlYWRvbmx5IGxlZnRBbm5vdGF0aW9ucz86IEhvcml6b250YWxBbm5vdGF0aW9uW107XG4gIHJlYWRvbmx5IHJpZ2h0TWV0cmljczogSU1ldHJpY1tdO1xuICByZWFkb25seSByaWdodEF4aXM6IFlBeGlzUHJvcHM7XG4gIHJlYWRvbmx5IHJpZ2h0QW5ub3RhdGlvbnM/OiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xufVxuXG4vKipcbiAqIExpbmUgZ3JhcGggd2lkZ2V0IHdpdGggYm90aCBsZWZ0IGFuZCByaWdodCBheGVzLlxuICogVGhlIHB1cnBvc2Ugb2YgdGhpcyBjdXN0b20gY2xhc3MgaXMgdG8gbWFrZSB0aGUgcHJvcGVydGllcyBtb3JlIHN0cmljdC5cbiAqIEl0IHdpbGwgYXZvaWQgZ3JhcGhzIHdpdGggdW5kZWZpbmVkIGF4ZXMgYW5kIGRpbWVuc2lvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEb3VibGVBeGlzR3JhcGhXaWRnZXQgZXh0ZW5kcyBHcmFwaFdpZGdldCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBEb3VibGVBeGlzR3JhcGhXaWRnZXRQcm9wcykge1xuICAgIHN1cGVyKERvdWJsZUF4aXNHcmFwaFdpZGdldC50cmFuc2Zvcm1Qcm9wcyhwcm9wcykpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgdHJhbnNmb3JtUHJvcHMoXG4gICAgcHJvcHM6IERvdWJsZUF4aXNHcmFwaFdpZGdldFByb3BzXG4gICk6IEdyYXBoV2lkZ2V0UHJvcHMge1xuICAgIGlmIChwcm9wcy5sZWZ0TWV0cmljcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiTm8gbGVmdCBtZXRyaWNzIGRlZmluZWQuIFBsZWFzZSBkZWZpbmUgYXQgbGVhc3Qgb25lIG1ldHJpYy5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHByb3BzLnJpZ2h0TWV0cmljcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiTm8gcmlnaHQgbWV0cmljcyBkZWZpbmVkLiBQbGVhc2UgZGVmaW5lIGF0IGxlYXN0IG9uZSBtZXRyaWMuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiBwcm9wcy50aXRsZSxcbiAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcbiAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICAgICAgbGVmdDogcHJvcHMubGVmdE1ldHJpY3MsXG4gICAgICBsZWZ0WUF4aXM6IHByb3BzLmxlZnRBeGlzLFxuICAgICAgbGVmdEFubm90YXRpb25zOiBwcm9wcy5sZWZ0QW5ub3RhdGlvbnMsXG4gICAgICByaWdodDogcHJvcHMucmlnaHRNZXRyaWNzLFxuICAgICAgcmlnaHRZQXhpczogcHJvcHMucmlnaHRBeGlzLFxuICAgICAgcmlnaHRBbm5vdGF0aW9uczogcHJvcHMucmlnaHRBbm5vdGF0aW9ucyxcbiAgICB9O1xuICB9XG59XG4iXX0=