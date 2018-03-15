import React from 'react';
import ReactDOM from 'react-dom';

class Areas extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			nodes: props.nodes
		};

		this.renderTree = this.renderTree.bind(this);
		this.renderNode = this.renderNode.bind(this);
		this.filterList = this.filterList.bind(this);
	}

	filterList() {

	}

	renderNode(node, index) {
		return (
			<li key={index}>
				<label>
					<input type="checkbox" disabled={node.status == "disabled"} checked={node.active} />
					{node.label} 
				</label>
				{this.renderTree(node.children)}
			</li>
		);
	}

	renderTree(nodes) {
		return nodes && (<ul>{nodes.map(this.renderNode)}</ul>);
	}

	render() {
		return (
			<div className="areas">
				<input type="text" placeholder="Search..." onChange={this.filterList} />
				{this.renderTree(this.state.nodes)}
			</div>
		);
	}
}


export {Areas}