import React from 'react';
import ReactDOM from 'react-dom';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import {FormattedMessage} from 'react-intl';
import {Link} from './common';
import {IndicatorSettings} from './indicator';

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
					<IndicatorSettings />
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
			{item.uuid == 'default_subset' ? (<i className="icon-lock"></i>) : (<i className="icon-edit"></i>)}
		</header>
		<div className="subset-body">
			<Description items={getSelectedItems(item.areas)} />
			<Description items={getSelectedItems(item.quality_elements)} />
			<Description items={getSelectedItems(item.supporting_elements)} />
		</div>
		<footer className="subset-footer">
			<Link to={`report/my_workspace_1/my_subset1`} className="subset-report">
				<FormattedMessage id="subset.button_view_report" defaultMessage="Result report" />
			</Link>
		</footer>
	</div>
);

class SubsetAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alias: '',
			source: this.props.data.source
		}
	}

	onConfirm = (event) => {
		this.props.onConfirm(this.state);
	};

	onAbort = (event) => {
		this.props.onAbort(this.state);
	};

	onChangeSource = (event) => {
		this.setState({source: event.target.value});
	};

	onChangeAlias = (event) => {
		this.setState({alias: event.target.value});
	};

	render() {
		return (
			<React.Fragment>
				<header className="modal-header">
					<h2>
						<FormattedMessage id="subset.heading_add_subset" defaultMessage="Add subset" />
					</h2>
					<button className="modal-close" onClick={this.props.onAbort}>&times;</button>
				</header>
				<div className="modal-body">
					<div className="field">
						<label>
							<FormattedMessage id="subset.label_add_subset_source" defaultMessage="Source" />
							<select value={this.state.source} onChange={this.onChangeSource}>
								{this.props.data.sources.map((item, index) => (
									<option key={index} value={item.uuid}>{item.alias}</option>
								))}
							</select>
						</label>
					</div>
					<div className="field">
						<label>
							<FormattedMessage id="subset.label_add_subset_alias" defaultMessage="Alias" />
							<input type="text" value={this.state.alias} onChange={this.onChangeAlias} />
						</label>
					</div>
				</div>
				<footer className="modal-footer">
					<div className="actions">
						<button className="button button-default" onClick={this.onAbort}>
							<FormattedMessage id="subset.button_add_subset_cancel" defaultMessage="Cancel" />
						</button>
						<button className="button button-primary" onClick={this.onConfirm}>
							<FormattedMessage id="subset.button_add_subset_save" defaultMessage="Save" />
						</button>
					</div>
				</footer>
			</React.Fragment>
		);
	}
}

const SubsetEdit = ({data, onAbort, onConfirm}) => (
	<React.Fragment>
		<header className="modal-header">
			<h1>{data.alias}</h1>
			<button className="modal-close" onClick={onAbort}>&times;</button>
		</header>
		<div className="modal-body">
			<div className="panel panel-subset-filters">
				<header className="panel-header">
					<h2>
						1. <FormattedMessage id="subset.heading_select_filters" defaultMessage="Select filters" />
					</h2>
				</header>
				<div className="panel-body">
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
				<footer className="panel-footer">
					<button className="button button-alt">
						<FormattedMessage id="subset.button_apply_selected_filters" defaultMessage="Apply selected filters" />
					</button>
				</footer>
			</div>
			<div className="panel panel-subset-indicators">
				<header className="panel-header">
					<h2>
						2. <FormattedMessage id="subset.heading_select_indicators" defaultMessage="Select and adjust settings for indicators" />
					</h2>
				</header>
				<div className="panel-body">
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
				<footer className="panel-footer">
					<button className="button button-primary">
						<FormattedMessage id="subset.button_apply_selected_indicators" defaultMessage="Apply selected indicators" />
					</button>
				</footer>
			</div>
		</div>
	</React.Fragment>
);


export {Subset, SubsetAdd, SubsetEdit}
