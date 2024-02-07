import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { MetricFactory, MetricWithAlarmSupport } from "../../common";
export interface CertificateManagerMetricFactoryProps {
    readonly certificate: ICertificate;
}
export declare class CertificateManagerMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly dimensionsMap: DimensionsMap;
    constructor(metricFactory: MetricFactory, props: CertificateManagerMetricFactoryProps);
    metricDaysToExpiry(): MetricWithAlarmSupport;
}
