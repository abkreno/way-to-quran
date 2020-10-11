const path = require('path');

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
// // import .env variables
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv-safe').config({
    path: path.join(__dirname, '../../.env.dev'),
    sample: path.join(__dirname, '../../.env.example'),
  });
}

module.exports = {
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  port: process.env.PORT || 3000,
  host,
  prettyHost,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  mongo: {
    uri:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  // The credentials and information for OAuth2
  oauth2Credentials: {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    project_id: 'way-to-quran',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'NT0jYxaw5QcZET4DKIFxVhfR',
    redirect_uris: [`${host}/auth_callback`],
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  },
};
