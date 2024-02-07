import { DimensionHash } from "aws-cdk-lib/aws-cloudwatch";
import { CfnWebACL } from "aws-cdk-lib/aws-wafv2";
import { MetricFactory } from "../../common";
export interface WafV2MetricFactoryProps {
    readonly acl: CfnWebACL;
    /**
     * Required if acl has a "REGIONAL" scope.
     */
    readonly region?: string;
}
/**
 * https://docs.aws.amazon.com/waf/latest/developerguide/monitoring-cloudwatch.html
 */
export declare class WafV2MetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensions: DimensionHash;
    constructor(metricFactory: MetricFactory, props: WafV2MetricFactoryProps);
    metricAllowedRequests(): import("../../common").MetricWithAlarmSupport;
    metricBlockedRequests(): import("../../common").MetricWithAlarmSupport;
    metricBlockedRequestsRate(): import("../../common").MetricWithAlarmSupport;
}
