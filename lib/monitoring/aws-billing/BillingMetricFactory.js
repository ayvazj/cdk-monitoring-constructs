"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingMetricFactory = exports.BillingCurrency = exports.BillingRegion = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const common_1 = require("../../common");
exports.BillingRegion = "us-east-1";
exports.BillingCurrency = "USD";
const BillingNamespace = "AWS/Billing";
const BillingMetric = "EstimatedCharges";
const BillingPeriod = aws_cdk_lib_1.Duration.days(1);
const DefaultServiceLimit = 10;
class BillingMetricFactory {
    metricSearchTopCostByServiceInUsd() {
        const search = new aws_cloudwatch_1.MathExpression({
            period: BillingPeriod,
            searchRegion: exports.BillingRegion,
            expression: `SEARCH('{${BillingNamespace},Currency,ServiceName} MetricName="${BillingMetric}"', 'Maximum', ${BillingPeriod.toSeconds()})`,
            usingMetrics: {},
            label: " ",
        });
        return new aws_cloudwatch_1.MathExpression({
            period: BillingPeriod,
            searchRegion: exports.BillingRegion,
            expression: `SORT(search, MAX, DESC, ${DefaultServiceLimit})`,
            usingMetrics: { search },
            label: " ",
        });
    }
    metricTotalCostInUsd() {
        // not using metric factory because we customize everything
        return new aws_cloudwatch_1.Metric({
            namespace: BillingNamespace,
            metricName: BillingMetric,
            dimensionsMap: { Currency: exports.BillingCurrency },
            period: BillingPeriod,
            label: `Estimated Charges`,
            region: exports.BillingRegion,
            statistic: common_1.MetricStatistic.MAX,
        });
    }
}
exports.BillingMetricFactory = BillingMetricFactory;
_a = JSII_RTTI_SYMBOL_1;
BillingMetricFactory[_a] = { fqn: "cdk-monitoring-constructs.BillingMetricFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmlsbGluZ01ldHJpY0ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCaWxsaW5nTWV0cmljRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZDQUF1QztBQUN2QywrREFBNkU7QUFFN0UseUNBQXVFO0FBRTFELFFBQUEsYUFBYSxHQUFHLFdBQVcsQ0FBQztBQUM1QixRQUFBLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFFckMsTUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7QUFDdkMsTUFBTSxhQUFhLEdBQUcsa0JBQWtCLENBQUM7QUFDekMsTUFBTSxhQUFhLEdBQUcsc0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkMsTUFBTSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7QUFFL0IsTUFBYSxvQkFBb0I7SUFDL0IsaUNBQWlDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksK0JBQWMsQ0FBQztZQUNoQyxNQUFNLEVBQUUsYUFBYTtZQUNyQixZQUFZLEVBQUUscUJBQWE7WUFDM0IsVUFBVSxFQUFFLFlBQVksZ0JBQWdCLHNDQUFzQyxhQUFhLGtCQUFrQixhQUFhLENBQUMsU0FBUyxFQUFFLEdBQUc7WUFDekksWUFBWSxFQUFFLEVBQUU7WUFDaEIsS0FBSyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksK0JBQWMsQ0FBQztZQUN4QixNQUFNLEVBQUUsYUFBYTtZQUNyQixZQUFZLEVBQUUscUJBQWE7WUFDM0IsVUFBVSxFQUFFLDJCQUEyQixtQkFBbUIsR0FBRztZQUM3RCxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUU7WUFDeEIsS0FBSyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLDJEQUEyRDtRQUUzRCxPQUFPLElBQUksdUJBQU0sQ0FBQztZQUNoQixTQUFTLEVBQUUsZ0JBQWdCO1lBQzNCLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSx1QkFBZSxFQUFFO1lBQzVDLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsTUFBTSxFQUFFLHFCQUFhO1lBQ3JCLFNBQVMsRUFBRSx3QkFBZSxDQUFDLEdBQUc7U0FDL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUEvQkgsb0RBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHVyYXRpb24gfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IElNZXRyaWMsIE1hdGhFeHByZXNzaW9uLCBNZXRyaWMgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuaW1wb3J0IHsgTWV0cmljU3RhdGlzdGljLCBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0IH0gZnJvbSBcIi4uLy4uL2NvbW1vblwiO1xuXG5leHBvcnQgY29uc3QgQmlsbGluZ1JlZ2lvbiA9IFwidXMtZWFzdC0xXCI7XG5leHBvcnQgY29uc3QgQmlsbGluZ0N1cnJlbmN5ID0gXCJVU0RcIjtcblxuY29uc3QgQmlsbGluZ05hbWVzcGFjZSA9IFwiQVdTL0JpbGxpbmdcIjtcbmNvbnN0IEJpbGxpbmdNZXRyaWMgPSBcIkVzdGltYXRlZENoYXJnZXNcIjtcbmNvbnN0IEJpbGxpbmdQZXJpb2QgPSBEdXJhdGlvbi5kYXlzKDEpO1xuY29uc3QgRGVmYXVsdFNlcnZpY2VMaW1pdCA9IDEwO1xuXG5leHBvcnQgY2xhc3MgQmlsbGluZ01ldHJpY0ZhY3Rvcnkge1xuICBtZXRyaWNTZWFyY2hUb3BDb3N0QnlTZXJ2aWNlSW5Vc2QoKTogSU1ldHJpYyB7XG4gICAgY29uc3Qgc2VhcmNoID0gbmV3IE1hdGhFeHByZXNzaW9uKHtcbiAgICAgIHBlcmlvZDogQmlsbGluZ1BlcmlvZCxcbiAgICAgIHNlYXJjaFJlZ2lvbjogQmlsbGluZ1JlZ2lvbixcbiAgICAgIGV4cHJlc3Npb246IGBTRUFSQ0goJ3ske0JpbGxpbmdOYW1lc3BhY2V9LEN1cnJlbmN5LFNlcnZpY2VOYW1lfSBNZXRyaWNOYW1lPVwiJHtCaWxsaW5nTWV0cmljfVwiJywgJ01heGltdW0nLCAke0JpbGxpbmdQZXJpb2QudG9TZWNvbmRzKCl9KWAsXG4gICAgICB1c2luZ01ldHJpY3M6IHt9LFxuICAgICAgbGFiZWw6IFwiIFwiLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBNYXRoRXhwcmVzc2lvbih7XG4gICAgICBwZXJpb2Q6IEJpbGxpbmdQZXJpb2QsXG4gICAgICBzZWFyY2hSZWdpb246IEJpbGxpbmdSZWdpb24sXG4gICAgICBleHByZXNzaW9uOiBgU09SVChzZWFyY2gsIE1BWCwgREVTQywgJHtEZWZhdWx0U2VydmljZUxpbWl0fSlgLFxuICAgICAgdXNpbmdNZXRyaWNzOiB7IHNlYXJjaCB9LFxuICAgICAgbGFiZWw6IFwiIFwiLFxuICAgIH0pO1xuICB9XG5cbiAgbWV0cmljVG90YWxDb3N0SW5Vc2QoKTogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCB7XG4gICAgLy8gbm90IHVzaW5nIG1ldHJpYyBmYWN0b3J5IGJlY2F1c2Ugd2UgY3VzdG9taXplIGV2ZXJ5dGhpbmdcblxuICAgIHJldHVybiBuZXcgTWV0cmljKHtcbiAgICAgIG5hbWVzcGFjZTogQmlsbGluZ05hbWVzcGFjZSxcbiAgICAgIG1ldHJpY05hbWU6IEJpbGxpbmdNZXRyaWMsXG4gICAgICBkaW1lbnNpb25zTWFwOiB7IEN1cnJlbmN5OiBCaWxsaW5nQ3VycmVuY3kgfSxcbiAgICAgIHBlcmlvZDogQmlsbGluZ1BlcmlvZCxcbiAgICAgIGxhYmVsOiBgRXN0aW1hdGVkIENoYXJnZXNgLFxuICAgICAgcmVnaW9uOiBCaWxsaW5nUmVnaW9uLFxuICAgICAgc3RhdGlzdGljOiBNZXRyaWNTdGF0aXN0aWMuTUFYLFxuICAgIH0pO1xuICB9XG59XG4iXX0=