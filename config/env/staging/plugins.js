module.exports = ({ env }) => ({
  ///-------- Storage: AWS
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      region: 'us-east-2',
      params: {
        // Prod dev Bucket
        Bucket: env('AWS_ENV_BUCKET'),
      },
    },
  },

  ///-------- SMTP: nodemailer
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('EM_SMTP_HOST'),
      port: env('EM_SMTP_PORT'),
      auth: {
        user: env('EM_SMTP_USERNAME'),
        pass: env('EM_SMTP_PASSWORD'),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: env('DEFAULT_FROM'),
      defaultReplyTo: env('DEFAULT_REPLY_TO'),
    },
  },

  ///-------- Storage: Azure
  //   upload: {
  //     provider: 'azure-storage',
  //     providerOptions: {
  //       account: env('AZURE_STORAGE_ACCOUNT'),
  //       accountKey: env('AZURE_STORAGE_ACCOUNT_KEY'),
  //       serviceBaseURL: env('AZURE_STORAGE_URL'),
  //       containerName: env('AZURE_STORAGE_CONTAINER_NAME'),
  //       defaultPath: 'assets',
  //       maxConcurrent: 10
  //     }
  //   }
});
