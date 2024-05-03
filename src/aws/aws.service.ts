import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AwsService {
  private logger = new Logger(AwsService.name);

  constructor(private configService: ConfigService) {}

  public async uploadFile(file: any, id: string) {
    const AWS_BUCKET_NAME = this.configService.get<string>('AWS_BUCKET_NAME');
    const AWS_REGION = this.configService.get<string>('AWS_REGION');
    const ACCESS_KEY = this.configService.get<string>('ACCESS_KEY');
    const SECRET_ACCESS_KEY =
      this.configService.get<string>('SECRET_ACCESS_KEY');

    const s3 = new AWS.S3({
      region: AWS_REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });
    const fileNameSplited = file.originalname.split('.');
    const fileExtension = fileNameSplited[fileNameSplited.length - 1];

    const urlKey = `${id}.${fileExtension}`;

    this.logger.log('url key', urlKey);

    const params = {
      Body: file.buffer,
      Bucket: AWS_BUCKET_NAME,
      Key: urlKey,
    };

    const data = s3
      .putObject(params)
      .promise()
      .then(
        (data) => {
          return {
            url: `https://${AWS_BUCKET_NAME}.${AWS_REGION}.amazonaws.com/${urlKey}`,
          };
        },
        (err) => {
          this.logger.error(err);
          return err;
        },
      );

    return data;
  }
}
