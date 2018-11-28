import { config, PassportConfig } from 'passport/common/config';

export default {
  ...config,
  ...{
    // production overrides here
  },
} as PassportConfig;
