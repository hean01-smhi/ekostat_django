import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl'

const NotFound = () => (
  <h1>
    <FormattedMessage id="error.not_found_heading" defaultMessage="Not found" />
  </h1>
);

export {NotFound};
