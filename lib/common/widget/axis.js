"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyAxisUsdFromZero = exports.MegabyteMillisecondAxisFromZero = exports.SizeAxisGigaBytesFromZero = exports.SizeAxisMegaBytesFromZero = exports.SizeAxisKiloBytesFromZero = exports.SizeAxisBytesFromZero = exports.RateAxisFromZeroToOne = exports.RateAxisFromZero = exports.BooleanAxisFromZeroToOne = exports.CountAxisFromOne = exports.CountAxisFromZero = exports.TimeAxisMinutesFromZero = exports.TimeAxisSecondsFromZero = exports.TimeAxisMillisFromZero = exports.PercentageAxisFromZeroToHundred = exports.PercentageAxisFromZero = void 0;
/**
 * Y-Axis showing percentage, ranged from 0.
 */
exports.PercentageAxisFromZero = {
    min: 0,
    label: "%",
    showUnits: false,
};
/**
 * Y-Axis showing percentage, ranged from 0 to 100.
 */
exports.PercentageAxisFromZeroToHundred = {
    min: 0,
    max: 100,
    label: "%",
    showUnits: false,
};
/**
 * Y-Axis showing time in milliseconds, ranged from 0.
 */
exports.TimeAxisMillisFromZero = {
    min: 0,
    label: "ms",
    showUnits: false,
};
/**
 * Y-Axis showing time in seconds, ranged from 0.
 */
exports.TimeAxisSecondsFromZero = {
    min: 0,
    label: "sec",
    showUnits: false,
};
/**
 * Y-Axis showing time in minutes, ranged from 0.
 */
exports.TimeAxisMinutesFromZero = {
    min: 0,
    label: "min",
    showUnits: false,
};
/**
 * Y-Axis showing count, ranged from 0.
 */
exports.CountAxisFromZero = {
    min: 0,
    label: "Count",
    showUnits: false,
};
/**
 * Y-Axis showing count, ranged from 1.
 */
exports.CountAxisFromOne = {
    min: 1,
    label: "Count",
    showUnits: false,
};
/**
 * Y-Axis showing boolean, ranged from 0 to 1, where 1 means TRUE.
 */
exports.BooleanAxisFromZeroToOne = {
    min: 0,
    max: 1,
    label: "1 = True",
    showUnits: false,
};
/**
 * Y-Axis showing rate (relative count), ranged from 0.
 */
exports.RateAxisFromZero = {
    min: 0,
    label: "Rate",
    showUnits: false,
};
/**
 * Y-Axis showing rate (relative count), ranged from 0 to 1.
 */
exports.RateAxisFromZeroToOne = {
    min: 0,
    max: 1,
    label: "Rate",
    showUnits: false,
};
/**
 * Y-Axis showing size in bytes, ranged from 0.
 */
exports.SizeAxisBytesFromZero = {
    min: 0,
    label: "bytes",
    showUnits: false,
};
/**
 * Y-Axis showing size in kilobytes, ranged from 0.
 */
exports.SizeAxisKiloBytesFromZero = {
    min: 0,
    label: "kB",
    showUnits: false,
};
/**
 * Y-Axis showing size in megabytes, ranged from 0.
 */
exports.SizeAxisMegaBytesFromZero = {
    min: 0,
    label: "MB",
    showUnits: false,
};
/**
 * Y-Axis showing size in gigabytes, ranged from 0.
 */
exports.SizeAxisGigaBytesFromZero = {
    min: 0,
    label: "GB",
    showUnits: false,
};
/**
 * Y-Axis showing cost in Megabyte Millisecond, ranged from 0.
 */
exports.MegabyteMillisecondAxisFromZero = {
    min: 0,
    label: "MB*ms",
    showUnits: false,
};
/**
 * Y-Axis showing cost in USD, ranged from 0.
 */
exports.CurrencyAxisUsdFromZero = {
    min: 0,
    label: "USD",
    showUnits: false,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF4aXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUE7O0dBRUc7QUFDVSxRQUFBLHNCQUFzQixHQUFlO0lBQ2hELEdBQUcsRUFBRSxDQUFDO0lBQ04sS0FBSyxFQUFFLEdBQUc7SUFDVixTQUFTLEVBQUUsS0FBSztDQUNqQixDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLCtCQUErQixHQUFlO0lBQ3pELEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLEdBQUc7SUFDUixLQUFLLEVBQUUsR0FBRztJQUNWLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsc0JBQXNCLEdBQWU7SUFDaEQsR0FBRyxFQUFFLENBQUM7SUFDTixLQUFLLEVBQUUsSUFBSTtJQUNYLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsdUJBQXVCLEdBQWU7SUFDakQsR0FBRyxFQUFFLENBQUM7SUFDTixLQUFLLEVBQUUsS0FBSztJQUNaLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsdUJBQXVCLEdBQWU7SUFDakQsR0FBRyxFQUFFLENBQUM7SUFDTixLQUFLLEVBQUUsS0FBSztJQUNaLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsaUJBQWlCLEdBQWU7SUFDM0MsR0FBRyxFQUFFLENBQUM7SUFDTixLQUFLLEVBQUUsT0FBTztJQUNkLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsZ0JBQWdCLEdBQWU7SUFDMUMsR0FBRyxFQUFFLENBQUM7SUFDTixLQUFLLEVBQUUsT0FBTztJQUNkLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsd0JBQXdCLEdBQWU7SUFDbEQsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxVQUFVO0lBQ2pCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsZ0JBQWdCLEdBQWU7SUFDMUMsR0FBRyxFQUFFLENBQUM7SUFDTixLQUFLLEVBQUUsTUFBTTtJQUNiLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEscUJBQXFCLEdBQWU7SUFDL0MsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxNQUFNO0lBQ2IsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxxQkFBcUIsR0FBZTtJQUMvQyxHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxPQUFPO0lBQ2QsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSx5QkFBeUIsR0FBZTtJQUNuRCxHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxJQUFJO0lBQ1gsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSx5QkFBeUIsR0FBZTtJQUNuRCxHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxJQUFJO0lBQ1gsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSx5QkFBeUIsR0FBZTtJQUNuRCxHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxJQUFJO0lBQ1gsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSwrQkFBK0IsR0FBZTtJQUN6RCxHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxPQUFPO0lBQ2QsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSx1QkFBdUIsR0FBZTtJQUNqRCxHQUFHLEVBQUUsQ0FBQztJQUNOLEtBQUssRUFBRSxLQUFLO0lBQ1osU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFlBeGlzUHJvcHMgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2hcIjtcblxuLyoqXG4gKiBZLUF4aXMgc2hvd2luZyBwZXJjZW50YWdlLCByYW5nZWQgZnJvbSAwLlxuICovXG5leHBvcnQgY29uc3QgUGVyY2VudGFnZUF4aXNGcm9tWmVybzogWUF4aXNQcm9wcyA9IHtcbiAgbWluOiAwLFxuICBsYWJlbDogXCIlXCIsXG4gIHNob3dVbml0czogZmFsc2UsXG59O1xuXG4vKipcbiAqIFktQXhpcyBzaG93aW5nIHBlcmNlbnRhZ2UsIHJhbmdlZCBmcm9tIDAgdG8gMTAwLlxuICovXG5leHBvcnQgY29uc3QgUGVyY2VudGFnZUF4aXNGcm9tWmVyb1RvSHVuZHJlZDogWUF4aXNQcm9wcyA9IHtcbiAgbWluOiAwLFxuICBtYXg6IDEwMCxcbiAgbGFiZWw6IFwiJVwiLFxuICBzaG93VW5pdHM6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBZLUF4aXMgc2hvd2luZyB0aW1lIGluIG1pbGxpc2Vjb25kcywgcmFuZ2VkIGZyb20gMC5cbiAqL1xuZXhwb3J0IGNvbnN0IFRpbWVBeGlzTWlsbGlzRnJvbVplcm86IFlBeGlzUHJvcHMgPSB7XG4gIG1pbjogMCxcbiAgbGFiZWw6IFwibXNcIixcbiAgc2hvd1VuaXRzOiBmYWxzZSxcbn07XG5cbi8qKlxuICogWS1BeGlzIHNob3dpbmcgdGltZSBpbiBzZWNvbmRzLCByYW5nZWQgZnJvbSAwLlxuICovXG5leHBvcnQgY29uc3QgVGltZUF4aXNTZWNvbmRzRnJvbVplcm86IFlBeGlzUHJvcHMgPSB7XG4gIG1pbjogMCxcbiAgbGFiZWw6IFwic2VjXCIsXG4gIHNob3dVbml0czogZmFsc2UsXG59O1xuXG4vKipcbiAqIFktQXhpcyBzaG93aW5nIHRpbWUgaW4gbWludXRlcywgcmFuZ2VkIGZyb20gMC5cbiAqL1xuZXhwb3J0IGNvbnN0IFRpbWVBeGlzTWludXRlc0Zyb21aZXJvOiBZQXhpc1Byb3BzID0ge1xuICBtaW46IDAsXG4gIGxhYmVsOiBcIm1pblwiLFxuICBzaG93VW5pdHM6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBZLUF4aXMgc2hvd2luZyBjb3VudCwgcmFuZ2VkIGZyb20gMC5cbiAqL1xuZXhwb3J0IGNvbnN0IENvdW50QXhpc0Zyb21aZXJvOiBZQXhpc1Byb3BzID0ge1xuICBtaW46IDAsXG4gIGxhYmVsOiBcIkNvdW50XCIsXG4gIHNob3dVbml0czogZmFsc2UsXG59O1xuXG4vKipcbiAqIFktQXhpcyBzaG93aW5nIGNvdW50LCByYW5nZWQgZnJvbSAxLlxuICovXG5leHBvcnQgY29uc3QgQ291bnRBeGlzRnJvbU9uZTogWUF4aXNQcm9wcyA9IHtcbiAgbWluOiAxLFxuICBsYWJlbDogXCJDb3VudFwiLFxuICBzaG93VW5pdHM6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBZLUF4aXMgc2hvd2luZyBib29sZWFuLCByYW5nZWQgZnJvbSAwIHRvIDEsIHdoZXJlIDEgbWVhbnMgVFJVRS5cbiAqL1xuZXhwb3J0IGNvbnN0IEJvb2xlYW5BeGlzRnJvbVplcm9Ub09uZTogWUF4aXNQcm9wcyA9IHtcbiAgbWluOiAwLFxuICBtYXg6IDEsXG4gIGxhYmVsOiBcIjEgPSBUcnVlXCIsXG4gIHNob3dVbml0czogZmFsc2UsXG59O1xuXG4vKipcbiAqIFktQXhpcyBzaG93aW5nIHJhdGUgKHJlbGF0aXZlIGNvdW50KSwgcmFuZ2VkIGZyb20gMC5cbiAqL1xuZXhwb3J0IGNvbnN0IFJhdGVBeGlzRnJvbVplcm86IFlBeGlzUHJvcHMgPSB7XG4gIG1pbjogMCxcbiAgbGFiZWw6IFwiUmF0ZVwiLFxuICBzaG93VW5pdHM6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBZLUF4aXMgc2hvd2luZyByYXRlIChyZWxhdGl2ZSBjb3VudCksIHJhbmdlZCBmcm9tIDAgdG8gMS5cbiAqL1xuZXhwb3J0IGNvbnN0IFJhdGVBeGlzRnJvbVplcm9Ub09uZTogWUF4aXNQcm9wcyA9IHtcbiAgbWluOiAwLFxuICBtYXg6IDEsXG4gIGxhYmVsOiBcIlJhdGVcIixcbiAgc2hvd1VuaXRzOiBmYWxzZSxcbn07XG5cbi8qKlxuICogWS1BeGlzIHNob3dpbmcgc2l6ZSBpbiBieXRlcywgcmFuZ2VkIGZyb20gMC5cbiAqL1xuZXhwb3J0IGNvbnN0IFNpemVBeGlzQnl0ZXNGcm9tWmVybzogWUF4aXNQcm9wcyA9IHtcbiAgbWluOiAwLFxuICBsYWJlbDogXCJieXRlc1wiLFxuICBzaG93VW5pdHM6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBZLUF4aXMgc2hvd2luZyBzaXplIGluIGtpbG9ieXRlcywgcmFuZ2VkIGZyb20gMC5cbiAqL1xuZXhwb3J0IGNvbnN0IFNpemVBeGlzS2lsb0J5dGVzRnJvbVplcm86IFlBeGlzUHJvcHMgPSB7XG4gIG1pbjogMCxcbiAgbGFiZWw6IFwia0JcIixcbiAgc2hvd1VuaXRzOiBmYWxzZSxcbn07XG5cbi8qKlxuICogWS1BeGlzIHNob3dpbmcgc2l6ZSBpbiBtZWdhYnl0ZXMsIHJhbmdlZCBmcm9tIDAuXG4gKi9cbmV4cG9ydCBjb25zdCBTaXplQXhpc01lZ2FCeXRlc0Zyb21aZXJvOiBZQXhpc1Byb3BzID0ge1xuICBtaW46IDAsXG4gIGxhYmVsOiBcIk1CXCIsXG4gIHNob3dVbml0czogZmFsc2UsXG59O1xuXG4vKipcbiAqIFktQXhpcyBzaG93aW5nIHNpemUgaW4gZ2lnYWJ5dGVzLCByYW5nZWQgZnJvbSAwLlxuICovXG5leHBvcnQgY29uc3QgU2l6ZUF4aXNHaWdhQnl0ZXNGcm9tWmVybzogWUF4aXNQcm9wcyA9IHtcbiAgbWluOiAwLFxuICBsYWJlbDogXCJHQlwiLFxuICBzaG93VW5pdHM6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBZLUF4aXMgc2hvd2luZyBjb3N0IGluIE1lZ2FieXRlIE1pbGxpc2Vjb25kLCByYW5nZWQgZnJvbSAwLlxuICovXG5leHBvcnQgY29uc3QgTWVnYWJ5dGVNaWxsaXNlY29uZEF4aXNGcm9tWmVybzogWUF4aXNQcm9wcyA9IHtcbiAgbWluOiAwLFxuICBsYWJlbDogXCJNQiptc1wiLFxuICBzaG93VW5pdHM6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBZLUF4aXMgc2hvd2luZyBjb3N0IGluIFVTRCwgcmFuZ2VkIGZyb20gMC5cbiAqL1xuZXhwb3J0IGNvbnN0IEN1cnJlbmN5QXhpc1VzZEZyb21aZXJvOiBZQXhpc1Byb3BzID0ge1xuICBtaW46IDAsXG4gIGxhYmVsOiBcIlVTRFwiLFxuICBzaG93VW5pdHM6IGZhbHNlLFxufTtcbiJdfQ==