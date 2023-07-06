
import { SQS } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const sqs: SQS = new SQS();
let queueUrl: string;
if (process.env.QUEUE_URL) {
    queueUrl = process.env.QUEUE_URL;
}
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let statusCode = 200;
    let message;
    if (event.body) {
        message = JSON.parse(event.body);
    } else {
        message = event;
    }
    const result = await sqs.sendMessage({
        MessageBody: message,
        QueueUrl: queueUrl,
    }).promise();
    if (!result) {
        statusCode = 500;
    }

    return {
        statusCode: statusCode,
        body: JSON.stringify(result),
    };
}

