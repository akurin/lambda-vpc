import * as cdk from "@aws-cdk/core";
import { Duration } from "@aws-cdk/core";
import {
  LambdaIntegration,
  MethodLoggingLevel,
  RestApi,
} from "@aws-cdk/aws-apigateway";
import { AssetCode, Function, Runtime } from "@aws-cdk/aws-lambda";
import { SubnetType, Vpc } from "@aws-cdk/aws-ec2";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "TheVPC", {
      cidr: "10.0.0.0/16",
    });

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
      vpc: vpc,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE,
      },
    });

    restApi.root.addMethod("GET", new LambdaIntegration(lambdaFunction, {}));
  }
}
