# lambda-vpc

An attempt to reproduce a ResourceNotReadyException when the Lambda function is deployed with VPC.

```bash
(cd hello-lambda/ && npm run build) && (cd cdk/ && npm run cdk -- deploy)
```
