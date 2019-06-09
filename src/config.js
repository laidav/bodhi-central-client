const config = {};

config.domain =
  process.env.API_URL || `http://${window.location.hostname}:3000`;

export default config;
