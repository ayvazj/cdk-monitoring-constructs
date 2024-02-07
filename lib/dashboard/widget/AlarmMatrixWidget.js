"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmMatrixWidget = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const widget_1 = require("../../common/widget");
const AlarmsPerRow = 6;
const MinHeight = 2;
const MaxHeight = 8;
/**
 * Wrapper of Alarm Status Widget which auto-calcultes height based on the number of alarms.
 * Always takes the maximum width.
 */
class AlarmMatrixWidget extends aws_cloudwatch_1.AlarmStatusWidget {
    constructor(props) {
        super({
            alarms: props.alarms,
            title: props.title,
            width: widget_1.FullWidth,
            height: props.height ??
                AlarmMatrixWidget.getRecommendedHeight(props.alarms.length),
        });
    }
    static getRecommendedHeight(numAlarms) {
        const rows = Math.ceil(numAlarms / AlarmsPerRow);
        if (rows < MinHeight) {
            return MinHeight;
        }
        if (rows > MaxHeight) {
            return MaxHeight;
        }
        return rows;
    }
}
exports.AlarmMatrixWidget = AlarmMatrixWidget;
_a = JSII_RTTI_SYMBOL_1;
AlarmMatrixWidget[_a] = { fqn: "cdk-monitoring-constructs.AlarmMatrixWidget", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxhcm1NYXRyaXhXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBbGFybU1hdHJpeFdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUF1RTtBQUV2RSxnREFBZ0Q7QUFFaEQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNwQixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFtQnBCOzs7R0FHRztBQUNILE1BQWEsaUJBQWtCLFNBQVEsa0NBQWlCO0lBQ3RELFlBQVksS0FBNkI7UUFDdkMsS0FBSyxDQUFDO1lBQ0osTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztZQUNsQixLQUFLLEVBQUUsa0JBQVM7WUFDaEIsTUFBTSxFQUNKLEtBQUssQ0FBQyxNQUFNO2dCQUNaLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQzlELENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMsb0JBQW9CLENBQUMsU0FBaUI7UUFDbkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLEdBQUcsU0FBUyxFQUFFO1lBQ3BCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxJQUFJLEdBQUcsU0FBUyxFQUFFO1lBQ3BCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztBQXJCSCw4Q0FzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbGFybVN0YXR1c1dpZGdldCwgSUFsYXJtIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IEZ1bGxXaWR0aCB9IGZyb20gXCIuLi8uLi9jb21tb24vd2lkZ2V0XCI7XG5cbmNvbnN0IEFsYXJtc1BlclJvdyA9IDY7XG5jb25zdCBNaW5IZWlnaHQgPSAyO1xuY29uc3QgTWF4SGVpZ2h0ID0gODtcblxuZXhwb3J0IGludGVyZmFjZSBBbGFybU1hdHJpeFdpZGdldFByb3BzIHtcbiAgLyoqXG4gICAqIHdpZGdldCB0aXRsZVxuICAgKiBAZGVmYXVsdCAtIG5vIHRpdGxlXG4gICAqL1xuICByZWFkb25seSB0aXRsZT86IHN0cmluZztcbiAgLyoqXG4gICAqIGRlc2lyZWQgaGVpZ2h0XG4gICAqIEBkZWZhdWx0IC0gYXV0byBjYWxjdWxhdGVkIGJhc2VkIG9uIGFsYXJtIG51bWJlciAoMyB0byA4KVxuICAgKi9cbiAgcmVhZG9ubHkgaGVpZ2h0PzogbnVtYmVyO1xuICAvKipcbiAgICogbGlzdCBvZiBhbGFybXMgdG8gc2hvd1xuICAgKi9cbiAgcmVhZG9ubHkgYWxhcm1zOiBJQWxhcm1bXTtcbn1cblxuLyoqXG4gKiBXcmFwcGVyIG9mIEFsYXJtIFN0YXR1cyBXaWRnZXQgd2hpY2ggYXV0by1jYWxjdWx0ZXMgaGVpZ2h0IGJhc2VkIG9uIHRoZSBudW1iZXIgb2YgYWxhcm1zLlxuICogQWx3YXlzIHRha2VzIHRoZSBtYXhpbXVtIHdpZHRoLlxuICovXG5leHBvcnQgY2xhc3MgQWxhcm1NYXRyaXhXaWRnZXQgZXh0ZW5kcyBBbGFybVN0YXR1c1dpZGdldCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBBbGFybU1hdHJpeFdpZGdldFByb3BzKSB7XG4gICAgc3VwZXIoe1xuICAgICAgYWxhcm1zOiBwcm9wcy5hbGFybXMsXG4gICAgICB0aXRsZTogcHJvcHMudGl0bGUsXG4gICAgICB3aWR0aDogRnVsbFdpZHRoLFxuICAgICAgaGVpZ2h0OlxuICAgICAgICBwcm9wcy5oZWlnaHQgPz9cbiAgICAgICAgQWxhcm1NYXRyaXhXaWRnZXQuZ2V0UmVjb21tZW5kZWRIZWlnaHQocHJvcHMuYWxhcm1zLmxlbmd0aCksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRSZWNvbW1lbmRlZEhlaWdodChudW1BbGFybXM6IG51bWJlcikge1xuICAgIGNvbnN0IHJvd3MgPSBNYXRoLmNlaWwobnVtQWxhcm1zIC8gQWxhcm1zUGVyUm93KTtcbiAgICBpZiAocm93cyA8IE1pbkhlaWdodCkge1xuICAgICAgcmV0dXJuIE1pbkhlaWdodDtcbiAgICB9XG4gICAgaWYgKHJvd3MgPiBNYXhIZWlnaHQpIHtcbiAgICAgIHJldHVybiBNYXhIZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiByb3dzO1xuICB9XG59XG4iXX0=