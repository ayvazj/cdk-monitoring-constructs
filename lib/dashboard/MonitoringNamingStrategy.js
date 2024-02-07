"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringNamingStrategy = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cdk_lib_1 = require("aws-cdk-lib");
/**
 * Utility class to unify approach to naming monitoring sections.
 * @see https://docs.aws.amazon.com/cdk/latest/guide/tokens.html#tokens_lazy
 */
class MonitoringNamingStrategy {
    constructor(input) {
        this.input = input;
    }
    resolveAlarmFriendlyName() {
        return this.input.alarmFriendlyName ?? this.getFallbackAlarmFriendlyName();
    }
    resolveHumanReadableName() {
        return this.input.humanReadableName ?? this.getFallbackHumanReadableName();
    }
    static isAlarmFriendly(str) {
        // we do not know the exact pattern yet, but this is a safe approximation
        // also, tokens are not allowed in alarm names
        return str && !aws_cdk_lib_1.Token.isUnresolved(str) && /^[a-zA-Z0-9\-_]+$/.test(str);
    }
    getFallbackAlarmFriendlyName() {
        if (this.input.fallbackConstructName) {
            if (MonitoringNamingStrategy.isAlarmFriendly(this.input.fallbackConstructName)) {
                return this.input.fallbackConstructName;
            }
        }
        if (this.input.namedConstruct) {
            const node = this.input.namedConstruct.node;
            if (MonitoringNamingStrategy.isAlarmFriendly(node.id)) {
                // scope-unique ID
                return node.id;
            }
        }
        throw new Error("Insufficient information provided for naming the alarms and/or monitoring section: " +
            "Please provide alarmFriendlyName, humanReadableName, or namedConstruct as a fallback");
    }
    getFallbackHumanReadableName() {
        return aws_cdk_lib_1.Lazy.uncachedString({
            produce: (context) => {
                const resolvedName = context.resolve(this.input.fallbackConstructName);
                if (typeof resolvedName === "string" &&
                    MonitoringNamingStrategy.isNonBlank(resolvedName)) {
                    return resolvedName;
                }
                if (this.input.namedConstruct) {
                    const node = this.input.namedConstruct.node;
                    if (MonitoringNamingStrategy.isNonBlank(node.id)) {
                        // scope-unique ID
                        return node.id;
                    }
                }
                return this.resolveAlarmFriendlyName();
            },
        });
    }
    static isNonBlank(str) {
        return str && str.trim().length > 0;
    }
}
exports.MonitoringNamingStrategy = MonitoringNamingStrategy;
_a = JSII_RTTI_SYMBOL_1;
MonitoringNamingStrategy[_a] = { fqn: "cdk-monitoring-constructs.MonitoringNamingStrategy", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkNBQTBDO0FBMEMxQzs7O0dBR0c7QUFDSCxNQUFhLHdCQUF3QjtJQUduQyxZQUFZLEtBQTBCO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCx3QkFBd0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQzdFLENBQUM7SUFFRCx3QkFBd0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQzdFLENBQUM7SUFFRCxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQVc7UUFDaEMseUVBQXlFO1FBQ3pFLDhDQUE4QztRQUM5QyxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU8sNEJBQTRCO1FBQ2xDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRTtZQUNwQyxJQUNFLHdCQUF3QixDQUFDLGVBQWUsQ0FDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FDakMsRUFDRDtnQkFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUM7YUFDekM7U0FDRjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQzVDLElBQUksd0JBQXdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDckQsa0JBQWtCO2dCQUNsQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDaEI7U0FDRjtRQUVELE1BQU0sSUFBSSxLQUFLLENBQ2IscUZBQXFGO1lBQ25GLHNGQUFzRixDQUN6RixDQUFDO0lBQ0osQ0FBQztJQUVPLDRCQUE0QjtRQUNsQyxPQUFPLGtCQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNuQixNQUFNLFlBQVksR0FBUSxPQUFPLENBQUMsT0FBTyxDQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUNqQyxDQUFDO2dCQUNGLElBQ0UsT0FBTyxZQUFZLEtBQUssUUFBUTtvQkFDaEMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUNqRDtvQkFDQSxPQUFPLFlBQVksQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtvQkFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO29CQUM1QyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ2hELGtCQUFrQjt3QkFDbEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO3FCQUNoQjtpQkFDRjtnQkFDRCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ3pDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQ25DLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O0FBeEVILDREQXlFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhenksIFRva2VuIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBJQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBOYW1lUmVzb2x1dGlvbklucHV0IGV4dGVuZHMgVXNlclByb3ZpZGVkTmFtZXMge1xuICAvKipcbiAgICogQ29uc3RydWN0IHRoYXQgdGhpcyBuYW1pbmcgc3RyYXRlZ3kgaXMgbmFtaW5nLlxuICAgKiBJdCBpcyB1c2VkIGFzIGEgbGFzdCByZXNvcnQgZm9yIG5hbWluZy5cbiAgICovXG4gIHJlYWRvbmx5IG5hbWVkQ29uc3RydWN0PzogSUNvbnN0cnVjdDtcbiAgLyoqXG4gICAqIEZhbGxiYWNrIG5hbWUgYmVmb3JlIHdlIGZhbGxiYWNrIHRvIGV4dHJhY3RpbmcgbmFtZSBmcm9tIHRoZSBjb25zdHJ1Y3QgaXRzZWxmLlxuICAgKiBUaGlzIG1pZ2h0IGJlIHNvbWUgY29uc3RydWN0IHJlZmVyZW5jZSwgc3VjaCBpcyBjbHVzdGVyIElELCBzdHJlYW0gbmFtZSwgYW5kIHNvIG9uLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIHVzZSBuYW1lZENvbnN0cnVjdCB0byBleHRyYWN0IHRoZSBuYW1lXG4gICAqL1xuICByZWFkb25seSBmYWxsYmFja0NvbnN0cnVjdE5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlclByb3ZpZGVkTmFtZXMge1xuICAvKipcbiAgICogSHVtYW4tcmVhZGFibGUgbmFtZSBpcyBhIGZyZWVmb3JtIHN0cmluZywgdXNlZCBhcyBhIGNhcHRpb24gb3IgZGVzY3JpcHRpb24uXG4gICAqIFRoZXJlIGFyZSBubyBsaW1pdGF0aW9ucyBvbiB3aGF0IGl0IGNhbiBiZS5cbiAgICpcbiAgICogQGRlZmF1bHQgLSB1c2UgYWxhcm1GcmllbmRseU5hbWVcbiAgICovXG4gIHJlYWRvbmx5IGh1bWFuUmVhZGFibGVOYW1lPzogc3RyaW5nO1xuICAvKipcbiAgICogUGxhaW4gbmFtZSwgdXNlZCBpbiBuYW1pbmcgYWxhcm1zLiBUaGlzIHVuaXF1ZSBhbW9uZyBvdGhlciByZXNvdXJjZXMsIGFuZCByZXNwZWN0IHRoZSBBV1MgQ0RLIHJlc3RyaWN0aW9uIHBvc2VkIG9uIGFsYXJtIG5hbWVzLlxuICAgKiBUaGUgbGVuZ3RoIG11c3QgYmUgMSAtIDI1NSBjaGFyYWN0ZXJzIGFuZCBhbHRob3VnaCB0aGUgdmFsaWRhdGlvbiBydWxlcyBhcmUgdW5kb2N1bWVudGVkLCB3ZSByZWNvbW1lbmQgdXNpbmcgQVNDSUkgYW5kIGh5cGhlbnMuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gZGVyaXZlcyBuYW1lIGZyb20gdGhlIGNvbnN0cnVjdCBpdHNlbGZcbiAgICovXG4gIHJlYWRvbmx5IGFsYXJtRnJpZW5kbHlOYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiB0aGlzIGlzIGRlZmluZWQsIHRoZSBsb2NhbCBhbGFybSBuYW1lIHByZWZpeCB1c2VkIGluIG5hbWluZyBhbGFybXMgZm9yIHRoZSBjb25zdHJ1Y3Qgd2lsbCBiZSBzZXQgdG8gdGhpcyB2YWx1ZS5cbiAgICogVGhlIGxlbmd0aCBtdXN0IGJlIDEgLSAyNTUgY2hhcmFjdGVycyBhbmQgYWx0aG91Z2ggdGhlIHZhbGlkYXRpb24gcnVsZXMgYXJlIHVuZG9jdW1lbnRlZCwgd2UgcmVjb21tZW5kIHVzaW5nIEFTQ0lJIGFuZCBoeXBoZW5zLlxuICAgKiBAc2VlIEFsYXJtTmFtaW5nU3RyYXRlZ3kgZm9yIG1vcmUgZGV0YWlscyBvbiBhbGFybSBuYW1lIHByZWZpeGVzXG4gICAqL1xuICByZWFkb25seSBsb2NhbEFsYXJtTmFtZVByZWZpeE92ZXJyaWRlPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFV0aWxpdHkgY2xhc3MgdG8gdW5pZnkgYXBwcm9hY2ggdG8gbmFtaW5nIG1vbml0b3Jpbmcgc2VjdGlvbnMuXG4gKiBAc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9jZGsvbGF0ZXN0L2d1aWRlL3Rva2Vucy5odG1sI3Rva2Vuc19sYXp5XG4gKi9cbmV4cG9ydCBjbGFzcyBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgaW5wdXQ6IE5hbWVSZXNvbHV0aW9uSW5wdXQ7XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IE5hbWVSZXNvbHV0aW9uSW5wdXQpIHtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gIH1cblxuICByZXNvbHZlQWxhcm1GcmllbmRseU5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC5hbGFybUZyaWVuZGx5TmFtZSA/PyB0aGlzLmdldEZhbGxiYWNrQWxhcm1GcmllbmRseU5hbWUoKTtcbiAgfVxuXG4gIHJlc29sdmVIdW1hblJlYWRhYmxlTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlucHV0Lmh1bWFuUmVhZGFibGVOYW1lID8/IHRoaXMuZ2V0RmFsbGJhY2tIdW1hblJlYWRhYmxlTmFtZSgpO1xuICB9XG5cbiAgc3RhdGljIGlzQWxhcm1GcmllbmRseShzdHI6IHN0cmluZykge1xuICAgIC8vIHdlIGRvIG5vdCBrbm93IHRoZSBleGFjdCBwYXR0ZXJuIHlldCwgYnV0IHRoaXMgaXMgYSBzYWZlIGFwcHJveGltYXRpb25cbiAgICAvLyBhbHNvLCB0b2tlbnMgYXJlIG5vdCBhbGxvd2VkIGluIGFsYXJtIG5hbWVzXG4gICAgcmV0dXJuIHN0ciAmJiAhVG9rZW4uaXNVbnJlc29sdmVkKHN0cikgJiYgL15bYS16QS1aMC05XFwtX10rJC8udGVzdChzdHIpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGYWxsYmFja0FsYXJtRnJpZW5kbHlOYW1lKCkge1xuICAgIGlmICh0aGlzLmlucHV0LmZhbGxiYWNrQ29uc3RydWN0TmFtZSkge1xuICAgICAgaWYgKFxuICAgICAgICBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3kuaXNBbGFybUZyaWVuZGx5KFxuICAgICAgICAgIHRoaXMuaW5wdXQuZmFsbGJhY2tDb25zdHJ1Y3ROYW1lXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dC5mYWxsYmFja0NvbnN0cnVjdE5hbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5wdXQubmFtZWRDb25zdHJ1Y3QpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmlucHV0Lm5hbWVkQ29uc3RydWN0Lm5vZGU7XG4gICAgICBpZiAoTW9uaXRvcmluZ05hbWluZ1N0cmF0ZWd5LmlzQWxhcm1GcmllbmRseShub2RlLmlkKSkge1xuICAgICAgICAvLyBzY29wZS11bmlxdWUgSURcbiAgICAgICAgcmV0dXJuIG5vZGUuaWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJJbnN1ZmZpY2llbnQgaW5mb3JtYXRpb24gcHJvdmlkZWQgZm9yIG5hbWluZyB0aGUgYWxhcm1zIGFuZC9vciBtb25pdG9yaW5nIHNlY3Rpb246IFwiICtcbiAgICAgICAgXCJQbGVhc2UgcHJvdmlkZSBhbGFybUZyaWVuZGx5TmFtZSwgaHVtYW5SZWFkYWJsZU5hbWUsIG9yIG5hbWVkQ29uc3RydWN0IGFzIGEgZmFsbGJhY2tcIlxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldEZhbGxiYWNrSHVtYW5SZWFkYWJsZU5hbWUoKSB7XG4gICAgcmV0dXJuIExhenkudW5jYWNoZWRTdHJpbmcoe1xuICAgICAgcHJvZHVjZTogKGNvbnRleHQpID0+IHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWROYW1lOiBhbnkgPSBjb250ZXh0LnJlc29sdmUoXG4gICAgICAgICAgdGhpcy5pbnB1dC5mYWxsYmFja0NvbnN0cnVjdE5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiByZXNvbHZlZE5hbWUgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICBNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3kuaXNOb25CbGFuayhyZXNvbHZlZE5hbWUpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlZE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5wdXQubmFtZWRDb25zdHJ1Y3QpIHtcbiAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5pbnB1dC5uYW1lZENvbnN0cnVjdC5ub2RlO1xuICAgICAgICAgIGlmIChNb25pdG9yaW5nTmFtaW5nU3RyYXRlZ3kuaXNOb25CbGFuayhub2RlLmlkKSkge1xuICAgICAgICAgICAgLy8gc2NvcGUtdW5pcXVlIElEXG4gICAgICAgICAgICByZXR1cm4gbm9kZS5pZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZUFsYXJtRnJpZW5kbHlOYW1lKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNOb25CbGFuayhzdHI6IHN0cmluZykge1xuICAgIHJldHVybiBzdHIgJiYgc3RyLnRyaW0oKS5sZW5ndGggPiAwO1xuICB9XG59XG4iXX0=