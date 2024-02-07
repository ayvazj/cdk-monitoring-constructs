"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringAspect = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const redshift = require("@aws-cdk/aws-redshift-alpha");
const apigw = require("aws-cdk-lib/aws-apigateway");
const apigwv2 = require("aws-cdk-lib/aws-apigatewayv2");
const appsync = require("aws-cdk-lib/aws-appsync");
const autoscaling = require("aws-cdk-lib/aws-autoscaling");
const acm = require("aws-cdk-lib/aws-certificatemanager");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const codebuild = require("aws-cdk-lib/aws-codebuild");
const docdb = require("aws-cdk-lib/aws-docdb");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const elasticsearch = require("aws-cdk-lib/aws-elasticsearch");
const glue = require("aws-cdk-lib/aws-glue");
const kinesis = require("aws-cdk-lib/aws-kinesis");
const kinesisanalytics = require("aws-cdk-lib/aws-kinesisanalytics");
const kinesisfirehose = require("aws-cdk-lib/aws-kinesisfirehose");
const lambda = require("aws-cdk-lib/aws-lambda");
const opensearch = require("aws-cdk-lib/aws-opensearchservice");
const rds = require("aws-cdk-lib/aws-rds");
const s3 = require("aws-cdk-lib/aws-s3");
const secretsmanager = require("aws-cdk-lib/aws-secretsmanager");
const sns = require("aws-cdk-lib/aws-sns");
const sqs = require("aws-cdk-lib/aws-sqs");
const stepfunctions = require("aws-cdk-lib/aws-stepfunctions");
const synthetics = require("aws-cdk-lib/aws-synthetics");
const wafv2 = require("aws-cdk-lib/aws-wafv2");
const monitoring_1 = require("../monitoring");
/**
 * A CDK aspect that adds support for monitoring all resources within scope.
 */
class MonitoringAspect {
    constructor(monitoringFacade, props = {}) {
        this.monitoringFacade = monitoringFacade;
        this.props = props;
        /**
         * Whether or not we've added a monitoring to the scope for node independent monitorings.
         */
        this.addedNodeIndependentMonitoringToScope = false;
    }
    visit(node) {
        this.monitorAcm(node);
        this.monitorApiGateway(node);
        this.monitorApiGatewayV2(node);
        this.monitorAppSync(node);
        this.monitorAuroraCluster(node);
        this.monitorAutoScalingGroup(node);
        this.monitorCloudFront(node);
        this.monitorCodeBuild(node);
        this.monitorDocumentDb(node);
        this.monitorDynamoDb(node);
        this.monitorGlue(node);
        this.monitorKinesisAnalytics(node);
        this.monitorKinesisDataStream(node);
        this.monitorKinesisFirehose(node);
        this.monitorLambda(node);
        this.monitorOpenSearch(node);
        this.monitorRds(node);
        this.monitorRedshift(node);
        this.monitorS3(node);
        this.monitorSecretsManager(node);
        this.monitorSns(node);
        this.monitorSqs(node);
        this.monitorStepFunctions(node);
        this.monitorSyntheticsCanaries(node);
        this.monitorWebApplicationFirewallV2Acls(node);
        if (!this.addedNodeIndependentMonitoringToScope) {
            this.addedNodeIndependentMonitoringToScope = true;
            this.monitorEc2();
            this.monitorBilling();
            this.monitorElasticCache();
        }
    }
    getMonitoringDetails(aspectOptions) {
        const isEnabled = aspectOptions?.enabled ?? true;
        const props = aspectOptions?.props;
        return [isEnabled, props];
    }
    monitorAcm(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.acm);
        if (isEnabled && node instanceof acm.Certificate) {
            this.monitoringFacade.monitorCertificate({
                certificate: node,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorApiGateway(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.apiGateway);
        if (isEnabled && node instanceof apigw.RestApi) {
            this.monitoringFacade.monitorApiGateway({
                api: node,
                apiStage: node.deploymentStage.stageName,
                ...props,
            });
        }
    }
    monitorApiGatewayV2(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.apiGatewayV2);
        if (isEnabled && node instanceof apigwv2.HttpApi) {
            this.monitoringFacade.monitorApiGatewayV2HttpApi({
                api: node,
                ...props,
            });
        }
    }
    monitorAppSync(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.appSync);
        if (isEnabled && node instanceof appsync.GraphqlApi) {
            this.monitoringFacade.monitorAppSyncApi({
                api: node,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorAuroraCluster(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.auroraCluster);
        if (isEnabled && node instanceof rds.ServerlessCluster) {
            this.monitoringFacade.monitorAuroraCluster({
                cluster: node,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorAutoScalingGroup(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.autoScalingGroup);
        if (isEnabled && node instanceof autoscaling.AutoScalingGroup) {
            this.monitoringFacade.monitorAutoScalingGroup({
                autoScalingGroup: node,
                ...props,
            });
        }
    }
    monitorBilling() {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.billing);
        if (isEnabled) {
            this.monitoringFacade.monitorBilling({
                ...props,
                alarmFriendlyName: "Billing",
            });
        }
    }
    monitorCloudFront(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.cloudFront);
        if (isEnabled && node instanceof cloudfront.Distribution) {
            this.monitoringFacade.monitorCloudFrontDistribution({
                distribution: node,
                ...props,
            });
        }
    }
    monitorCodeBuild(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.codeBuild);
        if (isEnabled && node instanceof codebuild.Project) {
            this.monitoringFacade.monitorCodeBuildProject({
                project: node,
                ...props,
            });
        }
    }
    monitorDocumentDb(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.documentDb);
        if (isEnabled && node instanceof docdb.DatabaseCluster) {
            this.monitoringFacade.monitorDocumentDbCluster({
                cluster: node,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorDynamoDb(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.dynamoDB);
        if (isEnabled && node instanceof dynamodb.Table) {
            this.monitoringFacade.monitorDynamoTable({
                table: node,
                ...props,
            });
        }
    }
    monitorEc2() {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.ec2);
        if (isEnabled) {
            this.monitoringFacade.monitorEC2Instances({
                ...props,
            });
        }
    }
    monitorElasticCache() {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.elasticCache);
        if (isEnabled) {
            this.monitoringFacade.monitorElastiCacheCluster({
                clusterType: monitoring_1.ElastiCacheClusterType.MEMCACHED,
                ...props,
            });
            this.monitoringFacade.monitorElastiCacheCluster({
                clusterType: monitoring_1.ElastiCacheClusterType.REDIS,
                ...props,
            });
        }
    }
    monitorGlue(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.glue);
        if (isEnabled && node instanceof glue.CfnJob) {
            this.monitoringFacade.monitorGlueJob({
                jobName: node.name,
                ...props,
            });
        }
    }
    monitorKinesisAnalytics(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.kinesisDataAnalytics);
        if (isEnabled && node instanceof kinesisanalytics.CfnApplication) {
            this.monitoringFacade.monitorKinesisDataAnalytics({
                application: node.applicationName,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorKinesisDataStream(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.kinesisDataStream);
        if (isEnabled && node instanceof kinesis.CfnStream) {
            this.monitoringFacade.monitorKinesisDataStream({
                streamName: node.name,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorKinesisFirehose(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.kinesisFirehose);
        if (isEnabled && node instanceof kinesisfirehose.CfnDeliveryStream) {
            this.monitoringFacade.monitorKinesisFirehose({
                deliveryStreamName: node.deliveryStreamName,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorLambda(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.lambda);
        if (isEnabled && node instanceof lambda.Function) {
            this.monitoringFacade.monitorLambdaFunction({
                lambdaFunction: node,
                ...props,
            });
        }
    }
    monitorOpenSearch(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.openSearch);
        if (isEnabled &&
            (node instanceof elasticsearch.Domain ||
                node instanceof elasticsearch.CfnDomain ||
                node instanceof opensearch.Domain ||
                node instanceof opensearch.CfnDomain)) {
            this.monitoringFacade.monitorOpenSearchCluster({
                domain: node,
                ...props,
            });
        }
    }
    monitorRds(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.rds);
        if (isEnabled && node instanceof rds.DatabaseCluster) {
            this.monitoringFacade.monitorRdsCluster({
                cluster: node,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
        else if (isEnabled && node instanceof rds.DatabaseInstance) {
            this.monitoringFacade.monitorRdsInstance({
                instance: node,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorRedshift(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.redshift);
        if (isEnabled && node instanceof redshift.Cluster) {
            this.monitoringFacade.monitorRedshiftCluster({
                clusterIdentifier: node.clusterName,
                alarmFriendlyName: node.node.path,
                ...props,
            });
        }
    }
    monitorS3(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.s3);
        if (isEnabled && node instanceof s3.Bucket) {
            this.monitoringFacade.monitorS3Bucket({
                bucket: node,
                ...props,
            });
        }
    }
    monitorSecretsManager(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.secretsManager);
        if (isEnabled && node instanceof secretsmanager.Secret) {
            this.monitoringFacade.monitorSecretsManagerSecret({
                secret: node,
                ...props,
            });
        }
    }
    monitorSns(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.sns);
        if (isEnabled && node instanceof sns.Topic) {
            this.monitoringFacade.monitorSnsTopic({
                topic: node,
                ...props,
            });
        }
    }
    monitorSqs(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.sqs);
        if (isEnabled && node instanceof sqs.Queue) {
            this.monitoringFacade.monitorSqsQueue({
                queue: node,
                ...props,
            });
        }
    }
    monitorStepFunctions(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.stepFunctions);
        if (isEnabled && node instanceof stepfunctions.StateMachine) {
            this.monitoringFacade.monitorStepFunction({
                stateMachine: node,
                ...props,
            });
        }
    }
    monitorSyntheticsCanaries(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.syntheticsCanaries);
        if (isEnabled && node instanceof synthetics.Canary) {
            this.monitoringFacade.monitorSyntheticsCanary({
                canary: node,
                ...props,
            });
        }
    }
    monitorWebApplicationFirewallV2Acls(node) {
        const [isEnabled, props] = this.getMonitoringDetails(this.props.webApplicationFirewallAclV2);
        if (isEnabled && node instanceof wafv2.CfnWebACL) {
            this.monitoringFacade.monitorWebApplicationFirewallAclV2({
                acl: node,
                ...props,
            });
        }
    }
}
exports.MonitoringAspect = MonitoringAspect;
_a = JSII_RTTI_SYMBOL_1;
MonitoringAspect[_a] = { fqn: "cdk-monitoring-constructs.MonitoringAspect", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uaXRvcmluZ0FzcGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1vbml0b3JpbmdBc3BlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBd0Q7QUFFeEQsb0RBQW9EO0FBQ3BELHdEQUF3RDtBQUN4RCxtREFBbUQ7QUFDbkQsMkRBQTJEO0FBQzNELDBEQUEwRDtBQUMxRCx5REFBeUQ7QUFDekQsdURBQXVEO0FBQ3ZELCtDQUErQztBQUMvQyxxREFBcUQ7QUFDckQsK0RBQStEO0FBQy9ELDZDQUE2QztBQUM3QyxtREFBbUQ7QUFDbkQscUVBQXFFO0FBQ3JFLG1FQUFtRTtBQUNuRSxpREFBaUQ7QUFDakQsZ0VBQWdFO0FBQ2hFLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekMsaUVBQWlFO0FBQ2pFLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsK0RBQStEO0FBQy9ELHlEQUF5RDtBQUN6RCwrQ0FBK0M7QUFRL0MsOENBQXVEO0FBRXZEOztHQUVHO0FBQ0gsTUFBYSxnQkFBZ0I7SUFNM0IsWUFDbUIsZ0JBQWtDLEVBQ2xDLFFBQStCLEVBQUU7UUFEakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUE0QjtRQVBwRDs7V0FFRztRQUNLLDBDQUFxQyxHQUFHLEtBQUssQ0FBQztJQUtuRCxDQUFDO0lBRUcsS0FBSyxDQUFDLElBQWdCO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFD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QUFDLG9CQUFvQixDQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FDekIsQ0FBQztRQUNGLElBQUksU0FBUyxJQUFJLElBQUksWUFBWSxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQzNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDeEMsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLEdBQUcsS0FBSzthQUNULENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLHlCQUF5QixDQUFDLElBQWdCO1FBQ2hELE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUM5QixDQUFDO1FBQ0YsSUFBSSxTQUFTLElBQUksSUFBSSxZQUFZLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDO2dCQUM1QyxNQUFNLEVBQUUsSUFBSTtnQkFDWixHQUFHLEtBQUs7YUFDVCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxtQ0FBbUMsQ0FBQyxJQUFnQjtRQUMxRCxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FDdkMsQ0FBQztRQUNGLElBQUksU0FBUyxJQUFJLElBQUksWUFBWSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQ0FBa0MsQ0FBQztnQkFDdkQsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxLQUFLO2FBQ1QsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztBQTVYSCw0Q0E2WEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyByZWRzaGlmdCBmcm9tIFwiQGF3cy1jZGsvYXdzLXJlZHNoaWZ0LWFscGhhXCI7XG5pbXBvcnQgeyBJQXNwZWN0IH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIGFwaWd3djIgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5djJcIjtcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcHBzeW5jXCI7XG5pbXBvcnQgKiBhcyBhdXRvc2NhbGluZyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWF1dG9zY2FsaW5nXCI7XG5pbXBvcnQgKiBhcyBhY20gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXJcIjtcbmltcG9ydCAqIGFzIGNsb3VkZnJvbnQgZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZGZyb250XCI7XG5pbXBvcnQgKiBhcyBjb2RlYnVpbGQgZnJvbSBcImF3cy1jZGstbGliL2F3cy1jb2RlYnVpbGRcIjtcbmltcG9ydCAqIGFzIGRvY2RiIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZG9jZGJcIjtcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcbmltcG9ydCAqIGFzIGVsYXN0aWNzZWFyY2ggZnJvbSBcImF3cy1jZGstbGliL2F3cy1lbGFzdGljc2VhcmNoXCI7XG5pbXBvcnQgKiBhcyBnbHVlIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZ2x1ZVwiO1xuaW1wb3J0ICogYXMga2luZXNpcyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWtpbmVzaXNcIjtcbmltcG9ydCAqIGFzIGtpbmVzaXNhbmFseXRpY3MgZnJvbSBcImF3cy1jZGstbGliL2F3cy1raW5lc2lzYW5hbHl0aWNzXCI7XG5pbXBvcnQgKiBhcyBraW5lc2lzZmlyZWhvc2UgZnJvbSBcImF3cy1jZGstbGliL2F3cy1raW5lc2lzZmlyZWhvc2VcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgb3BlbnNlYXJjaCBmcm9tIFwiYXdzLWNkay1saWIvYXdzLW9wZW5zZWFyY2hzZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyByZHMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1yZHNcIjtcbmltcG9ydCAqIGFzIHMzIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtczNcIjtcbmltcG9ydCAqIGFzIHNlY3JldHNtYW5hZ2VyIGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc2VjcmV0c21hbmFnZXJcIjtcbmltcG9ydCAqIGFzIHNucyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXNuc1wiO1xuaW1wb3J0ICogYXMgc3FzIGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc3FzXCI7XG5pbXBvcnQgKiBhcyBzdGVwZnVuY3Rpb25zIGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc3RlcGZ1bmN0aW9uc1wiO1xuaW1wb3J0ICogYXMgc3ludGhldGljcyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXN5bnRoZXRpY3NcIjtcbmltcG9ydCAqIGFzIHdhZnYyIGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtd2FmdjJcIjtcbmltcG9ydCB7IElDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuXG5pbXBvcnQge1xuICBNb25pdG9yaW5nQXNwZWN0UHJvcHMsXG4gIE1vbml0b3JpbmdBc3BlY3RUeXBlLFxufSBmcm9tIFwiLi9JTW9uaXRvcmluZ0FzcGVjdFwiO1xuaW1wb3J0IHsgTW9uaXRvcmluZ0ZhY2FkZSB9IGZyb20gXCIuL01vbml0b3JpbmdGYWNhZGVcIjtcbmltcG9ydCB7IEVsYXN0aUNhY2hlQ2x1c3RlclR5cGUgfSBmcm9tIFwiLi4vbW9uaXRvcmluZ1wiO1xuXG4vKipcbiAqIEEgQ0RLIGFzcGVjdCB0aGF0IGFkZHMgc3VwcG9ydCBmb3IgbW9uaXRvcmluZyBhbGwgcmVzb3VyY2VzIHdpdGhpbiBzY29wZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vbml0b3JpbmdBc3BlY3QgaW1wbGVtZW50cyBJQXNwZWN0IHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHdlJ3ZlIGFkZGVkIGEgbW9uaXRvcmluZyB0byB0aGUgc2NvcGUgZm9yIG5vZGUgaW5kZXBlbmRlbnQgbW9uaXRvcmluZ3MuXG4gICAqL1xuICBwcml2YXRlIGFkZGVkTm9kZUluZGVwZW5kZW50TW9uaXRvcmluZ1RvU2NvcGUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1vbml0b3JpbmdGYWNhZGU6IE1vbml0b3JpbmdGYWNhZGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9wczogTW9uaXRvcmluZ0FzcGVjdFByb3BzID0ge31cbiAgKSB7fVxuXG4gIHB1YmxpYyB2aXNpdChub2RlOiBJQ29uc3RydWN0KTogdm9pZCB7XG4gICAgdGhpcy5tb25pdG9yQWNtKG5vZGUpO1xuICAgIHRoaXMubW9uaXRvckFwaUdhdGV3YXkobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yQXBpR2F0ZXdheVYyKG5vZGUpO1xuICAgIHRoaXMubW9uaXRvckFwcFN5bmMobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yQXVyb3JhQ2x1c3Rlcihub2RlKTtcbiAgICB0aGlzLm1vbml0b3JBdXRvU2NhbGluZ0dyb3VwKG5vZGUpO1xuICAgIHRoaXMubW9uaXRvckNsb3VkRnJvbnQobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yQ29kZUJ1aWxkKG5vZGUpO1xuICAgIHRoaXMubW9uaXRvckRvY3VtZW50RGIobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yRHluYW1vRGIobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yR2x1ZShub2RlKTtcbiAgICB0aGlzLm1vbml0b3JLaW5lc2lzQW5hbHl0aWNzKG5vZGUpO1xuICAgIHRoaXMubW9uaXRvcktpbmVzaXNEYXRhU3RyZWFtKG5vZGUpO1xuICAgIHRoaXMubW9uaXRvcktpbmVzaXNGaXJlaG9zZShub2RlKTtcbiAgICB0aGlzLm1vbml0b3JMYW1iZGEobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yT3BlblNlYXJjaChub2RlKTtcbiAgICB0aGlzLm1vbml0b3JSZHMobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yUmVkc2hpZnQobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yUzMobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yU2VjcmV0c01hbmFnZXIobm9kZSk7XG4gICAgdGhpcy5tb25pdG9yU25zKG5vZGUpO1xuICAgIHRoaXMubW9uaXRvclNxcyhub2RlKTtcbiAgICB0aGlzLm1vbml0b3JTdGVwRnVuY3Rpb25zKG5vZGUpO1xuICAgIHRoaXMubW9uaXRvclN5bnRoZXRpY3NDYW5hcmllcyhub2RlKTtcbiAgICB0aGlzLm1vbml0b3JXZWJBcHBsaWNhdGlvbkZpcmV3YWxsVjJBY2xzKG5vZGUpO1xuXG4gICAgaWYgKCF0aGlzLmFkZGVkTm9kZUluZGVwZW5kZW50TW9uaXRvcmluZ1RvU2NvcGUpIHtcbiAgICAgIHRoaXMuYWRkZWROb2RlSW5kZXBlbmRlbnRNb25pdG9yaW5nVG9TY29wZSA9IHRydWU7XG5cbiAgICAgIHRoaXMubW9uaXRvckVjMigpO1xuICAgICAgdGhpcy5tb25pdG9yQmlsbGluZygpO1xuICAgICAgdGhpcy5tb25pdG9yRWxhc3RpY0NhY2hlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRNb25pdG9yaW5nRGV0YWlsczxUPihcbiAgICBhc3BlY3RPcHRpb25zPzogTW9uaXRvcmluZ0FzcGVjdFR5cGU8VD5cbiAgKTogW2Jvb2xlYW4sIFQ/XSB7XG4gICAgY29uc3QgaXNFbmFibGVkID0gYXNwZWN0T3B0aW9ucz8uZW5hYmxlZCA/PyB0cnVlO1xuICAgIGNvbnN0IHByb3BzID0gYXNwZWN0T3B0aW9ucz8ucHJvcHM7XG4gICAgcmV0dXJuIFtpc0VuYWJsZWQsIHByb3BzXTtcbiAgfVxuXG4gIHByaXZhdGUgbW9uaXRvckFjbShub2RlOiBJQ29uc3RydWN0KSB7XG4gICAgY29uc3QgW2lzRW5hYmxlZCwgcHJvcHNdID0gdGhpcy5nZXRNb25pdG9yaW5nRGV0YWlscyh0aGlzLnByb3BzLmFjbSk7XG4gICAgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2YgYWNtLkNlcnRpZmljYXRlKSB7XG4gICAgICB0aGlzLm1vbml0b3JpbmdGYWNhZGUubW9uaXRvckNlcnRpZmljYXRlKHtcbiAgICAgICAgY2VydGlmaWNhdGU6IG5vZGUsXG4gICAgICAgIGFsYXJtRnJpZW5kbHlOYW1lOiBub2RlLm5vZGUucGF0aCxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JBcGlHYXRld2F5KG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKHRoaXMucHJvcHMuYXBpR2F0ZXdheSk7XG4gICAgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2YgYXBpZ3cuUmVzdEFwaSkge1xuICAgICAgdGhpcy5tb25pdG9yaW5nRmFjYWRlLm1vbml0b3JBcGlHYXRld2F5KHtcbiAgICAgICAgYXBpOiBub2RlLFxuICAgICAgICBhcGlTdGFnZTogbm9kZS5kZXBsb3ltZW50U3RhZ2Uuc3RhZ2VOYW1lLFxuICAgICAgICAuLi5wcm9wcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9uaXRvckFwaUdhdGV3YXlWMihub2RlOiBJQ29uc3RydWN0KSB7XG4gICAgY29uc3QgW2lzRW5hYmxlZCwgcHJvcHNdID0gdGhpcy5nZXRNb25pdG9yaW5nRGV0YWlscyhcbiAgICAgIHRoaXMucHJvcHMuYXBpR2F0ZXdheVYyXG4gICAgKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiBhcGlnd3YyLkh0dHBBcGkpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yQXBpR2F0ZXdheVYySHR0cEFwaSh7XG4gICAgICAgIGFwaTogbm9kZSxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JBcHBTeW5jKG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKHRoaXMucHJvcHMuYXBwU3luYyk7XG4gICAgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2YgYXBwc3luYy5HcmFwaHFsQXBpKSB7XG4gICAgICB0aGlzLm1vbml0b3JpbmdGYWNhZGUubW9uaXRvckFwcFN5bmNBcGkoe1xuICAgICAgICBhcGk6IG5vZGUsXG4gICAgICAgIGFsYXJtRnJpZW5kbHlOYW1lOiBub2RlLm5vZGUucGF0aCxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JBdXJvcmFDbHVzdGVyKG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKFxuICAgICAgdGhpcy5wcm9wcy5hdXJvcmFDbHVzdGVyXG4gICAgKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiByZHMuU2VydmVybGVzc0NsdXN0ZXIpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yQXVyb3JhQ2x1c3Rlcih7XG4gICAgICAgIGNsdXN0ZXI6IG5vZGUsXG4gICAgICAgIGFsYXJtRnJpZW5kbHlOYW1lOiBub2RlLm5vZGUucGF0aCxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JBdXRvU2NhbGluZ0dyb3VwKG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKFxuICAgICAgdGhpcy5wcm9wcy5hdXRvU2NhbGluZ0dyb3VwXG4gICAgKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiBhdXRvc2NhbGluZy5BdXRvU2NhbGluZ0dyb3VwKSB7XG4gICAgICB0aGlzLm1vbml0b3JpbmdGYWNhZGUubW9uaXRvckF1dG9TY2FsaW5nR3JvdXAoe1xuICAgICAgICBhdXRvU2NhbGluZ0dyb3VwOiBub2RlLFxuICAgICAgICAuLi5wcm9wcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9uaXRvckJpbGxpbmcoKSB7XG4gICAgY29uc3QgW2lzRW5hYmxlZCwgcHJvcHNdID0gdGhpcy5nZXRNb25pdG9yaW5nRGV0YWlscyh0aGlzLnByb3BzLmJpbGxpbmcpO1xuICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yQmlsbGluZyh7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICBhbGFybUZyaWVuZGx5TmFtZTogXCJCaWxsaW5nXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JDbG91ZEZyb250KG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKHRoaXMucHJvcHMuY2xvdWRGcm9udCk7XG4gICAgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2YgY2xvdWRmcm9udC5EaXN0cmlidXRpb24pIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yQ2xvdWRGcm9udERpc3RyaWJ1dGlvbih7XG4gICAgICAgIGRpc3RyaWJ1dGlvbjogbm9kZSxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JDb2RlQnVpbGQobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHModGhpcy5wcm9wcy5jb2RlQnVpbGQpO1xuICAgIGlmIChpc0VuYWJsZWQgJiYgbm9kZSBpbnN0YW5jZW9mIGNvZGVidWlsZC5Qcm9qZWN0KSB7XG4gICAgICB0aGlzLm1vbml0b3JpbmdGYWNhZGUubW9uaXRvckNvZGVCdWlsZFByb2plY3Qoe1xuICAgICAgICBwcm9qZWN0OiBub2RlLFxuICAgICAgICAuLi5wcm9wcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9uaXRvckRvY3VtZW50RGIobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHModGhpcy5wcm9wcy5kb2N1bWVudERiKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiBkb2NkYi5EYXRhYmFzZUNsdXN0ZXIpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yRG9jdW1lbnREYkNsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBub2RlLFxuICAgICAgICBhbGFybUZyaWVuZGx5TmFtZTogbm9kZS5ub2RlLnBhdGgsXG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb25pdG9yRHluYW1vRGIobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHModGhpcy5wcm9wcy5keW5hbW9EQik7XG4gICAgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2YgZHluYW1vZGIuVGFibGUpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yRHluYW1vVGFibGUoe1xuICAgICAgICB0YWJsZTogbm9kZSxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JFYzIoKSB7XG4gICAgY29uc3QgW2lzRW5hYmxlZCwgcHJvcHNdID0gdGhpcy5nZXRNb25pdG9yaW5nRGV0YWlscyh0aGlzLnByb3BzLmVjMik7XG4gICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgdGhpcy5tb25pdG9yaW5nRmFjYWRlLm1vbml0b3JFQzJJbnN0YW5jZXMoe1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9uaXRvckVsYXN0aWNDYWNoZSgpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKFxuICAgICAgdGhpcy5wcm9wcy5lbGFzdGljQ2FjaGVcbiAgICApO1xuICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yRWxhc3RpQ2FjaGVDbHVzdGVyKHtcbiAgICAgICAgY2x1c3RlclR5cGU6IEVsYXN0aUNhY2hlQ2x1c3RlclR5cGUuTUVNQ0FDSEVELFxuICAgICAgICAuLi5wcm9wcyxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tb25pdG9yaW5nRmFjYWRlLm1vbml0b3JFbGFzdGlDYWNoZUNsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyVHlwZTogRWxhc3RpQ2FjaGVDbHVzdGVyVHlwZS5SRURJUyxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JHbHVlKG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKHRoaXMucHJvcHMuZ2x1ZSk7XG4gICAgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2YgZ2x1ZS5DZm5Kb2IpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yR2x1ZUpvYih7XG4gICAgICAgIGpvYk5hbWU6IG5vZGUubmFtZSEsXG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb25pdG9yS2luZXNpc0FuYWx5dGljcyhub2RlOiBJQ29uc3RydWN0KSB7XG4gICAgY29uc3QgW2lzRW5hYmxlZCwgcHJvcHNdID0gdGhpcy5nZXRNb25pdG9yaW5nRGV0YWlscyhcbiAgICAgIHRoaXMucHJvcHMua2luZXNpc0RhdGFBbmFseXRpY3NcbiAgICApO1xuICAgIGlmIChpc0VuYWJsZWQgJiYgbm9kZSBpbnN0YW5jZW9mIGtpbmVzaXNhbmFseXRpY3MuQ2ZuQXBwbGljYXRpb24pIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yS2luZXNpc0RhdGFBbmFseXRpY3Moe1xuICAgICAgICBhcHBsaWNhdGlvbjogbm9kZS5hcHBsaWNhdGlvbk5hbWUhLFxuICAgICAgICBhbGFybUZyaWVuZGx5TmFtZTogbm9kZS5ub2RlLnBhdGgsXG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb25pdG9yS2luZXNpc0RhdGFTdHJlYW0obm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHMoXG4gICAgICB0aGlzLnByb3BzLmtpbmVzaXNEYXRhU3RyZWFtXG4gICAgKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiBraW5lc2lzLkNmblN0cmVhbSkge1xuICAgICAgdGhpcy5tb25pdG9yaW5nRmFjYWRlLm1vbml0b3JLaW5lc2lzRGF0YVN0cmVhbSh7XG4gICAgICAgIHN0cmVhbU5hbWU6IG5vZGUubmFtZSEsXG4gICAgICAgIGFsYXJtRnJpZW5kbHlOYW1lOiBub2RlLm5vZGUucGF0aCxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JLaW5lc2lzRmlyZWhvc2Uobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHMoXG4gICAgICB0aGlzLnByb3BzLmtpbmVzaXNGaXJlaG9zZVxuICAgICk7XG4gICAgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2Yga2luZXNpc2ZpcmVob3NlLkNmbkRlbGl2ZXJ5U3RyZWFtKSB7XG4gICAgICB0aGlzLm1vbml0b3JpbmdGYWNhZGUubW9uaXRvcktpbmVzaXNGaXJlaG9zZSh7XG4gICAgICAgIGRlbGl2ZXJ5U3RyZWFtTmFtZTogbm9kZS5kZWxpdmVyeVN0cmVhbU5hbWUhLFxuICAgICAgICBhbGFybUZyaWVuZGx5TmFtZTogbm9kZS5ub2RlLnBhdGgsXG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb25pdG9yTGFtYmRhKG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKHRoaXMucHJvcHMubGFtYmRhKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiBsYW1iZGEuRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yTGFtYmRhRnVuY3Rpb24oe1xuICAgICAgICBsYW1iZGFGdW5jdGlvbjogbm9kZSxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JPcGVuU2VhcmNoKG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKHRoaXMucHJvcHMub3BlblNlYXJjaCk7XG4gICAgaWYgKFxuICAgICAgaXNFbmFibGVkICYmXG4gICAgICAobm9kZSBpbnN0YW5jZW9mIGVsYXN0aWNzZWFyY2guRG9tYWluIHx8XG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBlbGFzdGljc2VhcmNoLkNmbkRvbWFpbiB8fFxuICAgICAgICBub2RlIGluc3RhbmNlb2Ygb3BlbnNlYXJjaC5Eb21haW4gfHxcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIG9wZW5zZWFyY2guQ2ZuRG9tYWluKVxuICAgICkge1xuICAgICAgdGhpcy5tb25pdG9yaW5nRmFjYWRlLm1vbml0b3JPcGVuU2VhcmNoQ2x1c3Rlcih7XG4gICAgICAgIGRvbWFpbjogbm9kZSxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JSZHMobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHModGhpcy5wcm9wcy5yZHMpO1xuICAgIGlmIChpc0VuYWJsZWQgJiYgbm9kZSBpbnN0YW5jZW9mIHJkcy5EYXRhYmFzZUNsdXN0ZXIpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yUmRzQ2x1c3Rlcih7XG4gICAgICAgIGNsdXN0ZXI6IG5vZGUsXG4gICAgICAgIGFsYXJtRnJpZW5kbHlOYW1lOiBub2RlLm5vZGUucGF0aCxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2YgcmRzLkRhdGFiYXNlSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yUmRzSW5zdGFuY2Uoe1xuICAgICAgICBpbnN0YW5jZTogbm9kZSxcbiAgICAgICAgYWxhcm1GcmllbmRseU5hbWU6IG5vZGUubm9kZS5wYXRoLFxuICAgICAgICAuLi5wcm9wcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9uaXRvclJlZHNoaWZ0KG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKHRoaXMucHJvcHMucmVkc2hpZnQpO1xuICAgIGlmIChpc0VuYWJsZWQgJiYgbm9kZSBpbnN0YW5jZW9mIHJlZHNoaWZ0LkNsdXN0ZXIpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yUmVkc2hpZnRDbHVzdGVyKHtcbiAgICAgICAgY2x1c3RlcklkZW50aWZpZXI6IG5vZGUuY2x1c3Rlck5hbWUsXG4gICAgICAgIGFsYXJtRnJpZW5kbHlOYW1lOiBub2RlLm5vZGUucGF0aCxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JTMyhub2RlOiBJQ29uc3RydWN0KSB7XG4gICAgY29uc3QgW2lzRW5hYmxlZCwgcHJvcHNdID0gdGhpcy5nZXRNb25pdG9yaW5nRGV0YWlscyh0aGlzLnByb3BzLnMzKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiBzMy5CdWNrZXQpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yUzNCdWNrZXQoe1xuICAgICAgICBidWNrZXQ6IG5vZGUsXG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb25pdG9yU2VjcmV0c01hbmFnZXIobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHMoXG4gICAgICB0aGlzLnByb3BzLnNlY3JldHNNYW5hZ2VyXG4gICAgKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiBzZWNyZXRzbWFuYWdlci5TZWNyZXQpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yU2VjcmV0c01hbmFnZXJTZWNyZXQoe1xuICAgICAgICBzZWNyZXQ6IG5vZGUsXG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb25pdG9yU25zKG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKHRoaXMucHJvcHMuc25zKTtcbiAgICBpZiAoaXNFbmFibGVkICYmIG5vZGUgaW5zdGFuY2VvZiBzbnMuVG9waWMpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yU25zVG9waWMoe1xuICAgICAgICB0b3BpYzogbm9kZSxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JTcXMobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHModGhpcy5wcm9wcy5zcXMpO1xuICAgIGlmIChpc0VuYWJsZWQgJiYgbm9kZSBpbnN0YW5jZW9mIHNxcy5RdWV1ZSkge1xuICAgICAgdGhpcy5tb25pdG9yaW5nRmFjYWRlLm1vbml0b3JTcXNRdWV1ZSh7XG4gICAgICAgIHF1ZXVlOiBub2RlLFxuICAgICAgICAuLi5wcm9wcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9uaXRvclN0ZXBGdW5jdGlvbnMobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHMoXG4gICAgICB0aGlzLnByb3BzLnN0ZXBGdW5jdGlvbnNcbiAgICApO1xuICAgIGlmIChpc0VuYWJsZWQgJiYgbm9kZSBpbnN0YW5jZW9mIHN0ZXBmdW5jdGlvbnMuU3RhdGVNYWNoaW5lKSB7XG4gICAgICB0aGlzLm1vbml0b3JpbmdGYWNhZGUubW9uaXRvclN0ZXBGdW5jdGlvbih7XG4gICAgICAgIHN0YXRlTWFjaGluZTogbm9kZSxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JTeW50aGV0aWNzQ2FuYXJpZXMobm9kZTogSUNvbnN0cnVjdCkge1xuICAgIGNvbnN0IFtpc0VuYWJsZWQsIHByb3BzXSA9IHRoaXMuZ2V0TW9uaXRvcmluZ0RldGFpbHMoXG4gICAgICB0aGlzLnByb3BzLnN5bnRoZXRpY3NDYW5hcmllc1xuICAgICk7XG4gICAgaWYgKGlzRW5hYmxlZCAmJiBub2RlIGluc3RhbmNlb2Ygc3ludGhldGljcy5DYW5hcnkpIHtcbiAgICAgIHRoaXMubW9uaXRvcmluZ0ZhY2FkZS5tb25pdG9yU3ludGhldGljc0NhbmFyeSh7XG4gICAgICAgIGNhbmFyeTogbm9kZSxcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JXZWJBcHBsaWNhdGlvbkZpcmV3YWxsVjJBY2xzKG5vZGU6IElDb25zdHJ1Y3QpIHtcbiAgICBjb25zdCBbaXNFbmFibGVkLCBwcm9wc10gPSB0aGlzLmdldE1vbml0b3JpbmdEZXRhaWxzKFxuICAgICAgdGhpcy5wcm9wcy53ZWJBcHBsaWNhdGlvbkZpcmV3YWxsQWNsVjJcbiAgICApO1xuICAgIGlmIChpc0VuYWJsZWQgJiYgbm9kZSBpbnN0YW5jZW9mIHdhZnYyLkNmbldlYkFDTCkge1xuICAgICAgdGhpcy5tb25pdG9yaW5nRmFjYWRlLm1vbml0b3JXZWJBcHBsaWNhdGlvbkZpcmV3YWxsQWNsVjIoe1xuICAgICAgICBhY2w6IG5vZGUsXG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=