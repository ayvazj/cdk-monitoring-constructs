import { IAspect } from "aws-cdk-lib";
import { IConstruct } from "constructs";
import { MonitoringAspectProps } from "./IMonitoringAspect";
import { MonitoringFacade } from "./MonitoringFacade";
/**
 * A CDK aspect that adds support for monitoring all resources within scope.
 */
export declare class MonitoringAspect implements IAspect {
    private readonly monitoringFacade;
    private readonly props;
    /**
     * Whether or not we've added a monitoring to the scope for node independent monitorings.
     */
    private addedNodeIndependentMonitoringToScope;
    constructor(monitoringFacade: MonitoringFacade, props?: MonitoringAspectProps);
    visit(node: IConstruct): void;
    private getMonitoringDetails;
    private monitorAcm;
    private monitorApiGateway;
    private monitorApiGatewayV2;
    private monitorAppSync;
    private monitorAuroraCluster;
    private monitorAutoScalingGroup;
    private monitorBilling;
    private monitorCloudFront;
    private monitorCodeBuild;
    private monitorDocumentDb;
    private monitorDynamoDb;
    private monitorEc2;
    private monitorElasticCache;
    private monitorGlue;
    private monitorKinesisAnalytics;
    private monitorKinesisDataStream;
    private monitorKinesisFirehose;
    private monitorLambda;
    private monitorOpenSearch;
    private monitorRds;
    private monitorRedshift;
    private monitorS3;
    private monitorSecretsManager;
    private monitorSns;
    private monitorSqs;
    private monitorStepFunctions;
    private monitorSyntheticsCanaries;
    private monitorWebApplicationFirewallV2Acls;
}
