import React from 'react';
import ReactDOM from 'react-dom';
import {Link, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Subset, EditableSubset} from './subset';
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

	async _fetch(path) {
		const response = await fetch(`/api/${path}`, {credentials: 'same-origin'});
		return await response.json();
	}

	async requestWorkspaceList() {
		const response = await this._fetch('workspaces/')
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

	renderWorkspaceOption(workspace, index) {
		return <option key={index} value={workspace.uuid}>{workspace.alias}</option>
	}

	renderSubset(subset, index) {
		return <Subset key={index} active={subset.active} name={subset.alias} onClickEdit={this.onClickSubset.bind(this, subset)} />
	}

	renderSubsets() {
		if (this.state.isLoading) {
			return <LoadingIndicator />;
		}
		return(
			<div>
				{this.state.availableSubsets.map(this.renderSubset.bind(this))}
				<div className="subset subset-new">
					<button>
						<i>+</i>
						<FormattedMessage id="workspace.button_new_subset" defaultMessage="Create new subset" />
					</button>
				</div>
			</div>
		);
	}

	render() {
		const {history, match} = this.props;
		const m = matchPath(history.location.pathname, {path: '/:lang/'});

		return(
			<section className="workspace">
				<header>
					<h1>{this.state.currentWorkspace.alias || 'Loading workspace...'}</h1>
					<div className="user">
						<i className="user-badge">JD</i>
						<span className="user-name">John Doe</span>
					</div>
					<select onChange={(e) => history.push(match.url + '/' + e.target.value)}>
						{this.state.availableWorkspaces.map(this.renderWorkspaceOption.bind(this))}
					</select>
				</header>

				<div className="workspace-subsets">
					{this.renderSubsets()}
				</div>

				<div className="actions">
					<Link to={`/${m.params.lang}/report/my_workspace_1`}>
						<FormattedMessage id="workspace.button_view_report" defaultMessage="View report" />
					</Link>
				</div>

				<Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} className="modal" overlayClassName="modal-overlay">
					<header className="modal-header">
						<h2>{this.state.currentSubset.alias}</h2>
						<button className="modal-close" onClick={this.closeModal}>&times;</button>
					</header>
					<div className="modal-body">
						<EditableSubset subset={this.state.currentSubset} />
					</div>
				</Modal>
			</section>
		);
	}
}


export {Workspace}
