"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopAlarmActionStrategy = exports.noopAction = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
function noopAction() {
    return new NoopAlarmActionStrategy();
}
exports.noopAction = noopAction;
/**
 * Alarm action strategy that does not add any actions.
 */
class NoopAlarmActionStrategy {
    addAlarmActions(_props) {
        // No action to create.
    }
}
exports.NoopAlarmActionStrategy = NoopAlarmActionStrategy;
_a = JSII_RTTI_SYMBOL_1;
NoopAlarmActionStrategy[_a] = { fqn: "cdk-monitoring-constructs.NoopAlarmActionStrategy", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9vcEFsYXJtQWN0aW9uU3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJOb29wQWxhcm1BY3Rpb25TdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLFNBQWdCLFVBQVU7SUFDeEIsT0FBTyxJQUFJLHVCQUF1QixFQUFFLENBQUM7QUFDdkMsQ0FBQztBQUZELGdDQUVDO0FBRUQ7O0dBRUc7QUFDSCxNQUFhLHVCQUF1QjtJQUNsQyxlQUFlLENBQUMsTUFBZ0M7UUFDOUMsdUJBQXVCO0lBQ3pCLENBQUM7O0FBSEgsMERBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbGFybUFjdGlvblN0cmF0ZWd5UHJvcHMsXG4gIElBbGFybUFjdGlvblN0cmF0ZWd5LFxufSBmcm9tIFwiLi9JQWxhcm1BY3Rpb25TdHJhdGVneVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9vcEFjdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBOb29wQWxhcm1BY3Rpb25TdHJhdGVneSgpO1xufVxuXG4vKipcbiAqIEFsYXJtIGFjdGlvbiBzdHJhdGVneSB0aGF0IGRvZXMgbm90IGFkZCBhbnkgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vb3BBbGFybUFjdGlvblN0cmF0ZWd5IGltcGxlbWVudHMgSUFsYXJtQWN0aW9uU3RyYXRlZ3kge1xuICBhZGRBbGFybUFjdGlvbnMoX3Byb3BzOiBBbGFybUFjdGlvblN0cmF0ZWd5UHJvcHMpOiB2b2lkIHtcbiAgICAvLyBObyBhY3Rpb24gdG8gY3JlYXRlLlxuICB9XG59XG4iXX0=