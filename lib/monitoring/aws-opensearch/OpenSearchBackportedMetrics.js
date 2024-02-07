"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSearchBackportedMetrics = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const ElasticsearchNamespace = "AWS/ES";
/**
 * Backported set of metric functions added in @aws-cdk/aws-elasticsearch@1.65.0.
 * @see https://github.com/aws/aws-cdk/pull/8369
 *
 * TODO: can be removed after upgrade to 1.73.0, which includes bugfixes for the
 * latency p99 metrics.
 * @see https://github.com/aws/aws-cdk/releases/tag/v1.73.0
 */
class OpenSearchBackportedMetrics {
    constructor(domain) {
        this.dimensionsMap = {
            ClientId: domain.stack.account,
            DomainName: domain.domainName,
        };
    }
    /**
     * Return the given named metric for this Domain.
     */
    metric(metricName, props) {
        return new aws_cloudwatch_1.Metric({
            namespace: ElasticsearchNamespace,
            metricName,
            dimensionsMap: this.dimensionsMap,
            ...props,
        });
    }
    /**
     * Metric for the time the cluster status is red.
     *
     * @default - maximum over 5 minutes
     */
    metricClusterStatusRed(props) {
        return this.metric("ClusterStatus.red", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for the time the cluster status is yellow.
     *
     * @default - maximum over 5 minutes
     */
    metricClusterStatusYellow(props) {
        return this.metric("ClusterStatus.yellow", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for the storage space of nodes in the cluster.
     *
     * @default - minimum over 5 minutes
     */
    metricFreeStorageSpace(props) {
        return this.metric("FreeStorageSpace", {
            statistic: aws_cloudwatch_1.Stats.MINIMUM,
            ...props,
        });
    }
    /**
     * Metric for the cluster blocking index writes.
     *
     * @default - maximum over 1 minute
     */
    metricClusterIndexWritesBlocked(props) {
        return this.metric("ClusterIndexWritesBlocked", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            period: aws_cdk_lib_1.Duration.minutes(1),
            ...props,
        });
    }
    /**
     * Metric for the cluster blocking index writes.
     *
     * @default - maximum over 1 minute
     *
     * @deprecated use metricClusterIndexWritesBlocked instead.
     */
    metricClusterIndexWriteBlocked(props) {
        return this.metricClusterIndexWritesBlocked(props);
    }
    /**
     * Metric for the number of nodes.
     *
     * @default - minimum over 1 hour
     */
    metricNodes(props) {
        return this.metric("Nodes", {
            statistic: aws_cloudwatch_1.Stats.MINIMUM,
            period: aws_cdk_lib_1.Duration.hours(1),
            ...props,
        });
    }
    /**
     * Metric for automated snapshot failures.
     *
     * @default - maximum over 5 minutes
     */
    metricAutomatedSnapshotFailure(props) {
        return this.metric("AutomatedSnapshotFailure", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for CPU utilization.
     *
     * @default - maximum over 5 minutes
     */
    metricCPUUtilization(props) {
        return this.metric("CPUUtilization", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for JVM memory pressure.
     *
     * @default - maximum over 5 minutes
     */
    metricJVMMemoryPressure(props) {
        return this.metric("JVMMemoryPressure", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for master CPU utilization.
     *
     * @default - maximum over 5 minutes
     */
    metricMasterCPUUtilization(props) {
        return this.metric("MasterCPUUtilization", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for master JVM memory pressure.
     *
     * @default - maximum over 5 minutes
     */
    metricMasterJVMMemoryPressure(props) {
        return this.metric("MasterJVMMemoryPressure", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for KMS key errors.
     *
     * @default - maximum over 5 minutes
     */
    metricKMSKeyError(props) {
        return this.metric("KMSKeyError", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for KMS key being inaccessible.
     *
     * @default - maximum over 5 minutes
     */
    metricKMSKeyInaccessible(props) {
        return this.metric("KMSKeyInaccessible", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for number of searchable documents.
     *
     * @default - maximum over 5 minutes
     */
    metricSearchableDocuments(props) {
        return this.metric("SearchableDocuments", {
            statistic: aws_cloudwatch_1.Stats.MAXIMUM,
            ...props,
        });
    }
    /**
     * Metric for search latency.
     *
     * @default - p99 over 5 minutes
     */
    metricSearchLatency(props) {
        return this.metric("SearchLatency", { statistic: "p99", ...props });
    }
    /**
     * Metric for indexing latency.
     *
     * @default - p99 over 5 minutes
     */
    metricIndexingLatency(props) {
        return this.metric("IndexingLatency", { statistic: "p99", ...props });
    }
}
exports.OpenSearchBackportedMetrics = OpenSearchBackportedMetrics;
_a = JSII_RTTI_SYMBOL_1;
OpenSearchBackportedMetrics[_a] = { fqn: "cdk-monitoring-constructs.OpenSearchBackportedMetrics", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlblNlYXJjaEJhY2twb3J0ZWRNZXRyaWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3BlblNlYXJjaEJhY2twb3J0ZWRNZXRyaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkNBQXVDO0FBQ3ZDLCtEQUtvQztBQUlwQyxNQUFNLHNCQUFzQixHQUFHLFFBQVEsQ0FBQztBQVF4Qzs7Ozs7OztHQU9HO0FBQ0gsTUFBYSwyQkFBMkI7SUFHdEMsWUFBWSxNQUFjO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTztZQUM5QixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVc7U0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxVQUFrQixFQUFFLEtBQXFCO1FBQzlDLE9BQU8sSUFBSSx1QkFBTSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxzQkFBc0I7WUFDakMsVUFBVTtZQUNWLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxHQUFHLEtBQUs7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHNCQUFzQixDQUFDLEtBQXFCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtZQUN0QyxTQUFTLEVBQUUsc0JBQUssQ0FBQyxPQUFPO1lBQ3hCLEdBQUcsS0FBSztTQUNULENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gseUJBQXlCLENBQUMsS0FBcUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFO1lBQ3pDLFNBQVMsRUFBRSxzQkFBSyxDQUFDLE9BQU87WUFDeEIsR0FBRyxLQUFLO1NBQ1QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxzQkFBc0IsQ0FBQyxLQUFxQjtRQUMxQyxPQUFPLElBQUks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Q0FBQztJQUVEOzs7O09BSUc7SUFDSCxtQkFBbUIsQ0FBQyxLQUFxQjtRQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxxQkFBcUIsQ0FBQyxLQUFxQjtRQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDOztBQS9NSCxrRUFnTkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEdXJhdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHtcbiAgRGltZW5zaW9uc01hcCxcbiAgTWV0cmljLFxuICBNZXRyaWNPcHRpb25zLFxuICBTdGF0cyxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5pbXBvcnQgKiBhcyBlbGFzdGljc2VhcmNoIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZWxhc3RpY3NlYXJjaFwiO1xuaW1wb3J0ICogYXMgb3BlbnNlYXJjaCBmcm9tIFwiYXdzLWNkay1saWIvYXdzLW9wZW5zZWFyY2hzZXJ2aWNlXCI7XG5cbmNvbnN0IEVsYXN0aWNzZWFyY2hOYW1lc3BhY2UgPSBcIkFXUy9FU1wiO1xuXG5leHBvcnQgdHlwZSBEb21haW4gPVxuICB8IG9wZW5zZWFyY2guQ2ZuRG9tYWluXG4gIHwgb3BlbnNlYXJjaC5JRG9tYWluXG4gIHwgZWxhc3RpY3NlYXJjaC5DZm5Eb21haW5cbiAgfCBlbGFzdGljc2VhcmNoLklEb21haW47XG5cbi8qKlxuICogQmFja3BvcnRlZCBzZXQgb2YgbWV0cmljIGZ1bmN0aW9ucyBhZGRlZCBpbiBAYXdzLWNkay9hd3MtZWxhc3RpY3NlYXJjaEAxLjY1LjAuXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hd3MvYXdzLWNkay9wdWxsLzgzNjlcbiAqXG4gKiBUT0RPOiBjYW4gYmUgcmVtb3ZlZCBhZnRlciB1cGdyYWRlIHRvIDEuNzMuMCwgd2hpY2ggaW5jbHVkZXMgYnVnZml4ZXMgZm9yIHRoZVxuICogbGF0ZW5jeSBwOTkgbWV0cmljcy5cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2F3cy9hd3MtY2RrL3JlbGVhc2VzL3RhZy92MS43My4wXG4gKi9cbmV4cG9ydCBjbGFzcyBPcGVuU2VhcmNoQmFja3BvcnRlZE1ldHJpY3Mge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGltZW5zaW9uc01hcDogRGltZW5zaW9uc01hcDtcblxuICBjb25zdHJ1Y3Rvcihkb21haW46IERvbWFpbikge1xuICAgIHRoaXMuZGltZW5zaW9uc01hcCA9IHtcbiAgICAgIENsaWVudElkOiBkb21haW4uc3RhY2suYWNjb3VudCxcbiAgICAgIERvbWFpbk5hbWU6IGRvbWFpbi5kb21haW5OYW1lISxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ2l2ZW4gbmFtZWQgbWV0cmljIGZvciB0aGlzIERvbWFpbi5cbiAgICovXG4gIG1ldHJpYyhtZXRyaWNOYW1lOiBzdHJpbmcsIHByb3BzPzogTWV0cmljT3B0aW9ucyk6IE1ldHJpYyB7XG4gICAgcmV0dXJuIG5ldyBNZXRyaWMoe1xuICAgICAgbmFtZXNwYWNlOiBFbGFzdGljc2VhcmNoTmFtZXNwYWNlLFxuICAgICAgbWV0cmljTmFtZSxcbiAgICAgIGRpbWVuc2lvbnNNYXA6IHRoaXMuZGltZW5zaW9uc01hcCxcbiAgICAgIC4uLnByb3BzLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldHJpYyBmb3IgdGhlIHRpbWUgdGhlIGNsdXN0ZXIgc3RhdHVzIGlzIHJlZC5cbiAgICpcbiAgICogQGRlZmF1bHQgLSBtYXhpbXVtIG92ZXIgNSBtaW51dGVzXG4gICAqL1xuICBtZXRyaWNDbHVzdGVyU3RhdHVzUmVkKHByb3BzPzogTWV0cmljT3B0aW9ucyk6IE1ldHJpYyB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljKFwiQ2x1c3RlclN0YXR1cy5yZWRcIiwge1xuICAgICAgc3RhdGlzdGljOiBTdGF0cy5NQVhJTVVNLFxuICAgICAgLi4ucHJvcHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0cmljIGZvciB0aGUgdGltZSB0aGUgY2x1c3RlciBzdGF0dXMgaXMgeWVsbG93LlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIG1heGltdW0gb3ZlciA1IG1pbnV0ZXNcbiAgICovXG4gIG1ldHJpY0NsdXN0ZXJTdGF0dXNZZWxsb3cocHJvcHM/OiBNZXRyaWNPcHRpb25zKTogTWV0cmljIHtcbiAgICByZXR1cm4gdGhpcy5tZXRyaWMoXCJDbHVzdGVyU3RhdHVzLnllbGxvd1wiLCB7XG4gICAgICBzdGF0aXN0aWM6IFN0YXRzLk1BWElNVU0sXG4gICAgICAuLi5wcm9wcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRyaWMgZm9yIHRoZSBzdG9yYWdlIHNwYWNlIG9mIG5vZGVzIGluIHRoZSBjbHVzdGVyLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIG1pbmltdW0gb3ZlciA1IG1pbnV0ZXNcbiAgICovXG4gIG1ldHJpY0ZyZWVTdG9yYWdlU3BhY2UocHJvcHM/OiBNZXRyaWNPcHRpb25zKTogTWV0cmljIHtcbiAgICByZXR1cm4gdGhpcy5tZXRyaWMoXCJGcmVlU3RvcmFnZVNwYWNlXCIsIHtcbiAgICAgIHN0YXRpc3RpYzogU3RhdHMuTUlOSU1VTSxcbiAgICAgIC4uLnByb3BzLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldHJpYyBmb3IgdGhlIGNsdXN0ZXIgYmxvY2tpbmcgaW5kZXggd3JpdGVzLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIG1heGltdW0gb3ZlciAxIG1pbnV0ZVxuICAgKi9cbiAgbWV0cmljQ2x1c3RlckluZGV4V3JpdGVzQmxvY2tlZChwcm9wcz86IE1ldHJpY09wdGlvbnMpOiBNZXRyaWMge1xuICAgIHJldHVybiB0aGlzLm1ldHJpYyhcIkNsdXN0ZXJJbmRleFdyaXRlc0Jsb2NrZWRcIiwge1xuICAgICAgc3RhdGlzdGljOiBTdGF0cy5NQVhJTVVNLFxuICAgICAgcGVyaW9kOiBEdXJhdGlvbi5taW51dGVzKDEpLFxuICAgICAgLi4ucHJvcHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0cmljIGZvciB0aGUgY2x1c3RlciBibG9ja2luZyBpbmRleCB3cml0ZXMuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gbWF4aW11bSBvdmVyIDEgbWludXRlXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIHVzZSBtZXRyaWNDbHVzdGVySW5kZXhXcml0ZXNCbG9ja2VkIGluc3RlYWQuXG4gICAqL1xuICBtZXRyaWNDbHVzdGVySW5kZXhXcml0ZUJsb2NrZWQocHJvcHM/OiBNZXRyaWNPcHRpb25zKTogTWV0cmljIHtcbiAgICByZXR1cm4gdGhpcy5tZXRyaWNDbHVzdGVySW5kZXhXcml0ZXNCbG9ja2VkKHByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRyaWMgZm9yIHRoZSBudW1iZXIgb2Ygbm9kZXMuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gbWluaW11bSBvdmVyIDEgaG91clxuICAgKi9cbiAgbWV0cmljTm9kZXMocHJvcHM/OiBNZXRyaWNPcHRpb25zKTogTWV0cmljIHtcbiAgICByZXR1cm4gdGhpcy5tZXRyaWMoXCJOb2Rlc1wiLCB7XG4gICAgICBzdGF0aXN0aWM6IFN0YXRzLk1JTklNVU0sXG4gICAgICBwZXJpb2Q6IER1cmF0aW9uLmhvdXJzKDEpLFxuICAgICAgLi4ucHJvcHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0cmljIGZvciBhdXRvbWF0ZWQgc25hcHNob3QgZmFpbHVyZXMuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gbWF4aW11bSBvdmVyIDUgbWludXRlc1xuICAgKi9cbiAgbWV0cmljQXV0b21hdGVkU25hcHNob3RGYWlsdXJlKHByb3BzPzogTWV0cmljT3B0aW9ucyk6IE1ldHJpYyB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljKFwiQXV0b21hdGVkU25hcHNob3RGYWlsdXJlXCIsIHtcbiAgICAgIHN0YXRpc3RpYzogU3RhdHMuTUFYSU1VTSxcbiAgICAgIC4uLnByb3BzLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldHJpYyBmb3IgQ1BVIHV0aWxpemF0aW9uLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIG1heGltdW0gb3ZlciA1IG1pbnV0ZXNcbiAgICovXG4gIG1ldHJpY0NQVVV0aWxpemF0aW9uKHByb3BzPzogTWV0cmljT3B0aW9ucyk6IE1ldHJpYyB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljKFwiQ1BVVXRpbGl6YXRpb25cIiwge1xuICAgICAgc3RhdGlzdGljOiBTdGF0cy5NQVhJTVVNLFxuICAgICAgLi4ucHJvcHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0cmljIGZvciBKVk0gbWVtb3J5IHByZXNzdXJlLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIG1heGltdW0gb3ZlciA1IG1pbnV0ZXNcbiAgICovXG4gIG1ldHJpY0pWTU1lbW9yeVByZXNzdXJlKHByb3BzPzogTWV0cmljT3B0aW9ucyk6IE1ldHJpYyB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljKFwiSlZNTWVtb3J5UHJlc3N1cmVcIiwge1xuICAgICAgc3RhdGlzdGljOiBTdGF0cy5NQVhJTVVNLFxuICAgICAgLi4ucHJvcHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0cmljIGZvciBtYXN0ZXIgQ1BVIHV0aWxpemF0aW9uLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIG1heGltdW0gb3ZlciA1IG1pbnV0ZXNcbiAgICovXG4gIG1ldHJpY01hc3RlckNQVVV0aWxpemF0aW9uKHByb3BzPzogTWV0cmljT3B0aW9ucyk6IE1ldHJpYyB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljKFwiTWFzdGVyQ1BVVXRpbGl6YXRpb25cIiwge1xuICAgICAgc3RhdGlzdGljOiBTdGF0cy5NQVhJTVVNLFxuICAgICAgLi4ucHJvcHMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0cmljIGZvciBtYXN0ZXIgSlZNIG1lbW9yeSBwcmVzc3VyZS5cbiAgICpcbiAgICogQGRlZmF1bHQgLSBtYXhpbXVtIG92ZXIgNSBtaW51dGVzXG4gICAqL1xuICBtZXRyaWNNYXN0ZXJKVk1NZW1vcnlQcmVzc3VyZShwcm9wcz86IE1ldHJpY09wdGlvbnMpOiBNZXRyaWMge1xuICAgIHJldHVybiB0aGlzLm1ldHJpYyhcIk1hc3RlckpWTU1lbW9yeVByZXNzdXJlXCIsIHtcbiAgICAgIHN0YXRpc3RpYzogU3RhdHMuTUFYSU1VTSxcbiAgICAgIC4uLnByb3BzLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldHJpYyBmb3IgS01TIGtleSBlcnJvcnMuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gbWF4aW11bSBvdmVyIDUgbWludXRlc1xuICAgKi9cbiAgbWV0cmljS01TS2V5RXJyb3IocHJvcHM/OiBNZXRyaWNPcHRpb25zKTogTWV0cmljIHtcbiAgICByZXR1cm4gdGhpcy5tZXRyaWMoXCJLTVNLZXlFcnJvclwiLCB7XG4gICAgICBzdGF0aXN0aWM6IFN0YXRzLk1BWElNVU0sXG4gICAgICAuLi5wcm9wcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRyaWMgZm9yIEtNUyBrZXkgYmVpbmcgaW5hY2Nlc3NpYmxlLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIG1heGltdW0gb3ZlciA1IG1pbnV0ZXNcbiAgICovXG4gIG1ldHJpY0tNU0tleUluYWNjZXNzaWJsZShwcm9wcz86IE1ldHJpY09wdGlvbnMpOiBNZXRyaWMge1xuICAgIHJldHVybiB0aGlzLm1ldHJpYyhcIktNU0tleUluYWNjZXNzaWJsZVwiLCB7XG4gICAgICBzdGF0aXN0aWM6IFN0YXRzLk1BWElNVU0sXG4gICAgICAuLi5wcm9wcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRyaWMgZm9yIG51bWJlciBvZiBzZWFyY2hhYmxlIGRvY3VtZW50cy5cbiAgICpcbiAgICogQGRlZmF1bHQgLSBtYXhpbXVtIG92ZXIgNSBtaW51dGVzXG4gICAqL1xuICBtZXRyaWNTZWFyY2hhYmxlRG9jdW1lbnRzKHByb3BzPzogTWV0cmljT3B0aW9ucyk6IE1ldHJpYyB7XG4gICAgcmV0dXJuIHRoaXMubWV0cmljKFwiU2VhcmNoYWJsZURvY3VtZW50c1wiLCB7XG4gICAgICBzdGF0aXN0aWM6IFN0YXRzLk1BWElNVU0sXG4gICAgICAuLi5wcm9wcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRyaWMgZm9yIHNlYXJjaCBsYXRlbmN5LlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIHA5OSBvdmVyIDUgbWludXRlc1xuICAgKi9cbiAgbWV0cmljU2VhcmNoTGF0ZW5jeShwcm9wcz86IE1ldHJpY09wdGlvbnMpOiBNZXRyaWMge1xuICAgIHJldHVybiB0aGlzLm1ldHJpYyhcIlNlYXJjaExhdGVuY3lcIiwgeyBzdGF0aXN0aWM6IFwicDk5XCIsIC4uLnByb3BzIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldHJpYyBmb3IgaW5kZXhpbmcgbGF0ZW5jeS5cbiAgICpcbiAgICogQGRlZmF1bHQgLSBwOTkgb3ZlciA1IG1pbnV0ZXNcbiAgICovXG4gIG1ldHJpY0luZGV4aW5nTGF0ZW5jeShwcm9wcz86IE1ldHJpY09wdGlvbnMpOiBNZXRyaWMge1xuICAgIHJldHVybiB0aGlzLm1ldHJpYyhcIkluZGV4aW5nTGF0ZW5jeVwiLCB7IHN0YXRpc3RpYzogXCJwOTlcIiwgLi4ucHJvcHMgfSk7XG4gIH1cbn1cbiJdfQ==