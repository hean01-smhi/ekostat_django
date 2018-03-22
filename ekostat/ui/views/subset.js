import React from 'react';
import ReactDOM from 'react-dom';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import {FormattedMessage} from 'react-intl';
import {Link} from './common';

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
					<button className="indicator-settings-button">
						<i className="icon-settings"></i>
					</button>
					<label>
						<input type="checkbox" disabled={item.status == 'not selectable'} />{` ${item.label}`}
					</label>
				</li>
			))}
		</ul>
	</fieldset>
);

const Subset = ({item, onClick}) => (
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
			<Link to={`report/my_workspace_1/my_subset1`} className="subset-report">
				<FormattedMessage id="subset.button_view_report" defaultMessage="View report" />
			</Link>
		</footer>
	</div>
);

const SubsetAdd = ({data, onAbort, onConfirm}) => (
	<React.Fragment>
		<header className="modal-header">
			<h2>New subset</h2>
			<button className="modal-close" onClick={onAbort}>&times;</button>
		</header>
		<div className="modal-body">
			<label>
				<FormattedMessage id="subset.label_add_subset_source" defaultMessage="Source" />
				<select>
					{data.sources.map((item, index) => (
						<option key={index} value={item.uuid}>{item.alias}</option>
					))}
				</select>
			</label>
			<label>
				<FormattedMessage id="subset.label_add_subset_alias" defaultMessage="Alias" />
				<input type="text" />
			</label>
		</div>
		<footer className="modal-footer">
			<div className="actions">
				<button className="button button-default" onClick={onAbort}>
					<FormattedMessage id="subset.button_add_subset_cancel" defaultMessage="Cancel" />
				</button>
				<button className="button button-primary" onClick={onConfirm}>
					<FormattedMessage id="subset.button_add_subset_save" defaultMessage="Save" />
				</button>
			</div>
		</footer>
	</React.Fragment>
);

const SubsetEdit = ({data, onAbort, onConfirm}) => (
	<React.Fragment>
		<header className="modal-header">
			<h2>{data.alias}</h2>
			<button className="modal-close" onClick={onAbort}>&times;</button>
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
					<DropdownTreeSelect data={data.areas} keepTreeOnSearch={true} />
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
				{data.quality_elements && data.quality_elements.map((item, index) => <Factors item={item} key={index} />)}
			</div>
			<div className="subset-supporting-elements">
				<h3>
					<FormattedMessage id="subset.heading_supporting_elements" defaultMessage="Supporting elements" />
				</h3>
				{data.supporting_elements && data.supporting_elements.map((item, index) => <Factors item={item} key={index} />)}
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
	</React.Fragment>
);


export {Subset, SubsetAdd, SubsetEdit}
