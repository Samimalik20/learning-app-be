import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

 constructor() {
  this.s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentialDefaultProvider: defaultProvider,
});
}

  /**
   * Upload a file to S3 and return the public URL
   */
  async uploadFile(
    file: Express.Multer.File,
    folder = 'uploads',
  ): Promise<{ url: string; key: string }> {
    const key = `${folder}/${randomUUID()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return { url, key };
  }

  /**
   * Delete a file from S3 using its full URL
   */
  async deleteFile(fileUrl: string): Promise<void> {
    const key = this.extractKeyFromUrl(fileUrl);

    if (!key) {
      throw new Error('Invalid file URL');
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });

    await this.s3.send(command);
  }

  /**
   * Extract S3 object key from full URL
   */
  private extractKeyFromUrl(url: string): string {
    const parts = url.split('.amazonaws.com/');
    return parts[1]; // "uploads/uuid-filename.jpg"
  }
}
