import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect, Link, NavLink, withRouter} from 'react-router-dom';
import {IntlProvider, FormattedMessage} from 'react-intl';
import {About} from './about';
import {Workspace} from './workspace';
import {Preferences} from './preferences';
import {Report} from './report';
import {NotFound} from './errors';
import {DemoDialog} from './demo.js';
import {defaultLocale, locales, translation} from '../lang';
import logo from '../images/logo.svg';

const Navigation = withRouter(({match}) => (
	<nav className="navigation" role="navigation">
		<Link to={`${match.url}`} className="logo" title="Vattenstatus">
			<img src={logo} />
		</Link>
		<ul>
			<li>
				<NavLink to={`${match.url}about`}>
					<FormattedMessage id="navigation.item_about" defaultMessage="About" />
				</NavLink>
			</li>
			<li>
				<NavLink to={`${match.url}workspaces`}>
					<FormattedMessage id="navigation.item_workspace" defaultMessage="Workspace" />
				</NavLink>
			</li>
			<li>
				<NavLink to={`${match.url}preferences`}>
					<FormattedMessage id="navigation.item_preferences" defaultMessage="Preferences" />
				</NavLink>
			</li>
		</ul>
	</nav>
));

const Main = withRouter(({match}) => (
	<main className="main" role="main">
		<Switch>
			<Route path={`${match.url}about`} component={About} />
			<Route path={`${match.url}workspaces`} component={Workspace} />
			<Route exact path={`${match.url}report/:workspace`} component={Report} />
			<Route exact path={`${match.url}report/:workspace/:subset`} component={Report} />
			<Route path={`${match.url}preferences`} component={Preferences} />
			<Redirect exact from={match.url} to={`${match.url}workspaces`} />
			<Route component={NotFound} />
		</Switch>
	</main>
));

const Footer = () => (
	<footer className="footer" role="contentinfo">
		<DemoDialog />
	</footer>
);

const App = () => (
	<Router>
		<Switch>
			<Route strict path={`/:lang(${locales.join('|')})/`} render={({match}) => (
				<IntlProvider locale={match.params.lang} messages={translation(match.params.lang)}>
					<React.Fragment>
						<Navigation />
						<Main />
						<Footer />
					</React.Fragment>
				</IntlProvider>
			)} />
			<Redirect to={`/${defaultLocale}/`} />
		</Switch>
	</Router>
);


export {App};
