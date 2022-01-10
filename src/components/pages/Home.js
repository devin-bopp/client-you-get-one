import SignIn from "../auth/SignIn"
import SignUp from "../auth/SignUp"
import { useEffect } from "react"

export default function Home(props) {
	// const { msgAlert, user } = props
	// console.log('props in home', props)
	let content = (<p>this will appear if content doesn't get set</p>)

	if (!props.user) {
		content = (
			<>
				<div id='sign-up'>
					<SignUp msgAlert={props.msgAlert} setUser={props.setUser} />
				</div>
				<div id='log-in'>
					<SignIn msgAlert={props.msgAlert} setUser={props.setUser} />
				</div>
			</>
		)
	} else if (!props.profile) {
		content = (
			<>
				<p>this will appear if there IS a user but no profile.name</p>
			</>
		)
	} else {
		content = (
			// <p>teset: {props.profile.name}</p>
			<p>Welcome, {props.profile.name}!</p>
		)
	}

	return (
		<>
			<h2>you get one</h2>
			<p>welcome to <em>you get one</em>, a virtual pet for your and friends!</p>
			<p>Due to bandwidth restrictions, only one user may play with the pet at a time. Thank you for understanding!</p>
			{content}
		</>
	)
}