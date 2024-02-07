"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsManagerMetricsPublisher = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const path = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_events_1 = require("aws-cdk-lib/aws-events");
const aws_events_targets_1 = require("aws-cdk-lib/aws-events-targets");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_logs_1 = require("aws-cdk-lib/aws-logs");
const constructs_1 = require("constructs");
const SecretsManagerSecretMetricFactory_1 = require("./SecretsManagerSecretMetricFactory");
class SecretsManagerMetricsPublisher extends constructs_1.Construct {
    constructor(scope) {
        super(scope, "SecretsManagerMetricsPublisher");
        this.lambda = new aws_lambda_1.Function(this, "Lambda", {
            code: aws_lambda_1.Code.fromAsset(path.join(__dirname, "..", "..", "..", "assets", "SecretsManagerMetricsPublisher")),
            description: "Custom metrics publisher for SecretsManager Secrets (cdk-monitoring-constructs)",
            handler: "index.handler",
            memorySize: 128,
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
            timeout: aws_cdk_lib_1.Duration.seconds(60),
            logRetention: aws_logs_1.RetentionDays.ONE_DAY,
        });
        this.lambda.addToRolePolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            actions: ["secretsmanager:DescribeSecret"],
            resources: ["*"],
        }));
        this.lambda.addToRolePolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            actions: ["cloudwatch:PutMetricData"],
            resources: ["*"],
            conditions: {
                StringEquals: {
                    "cloudwatch:namespace": SecretsManagerSecretMetricFactory_1.SecretsManagerSecretMetricFactory.Namespace,
                },
            },
        }));
    }
    static getInstance(scope) {
        const key = aws_cdk_lib_1.Names.nodeUniqueId(scope.node);
        let instance = SecretsManagerMetricsPublisher.instances[key];
        if (!instance) {
            instance = new SecretsManagerMetricsPublisher(scope);
            SecretsManagerMetricsPublisher.instances[key] = instance;
        }
        return instance;
    }
    addSecret(secret) {
        // run 1/hr so alarms can recover automatically
        const rule = new aws_events_1.Rule(this, `RuleFor${aws_cdk_lib_1.Names.nodeUniqueId(secret.node)}`, {
            schedule: aws_events_1.Schedule.cron({
                minute: "0",
            }),
        });
        rule.addTarget(new aws_events_targets_1.LambdaFunction(this.lambda, {
            event: aws_events_1.RuleTargetInput.fromObject({
                secretId: secret.secretArn,
            }),
        }));
    }
}
exports.SecretsManagerMetricsPublisher = SecretsManagerMetricsPublisher;
_a = JSII_RTTI_SYMBOL_1;
SecretsManagerMetricsPublisher[_a] = { fqn: "cdk-monitoring-constructs.SecretsManagerMetricsPublisher", version: "0.0.0" };
SecretsManagerMetricsPublisher.instances = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjcmV0c01hbmFnZXJNZXRyaWNzUHVibGlzaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VjcmV0c01hbmFnZXJNZXRyaWNzUHVibGlzaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTZCO0FBRTdCLDZDQUE4QztBQUM5Qyx1REFBeUU7QUFDekUsdUVBQWdFO0FBQ2hFLGlEQUE4RDtBQUM5RCx1REFBNEU7QUFDNUUsbURBQXFEO0FBRXJELDJDQUF1QztBQUV2QywyRkFBd0Y7QUFHeEYsTUFBYSw4QkFBK0IsU0FBUSxzQkFBUztJQUkzRCxZQUFvQixLQUFzQjtRQUN4QyxLQUFLLENBQUMsS0FBSyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUN6QyxJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQ2xCLElBQUksQ0FBQyxJQUFJLENBQ1AsU0FBUyxFQUNULElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLFFBQVEsRUFDUixnQ0FBZ0MsQ0FDakMsQ0FDRjtZQUNELFdBQVcsRUFDVCxpRkFBaUY7WUFDbkYsT0FBTyxFQUFFLGVBQWU7WUFDeEIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDN0IsWUFBWSxFQUFFLHdCQUFhLENBQUMsT0FBTztTQUNwQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FDekIsSUFBSSx5QkFBZSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLENBQUMsK0JBQStCLENBQUM7WUFDMUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ2pCLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQ3pCLElBQUkseUJBQWUsQ0FBQztZQUNsQixNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO1lBQ3BCLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNoQixVQUFVLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFO29CQUNaLHNCQUFzQixFQUFFLHFFQUFpQyxDQUFDLFNBQVM7aUJBQ3BFO2FBQ0Y7U0FDRixDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQXNCO1FBQ3ZDLE1BQU0sR0FBRyxHQUFHLG1CQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLFFBQVEsR0FBRyw4QkFBOEIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLFFBQVEsR0FBRyxJQUFJLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELDhCQUE4QixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDMUQ7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWU7UUFDdkIsK0NBQStDO1FBQy9DLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxtQkFBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUN2RSxRQUFRLEVBQUUscUJBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLE1BQU0sRUFBRSxHQUFHO2FBQ1osQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQ1osSUFBSSxtQ0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDOUIsS0FBSyxFQUFFLDRCQUFlLENBQUMsVUFBVSxDQUFDO2dCQUNoQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVM7YUFDM0IsQ0FBQztTQUNILENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7QUEzRUgsd0VBNEVDOzs7QUEzRWdCLHdDQUFTLEdBQW1ELEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgRHVyYXRpb24sIE5hbWVzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBSdWxlLCBSdWxlVGFyZ2V0SW5wdXQsIFNjaGVkdWxlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1ldmVudHNcIjtcbmltcG9ydCB7IExhbWJkYUZ1bmN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1ldmVudHMtdGFyZ2V0c1wiO1xuaW1wb3J0IHsgRWZmZWN0LCBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuaW1wb3J0IHsgQ29kZSwgRnVuY3Rpb24sIElGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBSZXRlbnRpb25EYXlzIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sb2dzXCI7XG5pbXBvcnQgeyBJU2VjcmV0IH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlclwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuaW1wb3J0IHsgU2VjcmV0c01hbmFnZXJTZWNyZXRNZXRyaWNGYWN0b3J5IH0gZnJvbSBcIi4vU2VjcmV0c01hbmFnZXJTZWNyZXRNZXRyaWNGYWN0b3J5XCI7XG5pbXBvcnQgeyBNb25pdG9yaW5nU2NvcGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBTZWNyZXRzTWFuYWdlck1ldHJpY3NQdWJsaXNoZXIgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZXM6IFJlY29yZDxzdHJpbmcsIFNlY3JldHNNYW5hZ2VyTWV0cmljc1B1Ymxpc2hlcj4gPSB7fTtcbiAgcHVibGljIHJlYWRvbmx5IGxhbWJkYTogSUZ1bmN0aW9uO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3Ioc2NvcGU6IE1vbml0b3JpbmdTY29wZSkge1xuICAgIHN1cGVyKHNjb3BlLCBcIlNlY3JldHNNYW5hZ2VyTWV0cmljc1B1Ymxpc2hlclwiKTtcblxuICAgIHRoaXMubGFtYmRhID0gbmV3IEZ1bmN0aW9uKHRoaXMsIFwiTGFtYmRhXCIsIHtcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KFxuICAgICAgICBwYXRoLmpvaW4oXG4gICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgIFwiLi5cIixcbiAgICAgICAgICBcIi4uXCIsXG4gICAgICAgICAgXCIuLlwiLFxuICAgICAgICAgIFwiYXNzZXRzXCIsXG4gICAgICAgICAgXCJTZWNyZXRzTWFuYWdlck1ldHJpY3NQdWJsaXNoZXJcIlxuICAgICAgICApXG4gICAgICApLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiQ3VzdG9tIG1ldHJpY3MgcHVibGlzaGVyIGZvciBTZWNyZXRzTWFuYWdlciBTZWNyZXRzIChjZGstbW9uaXRvcmluZy1jb25zdHJ1Y3RzKVwiLFxuICAgICAgaGFuZGxlcjogXCJpbmRleC5oYW5kbGVyXCIsXG4gICAgICBtZW1vcnlTaXplOiAxMjgsXG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcyg2MCksXG4gICAgICBsb2dSZXRlbnRpb246IFJldGVudGlvbkRheXMuT05FX0RBWSxcbiAgICB9KTtcblxuICAgIHRoaXMubGFtYmRhLmFkZFRvUm9sZVBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPVyxcbiAgICAgICAgYWN0aW9uczogW1wic2VjcmV0c21hbmFnZXI6RGVzY3JpYmVTZWNyZXRcIl0sXG4gICAgICAgIHJlc291cmNlczogW1wiKlwiXSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMubGFtYmRhLmFkZFRvUm9sZVBvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICBlZmZlY3Q6IEVmZmVjdC5BTExPVyxcbiAgICAgICAgYWN0aW9uczogW1wiY2xvdWR3YXRjaDpQdXRNZXRyaWNEYXRhXCJdLFxuICAgICAgICByZXNvdXJjZXM6IFtcIipcIl0sXG4gICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICBTdHJpbmdFcXVhbHM6IHtcbiAgICAgICAgICAgIFwiY2xvdWR3YXRjaDpuYW1lc3BhY2VcIjogU2VjcmV0c01hbmFnZXJTZWNyZXRNZXRyaWNGYWN0b3J5Lk5hbWVzcGFjZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGdldEluc3RhbmNlKHNjb3BlOiBNb25pdG9yaW5nU2NvcGUpIHtcbiAgICBjb25zdCBrZXkgPSBOYW1lcy5ub2RlVW5pcXVlSWQoc2NvcGUubm9kZSk7XG4gICAgbGV0IGluc3RhbmNlID0gU2VjcmV0c01hbmFnZXJNZXRyaWNzUHVibGlzaGVyLmluc3RhbmNlc1trZXldO1xuICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgIGluc3RhbmNlID0gbmV3IFNlY3JldHNNYW5hZ2VyTWV0cmljc1B1Ymxpc2hlcihzY29wZSk7XG4gICAgICBTZWNyZXRzTWFuYWdlck1ldHJpY3NQdWJsaXNoZXIuaW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBhZGRTZWNyZXQoc2VjcmV0OiBJU2VjcmV0KTogdm9pZCB7XG4gICAgLy8gcnVuIDEvaHIgc28gYWxhcm1zIGNhbiByZWNvdmVyIGF1dG9tYXRpY2FsbHlcbiAgICBjb25zdCBydWxlID0gbmV3IFJ1bGUodGhpcywgYFJ1bGVGb3Ike05hbWVzLm5vZGVVbmlxdWVJZChzZWNyZXQubm9kZSl9YCwge1xuICAgICAgc2NoZWR1bGU6IFNjaGVkdWxlLmNyb24oe1xuICAgICAgICBtaW51dGU6IFwiMFwiLFxuICAgICAgfSksXG4gICAgfSk7XG5cbiAgICBydWxlLmFkZFRhcmdldChcbiAgICAgIG5ldyBMYW1iZGFGdW5jdGlvbih0aGlzLmxhbWJkYSwge1xuICAgICAgICBldmVudDogUnVsZVRhcmdldElucHV0LmZyb21PYmplY3Qoe1xuICAgICAgICAgIHNlY3JldElkOiBzZWNyZXQuc2VjcmV0QXJuLFxuICAgICAgICB9KSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19