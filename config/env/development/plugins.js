///-------- AWS
module.exports = ({ env }) => ({
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
});

///-------- Azure
// module.exports = ({ env }) => ({
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
// });

// nodemailer configuration
// module.exports = ({ env }) => ({
//     email: {
//         provider: 'nodemailer',
//         providerOptions: {
//             nodemailer_default_from: env('NODEMAILER_DEFAULT_FROM'),
//             nodemailer_default_replyto: env('NODEMAILER_DEFAULT_REPLYTO'),
//             host: env('NODEMAILER_HOST'),
//             port: env('NODEMAILER_PORT'),
//             password: env('NODEMAILER_PASSWORD'),
//             username: env('NODEMAILER_USERNAME'),
//             secure: true,
//         },
//     },
// });

// module.exports = ({ env }) => ({
//     email: {
//         provider: 'nodemailer',
//         providerOptions: {
//             nodemailer_default_from: "laud@studiotenfour.com",
//             nodemailer_default_replyto: "laudtetteh@gmail.com",
//             host: "smtp.elasticemail.com",
//             port: "2525",
//             password: "76FF2A5A56882268FA43B75669F0F468C95F",
//             username: "vendors@studiotenfour.com",
//             // secure: true,
//         },
//     },
// });

module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('EM_SMTP_HOST', "smtp.elasticemail.com"),
      port: env('EM_SMTP_PORT', 2525),
      auth: {
        user: env('EM_SMTP_USERNAME', "vendors@studiotenfour.com"),
        pass: env('EM_SMTP_PASSWORD', "76FF2A5A56882268FA43B75669F0F468C95F"),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: env('DEFAULT_FROM', "vendors@studiotenfour.com"),
      defaultReplyTo: env('DEFAULT_REPLY_TO', "vendors@studiotenfour.com"),
    },
  },
});
