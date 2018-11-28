import { initDiwali } from '@slashgg/diwali';
import { PassportConfig } from 'passport/common/config';
import * as ReactDOM from 'react-dom';

export let passport: Passport;

export function initPassport(config: PassportConfig) {
  passport = new Passport(config);
}

export class Passport {
  public config: PassportConfig;

  constructor(config: PassportConfig) {
    this.config = config;
    initDiwali(...config.Icons);
  }

  public mount(element: JSX.Element, root: HTMLElement) {
    ReactDOM.render(element, root);
  }
}
