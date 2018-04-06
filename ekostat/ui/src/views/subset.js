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


class SubsetEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {step: 0};
  }

  render() {
    return (
      <React.Fragment>
        <header className="modal-header">
          <h1>{this.props.data.alias}</h1>
          <button className="modal-close" onClick={this.props.onAbort}>
            &times;
          </button>
        </header>
        <div className="modal-body">
          {this.state.step == 0 ? (
            <React.Fragment>
              <h2>
                1.{' '}
                <FormattedMessage id="subset.heading_select_filters" defaultMessage="Select filters" />
              </h2>
              <h3 className="sticky-heading">
                <FormattedMessage id="subset.heading_period" defaultMessage="Period" />
              </h3>
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
              <h3 className="sticky-heading">
                <FormattedMessage id="subset.heading_areas" defaultMessage="Areas" />
              </h3>
              <DropdownTreeSelect data={this.props.data.areas} keepTreeOnSearch={true} showDropdown={true} placeholderText="Search..." />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>
                2.{' '}
                <FormattedMessage id="subset.heading_select_indicators" defaultMessage="Select and adjust settings for indicators" />
              </h2>
              <h3 className="sticky-heading">
                <FormattedMessage id="subset.heading_quality_elements" defaultMessage="Biological quality elements" />
              </h3>
              <div className="subset-quality-elements">
                {this.props.data.quality_elements.map((item, index) => <Factors item={item} key={index} />)}
              </div>
              <h3 className="sticky-heading">
                <FormattedMessage id="subset.heading_supporting_elements" defaultMessage="Supporting elements" />
              </h3>
              <div className="subset-supporting-elements">
                {this.props.data.supporting_elements.map((item, index) => <Factors item={item} key={index} />)}
              </div>
            </React.Fragment>
          )}
        </div>
        <footer className="modal-footer">
          {this.state.step == 0 ? (
            <React.Fragment>
              <button className="button button-next" onClick={() => this.setState({step: 1})}>
                <FormattedMessage id="subset.button_select_indicators" defaultMessage="Select and adjust settings for indicators" />
                {' '}&rarr;
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className="button button-prev" onClick={() => this.setState({step: 0})}>
                &larr;{' '}
                <FormattedMessage id="subset.button_select_filters" defaultMessage="Select filters" />
              </button>
              <button className="button button-next" onClick={this.props.onConfirm}>
                Done
              </button>
            </React.Fragment>
          )}
        </footer>
      </React.Fragment>
    );
  }
}


export {Subset, SubsetAdd, SubsetEdit}
