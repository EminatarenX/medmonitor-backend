import { Injectable } from '@nestjs/common';
import { GetObjectCommand, PutObjectCommand, S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IUploader } from './uploader.interface';
@Injectable()
export class FileUploader implements IUploader {
    private client: S3Client
    private bucket: string;
    constructor() {
        this.bucket = process.env.AWS_BUCKET_NAME!,
        this.client = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            }
        })
    }

    async save (image: Express.Multer.File, key: string): Promise<void>{
        
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key ,
            Body: image.buffer
        })

        await this.client.send(command)
    }

    async getSignedUrl (key: string): Promise<string> {
        const command  = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key
        })

        return await getSignedUrl(this.client, command, { expiresIn: 3600 })
    }

    async delete ( key: string ): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key
        })

        await this.client.send(command)
        
    }
}
