import React from 'react';
import ReactDOM from 'react-dom';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import Modal from 'react-modal';
import {Link, withRouter, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const getSelectedItems = (items) => {
	const result = [];

	items.forEach((item) => {
		const values = [];

		item.children.forEach((childItem) => {
			if (childItem.selected) {
				values.push(childItem.label);
			}
		});

		if (values.length > 0) {
			result.push({label: item.label, values: values});
		}
	});

	return result;
}

const Description = ({items}) => (
	<dl className="subset-description">
		{items.map((item, index) => (
			<React.Fragment key={index}>
				<dt>{item.label}</dt>
				{item.values.map((value, index) => <dd key={index}>{value}</dd>)}
			</React.Fragment>
		))}
	</dl>
);

const Factors = ({item}) => (
	<fieldset className="subset-factors">
		<legend>{item.label}</legend>
		<ul>
			{item.children.map((item, index) => (
				<li key={index}>
					<label>
						<input type="checkbox" disabled={item.status == 'not selectable'} />{` ${item.label}`}
					</label>
				</li>
			))}
		</ul>
	</fieldset>
);


const Subset = withRouter(({item, history, onClick}) => {
	const match = matchPath(history.location.pathname, {path: '/:lang/'});
	return (
		<div className="subset" onClick={onClick}>
			<header className="subset-header">
				<h2>{item.alias}</h2>
			</header>
			<div className="subset-body">
				<Description items={getSelectedItems(item.areas)} />
				<Description items={getSelectedItems(item.quality_elements)} />
				<Description items={getSelectedItems(item.supporting_elements)} />
			</div>
			<footer className="subset-footer">
				<Link to={`/${match.params.lang}/report/my_workspace_1/my_subset1`} className="subset-report">
					<FormattedMessage id="subset.button_view_report" defaultMessage="View report" />
				</Link>
			</footer>
		</div>
	);
});

const SubsetModal = ({item, isOpen, onRequestClose}) => (
	<Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
		<header className="modal-header">
			<h2>{item.alias}</h2>
			<button className="modal-close" onClick={onRequestClose}>&times;</button>
		</header>
		<div className="modal-body">
			<div className="subset-assessment-units">
				<h3>
					<FormattedMessage id="subset.heading_assessment_units" defaultMessage="Assessment units" />
				</h3>
				<fieldset className="subset-assessment-areas">
					<legend>
						<FormattedMessage id="subset.legend_areas" defaultMessage="Areas" />
					</legend>
					<DropdownTreeSelect data={item.areas} keepTreeOnSearch={true} />
				</fieldset>
				<fieldset className="subset-assessment-periods">
					<legend>
						<FormattedMessage id="subset.legend_periods" defaultMessage="Periods" />
					</legend>
					<div className="subset-assessment-period">
						<label className="subset-assessment-period-from">
							<FormattedMessage id="subset.label_from_year" defaultMessage="From (year)" />
							<input type="number" min="2001" max="2018" defaultValue="2007" />
						</label>
						<label className="subset-assessment-period-to">
							<FormattedMessage id="subset.label_to_year" defaultMessage="To (year)" />
							<input type="number" min="2001" max="2018" defaultValue="2011" />
						</label>
					</div>
				</fieldset>
			</div>
			<div className="subset-quality-elements">
				<h3>
					<FormattedMessage id="subset.heading_quality_elements" defaultMessage="Biological quality elements" />
				</h3>
				{item.quality_elements && item.quality_elements.map((item, index) => <Factors item={item} key={index} />)}
			</div>
			<div className="subset-supporting-elements">
				<h3>
					<FormattedMessage id="subset.heading_supporting_elements" defaultMessage="Supporting elements" />
				</h3>
				{item.supporting_elements && item.supporting_elements.map((item, index) => <Factors item={item} key={index} />)}
			</div>
		</div>
		<footer className="modal-footer">
			<div className="actions">
				<button className="button button-delete">
					<FormattedMessage id="subset.button_delete_subset" defaultMessage="Delete subset" />
				</button>
				<button className="button button-default">
					<FormattedMessage id="subset.button_activate_subset" defaultMessage="Activate subset" />
				</button>
			</div>
		</footer>
	</Modal>
);

export {Subset, SubsetModal}
