import { config, PassportConfig } from 'passport/common/config';

Object.assign<PassportConfig, Partial<PassportConfig>>(config, {
  // production overrides occur here.
});

export default config;
