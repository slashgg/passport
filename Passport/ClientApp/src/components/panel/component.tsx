import { Heading, HeadingColor, HeadingType } from '@slashgg/diwali';
import classNames from 'classnames';
import * as React from 'react';

import { Brand, BrandSize } from '../brand';

export interface PublicProps {
  heading?: string;
}

export const Panel: React.SFC<PublicProps> = props => {
  const classes = classNames('flex flex-col shadow bg-white p-6 mt-8 rounded');
  return (
    <div className="px-2 w-full sm:w-40">
      <div className={classes}>
        <div className="pb-4">
          <Brand size={BrandSize.Small} />
        </div>
        {props.heading && (
          <Heading color={HeadingColor.Alternative} type={HeadingType.Subtitle}>
            {props.heading}
          </Heading>
        )}
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex justify-center">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
