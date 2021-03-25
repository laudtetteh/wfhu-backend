module.exports = ({ env }) => ({
  // GraphQL
  graphql: {
    endpoint: '/graphql',
    shadowCRUD: true,
    playgroundAlways: false,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: true,
    },
  },
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
      host: env('EM_SMTP_HOST', "smtp.elasticemail.com"),
      port: env('EM_SMTP_PORT', 2525),
      auth: {
        user: env('EM_SMTP_USERNAME', "elisabeth@wfhuniv.com"),
        pass: env('EM_SMTP_PASSWORD', "0C5F923ECE74175A020AB94F7BE6975F8E7D"),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: env('DEFAULT_FROM', "elisabeth@wfhuniv.com"),
      defaultReplyTo: env('DEFAULT_REPLY_TO', "elisabeth@wfhuniv.com"),
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
