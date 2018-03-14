import React from 'react';
import ReactDOM from 'react-dom';
import {Link, withRouter, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const Subset = withRouter(({active, name, history, onClickEdit}) => {
	const match = matchPath(history.location.pathname, {path: '/:lang/'});
	return (
		<div className={['subset', active ? 'subset-enabled' : 'subset-disabled'].join(' ')} onClick={onClickEdit}>
			<header>
				<h2>{name}</h2>
				<button type="button" className="subset-edit" onClick={onClickEdit}>
					<i className="icon-edit"></i>
					<FormattedMessage id="subset.button_edit" defaultMessage="Edit" />
				</button>
			</header>
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
			step: "1"
		}

		this.chooseStep = this.chooseStep.bind(this);
	}

	chooseStep(e) {
		this.setState({step: e.target.value})
	}

	render() {
		if (this.state.step == '1') {
	 		return (
				<div className="editable-subset">
					<div className="subset-selections">
						<h3>Units</h3>
						<div>
							<label>
								Water district
								<select>
									<option>Bottenhavet</option>
									<option>Skagerakk</option>
								</select>
							</label>
							<label>
								Water bodies
								<select>
									<option>WB 1</option>
									<option>WB 2</option>
									<option>WB 3</option>
								</select>
							</label>
						</div>
					</div>
					<div className="subset-selections">
						<h3>Period</h3>
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
							Show quality and supporting elements &raquo;
						</button>
					</div>
				</div>
			);
	 	}
	 	else {
			return (
				<div className="editable-subset">
					<div className="subset-selections">
						<h3>Biological quality elements</h3>
						<fieldset>
							<legend>Phytoplankton</legend>
							<ul>
								<li>
									<label>
										<input type="checkbox" />
										Chlorophyll - default
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										Biovolume - default
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										Chlorophyll *- conc
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										Chlorophyll *- satellite
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										Chlorophyll *- model
									</label>
								</li>
							</ul>
						</fieldset>
						<fieldset>
							<legend>Benthic fauna</legend>
							<ul>
								<li>
									<label>
										<input type="checkbox" />
										BQI - default
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										BQI *- default
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										BQI *- extrapolation
									</label>
								</li>
							</ul>
						</fieldset>
						<fieldset>
							<legend>Vegetation</legend>
							<ul>
								<li>
									<label>
										<input type="checkbox" />
										MSMDI - default
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										Eelgrass *- depthlimit
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										Filamentoues *- %
									</label>
								</li>
							</ul>
						</fieldset>
					</div>
					<div className="subset-selections">
						<h3>Supporting element</h3>
						<fieldset>
							<legend>Nutrients</legend>
							<ul>
								<li>
									<label>
										<input type="checkbox" />
										N, winter - default
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										N, summer - default
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										P, winter - default
									</label>
								</li>
								<li>
									<label>
										<input type="checkbox" />
										P, summer - default
									</label>
								</li>
							</ul>
						</fieldset>
						<fieldset>
							<legend>Secchi</legend>
							<ul>
								<li>
									<label>
										<input type="checkbox" />
										Secchi - default
									</label>
								</li>
							</ul>
						</fieldset>
						<fieldset>
							<legend>Oxygen</legend>
							<ul>
								<li>
									<label>
										<input type="checkbox" />
										Oxygen 1 - default
									</label>
								</li>
							</ul>
						</fieldset>
					</div>
					<div className="actions">
						<button onClick={this.chooseStep} value="1">
							&laquo; Choose unit and period
						</button>
					</div>
				</div>
			);
		}
	}
}


export {EditableSubset, Subset}
