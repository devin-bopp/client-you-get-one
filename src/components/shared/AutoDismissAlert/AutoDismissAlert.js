import React from 'react'

import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: true,
		}
		this.timeoutId = null
	}

	componentDidMount() {
		this.timeoutId = setTimeout(this.handleClose, 5000)
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId)
	}

	handleClose = () => this.setState({ show: false })

	render() {
		const { variant, heading, message, deleteAlert, id } = this.props

		// Delete this alert after the fade animation time (300 ms by default)
		if (!this.state.show) {
			setTimeout(() => {
				deleteAlert(id)
			}, 300)
		}

		return (
			<div
				dismissible
				show={this.state.show}
				variant={variant}
				onClose={this.handleClose}>
				<div className='container'>
					<h3>{heading}</h3>
					<p className='alert-body'>{message}</p>
				</div>
			</div>
		)
	}
}

export default AutoDismissAlert
