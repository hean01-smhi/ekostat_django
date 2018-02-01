import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';

const About = () => (
	<section className="panel">
		<h1>
			<FormattedMessage id="about.heading" defaultMessage="About" />
		</h1>
		<p>
			<FormattedMessage id="about.text" defaultMessage="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
		</p>
	</section>
);

export {About};