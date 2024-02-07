export declare const FullWidth = 24;
export declare const HalfWidth: number;
export declare const ThirdWidth: number;
export declare const QuarterWidth: number;
export declare const HalfQuarterWidth: number;
export declare const SixthWidth: number;
export declare const TwoThirdsWidth: number;
export declare const ThreeQuartersWidth: number;
export declare const DefaultGraphWidgetHeight = 5;
export declare const DefaultTwoLinerGraphWidgetHeight = 6;
export declare const DefaultTwoLinerGraphWidgetHalfHeight = 3;
export declare const DefaultSummaryWidgetHeight = 6;
export declare const DefaultAlarmWidgetWidth = 6;
export declare const DefaultAlarmWidgetHeight = 4;
export declare const DefaultLogWidgetHeight = 7;
/**
 * Suggests the best widget width, given the total number of widgets.
 * The main point is to make widgets as wide as possible, while saving vertical space and minimizing number of gaps.
 * @param numTotalWidgets total number of widgets to be placed
 */
export declare function recommendedWidgetWidth(numTotalWidgets: number): number;
