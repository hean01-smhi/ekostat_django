import React from 'react';
import ReactDOM from 'react-dom';
import {Link, withRouter, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Areas} from './areas';

const Subset = withRouter(({subset, history, onClickEdit}) => {
	const match = matchPath(history.location.pathname, {path: '/:lang/'});

	const renderSelectedElements = (elements, index) => {
		return (
			<React.Fragment key={index}>
				<dt>{elements.label}</dt>
				<dd>{elements.values.join(', ')}</dd>
			</React.Fragment>
		);
	};

	const getSelectedElements = (elements) => {
		const result = [];

		elements.forEach((element) => {
			const selectedElements = [];

			element.children.forEach((childElement) => {
				if (childElement.selected) {
					selectedElements.push(childElement.label);
				}
			});

			if (selectedElements.length > 0) {
				result.push({label: element.label, values: selectedElements});
			}
		});

		return result;
	};

	const selectedAreas = [
		{
			label: "Water district",
			values: ["Bottenhavet"]
		},
		{
			label: "Water bodies",
			values: ["WB 1", "WB 2", "WB 3", "WB 4"]
		}
	];

	const selectedQualityElements = getSelectedElements(subset.quality_elements);
	const selectedSupportingElements = getSelectedElements(subset.supporting_elements);
	const selectedPeriods = getSelectedElements([{label: 'Period', children: subset.periods}]);

	return (
		<div className={['subset', subset.active ? 'subset-enabled' : 'subset-disabled'].join(' ')} onClick={onClickEdit}>
			<header>
				<h2>{subset.name}</h2>
				<button type="button" className="subset-edit" onClick={onClickEdit}>
					<i className="icon-edit"></i>
					<FormattedMessage id="subset.button_edit" defaultMessage="Edit" />
				</button>
			</header>
			<dl className="subset-selections">
				{selectedAreas.map(renderSelectedElements)}
				{selectedPeriods.map(renderSelectedElements)}
				{selectedQualityElements.map(renderSelectedElements)}
				{selectedSupportingElements.map(renderSelectedElements)}
			</dl>
			<Link to={`/${match.params.lang}/report/my_workspace_1/my_subset1`} className="subset-report">
				<FormattedMessage id="subset.button_view_report" defaultMessage="View report" />
			</Link>
		</div>
	);
});

class EditableSubset extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			step: "1",
			areas: [
				{
					"label": "Bottenhavet",
					"value": "bottenhavet",
					"status": "selectable",
					"active": true,
					"children": [
						{
							"label": "ABC",
							"value": "abc",
							"status": "disabled",
							"active": false
						}
					]
				}
			]
		}

		this.chooseStep = this.chooseStep.bind(this);
	}

	chooseStep(e) {
		this.setState({step: e.target.value})
	}

	renderElements(elements) {
		return (
			<fieldset>
				<legend>{elements.label}</legend>
				<ul>
					{elements.children.map(this.renderElement.bind(this))}
				</ul>
			</fieldset>
		);
	}

	renderElement(element, index) {
		return (
			<li key={index}>
				<label>
					<input type="checkbox" disabled={element.status == "not selectable"} />
					{element.label}
				</label>
			</li>
		);
	}

	render() {
		if (this.state.step == '1') {
	 		return (
				<div className="editable-subset">
					<div className="subset-selections">
						<h3>
							<FormattedMessage id="subset.heading_areas" defaultMessage="Areas" />
						</h3>
						<Areas nodes={this.state.areas} />
					</div>
					<div className="subset-selections">
						<h3>
							<FormattedMessage id="subset.heading_periods" defaultMessage="Periods" />
						</h3>
						<div>
							<label>
								From (year)
								<input type="number" min="2001" max="2018" value="2007" />
							</label>
							<label>
								To (year)
								<input type="number" min="2001" max="2018" value="2011" />
							</label>
						</div>
					</div>
					<div className="actions">
						<button onClick={this.chooseStep} value="2">
							<FormattedMessage id="subset.button_show_elements" defaultMessage="Show quality and supporting elements" /> &raquo;
						</button>
					</div>
				</div>
			);
	 	}
	 	else {
			return (
				<div className="editable-subset">
					<div className="subset-selections">
						<h3>
							<FormattedMessage id="subset.heading_biological_elements" defaultMessage="Biological quality elements" />
						</h3>
						{this.props.subset.quality_elements.map(this.renderElements.bind(this))}
					</div>
					<div className="subset-selections">
						<h3>
							<FormattedMessage id="subset.heading_supporting_elements" defaultMessage="Supporting element" />
						</h3>
						{this.props.subset.supporting_elements.map(this.renderElements.bind(this))}
					</div>
					<div className="actions">
						<button onClick={this.chooseStep} value="1">
							&laquo; <FormattedMessage id="subset.button_areas_and_period" defaultMessage="Choose areas and period" />
						</button>
					</div>
				</div>
			);
		}
	}
}


export {EditableSubset, Subset}
