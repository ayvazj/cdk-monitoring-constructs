"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoTableMonitoring = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const DynamoTableMetricFactory_1 = require("./DynamoTableMetricFactory");
const common_1 = require("../../common");
const dashboard_1 = require("../../dashboard");
class DynamoTableMonitoring extends common_1.Monitoring {
    constructor(scope, props) {
        super(scope, props);
        const namingStrategy = new dashboard_1.MonitoringNamingStrategy({
            ...props,
            namedConstruct: props.table,
            fallbackConstructName: this.resolveTableName(props.table),
        });
        this.title = namingStrategy.resolveHumanReadableName();
        this.tableUrl = scope
            .createAwsConsoleUrlFactory()
            .getDynamoTableUrl(props.table.tableName);
        this.tableBillingMode =
            props.billingMode ?? this.resolveTableBillingMode(props.table);
        this.alarmFactory = this.createAlarmFactory(namingStrategy.resolveAlarmFriendlyName());
        this.errorAlarmFactory = new common_1.ErrorAlarmFactory(this.alarmFactory);
        this.latencyAlarmFactory = new common_1.LatencyAlarmFactory(this.alarmFactory);
        this.dynamoCapacityAlarmFactory = new common_1.DynamoAlarmFactory(this.alarmFactory);
        this.errorCountAnnotations = [];
        this.latencyAnnotations = [];
        this.dynamoReadCapacityAnnotations = [];
        this.dynamoWriteCapacityAnnotations = [];
        this.throttledEventsAnnotations = [];
        const metricFactory = new DynamoTableMetricFactory_1.DynamoTableMetricFactory(scope.createMetricFactory(), props);
        this.provisionedReadUnitsMetric =
            metricFactory.metricProvisionedReadCapacityUnits();
        this.provisionedWriteUnitsMetric =
            metricFactory.metricProvisionedWriteCapacityUnits();
        this.consumedReadUnitsMetric =
            metricFactory.metricConsumedReadCapacityUnits();
        this.consumedWriteUnitsMetric =
            metricFactory.metricConsumedWriteCapacityUnits();
        this.readThrottleCountMetric =
            metricFactory.metricThrottledReadRequestCount();
        this.writeThrottleCountMetric =
            metricFactory.metricThrottledWriteRequestCount();
        this.systemErrorMetric = metricFactory.metricSystemErrorsCount();
        this.latencyAverageSearchMetrics =
            metricFactory.metricSearchAverageSuccessfulRequestLatencyInMillis();
        this.averagePerOperationLatencyMetrics = {
            [aws_dynamodb_1.Operation.GET_RECORDS]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.GET_RECORDS),
            [aws_dynamodb_1.Operation.QUERY]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.QUERY),
            [aws_dynamodb_1.Operation.SCAN]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.SCAN),
            [aws_dynamodb_1.Operation.PUT_ITEM]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.PUT_ITEM),
            [aws_dynamodb_1.Operation.GET_ITEM]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.GET_ITEM),
            [aws_dynamodb_1.Operation.UPDATE_ITEM]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.UPDATE_ITEM),
            [aws_dynamodb_1.Operation.DELETE_ITEM]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.DELETE_ITEM),
            [aws_dynamodb_1.Operation.BATCH_GET_ITEM]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.BATCH_GET_ITEM),
            [aws_dynamodb_1.Operation.BATCH_WRITE_ITEM]: metricFactory.metricAverageSuccessfulRequestLatencyInMillis(aws_dynamodb_1.Operation.BATCH_WRITE_ITEM),
        };
        this.readCapacityUsageMetric =
            metricFactory.metricReadCapacityUtilizationPercentage();
        this.writeCapacityUsageMetric =
            metricFactory.metricWriteCapacityUtilizationPercentage();
        for (const disambiguator in props.addConsumedReadCapacityAlarm) {
            const alarmProps = props.addConsumedReadCapacityAlarm[disambiguator];
            const createdAlarm = this.dynamoCapacityAlarmFactory.addConsumedCapacityAlarm(this.consumedReadUnitsMetric, common_1.CapacityType.READ, alarmProps, disambiguator);
            this.dynamoReadCapacityAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addConsumedWriteCapacityAlarm) {
            const alarmProps = props.addConsumedWriteCapacityAlarm[disambiguator];
            const createdAlarm = this.dynamoCapacityAlarmFactory.addConsumedCapacityAlarm(this.consumedWriteUnitsMetric, common_1.CapacityType.WRITE, alarmProps, disambiguator);
            this.dynamoWriteCapacityAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addReadThrottledEventsCountAlarm) {
            const alarmProps = props.addReadThrottledEventsCountAlarm[disambiguator];
            const createdAlarm = this.dynamoCapacityAlarmFactory.addThrottledEventsAlarm(this.readThrottleCountMetric, common_1.CapacityType.READ, alarmProps, disambiguator);
            this.throttledEventsAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addWriteThrottledEventsCountAlarm) {
            const alarmProps = props.addWriteThrottledEventsCountAlarm[disambiguator];
            const createdAlarm = this.dynamoCapacityAlarmFactory.addThrottledEventsAlarm(this.writeThrottleCountMetric, common_1.CapacityType.WRITE, alarmProps, disambiguator);
            this.throttledEventsAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        for (const disambiguator in props.addSystemErrorCountAlarm) {
            const alarmProps = props.addSystemErrorCountAlarm[disambiguator];
            const createdAlarm = this.errorAlarmFactory.addErrorCountAlarm(this.systemErrorMetric, common_1.ErrorType.SYSTEM_ERROR, alarmProps, disambiguator);
            this.errorCountAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.GET_RECORDS, props.addAverageSuccessfulGetRecordsLatencyAlarm);
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.QUERY, props.addAverageSuccessfulQueryLatencyAlarm);
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.SCAN, props.addAverageSuccessfulScanLatencyAlarm);
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.PUT_ITEM, props.addAverageSuccessfulPutItemLatencyAlarm);
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.GET_ITEM, props.addAverageSuccessfulGetItemLatencyAlarm);
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.UPDATE_ITEM, props.addAverageSuccessfulUpdateItemLatencyAlarm);
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.DELETE_ITEM, props.addAverageSuccessfulDeleteItemLatencyAlarm);
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.BATCH_GET_ITEM, props.addAverageSuccessfulBatchGetItemLatencyAlarm);
        this.forEachOperationLatencyAlarmDefinition(aws_dynamodb_1.Operation.BATCH_WRITE_ITEM, props.addAverageSuccessfulBatchWriteItemLatencyAlarm);
        props.useCreatedAlarms?.consume(this.createdAlarms());
    }
    forEachOperationLatencyAlarmDefinition(operation, alarm) {
        for (const disambiguator in alarm) {
            const alarmProps = alarm[disambiguator];
            const createdAlarm = this.latencyAlarmFactory.addLatencyAlarm(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.averagePerOperationLatencyMetrics[operation], common_1.LatencyType.AVERAGE, alarmProps, disambiguator, operation);
            this.latencyAnnotations.push(createdAlarm.annotation);
            this.addAlarm(createdAlarm);
        }
    }
    summaryWidgets() {
        return [
            // Title
            this.createTitleWidget(),
            // Read units
            this.createReadCapacityWidget(common_1.HalfWidth, common_1.DefaultSummaryWidgetHeight),
            // Write units
            this.createWriteCapacityWidget(common_1.HalfWidth, common_1.DefaultSummaryWidgetHeight),
        ];
    }
    widgets() {
        return [
            // Title
            this.createTitleWidget(),
            new aws_cloudwatch_1.Column(
            // Read units
            this.createReadCapacityWidget(common_1.QuarterWidth, common_1.DefaultTwoLinerGraphWidgetHalfHeight), 
            // Write units
            this.createWriteCapacityWidget(common_1.QuarterWidth, common_1.DefaultTwoLinerGraphWidgetHalfHeight)),
            // Latency
            this.createLatencyWidget(common_1.QuarterWidth + common_1.HalfQuarterWidth, common_1.DefaultTwoLinerGraphWidgetHeight),
            // Throttles
            this.createThrottlesWidget(common_1.HalfQuarterWidth, common_1.DefaultTwoLinerGraphWidgetHeight),
            // Errors
            this.createErrorsWidget(common_1.QuarterWidth, common_1.DefaultTwoLinerGraphWidgetHeight),
        ];
    }
    createLatencyWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Latency (Average)",
            left: [this.latencyAverageSearchMetrics],
            leftYAxis: common_1.TimeAxisMillisFromZero,
            leftAnnotations: this.latencyAnnotations,
            legendPosition: aws_cloudwatch_1.LegendPosition.RIGHT,
        });
    }
    createThrottlesWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Throttles",
            left: [this.readThrottleCountMetric, this.writeThrottleCountMetric],
            leftYAxis: common_1.CountAxisFromZero,
            leftAnnotations: this.throttledEventsAnnotations,
        });
    }
    createErrorsWidget(width, height) {
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Errors",
            left: [this.systemErrorMetric],
            leftYAxis: common_1.CountAxisFromZero,
            leftAnnotations: this.errorCountAnnotations,
        });
    }
    createReadCapacityWidget(width, height) {
        if (this.tableBillingMode === aws_dynamodb_1.BillingMode.PAY_PER_REQUEST) {
            // simplified view for on-demand table
            return new aws_cloudwatch_1.GraphWidget({
                width,
                height,
                title: "Read Usage",
                left: [this.consumedReadUnitsMetric],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.dynamoReadCapacityAnnotations,
            });
        }
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Read Usage",
            left: [this.consumedReadUnitsMetric, this.provisionedReadUnitsMetric],
            leftYAxis: common_1.CountAxisFromZero,
            leftAnnotations: this.dynamoReadCapacityAnnotations,
            right: [this.readCapacityUsageMetric],
            rightYAxis: common_1.PercentageAxisFromZeroToHundred,
            legendPosition: aws_cloudwatch_1.LegendPosition.RIGHT,
        });
    }
    createWriteCapacityWidget(width, height) {
        if (this.tableBillingMode === aws_dynamodb_1.BillingMode.PAY_PER_REQUEST) {
            // simplified view for on-demand table
            return new aws_cloudwatch_1.GraphWidget({
                width,
                height,
                title: "Write Usage",
                left: [this.consumedWriteUnitsMetric],
                leftYAxis: common_1.CountAxisFromZero,
                leftAnnotations: this.dynamoWriteCapacityAnnotations,
            });
        }
        return new aws_cloudwatch_1.GraphWidget({
            width,
            height,
            title: "Write Usage",
            left: [this.consumedWriteUnitsMetric, this.provisionedWriteUnitsMetric],
            leftYAxis: common_1.CountAxisFromZero,
            leftAnnotations: this.dynamoWriteCapacityAnnotations,
            right: [this.writeCapacityUsageMetric],
            rightYAxis: common_1.PercentageAxisFromZeroToHundred,
            legendPosition: aws_cloudwatch_1.LegendPosition.RIGHT,
        });
    }
    createTitleWidget() {
        return new dashboard_1.MonitoringHeaderWidget({
            family: "Dynamo Table",
            title: this.title,
            goToLinkUrl: this.tableUrl,
        });
    }
    resolveTableName(dynamoTable) {
        // try to take the name (if specified) instead of token
        return dynamoTable.node.defaultChild?.tableName;
    }
    resolveTableBillingMode(dynamoTable) {
        const billingMode = dynamoTable.node.defaultChild
            ?.billingMode;
        if (billingMode) {
            return billingMode;
        }
        // fallback to default (for backwards compatibility)
        return aws_dynamodb_1.BillingMode.PROVISIONED;
    }
}
exports.DynamoTableMonitoring = DynamoTableMonitoring;
_a = JSII_RTTI_SYMBOL_1;
DynamoTableMonitoring[_a] = { fqn: "cdk-monitoring-constructs.DynamoTableMonitoring", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHluYW1vVGFibGVNb25pdG9yaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRHluYW1vVGFibGVNb25pdG9yaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBT29DO0FBQ3BDLDJEQUtrQztBQUVsQyx5RUFHb0M7QUFDcEMseUNBeUJzQjtBQUN0QiwrQ0FHeUI7QUFpRXpCLE1BQWEscUJBQXNCLFNBQVEsbUJBQVU7SUFnQ25ELFlBQVksS0FBc0IsRUFBRSxLQUFpQztRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBCLE1BQU0sY0FBYyxHQUFHLElBQUksb0NBQXdCLENBQUM7WUFDbEQsR0FBRyxLQUFLO1lBQ1IsY0FBYyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQzNCLHFCQUFxQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQzFELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLO2FBQ2xCLDBCQUEwQixFQUFFO2FBQzVCLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLGdCQUFnQjtZQUNuQixLQUFLLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQ3pDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUMxQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksMEJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLDRCQUFtQixDQUFD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RUFBRSxjQUFjO1lBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGdCQUFnQixDQUFDLFdBQW1CO1FBQzFDLHVEQUF1RDtRQUN2RCxPQUFRLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBeUIsRUFBRSxTQUFTLENBQUM7SUFDaEUsQ0FBQztJQUVPLHVCQUF1QixDQUFDLFdBQW1CO1FBQ2pELE1BQU0sV0FBVyxHQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBeUI7WUFDN0QsRUFBRSxXQUFXLENBQUM7UUFDaEIsSUFBSSxXQUFXLEVBQUU7WUFDZixPQUFPLFdBQTBCLENBQUM7U0FDbkM7UUFDRCxvREFBb0Q7UUFDcEQsT0FBTywwQkFBVyxDQUFDLFdBQVcsQ0FBQztJQUNqQyxDQUFDOztBQW5ZSCxzREFvWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb2x1bW4sXG4gIEdyYXBoV2lkZ2V0LFxuICBIb3Jpem9udGFsQW5ub3RhdGlvbixcbiAgSU1ldHJpYyxcbiAgSVdpZGdldCxcbiAgTGVnZW5kUG9zaXRpb24sXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWR3YXRjaFwiO1xuaW1wb3J0IHtcbiAgQmlsbGluZ01vZGUsXG4gIENmblRhYmxlLFxuICBJVGFibGUsXG4gIE9wZXJhdGlvbixcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1keW5hbW9kYlwiO1xuXG5pbXBvcnQge1xuICBEeW5hbW9UYWJsZU1ldHJpY0ZhY3RvcnksXG4gIER5bmFtb1RhYmxlTWV0cmljRmFjdG9yeVByb3BzLFxufSBmcm9tIFwiLi9EeW5hbW9UYWJsZU1ldHJpY0ZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIEFsYXJtRmFjdG9yeSxcbiAgQmFzZU1vbml0b3JpbmdQcm9wcyxcbiAgQ2FwYWNpdHlUeXBlLFxuICBDb25zdW1lZENhcGFjaXR5VGhyZXNob2xkLFxuICBDb3VudEF4aXNGcm9tWmVybyxcbiAgRGVmYXVsdFN1bW1hcnlXaWRnZXRIZWlnaHQsXG4gIERlZmF1bHRUd29MaW5lckdyYXBoV2lkZ2V0SGFsZkhlaWdodCxcbiAgRGVmYXVsdFR3b0xpbmVyR3JhcGhXaWRnZXRIZWlnaHQsXG4gIER5bmFtb0FsYXJtRmFjdG9yeSxcbiAgRXJyb3JBbGFybUZhY3RvcnksXG4gIEVycm9yQ291bnRUaHJlc2hvbGQsXG4gIEVycm9yVHlwZSxcbiAgSGFsZlF1YXJ0ZXJXaWR0aCxcbiAgSGFsZldpZHRoLFxuICBMYXRlbmN5QWxhcm1GYWN0b3J5LFxuICBMYXRlbmN5VGhyZXNob2xkLFxuICBMYXRlbmN5VHlwZSxcbiAgTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgTW9uaXRvcmluZyxcbiAgTW9uaXRvcmluZ1Njb3BlLFxuICBQZXJjZW50YWdlQXhpc0Zyb21aZXJvVG9IdW5kcmVkLFxuICBRdWFydGVyV2lkdGgsXG4gIFRocm90dGxlZEV2ZW50c1RocmVzaG9sZCxcbiAgVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbn0gZnJvbSBcIi4uLy4uL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgTW9uaXRvcmluZ0hlYWRlcldpZGdldCxcbiAgTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5LFxufSBmcm9tIFwiLi4vLi4vZGFzaGJvYXJkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHluYW1vVGFibGVNb25pdG9yaW5nT3B0aW9ucyBleHRlbmRzIEJhc2VNb25pdG9yaW5nUHJvcHMge1xuICByZWFkb25seSBhZGRDb25zdW1lZFJlYWRDYXBhY2l0eUFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBDb25zdW1lZENhcGFjaXR5VGhyZXNob2xkXG4gID47XG4gIHJlYWRvbmx5IGFkZENvbnN1bWVkV3JpdGVDYXBhY2l0eUFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBDb25zdW1lZENhcGFjaXR5VGhyZXNob2xkXG4gID47XG5cbiAgcmVhZG9ubHkgYWRkUmVhZFRocm90dGxlZEV2ZW50c0NvdW50QWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIFRocm90dGxlZEV2ZW50c1RocmVzaG9sZFxuICA+O1xuICByZWFkb25seSBhZGRXcml0ZVRocm90dGxlZEV2ZW50c0NvdW50QWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIFRocm90dGxlZEV2ZW50c1RocmVzaG9sZFxuICA+O1xuXG4gIHJlYWRvbmx5IGFkZFN5c3RlbUVycm9yQ291bnRBbGFybT86IFJlY29yZDxzdHJpbmcsIEVycm9yQ291bnRUaHJlc2hvbGQ+O1xuXG4gIHJlYWRvbmx5IGFkZEF2ZXJhZ2VTdWNjZXNzZnVsR2V0UmVjb3Jkc0xhdGVuY3lBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgTGF0ZW5jeVRocmVzaG9sZFxuICA+O1xuICByZWFkb25seSBhZGRBdmVyYWdlU3VjY2Vzc2Z1bFF1ZXJ5TGF0ZW5jeUFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBMYXRlbmN5VGhyZXNob2xkXG4gID47XG4gIHJlYWRvbmx5IGFkZEF2ZXJhZ2VTdWNjZXNzZnVsU2NhbkxhdGVuY3lBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgTGF0ZW5jeVRocmVzaG9sZFxuICA+O1xuICByZWFkb25seSBhZGRBdmVyYWdlU3VjY2Vzc2Z1bFB1dEl0ZW1MYXRlbmN5QWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIExhdGVuY3lUaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkQXZlcmFnZVN1Y2Nlc3NmdWxHZXRJdGVtTGF0ZW5jeUFsYXJtPzogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBMYXRlbmN5VGhyZXNob2xkXG4gID47XG4gIHJlYWRvbmx5IGFkZEF2ZXJhZ2VTdWNjZXNzZnVsVXBkYXRlSXRlbUxhdGVuY3lBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgTGF0ZW5jeVRocmVzaG9sZFxuICA+O1xuICByZWFkb25seSBhZGRBdmVyYWdlU3VjY2Vzc2Z1bERlbGV0ZUl0ZW1MYXRlbmN5QWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIExhdGVuY3lUaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkQXZlcmFnZVN1Y2Nlc3NmdWxCYXRjaEdldEl0ZW1MYXRlbmN5QWxhcm0/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIExhdGVuY3lUaHJlc2hvbGRcbiAgPjtcbiAgcmVhZG9ubHkgYWRkQXZlcmFnZVN1Y2Nlc3NmdWxCYXRjaFdyaXRlSXRlbUxhdGVuY3lBbGFybT86IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgTGF0ZW5jeVRocmVzaG9sZFxuICA+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIER5bmFtb1RhYmxlTW9uaXRvcmluZ1Byb3BzXG4gIGV4dGVuZHMgRHluYW1vVGFibGVNZXRyaWNGYWN0b3J5UHJvcHMsXG4gICAgRHluYW1vVGFibGVNb25pdG9yaW5nT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgRHluYW1vVGFibGVNb25pdG9yaW5nIGV4dGVuZHMgTW9uaXRvcmluZyB7XG4gIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRhYmxlVXJsPzogc3RyaW5nO1xuICByZWFkb25seSB0YWJsZUJpbGxpbmdNb2RlOiBCaWxsaW5nTW9kZTtcblxuICByZWFkb25seSBhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeTtcbiAgcmVhZG9ubHkgZXJyb3JBbGFybUZhY3Rvcnk6IEVycm9yQWxhcm1GYWN0b3J5O1xuICByZWFkb25seSBsYXRlbmN5QWxhcm1GYWN0b3J5OiBMYXRlbmN5QWxhcm1GYWN0b3J5O1xuICByZWFkb25seSBkeW5hbW9DYXBhY2l0eUFsYXJtRmFjdG9yeTogRHluYW1vQWxhcm1GYWN0b3J5O1xuXG4gIHJlYWRvbmx5IGxhdGVuY3lBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgZXJyb3JDb3VudEFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSBkeW5hbW9SZWFkQ2FwYWNpdHlBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcbiAgcmVhZG9ubHkgZHluYW1vV3JpdGVDYXBhY2l0eUFubm90YXRpb25zOiBIb3Jpem9udGFsQW5ub3RhdGlvbltdO1xuICByZWFkb25seSB0aHJvdHRsZWRFdmVudHNBbm5vdGF0aW9uczogSG9yaXpvbnRhbEFubm90YXRpb25bXTtcblxuICByZWFkb25seSBwcm92aXNpb25lZFJlYWRVbml0c01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgcHJvdmlzaW9uZWRXcml0ZVVuaXRzTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBjb25zdW1lZFJlYWRVbml0c01ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgY29uc3VtZWRXcml0ZVVuaXRzTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSByZWFkVGhyb3R0bGVDb3VudE1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgd3JpdGVUaHJvdHRsZUNvdW50TWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSBzeXN0ZW1FcnJvck1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydDtcbiAgcmVhZG9ubHkgbGF0ZW5jeUF2ZXJhZ2VTZWFyY2hNZXRyaWNzOiBJTWV0cmljO1xuICAvLyBrZXlzIGFyZSBPcGVyYXRpb24sIGJ1dCBKU0lJIGRvZXNuJ3QgbGlrZSBub24tc3RyaW5nIHR5cGVzXG4gIHJlYWRvbmx5IGF2ZXJhZ2VQZXJPcGVyYXRpb25MYXRlbmN5TWV0cmljczogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0XG4gID47XG4gIHJlYWRvbmx5IHJlYWRDYXBhY2l0eVVzYWdlTWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0O1xuICByZWFkb25seSB3cml0ZUNhcGFjaXR5VXNhZ2VNZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IE1vbml0b3JpbmdTY29wZSwgcHJvcHM6IER5bmFtb1RhYmxlTW9uaXRvcmluZ1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIHByb3BzKTtcblxuICAgIGNvbnN0IG5hbWluZ1N0cmF0ZWd5ID0gbmV3IE1vbml0b3JpbmdOYW1pbmdTdHJhdGVneSh7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIG5hbWVkQ29uc3RydWN0OiBwcm9wcy50YWJsZSxcbiAgICAgIGZhbGxiYWNrQ29uc3RydWN0TmFtZTogdGhpcy5yZXNvbHZlVGFibGVOYW1lKHByb3BzLnRhYmxlKSxcbiAgICB9KTtcblxuICAgIHRoaXMudGl0bGUgPSBuYW1pbmdTdHJhdGVneS5yZXNvbHZlSHVtYW5SZWFkYWJsZU5hbWUoKTtcbiAgICB0aGlzLnRhYmxlVXJsID0gc2NvcGVcbiAgICAgIC5jcmVhdGVBd3NDb25zb2xlVXJsRmFjdG9yeSgpXG4gICAgICAuZ2V0RHluYW1vVGFibGVVcmwocHJvcHMudGFibGUudGFibGVOYW1lKTtcblxuICAgIHRoaXMudGFibGVCaWxsaW5nTW9kZSA9XG4gICAgICBwcm9wcy5iaWxsaW5nTW9kZSA/PyB0aGlzLnJlc29sdmVUYWJsZUJpbGxpbmdNb2RlKHByb3BzLnRhYmxlKTtcblxuICAgIHRoaXMuYWxhcm1GYWN0b3J5ID0gdGhpcy5jcmVhdGVBbGFybUZhY3RvcnkoXG4gICAgICBuYW1pbmdTdHJhdGVneS5yZXNvbHZlQWxhcm1GcmllbmRseU5hbWUoKVxuICAgICk7XG4gICAgdGhpcy5lcnJvckFsYXJtRmFjdG9yeSA9IG5ldyBFcnJvckFsYXJtRmFjdG9yeSh0aGlzLmFsYXJtRmFjdG9yeSk7XG4gICAgdGhpcy5sYXRlbmN5QWxhcm1GYWN0b3J5ID0gbmV3IExhdGVuY3lBbGFybUZhY3RvcnkodGhpcy5hbGFybUZhY3RvcnkpO1xuICAgIHRoaXMuZHluYW1vQ2FwYWNpdHlBbGFybUZhY3RvcnkgPSBuZXcgRHluYW1vQWxhcm1GYWN0b3J5KHRoaXMuYWxhcm1GYWN0b3J5KTtcbiAgICB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMubGF0ZW5jeUFubm90YXRpb25zID0gW107XG4gICAgdGhpcy5keW5hbW9SZWFkQ2FwYWNpdHlBbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMuZHluYW1vV3JpdGVDYXBhY2l0eUFubm90YXRpb25zID0gW107XG4gICAgdGhpcy50aHJvdHRsZWRFdmVudHNBbm5vdGF0aW9ucyA9IFtdO1xuXG4gICAgY29uc3QgbWV0cmljRmFjdG9yeSA9IG5ldyBEeW5hbW9UYWJsZU1ldHJpY0ZhY3RvcnkoXG4gICAgICBzY29wZS5jcmVhdGVNZXRyaWNGYWN0b3J5KCksXG4gICAgICBwcm9wc1xuICAgICk7XG4gICAgdGhpcy5wcm92aXNpb25lZFJlYWRVbml0c01ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY1Byb3Zpc2lvbmVkUmVhZENhcGFjaXR5VW5pdHMoKTtcbiAgICB0aGlzLnByb3Zpc2lvbmVkV3JpdGVVbml0c01ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY1Byb3Zpc2lvbmVkV3JpdGVDYXBhY2l0eVVuaXRzKCk7XG4gICAgdGhpcy5jb25zdW1lZFJlYWRVbml0c01ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0NvbnN1bWVkUmVhZENhcGFjaXR5VW5pdHMoKTtcbiAgICB0aGlzLmNvbnN1bWVkV3JpdGVVbml0c01ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0NvbnN1bWVkV3JpdGVDYXBhY2l0eVVuaXRzKCk7XG4gICAgdGhpcy5yZWFkVGhyb3R0bGVDb3VudE1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY1Rocm90dGxlZFJlYWRSZXF1ZXN0Q291bnQoKTtcbiAgICB0aGlzLndyaXRlVGhyb3R0bGVDb3VudE1ldHJpYyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY1Rocm90dGxlZFdyaXRlUmVxdWVzdENvdW50KCk7XG4gICAgdGhpcy5zeXN0ZW1FcnJvck1ldHJpYyA9IG1ldHJpY0ZhY3RvcnkubWV0cmljU3lzdGVtRXJyb3JzQ291bnQoKTtcbiAgICB0aGlzLmxhdGVuY3lBdmVyYWdlU2VhcmNoTWV0cmljcyA9XG4gICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY1NlYXJjaEF2ZXJhZ2VTdWNjZXNzZnVsUmVxdWVzdExhdGVuY3lJbk1pbGxpcygpO1xuICAgIHRoaXMuYXZlcmFnZVBlck9wZXJhdGlvbkxhdGVuY3lNZXRyaWNzID0ge1xuICAgICAgW09wZXJhdGlvbi5HRVRfUkVDT1JEU106XG4gICAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljQXZlcmFnZVN1Y2Nlc3NmdWxSZXF1ZXN0TGF0ZW5jeUluTWlsbGlzKFxuICAgICAgICAgIE9wZXJhdGlvbi5HRVRfUkVDT1JEU1xuICAgICAgICApLFxuICAgICAgW09wZXJhdGlvbi5RVUVSWV06XG4gICAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljQXZlcmFnZVN1Y2Nlc3NmdWxSZXF1ZXN0TGF0ZW5jeUluTWlsbGlzKFxuICAgICAgICAgIE9wZXJhdGlvbi5RVUVSWVxuICAgICAgICApLFxuICAgICAgW09wZXJhdGlvbi5TQ0FOXTpcbiAgICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNBdmVyYWdlU3VjY2Vzc2Z1bFJlcXVlc3RMYXRlbmN5SW5NaWxsaXMoXG4gICAgICAgICAgT3BlcmF0aW9uLlNDQU5cbiAgICAgICAgKSxcbiAgICAgIFtPcGVyYXRpb24uUFVUX0lURU1dOlxuICAgICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0F2ZXJhZ2VTdWNjZXNzZnVsUmVxdWVzdExhdGVuY3lJbk1pbGxpcyhcbiAgICAgICAgICBPcGVyYXRpb24uUFVUX0lURU1cbiAgICAgICAgKSxcbiAgICAgIFtPcGVyYXRpb24uR0VUX0lURU1dOlxuICAgICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0F2ZXJhZ2VTdWNjZXNzZnVsUmVxdWVzdExhdGVuY3lJbk1pbGxpcyhcbiAgICAgICAgICBPcGVyYXRpb24uR0VUX0lURU1cbiAgICAgICAgKSxcbiAgICAgIFtPcGVyYXRpb24uVVBEQVRFX0lURU1dOlxuICAgICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0F2ZXJhZ2VTdWNjZXNzZnVsUmVxdWVzdExhdGVuY3lJbk1pbGxpcyhcbiAgICAgICAgICBPcGVyYXRpb24uVVBEQVRFX0lURU1cbiAgICAgICAgKSxcbiAgICAgIFtPcGVyYXRpb24uREVMRVRFX0lURU1dOlxuICAgICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0F2ZXJhZ2VTdWNjZXNzZnVsUmVxdWVzdExhdGVuY3lJbk1pbGxpcyhcbiAgICAgICAgICBPcGVyYXRpb24uREVMRVRFX0lURU1cbiAgICAgICAgKSxcbiAgICAgIFtPcGVyYXRpb24uQkFUQ0hfR0VUX0lURU1dOlxuICAgICAgICBtZXRyaWNGYWN0b3J5Lm1ldHJpY0F2ZXJhZ2VTdWNjZXNzZnVsUmVxdWVzdExhdGVuY3lJbk1pbGxpcyhcbiAgICAgICAgICBPcGVyYXRpb24uQkFUQ0hfR0VUX0lURU1cbiAgICAgICAgKSxcbiAgICAgIFtPcGVyYXRpb24uQkFUQ0hfV1JJVEVfSVRFTV06XG4gICAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljQXZlcmFnZVN1Y2Nlc3NmdWxSZXF1ZXN0TGF0ZW5jeUluTWlsbGlzKFxuICAgICAgICAgIE9wZXJhdGlvbi5CQVRDSF9XUklURV9JVEVNXG4gICAgICAgICksXG4gICAgfTtcbiAgICB0aGlzLnJlYWRDYXBhY2l0eVVzYWdlTWV0cmljID1cbiAgICAgIG1ldHJpY0ZhY3RvcnkubWV0cmljUmVhZENhcGFjaXR5VXRpbGl6YXRpb25QZXJjZW50YWdlKCk7XG4gICAgdGhpcy53cml0ZUNhcGFjaXR5VXNhZ2VNZXRyaWMgPVxuICAgICAgbWV0cmljRmFjdG9yeS5tZXRyaWNXcml0ZUNhcGFjaXR5VXRpbGl6YXRpb25QZXJjZW50YWdlKCk7XG5cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkQ29uc3VtZWRSZWFkQ2FwYWNpdHlBbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IHByb3BzLmFkZENvbnN1bWVkUmVhZENhcGFjaXR5QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPVxuICAgICAgICB0aGlzLmR5bmFtb0NhcGFjaXR5QWxhcm1GYWN0b3J5LmFkZENvbnN1bWVkQ2FwYWNpdHlBbGFybShcbiAgICAgICAgICB0aGlzLmNvbnN1bWVkUmVhZFVuaXRzTWV0cmljLFxuICAgICAgICAgIENhcGFjaXR5VHlwZS5SRUFELFxuICAgICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgICAgZGlzYW1iaWd1YXRvclxuICAgICAgICApO1xuICAgICAgdGhpcy5keW5hbW9SZWFkQ2FwYWNpdHlBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZENvbnN1bWVkV3JpdGVDYXBhY2l0eUFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkQ29uc3VtZWRXcml0ZUNhcGFjaXR5QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPVxuICAgICAgICB0aGlzLmR5bmFtb0NhcGFjaXR5QWxhcm1GYWN0b3J5LmFkZENvbnN1bWVkQ2FwYWNpdHlBbGFybShcbiAgICAgICAgICB0aGlzLmNvbnN1bWVkV3JpdGVVbml0c01ldHJpYyxcbiAgICAgICAgICBDYXBhY2l0eVR5cGUuV1JJVEUsXG4gICAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICAgICk7XG4gICAgICB0aGlzLmR5bmFtb1dyaXRlQ2FwYWNpdHlBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBkaXNhbWJpZ3VhdG9yIGluIHByb3BzLmFkZFJlYWRUaHJvdHRsZWRFdmVudHNDb3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkUmVhZFRocm90dGxlZEV2ZW50c0NvdW50QWxhcm1bZGlzYW1iaWd1YXRvcl07XG4gICAgICBjb25zdCBjcmVhdGVkQWxhcm0gPVxuICAgICAgICB0aGlzLmR5bmFtb0NhcGFjaXR5QWxhcm1GYWN0b3J5LmFkZFRocm90dGxlZEV2ZW50c0FsYXJtKFxuICAgICAgICAgIHRoaXMucmVhZFRocm90dGxlQ291bnRNZXRyaWMsXG4gICAgICAgICAgQ2FwYWNpdHlUeXBlLlJFQUQsXG4gICAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICAgICk7XG4gICAgICB0aGlzLnRocm90dGxlZEV2ZW50c0Fubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkV3JpdGVUaHJvdHRsZWRFdmVudHNDb3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkV3JpdGVUaHJvdHRsZWRFdmVudHNDb3VudEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID1cbiAgICAgICAgdGhpcy5keW5hbW9DYXBhY2l0eUFsYXJtRmFjdG9yeS5hZGRUaHJvdHRsZWRFdmVudHNBbGFybShcbiAgICAgICAgICB0aGlzLndyaXRlVGhyb3R0bGVDb3VudE1ldHJpYyxcbiAgICAgICAgICBDYXBhY2l0eVR5cGUuV1JJVEUsXG4gICAgICAgICAgYWxhcm1Qcm9wcyxcbiAgICAgICAgICBkaXNhbWJpZ3VhdG9yXG4gICAgICAgICk7XG4gICAgICB0aGlzLnRocm90dGxlZEV2ZW50c0Fubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGRpc2FtYmlndWF0b3IgaW4gcHJvcHMuYWRkU3lzdGVtRXJyb3JDb3VudEFsYXJtKSB7XG4gICAgICBjb25zdCBhbGFybVByb3BzID0gcHJvcHMuYWRkU3lzdGVtRXJyb3JDb3VudEFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5lcnJvckFsYXJtRmFjdG9yeS5hZGRFcnJvckNvdW50QWxhcm0oXG4gICAgICAgIHRoaXMuc3lzdGVtRXJyb3JNZXRyaWMsXG4gICAgICAgIEVycm9yVHlwZS5TWVNURU1fRVJST1IsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3JcbiAgICAgICk7XG4gICAgICB0aGlzLmVycm9yQ291bnRBbm5vdGF0aW9ucy5wdXNoKGNyZWF0ZWRBbGFybS5hbm5vdGF0aW9uKTtcbiAgICAgIHRoaXMuYWRkQWxhcm0oY3JlYXRlZEFsYXJtKTtcbiAgICB9XG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uTGF0ZW5jeUFsYXJtRGVmaW5pdGlvbihcbiAgICAgIE9wZXJhdGlvbi5HRVRfUkVDT1JEUyxcbiAgICAgIHByb3BzLmFkZEF2ZXJhZ2VTdWNjZXNzZnVsR2V0UmVjb3Jkc0xhdGVuY3lBbGFybVxuICAgICk7XG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uTGF0ZW5jeUFsYXJtRGVmaW5pdGlvbihcbiAgICAgIE9wZXJhdGlvbi5RVUVSWSxcbiAgICAgIHByb3BzLmFkZEF2ZXJhZ2VTdWNjZXNzZnVsUXVlcnlMYXRlbmN5QWxhcm1cbiAgICApO1xuICAgIHRoaXMuZm9yRWFjaE9wZXJhdGlvbkxhdGVuY3lBbGFybURlZmluaXRpb24oXG4gICAgICBPcGVyYXRpb24uU0NBTixcbiAgICAgIHByb3BzLmFkZEF2ZXJhZ2VTdWNjZXNzZnVsU2NhbkxhdGVuY3lBbGFybVxuICAgICk7XG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uTGF0ZW5jeUFsYXJtRGVmaW5pdGlvbihcbiAgICAgIE9wZXJhdGlvbi5QVVRfSVRFTSxcbiAgICAgIHByb3BzLmFkZEF2ZXJhZ2VTdWNjZXNzZnVsUHV0SXRlbUxhdGVuY3lBbGFybVxuICAgICk7XG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uTGF0ZW5jeUFsYXJtRGVmaW5pdGlvbihcbiAgICAgIE9wZXJhdGlvbi5HRVRfSVRFTSxcbiAgICAgIHByb3BzLmFkZEF2ZXJhZ2VTdWNjZXNzZnVsR2V0SXRlbUxhdGVuY3lBbGFybVxuICAgICk7XG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uTGF0ZW5jeUFsYXJtRGVmaW5pdGlvbihcbiAgICAgIE9wZXJhdGlvbi5VUERBVEVfSVRFTSxcbiAgICAgIHByb3BzLmFkZEF2ZXJhZ2VTdWNjZXNzZnVsVXBkYXRlSXRlbUxhdGVuY3lBbGFybVxuICAgICk7XG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uTGF0ZW5jeUFsYXJtRGVmaW5pdGlvbihcbiAgICAgIE9wZXJhdGlvbi5ERUxFVEVfSVRFTSxcbiAgICAgIHByb3BzLmFkZEF2ZXJhZ2VTdWNjZXNzZnVsRGVsZXRlSXRlbUxhdGVuY3lBbGFybVxuICAgICk7XG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uTGF0ZW5jeUFsYXJtRGVmaW5pdGlvbihcbiAgICAgIE9wZXJhdGlvbi5CQVRDSF9HRVRfSVRFTSxcbiAgICAgIHByb3BzLmFkZEF2ZXJhZ2VTdWNjZXNzZnVsQmF0Y2hHZXRJdGVtTGF0ZW5jeUFsYXJtXG4gICAgKTtcbiAgICB0aGlzLmZvckVhY2hPcGVyYXRpb25MYXRlbmN5QWxhcm1EZWZpbml0aW9uKFxuICAgICAgT3BlcmF0aW9uLkJBVENIX1dSSVRFX0lURU0sXG4gICAgICBwcm9wcy5hZGRBdmVyYWdlU3VjY2Vzc2Z1bEJhdGNoV3JpdGVJdGVtTGF0ZW5jeUFsYXJtXG4gICAgKTtcbiAgICBwcm9wcy51c2VDcmVhdGVkQWxhcm1zPy5jb25zdW1lKHRoaXMuY3JlYXRlZEFsYXJtcygpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBmb3JFYWNoT3BlcmF0aW9uTGF0ZW5jeUFsYXJtRGVmaW5pdGlvbihcbiAgICBvcGVyYXRpb246IE9wZXJhdGlvbixcbiAgICBhbGFybT86IFJlY29yZDxzdHJpbmcsIExhdGVuY3lUaHJlc2hvbGQ+XG4gICkge1xuICAgIGZvciAoY29uc3QgZGlzYW1iaWd1YXRvciBpbiBhbGFybSkge1xuICAgICAgY29uc3QgYWxhcm1Qcm9wcyA9IGFsYXJtW2Rpc2FtYmlndWF0b3JdO1xuICAgICAgY29uc3QgY3JlYXRlZEFsYXJtID0gdGhpcy5sYXRlbmN5QWxhcm1GYWN0b3J5LmFkZExhdGVuY3lBbGFybShcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgdGhpcy5hdmVyYWdlUGVyT3BlcmF0aW9uTGF0ZW5jeU1ldHJpY3Nbb3BlcmF0aW9uXSEsXG4gICAgICAgIExhdGVuY3lUeXBlLkFWRVJBR0UsXG4gICAgICAgIGFsYXJtUHJvcHMsXG4gICAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICAgIG9wZXJhdGlvblxuICAgICAgKTtcbiAgICAgIHRoaXMubGF0ZW5jeUFubm90YXRpb25zLnB1c2goY3JlYXRlZEFsYXJtLmFubm90YXRpb24pO1xuICAgICAgdGhpcy5hZGRBbGFybShjcmVhdGVkQWxhcm0pO1xuICAgIH1cbiAgfVxuXG4gIHN1bW1hcnlXaWRnZXRzKCk6IElXaWRnZXRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIC8vIFRpdGxlXG4gICAgICB0aGlzLmNyZWF0ZVRpdGxlV2lkZ2V0KCksXG4gICAgICAvLyBSZWFkIHVuaXRzXG4gICAgICB0aGlzLmNyZWF0ZVJlYWRDYXBhY2l0eVdpZGdldChIYWxmV2lkdGgsIERlZmF1bHRTdW1tYXJ5V2lkZ2V0SGVpZ2h0KSxcbiAgICAgIC8vIFdyaXRlIHVuaXRzXG4gICAgICB0aGlzLmNyZWF0ZVdyaXRlQ2FwYWNpdHlXaWRnZXQoSGFsZldpZHRoLCBEZWZhdWx0U3VtbWFyeVdpZGdldEhlaWdodCksXG4gICAgXTtcbiAgfVxuXG4gIHdpZGdldHMoKTogSVdpZGdldFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgLy8gVGl0bGVcbiAgICAgIHRoaXMuY3JlYXRlVGl0bGVXaWRnZXQoKSxcbiAgICAgIG5ldyBDb2x1bW4oXG4gICAgICAgIC8vIFJlYWQgdW5pdHNcbiAgICAgICAgdGhpcy5jcmVhdGVSZWFkQ2FwYWNpdHlXaWRnZXQoXG4gICAgICAgICAgUXVhcnRlcldpZHRoLFxuICAgICAgICAgIERlZmF1bHRUd29MaW5lckdyYXBoV2lkZ2V0SGFsZkhlaWdodFxuICAgICAgICApLFxuICAgICAgICAvLyBXcml0ZSB1bml0c1xuICAgICAgICB0aGlzLmNyZWF0ZVdyaXRlQ2FwYWNpdHlXaWRnZXQoXG4gICAgICAgICAgUXVhcnRlcldpZHRoLFxuICAgICAgICAgIERlZmF1bHRUd29MaW5lckdyYXBoV2lkZ2V0SGFsZkhlaWdodFxuICAgICAgICApXG4gICAgICApLFxuICAgICAgLy8gTGF0ZW5jeVxuICAgICAgdGhpcy5jcmVhdGVMYXRlbmN5V2lkZ2V0KFxuICAgICAgICBRdWFydGVyV2lkdGggKyBIYWxmUXVhcnRlcldpZHRoLFxuICAgICAgICBEZWZhdWx0VHdvTGluZXJHcmFwaFdpZGdldEhlaWdodFxuICAgICAgKSxcbiAgICAgIC8vIFRocm90dGxlc1xuICAgICAgdGhpcy5jcmVhdGVUaHJvdHRsZXNXaWRnZXQoXG4gICAgICAgIEhhbGZRdWFydGVyV2lkdGgsXG4gICAgICAgIERlZmF1bHRUd29MaW5lckdyYXBoV2lkZ2V0SGVpZ2h0XG4gICAgICApLFxuICAgICAgLy8gRXJyb3JzXG4gICAgICB0aGlzLmNyZWF0ZUVycm9yc1dpZGdldChRdWFydGVyV2lkdGgsIERlZmF1bHRUd29MaW5lckdyYXBoV2lkZ2V0SGVpZ2h0KSxcbiAgICBdO1xuICB9XG5cbiAgY3JlYXRlTGF0ZW5jeVdpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJMYXRlbmN5IChBdmVyYWdlKVwiLFxuICAgICAgbGVmdDogW3RoaXMubGF0ZW5jeUF2ZXJhZ2VTZWFyY2hNZXRyaWNzXSxcbiAgICAgIGxlZnRZQXhpczogVGltZUF4aXNNaWxsaXNGcm9tWmVybyxcbiAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5sYXRlbmN5QW5ub3RhdGlvbnMsXG4gICAgICBsZWdlbmRQb3NpdGlvbjogTGVnZW5kUG9zaXRpb24uUklHSFQsXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVUaHJvdHRsZXNXaWRnZXQod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgdGl0bGU6IFwiVGhyb3R0bGVzXCIsXG4gICAgICBsZWZ0OiBbdGhpcy5yZWFkVGhyb3R0bGVDb3VudE1ldHJpYywgdGhpcy53cml0ZVRocm90dGxlQ291bnRNZXRyaWNdLFxuICAgICAgbGVmdFlBeGlzOiBDb3VudEF4aXNGcm9tWmVybyxcbiAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy50aHJvdHRsZWRFdmVudHNBbm5vdGF0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUVycm9yc1dpZGdldCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgR3JhcGhXaWRnZXQoe1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB0aXRsZTogXCJFcnJvcnNcIixcbiAgICAgIGxlZnQ6IFt0aGlzLnN5c3RlbUVycm9yTWV0cmljXSxcbiAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZXJyb3JDb3VudEFubm90YXRpb25zLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlUmVhZENhcGFjaXR5V2lkZ2V0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMudGFibGVCaWxsaW5nTW9kZSA9PT0gQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNUKSB7XG4gICAgICAvLyBzaW1wbGlmaWVkIHZpZXcgZm9yIG9uLWRlbWFuZCB0YWJsZVxuICAgICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHRpdGxlOiBcIlJlYWQgVXNhZ2VcIixcbiAgICAgICAgbGVmdDogW3RoaXMuY29uc3VtZWRSZWFkVW5pdHNNZXRyaWNdLFxuICAgICAgICBsZWZ0WUF4aXM6IENvdW50QXhpc0Zyb21aZXJvLFxuICAgICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZHluYW1vUmVhZENhcGFjaXR5QW5ub3RhdGlvbnMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBHcmFwaFdpZGdldCh7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHRpdGxlOiBcIlJlYWQgVXNhZ2VcIixcbiAgICAgIGxlZnQ6IFt0aGlzLmNvbnN1bWVkUmVhZFVuaXRzTWV0cmljLCB0aGlzLnByb3Zpc2lvbmVkUmVhZFVuaXRzTWV0cmljXSxcbiAgICAgIGxlZnRZQXhpczogQ291bnRBeGlzRnJvbVplcm8sXG4gICAgICBsZWZ0QW5ub3RhdGlvbnM6IHRoaXMuZHluYW1vUmVhZENhcGFjaXR5QW5ub3RhdGlvbnMsXG4gICAgICByaWdodDogW3RoaXMucmVhZENhcGFjaXR5VXNhZ2VNZXRyaWNdLFxuICAgICAgcmlnaHRZQXhpczogUGVyY2VudGFnZUF4aXNGcm9tWmVyb1RvSHVuZHJlZCxcbiAgICAgIGxlZ2VuZFBvc2l0aW9uOiBMZWdlbmRQb3NpdGlvbi5SSUdIVCxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZVdyaXRlQ2FwYWNpdHlXaWRnZXQod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy50YWJsZUJpbGxpbmdNb2RlID09PSBCaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QpIHtcbiAgICAgIC8vIHNpbXBsaWZpZWQgdmlldyBmb3Igb24tZGVtYW5kIHRhYmxlXG4gICAgICByZXR1cm4gbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgdGl0bGU6IFwiV3JpdGUgVXNhZ2VcIixcbiAgICAgICAgbGVmdDogW3RoaXMuY29uc3VtZWRXcml0ZVVuaXRzTWV0cmljXSxcbiAgICAgICAgbGVmdFlBeGlzOiBDb3VudEF4aXNGcm9tWmVybyxcbiAgICAgICAgbGVmdEFubm90YXRpb25zOiB0aGlzLmR5bmFtb1dyaXRlQ2FwYWNpdHlBbm5vdGF0aW9ucyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEdyYXBoV2lkZ2V0KHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgdGl0bGU6IFwiV3JpdGUgVXNhZ2VcIixcbiAgICAgIGxlZnQ6IFt0aGlzLmNvbnN1bWVkV3JpdGVVbml0c01ldHJpYywgdGhpcy5wcm92aXNpb25lZFdyaXRlVW5pdHNNZXRyaWNdLFxuICAgICAgbGVmdFlBeGlzOiBDb3VudEF4aXNGcm9tWmVybyxcbiAgICAgIGxlZnRBbm5vdGF0aW9uczogdGhpcy5keW5hbW9Xcml0ZUNhcGFjaXR5QW5ub3RhdGlvbnMsXG4gICAgICByaWdodDogW3RoaXMud3JpdGVDYXBhY2l0eVVzYWdlTWV0cmljXSxcbiAgICAgIHJpZ2h0WUF4aXM6IFBlcmNlbnRhZ2VBeGlzRnJvbVplcm9Ub0h1bmRyZWQsXG4gICAgICBsZWdlbmRQb3NpdGlvbjogTGVnZW5kUG9zaXRpb24uUklHSFQsXG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVUaXRsZVdpZGdldCgpIHtcbiAgICByZXR1cm4gbmV3IE1vbml0b3JpbmdIZWFkZXJXaWRnZXQoe1xuICAgICAgZmFtaWx5OiBcIkR5bmFtbyBUYWJsZVwiLFxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICBnb1RvTGlua1VybDogdGhpcy50YWJsZVVybCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZVRhYmxlTmFtZShkeW5hbW9UYWJsZTogSVRhYmxlKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAvLyB0cnkgdG8gdGFrZSB0aGUgbmFtZSAoaWYgc3BlY2lmaWVkKSBpbnN0ZWFkIG9mIHRva2VuXG4gICAgcmV0dXJuIChkeW5hbW9UYWJsZS5ub2RlLmRlZmF1bHRDaGlsZCBhcyBDZm5UYWJsZSk/LnRhYmxlTmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZVRhYmxlQmlsbGluZ01vZGUoZHluYW1vVGFibGU6IElUYWJsZSk6IEJpbGxpbmdNb2RlIHtcbiAgICBjb25zdCBiaWxsaW5nTW9kZSA9IChkeW5hbW9UYWJsZS5ub2RlLmRlZmF1bHRDaGlsZCBhcyBDZm5UYWJsZSlcbiAgICAgID8uYmlsbGluZ01vZGU7XG4gICAgaWYgKGJpbGxpbmdNb2RlKSB7XG4gICAgICByZXR1cm4gYmlsbGluZ01vZGUgYXMgQmlsbGluZ01vZGU7XG4gICAgfVxuICAgIC8vIGZhbGxiYWNrIHRvIGRlZmF1bHQgKGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSlcbiAgICByZXR1cm4gQmlsbGluZ01vZGUuUFJPVklTSU9ORUQ7XG4gIH1cbn1cbiJdfQ==