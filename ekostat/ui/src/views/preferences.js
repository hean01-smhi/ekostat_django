import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const Preferences = withRouter(({history}) => {
  const match = matchPath(history.location.pathname, {path: '/:lang/'});
  return(
    <section>
      <h1>
        <FormattedMessage id="preferences.heading" defaultMessage="Preferences" />
      </h1>
      <fieldset>
        <label>
          <FormattedMessage id="preferences.label_language" defaultMessage="Language" />
          <select value={match.params.lang} onChange={(e) => {history.push(`/${e.target.value}/preferences`)}}>
            <option value="sv-SE">Svenska</option>
            <option value="en-US">English</option>
          </select>
        </label>
      </fieldset>
      <fieldset>
        <legend>
          <FormattedMessage id="preferences.legend_user_account" defaultMessage="Account" />
        </legend>
        <div>
          <input type="text" placeholder="Username" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <input type="button" value="Log in" />
        </div>
      </fieldset>
    </section>
  );
});

export {Preferences}
