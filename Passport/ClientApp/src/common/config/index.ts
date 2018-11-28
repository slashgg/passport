import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from 'passport/common/config/icons';

export interface PassportConfig {
  Icons: IconDefinition[];
}

export let config: PassportConfig = {
  Icons: ICONS,
};
