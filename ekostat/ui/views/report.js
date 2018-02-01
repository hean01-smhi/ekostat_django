import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const Report = () => (
	<section className="panel">
		<p>
			<Link to="/workspace">&laquo; Back to workspace</Link>
		</p>
		<h1>
			<FormattedMessage id="report.heading" defaultMessage="Report" />
		</h1>
	</section>
);


export {Report}
