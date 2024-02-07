"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsManagerAlarmFactory = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cloudwatch_1 = require("aws-cdk-lib/aws-cloudwatch");
const NUMBER_OF_DATAPOINTS = 1;
class SecretsManagerAlarmFactory {
    constructor(alarmFactory) {
        this.alarmFactory = alarmFactory;
    }
    addMinSecretCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            datapointsToAlarm: props.datapointsToAlarm ?? NUMBER_OF_DATAPOINTS,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD,
            ...props,
            disambiguator,
            threshold: props.minSecretCount,
            alarmNameSuffix: "Secrets-Count-Min",
            alarmDescription: "Number of secrets is too low.",
        });
    }
    addMaxSecretCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            comparisonOperator: props.comparisonOperatorOverride ??
                aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD,
            datapointsToAlarm: props.datapointsToAlarm ?? NUMBER_OF_DATAPOINTS,
            ...props,
            disambiguator,
            threshold: props.maxSecretCount,
            alarmNameSuffix: "Secrets-Count-Max",
            alarmDescription: "Number of secrets is too high.",
        });
    }
    addChangeInSecretCountAlarm(metric, props, disambiguator) {
        return this.alarmFactory.addAlarm(metric, {
            ...props,
            disambiguator,
            treatMissingData: props.treatMissingDataOverride ?? aws_cloudwatch_1.TreatMissingData.MISSING,
            threshold: props.requiredSecretCount,
            comparisonOperator: this.getComparisonOperator(props),
            datapointsToAlarm: props.datapointsToAlarm ?? NUMBER_OF_DATAPOINTS,
            alarmNameSuffix: "Secrets-Count-Change",
            alarmDescription: this.getDefaultDescription(props),
        });
    }
    getDefaultDescription(props) {
        if (props.alarmWhenIncreased && props.alarmWhenDecreased) {
            return "Secret count: Secret count has changed.";
        }
        else if (props.alarmWhenIncreased) {
            return "Secret count: Secret count has increased.";
        }
        else if (props.alarmWhenDecreased) {
            return "Secret count: Secret count has decreased.";
        }
        else {
            throw new Error("You need to alarm when the value has increased, decreased, or both.");
        }
    }
    getComparisonOperator(props) {
        if (props.alarmWhenIncreased && props.alarmWhenDecreased) {
            return aws_cloudwatch_1.ComparisonOperator.LESS_THAN_LOWER_OR_GREATER_THAN_UPPER_THRESHOLD;
        }
        else if (props.alarmWhenDecreased) {
            return aws_cloudwatch_1.ComparisonOperator.LESS_THAN_THRESHOLD;
        }
        else if (props.alarmWhenIncreased) {
            return aws_cloudwatch_1.ComparisonOperator.GREATER_THAN_THRESHOLD;
        }
        else {
            throw new Error("You need to alarm when the value has increased, decreased, or both.");
        }
    }
}
exports.SecretsManagerAlarmFactory = SecretsManagerAlarmFactory;
_a = JSII_RTTI_SYMBOL_1;
SecretsManagerAlarmFactory[_a] = { fqn: "cdk-monitoring-constructs.SecretsManagerAlarmFactory", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjcmV0c01hbmFnZXJBbGFybUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZWNyZXRzTWFuYWdlckFsYXJtRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUdvQztBQUtwQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsQ0FBQztBQWlCL0IsTUFBYSwwQkFBMEI7SUFHckMsWUFBWSxZQUEwQjtRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0JBQXNCLENBQ3BCLE1BQThCLEVBQzlCLEtBQThCLEVBQzlCLGFBQXNCO1FBRXRCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hDLGdCQUFnQixFQUNkLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxpQ0FBZ0IsQ0FBQyxPQUFPO1lBQzVELGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxvQkFBb0I7WUFDbEUsa0JBQWtCLEVBQ2hCLEtBQUssQ0FBQywwQkFBMEI7Z0JBQ2hDLG1DQUFrQixDQUFDLG1CQUFtQjtZQUN4QyxHQUFHLEtBQUs7WUFDUixhQUFhO1lBQ2IsU0FBUyxFQUFFLEtBQUssQ0FBQyxjQUFjO1lBQy9CLGVBQWUsRUFBRSxtQkFBbUI7WUFDcEMsZ0JBQWdCLEVBQUUsK0JBQStCO1NBQ2xELENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBc0IsQ0FDcEIsTUFBOEIsRUFDOUIsS0FBOEIsRUFDOUIsYUFBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsZ0JBQWdCLEVBQ2QsS0FBSyxDQUFDLHdCQUF3QixJQUFJLGlDQUFnQixDQUFDLE9BQU87WUFDNUQsa0JBQWtCLEVBQ2hCLEtBQUssQ0FBQywwQkFBMEI7Z0JBQ2hDLG1DQUFrQixDQUFDLHNCQUFzQjtZQUMzQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsaUJBQWlCLElBQUksb0JBQW9CO1lBQ2xFLEdBQUcsS0FBSztZQUNSLGFBQWE7WUFDYixTQUFTLEVBQUUsS0FBSyxDQUFDLGNBQWM7WUFDL0IsZUFBZSxFQUFFLG1CQUFtQjtZQUNwQyxnQkFBZ0IsRUFBRSxnQ0FBZ0M7U0FDbkQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUEyQixDQUN6QixNQUE4QixFQUM5QixLQUFtQyxFQUNuQyxhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxHQUFHLEtBQUs7WUFDUixhQUFhO1lBQ2IsZ0JBQWdCLEVBQ2QsS0FBSyxDQUFDLHdCQUF3QixJQUFJLGlDQUFnQixDQUFDLE9BQU87WUFDNUQsU0FBUyxFQUFFLEtBQUssQ0FBQyxtQkFBbUI7WUFDcEMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQztZQUNyRCxpQkFBaUIsRUFBRSxLQUFLLENBQUMsaUJBQWlCLElBQUksb0JBQW9CO1lBQ2xFLGVBQWUsRUFBRSxzQkFBc0I7WUFDdkMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQztTQUNwRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBbUM7UUFDL0QsSUFBSSxLQUFLLENBQUMsa0JBQWtCLElBQUksS0FBSyxDQUFDLGtCQUFrQixFQUFFO1lBQ3hELE9BQU8seUNBQXlDLENBQUM7U0FDbEQ7YUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtZQUNuQyxPQUFPLDJDQUEyQyxDQUFDO1NBQ3BEO2FBQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLEVBQUU7WUFDbkMsT0FBTywyQ0FBMkMsQ0FBQztTQUNwRDthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYixxRUFBcUUsQ0FDdEUsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLHFCQUFxQixDQUFDLEtBQW1DO1FBQy9ELElBQUksS0FBSyxDQUFDLGtCQUFrQixJQUFJLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtZQUN4RCxPQUFPLG1DQUFrQixDQUFDLCtDQUErQyxDQUFDO1NBQzNFO2FBQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLEVBQUU7WUFDbkMsT0FBTyxtQ0FBa0IsQ0FBQyxtQkFBbUIsQ0FBQztTQUMvQzthQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixFQUFFO1lBQ25DLE9BQU8sbUNBQWtCLENBQUMsc0JBQXNCLENBQUM7U0FDbEQ7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQ2IscUVBQXFFLENBQ3RFLENBQUM7U0FDSDtJQUNILENBQUM7O0FBM0ZILGdFQTRGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBhcmlzb25PcGVyYXRvcixcbiAgVHJlYXRNaXNzaW5nRGF0YSxcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoXCI7XG5cbmltcG9ydCB7IEFsYXJtRmFjdG9yeSwgQ3VzdG9tQWxhcm1UaHJlc2hvbGQgfSBmcm9tIFwiLi4vLi4vYWxhcm1cIjtcbmltcG9ydCB7IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQgfSBmcm9tIFwiLi4vLi4vbWV0cmljXCI7XG5cbmNvbnN0IE5VTUJFUl9PRl9EQVRBUE9JTlRTID0gMTtcblxuZXhwb3J0IGludGVyZmFjZSBNaW5TZWNyZXRDb3VudFRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWluU2VjcmV0Q291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXhTZWNyZXRDb3VudFRocmVzaG9sZCBleHRlbmRzIEN1c3RvbUFsYXJtVGhyZXNob2xkIHtcbiAgcmVhZG9ubHkgbWF4U2VjcmV0Q291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VJblNlY3JldENvdW50VGhyZXNob2xkIGV4dGVuZHMgQ3VzdG9tQWxhcm1UaHJlc2hvbGQge1xuICByZWFkb25seSByZXF1aXJlZFNlY3JldENvdW50OiBudW1iZXI7XG4gIHJlYWRvbmx5IGFsYXJtV2hlbkluY3JlYXNlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgYWxhcm1XaGVuRGVjcmVhc2VkOiBib29sZWFuO1xuICByZWFkb25seSBhZGRpdGlvbmFsRGVzY3JpcHRpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBTZWNyZXRzTWFuYWdlckFsYXJtRmFjdG9yeSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeTtcblxuICBjb25zdHJ1Y3RvcihhbGFybUZhY3Rvcnk6IEFsYXJtRmFjdG9yeSkge1xuICAgIHRoaXMuYWxhcm1GYWN0b3J5ID0gYWxhcm1GYWN0b3J5O1xuICB9XG5cbiAgYWRkTWluU2VjcmV0Q291bnRBbGFybShcbiAgICBtZXRyaWM6IE1ldHJpY1dpdGhBbGFybVN1cHBvcnQsXG4gICAgcHJvcHM6IE1pblNlY3JldENvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIGRhdGFwb2ludHNUb0FsYXJtOiBwcm9wcy5kYXRhcG9pbnRzVG9BbGFybSA/PyBOVU1CRVJfT0ZfREFUQVBPSU5UUyxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjpcbiAgICAgICAgcHJvcHMuY29tcGFyaXNvbk9wZXJhdG9yT3ZlcnJpZGUgPz9cbiAgICAgICAgQ29tcGFyaXNvbk9wZXJhdG9yLkxFU1NfVEhBTl9USFJFU0hPTEQsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGRpc2FtYmlndWF0b3IsXG4gICAgICB0aHJlc2hvbGQ6IHByb3BzLm1pblNlY3JldENvdW50LFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBcIlNlY3JldHMtQ291bnQtTWluXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiBcIk51bWJlciBvZiBzZWNyZXRzIGlzIHRvbyBsb3cuXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRNYXhTZWNyZXRDb3VudEFsYXJtKFxuICAgIG1ldHJpYzogTWV0cmljV2l0aEFsYXJtU3VwcG9ydCxcbiAgICBwcm9wczogTWF4U2VjcmV0Q291bnRUaHJlc2hvbGQsXG4gICAgZGlzYW1iaWd1YXRvcj86IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5hbGFybUZhY3RvcnkuYWRkQWxhcm0obWV0cmljLCB7XG4gICAgICB0cmVhdE1pc3NpbmdEYXRhOlxuICAgICAgICBwcm9wcy50cmVhdE1pc3NpbmdEYXRhT3ZlcnJpZGUgPz8gVHJlYXRNaXNzaW5nRGF0YS5NSVNTSU5HLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOlxuICAgICAgICBwcm9wcy5jb21wYXJpc29uT3BlcmF0b3JPdmVycmlkZSA/P1xuICAgICAgICBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRCxcbiAgICAgIGRhdGFwb2ludHNUb0FsYXJtOiBwcm9wcy5kYXRhcG9pbnRzVG9BbGFybSA/PyBOVU1CRVJfT0ZfREFUQVBPSU5UUyxcbiAgICAgIC4uLnByb3BzLFxuICAgICAgZGlzYW1iaWd1YXRvcixcbiAgICAgIHRocmVzaG9sZDogcHJvcHMubWF4U2VjcmV0Q291bnQsXG4gICAgICBhbGFybU5hbWVTdWZmaXg6IFwiU2VjcmV0cy1Db3VudC1NYXhcIixcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIHNlY3JldHMgaXMgdG9vIGhpZ2guXCIsXG4gICAgfSk7XG4gIH1cblxuICBhZGRDaGFuZ2VJblNlY3JldENvdW50QWxhcm0oXG4gICAgbWV0cmljOiBNZXRyaWNXaXRoQWxhcm1TdXBwb3J0LFxuICAgIHByb3BzOiBDaGFuZ2VJblNlY3JldENvdW50VGhyZXNob2xkLFxuICAgIGRpc2FtYmlndWF0b3I/OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxhcm1GYWN0b3J5LmFkZEFsYXJtKG1ldHJpYywge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBkaXNhbWJpZ3VhdG9yLFxuICAgICAgdHJlYXRNaXNzaW5nRGF0YTpcbiAgICAgICAgcHJvcHMudHJlYXRNaXNzaW5nRGF0YU92ZXJyaWRlID8/IFRyZWF0TWlzc2luZ0RhdGEuTUlTU0lORyxcbiAgICAgIHRocmVzaG9sZDogcHJvcHMucmVxdWlyZWRTZWNyZXRDb3VudCxcbiAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjogdGhpcy5nZXRDb21wYXJpc29uT3BlcmF0b3IocHJvcHMpLFxuICAgICAgZGF0YXBvaW50c1RvQWxhcm06IHByb3BzLmRhdGFwb2ludHNUb0FsYXJtID8/IE5VTUJFUl9PRl9EQVRBUE9JTlRTLFxuICAgICAgYWxhcm1OYW1lU3VmZml4OiBcIlNlY3JldHMtQ291bnQtQ2hhbmdlXCIsXG4gICAgICBhbGFybURlc2NyaXB0aW9uOiB0aGlzLmdldERlZmF1bHREZXNjcmlwdGlvbihwcm9wcyksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldERlZmF1bHREZXNjcmlwdGlvbihwcm9wczogQ2hhbmdlSW5TZWNyZXRDb3VudFRocmVzaG9sZCkge1xuICAgIGlmIChwcm9wcy5hbGFybVdoZW5JbmNyZWFzZWQgJiYgcHJvcHMuYWxhcm1XaGVuRGVjcmVhc2VkKSB7XG4gICAgICByZXR1cm4gXCJTZWNyZXQgY291bnQ6IFNlY3JldCBjb3VudCBoYXMgY2hhbmdlZC5cIjtcbiAgICB9IGVsc2UgaWYgKHByb3BzLmFsYXJtV2hlbkluY3JlYXNlZCkge1xuICAgICAgcmV0dXJuIFwiU2VjcmV0IGNvdW50OiBTZWNyZXQgY291bnQgaGFzIGluY3JlYXNlZC5cIjtcbiAgICB9IGVsc2UgaWYgKHByb3BzLmFsYXJtV2hlbkRlY3JlYXNlZCkge1xuICAgICAgcmV0dXJuIFwiU2VjcmV0IGNvdW50OiBTZWNyZXQgY291bnQgaGFzIGRlY3JlYXNlZC5cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIllvdSBuZWVkIHRvIGFsYXJtIHdoZW4gdGhlIHZhbHVlIGhhcyBpbmNyZWFzZWQsIGRlY3JlYXNlZCwgb3IgYm90aC5cIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldENvbXBhcmlzb25PcGVyYXRvcihwcm9wczogQ2hhbmdlSW5TZWNyZXRDb3VudFRocmVzaG9sZCkge1xuICAgIGlmIChwcm9wcy5hbGFybVdoZW5JbmNyZWFzZWQgJiYgcHJvcHMuYWxhcm1XaGVuRGVjcmVhc2VkKSB7XG4gICAgICByZXR1cm4gQ29tcGFyaXNvbk9wZXJhdG9yLkxFU1NfVEhBTl9MT1dFUl9PUl9HUkVBVEVSX1RIQU5fVVBQRVJfVEhSRVNIT0xEO1xuICAgIH0gZWxzZSBpZiAocHJvcHMuYWxhcm1XaGVuRGVjcmVhc2VkKSB7XG4gICAgICByZXR1cm4gQ29tcGFyaXNvbk9wZXJhdG9yLkxFU1NfVEhBTl9USFJFU0hPTEQ7XG4gICAgfSBlbHNlIGlmIChwcm9wcy5hbGFybVdoZW5JbmNyZWFzZWQpIHtcbiAgICAgIHJldHVybiBDb21wYXJpc29uT3BlcmF0b3IuR1JFQVRFUl9USEFOX1RIUkVTSE9MRDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIllvdSBuZWVkIHRvIGFsYXJtIHdoZW4gdGhlIHZhbHVlIGhhcyBpbmNyZWFzZWQsIGRlY3JlYXNlZCwgb3IgYm90aC5cIlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==