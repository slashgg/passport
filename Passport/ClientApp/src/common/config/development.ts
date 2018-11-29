import { config, PassportConfig } from 'passport/common/config';

Object.assign<PassportConfig, Partial<PassportConfig>>(config, {
  // development overrides occur here.
});

export default config;
