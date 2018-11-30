import { initDiwali } from '@slashgg/diwali';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import * as ReactDOM from 'react-dom';

import { PassportConfig } from 'passport/common/config';

export let passport: Passport;

export function initPassport(config: PassportConfig) {
  passport = new Passport(config);
}

export class Passport {
  public config: PassportConfig;
  public history: History = createBrowserHistory();

  constructor(config: PassportConfig) {
    this.config = config;
    initDiwali(...config.Icons);
  }

  public mount(element: JSX.Element, root: HTMLElement) {
    ReactDOM.render(element, root);
  }
}
