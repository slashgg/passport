import { Paragraph } from '@slashgg/diwali';
import * as React from 'react';

import { ExternalLink } from 'passport/components/external-link';

class LegalConsentComponent extends React.Component {
  private CONDUCT: string = 'https://slash.gg/code-of-conduct';
  private PRIVACY: string = 'https://slash.gg/privacy-policy';

  public render() {
    return (
      <Paragraph>
        By clicking Register, you indicate that you accept our <ExternalLink to={this.CONDUCT}>conduct</ExternalLink>{' '}
        and <ExternalLink to={this.PRIVACY}>privacy</ExternalLink> policies.
      </Paragraph>
    );
  }
}

export const LegalConsent: React.ComponentClass = LegalConsentComponent;
