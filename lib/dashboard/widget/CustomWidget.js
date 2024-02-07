"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWidget = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
/**
 * A dashboard widget that can be customized using a Lambda.
 */
class CustomWidget extends aws_cloudwatch_1.ConcreteWidget {
    constructor(props) {
        super(props.width || 6, props.height || 6);
        this.props = props;
    }
    toJson() {
        return [
            {
                type: "custom",
                width: this.width,
                height: this.height,
                x: this.x,
                y: this.y,
                properties: {
                    title: this.props.title,
                    endpoint: this.props.handler.functionArn,
                    params: this.props.handlerParams || {},
                    updateOn: {
                        refresh: this.props.updateOnRefresh ?? true,
                        resize: this.props.updateOnResize ?? true,
                        timeRange: this.props.updateOnTimeRangeChange ?? true,
                    },
                },
            },
        ];
    }
}
exports.CustomWidget = CustomWidget;
_a = JSII_RTTI_SYMBOL_1;
CustomWidget[_a] = { fqn: "cdk-monitoring-constructs.CustomWidget", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ3VzdG9tV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQTREO0FBMkQ1RDs7R0FFRztBQUNILE1BQWEsWUFBYSxTQUFRLCtCQUFjO0lBRzlDLFlBQVksS0FBd0I7UUFDbEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPO1lBQ0w7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ1QsVUFBVSxFQUFFO29CQUNWLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7b0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXO29CQUN4QyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksRUFBRTtvQkFDdEMsUUFBUSxFQUFFO3dCQUNSLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsSUFBSSxJQUFJO3dCQUMzQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksSUFBSTt3QkFDekMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLElBQUksSUFBSTtxQkFDdEQ7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztBQTVCSCxvQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25jcmV0ZVdpZGdldCB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuaW1wb3J0IHsgSUZ1bmN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcblxuLyoqXG4gKiBQcm9wZXJ0aWVzIG9mIGEgY3VzdG9tIHdpZGdldC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDdXN0b21XaWRnZXRQcm9wcyB7XG4gIC8qKlxuICAgKiBUaXRsZSBmb3IgdGhlIGdyYXBoXG4gICAqL1xuICByZWFkb25seSB0aXRsZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSB3aWRnZXQsIGluIGEgZ3JpZCBvZiAyNCB1bml0cyB3aWRlXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gNlxuICAgKi9cbiAgcmVhZG9ubHkgd2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgdGhlIHdpZGdldFxuICAgKlxuICAgKiBAZGVmYXVsdCAtIDZcbiAgICovXG4gIHJlYWRvbmx5IGhlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIExhbWJkYSBwcm92aWRpbmcgdGhlIHdpZGdldCBjb250ZW50cy5cbiAgICogVGhlIExhbWJkYSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIEhUTUwgd2l0aCB3aWRnZXQgY29kZS5cbiAgICogVGhlIHNpbXBsZXN0IExhbWJkYSBleGFtcGxlOlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGV4cG9ydHMuaGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCwgY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICogICByZXR1cm4gY2FsbGJhY2sobnVsbCwgXCI8aDE+SGVsbG8hIFRoaXMgaXMgYSBjdXN0b20gd2lkZ2V0LjwvaDE+PHByZT5cIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LCBudWxsLCAyKSArIFwiPC9wcmU+XCIpO1xuICAgKiB9O1xuICAgKiBgYGBcbiAgICovXG4gIHJlYWRvbmx5IGhhbmRsZXI6IElGdW5jdGlvbjtcbiAgLyoqXG4gICAqIEFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBMYW1iZGEuXG4gICAqIFRoZXNlIGFyZ3VtZW50cyB3aWxsIGJlIGF2YWlsYWJsZSBpbiB0aGUgTGFtYmRhIGNvbnRleHQuXG4gICAqL1xuICByZWFkb25seSBoYW5kbGVyUGFyYW1zPzogYW55O1xuICAvKipcbiAgICogV2hldGhlciB0aGUgd2lkZ2V0IHNob3VsZCBiZSB1cGRhdGVkIChieSBjYWxsaW5nIHRoZSBMYW1iZGEgYWdhaW4pIG9uIHJlZnJlc2guXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gdHJ1ZVxuICAgKi9cbiAgcmVhZG9ubHkgdXBkYXRlT25SZWZyZXNoPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHdpZGdldCBzaG91bGQgYmUgdXBkYXRlZCAoYnkgY2FsbGluZyB0aGUgTGFtYmRhIGFnYWluKSBvbiByZXNpemUuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gdHJ1ZVxuICAgKi9cbiAgcmVhZG9ubHkgdXBkYXRlT25SZXNpemU/OiBib29sZWFuO1xuICAvKipcbiAgICogV2hldGhlciB0aGUgd2lkZ2V0IHNob3VsZCBiZSB1cGRhdGVkIChieSBjYWxsaW5nIHRoZSBMYW1iZGEgYWdhaW4pIG9uIHRpbWUgcmFuZ2UgY2hhbmdlLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIHRydWVcbiAgICovXG4gIHJlYWRvbmx5IHVwZGF0ZU9uVGltZVJhbmdlQ2hhbmdlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGRhc2hib2FyZCB3aWRnZXQgdGhhdCBjYW4gYmUgY3VzdG9taXplZCB1c2luZyBhIExhbWJkYS5cbiAqL1xuZXhwb3J0IGNsYXNzIEN1c3RvbVdpZGdldCBleHRlbmRzIENvbmNyZXRlV2lkZ2V0IHtcbiAgcHJpdmF0ZSByZWFkb25seSBwcm9wczogQ3VzdG9tV2lkZ2V0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IEN1c3RvbVdpZGdldFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMud2lkdGggfHwgNiwgcHJvcHMuaGVpZ2h0IHx8IDYpO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgfVxuXG4gIHRvSnNvbigpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJjdXN0b21cIixcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgeTogdGhpcy55LFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICAgICAgZW5kcG9pbnQ6IHRoaXMucHJvcHMuaGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgICAgICBwYXJhbXM6IHRoaXMucHJvcHMuaGFuZGxlclBhcmFtcyB8fCB7fSxcbiAgICAgICAgICB1cGRhdGVPbjoge1xuICAgICAgICAgICAgcmVmcmVzaDogdGhpcy5wcm9wcy51cGRhdGVPblJlZnJlc2ggPz8gdHJ1ZSxcbiAgICAgICAgICAgIHJlc2l6ZTogdGhpcy5wcm9wcy51cGRhdGVPblJlc2l6ZSA/PyB0cnVlLFxuICAgICAgICAgICAgdGltZVJhbmdlOiB0aGlzLnByb3BzLnVwZGF0ZU9uVGltZVJhbmdlQ2hhbmdlID8/IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxufVxuIl19