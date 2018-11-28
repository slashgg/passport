import * as React from 'react';

import { passport } from '../passport';

passport.mount(<div>Hello, world!</div>, document.getElementById('root')!);
