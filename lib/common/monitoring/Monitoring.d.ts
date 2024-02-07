import { IWidget } from "aws-cdk-lib/aws-cloudwatch";
import { MonitoringScope } from "./MonitoringScope";
import { IDashboardSegment, IDynamicDashboardSegment, MonitoringDashboardsOverrideProps, UserProvidedNames } from "../../dashboard";
import { AlarmWithAnnotation } from "../alarm";
export interface IAlarmConsumer {
    consume(alarms: AlarmWithAnnotation[]): void;
}
/**
 * Base class for properties passed to each monitoring construct.
 * It contains (mostly optional) properties to specify naming, placement, and so on.
 */
export interface BaseMonitoringProps extends UserProvidedNames, MonitoringDashboardsOverrideProps {
    /**
     * Calls provided function to process all alarms created.
     */
    readonly useCreatedAlarms?: IAlarmConsumer;
}
/**
 * An independent unit of monitoring. This is the base for all monitoring classes with alarm support.
 */
export declare abstract class Monitoring implements IDashboardSegment, IDynamicDashboardSegment {
    protected readonly scope: MonitoringScope;
    protected readonly alarms: AlarmWithAnnotation[];
    protected readonly localAlarmNamePrefixOverride?: string;
    protected constructor(scope: MonitoringScope, props?: BaseMonitoringProps);
    /**
     * Creates a new widget factory.
     */
    createWidgetFactory(): import("../../dashboard").IWidgetFactory;
    /**
     * Creates a new metric factory.
     */
    createMetricFactory(): import("..").MetricFactory;
    /**
     * Creates a new alarm factory.
     * Alarms created will be named with the given prefix, unless a local name override is present.
     * @param alarmNamePrefix alarm name prefix
     */
    createAlarmFactory(alarmNamePrefix: string): import("../alarm").AlarmFactory;
    /**
     * Adds an alarm.
     * @param alarm alarm to add
     */
    addAlarm(alarm: AlarmWithAnnotation): void;
    /**
     * Returns all the alarms created.
     */
    createdAlarms(): AlarmWithAnnotation[];
    /**
     * Returns widgets for all alarms. These can go to runbook or to service dashboard.
     */
    alarmWidgets(): IWidget[];
    /**
     * Returns widgets to be placed on the summary dashboard.
     *
     * @default - no widgets.
     */
    summaryWidgets(): IWidget[];
    /**
     * Returns widgets to be placed on the main dashboard.
     */
    abstract widgets(): IWidget[];
    widgetsForDashboard(name: string): IWidget[];
}
