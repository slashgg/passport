import { Paragraph } from '@slashgg/diwali';
import * as React from 'react';

import { ExternalLink } from 'passport/components/external-link';

class LegalConsentComponent extends React.Component {
  private TOS: string = 'https://slash.gg/terms-of-service';
  private CONDUCT: string = 'https://slash.gg/code-of-conduct';
  private PRIVACY: string = 'https://slash.gg/privacy-policy';

  public render() {
    return (
      <Paragraph>
        By clicking Register, you indicate that you accept our{' '}
        <ExternalLink to={this.TOS}>Terms of Service</ExternalLink>,{' '}
        <ExternalLink to={this.CONDUCT}>Code of Conduct</ExternalLink> and{' '}
        <ExternalLink to={this.PRIVACY}>Privacy Policy</ExternalLink>.
      </Paragraph>
    );
  }
}

export const LegalConsent: React.ComponentClass = LegalConsentComponent;
