export default ({ env }) => ({
  sentry: {
    enabled: true,
    config: {
      dsn: env("SENTRY_DSN"),
      sendMetadata: true,
    },
  },
  upload: {
    config: (() => {
      if ("production" != process.env.NODE_ENV) {
        return {};
      }

      return {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: env("CLOUDINARY_NAME"),
          api_key: env("CLOUDINARY_KEY"),
          api_secret: env("CLOUDINARY_SECRET"),
        },
        breakpoints: {},
        actionOptions: {
          upload: {
            timeout: 60000,
          },
          uploadStream: {},
          delete: {},
        },
      };
    })(),
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp-relay.gmail.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "hello@pkrbt.id",
        defaultReplyTo: "hello@pkrbt.id",
      },
    },
  },
});
