"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringFacade = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const MonitoringAspect_1 = require("./MonitoringAspect");
const common_1 = require("../common");
const dashboard_1 = require("../dashboard");
const DynamicDashboardSegment_1 = require("../dashboard/DynamicDashboardSegment");
const monitoring_1 = require("../monitoring");
/**
 * An implementation of a {@link MonitoringScope}.
 *
 * This is a convenient main entrypoint to monitor resources.
 *
 * Provides methods for retrieving and creating alarms based on added segments that are subclasses of
 * {@link Monitoring}.
 */
class MonitoringFacade extends common_1.MonitoringScope {
    constructor(scope, id, props) {
        super(scope, id);
        this.metricFactoryDefaults = props?.metricFactoryDefaults ?? {};
        this.alarmFactoryDefaults = props?.alarmFactoryDefaults ?? {
            alarmNamePrefix: id,
            actionsEnabled: true,
        };
        this.dashboardFactory =
            props?.dashboardFactory ??
                new dashboard_1.DefaultDashboardFactory(this, `${id}-Dashboards`, {
                    dashboardNamePrefix: id,
                });
        this.createdSegments = [];
    }
    // FACTORIES
    // =========
    createAlarmFactory(alarmNamePrefix) {
        return new common_1.AlarmFactory(this, {
            globalAlarmDefaults: this.alarmFactoryDefaults,
            globalMetricDefaults: this.metricFactoryDefaults,
            localAlarmNamePrefix: alarmNamePrefix,
        });
    }
    createAwsConsoleUrlFactory() {
        const stack = aws_cdk_lib_1.Stack.of(this);
        const awsAccountId = this.metricFactoryDefaults.account ?? stack.account;
        const awsAccountRegion = this.metricFactoryDefaults.region ?? stack.region;
        return new common_1.AwsConsoleUrlFactory({ awsAccountRegion, awsAccountId });
    }
    createMetricFactory() {
        return new common_1.MetricFactory({ globalDefaults: this.metricFactoryDefaults });
    }
    createWidgetFactory() {
        return new dashboard_1.DefaultWidgetFactory();
    }
    // GENERIC
    // =======
    /**
     * Adds a dashboard segment which returns dynamic content depending on dashboard type.
     *
     * @param segment dynamic segment to add.
     */
    addDynamicSegment(segment) {
        this.dashboardFactory?.addDynamicSegment(segment);
        this.createdSegments.push(segment);
        return this;
    }
    /**
     * Adds a dashboard segment to go on one of the {@link DefaultDashboards}.
     *
     * @param segment segment to add
     * @param overrideProps props to specify which default dashboards this segment is added to.
     */
    addSegment(segment, overrideProps) {
        const adaptedSegment = new DynamicDashboardSegment_1.StaticSegmentDynamicAdapter({
            segment,
            overrideProps,
        });
        this.dashboardFactory?.addDynamicSegment(adaptedSegment);
        this.createdSegments.push(segment);
        return this;
    }
    /**
     * @deprecated - prefer calling dashboardFactory.getDashboard directly.
     *
     * @returns default detail dashboard
     */
    createdDashboard() {
        return this.dashboardFactory?.getDashboard(dashboard_1.DefaultDashboards.DETAIL);
    }
    /**
     * @deprecated - prefer calling dashboardFactory.getDashboard directly.
     *
     * @returns default summary dashboard
     */
    createdSummaryDashboard() {
        return this.dashboardFactory?.getDashboard(dashboard_1.DefaultDashboards.SUMMARY);
    }
    /**
     * @deprecated - prefer calling dashboardFactory.getDashboard directly.
     *
     * @returns default alarms dashboard
     */
    createdAlarmDashboard() {
        return this.dashboardFactory?.getDashboard(dashboard_1.DefaultDashboards.ALARMS);
    }
    /**
     * Returns the created alarms across all added segments that subclass {@link Monitoring}
     * added up until now.
     */
    createdAlarms() {
        return this.createdMonitorings().flatMap((monitoring) => monitoring.createdAlarms());
    }
    /**
     * Returns a subset of created alarms that are marked by a specific custom tag.
     *
     * @param customTag tag to filter alarms by
     */
    createdAlarmsWithTag(customTag) {
        return this.createdAlarms().filter((alarm) => alarm.customTags?.includes(customTag));
    }
    /**
     * Returns a subset of created alarms that are marked by a specific disambiguator.
     *
     * @param disambiguator disambiguator to filter alarms by
     */
    createdAlarmsWithDisambiguator(disambiguator) {
        return this.createdAlarms().filter((alarm) => alarm.disambiguator === disambiguator);
    }
    /**
     * Returns the added segments that subclass {@link Monitoring}.
     */
    createdMonitorings() {
        return this.createdSegments
            .filter((s) => s instanceof common_1.Monitoring)
            .map((s) => s);
    }
    // COMPOSITE ALARM CREATORS
    // ========================
    /**
     * Finds a subset of created alarms that are marked by a specific custom tag and creates a composite alarm.
     * This composite alarm is created with an 'OR' condition, so it triggers with any child alarm.
     * NOTE: This composite alarm is not added among other alarms, so it is not returned by createdAlarms() calls.
     *
     * @param customTag tag to filter alarms by
     * @param props customization options
     */
    createCompositeAlarmUsingTag(customTag, props) {
        const alarms = this.createdAlarmsWithTag(customTag);
        if (alarms.length > 0) {
            const disambiguator = props?.disambiguator ?? customTag;
            const alarmFactory = this.createAlarmFactory("Composite");
            return alarmFactory.addCompositeAlarm(alarms, {
                ...(props ?? {}),
                disambiguator,
            });
        }
        return undefined;
    }
    /**
     * Finds a subset of created alarms that are marked by a specific disambiguator and creates a composite alarm.
     * This composite alarm is created with an 'OR' condition, so it triggers with any child alarm.
     * NOTE: This composite alarm is not added among other alarms, so it is not returned by createdAlarms() calls.
     *
     * @param alarmDisambiguator disambiguator to filter alarms by
     * @param props customization options
     */
    createCompositeAlarmUsingDisambiguator(alarmDisambiguator, props) {
        const alarms = this.createdAlarmsWithDisambiguator(alarmDisambiguator);
        if (alarms.length > 0) {
            const disambiguator = props?.disambiguator ?? alarmDisambiguator;
            const alarmFactory = this.createAlarmFactory("Composite");
            return alarmFactory.addCompositeAlarm(alarms, {
                ...(props ?? {}),
                disambiguator,
            });
        }
        return undefined;
    }
    // BASIC WIDGETS
    // =============
    addLargeHeader(text, addToSummary, addToAlarm) {
        this.addWidget(new dashboard_1.HeaderWidget(text, dashboard_1.HeaderLevel.LARGE), addToSummary ?? false, addToAlarm ?? false);
        return this;
    }
    addMediumHeader(text, addToSummary, addToAlarm) {
        this.addWidget(new dashboard_1.HeaderWidget(text, dashboard_1.HeaderLevel.MEDIUM), addToSummary ?? false, addToAlarm ?? false);
        return this;
    }
    addSmallHeader(text, addToSummary, addToAlarm) {
        this.addWidget(new dashboard_1.HeaderWidget(text, dashboard_1.HeaderLevel.SMALL), addToSummary ?? false, addToAlarm ?? false);
        return this;
    }
    addWidget(widget, addToSummary, addToAlarm) {
        this.addSegment(new dashboard_1.SingleWidgetDashboardSegment(widget), {
            addToAlarmDashboard: addToAlarm ?? true,
            addToSummaryDashboard: addToSummary ?? true,
            addToDetailDashboard: true,
        });
        return this;
    }
    // RESOURCE MONITORING
    // ===================
    /**
     * Uses an aspect to automatically monitor all resources in the given scope.
     *
     * @param scope Scope with resources to monitor.
     * @param aspectProps Optional configuration.
     *
     * @experimental
     */
    monitorScope(scope, aspectProps) {
        const aspect = new MonitoringAspect_1.MonitoringAspect(this, aspectProps);
        aws_cdk_lib_1.Aspects.of(scope).add(aspect);
        return this;
    }
    monitorApiGateway(props) {
        const segment = new monitoring_1.ApiGatewayMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorApiGatewayV2HttpApi(props) {
        const segment = new monitoring_1.ApiGatewayV2HttpApiMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorAppSyncApi(props) {
        const segment = new monitoring_1.AppSyncMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorAuroraCluster(props) {
        const segment = new monitoring_1.AuroraClusterMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorCertificate(props) {
        const segment = new monitoring_1.CertificateManagerMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorCloudFrontDistribution(props) {
        const segment = new monitoring_1.CloudFrontDistributionMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorCodeBuildProject(props) {
        const segment = new monitoring_1.CodeBuildProjectMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorDocumentDbCluster(props) {
        const segment = new monitoring_1.DocumentDbMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorDynamoTable(props) {
        const segment = new monitoring_1.DynamoTableMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorDynamoTableGlobalSecondaryIndex(props) {
        const segment = new monitoring_1.DynamoTableGlobalSecondaryIndexMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorEC2Instances(props) {
        const segment = new monitoring_1.EC2Monitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorElasticsearchCluster(props) {
        const segment = new monitoring_1.OpenSearchClusterMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorOpenSearchCluster(props) {
        const segment = new monitoring_1.OpenSearchClusterMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorElastiCacheCluster(props) {
        const segment = new monitoring_1.ElastiCacheClusterMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorGlueJob(props) {
        const segment = new monitoring_1.GlueJobMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorFargateService(props) {
        const segment = new monitoring_1.FargateServiceMonitoring(this, {
            ...props,
            fargateService: props.fargateService.service,
            loadBalancer: props.fargateService.loadBalancer,
            targetGroup: props.fargateService.targetGroup,
        });
        this.addSegment(segment, props);
        return this;
    }
    monitorSimpleFargateService(props) {
        const segment = new monitoring_1.FargateServiceMonitoring(this, {
            ...props,
            fargateService: props.fargateService,
        });
        this.addSegment(segment, props);
        return this;
    }
    monitorFargateNetworkLoadBalancer(props) {
        const segment = new monitoring_1.FargateServiceMonitoring(this, {
            ...props,
            fargateService: props.fargateService,
            loadBalancer: props.networkLoadBalancer,
            targetGroup: props.networkTargetGroup,
        });
        this.addSegment(segment, props);
        return this;
    }
    monitorFargateApplicationLoadBalancer(props) {
        const segment = new monitoring_1.FargateServiceMonitoring(this, {
            ...props,
            fargateService: props.fargateService,
            loadBalancer: props.applicationLoadBalancer,
            targetGroup: props.applicationTargetGroup,
        });
        this.addSegment(segment, props);
        return this;
    }
    monitorEc2Service(props) {
        const segment = new monitoring_1.Ec2ServiceMonitoring(this, {
            ...props,
            ec2Service: props.ec2Service.service,
            loadBalancer: props.ec2Service.loadBalancer,
            targetGroup: props.ec2Service.targetGroup,
        });
        this.addSegment(segment, props);
        return this;
    }
    monitorSimpleEc2Service(props) {
        const segment = new monitoring_1.Ec2ServiceMonitoring(this, {
            ...props,
            ec2Service: props.ec2Service,
        });
        this.addSegment(segment, props);
        return this;
    }
    monitorEc2NetworkLoadBalancer(props) {
        const segment = new monitoring_1.Ec2ServiceMonitoring(this, {
            ...props,
            ec2Service: props.ec2Service,
            loadBalancer: props.networkLoadBalancer,
            targetGroup: props.networkTargetGroup,
        });
        this.addSegment(segment, props);
        return this;
    }
    monitorEc2ApplicationLoadBalancer(props) {
        const segment = new monitoring_1.Ec2ServiceMonitoring(this, {
            ...props,
            ec2Service: props.ec2Service,
            loadBalancer: props.applicationLoadBalancer,
            targetGroup: props.applicationTargetGroup,
        });
        this.addSegment(segment, props);
        return this;
    }
    monitorQueueProcessingFargateService(props) {
        monitoring_1.getQueueProcessingFargateServiceMonitoring(this, props).forEach((segment) => this.addSegment(segment));
        return this;
    }
    monitorQueueProcessingEc2Service(props) {
        monitoring_1.getQueueProcessingEc2ServiceMonitoring(this, props).forEach((segment) => this.addSegment(segment));
        return this;
    }
    monitorAutoScalingGroup(props) {
        const segment = new monitoring_1.AutoScalingGroupMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorKinesisFirehose(props) {
        const segment = new monitoring_1.KinesisFirehoseMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorKinesisDataStream(props) {
        const segment = new monitoring_1.KinesisDataStreamMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorKinesisDataAnalytics(props) {
        const segment = new monitoring_1.KinesisDataAnalyticsMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorLambdaFunction(props) {
        const segment = new monitoring_1.LambdaFunctionMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorNetworkLoadBalancer(props) {
        const segment = new monitoring_1.NetworkLoadBalancerMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorRdsCluster(props) {
        const segment = new monitoring_1.RdsClusterMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorRdsInstance(props) {
        const segment = new monitoring_1.RdsInstanceMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorRedshiftCluster(props) {
        const segment = new monitoring_1.RedshiftClusterMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorSecretsManager(props) {
        const segment = new monitoring_1.SecretsManagerMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorSecretsManagerSecret(props) {
        const segment = new monitoring_1.SecretsManagerSecretMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorSnsTopic(props) {
        const segment = new monitoring_1.SnsTopicMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorSqsQueue(props) {
        const segment = new monitoring_1.SqsQueueMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorSqsQueueWithDlq(props) {
        const segment = new monitoring_1.SqsQueueMonitoringWithDlq(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorStepFunction(props) {
        const segment = new monitoring_1.StepFunctionMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorStepFunctionActivity(props) {
        const segment = new monitoring_1.StepFunctionActivityMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorStepFunctionLambdaIntegration(props) {
        const segment = new monitoring_1.StepFunctionLambdaIntegrationMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorStepFunctionServiceIntegration(props) {
        const segment = new monitoring_1.StepFunctionServiceIntegrationMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorS3Bucket(props) {
        const segment = new monitoring_1.S3BucketMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorLog(props) {
        const segment = new monitoring_1.LogMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorSyntheticsCanary(props) {
        const segment = new monitoring_1.SyntheticsCanaryMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorWebApplicationFirewallAclV2(props) {
        const segment = new monitoring_1.WafV2Monitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorBilling(props) {
        const segment = new monitoring_1.BillingMonitoring(this, props ?? {});
        this.addSegment(segment, props);
        return this;
    }
    monitorCustom(props) {
        const segment = new monitoring_1.CustomMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
    monitorFluentBit(props) {
        const segment = new monitoring_1.FluentBitMonitoring(this, props);
        this.addSegment(segment, props);
        return this;
    }
}
exports.MonitoringFacade = MonitoringFacade;
_a = JSII_RTTI_SYMBOL_1;
MonitoringFacade[_a] = { fqn: "cdk-monitoring-constructs.MonitoringFacade", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uaXRvcmluZ0ZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1vbml0b3JpbmdGYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2Q0FBNkM7QUFLN0MseURBQXNEO0FBQ3RELHNDQVVtQjtBQUNuQiw0Q0FVc0I7QUFDdEIsa0ZBRzhDO0FBRTlDLDhDQTZGdUI7QUF5QnZCOzs7Ozs7O0dBT0c7QUFDSCxNQUFhLGdCQUFpQixTQUFRLHdCQUFlO0lBU25ELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBNkI7UUFDckUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxFQUFFLHFCQUFxQixJQUFJLEVBQUUsQ0FBQztRQUNoRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxFQUFFLG9CQUFvQixJQUFJO1lBQ3pELGVBQWUsRUFBRSxFQUFFO1lBQ25CLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCO1lBQ25CLEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCLElBQUksbUNBQXVCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUU7b0JBQ3BELG1CQUFtQixFQUFFLEVBQUU7aUJBQ3hCLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUFZO0lBQ1osWUFBWTtJQUVaLGtCQUFrQixDQUFDLGVBQXVCO1FBQ3hDLE9BQU8sSUFBSSxxQkFBWSxDQUFDLElBQUksRUFBRTtZQUM1QixtQkFBbUIsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQzlDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxxQkFBcUI7WUFDaEQsb0JBQW9CLEVBQUUsZUFBZTtTQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMEJBQTBCO1FBQ3hCLE1BQU0sS0FBSyxH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RUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBNEI7UUFDeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSw2QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBK0I7UUFDOUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQ0FBbUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztBQWhvQkgsNENBaW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzcGVjdHMsIFN0YWNrIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBDb21wb3NpdGVBbGFybSwgRGFzaGJvYXJkLCBJV2lkZ2V0IH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuXG5pbXBvcnQgeyBNb25pdG9yaW5nQXNwZWN0UHJvcHMgfSBmcm9tIFwiLi9JTW9uaXRvcmluZ0FzcGVjdFwiO1xuaW1wb3J0IHsgTW9uaXRvcmluZ0FzcGVjdCB9IGZyb20gXCIuL01vbml0b3JpbmdBc3BlY3RcIjtcbmltcG9ydCB7XG4gIEFkZENvbXBvc2l0ZUFsYXJtUHJvcHMsXG4gIEFsYXJtRmFjdG9yeSxcbiAgQWxhcm1GYWN0b3J5RGVmYXVsdHMsXG4gIEFsYXJtV2l0aEFubm90YXRpb24sXG4gIEF3c0NvbnNvbGVVcmxGYWN0b3J5LFxuICBNZXRyaWNGYWN0b3J5LFxuICBNZXRyaWNGYWN0b3J5RGVmYXVsdHMsXG4gIE1vbml0b3JpbmcsXG4gIE1vbml0b3JpbmdTY29wZSxcbn0gZnJvbSBcIi4uL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgRGVmYXVsdERhc2hib2FyZEZhY3RvcnksXG4gIERlZmF1bHREYXNoYm9hcmRzLFxuICBEZWZhdWx0V2lkZ2V0RmFjdG9yeSxcbiAgSGVhZGVyTGV2ZWwsXG4gIEhlYWRlcldpZGdldCxcbiAgSURhc2hib2FyZFNlZ21lbnQsXG4gIElXaWRnZXRGYWN0b3J5LFxuICBNb25pdG9yaW5nRGFzaGJvYXJkc092ZXJyaWRlUHJvcHMsXG4gIFNpbmdsZVdpZGdldERhc2hib2FyZFNlZ21lbnQsXG59IGZyb20gXCIuLi9kYXNoYm9hcmRcIjtcbmltcG9ydCB7XG4gIElEeW5hbWljRGFzaGJvYXJkU2VnbWVudCxcbiAgU3RhdGljU2VnbWVudER5bmFtaWNBZGFwdGVyLFxufSBmcm9tIFwiLi4vZGFzaGJvYXJkL0R5bmFtaWNEYXNoYm9hcmRTZWdtZW50XCI7XG5pbXBvcnQgeyBJRHluYW1pY0Rhc2hib2FyZEZhY3RvcnkgfSBmcm9tIFwiLi4vZGFzaGJvYXJkL0lEeW5hbWljRGFzaGJvYXJkRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgQXBpR2F0ZXdheU1vbml0b3JpbmcsXG4gIEFwaUdhdGV3YXlNb25pdG9yaW5nUHJvcHMsXG4gIEFwaUdhdGV3YXlWMkh0dHBBcGlNb25pdG9yaW5nLFxuICBBcGlHYXRld2F5VjJIdHRwQXBpTW9uaXRvcmluZ1Byb3BzLFxuICBBcHBTeW5jTW9uaXRvcmluZyxcbiAgQXBwU3luY01vbml0b3JpbmdQcm9wcyxcbiAgQXVyb3JhQ2x1c3Rlck1vbml0b3JpbmcsXG4gIEF1cm9yYUNsdXN0ZXJNb25pdG9yaW5nUHJvcHMsXG4gIEF1dG9TY2FsaW5nR3JvdXBNb25pdG9yaW5nLFxuICBBdXRvU2NhbGluZ0dyb3VwTW9uaXRvcmluZ1Byb3BzLFxuICBCaWxsaW5nTW9uaXRvcmluZyxcbiAgQmlsbGluZ01vbml0b3JpbmdQcm9wcyxcbiAgQ2VydGlmaWNhdGVNYW5hZ2VyTW9uaXRvcmluZyxcbiAgQ2VydGlmaWNhdGVNYW5hZ2VyTW9uaXRvcmluZ1Byb3BzLFxuICBDbG91ZEZyb250RGlzdHJpYnV0aW9uTW9uaXRvcmluZyxcbiAgQ2xvdWRGcm9udERpc3RyaWJ1dGlvbk1vbml0b3JpbmdQcm9wcyxcbiAgQ29kZUJ1aWxkUHJvamVjdE1vbml0b3JpbmcsXG4gIENvZGVCdWlsZFByb2plY3RNb25pdG9yaW5nUHJvcHMsXG4gIEN1c3RvbU1vbml0b3JpbmcsXG4gIEN1c3RvbU1vbml0b3JpbmdQcm9wcyxcbiAgRG9jdW1lbnREYk1vbml0b3JpbmcsXG4gIERvY3VtZW50RGJNb25pdG9yaW5nUHJvcHMsXG4gIER5bmFtb1RhYmxlR2xvYmFsU2Vjb25kYXJ5SW5kZXhNb25pdG9yaW5nLFxuICBEeW5hbW9UYWJsZUdsb2JhbFNlY29uZGFyeUluZGV4TW9uaXRvcmluZ1Byb3BzLFxuICBEeW5hbW9UYWJsZU1vbml0b3JpbmcsXG4gIER5bmFtb1RhYmxlTW9uaXRvcmluZ1Byb3BzLFxuICBFYzJBcHBsaWNhdGlvbkxvYWRCYWxhbmNlck1vbml0b3JpbmdQcm9wcyxcbiAgRUMyTW9uaXRvcmluZyxcbiAgRUMyTW9uaXRvcmluZ1Byb3BzLFxuICBFYzJOZXR3b3JrTG9hZEJhbGFuY2VyTW9uaXRvcmluZ1Byb3BzLFxuICBFYzJTZXJ2aWNlTW9uaXRvcmluZyxcbiAgRWMyU2VydmljZU1vbml0b3JpbmdQcm9wcyxcbiAgRWxhc3RpQ2FjaGVDbHVzdGVyTW9uaXRvcmluZyxcbiAgRWxhc3RpQ2FjaGVDbHVzdGVyTW9uaXRvcmluZ1Byb3BzLFxuICBGYXJnYXRlQXBwbGljYXRpb25Mb2FkQmFsYW5jZXJNb25pdG9yaW5nUHJvcHMsXG4gIEZhcmdhdGVOZXR3b3JrTG9hZEJhbGFuY2VyTW9uaXRvcmluZ1Byb3BzLFxuICBGYXJnYXRlU2VydmljZU1vbml0b3JpbmcsXG4gIEZhcmdhdGVTZXJ2aWNlTW9uaXRvcmluZ1Byb3BzLFxuICBGbHVlbnRCaXRNb25pdG9yaW5nLFxuICBGbHVlbnRCaXRNb25pdG9yaW5nUHJvcHMsXG4gIGdldFF1ZXVlUHJvY2Vzc2luZ0VjMlNlcnZpY2VNb25pdG9yaW5nLFxuICBnZXRRdWV1ZVByb2Nlc3NpbmdGYXJnYXRlU2VydmljZU1vbml0b3JpbmcsXG4gIEdsdWVKb2JNb25pdG9yaW5nLFxuICBHbHVlSm9iTW9uaXRvcmluZ1Byb3BzLFxuICBLaW5lc2lzRGF0YUFuYWx5dGljc01vbml0b3JpbmcsXG4gIEtpbmVzaXNEYXRhQW5hbHl0aWNzTW9uaXRvcmluZ1Byb3BzLFxuICBLaW5lc2lzRGF0YVN0cmVhbU1vbml0b3JpbmcsXG4gIEtpbmVzaXNEYXRhU3RyZWFtTW9uaXRvcmluZ1Byb3BzLFxuICBLaW5lc2lzRmlyZWhvc2VNb25pdG9yaW5nLFxuICBLaW5lc2lzRmlyZWhvc2VNb25pdG9yaW5nUHJvcHMsXG4gIExhbWJkYUZ1bmN0aW9uTW9uaXRvcmluZyxcbiAgTGFtYmRhRnVuY3Rpb25Nb25pdG9yaW5nUHJvcHMsXG4gIExvZ01vbml0b3JpbmcsXG4gIExvZ01vbml0b3JpbmdQcm9wcyxcbiAgTmV0d29ya0xvYWRCYWxhbmNlck1vbml0b3JpbmcsXG4gIE5ldHdvcmtMb2FkQmFsYW5jZXJNb25pdG9yaW5nUHJvcHMsXG4gIE9wZW5TZWFyY2hDbHVzdGVyTW9uaXRvcmluZyxcbiAgT3BlblNlYXJjaENsdXN0ZXJNb25pdG9yaW5nUHJvcHMsXG4gIFF1ZXVlUHJvY2Vzc2luZ0VjMlNlcnZpY2VNb25pdG9yaW5nUHJvcHMsXG4gIFF1ZXVlUHJvY2Vzc2luZ0ZhcmdhdGVTZXJ2aWNlTW9uaXRvcmluZ1Byb3BzLFxuICBSZHNDbHVzdGVyTW9uaXRvcmluZyxcbiAgUmRzQ2x1c3Rlck1vbml0b3JpbmdQcm9wcyxcbiAgUmRzSW5zdGFuY2VNb25pdG9yaW5nLFxuICBSZHNJbnN0YW5jZU1vbml0b3JpbmdQcm9wcyxcbiAgUmVkc2hpZnRDbHVzdGVyTW9uaXRvcmluZyxcbiAgUmVkc2hpZnRDbHVzdGVyTW9uaXRvcmluZ1Byb3BzLFxuICBTM0J1Y2tldE1vbml0b3JpbmcsXG4gIFMzQnVja2V0TW9uaXRvcmluZ1Byb3BzLFxuICBTZWNyZXRzTWFuYWdlck1vbml0b3JpbmcsXG4gIFNlY3JldHNNYW5hZ2VyTW9uaXRvcmluZ1Byb3BzLFxuICBTZWNyZXRzTWFuYWdlclNlY3JldE1vbml0b3JpbmcsXG4gIFNlY3JldHNNYW5hZ2VyU2VjcmV0TW9uaXRvcmluZ1Byb3BzLFxuICBTaW1wbGVFYzJTZXJ2aWNlTW9uaXRvcmluZ1Byb3BzLFxuICBTaW1wbGVGYXJnYXRlU2VydmljZU1vbml0b3JpbmdQcm9wcyxcbiAgU25zVG9waWNNb25pdG9yaW5nLFxuICBTbnNUb3BpY01vbml0b3JpbmdQcm9wcyxcbiAgU3FzUXVldWVNb25pdG9yaW5nLFxuICBTcXNRdWV1ZU1vbml0b3JpbmdQcm9wcyxcbiAgU3FzUXVldWVNb25pdG9yaW5nV2l0aERscSxcbiAgU3FzUXVldWVNb25pdG9yaW5nV2l0aERscVByb3BzLFxuICBTdGVwRnVuY3Rpb25BY3Rpdml0eU1vbml0b3JpbmcsXG4gIFN0ZXBGdW5jdGlvbkFjdGl2aXR5TW9uaXRvcmluZ1Byb3BzLFxuICBTdGVwRnVuY3Rpb25MYW1iZGFJbnRlZ3JhdGlvbk1vbml0b3JpbmcsXG4gIFN0ZXBGdW5jdGlvbkxhbWJkYUludGVncmF0aW9uTW9uaXRvcmluZ1Byb3BzLFxuICBTdGVwRnVuY3Rpb25Nb25pdG9yaW5nLFxuICBTdGVwRnVuY3Rpb25Nb25pdG9yaW5nUHJvcHMsXG4gIFN0ZXBGdW5jdGlvblNlcnZpY2VJbnRlZ3JhdGlvbk1vbml0b3JpbmcsXG4gIFN0ZXBGdW5jdGlvblNlcnZpY2VJbnRlZ3JhdGlvbk1vbml0b3JpbmdQcm9wcyxcbiAgU3ludGhldGljc0NhbmFyeU1vbml0b3JpbmcsXG4gIFN5bnRoZXRpY3NDYW5hcnlNb25pdG9yaW5nUHJvcHMsXG4gIFdhZlYyTW9uaXRvcmluZyxcbiAgV2FmVjJNb25pdG9yaW5nUHJvcHMsXG59IGZyb20gXCIuLi9tb25pdG9yaW5nXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9uaXRvcmluZ0ZhY2FkZVByb3BzIHtcbiAgLyoqXG4gICAqIERlZmF1bHRzIGZvciBtZXRyaWMgZmFjdG9yeS5cbiAgICpcbiAgICogQGRlZmF1bHQgLSBlbXB0eSAobm8gcHJlZmVyZW5jZXMpXG4gICAqL1xuICByZWFkb25seSBtZXRyaWNGYWN0b3J5RGVmYXVsdHM/OiBNZXRyaWNGYWN0b3J5RGVmYXVsdHM7XG5cbiAgLyoqXG4gICAqIERlZmF1bHRzIGZvciBhbGFybSBmYWN0b3J5LlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIGFjdGlvbnMgZW5hYmxlZCwgZmFjYWRlIGxvZ2ljYWwgSUQgdXNlZCBhcyBkZWZhdWx0IGFsYXJtIG5hbWUgcHJlZml4XG4gICAqL1xuICByZWFkb25seSBhbGFybUZhY3RvcnlEZWZhdWx0cz86IEFsYXJtRmFjdG9yeURlZmF1bHRzO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0cyBmb3IgZGFzaGJvYXJkIGZhY3RvcnkuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIER5bmFtaWNEYXNoYm9hcmRGYWN0b3J5fTsgZmFjYWRlIGxvZ2ljYWwgSUQgdXNlZCBhcyBkZWZhdWx0IG5hbWVcbiAgICovXG4gIHJlYWRvbmx5IGRhc2hib2FyZEZhY3Rvcnk/OiBJRHluYW1pY0Rhc2hib2FyZEZhY3Rvcnk7XG59XG5cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTW9uaXRvcmluZ1Njb3BlfS5cbiAqXG4gKiBUaGlzIGlzIGEgY29udmVuaWVudCBtYWluIGVudHJ5cG9pbnQgdG8gbW9uaXRvciByZXNvdXJjZXMuXG4gKlxuICogUHJvdmlkZXMgbWV0aG9kcyBmb3IgcmV0cmlldmluZyBhbmQgY3JlYXRpbmcgYWxhcm1zIGJhc2VkIG9uIGFkZGVkIHNlZ21lbnRzIHRoYXQgYXJlIHN1YmNsYXNzZXMgb2ZcbiAqIHtAbGluayBNb25pdG9yaW5nfS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vbml0b3JpbmdGYWNhZGUgZXh0ZW5kcyBNb25pdG9yaW5nU2NvcGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWV0cmljRmFjdG9yeURlZmF1bHRzOiBNZXRyaWNGYWN0b3J5RGVmYXVsdHM7XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGFybUZhY3RvcnlEZWZhdWx0czogQWxhcm1GYWN0b3J5RGVmYXVsdHM7XG4gIHB1YmxpYyByZWFkb25seSBkYXNoYm9hcmRGYWN0b3J5PzogSUR5bmFtaWNEYXNoYm9hcmRGYWN0b3J5O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY3JlYXRlZFNlZ21lbnRzOiAoXG4gICAgfCBJRGFzaGJvYXJkU2VnbWVudFxuICAgIHwgSUR5bmFtaWNEYXNoYm9hcmRTZWdtZW50XG4gIClbXTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IE1vbml0b3JpbmdGYWNhZGVQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICB0aGlzLm1ldHJpY0ZhY3RvcnlEZWZhdWx0cyA9IHByb3BzPy5tZXRyaWNGYWN0b3J5RGVmYXVsdHMgPz8ge307XG4gICAgdGhpcy5hbGFybUZhY3RvcnlEZWZhdWx0cyA9IHByb3BzPy5hbGFybUZhY3RvcnlEZWZhdWx0cyA/PyB7XG4gICAgICBhbGFybU5hbWVQcmVmaXg6IGlkLFxuICAgICAgYWN0aW9uc0VuYWJsZWQ6IHRydWUsXG4gICAgfTtcbiAgICB0aGlzLmRhc2hib2FyZEZhY3RvcnkgPVxuICAgICAgcHJvcHM/LmRhc2hib2FyZEZhY3RvcnkgPz9cbiAgICAgIG5ldyBEZWZhdWx0RGFzaGJvYXJkRmFjdG9yeSh0aGlzLCBgJHtpZH0tRGFzaGJvYXJkc2AsIHtcbiAgICAgICAgZGFzaGJvYXJkTmFtZVByZWZpeDogaWQsXG4gICAgICB9KTtcblxuICAgIHRoaXMuY3JlYXRlZFNlZ21lbnRzID0gW107XG4gIH1cblxuICAvLyBGQUNUT1JJRVNcbiAgLy8gPT09PT09PT09XG5cbiAgY3JlYXRlQWxhcm1GYWN0b3J5KGFsYXJtTmFtZVByZWZpeDogc3RyaW5nKTogQWxhcm1GYWN0b3J5IHtcbiAgICByZXR1cm4gbmV3IEFsYXJtRmFjdG9yeSh0aGlzLCB7XG4gICAgICBnbG9iYWxBbGFybURlZmF1bHRzOiB0aGlzLmFsYXJtRmFjdG9yeURlZmF1bHRzLFxuICAgICAgZ2xvYmFsTWV0cmljRGVmYXVsdHM6IHRoaXMubWV0cmljRmFjdG9yeURlZmF1bHRzLFxuICAgICAgbG9jYWxBbGFybU5hbWVQcmVmaXg6IGFsYXJtTmFtZVByZWZpeCxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUF3c0NvbnNvbGVVcmxGYWN0b3J5KCk6IEF3c0NvbnNvbGVVcmxGYWN0b3J5IHtcbiAgICBjb25zdCBzdGFjayA9IFN0YWNrLm9mKHRoaXMpO1xuICAgIGNvbnN0IGF3c0FjY291bnRJZCA9IHRoaXMubWV0cmljRmFjdG9yeURlZmF1bHRzLmFjY291bnQgPz8gc3RhY2suYWNjb3VudDtcbiAgICBjb25zdCBhd3NBY2NvdW50UmVnaW9uID0gdGhpcy5tZXRyaWNGYWN0b3J5RGVmYXVsdHMucmVnaW9uID8/IHN0YWNrLnJlZ2lvbjtcbiAgICByZXR1cm4gbmV3IEF3c0NvbnNvbGVVcmxGYWN0b3J5KHsgYXdzQWNjb3VudFJlZ2lvbiwgYXdzQWNjb3VudElkIH0pO1xuICB9XG5cbiAgY3JlYXRlTWV0cmljRmFjdG9yeSgpOiBNZXRyaWNGYWN0b3J5IHtcbiAgICByZXR1cm4gbmV3IE1ldHJpY0ZhY3RvcnkoeyBnbG9iYWxEZWZhdWx0czogdGhpcy5tZXRyaWNGYWN0b3J5RGVmYXVsdHMgfSk7XG4gIH1cblxuICBjcmVhdGVXaWRnZXRGYWN0b3J5KCk6IElXaWRnZXRGYWN0b3J5IHtcbiAgICByZXR1cm4gbmV3IERlZmF1bHRXaWRnZXRGYWN0b3J5KCk7XG4gIH1cblxuICAvLyBHRU5FUklDXG4gIC8vID09PT09PT1cblxuICAvKipcbiAgICogQWRkcyBhIGRhc2hib2FyZCBzZWdtZW50IHdoaWNoIHJldHVybnMgZHluYW1pYyBjb250ZW50IGRlcGVuZGluZyBvbiBkYXNoYm9hcmQgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHNlZ21lbnQgZHluYW1pYyBzZWdtZW50IHRvIGFkZC5cbiAgICovXG4gIGFkZER5bmFtaWNTZWdtZW50KHNlZ21lbnQ6IElEeW5hbWljRGFzaGJvYXJkU2VnbWVudCk6IHRoaXMge1xuICAgIHRoaXMuZGFzaGJvYXJkRmFjdG9yeT8uYWRkRHluYW1pY1NlZ21lbnQoc2VnbWVudCk7XG4gICAgdGhpcy5jcmVhdGVkU2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgZGFzaGJvYXJkIHNlZ21lbnQgdG8gZ28gb24gb25lIG9mIHRoZSB7QGxpbmsgRGVmYXVsdERhc2hib2FyZHN9LlxuICAgKlxuICAgKiBAcGFyYW0gc2VnbWVudCBzZWdtZW50IHRvIGFkZFxuICAgKiBAcGFyYW0gb3ZlcnJpZGVQcm9wcyBwcm9wcyB0byBzcGVjaWZ5IHdoaWNoIGRlZmF1bHQgZGFzaGJvYXJkcyB0aGlzIHNlZ21lbnQgaXMgYWRkZWQgdG8uXG4gICAqL1xuICBhZGRTZWdtZW50KFxuICAgIHNlZ21lbnQ6IElEYXNoYm9hcmRTZWdtZW50LFxuICAgIG92ZXJyaWRlUHJvcHM/OiBNb25pdG9yaW5nRGFzaGJvYXJkc092ZXJyaWRlUHJvcHNcbiAgKTogdGhpcyB7XG4gICAgY29uc3QgYWRhcHRlZFNlZ21lbnQgPSBuZXcgU3RhdGljU2VnbWVudER5bmFtaWNBZGFwdGVyKHtcbiAgICAgIHNlZ21lbnQsXG4gICAgICBvdmVycmlkZVByb3BzLFxuICAgIH0pO1xuICAgIHRoaXMuZGFzaGJvYXJkRmFjdG9yeT8uYWRkRHluYW1pY1NlZ21lbnQoYWRhcHRlZFNlZ21lbnQpO1xuICAgIHRoaXMuY3JlYXRlZFNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgLSBwcmVmZXIgY2FsbGluZyBkYXNoYm9hcmRGYWN0b3J5LmdldERhc2hib2FyZCBkaXJlY3RseS5cbiAgICpcbiAgICogQHJldHVybnMgZGVmYXVsdCBkZXRhaWwgZGFzaGJvYXJkXG4gICAqL1xuICBjcmVhdGVkRGFzaGJvYXJkKCk6IERhc2hib2FyZCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZGFzaGJvYXJkRmFjdG9yeT8uZ2V0RGFzaGJvYXJkKERlZmF1bHREYXNoYm9hcmRzLkRFVEFJTCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgLSBwcmVmZXIgY2FsbGluZyBkYXNoYm9hcmRGYWN0b3J5LmdldERhc2hib2FyZCBkaXJlY3RseS5cbiAgICpcbiAgICogQHJldHVybnMgZGVmYXVsdCBzdW1tYXJ5IGRhc2hib2FyZFxuICAgKi9cbiAgY3JlYXRlZFN1bW1hcnlEYXNoYm9hcmQoKTogRGFzaGJvYXJkIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5kYXNoYm9hcmRGYWN0b3J5Py5nZXREYXNoYm9hcmQoRGVmYXVsdERhc2hib2FyZHMuU1VNTUFSWSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgLSBwcmVmZXIgY2FsbGluZyBkYXNoYm9hcmRGYWN0b3J5LmdldERhc2hib2FyZCBkaXJlY3RseS5cbiAgICpcbiAgICogQHJldHVybnMgZGVmYXVsdCBhbGFybXMgZGFzaGJvYXJkXG4gICAqL1xuICBjcmVhdGVkQWxhcm1EYXNoYm9hcmQoKTogRGFzaGJvYXJkIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5kYXNoYm9hcmRGYWN0b3J5Py5nZXREYXNoYm9hcmQoRGVmYXVsdERhc2hib2FyZHMuQUxBUk1TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjcmVhdGVkIGFsYXJtcyBhY3Jvc3MgYWxsIGFkZGVkIHNlZ21lbnRzIHRoYXQgc3ViY2xhc3Mge0BsaW5rIE1vbml0b3Jpbmd9XG4gICAqIGFkZGVkIHVwIHVudGlsIG5vdy5cbiAgICovXG4gIGNyZWF0ZWRBbGFybXMoKTogQWxhcm1XaXRoQW5ub3RhdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVkTW9uaXRvcmluZ3MoKS5mbGF0TWFwKChtb25pdG9yaW5nKSA9PlxuICAgICAgbW9uaXRvcmluZy5jcmVhdGVkQWxhcm1zKClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdWJzZXQgb2YgY3JlYXRlZCBhbGFybXMgdGhhdCBhcmUgbWFya2VkIGJ5IGEgc3BlY2lmaWMgY3VzdG9tIHRhZy5cbiAgICpcbiAgICogQHBhcmFtIGN1c3RvbVRhZyB0YWcgdG8gZmlsdGVyIGFsYXJtcyBieVxuICAgKi9cbiAgY3JlYXRlZEFsYXJtc1dpdGhUYWcoY3VzdG9tVGFnOiBzdHJpbmcpOiBBbGFybVdpdGhBbm5vdGF0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZWRBbGFybXMoKS5maWx0ZXIoKGFsYXJtKSA9PlxuICAgICAgYWxhcm0uY3VzdG9tVGFncz8uaW5jbHVkZXMoY3VzdG9tVGFnKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN1YnNldCBvZiBjcmVhdGVkIGFsYXJtcyB0aGF0IGFyZSBtYXJrZWQgYnkgYSBzcGVjaWZpYyBkaXNhbWJpZ3VhdG9yLlxuICAgKlxuICAgKiBAcGFyYW0gZGlzYW1iaWd1YXRvciBkaXNhbWJpZ3VhdG9yIHRvIGZpbHRlciBhbGFybXMgYnlcbiAgICovXG4gIGNyZWF0ZWRBbGFybXNXaXRoRGlzYW1iaWd1YXRvcihkaXNhbWJpZ3VhdG9yOiBzdHJpbmcpOiBBbGFybVdpdGhBbm5vdGF0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZWRBbGFybXMoKS5maWx0ZXIoXG4gICAgICAoYWxhcm0pID0+IGFsYXJtLmRpc2FtYmlndWF0b3IgPT09IGRpc2FtYmlndWF0b3JcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFkZGVkIHNlZ21lbnRzIHRoYXQgc3ViY2xhc3Mge0BsaW5rIE1vbml0b3Jpbmd9LlxuICAgKi9cbiAgY3JlYXRlZE1vbml0b3JpbmdzKCk6IE1vbml0b3JpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlZFNlZ21lbnRzXG4gICAgICAuZmlsdGVyKChzKSA9PiBzIGluc3RhbmNlb2YgTW9uaXRvcmluZylcbiAgICAgIC5tYXAoKHMpID0+IHMgYXMgTW9uaXRvcmluZyk7XG4gIH1cblxuICAvLyBDT01QT1NJVEUgQUxBUk0gQ1JFQVRPUlNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIEZpbmRzIGEgc3Vic2V0IG9mIGNyZWF0ZWQgYWxhcm1zIHRoYXQgYXJlIG1hcmtlZCBieSBhIHNwZWNpZmljIGN1c3RvbSB0YWcgYW5kIGNyZWF0ZXMgYSBjb21wb3NpdGUgYWxhcm0uXG4gICAqIFRoaXMgY29tcG9zaXRlIGFsYXJtIGlzIGNyZWF0ZWQgd2l0aCBhbiAnT1InIGNvbmRpdGlvbiwgc28gaXQgdHJpZ2dlcnMgd2l0aCBhbnkgY2hpbGQgYWxhcm0uXG4gICAqIE5PVEU6IFRoaXMgY29tcG9zaXRlIGFsYXJtIGlzIG5vdCBhZGRlZCBhbW9uZyBvdGhlciBhbGFybXMsIHNvIGl0IGlzIG5vdCByZXR1cm5lZCBieSBjcmVhdGVkQWxhcm1zKCkgY2FsbHMuXG4gICAqXG4gICAqIEBwYXJhbSBjdXN0b21UYWcgdGFnIHRvIGZpbHRlciBhbGFybXMgYnlcbiAgICogQHBhcmFtIHByb3BzIGN1c3RvbWl6YXRpb24gb3B0aW9uc1xuICAgKi9cbiAgY3JlYXRlQ29tcG9zaXRlQWxhcm1Vc2luZ1RhZyhcbiAgICBjdXN0b21UYWc6IHN0cmluZyxcbiAgICBwcm9wcz86IEFkZENvbXBvc2l0ZUFsYXJtUHJvcHNcbiAgKTogQ29tcG9zaXRlQWxhcm0gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGFsYXJtcyA9IHRoaXMuY3JlYXRlZEFsYXJtc1dpdGhUYWcoY3VzdG9tVGFnKTtcbiAgICBpZiAoYWxhcm1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGRpc2FtYmlndWF0b3IgPSBwcm9wcz8uZGlzYW1iaWd1YXRvciA/PyBjdXN0b21UYWc7XG4gICAgICBjb25zdCBhbGFybUZhY3RvcnkgPSB0aGlzLmNyZWF0ZUFsYXJtRmFjdG9yeShcIkNvbXBvc2l0ZVwiKTtcbiAgICAgIHJldHVybiBhbGFybUZhY3RvcnkuYWRkQ29tcG9zaXRlQWxhcm0oYWxhcm1zLCB7XG4gICAgICAgIC4uLihwcm9wcyA/PyB7fSksXG4gICAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhIHN1YnNldCBvZiBjcmVhdGVkIGFsYXJtcyB0aGF0IGFyZSBtYXJrZWQgYnkgYSBzcGVjaWZpYyBkaXNhbWJpZ3VhdG9yIGFuZCBjcmVhdGVzIGEgY29tcG9zaXRlIGFsYXJtLlxuICAgKiBUaGlzIGNvbXBvc2l0ZSBhbGFybSBpcyBjcmVhdGVkIHdpdGggYW4gJ09SJyBjb25kaXRpb24sIHNvIGl0IHRyaWdnZXJzIHdpdGggYW55IGNoaWxkIGFsYXJtLlxuICAgKiBOT1RFOiBUaGlzIGNvbXBvc2l0ZSBhbGFybSBpcyBub3QgYWRkZWQgYW1vbmcgb3RoZXIgYWxhcm1zLCBzbyBpdCBpcyBub3QgcmV0dXJuZWQgYnkgY3JlYXRlZEFsYXJtcygpIGNhbGxzLlxuICAgKlxuICAgKiBAcGFyYW0gYWxhcm1EaXNhbWJpZ3VhdG9yIGRpc2FtYmlndWF0b3IgdG8gZmlsdGVyIGFsYXJtcyBieVxuICAgKiBAcGFyYW0gcHJvcHMgY3VzdG9taXphdGlvbiBvcHRpb25zXG4gICAqL1xuICBjcmVhdGVDb21wb3NpdGVBbGFybVVzaW5nRGlzYW1iaWd1YXRvcihcbiAgICBhbGFybURpc2FtYmlndWF0b3I6IHN0cmluZyxcbiAgICBwcm9wcz86IEFkZENvbXBvc2l0ZUFsYXJtUHJvcHNcbiAgKTogQ29tcG9zaXRlQWxhcm0gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGFsYXJtcyA9IHRoaXMuY3JlYXRlZEFsYXJtc1dpdGhEaXNhbWJpZ3VhdG9yKGFsYXJtRGlzYW1iaWd1YXRvcik7XG4gICAgaWYgKGFsYXJtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkaXNhbWJpZ3VhdG9yID0gcHJvcHM/LmRpc2FtYmlndWF0b3IgPz8gYWxhcm1EaXNhbWJpZ3VhdG9yO1xuICAgICAgY29uc3QgYWxhcm1GYWN0b3J5ID0gdGhpcy5jcmVhdGVBbGFybUZhY3RvcnkoXCJDb21wb3NpdGVcIik7XG4gICAgICByZXR1cm4gYWxhcm1GYWN0b3J5LmFkZENvbXBvc2l0ZUFsYXJtKGFsYXJtcywge1xuICAgICAgICAuLi4ocHJvcHMgPz8ge30pLFxuICAgICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBCQVNJQyBXSURHRVRTXG4gIC8vID09PT09PT09PT09PT1cblxuICBhZGRMYXJnZUhlYWRlcihcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICAgYWRkVG9TdW1tYXJ5PzogYm9vbGVhbixcbiAgICBhZGRUb0FsYXJtPzogYm9vbGVhblxuICApOiB0aGlzIHtcbiAgICB0aGlzLmFkZFdpZGdldChcbiAgICAgIG5ldyBIZWFkZXJXaWRnZXQodGV4dCwgSGVhZGVyTGV2ZWwuTEFSR0UpLFxuICAgICAgYWRkVG9TdW1tYXJ5ID8/IGZhbHNlLFxuICAgICAgYWRkVG9BbGFybSA/PyBmYWxzZVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRNZWRpdW1IZWFkZXIoXG4gICAgdGV4dDogc3RyaW5nLFxuICAgIGFkZFRvU3VtbWFyeT86IGJvb2xlYW4sXG4gICAgYWRkVG9BbGFybT86IGJvb2xlYW5cbiAgKTogdGhpcyB7XG4gICAgdGhpcy5hZGRXaWRnZXQoXG4gICAgICBuZXcgSGVhZGVyV2lkZ2V0KHRleHQsIEhlYWRlckxldmVsLk1FRElVTSksXG4gICAgICBhZGRUb1N1bW1hcnkgPz8gZmFsc2UsXG4gICAgICBhZGRUb0FsYXJtID8/IGZhbHNlXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFNtYWxsSGVhZGVyKFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBhZGRUb1N1bW1hcnk/OiBib29sZWFuLFxuICAgIGFkZFRvQWxhcm0/OiBib29sZWFuXG4gICk6IHRoaXMge1xuICAgIHRoaXMuYWRkV2lkZ2V0KFxuICAgICAgbmV3IEhlYWRlcldpZGdldCh0ZXh0LCBIZWFkZXJMZXZlbC5TTUFMTCksXG4gICAgICBhZGRUb1N1bW1hcnkgPz8gZmFsc2UsXG4gICAgICBhZGRUb0FsYXJtID8/IGZhbHNlXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFdpZGdldChcbiAgICB3aWRnZXQ6IElXaWRnZXQsXG4gICAgYWRkVG9TdW1tYXJ5PzogYm9vbGVhbixcbiAgICBhZGRUb0FsYXJtPzogYm9vbGVhblxuICApOiB0aGlzIHtcbiAgICB0aGlzLmFkZFNlZ21lbnQobmV3IFNpbmdsZVdpZGdldERhc2hib2FyZFNlZ21lbnQod2lkZ2V0KSwge1xuICAgICAgYWRkVG9BbGFybURhc2hib2FyZDogYWRkVG9BbGFybSA/PyB0cnVlLFxuICAgICAgYWRkVG9TdW1tYXJ5RGFzaGJvYXJkOiBhZGRUb1N1bW1hcnkgPz8gdHJ1ZSxcbiAgICAgIGFkZFRvRGV0YWlsRGFzaGJvYXJkOiB0cnVlLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gUkVTT1VSQ0UgTU9OSVRPUklOR1xuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIFVzZXMgYW4gYXNwZWN0IHRvIGF1dG9tYXRpY2FsbHkgbW9uaXRvciBhbGwgcmVzb3VyY2VzIGluIHRoZSBnaXZlbiBzY29wZS5cbiAgICpcbiAgICogQHBhcmFtIHNjb3BlIFNjb3BlIHdpdGggcmVzb3VyY2VzIHRvIG1vbml0b3IuXG4gICAqIEBwYXJhbSBhc3BlY3RQcm9wcyBPcHRpb25hbCBjb25maWd1cmF0aW9uLlxuICAgKlxuICAgKiBAZXhwZXJpbWVudGFsXG4gICAqL1xuICBtb25pdG9yU2NvcGUoc2NvcGU6IENvbnN0cnVjdCwgYXNwZWN0UHJvcHM/OiBNb25pdG9yaW5nQXNwZWN0UHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBhc3BlY3QgPSBuZXcgTW9uaXRvcmluZ0FzcGVjdCh0aGlzLCBhc3BlY3RQcm9wcyk7XG4gICAgQXNwZWN0cy5vZihzY29wZSkuYWRkKGFzcGVjdCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yQXBpR2F0ZXdheShwcm9wczogQXBpR2F0ZXdheU1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgQXBpR2F0ZXdheU1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yQXBpR2F0ZXdheVYySHR0cEFwaShwcm9wczogQXBpR2F0ZXdheVYySHR0cEFwaU1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgQXBpR2F0ZXdheVYySHR0cEFwaU1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yQXBwU3luY0FwaShwcm9wczogQXBwU3luY01vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgQXBwU3luY01vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yQXVyb3JhQ2x1c3Rlcihwcm9wczogQXVyb3JhQ2x1c3Rlck1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgQXVyb3JhQ2x1c3Rlck1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yQ2VydGlmaWNhdGUocHJvcHM6IENlcnRpZmljYXRlTWFuYWdlck1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgQ2VydGlmaWNhdGVNYW5hZ2VyTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JDbG91ZEZyb250RGlzdHJpYnV0aW9uKFxuICAgIHByb3BzOiBDbG91ZEZyb250RGlzdHJpYnV0aW9uTW9uaXRvcmluZ1Byb3BzXG4gICk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgQ2xvdWRGcm9udERpc3RyaWJ1dGlvbk1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yQ29kZUJ1aWxkUHJvamVjdChwcm9wczogQ29kZUJ1aWxkUHJvamVjdE1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgQ29kZUJ1aWxkUHJvamVjdE1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yRG9jdW1lbnREYkNsdXN0ZXIocHJvcHM6IERvY3VtZW50RGJNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IERvY3VtZW50RGJNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvckR5bmFtb1RhYmxlKHByb3BzOiBEeW5hbW9UYWJsZU1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgRHluYW1vVGFibGVNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvckR5bmFtb1RhYmxlR2xvYmFsU2Vjb25kYXJ5SW5kZXgoXG4gICAgcHJvcHM6IER5bmFtb1RhYmxlR2xvYmFsU2Vjb25kYXJ5SW5kZXhNb25pdG9yaW5nUHJvcHNcbiAgKSB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBEeW5hbW9UYWJsZUdsb2JhbFNlY29uZGFyeUluZGV4TW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JFQzJJbnN0YW5jZXMocHJvcHM6IEVDMk1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgRUMyTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JFbGFzdGljc2VhcmNoQ2x1c3Rlcihwcm9wczogT3BlblNlYXJjaENsdXN0ZXJNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IE9wZW5TZWFyY2hDbHVzdGVyTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JPcGVuU2VhcmNoQ2x1c3Rlcihwcm9wczogT3BlblNlYXJjaENsdXN0ZXJNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IE9wZW5TZWFyY2hDbHVzdGVyTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JFbGFzdGlDYWNoZUNsdXN0ZXIocHJvcHM6IEVsYXN0aUNhY2hlQ2x1c3Rlck1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgRWxhc3RpQ2FjaGVDbHVzdGVyTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JHbHVlSm9iKHByb3BzOiBHbHVlSm9iTW9uaXRvcmluZ1Byb3BzKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBHbHVlSm9iTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JGYXJnYXRlU2VydmljZShwcm9wczogRmFyZ2F0ZVNlcnZpY2VNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IEZhcmdhdGVTZXJ2aWNlTW9uaXRvcmluZyh0aGlzLCB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGZhcmdhdGVTZXJ2aWNlOiBwcm9wcy5mYXJnYXRlU2VydmljZS5zZXJ2aWNlLFxuICAgICAgbG9hZEJhbGFuY2VyOiBwcm9wcy5mYXJnYXRlU2VydmljZS5sb2FkQmFsYW5jZXIsXG4gICAgICB0YXJnZXRHcm91cDogcHJvcHMuZmFyZ2F0ZVNlcnZpY2UudGFyZ2V0R3JvdXAsXG4gICAgfSk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JTaW1wbGVGYXJnYXRlU2VydmljZShcbiAgICBwcm9wczogU2ltcGxlRmFyZ2F0ZVNlcnZpY2VNb25pdG9yaW5nUHJvcHNcbiAgKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBGYXJnYXRlU2VydmljZU1vbml0b3JpbmcodGhpcywge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBmYXJnYXRlU2VydmljZTogcHJvcHMuZmFyZ2F0ZVNlcnZpY2UsXG4gICAgfSk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JGYXJnYXRlTmV0d29ya0xvYWRCYWxhbmNlcihcbiAgICBwcm9wczogRmFyZ2F0ZU5ldHdvcmtMb2FkQmFsYW5jZXJNb25pdG9yaW5nUHJvcHNcbiAgKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBGYXJnYXRlU2VydmljZU1vbml0b3JpbmcodGhpcywge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBmYXJnYXRlU2VydmljZTogcHJvcHMuZmFyZ2F0ZVNlcnZpY2UsXG4gICAgICBsb2FkQmFsYW5jZXI6IHByb3BzLm5ldHdvcmtMb2FkQmFsYW5jZXIsXG4gICAgICB0YXJnZXRHcm91cDogcHJvcHMubmV0d29ya1RhcmdldEdyb3VwLFxuICAgIH0pO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yRmFyZ2F0ZUFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyKFxuICAgIHByb3BzOiBGYXJnYXRlQXBwbGljYXRpb25Mb2FkQmFsYW5jZXJNb25pdG9yaW5nUHJvcHNcbiAgKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBGYXJnYXRlU2VydmljZU1vbml0b3JpbmcodGhpcywge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBmYXJnYXRlU2VydmljZTogcHJvcHMuZmFyZ2F0ZVNlcnZpY2UsXG4gICAgICBsb2FkQmFsYW5jZXI6IHByb3BzLmFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyLFxuICAgICAgdGFyZ2V0R3JvdXA6IHByb3BzLmFwcGxpY2F0aW9uVGFyZ2V0R3JvdXAsXG4gICAgfSk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JFYzJTZXJ2aWNlKHByb3BzOiBFYzJTZXJ2aWNlTW9uaXRvcmluZ1Byb3BzKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBFYzJTZXJ2aWNlTW9uaXRvcmluZyh0aGlzLCB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGVjMlNlcnZpY2U6IHByb3BzLmVjMlNlcnZpY2Uuc2VydmljZSxcbiAgICAgIGxvYWRCYWxhbmNlcjogcHJvcHMuZWMyU2VydmljZS5sb2FkQmFsYW5jZXIsXG4gICAgICB0YXJnZXRHcm91cDogcHJvcHMuZWMyU2VydmljZS50YXJnZXRHcm91cCxcbiAgICB9KTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvclNpbXBsZUVjMlNlcnZpY2UocHJvcHM6IFNpbXBsZUVjMlNlcnZpY2VNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IEVjMlNlcnZpY2VNb25pdG9yaW5nKHRoaXMsIHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZWMyU2VydmljZTogcHJvcHMuZWMyU2VydmljZSxcbiAgICB9KTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvckVjMk5ldHdvcmtMb2FkQmFsYW5jZXIoXG4gICAgcHJvcHM6IEVjMk5ldHdvcmtMb2FkQmFsYW5jZXJNb25pdG9yaW5nUHJvcHNcbiAgKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBFYzJTZXJ2aWNlTW9uaXRvcmluZyh0aGlzLCB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGVjMlNlcnZpY2U6IHByb3BzLmVjMlNlcnZpY2UsXG4gICAgICBsb2FkQmFsYW5jZXI6IHByb3BzLm5ldHdvcmtMb2FkQmFsYW5jZXIsXG4gICAgICB0YXJnZXRHcm91cDogcHJvcHMubmV0d29ya1RhcmdldEdyb3VwLFxuICAgIH0pO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yRWMyQXBwbGljYXRpb25Mb2FkQmFsYW5jZXIoXG4gICAgcHJvcHM6IEVjMkFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyTW9uaXRvcmluZ1Byb3BzXG4gICk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgRWMyU2VydmljZU1vbml0b3JpbmcodGhpcywge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBlYzJTZXJ2aWNlOiBwcm9wcy5lYzJTZXJ2aWNlLFxuICAgICAgbG9hZEJhbGFuY2VyOiBwcm9wcy5hcHBsaWNhdGlvbkxvYWRCYWxhbmNlcixcbiAgICAgIHRhcmdldEdyb3VwOiBwcm9wcy5hcHBsaWNhdGlvblRhcmdldEdyb3VwLFxuICAgIH0pO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yUXVldWVQcm9jZXNzaW5nRmFyZ2F0ZVNlcnZpY2UoXG4gICAgcHJvcHM6IFF1ZXVlUHJvY2Vzc2luZ0ZhcmdhdGVTZXJ2aWNlTW9uaXRvcmluZ1Byb3BzXG4gICk6IHRoaXMge1xuICAgIGdldFF1ZXVlUHJvY2Vzc2luZ0ZhcmdhdGVTZXJ2aWNlTW9uaXRvcmluZyh0aGlzLCBwcm9wcykuZm9yRWFjaCgoc2VnbWVudCkgPT5cbiAgICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50KVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yUXVldWVQcm9jZXNzaW5nRWMyU2VydmljZShcbiAgICBwcm9wczogUXVldWVQcm9jZXNzaW5nRWMyU2VydmljZU1vbml0b3JpbmdQcm9wc1xuICApOiB0aGlzIHtcbiAgICBnZXRRdWV1ZVByb2Nlc3NpbmdFYzJTZXJ2aWNlTW9uaXRvcmluZyh0aGlzLCBwcm9wcykuZm9yRWFjaCgoc2VnbWVudCkgPT5cbiAgICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50KVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yQXV0b1NjYWxpbmdHcm91cChwcm9wczogQXV0b1NjYWxpbmdHcm91cE1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgQXV0b1NjYWxpbmdHcm91cE1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yS2luZXNpc0ZpcmVob3NlKHByb3BzOiBLaW5lc2lzRmlyZWhvc2VNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IEtpbmVzaXNGaXJlaG9zZU1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yS2luZXNpc0RhdGFTdHJlYW0ocHJvcHM6IEtpbmVzaXNEYXRhU3RyZWFtTW9uaXRvcmluZ1Byb3BzKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBLaW5lc2lzRGF0YVN0cmVhbU1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yS2luZXNpc0RhdGFBbmFseXRpY3MoXG4gICAgcHJvcHM6IEtpbmVzaXNEYXRhQW5hbHl0aWNzTW9uaXRvcmluZ1Byb3BzXG4gICk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgS2luZXNpc0RhdGFBbmFseXRpY3NNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvckxhbWJkYUZ1bmN0aW9uKHByb3BzOiBMYW1iZGFGdW5jdGlvbk1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgTGFtYmRhRnVuY3Rpb25Nb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvck5ldHdvcmtMb2FkQmFsYW5jZXIocHJvcHM6IE5ldHdvcmtMb2FkQmFsYW5jZXJNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IE5ldHdvcmtMb2FkQmFsYW5jZXJNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvclJkc0NsdXN0ZXIocHJvcHM6IFJkc0NsdXN0ZXJNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IFJkc0NsdXN0ZXJNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvclJkc0luc3RhbmNlKHByb3BzOiBSZHNJbnN0YW5jZU1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgUmRzSW5zdGFuY2VNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvclJlZHNoaWZ0Q2x1c3Rlcihwcm9wczogUmVkc2hpZnRDbHVzdGVyTW9uaXRvcmluZ1Byb3BzKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBSZWRzaGlmdENsdXN0ZXJNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvclNlY3JldHNNYW5hZ2VyKHByb3BzOiBTZWNyZXRzTWFuYWdlck1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgU2VjcmV0c01hbmFnZXJNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvclNlY3JldHNNYW5hZ2VyU2VjcmV0KFxuICAgIHByb3BzOiBTZWNyZXRzTWFuYWdlclNlY3JldE1vbml0b3JpbmdQcm9wc1xuICApOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IFNlY3JldHNNYW5hZ2VyU2VjcmV0TW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JTbnNUb3BpYyhwcm9wczogU25zVG9waWNNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IFNuc1RvcGljTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JTcXNRdWV1ZShwcm9wczogU3FzUXVldWVNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IFNxc1F1ZXVlTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JTcXNRdWV1ZVdpdGhEbHEocHJvcHM6IFNxc1F1ZXVlTW9uaXRvcmluZ1dpdGhEbHFQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgU3FzUXVldWVNb25pdG9yaW5nV2l0aERscSh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JTdGVwRnVuY3Rpb24ocHJvcHM6IFN0ZXBGdW5jdGlvbk1vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgU3RlcEZ1bmN0aW9uTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JTdGVwRnVuY3Rpb25BY3Rpdml0eShcbiAgICBwcm9wczogU3RlcEZ1bmN0aW9uQWN0aXZpdHlNb25pdG9yaW5nUHJvcHNcbiAgKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBTdGVwRnVuY3Rpb25BY3Rpdml0eU1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yU3RlcEZ1bmN0aW9uTGFtYmRhSW50ZWdyYXRpb24oXG4gICAgcHJvcHM6IFN0ZXBGdW5jdGlvbkxhbWJkYUludGVncmF0aW9uTW9uaXRvcmluZ1Byb3BzXG4gICk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgU3RlcEZ1bmN0aW9uTGFtYmRhSW50ZWdyYXRpb25Nb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvclN0ZXBGdW5jdGlvblNlcnZpY2VJbnRlZ3JhdGlvbihcbiAgICBwcm9wczogU3RlcEZ1bmN0aW9uU2VydmljZUludGVncmF0aW9uTW9uaXRvcmluZ1Byb3BzXG4gICk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgU3RlcEZ1bmN0aW9uU2VydmljZUludGVncmF0aW9uTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JTM0J1Y2tldChwcm9wczogUzNCdWNrZXRNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IFMzQnVja2V0TW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JMb2cocHJvcHM6IExvZ01vbml0b3JpbmdQcm9wcyk6IHRoaXMge1xuICAgIGNvbnN0IHNlZ21lbnQgPSBuZXcgTG9nTW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JTeW50aGV0aWNzQ2FuYXJ5KHByb3BzOiBTeW50aGV0aWNzQ2FuYXJ5TW9uaXRvcmluZ1Byb3BzKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBTeW50aGV0aWNzQ2FuYXJ5TW9uaXRvcmluZyh0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5hZGRTZWdtZW50KHNlZ21lbnQsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vbml0b3JXZWJBcHBsaWNhdGlvbkZpcmV3YWxsQWNsVjIocHJvcHM6IFdhZlYyTW9uaXRvcmluZ1Byb3BzKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBXYWZWMk1vbml0b3JpbmcodGhpcywgcHJvcHMpO1xuICAgIHRoaXMuYWRkU2VnbWVudChzZWdtZW50LCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb25pdG9yQmlsbGluZyhwcm9wcz86IEJpbGxpbmdNb25pdG9yaW5nUHJvcHMpOiB0aGlzIHtcbiAgICBjb25zdCBzZWdtZW50ID0gbmV3IEJpbGxpbmdNb25pdG9yaW5nKHRoaXMsIHByb3BzID8/IHt9KTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvckN1c3RvbShwcm9wczogQ3VzdG9tTW9uaXRvcmluZ1Byb3BzKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBDdXN0b21Nb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW9uaXRvckZsdWVudEJpdChwcm9wczogRmx1ZW50Qml0TW9uaXRvcmluZ1Byb3BzKTogdGhpcyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IG5ldyBGbHVlbnRCaXRNb25pdG9yaW5nKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmFkZFNlZ21lbnQoc2VnbWVudCwgcHJvcHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iXX0=