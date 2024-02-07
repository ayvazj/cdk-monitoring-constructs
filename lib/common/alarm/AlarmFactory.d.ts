import { Duration } from "aws-cdk-lib";
import { AlarmBase, ComparisonOperator, CompositeAlarm, HorizontalAnnotation, IAlarmRule, TreatMissingData } from "aws-cdk-lib/aws-cloudwatch";
import { Construct } from "constructs";
import { IAlarmActionStrategy } from "./action";
import { AlarmAnnotationStrategyProps, IAlarmAnnotationStrategy } from "./IAlarmAnnotationStrategy";
import { IAlarmDedupeStringProcessor } from "./IAlarmDedupeStringProcessor";
import { IAlarmNamingStrategy } from "./IAlarmNamingStrategy";
import { IMetricAdjuster } from "./metric-adjuster";
import { MetricFactoryDefaults, MetricWithAlarmSupport } from "../metric";
/**
 * Commonly used disambiguators.
 */
export declare type PredefinedAlarmDisambiguators = "Warning" | "Critical";
/**
 * Metadata of an alarm.
 */
export interface AlarmMetadata {
    readonly action: IAlarmActionStrategy;
    readonly dedupeString?: string;
    readonly disambiguator?: string;
    readonly customTags?: string[];
    readonly customParams?: Record<string, any>;
}
/**
 * Representation of an alarm with additional information.
 */
export interface AlarmWithAnnotation extends AlarmMetadata {
    readonly alarm: AlarmBase;
    readonly alarmName: string;
    readonly alarmNameSuffix: string;
    readonly alarmLabel: string;
    readonly alarmDescription: string;
    readonly alarmRuleWhenOk: IAlarmRule;
    readonly alarmRuleWhenAlarming: IAlarmRule;
    readonly alarmRuleWhenInsufficientData: IAlarmRule;
    readonly annotation: HorizontalAnnotation;
}
/**
 * Properties necessary to create a single alarm and configure it.
 */
export interface AddAlarmProps {
    /**
     * Allows to override the default action strategy.
     *
     * @default - default action will be used
     */
    readonly actionOverride?: IAlarmActionStrategy;
    /**
     * If this is defined, the alarm dedupe string is set to this exact value.
     * Please be aware that you need to handle deduping for different stages (Beta, Prod...) and regions (EU, NA...) manually.
     *
     * @default - undefined (no override)
     */
    readonly dedupeStringOverride?: string;
    /**
     * If this is defined, the alarm name is set to this exact value.
     * Please be aware that you need to specify prefix for different stages (Beta, Prod...) and regions (EU, NA...) manually.
     */
    readonly alarmNameOverride?: string;
    /**
     * A text included in the generated ticket description body, which fully replaces the generated text.
     *
     * @default - default auto-generated content only
     */
    readonly alarmDescriptionOverride?: string;
    /**
     * Disambiguator is a string that differentiates this alarm from other similar ones.
     *
     * @default - undefined (no disambiguator)
     */
    readonly disambiguator?: string;
    /**
     * Alarm description is included in the ticket and therefore should describe what happened, with as much context as possible.
     */
    readonly alarmDescription: string;
    /**
     * An optional link included in the generated ticket description body.
     *
     * @default - no additional link will be added
     */
    readonly documentationLink?: string;
    /**
     * An optional link included in the generated ticket description body.
     *
     * @default - no additional link will be added
     */
    readonly runbookLink?: string;
    /**
     * Suffix added to base alarm name. Alarm names need to be unique.
     */
    readonly alarmNameSuffix: string;
    /**
     * If this is defined, the default resource-specific alarm dedupe string will be set and this will be added as a suffix.
     * This allows you to specify the same dedupe string for a family of alarms.
     * Cannot be defined at the same time as alarmDedupeStringOverride.
     *
     * @default - undefined (no suffix)
     */
    readonly alarmDedupeStringSuffix?: string;
    /**
     * Enables the configured CloudWatch alarm ticketing actions.
     *
     * @default - the same as monitoring facade default
     */
    readonly actionsEnabled?: boolean;
    /**
     * Threshold to alarm on.
     */
    readonly threshold: number;
    /**
     * Comparison operator used to compare actual value against the threshold.
     */
    readonly comparisonOperator: ComparisonOperator;
    /**
     * Behaviour in case the metric data is missing.
     */
    readonly treatMissingData: TreatMissingData;
    /**
     * Number of breaches required to transition into an ALARM state.
     */
    readonly datapointsToAlarm?: number;
    /**
     * Number of periods to consider when checking the number of breaching datapoints.
     *
     * @default - Same as datapointsToAlarm.
     */
    readonly evaluationPeriods?: number;
    /**
     * Period override for the metric to alarm on.
     *
     * @default - the default specified in MetricFactory
     */
    readonly period?: Duration;
    /**
     * Used only for alarms based on percentiles.
     * If you specify <code>false</code>, the alarm state does not change during periods with too few data points to be statistically significant.
     * If you specify <code>true</code>, the alarm is always evaluated and possibly changes state no matter how many data points are available.
     *
     * @default - true
     */
    readonly evaluateLowSampleCountPercentile?: boolean;
    /**
     * Specifies how many samples (N) of the metric is needed in a datapoint to be evaluated for alarming.
     * If this property is specified, your metric will be subject to MathExpression that will add an IF condition
     * to your metric to make sure that each datapoint is evaluated only if it has sufficient number of samples.
     * If the number of samples is not sufficient, the datapoint will be treated as missing data and will be evaluated
     * according to the treatMissingData parameter.
     * If specified, deprecated minMetricSamplesToAlarm has no effect.
     *
     * @default - default behaviour - no condition on sample count will be used
     */
    readonly minSampleCountToEvaluateDatapoint?: number;
    /**
     * This property is required in the following situation:
     * <ol>
     *     <li><code>minSampleCountToEvaluateDatapoint</code> is specified</li>
     *     <li>the metric used for the alarm is a <code>MathExpression</code></li>
     *     <li>the <code>MathExpression</code> is composed of more than one metric</li>
     * </ol>
     *
     * In this situation, this property indicates the metric Id in the MathExpression’s <code>usingMetrics</code>
     * property that should be used as the sampleCount metric for the new MathExpression as described in the documentation
     * for <code>minSampleCountToEvaluateDatapoint</code>.
     */
    readonly sampleCountMetricId?: string;
    /**
     * Specifies how many samples (N) of the metric is needed to trigger the alarm.
     * If this property is specified, an artificial composite alarm is created of the following:
     * <ul>
     * <li>The original alarm, created without this property being used; this alarm will have no actions set.</li>
     * <li>A secondary alarm, which will monitor the same metric with the N (SampleCount) statistic, checking the sample count.</li>
     * </ul>
     * The newly created composite alarm will be returned as a result, and it will take the original alarm actions.
     * @default - default behaviour - no condition on sample count will be added to the alarm
     * @deprecated Use minSampleCountToEvaluateDatapoint instead. minMetricSamplesAlarm uses different evaluation
     *   period for its child alarms, so it doesn't guarantee that each datapoint in the evaluation period has
     *   sufficient number of samples
     */
    readonly minMetricSamplesToAlarm?: number;
    /**
     * This allows user to attach custom values to this alarm, which can later be accessed from the "useCreatedAlarms" method.
     *
     * @default - no tags
     */
    readonly customTags?: string[];
    /**
     * This allows user to attach custom parameters to this alarm, which can later be accessed from the "useCreatedAlarms" method.
     *
     * @default - no parameters
     */
    readonly customParams?: Record<string, any>;
    /**
     * Indicates whether the alarming range of values should be highlighted in the widget.
     *
     * @default - false
     */
    readonly fillAlarmRange?: boolean;
    /**
     * If specified, it modifies the final alarm annotation color.
     *
     * @default - no override (default color)
     */
    readonly overrideAnnotationColor?: string;
    /**
     * If specified, it modifies the final alarm annotation label.
     *
     * @default - no override (default label)
     */
    readonly overrideAnnotationLabel?: string;
    /**
     * If specified, it modifies the final alarm annotation visibility.
     *
     * @default - no override (default visibility)
     */
    readonly overrideAnnotationVisibility?: boolean;
    /**
     * If specified, adjusts the metric before creating an alarm from it.
     *
     * @default - no adjuster
     */
    readonly metricAdjuster?: IMetricAdjuster;
}
/**
 * Properties necessary to create a composite alarm and configure it.
 */
export interface AddCompositeAlarmProps {
    /**
     * Allows to override the default action strategy.
     *
     * @default - default action will be used
     */
    readonly actionOverride?: IAlarmActionStrategy;
    /**
     * If this is defined, the alarm dedupe string is set to this exact value.
     * Please be aware that you need to handle deduping for different stages (Beta, Prod...) and realms (EU, NA...) manually.
     *
     * @default - undefined (no override)
     */
    readonly dedupeStringOverride?: string;
    /**
     * If this is defined, the alarm name is set to this exact value.
     * Please be aware that you need to specify prefix for different stages (Beta, Prod...) and realms (EU, NA...) manually.
     */
    readonly alarmNameOverride?: string;
    /**
     * A text included in the generated ticket description body, which fully replaces the generated text.
     *
     * @default - default auto-generated content only
     */
    readonly alarmDescriptionOverride?: string;
    /**
     * Disambiguator is a string that differentiates this alarm from other similar ones.
     */
    readonly disambiguator: string;
    /**
     * Alarm description is included in the ticket and therefore should describe what happened, with as much context as possible.
     *
     * @default - no description
     */
    readonly alarmDescription?: string;
    /**
     * An optional link included in the generated ticket description body.
     *
     * @default - no additional link will be added
     */
    readonly documentationLink?: string;
    /**
     * An optional link included in the generated ticket description body.
     *
     * @default - no additional link will be added
     */
    readonly runbookLink?: string;
    /**
     * Suffix added to base alarm name. Alarm names need to be unique.
     *
     * @default - no suffix
     */
    readonly alarmNameSuffix?: string;
    /**
     * If this is defined, the default resource-specific alarm dedupe string will be set and this will be added as a suffix.
     * This allows you to specify the same dedupe string for a family of alarms.
     * Cannot be defined at the same time as alarmDedupeStringOverride.
     *
     * @default - undefined (no suffix)
     */
    readonly alarmDedupeStringSuffix?: string;
    /**
     * Enables the configured CloudWatch alarm ticketing actions.
     *
     * @default - the same as monitoring facade default
     */
    readonly actionsEnabled?: boolean;
    /**
     * This allows user to attach custom values to this alarm, which can later be accessed from the "useCreatedAlarms" method.
     *
     * @default - no tags
     */
    readonly customTags?: string[];
    /**
     * This allows user to attach custom parameters to this alarm, which can later be accessed from the "useCreatedAlarms" method.
     *
     * @default - no parameters
     */
    readonly customParams?: Record<string, any>;
    /**
     * Indicates whether the alarming range of values should be highlighted in the widget.
     *
     * @default - false
     */
    readonly fillAlarmRange?: boolean;
    /**
     * Logical operator used to aggregate the status individual alarms.
     *
     * @default - OR
     */
    readonly compositeOperator?: CompositeAlarmOperator;
}
/**
 * Enable alarm actions for all severities (boolean) or provide a mapping of the disambiguators to booleans
 */
export declare type ActionsEnabled = boolean | Record<PredefinedAlarmDisambiguators | string, boolean>;
export declare enum CompositeAlarmOperator {
    /**
     * trigger only if all the alarms are triggered
     */
    AND = 0,
    /**
     * trigger if any of the alarms is triggered
     */
    OR = 1
}
export interface AlarmFactoryDefaults {
    /**
     * Enables the configured CloudWatch alarm ticketing actions for either all severities, or per severity.
     */
    readonly actionsEnabled: ActionsEnabled;
    /**
     * Default alarm action used for each alarm, unless it is overridden.
     *
     * @default - no action.
     */
    readonly action?: IAlarmActionStrategy;
    /**
     * Optional alarm action for each disambiguator.
     *
     * @default - Global alarm action if defined.
     */
    readonly disambiguatorAction?: Record<PredefinedAlarmDisambiguators | string, IAlarmActionStrategy>;
    /**
     * Custom strategy to create annotations for alarms.
     *
     * @default - default annotations
     */
    readonly annotationStrategy?: IAlarmAnnotationStrategy;
    /**
     * Custom strategy to process dedupe strings of the alarms
     *
     * @default - default behaviour (no change)
     */
    readonly dedupeStringProcessor?: IAlarmDedupeStringProcessor;
    /**
     * Custom strategy to name alarms
     *
     * @default - default behaviour (no change)
     */
    readonly alarmNamingStrategy?: IAlarmNamingStrategy;
    /**
     * Number of breaches required to transition into an ALARM state.
     *
     * @default - 3
     */
    readonly datapointsToAlarm?: number;
    /**
     * Number of periods to consider when checking the number of breaching datapoints.
     *
     * @default - Same as datapointsToAlarm.
     */
    readonly evaluationPeriods?: number;
    /**
     * Global prefix for all alarm names. This should be something unique to avoid potential collisions.
     * This is ignored if an alarm's dedupeStringOverride is declared.
     */
    readonly alarmNamePrefix: string;
    /**
     * An optional link included in the generated ticket description body.
     */
    readonly documentationLink?: string;
    /**
     * An optional link included in the generated ticket description body.
     */
    readonly runbookLink?: string;
    /**
     * If this is defined as false and dedupeStringOverride is undefined, the alarm prefix will be part of the dedupe string.
     * This essentially stops the dedupe of different errors together.
     *
     * @default - undefined (true)
     */
    readonly useDefaultDedupeForError?: boolean;
    /**
     * If this is defined as false and dedupeStringOverride is undefined, the alarm prefix will be part of the dedupe string.
     * This essentially stops the dedupe of different latency issues together.
     *
     * @default - undefined (true)
     */
    readonly useDefaultDedupeForLatency?: boolean;
}
export interface AlarmFactoryProps {
    readonly globalAlarmDefaults: AlarmFactoryDefaults;
    readonly globalMetricDefaults: MetricFactoryDefaults;
    readonly localAlarmNamePrefix: string;
}
export declare class AlarmFactory {
    protected readonly alarmScope: Construct;
    protected readonly globalAlarmDefaults: AlarmFactoryDefaults;
    protected readonly globalMetricDefaults: MetricFactoryDefaults;
    protected readonly alarmNamingStrategy: IAlarmNamingStrategy;
    constructor(alarmScope: Construct, props: AlarmFactoryProps);
    addAlarm(metric: MetricWithAlarmSupport, props: AddAlarmProps): AlarmWithAnnotation;
    addCompositeAlarm(alarms: AlarmWithAnnotation[], props: AddCompositeAlarmProps): CompositeAlarm;
    protected determineCompositeAlarmRule(alarms: AlarmWithAnnotation[], props: AddCompositeAlarmProps): IAlarmRule;
    protected determineActionsEnabled(actionsEnabled?: boolean, disambiguator?: string): boolean;
    protected determineAction(disambiguator?: string, actionOverride?: IAlarmActionStrategy): IAlarmActionStrategy;
    get shouldUseDefaultDedupeForError(): boolean;
    get shouldUseDefaultDedupeForLatency(): boolean;
    protected generateDescription(alarmDescription: string, alarmDescriptionOverride?: string, runbookLinkOverride?: string, documentationLinkOverride?: string): string;
    protected joinDescriptionParts(...parts: string[]): string;
    protected createAnnotation(props: AlarmAnnotationStrategyProps): HorizontalAnnotation;
}
