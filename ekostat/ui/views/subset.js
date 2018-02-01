import React from 'react';
import ReactDOM from 'react-dom';
import {Link, withRouter, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const Subset = withRouter(({active, name, history}) => {
	const match = matchPath(history.location.pathname, {path: '/:lang/'});
	return (
		<div className={['subset', active ? 'subset-enabled' : 'subset-disabled'].join(' ')}>
			<div className="subset-actions">
				<button type="button" className="subset-action-edit">
					<i className="icon-edit"></i>
					<span>Edit</span>
				</button>
				<Link to={`/${match.params.lang}/report/my_workspace_1/my_subset1`} className="subset-action-report">
					<FormattedMessage id="subset.button_view_report" defaultMessage="View report" />
				</Link>
			</div>
			<a className="subset-action-none">
				<h2>{name}</h2>
				<dl className="subset-selections">
					<dt>Water district</dt>
					<dd>Bottenhavet</dd>
					<dt>Water bodies</dt>
					<dd>WB 1</dd>
					<dd>WB 2</dd>
					<dd>WB 3</dd>
					<dt>Period</dt>
					<dd>2006-2012</dd>
				</dl>
				<dl className="subset-selections">
					<dt>Phytoplankton</dt>
					<dd>Chlorophyll - default</dd>
					<dd>Biovolume - default</dd>
					<dd>Chlorophyll *- satellite</dd>
					<dd>Chlorophyll *- model</dd>
					<dt>Benthic fauna</dt>
					<dd>BQI - default</dd>
					<dd>BQI - extrapolation</dd>
					<dt>Vegetation</dt>
					<dd>MSMDI - default</dd>
					<dd>Eelgrass *- depthlimit</dd>
				</dl>
				<dl className="subset-selections">
					<dt>Nutrients</dt>
					<dd>N, winter - default</dd>
					<dd>N, summer - default</dd>
					<dt>Secchi</dt>
					<dd>Secchi - default</dd>
					<dt>Oxygen</dt>
					<dd>Oxygen 1 - default</dd>
				</dl>
			</a>
		</div>
	);
});


export {Subset}
