"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderWidget = exports.HeaderLevel = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const widget_1 = require("../../common/widget");
var HeaderLevel;
(function (HeaderLevel) {
    HeaderLevel[HeaderLevel["LARGE"] = 0] = "LARGE";
    HeaderLevel[HeaderLevel["MEDIUM"] = 1] = "MEDIUM";
    HeaderLevel[HeaderLevel["SMALL"] = 2] = "SMALL";
})(HeaderLevel = exports.HeaderLevel || (exports.HeaderLevel = {}));
class HeaderWidget extends aws_cloudwatch_1.TextWidget {
    constructor(text, level, description, descriptionHeight) {
        super({
            width: widget_1.FullWidth,
            height: HeaderWidget.calculateHeight(description, descriptionHeight),
            markdown: HeaderWidget.toMarkdown(text, level ?? HeaderLevel.LARGE, description),
        });
    }
    static calculateHeight(description, descriptionHeight) {
        let result = 1;
        if (description) {
            result += descriptionHeight ?? 1;
        }
        return result;
    }
    static toMarkdown(text, level, description) {
        const parts = [this.toHeaderMarkdown(text, level)];
        if (description) {
            parts.push(description);
        }
        return parts.join("\n\n");
    }
    static toHeaderMarkdown(text, level) {
        return "#".repeat(level + 1) + " " + text;
    }
}
exports.HeaderWidget = HeaderWidget;
_a = JSII_RTTI_SYMBOL_1;
HeaderWidget[_a] = { fqn: "cdk-monitoring-constructs.HeaderWidget", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSGVhZGVyV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQXdEO0FBRXhELGdEQUFnRDtBQUVoRCxJQUFZLFdBSVg7QUFKRCxXQUFZLFdBQVc7SUFDckIsK0NBQUssQ0FBQTtJQUNMLGlEQUFNLENBQUE7SUFDTiwrQ0FBSyxDQUFBO0FBQ1AsQ0FBQyxFQUpXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBSXRCO0FBRUQsTUFBYSxZQUFhLFNBQVEsMkJBQVU7SUFDMUMsWUFDRSxJQUFZLEVBQ1osS0FBbUIsRUFDbkIsV0FBb0IsRUFDcEIsaUJBQTBCO1FBRTFCLEtBQUssQ0FBQztZQUNKLEtBQUssRUFBRSxrQkFBUztZQUNoQixNQUFNLEVBQUUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUM7WUFDcEUsUUFBUSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQy9CLElBQUksRUFDSixLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFDMUIsV0FBVyxDQUNaO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU0sQ0FBQyxlQUFlLENBQzVCLFdBQW9CLEVBQ3BCLGlCQUEwQjtRQUUxQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLFdBQVcsRUFBRTtZQUNmLE1BQU0sSUFBSSxpQkFBaUIsSUFBSSxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU8sTUFBTSxDQUFDLFVBQVUsQ0FDdkIsSUFBWSxFQUNaLEtBQWtCLEVBQ2xCLFdBQW9CO1FBRXBCLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksV0FBVyxFQUFFO1lBQ2YsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQVksRUFBRSxLQUFrQjtRQUM5RCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDNUMsQ0FBQzs7QUEzQ0gsb0NBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dFdpZGdldCB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuXG5pbXBvcnQgeyBGdWxsV2lkdGggfSBmcm9tIFwiLi4vLi4vY29tbW9uL3dpZGdldFwiO1xuXG5leHBvcnQgZW51bSBIZWFkZXJMZXZlbCB7XG4gIExBUkdFLFxuICBNRURJVU0sXG4gIFNNQUxMLFxufVxuXG5leHBvcnQgY2xhc3MgSGVhZGVyV2lkZ2V0IGV4dGVuZHMgVGV4dFdpZGdldCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBsZXZlbD86IEhlYWRlckxldmVsLFxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uSGVpZ2h0PzogbnVtYmVyXG4gICkge1xuICAgIHN1cGVyKHtcbiAgICAgIHdpZHRoOiBGdWxsV2lkdGgsXG4gICAgICBoZWlnaHQ6IEhlYWRlcldpZGdldC5jYWxjdWxhdGVIZWlnaHQoZGVzY3JpcHRpb24sIGRlc2NyaXB0aW9uSGVpZ2h0KSxcbiAgICAgIG1hcmtkb3duOiBIZWFkZXJXaWRnZXQudG9NYXJrZG93bihcbiAgICAgICAgdGV4dCxcbiAgICAgICAgbGV2ZWwgPz8gSGVhZGVyTGV2ZWwuTEFSR0UsXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICApLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlSGVpZ2h0KFxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uSGVpZ2h0PzogbnVtYmVyXG4gICkge1xuICAgIGxldCByZXN1bHQgPSAxO1xuICAgIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgcmVzdWx0ICs9IGRlc2NyaXB0aW9uSGVpZ2h0ID8/IDE7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB0b01hcmtkb3duKFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBsZXZlbDogSGVhZGVyTGV2ZWwsXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgcGFydHMgPSBbdGhpcy50b0hlYWRlck1hcmtkb3duKHRleHQsIGxldmVsKV07XG4gICAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgICBwYXJ0cy5wdXNoKGRlc2NyaXB0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcXG5cXG5cIik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB0b0hlYWRlck1hcmtkb3duKHRleHQ6IHN0cmluZywgbGV2ZWw6IEhlYWRlckxldmVsKSB7XG4gICAgcmV0dXJuIFwiI1wiLnJlcGVhdChsZXZlbCArIDEpICsgXCIgXCIgKyB0ZXh0O1xuICB9XG59XG4iXX0=