const NODE_ENV = process.env.NODE_ENV;
const RAILS_PORT = process.env.PORT || process.env.RAILS_DEFAULT_PORT || 42069;

export const CLIENT_ASSET_BASE = '/';
export const RAILS_ASSET_BASE = NODE_ENV === 'production' ? '/' : `http://localhost:${RAILS_PORT}/`;
