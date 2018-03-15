import React from 'react';
import ReactDOM from 'react-dom';
import {Link, matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Subset, EditableSubset} from './subset';
import Modal from 'react-modal';


class Workspace extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
			workspaces: [],
			workspace: { subsets: [] }
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

	async requestWorkspaceList() {
		const response = await fetch('/api/workspaces/', {credentials: 'same-origin'});
		const result = await response.json();
		this.setState({workspaces: result.workspaces});
	}

	async requestSubsetList(workspace_uuid) {
		const response = await fetch(`/api/subsets/${workspace_uuid}`, {credentials: 'same-origin'});
		const result = await response.json();
		this.setState({workspace: result});
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
		return <Subset key={index} active={subset.active} name={subset.alias} onClickEdit={this.openModal} />
	}

	render() {
		const {history, match} = this.props;
		const m = matchPath(history.location.pathname, {path: '/:lang/'});
		return(
			<section className="workspace">
				<header>
					<h1>My Workspace</h1>
					<div className="user">
						<i className="user-badge">JD</i>
						<span className="user-name">John Doe</span>
					</div>
					<select onChange={(e) => history.push(match.url + '/' + e.target.value)}>
						{this.state.workspaces.map(this.renderWorkspaceOption.bind(this))}
					</select>
				</header>

				<div className="workspace-subsets">
					{this.state.workspace.subsets.map(this.renderSubset.bind(this))}
					<div className="subset subset-new">
						<button>
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

				<Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} className="modal" overlayClassName="modal-overlay">
					<header className="modal-header">
						<h2>My Subset</h2>
						<button className="modal-close" onClick={this.closeModal}>&times;</button>
					</header>
					<div className="modal-body">
						<EditableSubset />
					</div>
				</Modal>
			</section>
		);
	}
}


export {Workspace}
