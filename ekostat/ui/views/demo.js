import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';

class DemoDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isOpen: true };
	}

	render() {
		if (!this.state.isOpen) {
			return null;
		}
		return (
			<div className="demo-notice">
				<button onClick={() => this.setState({ isOpen: false })}>&times;</button>
				<p>
					<FormattedMessage id="demo_dialog.text" defaultMessage="This application is under development and is currently only intended for demo purposes." />
				</p>
			</div>
		);
	}

}

export {DemoDialog};