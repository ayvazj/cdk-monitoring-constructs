import { IBucket } from "aws-cdk-lib/aws-s3";
import { MetricFactory } from "../../common";
export declare enum StorageType {
    DEEP_ARCHIVE_OBJECT_OVERHEAD = "DeepArchiveObjectOverhead",
    DEEP_ARCHIVE_S3_OBJECT_OVERHEAD = "DeepArchiveS3ObjectOverhead",
    DEEP_ARCHIVE_STAGING_STORAGE = "DeepArchiveStagingStorage",
    DEEP_ARCHIVE_STORAGE = "DeepArchiveStorage",
    GLACIER_OBJECT_OVERHEAD = "GlacierObjectOverhead",
    GLACIER_S3_OBJECT_OVERHEAD = "GlacierS3ObjectOverhead",
    GLACIER_STAGING_STORAGE = "GlacierStagingStorage",
    GLACIER_STORAGE = "GlacierStorage",
    INTELLIGENT_TIERING_FA_STORAGE = "IntelligentTieringFAStorage",
    INTELLIGENT_TIERING_IA_STORAGE = "IntelligentTieringIAStorage",
    ONE_ZONE_IA_SIZE_OVERHEAD = "OneZoneIASizeOverhead",
    ONE_ZONE_IA_STORAGE = "OneZoneIAStorage",
    REDUCED_REDUNDANCY_STORAGE = "ReducedRedundancyStorage",
    STANDARD_IA_SIZE_OVERHEAD = "StandardIASizeOverhead",
    STANDARD_IA_STORAGE = "StandardIAStorage",
    STANDARD_STORAGE = "StandardStorage"
}
export interface S3BucketMetricFactoryProps {
    readonly bucket: IBucket;
    readonly storageType?: StorageType;
}
export declare class S3BucketMetricFactory {
    protected readonly metricFactory: MetricFactory;
    protected readonly props: S3BucketMetricFactoryProps;
    constructor(metricFactory: MetricFactory, props: S3BucketMetricFactoryProps);
    metricBucketSizeBytes(): import("../../common").MetricWithAlarmSupport;
    metricNumberOfObjects(): import("../../common").MetricWithAlarmSupport;
}
