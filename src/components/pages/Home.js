import SignIn from "../auth/SignIn"
import SignUp from "../auth/SignUp"

export default function Home(props) {
	// const { msgAlert, user } = props
	// console.log('props in home', props)
	let forms

	console.log('this is props.user: ' + props.user)

	if (!props.user) {
		forms = (
			<>
				<div id='sign-up'>
					<SignUp msgAlert={props.msgAlert} setUser={props.setUser} />
				</div>
				<div id='log-in'>
					<SignIn msgAlert={props.msgAlert} setUser={props.setUser} />
				</div>
			</>
		)
	}

	return (
		<>
			<h2>you get one</h2>
			<p>welcome to <em>you get one</em>, a virtual pet for your and friends!</p>
			<p>Due to bandwidth restrictions, only one user may play with the pet at a time. Thank you for understanding!</p>
			{forms}
		</>
	)
}