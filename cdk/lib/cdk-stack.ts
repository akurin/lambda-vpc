import * as cdk from "@aws-cdk/core";
import {
  LambdaIntegration,
  MethodLoggingLevel,
  RestApi,
} from "@aws-cdk/aws-apigateway";
import { AssetCode, Function, Runtime } from "@aws-cdk/aws-lambda";
import { Duration } from "@aws-cdk/core";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restApi = new RestApi(this, this.stackName + "RestApi", {
      deployOptions: {
        stageName: "beta",
        metricsEnabled: true,
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
    });

    const lambdaFunction = new Function(this, "RestFunction", {
      functionName: "rest",
      handler: "handler.handle",
      runtime: Runtime.NODEJS_14_X,
      code: new AssetCode("../hello-lambda/built/"),
      memorySize: 256,
      timeout: Duration.seconds(10),
    });

    restApi.root.addMethod("GET", new LambdaIntegration(lambdaFunction, {}));
  }
}
