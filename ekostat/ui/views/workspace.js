import React from 'react';
import ReactDOM from 'react-dom';
import {Link, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Subsets, Subset, SubsetModal} from './subset';
import {LoadingIndicator} from './common';
import Modal from 'react-modal';

class Workspace extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
			availableWorkspaces: [],
			currentWorkspace: {},
			availableSubsets: [],
			currentSubset: {},
			isLoading: true
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		//this.onClickSubset = this.onClickSubset.bind(this);
		this.onChangeWorkspace = this.onChangeWorkspace.bind(this);
		this.renderWorkspaceHeadingText = this.renderWorkspaceHeadingText.bind(this);
		this.renderWorkspaceOption = this.renderWorkspaceOption.bind(this);
		this.renderSubset = this.renderSubset.bind(this);
		this.renderSubsets = this.renderSubsets.bind(this);
	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}

	onClickSubset(subset) {
		this.setState({currentSubset: subset, modalIsOpen: true});
	}

	onChangeWorkspace(e) {
		const {history, match, location} = this.props;
		const m = matchPath(history.location.pathname, {path: '/:lang/'});
		history.push(`/${m.params.lang}/workspaces/${e.target.value}`);
	}

	async _fetch(path) {
		const response = await fetch(`/api/${path}`, {credentials: 'same-origin'});
		return await response.json();
	}

	async requestWorkspaceList() {
		const response = await this._fetch('workspaces/');
		this.setState({availableWorkspaces: response.workspaces});
	}

	async requestSubsetList(workspace_uuid) {
		const response = await this._fetch(`subsets/${workspace_uuid}`)
		this.setState({currentWorkspace: response.workspace, availableSubsets: response.subsets, isLoading: false});
	}

	componentDidMount() {
		this.requestWorkspaceList();
		if (this.props.match.params.workspace_uuid) {
			this.requestSubsetList(this.props.match.params.workspace_uuid);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.workspace_uuid !== this.props.match.params.workspace_uuid) {
			this.setState({isLoading: true, currentWorkspace: {}});
			this.requestSubsetList(this.props.match.params.workspace_uuid);
		}
	}

	renderWorkspaceHeadingText() {
		if (this.state.currentWorkspace && this.state.currentWorkspace.alias) {
			return <React.Fragment>{this.state.currentWorkspace.alias}</React.Fragment>;
		} else {
			return <FormattedMessage id="workspace.heading_loading" defaultMessage="Loading workspace..." />;
		}
	}

	renderWorkspaceOption({alias, uuid}, index) {
		return <option key={index} value={uuid}>{alias}</option>;
	}

	renderSubset(subset, index) {
		return <Subset key={index} item={subset} onClick={this.onClickSubset.bind(this, subset)} />
	}

	renderSubsets() {
		if (this.state.isLoading) {
			return <LoadingIndicator />;
		}

		return (
			<React.Fragment>
				{this.state.availableSubsets.map(this.renderSubset)}
				<div className="subset subset-new">
					<button>
						<i>+</i>
						<FormattedMessage id="workspace.button_new_subset" defaultMessage="Create new subset" />
					</button>
				</div>
			</React.Fragment>
		);
	}

	render() {
		const {history, match} = this.props;
		const m = matchPath(history.location.pathname, {path: '/:lang/'});
		return (
			<section className="workspace">
				<header className="workspace-header">
					<h1>{this.renderWorkspaceHeadingText()}</h1>
					<div className="user">
						<i className="user-badge">JD</i>
						<span className="user-name">John Doe</span>
					</div>
					<select onChange={this.onChangeWorkspace} value={this.state.currentWorkspace.uuid}>
						{this.state.availableWorkspaces.map(this.renderWorkspaceOption)}
					</select>
				</header>
				<div className="workspace-subsets">
					{this.renderSubsets()}
				</div>
				<footer className="workspace-footer">
					<div className="actions">
						<Link to={`/${m.params.lang}/report/my_workspace_1`}>
							<FormattedMessage id="workspace.button_view_report" defaultMessage="View report" />
						</Link>
					</div>
				</footer>
				<SubsetModal item={this.state.currentSubset} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} />
			</section>
		);
	}
}


export {Workspace}
