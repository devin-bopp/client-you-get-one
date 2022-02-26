import SignIn from "../auth/SignIn"
import SignUp from "../auth/SignUp"
import { Link } from "react-router-dom"

export default function Home(props) {
	let content
	let welcomeMessage = (
		<>
			<p>Welcome to <em>You Get One</em>, a virtual pet for you and your friends!</p>
			<p>Due to bandwidth restrictions, only one user may play with the pet at a time. Thank you for understanding!</p>
		</>
	)

	if (!props.user) {
		content = (
			<>
				{welcomeMessage}
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
			</>
		)
	} else if (!props.profile) {
		content = (
			<>
				{welcomeMessage}
				<p>You haven't created your profile yet!</p>
				<Link to='new-profile'>Click here</Link> to get started.
			</>
		)
	} else {
		content = (
			<>
				{props.getProfile()}
				<p>Hello, {props.profile.name}! You have fed the pet {props.profile.fedCount} times!</p>
				{welcomeMessage}
				<Link to='queue'>Go to the queue</Link>
			</>
		)
	}

	return (
		<>
			{content}
			<div style={{margin: '20px 0 0 0'}}>
				<small><i>You Get One</i> was created by Devin Bopp. Learn more <a href="https://github.com/devinrbopp/client-you-get-one" target='_blank'>on Github</a>.</small>
			</div>
		</>
	)
}