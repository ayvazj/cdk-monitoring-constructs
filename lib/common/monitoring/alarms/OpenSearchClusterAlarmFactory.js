"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSearchClusterAlarmFactory = exports.ElasticsearchClusterStatus = exports.OpenSearchClusterStatus = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
var OpenSearchClusterStatus;
(function (OpenSearchClusterStatus) {
    OpenSearchClusterStatus["RED"] = "red";
    OpenSearchClusterStatus["YELLOW"] = "yellow";
})(OpenSearchClusterStatus = exports.OpenSearchClusterStatus || (exports.OpenSearchClusterStatus = {}));
var ElasticsearchClusterStatus;
(function (ElasticsearchClusterStatus) {
    ElasticsearchClusterStatus["RED"] = "red";
    ElasticsearchClusterStatus["YELLOW"] = "yellow";
})(ElasticsearchClusterStatus = exports.ElasticsearchClusterStatus || (exports.ElasticsearchClusterStatus = {}));
class OpenSearchClusterAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addClusterStatusAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: 0,
            alarmNameSuffix: "ClusterStatus",
            alarmDescription: `Cluster is in ${props.status} status`,
            // we will dedupe any kind of message count issue to the same ticket
            alarmDedupeStringSuffix: "ESClusterStatus",
        });
    }
    addClusterIndexWritesBlockedAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxBlockedWrites,
            alarmNameSuffix: "ClusterIndexWritesBlocked",
            alarmDescription: "Cluster writes are blocked",
            // we will dedupe any kind of message count issue to the same ticket
            alarmDedupeStringSuffix: "ESClusterWritesBlocked",
        });
    }
    addClusterNodeCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minNodes,
            alarmNameSuffix: "Nodes",
            alarmDescription: "Cluster node count is too low",
            // we will dedupe any kind of message count issue to the same ticket
            alarmDedupeStringSuffix: "ESClusterNodeCount",
        });
    }
    addAutomatedSnapshotFailureAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxFailures,
            alarmNameSuffix: "AutomatedSnapshotFailure",
            alarmDescription: "Cluster automated snapshots are failing",
            // we will dedupe any kind of message count issue to the same ticket
            alarmDedupeStringSuffix: "ESClusterAutomatedSnapshots",
        });
    }
    addKmsKeyErrorAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxErrors,
            alarmNameSuffix: "KMSKeyError",
            alarmDescription: "Cluster KMS keys are throwing errors",
            // we will dedupe any kind of message count issue to the same ticket
            alarmDedupeStringSuffix: "ESClusterKmsKeyError",
        });
    }
    addKmsKeyInaccessibleAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.BREACHING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.maxAccessAttempts,
            alarmNameSuffix: "KMSKeyInaccessible",
            alarmDescription: "Cluster KMS keys are inaccessible",
            // we will dedupe any kind of message count issue to the same ticket
            alarmDedupeStringSuffix: "ESClusterKmsKeyInaccessible",
        });
    }
}
exports.OpenSearchClusterAlarmFactory = OpenSearchClusterAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
OpenSearchClusterAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.OpenSearchClusterAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblNlYXJjaENsdXN0ZXJBbGFybUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPcGVuU2VhcmNoQ2x1c3RlckFsYXJtRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUdvQztBQUtwQyxJQUFZLHVCQUdYO0FBSEQsV0FBWSx1QkFBdUI7SUFDakMsc0NBQVcsQ0FBQTtJQUNYLDRDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyx1QkFBdUIsR0FBdkIsK0JBQXVCLEtBQXZCLCtCQUF1QixRQUdsQztBQUVELElBQVksMEJBR1g7QUFIRCxXQUFZLDBCQUEwQjtJQUNwQyx5Q0FBVyxDQUFBO0lBQ1gsK0NBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUhXLDBCQUEwQixHQUExQixrQ0FBMEIsS0FBMUIsa0NBQTBCLFFBR3JDO0FBOEJELE1BQWEsNkJBQTZCO0lBR3hDLFlBQVksWUFBMEI7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVELHFCQUFxQixDQUNuQixNQUE4QixFQUM5QixLQUEyQyxFQUMzQyxhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxnQkFBZ0IsRUFDZCxLQUFLLENBQUMsd0JBQXdCLElBQUksaUNBQWdCLENBQUMsU0FBUztZQUM5RCxrQkFBa0IsRUFDaEIsS0FBSyxDQUFDLDBCQUEwQjtnQkFDaEMsbUNBQWtCLENBQUMsc0JBQXNCO1lBQzNDLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsQ0FBQztZQUNaLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLGdCQUFnQixFQUFFLGlCQUFpQixLQUFLLENBQUMsTUFBTSxTQUFTO1lBQ3hELG9FQUFvRTtZQUNwRSx1QkFBdUIsRUFBRSxpQkFBaUI7U0FDM0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlDQUFpQyxDQUMvQixNQUE4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QyxlQUFlLEVBQUUsb0JBQW9CO1lBQ3JDLGdCQUFnQixFQUFFLG1DQUFtQztZQUNyRCxvRUFBb0U7WUFDcEUsdUJBQXVCLEVBQUUsNkJBQTZCO1NBQ3ZELENBQUMsQ0FBQztJQUNMLENBQUM7O0FBbklILHNFQW9JQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBhcmlzb25PcGVyYXRvcixcbiAgVHJlYXRNaXNzaW5nRGF0YSxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IEFsYXJtRmFjdG9yeSwgQ3VzdG9tQWxhcm1UaHJlc2hvbGQgfSBmcm9tIFwiLi4vLi4vYWxhcm1cIjtcbmltcG9ydCB7IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQgfSBmcm9tIFwiLi4vLi4vbWV0cmljXCI7XG5cbmV4cG9ydCBlbnVtIE9wZW5TZWFyY2hDbHVzdGVyU3RhdHVzIHtcbiAgUkVEID0gXCJyZWRcIixcbiAgWUVMTE9XID0gXCJ5ZWxsb3dcIixcbn1cblxuZXhwb3J0IGVudW0gRWxhc3RpY3NlYXJjaENsdXN0ZXJTdGF0dXMge1xuICBSRUQgPSBcInJlZFwiLFxuICBZRUxMT1cgPSBcInllbGxvd1wiLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5TZWFyY2hDbHVzdGVyU3RhdHVzQ3VzdG9taXphdGlvblxuICBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgc3RhdHVzOiBPcGVuU2VhcmNoQ2x1c3RlclN0YXR1cyB8IEVsYXN0aWNzZWFyY2hDbHVzdGVyU3RhdHVzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5TZWFyY2hDbHVzdGVySW5kZXhXcml0ZXNCbG9ja2VkVGhyZXNob2xkXG4gIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSBtYXhCbG9ja2VkV3JpdGVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlblNlYXJjaENsdXN0ZXJOb2Rlc1RocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWluTm9kZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuU2VhcmNoQ2x1c3RlckF1dG9tYXRlZFNuYXBzaG90RmFpbHVyZVRocmVzaG9sZFxuICBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWF4RmFpbHVyZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuU2VhcmNoS21zS2V5RXJyb3JUaHJlc2hvbGQgZXh0ZW5kcyBDdXN0b21BbGFybVRocmVzaG9sZCB7XG4gIHJlYWRvbmx5IG1heEVycm9yczogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5TZWFyY2hLbXNLZXlJbmFjY2Vzc2libGVUaHJlc2hvbGRcbiAgZXh0ZW5kcyBDdXN0b21BbGFybVRocmVzaG9sZCB7XG4gIHJlYWRvbmx5IG1heEFjY2Vzc0F0dGVtcHRzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBPcGVuU2VhcmNoQ2x1c3RlckFsYXJtRmFjdG9yeSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeTtcblxuICBjb25zdHJ1Y3RvcihhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeSkge1xuICAgIHRoaXMuYWxhcm1GYWN0b3J5ID0gYWxhcm1GYWN0b3J5O1xuICB9XG5cbiAgYWRkQ2x1c3RlclN0YXR1c0FsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogT3BlblNlYXJjaENsdXN0ZXJTdGF0dXNDdXN0b21pemF0aW9uLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuQlJFQUNISU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJDbHVzdGVyU3RhdHVzXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBgQ2x1c3RlciBpcyBpbiAke3Byb3BzLnN0YXR1c30gc3RhdHVzYCxcbiAgICAgIC8vIHdlIHdpbGwgZGVkdXBlIGFueSBraW5kIG9mIG1lc3NhZ2UgY291bnQgaXNzdWUgdG8gdGhlIHNhbWUgdGlja2V0XG4gICAgICBhbGFybURlZHVwZVN0cmluZ1N1ZmZpeDogXCJFU0NsdXN0ZXJTdGF0dXNcIixcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENsdXN0ZXJJbmRleFdyaXRlc0Jsb2NrZWRBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IE9wZW5TZWFyY2hDbHVzdGVySW5kZXhXcml0ZXNCbG9ja2VkVGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuQlJFQUNISU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4QmxvY2tlZFdyaXRlcyxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJDbHVzdGVySW5kZXhXcml0ZXNCbG9ja2VkXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIkNsdXN0ZXIgd3JpdGVzIGFyZSBibG9ja2VkXCIsXG4gICAgICAvLyB3ZSB3aWxsIGRlZHVwZSBhbnkga2luZCBvZiBtZXNzYWdlIGNvdW50IGlzc3VlIHRvIHRoZSBzYW1lIHRpY2tldFxuICAgICAgYWxhcm1EZWR1cGVTdHJpbmdTdWZmaXg6IFwiRVNDbHVzdGVyV3JpdGVzQmxvY2tlZFwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ2x1c3Rlck5vZGVDb3VudEFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogT3BlblNlYXJjaENsdXN0ZXJOb2Rlc1RocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLkJSRUFDSElORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkxFU1NfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1pbk5vZGVzLFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBcIk5vZGVzXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIkNsdXN0ZXIgbm9kZSBjb3VudCBpcyB0b28gbG93XCIsXG4gICAgICAvLyB3ZSB3aWxsIGRlZHVwZSBhbnkga2luZCBvZiBtZXNzYWdlIGNvdW50IGlzc3VlIHRvIHRoZSBzYW1lIHRpY2tldFxuICAgICAgYWxhcm1EZWR1cGVTdHJpbmdTdWZmaXg6IFwiRVNDbHVzdGVyTm9kZUNvdW50XCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRBdXRvbWF0ZWRTbmFwc2hvdEZhaWx1cmVBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IE9wZW5TZWFyY2hDbHVzdGVyQXV0b21hdGVkU25hcHNob3RGYWlsdXJlVGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuQlJFQUNISU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4RmFpbHVyZXMsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiQXV0b21hdGVkU25hcHNob3RGYWlsdXJlXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIkNsdXN0ZXIgYXV0b21hdGVkIHNuYXBzaG90cyBhcmUgZmFpbGluZ1wiLFxuICAgICAgLy8gd2Ugd2lsbCBkZWR1cGUgYW55IGtpbmQgb2YgbWVzc2FnZSBjb3VudCBpc3N1ZSB0byB0aGUgc2FtZSB0aWNrZXRcbiAgICAgIGFsYXJtRGVkdXBlU3RyaW5nU3VmZml4OiBcIkVTQ2x1c3RlckF1dG9tYXRlZFNuYXBzaG90c1wiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkS21zS2V5RXJyb3JBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IE9wZW5TZWFyY2hLbXNLZXlFcnJvclRocmVzaG9sZCxcbiAgICBkaXNhbWJpZ3VhdG9yPzogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB0aGlzLmFsYXJtRmFjdG9yeS5hZGRBbGFybShtZXRyaWMsIHtcbiAgICAgIHRyZWF0TWlzc2luZ0RhdGE6XG4gICAgICAgIHByb3BzLnRyZWF0TWlzc2luZ0RhdGFPdmVycmlkZSA/PyBUcmVhdE1pc3NpbmdEYXRhLkJSRUFDSElORyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkdSRUFURVJfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1heEVycm9ycyxcbiAgICAgIGFsYXJtTmFtZVN1ZmZpeDogXCJLTVNLZXlFcnJvclwiLFxuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogXCJDbHVzdGVyIEtNUyBrZXlzIGFyZSB0aHJvd2luZyBlcnJvcnNcIixcbiAgICAgIC8vIHdlIHdpbGwgZGVkdXBlIGFueSBraW5kIG9mIG1lc3NhZ2UgY291bnQgaXNzdWUgdG8gdGhlIHNhbWUgdGlja2V0XG4gICAgICBhbGFybURlZHVwZVN0cmluZ1N1ZmZpeDogXCJFU0NsdXN0ZXJLbXNLZXlFcnJvclwiLFxuICAgIH0pO1xuICB9XG5cbiAgYWRkS21zS2V5SW5hY2Nlc3NpYmxlQWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBPcGVuU2VhcmNoS21zS2V5SW5hY2Nlc3NpYmxlVGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuQlJFQUNISU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4QWNjZXNzQXR0ZW1wdHMsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiS01TS2V5SW5hY2Nlc3NpYmxlXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIkNsdXN0ZXIgS01TIGtleXMgYXJlIGluYWNjZXNzaWJsZVwiLFxuICAgICAgLy8gd2Ugd2lsbCBkZWR1cGUgYW55IGtpbmQgb2YgbWVzc2FnZSBjb3VudCBpc3N1ZSB0byB0aGUgc2FtZSB0aWNrZXRcbiAgICAgIGFsYXJtRGVkdXBlU3RyaW5nU3VmZml4OiBcIkVTQ2x1c3Rlckttc0tleUluYWNjZXNzaWJsZVwiLFxuICAgIH0pO1xuICB9XG59XG4iXX0=