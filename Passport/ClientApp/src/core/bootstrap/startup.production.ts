import config from 'passport/common/config/production';
import { initPassport } from 'passport/core/passport';

import 'whatwg-fetch';

initPassport(config);
