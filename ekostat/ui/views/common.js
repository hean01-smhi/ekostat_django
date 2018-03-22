import React from 'react';
import ReactDOM from 'react-dom';
import {Link as RouterLink, withRouter, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {locales} from '../lang';

const LoadingIndicator = () => (
	<div className="loading-indicator">
		<div className="loading-indicator-staples">
			<span className="loading-indicator-staple"></span>
			<span className="loading-indicator-staple"></span>
			<span className="loading-indicator-staple"></span>
		</div>
		<FormattedMessage id="global.loading_indicator_label" defaultMessage="Loading" />
	</div>
);


const replaceLinkPath = (oldPath, newPath) => {
	const oldMatchPath = matchPath(oldPath, {path: `/:lang(${locales.join('|')})/`});
	const newMatchPath = matchPath(newPath, {path: `/:lang(${locales.join('|')})/`});

	newPath = newPath.replace(/^\//, '');

	if (!newMatchPath && oldMatchPath) {
		newPath = `${oldMatchPath.params.lang}/${newPath}`;
	}

	return `/${newPath}`;
}

const Link = withRouter(({history, to, children, onClick, className}) => (
	<RouterLink to={replaceLinkPath(history.location.pathname, to)} onClick={onClick} className={className}>
		{children}
	</RouterLink>
));

export {Link, LoadingIndicator}