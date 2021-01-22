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

