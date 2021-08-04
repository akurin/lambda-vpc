import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: `hello from lambda!`,
  };
};
