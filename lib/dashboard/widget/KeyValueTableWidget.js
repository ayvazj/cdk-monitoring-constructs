"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyValueTableWidget = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const widget_1 = require("../../common/widget");
class KeyValueTableWidget extends aws_cloudwatch_1.TextWidget {
    constructor(data) {
        super({
            width: widget_1.FullWidth,
            height: 3,
            markdown: KeyValueTableWidget.toMarkdown(data),
        });
    }
    static toMarkdown(data) {
        let headerRow = "";
        let subHeaderRow = "";
        let valueRow = "";
        data.forEach(([key, value]) => {
            headerRow += "| " + key;
            subHeaderRow += "|---";
            valueRow += "| " + value;
        });
        return `${headerRow}\n${subHeaderRow}\n${valueRow}`;
    }
}
exports.KeyValueTableWidget = KeyValueTableWidget;
_a = JSII_RTTI_SYMBOL_1;
KeyValueTableWidget[_a] = { fqn: "cdk-monitoring-constructs.KeyValueTableWidget", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVUYWJsZVdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIktleVZhbHVlVGFibGVXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrREFBd0Q7QUFFeEQsZ0RBQWdEO0FBRWhELE1BQWEsbUJBQW9CLFNBQVEsMkJBQVU7SUFDakQsWUFBWSxJQUF3QjtRQUNsQyxLQUFLLENBQUM7WUFDSixLQUFLLEVBQUUsa0JBQVM7WUFDaEIsTUFBTSxFQUFFLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztTQUMvQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUF3QjtRQUNoRCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUM1QixTQUFTLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUN4QixZQUFZLElBQUksTUFBTSxDQUFDO1lBQ3ZCLFFBQVEsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLFNBQVMsS0FBSyxZQUFZLEtBQUssUUFBUSxFQUFFLENBQUM7SUFDdEQsQ0FBQzs7QUFyQkgsa0RBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dFdpZGdldCB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuXG5pbXBvcnQgeyBGdWxsV2lkdGggfSBmcm9tIFwiLi4vLi4vY29tbW9uL3dpZGdldFwiO1xuXG5leHBvcnQgY2xhc3MgS2V5VmFsdWVUYWJsZVdpZGdldCBleHRlbmRzIFRleHRXaWRnZXQge1xuICBjb25zdHJ1Y3RvcihkYXRhOiBbc3RyaW5nLCBzdHJpbmddW10pIHtcbiAgICBzdXBlcih7XG4gICAgICB3aWR0aDogRnVsbFdpZHRoLFxuICAgICAgaGVpZ2h0OiAzLFxuICAgICAgbWFya2Rvd246IEtleVZhbHVlVGFibGVXaWRnZXQudG9NYXJrZG93bihkYXRhKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHRvTWFya2Rvd24oZGF0YTogW3N0cmluZywgc3RyaW5nXVtdKSB7XG4gICAgbGV0IGhlYWRlclJvdyA9IFwiXCI7XG4gICAgbGV0IHN1YkhlYWRlclJvdyA9IFwiXCI7XG4gICAgbGV0IHZhbHVlUm93ID0gXCJcIjtcblxuICAgIGRhdGEuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBoZWFkZXJSb3cgKz0gXCJ8IFwiICsga2V5O1xuICAgICAgc3ViSGVhZGVyUm93ICs9IFwifC0tLVwiO1xuICAgICAgdmFsdWVSb3cgKz0gXCJ8IFwiICsgdmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYCR7aGVhZGVyUm93fVxcbiR7c3ViSGVhZGVyUm93fVxcbiR7dmFsdWVSb3d9YDtcbiAgfVxufVxuIl19