import React from "react"
import Button from '../Button'
import Select from '../Select'
import Input from '../Input'

class ChangeEmail extends React.Component {
  	constructor() {
		super()
		this.state = {
			email: '',
			emailCheck: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	} 	
	handleSubmit(event) {
		event.preventDefault()
		if ((this.state.email.length > 6) && (this.state.email==this.state.emailCheck)){
			console.log(this.state);
			window.alert("New email submitted")
		} else {
			window.alert("New email mismatch")
		}
	} 
	handleChange(event) {
		const name = event.target.name
		const value = event.target.value
		this.setState(prevState => {
			prevState[name] = value
			return prevState
		})
	}
	
	render() {
		return (	
			<form onSubmit={this.handleSubmit}>
			
				<Input
					name="email"
					value={this.state.email}
					label="New Email"          			
					onChange={this.handleChange}
				/>
				<Input
					name="emailCheck"
					value={this.state.emailCheck}
					label="Retype New Email"
					onChange={this.handleChange}
				/>
				<Button type="submit">Update</Button>
			</form>
		)
  	}
}

export default ChangeEmail


