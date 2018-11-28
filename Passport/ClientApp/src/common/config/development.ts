import { config, PassportConfig } from 'passport/common/config';

export default {
  ...config,
  ...{
    // development overrides here
  },
} as PassportConfig;
