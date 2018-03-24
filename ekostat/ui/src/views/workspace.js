import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {matchPath} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {PortalWithState} from 'react-portal';
import {Subset, SubsetAdd, SubsetEdit} from './subset';
import {Link, LoadingIndicator} from './common';
import {Calculator, CalculatorError} from '../calculator';


const MODAL_ID_NONE           = 0;
const MODAL_ID_SUBSET_ADD     = 1
const MODAL_ID_SUBSET_EDIT    = 2;
const MODAL_ID_WORKSPACE_ADD  = 3;
const MODAL_ID_WORKSPACE_EDIT = 4;

class Workspace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				availableSubsets: [],
				availableWorkspaces: [],
				currentSubset: {},
				currentWorkspace: {},
			},
			isLoading: false,
			modalId: MODAL_ID_NONE,
		};
	}

	openModal = (modalId) => {
		this.setState({modalId});
	};

	closeModal = () => {
		this.setState({modalId: MODAL_ID_NONE});
	};

	isModalOpen = () => {
		return this.state.modalId !== MODAL_ID_NONE;
	};

	onModalConfirm = (data) => {
		if (this.state.modalId === MODAL_ID_SUBSET_ADD) {
			this.requestSubsetAdd(data);
		} else if (this.state.modalId === MODAL_ID_WORKSPACE_ADD) {
			this.requestWorkspaceAdd(data);
		} else if (this.state.modalId === MODAL_ID_WORKSPACE_EDIT) {
			this.requestWorkspaceEdit(data);
		}
		this.closeModal();
	};

	onModalAbort = (modalId) => {
		this.closeModal();
	};

	onClickAddWorkspace = () => {
		this.openModal(MODAL_ID_WORKSPACE_ADD);
	};

	onClickEditWorkspace = () => {
		this.openModal(MODAL_ID_WORKSPACE_EDIT);
	};

	onClickAddSubset = () => {
		this.openModal(MODAL_ID_SUBSET_ADD);
	};

	onClickEditSubset = (subset) => {
		this.setState((prevState) => {
			const {data} = prevState;
			data.currentSubset = subset;
			return {data};
		});
		this.openModal(MODAL_ID_SUBSET_EDIT);
	};

	reRoute(uuid) {
		const {history} = this.props;
		const mp = matchPath(history.location.pathname, '/:lang/');
		history.push(`/${mp.params.lang}/workspaces/${uuid}`);
	}

	async requestWorkspaceAdd(data) {
		const response = await Calculator.requestWorkspaceAdd(data);
		this.reRoute(response.uuid);
	}

	async requestWorkspaceEdit(data) {
		const response = await Calculator.requestWorkspaceEdit(data.uuid, data);
		this.setState((prevState) => {
			const {data} = prevState;
			data.currentWorkspace = response;
			return {data};
		});
	}

	async requestWorkspaceList() {
		const response = await Calculator.requestWorkspaceList();
		this.setState((prevState) => {
			const {data} = prevState;
			data.availableWorkspaces = response.workspaces;
			return {data};
		});
	}

	async requestSubsetAdd(data) {
		data.workspace_uuid = this.state.data.currentWorkspace.uuid;
		const response = await Calculator.requestSubsetAdd(data);
		this.requestSubsetList(data.workspace_uuid);
	}

	async requestSubsetList(uuid) {
		this.setState({isLoading: true});
		const response = await Calculator.requestSubsetList(uuid)
		this.setState((prevState) => {
			const {data} = prevState;
			data.availableSubsets = response.subsets;
			data.currentWorkspace = response.workspace;
			return {data, isLoading: false};
		})
	}

	componentDidMount() {
		this.requestWorkspaceList();
		if (this.props.match.params.workspace_uuid) {
			this.requestSubsetList(this.props.match.params.workspace_uuid);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.workspace_uuid !== this.props.match.params.workspace_uuid) {
			this.requestWorkspaceList();
			this.requestSubsetList(this.props.match.params.workspace_uuid);
		}
	}

	getDataForModal(modalId) {
		if (this.state.modalId === MODAL_ID_SUBSET_ADD) {
			return {source: 'default_subset', sources: this.state.data.availableSubsets};
		} else if (this.state.modalId === MODAL_ID_SUBSET_EDIT) {
			return this.state.data.currentSubset;
		} else if (this.state.modalId === MODAL_ID_WORKSPACE_ADD) {
			return {source: 'default_workspace', sources: this.state.data.availableWorkspaces};
		} else if (this.state.modalId === MODAL_ID_WORKSPACE_EDIT) {
			return this.state.data.currentWorkspace;
		}
		return null;
	}

	renderModalContent() {
		if (this.state.modalId === MODAL_ID_SUBSET_ADD) {
			return <SubsetAdd data={this.getDataForModal()} onConfirm={this.onModalConfirm} onAbort={this.onModalAbort} />
		} else if (this.state.modalId === MODAL_ID_SUBSET_EDIT) {
			return <SubsetEdit data={this.getDataForModal()} onConfirm={this.onModalConfirm} onAbort={this.onModalAbort} />
		} else if (this.state.modalId === MODAL_ID_WORKSPACE_ADD) {
			return <WorkspaceAdd data={this.getDataForModal()} onConfirm={this.onModalConfirm} onAbort={this.onModalAbort} />
		} else if (this.state.modalId === MODAL_ID_WORKSPACE_EDIT) {
			return <WorkspaceEdit data={this.getDataForModal()} onConfirm={this.onModalConfirm} onAbort={this.onModalAbort} />
		}
		return null;
	}

	render() {
		return (
			<section className="workspace">
				<header className="workspace-header">
					<h1>{this.state.data.currentWorkspace.alias || '--'}</h1>
					<div className="user">
						<i className="user-badge">JD</i>
						<span className="user-name">John Doe</span>
					</div>
					<WorkspaceDropdown data={this.state.data} onClickAdd={this.onClickAddWorkspace} onClickEdit={this.onClickEditWorkspace} />
				</header>
				<div className="workspace-subsets">
					{this.state.isLoading ? (
						<LoadingIndicator /> ) : ([
						this.state.data.availableSubsets.map((item, index) => (
							<Subset key={index} item={item} onClick={() => this.onClickEditSubset(item)} />
						)),
						<div className="subset subset-new">
							<button onClick={this.onClickAddSubset}>
								<i>+</i>
								<FormattedMessage id="workspace.button_new_subset" defaultMessage="Create new subset" />
							</button>
						</div>
					])}
				</div>
				<footer className="workspace-footer">
					<div className="actions">
						<Link to={`report/my_workspace_1`}>
							<FormattedMessage id="workspace.button_view_report" defaultMessage="View report" />
						</Link>
					</div>
				</footer>
				<Modal isOpen={this.isModalOpen()} onRequestClose={this.closeModal} className="modal" overlayClassName="modal-overlay">
					{this.renderModalContent()}
				</Modal>
			</section>
		);
	}
}


const WorkspaceDropdown = ({data, onClickAdd, onClickEdit}) => (
	<Manager>
		<PortalWithState closeOnOutsideClick closeOnEsc>
			{({openPortal, closePortal, isOpen, portal}) => [
				<Target className="workspace-menu">
					<button onClick={openPortal}>
						<span>{data.currentWorkspace.alias || '--'}</span>
					</button>
				</Target>,
				portal(
					<Popper placement="bottom" className="workspace-menu-dropdown">
						<ul>
							<li>
								<button onClick={(event) => {closePortal(); onClickAdd();}}>
									<FormattedMessage id="workspace.button_add_workspace" defaultMessage="New" />
								</button>
							</li>
							<li>
								<button onClick={(event) => {closePortal(); onClickEdit();}}>
									<FormattedMessage id="workspace.button_edit_workspace" defaultMessage="Edit" />
								</button>
							</li>
						</ul>
						<ul>
							{data.availableWorkspaces.map((item, index) => (
								<li key={index}>
									<Link to={`workspaces/${item.uuid}`} onClick={closePortal}>
										{item.alias}
									</Link>
								</li>
							))}
						</ul>
					</Popper>
				)
			]}
		</PortalWithState>
	</Manager>
);

class WorkspaceAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alias: '',
			source: this.props.data.source
		};
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
						<FormattedMessage id="workspace.heading_add_workspace" defaultMessage="New workspace" />
						<button className="modal-close" onClick={this.props.onAbort}>&times;</button>
					</h2>
				</header>
				<div className="modal-body">
					<div className="field">
						<label>
							<FormattedMessage id="workspace.label_add_workspace_source" defaultMessage="Source" />
							<select value={this.state.source} onChange={this.onChangeSource}>
								{this.props.data.sources.map((source, index) => (
									<option key={index} value={source.uuid}>{source.alias}</option>
								))}
							</select>
						</label>
					</div>
					<div className="field">
						<label>
							<FormattedMessage id="workspace.label_add_workspace_alias" defaultMessage="Alias" />
							<input type="text" value={this.state.alias} onChange={this.onChangeAlias} />
						</label>
					</div>
				</div>
				<footer className="modal-footer">
					<div className="actions">
						<button className="button button-default" onClick={this.onAbort}>
							<FormattedMessage id="workspace.button_add_workspace_cancel" defaultMessage="Cancel" />
						</button>
						<button className="button button-primary" onClick={this.onConfirm}>
							<FormattedMessage id="workspace.button_add_workspace_save" defaultMessage="Save" />
						</button>
					</div>
				</footer>
			</React.Fragment>
		);
	}
}

class WorkspaceEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alias: this.props.data.alias,
			uuid: this.props.data.uuid,
			status: this.props.data.status
		};
	}

	onConfirm = (event) => {
		this.props.onConfirm(this.state);
	};

	onAbort = (event) => {
		this.props.onAbort(this.state);
	};

	onChangeAlias = (event) => {
		this.setState({alias: event.target.value});
	};

	onChangeStatus = (event) => {
		this.setState({status: event.target.value});
	}

	render() {
		return (
			<React.Fragment>
				<header className="modal-header">
					<h2>
						<FormattedMessage id="workspace.heading_edit_workspace" defaultMessage="Edit workspace" />
						<button className="modal-close" onClick={this.props.onAbort}>&times;</button>
					</h2>
				</header>
				<div className="modal-body">
					<div className="field">
						<label>
							<FormattedMessage id="workspace.label_edit_workspace_alias" defaultMessage="Alias" />
							<input type="text" value={this.state.alias} onChange={this.onChangeAlias} />
						</label>
					</div>
					<fieldset className="field-group">
						<legend>
							<FormattedMessage id="workspace.label_edit_workspace_status" defaultMessage="Status" />
						</legend>
						<label>
							<input type="radio" name="workspace_status" disabled={this.state.status == 'deleted'} value="editable" checked={this.state.status == 'editable'} onChange={this.onChangeStatus} />
							<FormattedMessage id="workspace.label_edit_workspace_status_active" defaultMessage="Active" />
						</label>
						<label>
							<input type="radio" name="workspace_status" disabled={this.state.status == 'deleted'} value="inactive" checked={this.state.status == 'inactive'} onChange={this.onChangeStatus} />
							<FormattedMessage id="workspace.label_edit_workspace_status_inactive" defaultMessage="Inactive" />
						</label>
						{
							this.state.status == 'deleted' ? (
								<button className="button button-primary" value="editable" onClick={this.onChangeStatus}>
									<FormattedMessage id="workspace.button_edit_workspace_restore" defaultMessage="Restore" />
								</button>
							) : (
								<button className="button button-delete" value="deleted" onClick={this.onChangeStatus}>
									<FormattedMessage id="workspace.button_edit_workspace_delete" defaultMessage="Delete" />
								</button>
							)
						}
					</fieldset>
				</div>
				<footer className="modal-footer">
					<div className="actions">
						<button className="button button-default" onClick={this.onAbort}>
							<FormattedMessage id="workspace.button_edit_workspace_cancel" defaultMessage="Cancel" />
						</button>
						<button className="button button-primary" onClick={this.onConfirm}>
							<FormattedMessage id="workspace.button_edit_workspace_save" defaultMessage="Save" />
						</button>
					</div>
				</footer>
			</React.Fragment>
		);
	}
}


export {Workspace}
