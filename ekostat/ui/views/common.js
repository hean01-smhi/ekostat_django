import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';

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


export {LoadingIndicator}