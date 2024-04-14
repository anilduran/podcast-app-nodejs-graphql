import { S3Client } from "@aws-sdk/client-s3"

const s3Configuration = {
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    },
    region: 'us-east-1'
}

const s3 = new S3Client(s3Configuration)

export { s3 as default }