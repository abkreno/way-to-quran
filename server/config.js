const argv = require('./argv');

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

module.exports = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: 'mysecret',
  port: parseInt(argv.port || process.env.PORT || '3000', 10),
  host,
  prettyHost,
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
