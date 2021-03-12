module.exports = ({ env }) => ({
  admin: {
    url: '/dashboard',
    auth: {
      secret: env('ADMIN_JWT_SECRET', "TR8PbLPS8y7YdnoM+azfUIHX8CfkxLhrCPdnBhRJGIIg6oZGrXEYPo1XaBSf8DrMmUNPDVRBOmNxQw6ouIg+mA=="),
    },
  },
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: {
    enabled: true
  }
});
