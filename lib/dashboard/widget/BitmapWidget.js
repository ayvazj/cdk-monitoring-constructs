"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitmapWidgetRenderingSupport = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const path = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_logs_1 = require("aws-cdk-lib/aws-logs");
const constructs_1 = require("constructs");
const CustomWidget_1 = require("./CustomWidget");
/**
 * Support for rendering bitmap widgets on the server side.
 * It is a custom widget lambda with some additional roles and helper methods.
 */
class BitmapWidgetRenderingSupport extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        this.handler = new aws_lambda_1.Function(this, "Lambda", {
            code: aws_lambda_1.Code.fromAsset(path.join(__dirname, "..", "..", "..", "assets", "BitmapWidgetRenderingSupport")),
            description: "Custom Widget Render for Bitmap Widgets (cdk-monitoring-constructs)",
            handler: "index.handler",
            memorySize: 128,
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
            timeout: aws_cdk_lib_1.Duration.seconds(60),
            logRetention: aws_logs_1.RetentionDays.ONE_DAY,
        });
        this.handler.addToRolePolicy(new aws_iam_1.PolicyStatement({
            actions: ["cloudwatch:GetMetricWidgetImage"],
            effect: aws_iam_1.Effect.ALLOW,
            resources: ["*"],
        }));
        aws_cdk_lib_1.Tags.of(this.handler).add("cw-custom-widget", "describe:readOnly");
    }
    asBitmap(widget) {
        const props = this.getWidgetProperties(widget);
        // remove the title from the graph and remember it
        const { title, ...graph } = props;
        return new CustomWidget_1.CustomWidget({
            // move the original title here
            title,
            width: widget.width,
            height: widget.height,
            // empty the inner title since we already have it on the whole widget
            handlerParams: { graph: { ...graph, title: " " } },
            handler: this.handler,
            updateOnRefresh: true,
            updateOnResize: true,
            updateOnTimeRangeChange: true,
        });
    }
    getWidgetProperties(widget) {
        const graphs = widget.toJson();
        if (graphs.length != 1) {
            throw new Error("Number of objects in the widget definition must be exactly one.");
        }
        const graph = graphs[0];
        if (!graph.properties) {
            throw new Error("No graph properties: " + graph);
        }
        return graph.properties;
    }
}
exports.BitmapWidgetRenderingSupport = BitmapWidgetRenderingSupport;
_a = JSII_RTTI_SYMBOL_1;
BitmapWidgetRenderingSupport[_a] = { fqn: "cdk-monitoring-constructs.BitmapWidgetRenderingSupport", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0bWFwV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQml0bWFwV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTZCO0FBRTdCLDZDQUE2QztBQUU3QyxpREFBOEQ7QUFDOUQsdURBQTRFO0FBQzVFLG1EQUFxRDtBQUNyRCwyQ0FBdUM7QUFFdkMsaURBQThDO0FBRTlDOzs7R0FHRztBQUNILE1BQWEsNEJBQTZCLFNBQVEsc0JBQVM7SUFHekQsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQzFDLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FDbEIsSUFBSSxDQUFDLElBQUksQ0FDUCxTQUFTLEVBQ1QsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osUUFBUSxFQUNSLDhCQUE4QixDQUMvQixDQUNGO1lBQ0QsV0FBVyxFQUNULHFFQUFxRTtZQUN2RSxPQUFPLEVBQUUsZUFBZTtZQUN4QixVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLHNCQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUM3QixZQUFZLEVBQUUsd0JBQWEsQ0FBQyxPQUFPO1NBQ3BDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUMxQixJQUFJLHlCQUFlLENBQUM7WUFDbEIsT0FBTyxFQUFFLENBQUMsaUNBQWlDLENBQUM7WUFDNUMsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztZQUNwQixTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDakIsQ0FBQyxDQUNILENBQUM7UUFFRixrQkFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFlO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxrREFBa0Q7UUFDbEQsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQztRQUVsQyxPQUFPLElBQUksMkJBQVksQ0FBQztZQUN0QiwrQkFBK0I7WUFDL0IsS0FBSztZQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIscUVBQXFFO1lBQ3JFLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNsRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsZUFBZSxFQUFFLElBQUk7WUFDckIsY0FBYyxFQUFFLElBQUk7WUFDcEIsdUJBQXVCLEVBQUUsSUFBSTtTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsbUJBQW1CLENBQUMsTUFBZTtRQUMzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0IsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUNiLGlFQUFpRSxDQUNsRSxDQUFDO1NBQ0g7UUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUNsRDtRQUNELE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUMxQixDQUFDOztBQXBFSCxvRUFxRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IER1cmF0aW9uLCBUYWdzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5pbXBvcnQgeyBFZmZlY3QsIFBvbGljeVN0YXRlbWVudCB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtaWFtXCI7XG5pbXBvcnQgeyBDb2RlLCBGdW5jdGlvbiwgSUZ1bmN0aW9uLCBSdW50aW1lIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IFJldGVudGlvbkRheXMgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxvZ3NcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbmltcG9ydCB7IEN1c3RvbVdpZGdldCB9IGZyb20gXCIuL0N1c3RvbVdpZGdldFwiO1xuXG4vKipcbiAqIFN1cHBvcnQgZm9yIHJlbmRlcmluZyBiaXRtYXAgd2lkZ2V0cyBvbiB0aGUgc2VydmVyIHNpZGUuXG4gKiBJdCBpcyBhIGN1c3RvbSB3aWRnZXQgbGFtYmRhIHdpdGggc29tZSBhZGRpdGlvbmFsIHJvbGVzIGFuZCBoZWxwZXIgbWV0aG9kcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEJpdG1hcFdpZGdldFJlbmRlcmluZ1N1cHBvcnQgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICByZWFkb25seSBoYW5kbGVyOiBJRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICB0aGlzLmhhbmRsZXIgPSBuZXcgRnVuY3Rpb24odGhpcywgXCJMYW1iZGFcIiwge1xuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoXG4gICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgXCIuLlwiLFxuICAgICAgICAgIFwiLi5cIixcbiAgICAgICAgICBcIi4uXCIsXG4gICAgICAgICAgXCJhc3NldHNcIixcbiAgICAgICAgICBcIkJpdG1hcFdpZGdldFJlbmRlcmluZ1N1cHBvcnRcIlxuICAgICAgICApXG4gICAgICApLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiQ3VzdG9tIFdpZGdldCBSZW5kZXIgZm9yIEJpdG1hcCBXaWRnZXRzIChjZGstbW9uaXRvcmluZy1jb25zdHJ1Y3RzKVwiLFxuICAgICAgaGFuZGxlcjogXCJpbmRleC5oYW5kbGVyXCIsXG4gICAgICBtZW1vcnlTaXplOiAxMjgsXG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcyg2MCksXG4gICAgICBsb2dSZXRlbnRpb246IFJldGVudGlvbkRheXMuT05FX0RBWSxcbiAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlci5hZGRUb1JvbGVQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgYWN0aW9uczogW1wiY2xvdWR3YXRjaDpHZXRNZXRyaWNXaWRnZXRJbWFnZVwiXSxcbiAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXG4gICAgICAgIHJlc291cmNlczogW1wiKlwiXSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIFRhZ3Mub2YodGhpcy5oYW5kbGVyKS5hZGQoXCJjdy1jdXN0b20td2lkZ2V0XCIsIFwiZGVzY3JpYmU6cmVhZE9ubHlcIik7XG4gIH1cblxuICBhc0JpdG1hcCh3aWRnZXQ6IElXaWRnZXQpIHtcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMuZ2V0V2lkZ2V0UHJvcGVydGllcyh3aWRnZXQpO1xuICAgIC8vIHJlbW92ZSB0aGUgdGl0bGUgZnJvbSB0aGUgZ3JhcGggYW5kIHJlbWVtYmVyIGl0XG4gICAgY29uc3QgeyB0aXRsZSwgLi4uZ3JhcGggfSA9IHByb3BzO1xuXG4gICAgcmV0dXJuIG5ldyBDdXN0b21XaWRnZXQoe1xuICAgICAgLy8gbW92ZSB0aGUgb3JpZ2luYWwgdGl0bGUgaGVyZVxuICAgICAgdGl0bGUsXG4gICAgICB3aWR0aDogd2lkZ2V0LndpZHRoLFxuICAgICAgaGVpZ2h0OiB3aWRnZXQuaGVpZ2h0LFxuICAgICAgLy8gZW1wdHkgdGhlIGlubmVyIHRpdGxlIHNpbmNlIHdlIGFscmVhZHkgaGF2ZSBpdCBvbiB0aGUgd2hvbGUgd2lkZ2V0XG4gICAgICBoYW5kbGVyUGFyYW1zOiB7IGdyYXBoOiB7IC4uLmdyYXBoLCB0aXRsZTogXCIgXCIgfSB9LFxuICAgICAgaGFuZGxlcjogdGhpcy5oYW5kbGVyLFxuICAgICAgdXBkYXRlT25SZWZyZXNoOiB0cnVlLFxuICAgICAgdXBkYXRlT25SZXNpemU6IHRydWUsXG4gICAgICB1cGRhdGVPblRpbWVSYW5nZUNoYW5nZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRXaWRnZXRQcm9wZXJ0aWVzKHdpZGdldDogSVdpZGdldCk6IGFueSB7XG4gICAgY29uc3QgZ3JhcGhzID0gd2lkZ2V0LnRvSnNvbigpO1xuICAgIGlmIChncmFwaHMubGVuZ3RoICE9IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJOdW1iZXIgb2Ygb2JqZWN0cyBpbiB0aGUgd2lkZ2V0IGRlZmluaXRpb24gbXVzdCBiZSBleGFjdGx5IG9uZS5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgZ3JhcGggPSBncmFwaHNbMF07XG4gICAgaWYgKCFncmFwaC5wcm9wZXJ0aWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBncmFwaCBwcm9wZXJ0aWVzOiBcIiArIGdyYXBoKTtcbiAgICB9XG4gICAgcmV0dXJuIGdyYXBoLnByb3BlcnRpZXM7XG4gIH1cbn1cbiJdfQ==