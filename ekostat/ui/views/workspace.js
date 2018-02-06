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
			modalIsOpen: false
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
						<option value="my_workspace_1">My Workspace</option>
						<option value="my_workspace_2">My Second Workspace</option>
						<option value="my_workspace_3">My Third Workspace</option>
						<option value="default">Default Workspace (shared)</option>
					</select>
				</header>

				<div className="workspace-subsets">
					<Subset active={true} name="My Subset 1" onClickEdit={this.openModal} />
					<Subset active={true} name="My Subset 2" onClickEdit={this.openModal} />
					<Subset active={false} name="My Subset 3" onClickEdit={this.openModal} />
					<Subset active={true} name="My Subset 4" onClickEdit={this.openModal} />
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
