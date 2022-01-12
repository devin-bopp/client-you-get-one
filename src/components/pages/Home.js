import SignIn from "../auth/SignIn"
import SignUp from "../auth/SignUp"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Home(props) {
	let content = (<p>this will appear if content doesn't get set</p>)

	if (!props.user) {
		content = (
			<div id='auth-forms'>
				<div id='sign-up'>
					<SignUp 
						msgAlert={props.msgAlert} 
						setUser={props.setUser} 
					/>
				</div>
				<div id='log-in'>
					<SignIn 
						msgAlert={props.msgAlert} 
						setUser={props.setUser} 
						profile={props.profile} 
						getProfile={props.getProfile} 
					/>
				</div>
			</div>
		)
	} else if (!props.profile) {
		content = (
			<>
				<p>You haven't created your profile yet!</p>
				<Link to='new-profile'>Click here</Link> to get started.
			</>
		)
	} else {
		content = (
			<>
				<p>Welcome, {props.profile.name}!</p>
				<Link to='queue'>Go to the queue</Link>
			</>
		)
	}

	return (
		<>
			<p>Due to bandwidth restrictions, only one user may play with the pet at a time. Thank you for understanding!</p>
			<p>welcome to <em>you get one</em>, a virtual pet for you and your friends!</p>
			{content}
		</>
	)
}