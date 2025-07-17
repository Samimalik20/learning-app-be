import { Injectable, Logger } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION_SES,
      credentials: {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
      },
    });
  }

  private compileTemplate(
    templateName: string,
    data: Record<string, any>,
  ): string {
    const filePath = join(
      process.cwd(),
      'src',
      'mailer',
      'templates',
      `${templateName}.hbs`,
    );
    const source = readFileSync(filePath, 'utf8');
    const template = handlebars.compile(source);
    return template(data);
  }

  async sendEmail({
    to,
    subject,
    template,
    context,
  }: {
    to: string;
    subject: string;
    template: string;
    context: Record<string, any>;
  }) {
    const html = this.compileTemplate(template, context);

    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL!,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: html,
          },
          Text: {
            Data: 'This is a fallback text version of the email.',
          },
        },
      },
    });

    try {
      const result = await this.sesClient.send(command);
      this.logger.log(`✅ Email sent. Message ID: ${result.MessageId}`);
      return result;
    } catch (error) {
      this.logger.error('❌ Failed to send email:', error);
      throw error;
    }
  }
}
