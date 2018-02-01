import React from 'react';
import ReactDOM from 'react-dom';
import {Link, withRouter, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Subset} from './subset';

const Workspace = withRouter(({history, match}) => {
	const m = matchPath(history.location.pathname, {path: '/:lang/'});
	return(
		<section className="panel subset-panel">

			<div className="workspaces">
				<h1>My Workspace</h1>
				<div className="user">
					<i className="user-badge">JD</i>
					<span className="user-name">John Doe</span>
				</div>
				<select onChange={(e) => history.push(match.url + '/' + e.target.value)}>
					<option value="my_workspace_1">My Workspace</option>
					<option value="my_workspace_2">My Second Workspace</option>
					<option value="my_workspace_3">My Third Workspace</option>
					<option value="default">Default Workspace (shared)</option>
				</select>
			</div>

			<div className="subsets">
				<Subset active={true} name="My Subset 1" />
				<Subset active={true} name="My Subset 2" />
				<Subset active={false} name="My Subset 3" />
				<Subset active={true} name="My Subset 4" />
				<div className="subset subset-new">
					<button className="subset-action-new">
						<i>+</i>
						<FormattedMessage id="workspace.button_new_subset" defaultMessage="Create new subset" />
					</button>
				</div>
			</div>

			<div className="actions">
				<Link to={`/${m.params.lang}/report/my_workspace_1`}>
					<FormattedMessage id="workspace.button_view_report" defaultMessage="View report" />
				</Link>
			</div>
		</section>
	);
});

export {Workspace}
